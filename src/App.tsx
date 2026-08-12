import React, { useState, useEffect } from 'react';
import { QUESTIONS, DOMAINS } from './data/questionsData';
import { AnswersState, RatingValue } from './types';
import { calculateGunaResults } from './utils/calculator';
import { Header } from './components/Header';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Questionnaire } from './components/Questionnaire';
import { ReportView } from './components/ReportView';
import { PhilosophyDrawer } from './components/PhilosophyDrawer';

const LOCAL_STORAGE_KEY = 'three_gunas_assessment_answers';
const LOCAL_STORAGE_SUBMITTED_KEY = 'three_gunas_assessment_submitted';

export default function App() {
  const [answers, setAnswers] = useState<AnswersState>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_SUBMITTED_KEY);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [isPhilosophyOpen, setIsPhilosophyOpen] = useState<boolean>(false);

  // Save to localStorage whenever answers change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(answers));
      localStorage.setItem(LOCAL_STORAGE_SUBMITTED_KEY, String(isSubmitted));
    } catch {
      // ignore quota issues
    }
  }, [answers, isSubmitted]);

  const handleRatingChange = (qId: number, rating: RatingValue) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: rating,
    }));
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your answers and restart the questionnaire?')) {
      setAnswers({});
      setIsSubmitted(false);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.removeItem(LOCAL_STORAGE_SUBMITTED_KEY);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoadDemo = () => {
    // Generate a realistic demo dataset with balanced Sattva, Rajas, and Tamas answers
    const demoAnswers: AnswersState = {};
    QUESTIONS.forEach((q) => {
      // Create a nuanced pattern:
      // Sattva questions get 3-5
      // Rajas questions get 2-4
      // Tamas questions get 1-3
      if (q.guna === 'sattva') {
        demoAnswers[q.id] = (4 + (q.id % 2 === 0 ? 1 : 0)) as RatingValue; // 4 or 5
      } else if (q.guna === 'rajas') {
        demoAnswers[q.id] = (3 + (q.id % 3 === 0 ? 1 : 0)) as RatingValue; // 3 or 4
      } else {
        demoAnswers[q.id] = (2 + (q.id % 2 === 0 ? 1 : -1)) as RatingValue; // 1, 2 or 3
      }
    });

    setAnswers(demoAnswers);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completedCount = Object.keys(answers).length;
  const result = isSubmitted ? calculateGunaResults(QUESTIONS, answers) : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      <Header
        completedCount={completedCount}
        totalCount={QUESTIONS.length}
        onOpenPhilosophy={() => setIsPhilosophyOpen(true)}
        onReset={handleReset}
        onLoadDemo={handleLoadDemo}
        isSubmitted={isSubmitted}
      />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <DisclaimerBanner />

        {isSubmitted && result ? (
          <ReportView result={result} onRetake={handleRetake} />
        ) : (
          <Questionnaire
            questions={QUESTIONS}
            domains={DOMAINS}
            answers={answers}
            onRatingChange={handleRatingChange}
            onSubmit={handleSubmit}
            onLoadDemo={handleLoadDemo}
          />
        )}
      </main>

      <PhilosophyDrawer
        isOpen={isPhilosophyOpen}
        onClose={() => setIsPhilosophyOpen(false)}
      />

      <footer className="border-t border-amber-950/40 bg-slate-950 text-slate-500 text-xs py-8 text-center space-y-2 px-4">
        <p className="font-serif text-slate-400 font-semibold">
          Three Gunas Self-Reflection Assessment
        </p>
        <p className="text-slate-500 max-w-xl mx-auto">
          Inspired by Bhagavad Gita Chapter 14 (Gunatraya Vibhaga Yoga), Samkhya Karika, Yoga Sutras of Patanjali, and Charaka Samhita. Designed for non-judgmental self-observation (<em>Sakshi Bhava</em>).
        </p>
      </footer>
    </div>
  );
}
