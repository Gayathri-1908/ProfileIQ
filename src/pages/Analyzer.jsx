import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  FileText,
  Linkedin,
  Target,
  Loader2,
} from "lucide-react";
import DropZone from "../components/DropZone";
import { API_URL } from "../config";

export default function Analyzer() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [linkedin, setLinkedin] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("resume");

  const canAnalyze =
    (mode === "resume" && file) ||
    (mode === "linkedin" && linkedin.trim().length > 50);

  const handleAnalyze = async () => {
    if (!canAnalyze) return;

    setLoading(true);

    try {
      let response;

      if (mode === "resume") {
        const formData = new FormData();

        formData.append("resume", file);
        formData.append("targetRole", targetRole);
        formData.append("sourceType", "resume");

        response = await axios.post(
          `${API_URL}/analyze-file`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          `${API_URL}/analyze`,
          {
            text: linkedin,
            targetRole: targetRole,
            sourceType: "linkedin",
          }
        );
      }

      console.log(response.data);
       
      sessionStorage.setItem(
  "analysis",
  JSON.stringify(response.data)
);
      setLoading(false);

      navigate("/results");
    } catch (error) {
      console.error(error);

      const backendMessage =
        error?.response?.data?.message;

      alert(
        backendMessage ||
          "Cannot connect to backend"
      );

      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white min-h-[calc(100vh-4rem)]">

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Heading */}
        <div className="text-center mb-10">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5F7FA] border border-[#D9E0EA] text-sm font-medium text-[#182C61] mb-4">

            <Sparkles className="w-4 h-4 text-[#182C61]" />

            AI Analysis Engine

          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-[#182C61]">

            Analyze your{" "}

            <span className="text-[#182C61]">
              profile
            </span>

          </h1>

          <p className="mt-4 text-lg text-[#60708A] max-w-2xl mx-auto">

            Upload your resume or paste your LinkedIn
            About section to get instant, actionable
            feedback.

          </p>

        </div>


        {/* Main Card */}
        <div className="bg-white border border-[#D9E0EA] rounded-3xl p-6 sm:p-10 shadow-xl">


          {/* Resume / LinkedIn Tabs */}
          <div className="flex gap-2 p-1 rounded-xl bg-[#F1F4F8] mb-8">

            {/* Resume */}
            <button
              onClick={() => setMode("resume")}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                mode === "resume"
                  ? "bg-[#182C61] text-white shadow"
                  : "text-[#60708A] hover:text-[#182C61]"
              }`}
            >

              <FileText className="w-4 h-4" />

              Resume PDF

            </button>


            {/* LinkedIn */}
            <button
              onClick={() => setMode("linkedin")}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                mode === "linkedin"
                  ? "bg-[#182C61] text-white shadow"
                  : "text-[#60708A] hover:text-[#182C61]"
              }`}
            >

              <Linkedin className="w-4 h-4" />

              LinkedIn About

            </button>

          </div>


          {/* Resume Upload / LinkedIn */}
          {mode === "resume" ? (

            <DropZone onFile={setFile} />

          ) : (

            <div>

              <label className="block text-sm font-semibold text-[#182C61] mb-2">

                Paste your LinkedIn About section

              </label>

              <textarea
                value={linkedin}
                onChange={(e) =>
                  setLinkedin(e.target.value)
                }
                rows={8}
                placeholder="Paste your LinkedIn About section here (minimum 50 characters)..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#D9E0EA] text-[#182C61] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#182C61] focus:border-transparent transition-all duration-200 resize-none"
              />

              <p className="mt-2 text-xs text-[#60708A]">

                {linkedin.length} / 50 minimum characters

              </p>

            </div>

          )}


          {/* Target Role */}
          <div className="mt-6">

            <label className="flex items-center gap-2 text-sm font-semibold text-[#182C61] mb-2">

              <Target className="w-4 h-4 text-[#182C61]" />

              Target Job Role (optional)

            </label>

            <input
              type="text"
              value={targetRole}
              onChange={(e) =>
                setTargetRole(e.target.value)
              }
              placeholder="e.g. Senior Full-Stack Engineer"
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#D9E0EA] text-[#182C61] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#182C61] focus:border-transparent transition-all duration-200"
            />

          </div>


          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={!canAnalyze || loading}
            className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#182C61] text-white font-semibold shadow-xl hover:bg-[#182C61] active:bg-[#182C61] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
          >

            {loading ? (

              <>
                <Loader2 className="w-5 h-5 animate-spin" />

                Analyzing your profile...

              </>

            ) : (

              <>
                <Sparkles className="w-5 h-5" />

                Analyze Now

              </>

            )}

          </button>

        </div>

      </div>

    </div>
  );
}