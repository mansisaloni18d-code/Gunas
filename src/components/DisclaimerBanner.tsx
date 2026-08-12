import React from 'react';
import { AlertCircle } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-4 text-amber-200/90 text-xs sm:text-sm shadow-sm flex items-start gap-3 my-4">
      <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <p className="font-semibold text-amber-200">
          Philosophical Self-Reflection Notice
        </p>
        <p className="text-amber-300/80 leading-relaxed">
          This self-assessment is an educational self-reflection exercise inspired by traditional Indian philosophy (Bhagavad Gita, Samkhya Yoga, and Ayurveda). It is <strong>not</strong> a scientifically validated psychological tool or clinical diagnostic assessment. Results are computed objectively from your honest ratings to help cultivate non-judgmental self-awareness (<em>Sakshi Bhava</em>).
        </p>
      </div>
    </div>
  );
};
