import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import { DimensionAnalysis } from '../types';

interface GunaChartsProps {
  sattvaPct: number;
  rajasPct: number;
  tamasPct: number;
  dimensionAnalyses: DimensionAnalysis[];
}

export const GunaCharts: React.FC<GunaChartsProps> = ({
  sattvaPct,
  rajasPct,
  tamasPct,
  dimensionAnalyses,
}) => {
  // Pie chart data
  const pieData = [
    { name: 'Sattva (Purity/Harmony)', value: sattvaPct, color: '#10b981' }, // Emerald
    { name: 'Rajas (Passion/Action)', value: rajasPct, color: '#e11d48' },   // Crimson
    { name: 'Tamas (Inertia/Darkness)', value: tamasPct, color: '#6366f1' }, // Indigo
  ];

  // Radar chart data for 7 dimensions
  const radarData = dimensionAnalyses.map((dim) => ({
    dimension: dim.dimension,
    Sattva: dim.sattvaScore,
    Rajas: dim.rajasScore,
    Tamas: dim.tamasScore,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
      {/* Guna Percentages Donut Chart */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-serif font-bold text-amber-100 mb-1">
            Guna Distribution Breakdown
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Percentage proportion of Sattva, Rajas, and Tamas in your current state
          </p>
        </div>

        <div className="h-64 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                formatter={(value: number) => [`${value}%`, 'Share']}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center text in donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-slate-400 uppercase tracking-wider">Balance</span>
            <span className="text-xl font-bold font-mono text-amber-300">100%</span>
          </div>
        </div>

        {/* Legend Pills */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-center text-xs">
          <div className="p-2 bg-emerald-950/40 border border-emerald-800/60 rounded-lg">
            <span className="text-emerald-400 font-bold block">{sattvaPct}%</span>
            <span className="text-emerald-200/90 font-medium">Sattva</span>
          </div>
          <div className="p-2 bg-rose-950/40 border border-rose-800/60 rounded-lg">
            <span className="text-rose-400 font-bold block">{rajasPct}%</span>
            <span className="text-rose-200/90 font-medium">Rajas</span>
          </div>
          <div className="p-2 bg-indigo-950/40 border border-indigo-800/60 rounded-lg">
            <span className="text-indigo-400 font-bold block">{tamasPct}%</span>
            <span className="text-indigo-200/90 font-medium">Tamas</span>
          </div>
        </div>
      </div>

      {/* 7 Psychological Dimensions Radar Chart */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-serif font-bold text-amber-100 mb-1">
            7 Psychological Dimensions Profile
          </h3>
          <p className="text-xs text-slate-400 mb-2">
            Comparison of Sattva, Rajas, and Tamas across key psychological domains
          </p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="dimension" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 5]} stroke="#475569" tick={{ fill: '#64748b', fontSize: 9 }} />
              <Radar name="Sattva" dataKey="Sattva" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
              <Radar name="Rajas" dataKey="Rajas" stroke="#e11d48" fill="#e11d48" fillOpacity={0.3} />
              <Radar name="Tamas" dataKey="Tamas" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#e2e8f0' }} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 text-center">
          Evaluates Ego, Emotional Control, Discipline, Compassion, Patience, Honesty & Self-Awareness.
        </div>
      </div>
    </div>
  );
};
