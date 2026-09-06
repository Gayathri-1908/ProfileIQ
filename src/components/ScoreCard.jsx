import { TrendingUp } from 'lucide-react';

const colorMap = {
  excellent: { bar: 'from-emerald-400 to-green-500', text: 'text-emerald-600 dark:text-emerald-400', ring: 'ring-emerald-500/20' },
  good: { bar: 'from-indigo-400 to-purple-500', text: 'text-indigo-600 dark:text-indigo-400', ring: 'ring-indigo-500/20' },
  fair: { bar: 'from-amber-400 to-orange-500', text: 'text-amber-600 dark:text-amber-400', ring: 'ring-amber-500/20' },
  poor: { bar: 'from-rose-400 to-red-500', text: 'text-rose-600 dark:text-rose-400', ring: 'ring-rose-500/20' },
};

function getTier(score) {
  if (score >= 85) return 'excellent';
  if (score >= 70) return 'good';
  if (score >= 50) return 'fair';
  return 'poor';
}

export default function ScoreCard({ title, score, icon: Icon, large = false }) {
  const tier = getTier(score);
  const c = colorMap[tier];

  return (
    <div className={`glass rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ring-1 ${c.ring}`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.bar} flex items-center justify-center shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <TrendingUp className={`w-4 h-4 ${c.text}`} />
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{title}</p>
      <div className="flex items-end justify-between mt-2">
        <p className={`${large ? 'text-4xl' : 'text-3xl'} font-bold text-slate-900 dark:text-white`}>
          {score}
          <span className="text-lg text-slate-400 dark:text-slate-500">/100</span>
        </p>
      </div>
      <div className="mt-3 h-2 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${c.bar} rounded-full transition-all duration-1000`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}