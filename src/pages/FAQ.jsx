import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'What file types can I upload?',
    a: 'You can upload resumes as PDF or DOCX files. If your resume is in another format, you can also just paste the text directly using the LinkedIn/text mode.',
  },
  {
    q: 'How is the ATS score calculated?',
    a: "The ATS score reflects how well your resume would likely parse and rank in a typical Applicant Tracking System — based on formatting simplicity, keyword relevance to your target role, standard section headers, and clear structure.",
  },
  {
    q: 'Does the AI make up things that aren’t in my resume?',
    a: 'No. ProfileIQ is built with strict rules that prevent the AI from inventing facts, companies, job titles, or achievements. The rewritten sections only reorganize and rephrase content that already exists in your original resume or LinkedIn text.',
  },
  {
    q: 'What’s the difference between Resume mode and LinkedIn mode?',
    a: 'Resume mode analyzes an uploaded PDF/DOCX as a full resume, covering summary, skills, experience, and projects. LinkedIn mode is designed for a shorter "About" section and only rewrites that summary — it won’t invent an experience or projects section that isn’t there.',
  },
  {
    q: 'Is my resume data stored or shared?',
    a: 'Your resume text is processed to generate your analysis and results. We don’t sell or share your data with third parties. If you have specific privacy questions, feel free to reach out via the Contact page.',
  },
  {
    q: 'Can I analyze the same resume for different job roles?',
    a: 'Yes. Just enter a different target role each time you run an analysis — the AI will tailor missing keywords, suggested activities, and scoring to that specific role.',
  },
  {
    q: 'Why does my rewritten resume look empty in some sections?',
    a: 'If a section (like Projects) isn’t present in your original resume, ProfileIQ intentionally leaves it blank instead of making something up. Check the "Ideas to Strengthen Your Resume" section for suggestions on what to add instead.',
  },
  {
    q: 'Is ProfileIQ free to use?',
    a: 'Yes, ProfileIQ is currently free to use while we continue building out the product.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="text-center mb-12">

        <div className="w-14 h-14 rounded-2xl bg-[#182C61] flex items-center justify-center mx-auto mb-5">
          <HelpCircle className="w-7 h-7 text-white" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h1>

        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Everything you need to know about how ProfileIQ works.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((item, i) => (
          <div
            key={i}
            className="glass rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-semibold text-slate-900 dark:text-white">
                {item.q}
              </span>

              <ChevronDown
                className={`w-5 h-5 shrink-0 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
                  openIndex === i ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openIndex === i && (
              <div className="px-5 pb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">

        <p className="text-slate-600 dark:text-slate-400 mb-3">
          Still have questions?
        </p>

        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#182C61] text-white font-semibold shadow-lg shadow-[#182C61]/30 hover:bg-[#182C61] hover:shadow-[#182C61]/50 transition-all duration-200"
        >
          Contact Us
        </a>

      </div>
    </div>
  );
}