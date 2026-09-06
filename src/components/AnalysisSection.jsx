import { CheckCircle2, XCircle, AlertTriangle, Lightbulb, Sparkles } from 'lucide-react';

const variants = {
  strengths: {
    icon: CheckCircle2,
    title: 'Strengths',
    gradient: 'from-emerald-500 to-green-600',
    itemClass: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10',
    iconClass: 'text-emerald-500',
  },
  weaknesses: {
    icon: XCircle,
    title: 'Weaknesses',
    gradient: 'from-rose-500 to-red-600',
    itemClass: 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10',
    iconClass: 'text-rose-500',
  },
  keywords: {
    icon: AlertTriangle,
    title: 'Missing Keywords',
    gradient: 'from-amber-500 to-orange-600',
    itemClass: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10',
    iconClass: 'text-amber-500',
  },
  skills: {
    icon: Lightbulb,
    title: 'Suggested Skills',
    gradient: 'from-indigo-500 to-purple-600',
    itemClass: 'text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10',
    iconClass: 'text-indigo-500',
  },
};

export default function AnalysisSection({ type, items }) {
  const v = variants[type];
  const Icon = v.icon;

  return (
    <div className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${v.gradient} flex items-center justify-center shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{v.title}</h3>
      </div>

      {type === 'keywords' || type === 'skills' ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <span
              key={i}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${v.itemClass} hover:scale-105 transition-transform duration-200`}
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 group">
              <div className={`mt-1 w-2 h-2 rounded-full ${v.iconClass.replace('text-', 'bg-')} group-hover:scale-125 transition-transform duration-200`} />
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{item}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function GrammarSection({ items }) {
  return (
    <div className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Grammar Improvements</h3>
      </div>
      <div className="space-y-3">
        {items.map((g, i) => (
          <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-pink-300 dark:hover:border-pink-500/30 transition-colors duration-200">
            <p className="text-sm font-semibold text-rose-600 dark:text-rose-400 mb-1">{g.issue}</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">{g.fix}</p>
          </div>
        ))}
      </div>
    </div>
  );
}