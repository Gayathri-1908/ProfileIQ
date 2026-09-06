import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  FileSearch,
  Target,
  Brain,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Upload,
  BarChart3,
  Wand2,
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      desc: 'Advanced algorithms evaluate your resume against industry standards.',
    },
    {
      icon: Target,
      title: 'ATS Optimization',
      desc: 'Beat applicant tracking systems with keyword-optimized content.',
    },
    {
      icon: ShieldCheck,
      title: 'Professional Scoring',
      desc: 'Get detailed scores across readability, tone, and impact.',
    },
    {
      icon: Wand2,
      title: 'Smart Rewrites',
      desc: 'AI-generated improved summaries tailored to your target role.',
    },
    {
      icon: Zap,
      title: 'Instant Feedback',
      desc: 'Get actionable insights in seconds, not days.',
    },
    {
      icon: FileSearch,
      title: 'LinkedIn Ready',
      desc: 'Analyze your About section for maximum recruiter visibility.',
    },
  ];

  const steps = [
    {
      icon: Upload,
      title: 'Upload',
      desc: 'Drop your resume PDF or paste your LinkedIn About section.',
    },
    {
      icon: BarChart3,
      title: 'Analyze',
      desc: 'Our AI engine scores your content across 5 key dimensions.',
    },
    {
      icon: Sparkles,
      title: 'Improve',
      desc: 'Receive tailored suggestions and AI-rewritten content.',
    },
  ];

  return (
    <div className="relative overflow-hidden bg-white">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">

          <div className="text-center max-w-4xl mx-auto">

            {/* AI Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5F7FA] border border-[#D9E0EA] text-sm font-medium text-[#182C61] mb-6">
              <Sparkles className="w-4 h-4 text-[#182C61]" />
              Powered by Advanced AI
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#182C61]">
              Elevate your{" "}
              <span className="text-[#182C61]">career</span>{" "}
              with AI-powered resume analysis
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg sm:text-xl text-[#60708A] max-w-2xl mx-auto">
              Get instant, data-driven feedback on your resume and LinkedIn
              profile. Beat ATS systems, highlight your strengths, and stand out
              to recruiters.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

              {/* Primary Button */}
              <Link
                to="/analyzer"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#182C61] text-white font-semibold shadow-lg hover:bg-[#182C61] active:bg-[#182C61] hover:scale-105 transition-all duration-200"
              >
                Analyze My Resume

                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              {/* Secondary Button */}
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[#182C61] bg-white text-[#182C61] font-semibold hover:bg-white hover:text-[#182C61] hover:scale-105 transition-all duration-200"
              >
                See How It Works
              </a>

            </div>

            {/* Sample Analysis */}
            <div className="mt-16 relative">

              <div className="absolute inset-0 bg-[#182C61] blur-3xl opacity-5"></div>

              <div className="relative bg-white border border-[#D9E0EA] rounded-3xl p-6 sm:p-8 shadow-xl max-w-3xl mx-auto">

                <p className="text-xs font-semibold uppercase tracking-wide text-[#60708A] mb-4 text-left">
                  Sample analysis
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                  {[
                    { label: 'ATS Score', value: 76, color: '#182C61' },
                    { label: 'Readability', value: 88, color: '#182C61' },
                    { label: 'Keywords', value: 71, color: '#182C61' },
                    { label: 'Overall', value: 82, color: '#182C61' },
                  ].map((s) => (

                    <div
                      key={s.label}
                      className="p-4 rounded-2xl bg-white border border-[#D9E0EA] shadow-sm"
                    >
                      <p className="text-xs font-medium text-[#60708A]">
                        {s.label}
                      </p>

                      <p
                        className="mt-1 text-3xl font-bold"
                        style={{ color: s.color }}
                      >
                        {s.value}
                      </p>

                    </div>

                  ))}

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ================= FEATURES SECTION ================= */}
      <section id="features" className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16">

            <h2 className="text-4xl sm:text-5xl font-semibold text-[#182C61]">
              Everything you need to{' '}
              <span className="text-[#182C61]">
                build a stronger resume
              </span>
            </h2>

            <p className="mt-4 text-lg text-[#60708A]">
              A complete toolkit for crafting resumes that get interviews.
            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {features.map((f, i) => (

              <div
                key={i}
                className="group bg-white border border-[#D9E0EA] rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                {/* ICON */}
                <div className="w-12 h-12 rounded-xl bg-[#182C61] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">

                  <f.icon className="w-6 h-6 text-white" />

                </div>


                {/* FEATURE TITLE */}
                <h3 className="mt-5 text-xl font-bold text-[#182C61]">
                  {f.title}
                </h3>


                {/* FEATURE DESCRIPTION */}
                <p className="mt-2 text-[#60708A] leading-relaxed">
                  {f.desc}
                </p>

              </div>

            ))}

          </div>

        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24 bg-[#F5F7FA]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16">

            <h2 className="text-4xl sm:text-5xl font-semibold text-[#182C61]">
              How it works
            </h2>

            <p className="mt-4 text-lg text-[#60708A]">
              Three simple steps to a better resume.
            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {steps.map((s, i) => (

              <div key={i} className="relative">

                <div className="bg-white border border-[#D9E0EA] rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                  {/* STEP ICON */}
                  <div className="inline-flex w-16 h-16 rounded-2xl bg-[#182C61] items-center justify-center shadow-xl">

                    <s.icon className="w-8 h-8 text-white" />

                  </div>


                  {/* NUMBER */}
                  <div className="mt-5 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#182C61] text-white font-bold text-sm">
                    {i + 1}
                  </div>


                  {/* TITLE */}
                  <h3 className="mt-3 text-xl font-bold text-[#182C61]">
                    {s.title}
                  </h3>


                  {/* DESCRIPTION */}
                  <p className="mt-2 text-[#60708A]">
                    {s.desc}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>
      </section>


      {/* ================= CTA SECTION ================= */}
      <section className="py-24 bg-white">

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-3xl bg-[#182C61] p-10 sm:p-16 text-center shadow-2xl">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]"></div>

            <div className="relative">

              <h2 className="text-4xl sm:text-5xl font-semibold text-white">
                Ready to level up your career?
              </h2>

              <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
                Get instant, honest feedback on your resume.
              </p>


              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">

                {/* CTA BUTTON */}
                <Link
                  to="/analyzer"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#182C61] font-semibold shadow-xl hover:bg-white hover:text-[#182C61] hover:scale-105 transition-all duration-200"
                >
                  Get Started Free

                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>


                <div className="flex items-center gap-2 text-white/90">

                  <CheckCircle2 className="w-5 h-5" />

                  <span className="text-sm">
                    No credit card required
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}