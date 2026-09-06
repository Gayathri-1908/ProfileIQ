const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const path = require("path");
require("dotenv").config();
const Groq = require("groq-sdk");
const authRoutes = require("./auth");
const contactRoutes = require("./contact");
const linkedinChatRoutes = require("./linkedin-chat");


const app = express();

app.use(cors());
app.use(express.json());

// --- Auth routes (signup/login) - SQLite backed ---
app.use("/api/auth", authRoutes);
app.use("/api", contactRoutes);
app.use("/api", linkedinChatRoutes);

// Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
  timeout: 60 * 1000, // 60 seconds instead of the SDK default
  maxRetries: 2, // automatically retry twice on network failures/timeouts
});

const MODEL = "openai/gpt-oss-120b";

console.log(`Using model: ${MODEL}`);

// Multer - store file in memory, no need to save to disk
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === ".pdf" || ext === ".docx") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and DOCX files are allowed"));
    }
  },
});

// Home Route
app.get("/", (req, res) => {
  res.send("Backend is Running 🚀");
});

// Extract text from an uploaded PDF/DOCX buffer
async function extractTextFromBuffer(buffer, originalName) {
  const ext = path.extname(originalName).toLowerCase();

  if (ext === ".pdf") {
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (ext === ".docx") {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new Error("Unsupported file type");
}

function cleanExtractedText(text) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Shared analysis function used by both routes below
async function runAnalysis(text, targetRole, sourceType) {
  const isLinkedIn = sourceType === "linkedin";

  const documentLabel = isLinkedIn ? "LinkedIn 'About' / Profile summary" : "Resume";

  const prompt = `
You are an expert ATS resume reviewer and professional resume writer.

Analyze the following ${documentLabel} text for the target role given below.

${documentLabel}:
"""
${text}
"""

Target Role:
${targetRole || "Not specified — infer the most likely field from the content"}

Return ONLY valid JSON, no markdown fences, no extra commentary. Use exactly this shape:

{
  "overall": number (0-100),
  "ats": number (0-100),
  "strengths": [string, string, string],
  "weaknesses": [string, string, string],
  "specificImprovements": [
    {
      "section": "string (e.g. 'Summary', 'Experience - Bullet 2', 'Skills')",
      "issue": "string - what exactly is wrong or weak, quoting the original fragment",
      "fix": "string - the exact specific change to make and why"
    }
  ],
  "missingKeywords": [string, string, string],
  "grammarIssues": [string],
  "formattingIssues": [string],
  "rewrittenResume": {
    "summary": "string",
    "skills": "string",
    "experience": "string",
    "projects": "string"
  },
  "suggestedActivities": [
    {
      "area": "string - e.g. 'Data Analytics', 'Leadership', 'Cloud Deployment'",
      "suggestion": "string - a specific type of task/project/activity the candidate could pursue or highlight to better match the target role. Phrase as a recommendation, e.g. 'Consider adding a project where you...' NOT as if it already happened."
    }
  ],
  "recommendedSectionOrder": [string, string, string],
  "message": "string - one encouraging closing summary sentence"
}

CRITICAL RULES — DO NOT BREAK THESE:
1. The "rewrittenResume" fields must ONLY reorganize, rephrase, and clarify content that ALREADY EXISTS in the original ${documentLabel} text above.
2. NEVER invent, fabricate, or add new facts, companies, job titles, dates, metrics, numbers, team sizes, or achievements that are not explicitly present or directly and safely inferable from the original text.
3. If the original text lacks a section entirely (e.g. no projects at all, or this is just a LinkedIn About paragraph with no separate experience/skills sections), leave that field in "rewrittenResume" as an empty string "" — DO NOT invent one.
${isLinkedIn ? '4. This is a LinkedIn "About" summary, NOT a full resume. Only fill "rewrittenResume.summary" with an improved rewrite of the About text. Leave "skills", "experience", and "projects" as empty strings unless that specific content is genuinely present in the pasted text.' : '4. If you believe the candidate should showcase certain skills/experience/activities to better match the target role, but those are NOT in their resume, put that idea in "suggestedActivities" instead — phrased clearly as a suggestion for the future, never inserted into "rewrittenResume" as if it were true.'}
5. "recommendedSectionOrder" should be a simple ordered list of section names representing the ideal ${isLinkedIn ? "LinkedIn profile" : "resume"} structure for this candidate's target role.
6. Be honest with scores; do not inflate them.
7. specificImprovements must contain at least 5 items, each pointing to an EXACT part of the text, not generic advice.
`;

  let completion;
  try {
    completion = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert ATS resume analyzer and professional resume writer. You NEVER fabricate facts, experience, or achievements that are not in the original text. Respond ONLY with valid JSON, no markdown code fences, no commentary outside the JSON.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
      max_tokens: 4000,
    });
  } catch (apiErr) {
    console.error("=== GROQ API CALL FAILED ===");
    console.error("Message:", apiErr.message);
    console.error("Status:", apiErr.status);
    console.error("Full error:", JSON.stringify(apiErr, Object.getOwnPropertyNames(apiErr), 2));
    throw new Error(`Groq API call failed: ${apiErr.message || "Unknown error"}`);
  }

  const response = completion.choices[0].message.content;

  const cleaned = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (parseErr) {
    console.error("=== JSON PARSE FAILED ===");
    console.error("Raw AI response was:", response);
    throw new Error(`AI response was not valid JSON: ${parseErr.message}`);
  }
}

// Analyze Route - for LinkedIn / pasted text
app.post("/analyze", async (req, res) => {
  try {
    const { text, targetRole, sourceType } = req.body;

    if (!text || text.trim().length < 50) {
      return res.status(400).json({
        message: "Please provide at least 50 characters of resume/profile text",
      });
    }

    const json = await runAnalysis(text, targetRole, sourceType || "linkedin");

    json.targetRole = targetRole;
    json.receivedText = text;
    json.sourceType = sourceType || "linkedin";

    res.json(json);
  } catch (err) {
    console.error("Analyze route error:", err.message);
    res.status(500).json({
      message: "Groq API Error",
      error: err.message,
    });
  }
});

// Analyze File Route - for uploaded PDF/DOCX
app.post("/analyze-file", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { targetRole, sourceType } = req.body;

    let rawText;
    try {
      rawText = await extractTextFromBuffer(req.file.buffer, req.file.originalname);
    } catch (err) {
      return res.status(400).json({
        message: `Could not extract text from file: ${err.message}`,
      });
    }

    const text = cleanExtractedText(rawText);

    if (!text || text.length < 50) {
      return res.status(400).json({
        message:
          "Could not extract meaningful text from this file. It may be scanned/image-based — try a text-based PDF or DOCX instead.",
      });
    }

    const json = await runAnalysis(text, targetRole, sourceType || "resume");

    json.targetRole = targetRole;
    json.receivedText = text;
    json.sourceType = sourceType || "resume";

    res.json(json);
  } catch (err) {
    console.error("Analyze-file route error:", err.message);
    res.status(500).json({
      message: "Groq API Error",
      error: err.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});