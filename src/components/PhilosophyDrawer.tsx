import React from 'react';
import { X, BookOpen, Sparkles, Feather, Shield, Compass } from 'lucide-react';
import { GUNA_DETAILS, PHILOSOPHY_OVERVIEW } from '../data/philosophyData';

interface PhilosophyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhilosophyDrawer: React.FC<PhilosophyDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-amber-900/60 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl relative text-slate-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-amber-400">
            <BookOpen className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-wider">Philosophical Reference Guide</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-100">
            {PHILOSOPHY_OVERVIEW.title}
          </h2>
          <p className="text-xs md:text-sm text-slate-400">
            {PHILOSOPHY_OVERVIEW.subtitle}
          </p>
        </div>

        {/* Intro */}
        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
          {PHILOSOPHY_OVERVIEW.intro}
        </p>

        {/* Key Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PHILOSOPHY_OVERVIEW.keyPrinciples.map((principle, idx) => (
            <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-1">
              <h4 className="font-serif font-bold text-amber-300 text-sm">{principle.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{principle.desc}</p>
            </div>
          ))}
        </div>

        {/* Deep Dive into 3 Gunas */}
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-amber-200 border-b border-slate-800 pb-2">
            The Three Gunas in Detail
          </h3>

          {Object.entries(GUNA_DETAILS).map(([key, detail]) => (
            <div key={key} className={`border rounded-xl p-5 space-y-3 bg-slate-950/60 ${detail.borderColor}`}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-serif text-amber-300">{detail.sanskritName}</span>
                  <div>
                    <h4 className="font-bold text-lg text-slate-100">{detail.name}</h4>
                    <span className="text-xs text-slate-400 block">{detail.translation}</span>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${detail.badgeBg}`}>
                  {detail.element}
                </span>
              </div>

              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg text-xs font-serif text-amber-200 italic">
                "{detail.gitaVerse}"
                <span className="block mt-1 font-sans text-[10px] text-amber-400 font-semibold uppercase">
                  — {detail.gitaReference}
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-slate-300 block">Psychological Traits:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
                  {detail.psychologicalCharacteristics.map((trait, i) => (
                    <li key={i}>{trait}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <p className="text-slate-300">
                  <strong className="text-amber-300">Ayurvedic Impact:</strong> {detail.ayurvedicImpact}
                </p>
                <p className="text-slate-300">
                  <strong className="text-amber-300">Cultivation / Balancing:</strong> {detail.howToCultivateOrBalance}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
          >
            Return to Assessment
          </button>
        </div>
      </div>
    </div>
  );
};
