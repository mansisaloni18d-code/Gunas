export type GunaType = 'sattva' | 'rajas' | 'tamas';

export interface Question {
  id: number;
  domainId: string;
  domainName: string;
  guna: GunaType;
  statement: string;
  explanation: string; // Brief context on why this item represents Sattva/Rajas/Tamas
}

export interface DomainInfo {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export type RatingValue = 1 | 2 | 3 | 4 | 5; // 1: Rarely/Never, 2: Seldom, 3: Sometimes, 4: Often, 5: Always

export interface AnswersState {
  [questionId: number]: RatingValue;
}

export interface DimensionAnalysis {
  dimension: string; // 'Ego', 'Emotional Control', 'Discipline', 'Compassion', 'Patience', 'Honesty', 'Self-Awareness'
  description: string;
  sattvaScore: number;
  rajasScore: number;
  tamasScore: number;
  dominantAspect: 'Sattvic' | 'Rajasic' | 'Tamasic';
  statusLabel: string; // e.g. "Equanimous & Humble", "Agitated / Impulsive", "Resistant / Passive"
  analysisText: string;
}

export interface StrengthItem {
  title: string;
  domain: string;
  guna: 'Sattva' | 'Rajas' | 'Tamas';
  description: string;
}

export interface ImprovementItem {
  title: string;
  domain: string;
  guna: 'Rajas' | 'Tamas';
  recommendation: string;
  description: string;
}

export interface DailyHabit {
  category: 'Ahara (Diet)' | 'Vihara (Lifestyle)' | 'Sadhana (Spiritual)' | 'Manas (Mindset)';
  title: string;
  description: string;
  targetGunaToReduce: 'Rajas' | 'Tamas' | 'Both';
  practicalStep: string;
}

export interface AssessmentResult {
  totalQuestionsAnswered: number;
  rawScores: {
    sattva: number;
    rajas: number;
    tamas: number;
  };
  percentages: {
    sattvaPct: number;
    rajasPct: number;
    tamasPct: number;
  };
  dominantGuna: GunaType;
  secondaryGuna: GunaType;
  tertiaryGuna: GunaType;
  scoreExplanation: string;
  gitaContext: string;
  topStrengths: StrengthItem[];
  topImprovements: ImprovementItem[];
  dimensionAnalyses: DimensionAnalysis[];
  dailyHabits: DailyHabit[];
  reasoningNote: string;
}

export interface AIConsultResponse {
  response?: string;
  error?: string;
}
