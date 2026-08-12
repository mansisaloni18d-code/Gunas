import React, { useState } from 'react';
import { Question, DomainInfo, AnswersState, RatingValue } from '../types';
import { CheckCircle, AlertTriangle, ArrowRight, Filter, ChevronRight, HelpCircle } from 'lucide-react';

interface QuestionnaireProps {
  questions: Question[];
  domains: DomainInfo[];
  answers: AnswersState;
  onRatingChange: (questionId: number, rating: RatingValue) => void;
  onSubmit: () => void;
  onLoadDemo: () => void;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({
  questions,
  domains,
  answers,
  onRatingChange,
  onSubmit,
  onLoadDemo,
}) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [showIncompleteWarning, setShowIncompleteWarning] = useState<boolean>(false);
  const [hoveredExplanation, setHoveredExplanation] = useState<number | null>(null);

  const answeredCount = Object.keys(answers).length;
  const totalCount = questions.length;
  const isComplete = answeredCount === totalCount;

  // Filter questions by domain if selected
  const filteredQuestions = selectedDomain === 'all'
    ? questions
    : questions.filter(q => q.domainId === selectedDomain);

  const RATING_OPTIONS: { value: RatingValue; label: string; sub: string; color: string }[] = [
    { value: 1, label: '1 - Rarely', sub: 'Almost Never / Strongly Disagree', color: 'hover:border-slate-500 hover:bg-slate-800' },
    { value: 2, label: '2 - Seldom', sub: 'Infrequently / Disagree', color: 'hover:border-slate-500 hover:bg-slate-800' },
    { value: 3, label: '3 - Sometimes', sub: 'Occasionally / Neutral', color: 'hover:border-amber-600 hover:bg-amber-950/30' },
    { value: 4, label: '4 - Often', sub: 'Frequently / Agree', color: 'hover:border-emerald-600 hover:bg-emerald-950/30' },
    { value: 5, label: '5 - Always', sub: 'Very Frequently / Strongly Agree', color: 'hover:border-emerald-500 hover:bg-emerald-950/40' },
  ];

  const handleSubmit = () => {
    if (!isComplete) {
      setShowIncompleteWarning(true);
      return;
    }
    onSubmit();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Intro & Rating Scale Legend */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
              Guna Balance Self-Inventory
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Rate how accurately each statement reflects your typical thoughts, habits, and reactions on a 1–5 scale.
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-2xl font-bold font-mono text-amber-400">{answeredCount}/{totalCount}</span>
            <span className="text-xs text-slate-400 block">Questions Completed</span>
          </div>
        </div>

        {/* Rating Scale Explanation */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          {RATING_OPTIONS.map((opt) => (
            <div key={opt.value} className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2.5 text-center space-y-1">
              <span className="font-bold text-amber-300 text-sm block">{opt.value}</span>
              <span className="font-semibold text-slate-200 block">{opt.label.split('-')[1].trim()}</span>
              <span className="text-[10px] text-slate-400 block">{opt.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Domain Filter Pills */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <Filter className="w-3.5 h-3.5 text-amber-400" />
          <span>Filter by Life Domain:</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedDomain('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedDomain === 'all'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                : 'bg-slate-800/80 text-slate-300 border border-slate-700/80 hover:bg-slate-700'
            }`}
          >
            All Domains ({questions.length})
          </button>

          {domains.map((domain) => {
            const domainQuestions = questions.filter(q => q.domainId === domain.id);
            const answeredInDomain = domainQuestions.filter(q => answers[q.id] !== undefined).length;
            const isDomainDone = answeredInDomain === domainQuestions.length;

            return (
              <button
                key={domain.id}
                onClick={() => setSelectedDomain(domain.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedDomain === domain.id
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                    : isDomainDone
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                    : 'bg-slate-800/80 text-slate-300 border border-slate-700/80 hover:bg-slate-700'
                }`}
              >
                <span>{domain.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isDomainDone ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-900 text-slate-400'
                }`}>
                  {answeredInDomain}/{domainQuestions.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const currentVal = answers[q.id];
          const isAnswered = currentVal !== undefined;

          return (
            <div
              key={q.id}
              className={`transition-all rounded-xl border p-4 sm:p-5 shadow-md ${
                isAnswered
                  ? 'bg-slate-900/90 border-slate-700/80'
                  : 'bg-slate-900/60 border-amber-950/40 hover:border-amber-800/40'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-amber-300 font-mono text-xs flex items-center justify-center font-bold">
                    {q.id}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-800/90 text-amber-300/90 border border-slate-700">
                    {q.domainName}
                  </span>
                  {isAnswered && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                      <CheckCircle className="w-3.5 h-3.5" /> Answered
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setHoveredExplanation(hoveredExplanation === q.id ? null : q.id)}
                  className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1 self-start sm:self-auto"
                  title="Click for philosophical context"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400/80" />
                  <span>Context</span>
                </button>
              </div>

              {/* Statement */}
              <p className="text-base sm:text-lg font-serif text-slate-100 leading-relaxed mb-4">
                "{q.statement}"
              </p>

              {/* Context tooltip if toggled */}
              {hoveredExplanation === q.id && (
                <div className="mb-4 p-3 bg-amber-950/30 border border-amber-800/40 rounded-lg text-xs text-amber-200/90">
                  <span className="font-semibold text-amber-300">Philosophical Marker: </span>
                  {q.explanation}
                </div>
              )}

              {/* Rating Buttons */}
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {RATING_OPTIONS.map((opt) => {
                  const isSelected = currentVal === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => onRatingChange(q.id, opt.value)}
                      className={`flex flex-col items-center justify-center py-2.5 px-1 sm:px-3 rounded-lg border text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md scale-[1.02] font-bold'
                          : `bg-slate-950/60 text-slate-300 border-slate-800/80 ${opt.color}`
                      }`}
                    >
                      <span className="text-sm sm:text-base font-bold font-mono">{opt.value}</span>
                      <span className="text-[10px] sm:text-xs opacity-90 truncate max-w-full hidden sm:block">
                        {opt.label.split('-')[1].trim()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Incomplete Warning Banner */}
      {showIncompleteWarning && !isComplete && (
        <div className="p-4 bg-rose-950/60 border border-rose-800/80 rounded-xl text-rose-200 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>
              Please answer all 36 questions for an accurate evaluation. You have <strong>{totalCount - answeredCount}</strong> questions remaining.
            </span>
          </div>
          <button
            onClick={onLoadDemo}
            className="px-3 py-1.5 bg-rose-900 hover:bg-rose-800 text-white rounded-lg font-medium text-xs whitespace-nowrap"
          >
            Auto-fill Remaining
          </button>
        </div>
      )}

      {/* Submit / Action Footer */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl text-center space-y-4">
        <div>
          <h3 className="text-lg font-serif font-bold text-amber-100">
            {isComplete ? 'All 36 Questions Answered!' : `${answeredCount} of ${totalCount} Questions Answered`}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {isComplete
              ? 'Click below to compute your Sattva, Rajas, and Tamas percentages and detailed report.'
              : 'Complete all questions or use Demo Fill to proceed.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={!isComplete}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
              isComplete
                ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 hover:opacity-95 hover:scale-[1.01] cursor-pointer'
                : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
            }`}
          >
            <span>Analyze My Guna Profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {!isComplete && (
            <button
              onClick={onLoadDemo}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-amber-300 border border-slate-700 font-medium text-sm transition-all"
            >
              Fill Demo Answers
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
