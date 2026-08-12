export interface GunaDetail {
  name: string;
  sanskritName: string;
  translation: string;
  color: string;
  bgGradient: string;
  badgeBg: string;
  textColor: string;
  borderColor: string;
  element: string;
  quality: string;
  symbolism: string;
  gitaVerse: string;
  gitaReference: string;
  psychologicalCharacteristics: string[];
  ayurvedicImpact: string;
  howToCultivateOrBalance: string;
}

export const GUNA_DETAILS: Record<string, GunaDetail> = {
  sattva: {
    name: 'Sattva',
    sanskritName: 'सत्त्व',
    translation: 'Purity, Harmony, Light & Wisdom',
    color: '#10b981', // Emerald green
    bgGradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    textColor: 'text-emerald-700 dark:text-emerald-400',
    borderColor: 'border-emerald-500',
    element: 'Light / Ether (Akasha) & Space',
    quality: 'Purity, illumination, peace, cheerfulness, truthfulness, and non-attachment.',
    symbolism: 'White light, clear water, serene mountain peak at dawn.',
    gitaVerse: 'तत्र सत्त्वं निर्मलत्वात्प्रकाशकमनामयम् | सुखसङ्गेन बध्नाति ज्ञानसङ्गेन चानघ ||',
    gitaReference: 'Bhagavad Gita 14.6',
    psychologicalCharacteristics: [
      'Clarity of perception and sound discrimination (Buddhi)',
      'Unshakeable inner tranquility and emotional composure',
      'Universal empathy, forgiveness, and truthfulness',
      'Freedom from selfish desire, jealousy, and fear',
      'Desire for self-knowledge and selfless service (Seva)'
    ],
    ayurvedicImpact: 'Enhances Ojas (subtle vitality and immunity), stabilizes Mind (Manas), balances all three Doshas (Vata, Pitta, Kapha).',
    howToCultivateOrBalance: 'Sattva is increased through meditation, pranayama, fresh organic food, truthfulness, selfless service, and spending time in serene nature.'
  },
  rajas: {
    name: 'Rajas',
    sanskritName: 'रजस्',
    translation: 'Passion, Action, Restlessness & Desire',
    color: '#e11d48', // Crimson red
    bgGradient: 'from-rose-500/10 via-amber-500/5 to-transparent',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
    textColor: 'text-rose-700 dark:text-rose-400',
    borderColor: 'border-rose-500',
    element: 'Fire (Agni) & Air (Vayu)',
    quality: 'Movement, dynamic drive, attachment, ambition, longing, and turbulence.',
    symbolism: 'Red flame, roaring wind, rushing river currents.',
    gitaVerse: 'रजो रागात्मकं विद्धि तृष्णासङ्गसमुद्भवम् | तन्निबध्नाति कौन्तेय कर्मसङ्गेन देहिनम् ||',
    gitaReference: 'Bhagavad Gita 14.7',
    psychologicalCharacteristics: [
      'High ambition, competitiveness, and result-oriented drive',
      'Restlessness, impatience, and difficulty staying still',
      'Attachment to fame, praise, wealth, and material status',
      'Irritability or anger when plans or desires are thwarted',
      'Continuous mental activity and susceptibility to burnout'
    ],
    ayurvedicImpact: 'Aggravates Pitta (heat, inflammation) and Vata (anxiety, dry mind), depletes Ojas if unchanneled.',
    howToCultivateOrBalance: 'Pacified through cooling pranayama (Sitali, Nadi Shodhana), practice of non-attachment (Vairagya), slowing down, and practicing selfless action.'
  },
  tamas: {
    name: 'Tamas',
    sanskritName: 'तमस्',
    translation: 'Inertia, Darkness, Resistance & Delusion',
    color: '#6366f1', // Indigo / Charcoal slate
    bgGradient: 'from-indigo-500/10 via-slate-500/5 to-transparent',
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
    textColor: 'text-indigo-700 dark:text-indigo-400',
    borderColor: 'border-indigo-500',
    element: 'Earth (Prithvi) & Water (Jala)',
    quality: 'Heaviness, resistance, lethargy, obscurity, procrastination, and illusion.',
    symbolism: 'Heavy fog, dense rock, dark moonless night.',
    gitaVerse: 'तमस्त्वज्ञानजं विद्धि मोहनं सर्वदेहिनाम् | प्रमादालस्यनिद्राभिस्तन्निबध्नाति भारत ||',
    gitaReference: 'Bhagavad Gita 14.8',
    psychologicalCharacteristics: [
      'Chronic procrastination, apathy, and difficulty starting tasks',
      'Mental brain fog, forgetfulness, and confusion',
      'Heavy, excessive sleep or feeling unrefreshed despite long sleep',
      'Stubborn resistance to change, learning, or self-reflection',
      'Holding on to past grievances, despair, or self-pity'
    ],
    ayurvedicImpact: 'Increases heavy Kapha and Ama (toxic metabolic buildup), dulls Agni (digestive and mental fire).',
    howToCultivateOrBalance: 'Reduced through early waking (before 6 AM), invigorating movement (Surya Namaskar), spicy/warm digestive spices, breaking stagnation, and active learning.'
  }
};

export const PHILOSOPHY_OVERVIEW = {
  title: 'The Three Gunas in Samkhya, Gita & Ayurveda',
  subtitle: 'Understanding the fundamental qualities shaping human nature and consciousness',
  intro: `In Indian philosophy—specifically Samkhya yoga and the Bhagavad Gita—all manifest nature (Prakriti) is composed of three primal attributes or forces called Gunas: Sattva, Rajas, and Tamas. 

Every thought, emotion, action, food, habit, and environment is governed by a dynamic combination of these three forces. They are not static traits, but fluctuating states of mind and energy that you have the power to observe, cultivate, and transcend.`,
  
  keyPrinciples: [
    {
      title: 'Dynamic Equilibrium',
      desc: 'The Gunas are constantly competing for dominance. When Sattva prevails, clarity and peace dawn. When Rajas prevails, passion and anxiety rise. When Tamas prevails, lethargy and delusion take over.'
    },
    {
      title: 'The Purpose of Self-Assessment',
      desc: 'Self-reflection allows you to cultivate Sakshi Bhava (witness consciousness)—observing your mental tendencies objectively without self-judgment or shame.'
    },
    {
      title: 'The Path of Transcending (Gunatita)',
      desc: 'While the immediate goal is to elevate Sattva and reduce excessive Rajas and Tamas, the ultimate goal taught in Gita 14.20 is to become Gunatita—standing as the unmoved witness beyond all three gunas.'
    }
  ]
};
