import React, { useState } from 'react';
import { AssessmentResult, GunaType } from '../types';
import { GUNA_DETAILS } from '../data/philosophyData';
import { GunaCharts } from './GunaCharts';
import {
  Sparkles,
  CheckCircle,
  AlertCircle,
  BookOpen,
  ArrowRight,
  Printer,
  Copy,
  RotateCcw,
  Send,
  Loader2,
  Shield,
  Zap,
  Moon,
  Info
} from 'lucide-react';

interface ReportViewProps {
  result: AssessmentResult;
  onRetake: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ result, onRetake }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const domDetail = GUNA_DETAILS[result.dominantGuna];
  const secDetail = GUNA_DETAILS[result.secondaryGuna];

  const handleCopyReport = () => {
    const summaryText = `
=== THREE GUNAS SELF-REFLECTION ASSESSMENT REPORT ===
Percentages:
- Sattva (Harmony/Purity): ${result.percentages.sattvaPct}%
- Rajas (Passion/Action): ${result.percentages.rajasPct}%
- Tamas (Inertia/Darkness): ${result.percentages.tamasPct}%

Dominant Guna: ${result.dominantGuna.toUpperCase()}
Secondary Guna: ${result.secondaryGuna.toUpperCase()}

TOP 5 STRENGTHS:
${result.topStrengths.map((s, i) => `${i + 1}. ${s.title} (${s.guna}): ${s.description}`).join('\n')}

TOP 5 AREAS FOR IMPROVEMENT:
${result.topImprovements.map((imp, i) => `${i + 1}. ${imp.title} (${imp.guna}): ${imp.description}`).join('\n')}

PRACTICAL DAILY SATTVIC HABITS:
${result.dailyHabits.map((h, i) => `${i + 1}. [${h.category}] ${h.title}: ${h.practicalStep}`).join('\n')}

Note: Inspired by Bhagavad Gita, Samkhya & Ayurveda. Not a medical assessment.
`;

    navigator.clipboard.writeText(summaryText.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAskAiScholar = async () => {
    if (aiLoading) return;
    setAiLoading(true);
    setAiError(null);

    try {
      const res = await fetch('/api/guna-ai-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scores: result.percentages,
          dominantGuna: result.dominantGuna,
          secondaryGuna: result.secondaryGuna,
          userQuestion: aiQuestion.trim() || 'Please explain what Bhagavad Gita verse applies to my Guna balance and give me 3 specific Yogic habits.',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate scholar consultation.');
      }

      setAiResponse(data.response);
    } catch (err: any) {
      setAiError(err.message || 'Something went wrong while consulting the AI Scholar.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-16 print:bg-white print:text-black">
      {/* Top Banner & Summary Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-amber-900/50 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-amber-950/60">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-amber-900/60 text-amber-300 border border-amber-700/60 text-xs font-semibold tracking-wide uppercase">
                Guna Profile Report
              </span>
              <span className="text-xs text-slate-400">
                {result.totalQuestionsAnswered}/36 Questions Evaluated
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100 tracking-tight">
              Your Primary Energetic Balance: <span className={domDetail.textColor}>{domDetail.name}</span>
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Secondary Guna: <strong className={secDetail.textColor}>{secDetail.name}</strong> • Objective evaluation based strictly on your reported responses.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 print:hidden shrink-0">
            <button
              onClick={handleCopyReport}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all"
            >
              <Copy className="w-3.5 h-3.5 text-amber-400" />
              <span>{copied ? 'Copied!' : 'Copy Report'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Print</span>
            </button>
            <button
              onClick={onRetake}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Modify Responses</span>
            </button>
          </div>
        </div>

        {/* Big Percentage Stats Bar */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6">
          <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-4 text-center">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 block">
              {result.percentages.sattvaPct}%
            </span>
            <span className="text-xs sm:text-sm font-semibold text-emerald-200 block mt-1">Sattva</span>
            <span className="text-[10px] sm:text-xs text-emerald-300/70 hidden sm:block">Harmony, Clarity & Purity</span>
          </div>

          <div className="bg-rose-950/40 border border-rose-800/60 rounded-xl p-4 text-center">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-rose-400 block">
              {result.percentages.rajasPct}%
            </span>
            <span className="text-xs sm:text-sm font-semibold text-rose-200 block mt-1">Rajas</span>
            <span className="text-[10px] sm:text-xs text-rose-300/70 hidden sm:block">Passion, Action & Desire</span>
          </div>

          <div className="bg-indigo-950/40 border border-indigo-800/60 rounded-xl p-4 text-center">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-indigo-400 block">
              {result.percentages.tamasPct}%
            </span>
            <span className="text-xs sm:text-sm font-semibold text-indigo-200 block mt-1">Tamas</span>
            <span className="text-[10px] sm:text-xs text-indigo-300/70 hidden sm:block">Inertia, Resistance & Darkness</span>
          </div>
        </div>
      </div>

      {/* Visual Charts Component */}
      <GunaCharts
        sattvaPct={result.percentages.sattvaPct}
        rajasPct={result.percentages.rajasPct}
        tamasPct={result.percentages.tamasPct}
        dimensionAnalyses={result.dimensionAnalyses}
      />

      {/* Score Explanation & Bhagavad Gita Context */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-amber-300 font-serif font-bold text-lg border-b border-slate-800 pb-3">
            <Info className="w-5 h-5 text-amber-400" />
            <span>Score Meaning & Analysis</span>
          </div>
          <div className="text-sm text-slate-300 whitespace-pre-line leading-relaxed space-y-2">
            {result.scoreExplanation}
          </div>
          <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-lg text-xs text-slate-400 italic">
            <strong>Calculation Method:</strong> {result.reasoningNote}
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-amber-300 font-serif font-bold text-lg border-b border-slate-800 pb-3">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>Bhagavad Gita Philosophy (Chapter 14)</span>
          </div>
          <div className="text-sm text-slate-300 leading-relaxed space-y-3">
            <p>{result.gitaContext}</p>
            <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-lg text-xs font-serif text-amber-200 italic">
              "{domDetail.gitaVerse}"
              <span className="block mt-1 font-sans text-[10px] text-amber-400 font-semibold uppercase">
                — {domDetail.gitaReference}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 Strengths & Top 5 Areas for Improvement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Strengths */}
        <div className="bg-slate-900/90 border border-emerald-950/60 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-serif font-bold text-xl border-b border-slate-800 pb-3">
            <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
            <span>Top 5 Identified Strengths</span>
          </div>

          <div className="space-y-3">
            {result.topStrengths.map((str, idx) => (
              <div key={idx} className="bg-slate-950/60 border border-emerald-900/40 rounded-xl p-4 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-emerald-300 text-sm">
                    {idx + 1}. {str.title}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-medium">
                    {str.domain}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{str.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Areas for Improvement */}
        <div className="bg-slate-900/90 border border-amber-950/60 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-xl border-b border-slate-800 pb-3">
            <AlertCircle className="w-6 h-6 text-amber-400 shrink-0" />
            <span>Top 5 Areas for Improvement</span>
          </div>

          <div className="space-y-3">
            {result.topImprovements.map((imp, idx) => (
              <div key={idx} className="bg-slate-950/60 border border-amber-900/40 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-amber-300 text-sm">
                    {idx + 1}. {imp.title}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 font-medium">
                    {imp.guna} Tendency
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{imp.description}</p>
                <div className="p-2 bg-amber-950/30 border border-amber-800/30 rounded-lg text-xs text-amber-200">
                  <strong>Recommendation:</strong> {imp.recommendation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analysis Across 7 Psychological Dimensions */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <h3 className="text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            Analysis of 7 Core Psychological Dimensions
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Detailed evaluation of Ego, Emotional Control, Discipline, Compassion, Patience, Honesty, and Self-Awareness based on your answers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.dimensionAnalyses.map((dim, idx) => {
            const isSattvic = dim.dominantAspect === 'Sattvic';
            const isRajasic = dim.dominantAspect === 'Rajasic';

            return (
              <div
                key={idx}
                className={`bg-slate-950/80 border rounded-xl p-4 space-y-2 flex flex-col justify-between ${
                  isSattvic
                    ? 'border-emerald-800/60'
                    : isRajasic
                    ? 'border-rose-800/60'
                    : 'border-indigo-800/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-serif font-bold text-amber-200 text-base">
                      {dim.dimension}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                        isSattvic
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                          : isRajasic
                          ? 'bg-rose-950 text-rose-300 border-rose-700'
                          : 'bg-indigo-950 text-indigo-300 border-indigo-700'
                      }`}
                    >
                      {dim.statusLabel}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2">{dim.description}</p>
                  <p className="text-xs text-slate-200 leading-relaxed">{dim.analysisText}</p>
                </div>

                {/* Score breakdown bar */}
                <div className="pt-3 border-t border-slate-800/80 text-[10px] grid grid-cols-3 gap-1 text-center font-mono">
                  <span className="text-emerald-400 font-semibold">Sat: {dim.sattvaScore}</span>
                  <span className="text-rose-400 font-semibold">Raj: {dim.rajasScore}</span>
                  <span className="text-indigo-400 font-semibold">Tam: {dim.tamasScore}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Practical Daily Sattvic Habits Plan */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <h3 className="text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Practical Daily Sattvic Habits (Ayurveda & Yoga)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Actionable daily routines to elevate Sattva while mitigating unwanted Rajasic restlessness or Tamasic inertia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.dailyHabits.map((habit, idx) => (
            <div key={idx} className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-5 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {habit.category}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
                  Reduces {habit.targetGunaToReduce}
                </span>
              </div>
              <h4 className="font-serif font-bold text-slate-100 text-base">{habit.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{habit.description}</p>
              <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-lg text-xs text-amber-200">
                <strong>Daily Practice:</strong> {habit.practicalStep}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Scholar Consultation Section (Server-side Gemini) */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/30 border border-amber-800/60 rounded-2xl p-6 shadow-2xl space-y-4 print:hidden">
        <div className="flex items-center gap-2 text-amber-200 font-serif font-bold text-xl">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>Ask the AI Gita & Guna Scholar</span>
        </div>
        <p className="text-xs text-slate-300">
          Have a specific question about your results, how to handle a workplace conflict using Gita wisdom, or Ayurvedic remedies for your dominant Guna? Ask below:
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={aiQuestion}
            onChange={(e) => setAiQuestion(e.target.value)}
            placeholder="e.g., How can I reduce Rajasic impatience at work according to Chapter 14?"
            className="flex-1 px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
          <button
            onClick={handleAskAiScholar}
            disabled={aiLoading}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all shrink-0 cursor-pointer disabled:opacity-50"
          >
            {aiLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Consulting Scholar...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Get Guidance</span>
              </>
            )}
          </button>
        </div>

        {aiError && (
          <div className="p-3 bg-rose-950/60 border border-rose-800 text-rose-200 text-xs rounded-xl">
            {aiError}
          </div>
        )}

        {aiResponse && (
          <div className="p-5 bg-slate-950 border border-amber-900/50 rounded-xl text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3 shadow-inner">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <BookOpen className="w-4 h-4 text-amber-400" /> Scholar Commentary
            </div>
            <div className="whitespace-pre-line">{aiResponse}</div>
          </div>
        )}
      </div>
    </div>
  );
};
