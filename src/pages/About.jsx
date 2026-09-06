import { Target, Sparkles, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="text-center mb-14">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">
          About <span className="text-gradient">ProfileIQ</span>
        </h1>

        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          We help job seekers understand exactly what's holding their resume back —
          and exactly how to fix it.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-16">

        <div className="glass rounded-2xl p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#182C61] flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-white" />
          </div>

          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
            Specific, not generic
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400">
            We point to the exact line that needs fixing, not vague advice.
          </p>
        </div>

        <div className="glass rounded-2xl p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#182C61] flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-white" />
          </div>

          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
            AI-powered
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400">
            Fast, structured feedback backed by large language models.
          </p>
        </div>

        <div className="glass rounded-2xl p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#182C61] flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>

          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
            Honest, no fabrication
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400">
            We only rewrite what's actually in your resume — never invented facts.
          </p>
        </div>

      </div>

      <div className="glass-strong rounded-3xl p-8 sm:p-10">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Our story
        </h2>

        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          ProfileIQ started as a simple idea: most resume advice online is generic and
          forgettable. We built a tool that reads your actual resume or LinkedIn profile,
          finds the real, specific issues holding it back, and gives you fixes you can
          use immediately — not just a score.
        </p>
      </div>
    </div>
  );
}