import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useState } from "react";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00072D] hover:bg-[#182C61] text-white text-xs font-semibold transition-colors"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}

      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function Results() {
  const analysis = JSON.parse(
    sessionStorage.getItem("analysis")
  );

  /* No Analysis */
  if (!analysis) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100">

        <h2 className="text-2xl font-bold text-[#182C61]">
          No Analysis Found
        </h2>

        <Link
          to="/analyzer"
          className="mt-5 px-6 py-3 bg-[#00072D] hover:bg-[#182C61] text-white rounded-lg transition"
        >
          Go Back
        </Link>

      </div>
    );
  }

  const specificImprovements =
    analysis.specificImprovements || [];

  const missingKeywords =
    analysis.missingKeywords || [];

  const grammarIssues =
    analysis.grammarIssues || [];

  const formattingIssues =
    analysis.formattingIssues || [];

  const rewritten =
    analysis.rewrittenResume || {};

  const suggestedActivities =
    analysis.suggestedActivities || [];

  const recommendedSectionOrder =
    analysis.recommendedSectionOrder || [];

  const isLinkedIn =
    analysis.sourceType === "linkedin";

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">

      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <Link
          to="/analyzer"
          className="inline-flex items-center gap-2 mb-8 text-[#182C61] hover:text-[#182C61] font-medium"
        >
          <ArrowLeft size={18} />
          Back
        </Link>


        {/* Main Heading */}
        <h1 className="text-4xl font-bold text-[#182C61] mb-8 text-center">

          {isLinkedIn
            ? "AI LinkedIn Profile Analysis"
            : "AI Resume Analysis"}

        </h1>


        {/* Scores */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          {/* Overall Score */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">

            <h2 className="text-xl font-bold text-[#182C61] mb-3">
              Overall Score
            </h2>

            <p className="text-5xl font-bold text-[#182C61]">
              {analysis.overall}
            </p>

          </div>


          {/* ATS Score */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">

            <h2 className="text-xl font-bold text-[#182C61] mb-3">
              ATS Score
            </h2>

            <p className="text-5xl font-bold text-[#182C61]">
              {analysis.ats}
            </p>

          </div>

        </div>


        {/* Target Role */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">

          <h2 className="text-xl font-bold text-[#182C61] mb-3">
            Target Role
          </h2>

          <p className="text-[#182C61]">
            {analysis.targetRole}
          </p>

        </div>


        {/* Submitted Resume */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">

          <h2 className="text-xl font-bold text-[#182C61] mb-3">

            {isLinkedIn
              ? "Submitted LinkedIn Text"
              : "Submitted Resume Text"}

          </h2>

          <p className="whitespace-pre-wrap text-[#182C61]">
            {analysis.receivedText}
          </p>

        </div>


        {/* Strengths */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">

          <h2 className="text-xl font-bold text-[#182C61] mb-4">
            Strengths
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-[#182C61]">

            {analysis.strengths?.map((item, index) => (
              <li key={index}>
                {item}
              </li>
            ))}

          </ul>

        </div>


        {/* Weaknesses */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">

          <h2 className="text-xl font-bold text-[#182C61] mb-4">
            Weaknesses
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-[#182C61]">

            {analysis.weaknesses?.map((item, index) => (
              <li key={index}>
                {item}
              </li>
            ))}

          </ul>

        </div>


        {/* Specific Improvements */}
        {specificImprovements.length > 0 && (

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">

            <h2 className="text-xl font-bold text-[#182C61] mb-4">
              Mistakes & Specific Fixes
            </h2>

            <div className="space-y-4">

              {specificImprovements.map((item, index) => (

                <div
                  key={index}
                  className="border border-[#9BB8E8] bg-[#EEF4FF] rounded-lg p-4"
                >

                  <p className="text-xs font-semibold uppercase tracking-wide text-[#182C61] mb-1">
                    {item.section}
                  </p>

                  <p className="text-sm text-[#182C61] mb-2">

                    <span className="font-semibold">
                      Issue:
                    </span>{" "}

                    {item.issue}

                  </p>

                  <p className="text-sm text-[#182C61]">

                    <span className="font-semibold">
                      Fix:
                    </span>{" "}

                    {item.fix}

                  </p>

                </div>

              ))}

            </div>

          </div>

        )}


        {/* Missing Keywords */}
        {missingKeywords.length > 0 && (

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">

            <h2 className="text-xl font-bold text-[#182C61] mb-4">
              Missing Keywords
            </h2>

            <div className="flex flex-wrap gap-2">

              {missingKeywords.map((kw, index) => (

                <span
                  key={index}
                  className="px-3 py-1.5 rounded-full bg-[#182C61]/10 text-[#182C61] text-sm font-medium"
                >
                  {kw}
                </span>

              ))}

            </div>

          </div>

        )}


        {/* Grammar Issues */}
        {grammarIssues.length > 0 && (

          <div className="bg-white rounded-xl shadow p-6 mb-8">

            <h2 className="text-xl font-bold text-[#182C61] mb-4">
              Grammar Issues
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-[#182C61]">

              {grammarIssues.map((item, index) => (
                <li key={index}>
                  {item}
                </li>
              ))}

            </ul>

          </div>

        )}


        {/* Formatting Issues */}
        {formattingIssues.length > 0 && (

          <div className="bg-white rounded-xl shadow p-6 mb-8">

            <h2 className="text-xl font-bold text-[#182C61] mb-4">
              Formatting Issues
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-[#182C61]">

              {formattingIssues.map((item, index) => (
                <li key={index}>
                  {item}
                </li>
              ))}

            </ul>

          </div>

        )}


        {/* Recommended Section Order */}
        {recommendedSectionOrder.length > 0 && (

          <div className="bg-white rounded-xl shadow p-6 mb-8">

            <h2 className="text-xl font-bold text-[#182C61] mb-4">

              {isLinkedIn
                ? "Recommended Profile Order"
                : "Recommended Resume Order"}

            </h2>

            <ol className="space-y-2">

              {recommendedSectionOrder.map(
                (section, index) => (

                  <li
                    key={index}
                    className="flex items-center gap-3"
                  >

                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#182C61]/10 text-[#182C61] text-sm font-bold shrink-0">
                      {index + 1}
                    </span>

                    <span className="text-sm font-medium text-[#182C61]">
                      {section}
                    </span>

                  </li>

                )
              )}

            </ol>

          </div>

        )}


        {/* Suggested Activities */}
        {suggestedActivities.length > 0 && (

          <div className="bg-white rounded-xl shadow p-6 mb-8">

            <h2 className="text-xl font-bold text-[#182C61] mb-2">
              Ideas to Strengthen Your Resume
            </h2>

            <p className="text-xs text-[#182C61]/70 mb-4">
              These are suggestions for future experience/projects — not
              things assumed to already be on your resume.
            </p>

            <div className="space-y-3">

              {suggestedActivities.map((item, index) => (

                <div
                  key={index}
                  className="border border-[#9BB8E8] bg-[#EEF4FF] rounded-lg p-4"
                >

                  <p className="text-xs font-semibold uppercase tracking-wide text-[#182C61] mb-1">
                    {item.area}
                  </p>

                  <p className="text-sm text-[#182C61]">
                    {item.suggestion}
                  </p>

                </div>

              ))}

            </div>

          </div>

        )}


        {/* Rewritten Resume */}
        {(isLinkedIn
          ? rewritten.summary
          : rewritten.summary ||
            rewritten.skills ||
            rewritten.experience ||
            rewritten.projects) && (

          <div className="bg-white rounded-xl shadow p-6 mb-8">

            <h2 className="text-xl font-bold text-[#182C61] mb-1">

              {isLinkedIn
                ? "AI Rewritten LinkedIn Summary (Ready to Paste)"
                : "AI Rewritten Resume (Ready to Paste)"}

            </h2>

            <p className="text-xs text-[#182C61]/70 mb-6">
              Rephrased and reorganized from your original content only —
              no invented facts, numbers, or achievements.
            </p>


            <div className="space-y-6">


              {/* Summary */}
              {rewritten.summary && (

                <div>

                  <div className="flex items-center justify-between mb-2">

                    <h3 className="font-semibold text-[#182C61]">
                      Professional Summary
                    </h3>

                    <CopyButton text={rewritten.summary} />

                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 whitespace-pre-wrap text-sm text-[#182C61]">
                    {rewritten.summary}
                  </div>

                </div>

              )}


              {/* Skills */}
              {rewritten.skills && (

                <div>

                  <div className="flex items-center justify-between mb-2">

                    <h3 className="font-semibold text-[#182C61]">
                      Skills
                    </h3>

                    <CopyButton text={rewritten.skills} />

                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 whitespace-pre-wrap text-sm text-[#182C61]">
                    {rewritten.skills}
                  </div>

                </div>

              )}


              {/* Experience */}
              {!isLinkedIn && rewritten.experience && (

                <div>

                  <div className="flex items-center justify-between mb-2">

                    <h3 className="font-semibold text-[#182C61]">
                      Experience
                    </h3>

                    <CopyButton text={rewritten.experience} />

                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 whitespace-pre-wrap text-sm text-[#182C61]">
                    {rewritten.experience}
                  </div>

                </div>

              )}


              {/* Projects */}
              {!isLinkedIn && rewritten.projects && (

                <div>

                  <div className="flex items-center justify-between mb-2">

                    <h3 className="font-semibold text-[#182C61]">
                      Projects
                    </h3>

                    <CopyButton text={rewritten.projects} />

                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 whitespace-pre-wrap text-sm text-[#182C61]">
                    {rewritten.projects}
                  </div>

                </div>

              )}

            </div>

          </div>

        )}


        {/* Final Message */}
        <div className="bg-[#00072D] text-white rounded-xl p-6 text-center">

          <h2 className="text-xl font-bold text-white">
            {analysis.message}
          </h2>

        </div>

      </div>

    </div>
  );
}