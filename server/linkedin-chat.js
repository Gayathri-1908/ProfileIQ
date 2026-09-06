const express = require("express");
const Groq = require("groq-sdk");

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = "openai/gpt-oss-120b";

const SYSTEM_PROMPT = `You are a helpful, friendly LinkedIn strategy assistant built into ProfileIQ.

You help users with questions about:
- Writing a strong LinkedIn "About" section
- Optimizing their headline
- What to post and how often
- Growing their network and getting profile views
- How recruiters use LinkedIn search and what to optimize for
- General LinkedIn best practices and etiquette

Rules:
- Keep answers concise and practical (3-6 sentences, or a short bulleted list for multi-part answers)
- Be encouraging and specific, not generic corporate fluff
- If a question is completely unrelated to LinkedIn, resumes, or job search, politely redirect: "I'm focused on LinkedIn and career profile questions — feel free to ask me anything about that!"
- Never fabricate statistics or specific claims you're not confident about; speak in general best-practice terms instead`;

router.post("/linkedin-chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: "Please enter a question" });
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(Array.isArray(history) ? history.slice(-6) : []), // keep last few turns for context
      { role: "user", content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages,
      temperature: 0.6,
      max_tokens: 500,
    });

    const reply = completion.choices[0].message.content;

    res.json({ reply });
  } catch (err) {
    console.error("LinkedIn chat error:", err);
    res.status(500).json({ message: "Failed to get a response", error: err.message });
  }
});

module.exports = router;