import { useState, useRef } from "react";
import { Upload, FileText, X } from "lucide-react";

export default function DropZone({ onFile }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const handle = (f) => {
    if (!f) return;

    setFile(f);
    onFile?.(f);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const f = e.dataTransfer.files?.[0];

    handle(f);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300 ${
        dragging
          ? "border-[#182C61] bg-[#F1F4F8] scale-[1.02]"
          : "border-[#C9D4E3] hover:border-[#182C61] hover:bg-[#F8FAFC]"
      }`}
    >

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) =>
          handle(e.target.files?.[0])
        }
      />


      <div className="flex flex-col items-center gap-3">

        {/* Upload Icon */}
        <div
          className={`w-16 h-16 rounded-2xl bg-[#182C61] flex items-center justify-center shadow-xl transition-transform duration-300 ${
            dragging
              ? "scale-110 rotate-6"
              : ""
          }`}
        >

          {file ? (
            <FileText className="w-8 h-8 text-white" />
          ) : (
            <Upload className="w-8 h-8 text-white" />
          )}

        </div>


        {file ? (

          <>
            <p className="font-semibold text-[#182C61]">
              {file.name}
            </p>

            <p className="text-xs text-[#60708A]">
              {(file.size / 1024).toFixed(1)} KB · Click to replace
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                onFile?.(null);
              }}
              className="mt-2 inline-flex items-center gap-1 text-xs text-rose-600 hover:underline"
            >

              <X className="w-3 h-3" />

              Remove

            </button>
          </>

        ) : (

          <>
            <p className="font-semibold text-[#182C61]">
              Drag & drop your resume here
            </p>

            <p className="text-sm text-[#60708A]">

              or{" "}

              <span className="text-[#182C61] font-medium">
                browse files
              </span>

              {" "}· PDF, DOC up to 10MB

            </p>
          </>

        )}

      </div>

    </div>
  );
}