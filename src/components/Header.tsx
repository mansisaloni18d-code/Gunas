import React from 'react';
import { Sparkles, RotateCcw, BookOpen, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  completedCount: number;
  totalCount: number;
  onOpenPhilosophy: () => void;
  onReset: () => void;
  onLoadDemo: () => void;
  isSubmitted: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  completedCount,
  totalCount,
  onOpenPhilosophy,
  onReset,
  onLoadDemo,
  isSubmitted
}) => {
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-amber-950/40 text-amber-50 px-4 py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-300 p-0.5 shadow-lg flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-lg md:text-xl font-bold text-amber-100 tracking-tight">
                Three Gunas Self-Reflection
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-900/60 text-amber-300 border border-amber-700/50 font-sans font-medium">
                Gita & Ayurveda
              </span>
            </div>
            <p className="text-xs text-amber-300/70 font-sans hidden sm:block">
              Assess your balance of Sattva, Rajas, and Tamas
            </p>
          </div>
        </div>

        {/* Progress & Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {!isSubmitted && (
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>
                Progress: <strong className="text-amber-300">{completedCount}/{totalCount}</strong> ({percentage}%)
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPhilosophy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 text-amber-200 border border-amber-800/60 text-xs font-medium transition-all"
              title="Learn about Sattva, Rajas & Tamas philosophy"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Guna Guide</span>
            </button>

            {!isSubmitted && completedCount < totalCount && (
              <button
                onClick={onLoadDemo}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium transition-all"
                title="Fill with balanced demo responses for quick preview"
              >
                Demo Fill
              </button>
            )}

            {(completedCount > 0 || isSubmitted) && (
              <button
                onClick={onReset}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/80 hover:text-rose-200 text-slate-300 border border-slate-700 text-xs font-medium transition-all"
                title="Reset questionnaire"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
