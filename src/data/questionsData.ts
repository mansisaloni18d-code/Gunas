import { Question, DomainInfo } from '../types';

export const DOMAINS: DomainInfo[] = [
  {
    id: 'thoughts_emotions',
    name: 'Thoughts & Emotions',
    description: 'Mental clarity, inner stillness, emotional volatility vs. apathy.',
    iconName: 'Brain'
  },
  {
    id: 'criticism_conflict',
    name: 'Criticism & Conflict',
    description: 'Reactions to disagreement, feedback, offense, and opposition.',
    iconName: 'ShieldAlert'
  },
  {
    id: 'anger_ego',
    name: 'Anger, Jealousy, Greed & Ego',
    description: 'Pride, envy, possessiveness, and emotional reactive patterns.',
    iconName: 'Flame'
  },
  {
    id: 'compassion_forgiveness',
    name: 'Compassion & Empathy',
    description: 'Unconditional kindness, capacity to forgive, and goodwill for all.',
    iconName: 'Heart'
  },
  {
    id: 'discipline_procrastination',
    name: 'Discipline & Execution',
    description: 'Steadiness, goal completion, consistency vs. procrastination.',
    iconName: 'Target'
  },
  {
    id: 'food_lifestyle',
    name: 'Food & Lifestyle Habits',
    description: 'Dietary choices, cleanliness, sensory stimulation, and purity.',
    iconName: 'Apple'
  },
  {
    id: 'sleep_energy',
    name: 'Sleep & Vital Energy',
    description: 'Morning alertness, energy flow, sleep quality, and stamina.',
    iconName: 'Moon'
  },
  {
    id: 'learning_curiosity',
    name: 'Learning & Curiosity',
    description: 'Motivation for knowledge, openness to truth, and intellectual intent.',
    iconName: 'BookOpen'
  },
  {
    id: 'spiritual_awareness',
    name: 'Spiritual Practices & Self-Awareness',
    description: 'Introspection, meditation, mindfulness, and inner reflection.',
    iconName: 'Sparkles'
  },
  {
    id: 'relationships_communication',
    name: 'Relationships & Communication',
    description: 'Speech habits, honesty, listening, and interpersonal harmony.',
    iconName: 'MessageSquare'
  },
  {
    id: 'attachment_possessions',
    name: 'Attachment & Possessions',
    description: 'Clinging to praise, status, material wealth, and outcomes.',
    iconName: 'Package'
  },
  {
    id: 'decision_selfcontrol',
    name: 'Decision-Making & Self-Control',
    description: 'Long-term wisdom, impulse restraint, and ethical discernment.',
    iconName: 'Compass'
  }
];

export const QUESTIONS: Question[] = [
  // 1. Thoughts & Emotions
  {
    id: 1,
    domainId: 'thoughts_emotions',
    domainName: 'Thoughts & Emotions',
    guna: 'sattva',
    statement: 'I experience an underlying state of mental peace, clarity, and emotional equilibrium throughout the day.',
    explanation: 'Sattva manifests as clarity, lightness, and inner composure.'
  },
  {
    id: 2,
    domainId: 'thoughts_emotions',
    domainName: 'Thoughts & Emotions',
    guna: 'rajas',
    statement: 'My mind feels constantly active, racing with restless plans, desires, or anxieties about the future.',
    explanation: 'Rajas drives continuous mental movement, passion, and restlessness.'
  },
  {
    id: 3,
    domainId: 'thoughts_emotions',
    domainName: 'Thoughts & Emotions',
    guna: 'tamas',
    statement: 'I often feel mentally foggy, emotionally numb, depressed, or stuck in chronic negativity.',
    explanation: 'Tamas creates mental inertia, heaviness, and emotional stagnation.'
  },

  // 2. Criticism & Conflict
  {
    id: 4,
    domainId: 'criticism_conflict',
    domainName: 'Criticism & Conflict',
    guna: 'sattva',
    statement: 'When confronted or criticized, I remain calm, listen without taking offense, and objectively reflect on the truth.',
    explanation: 'Sattva responds to conflict with equanimity, patience, and non-defensiveness.'
  },
  {
    id: 5,
    domainId: 'criticism_conflict',
    domainName: 'Criticism & Conflict',
    guna: 'rajas',
    statement: 'I react to criticism with immediate defensiveness, verbal retaliation, or an intense urge to prove myself right.',
    explanation: 'Rajas triggers reactive pride, debate, and ego protection.'
  },
  {
    id: 6,
    domainId: 'criticism_conflict',
    domainName: 'Criticism & Conflict',
    guna: 'tamas',
    statement: 'I handle conflict by completely withdrawing, shutting down, or holding silent, bitter grudges.',
    explanation: 'Tamas leads to passive aggression, avoidance, and lingering resentment.'
  },

  // 3. Anger, Jealousy, Greed & Ego
  {
    id: 7,
    domainId: 'anger_ego',
    domainName: 'Anger, Jealousy, Greed & Ego',
    guna: 'sattva',
    statement: 'I feel genuine joy for others’ success and remain content without feeling envious or superior.',
    explanation: 'Sattva fosters sympathetic joy (mudita) and freedom from egoic comparison.'
  },
  {
    id: 8,
    domainId: 'anger_ego',
    domainName: 'Anger, Jealousy, Greed & Ego',
    guna: 'rajas',
    statement: 'I feel competitive, envious of others’ achievements, or quickly irritated when my ambitions are obstructed.',
    explanation: 'Rajas generates competitiveness, jealousy, and anger when desires are thwarted.'
  },
  {
    id: 9,
    domainId: 'anger_ego',
    domainName: 'Anger, Jealousy, Greed & Ego',
    guna: 'tamas',
    statement: 'I harbour deep malice, spite, or stubborn hatred toward people who I feel have outshined or wronged me.',
    explanation: 'Tamas breeds lingering hostility, spite, and dark resentments.'
  },

  // 4. Compassion, Forgiveness & Empathy
  {
    id: 10,
    domainId: 'compassion_forgiveness',
    domainName: 'Compassion & Empathy',
    guna: 'sattva',
    statement: 'I readily forgive mistakes, offer help without expecting anything in return, and feel compassion for all beings.',
    explanation: 'Sattva embodies selfless compassion (karuna) and universal goodwill.'
  },
  {
    id: 11,
    domainId: 'compassion_forgiveness',
    domainName: 'Compassion & Empathy',
    guna: 'rajas',
    statement: 'I am willing to help others, but I expect gratitude, public recognition, or reciprocal favors in return.',
    explanation: 'Rajasic generosity is transactional and driven by reward or reputation.'
  },
  {
    id: 12,
    domainId: 'compassion_forgiveness',
    domainName: 'Compassion & Empathy',
    guna: 'tamas',
    statement: 'I feel indifferent to the suffering of others or feel that people usually deserve whatever misfortune hits them.',
    explanation: 'Tamas causes coldness, insensitivity, and lack of empathy.'
  },

  // 5. Discipline & Procrastination
  {
    id: 13,
    domainId: 'discipline_procrastination',
    domainName: 'Discipline & Execution',
    guna: 'sattva',
    statement: 'I carry out my responsibilities with steady focus, joyful commitment, and consistent self-discipline.',
    explanation: 'Sattvic discipline is balanced, dutiful, and sustained without strain.'
  },
  {
    id: 14,
    domainId: 'discipline_procrastination',
    domainName: 'Discipline & Execution',
    guna: 'rajas',
    statement: 'I work feverishly in intense bursts driven by pressure or deadlines, but frequently suffer from burnout.',
    explanation: 'Rajasic action is hyperactive, attachment-heavy, and prone to exhaustion.'
  },
  {
    id: 15,
    domainId: 'discipline_procrastination',
    domainName: 'Discipline & Execution',
    guna: 'tamas',
    statement: 'I struggle heavily with chronic procrastination, laziness, and routinely delay starting important obligations.',
    explanation: 'Tamas causes paralysis, avoidance, and resistance to action.'
  },

  // 6. Food & Lifestyle Habits
  {
    id: 16,
    domainId: 'food_lifestyle',
    domainName: 'Food & Lifestyle Habits',
    guna: 'sattva',
    statement: 'I naturally prefer fresh, wholesome, lightly cooked, nourishing meals and maintain clean, orderly habits.',
    explanation: 'Sattvic food is fresh, vegetarian/clean, juicy, and promotes vitality.'
  },
  {
    id: 17,
    domainId: 'food_lifestyle',
    domainName: 'Food & Lifestyle Habits',
    guna: 'rajas',
    statement: 'I crave highly spicy, overly salty, caffeinated, or intensely flavored foods that excite my palate.',
    explanation: 'Rajasic diet is pungent, sour, salty, hot, or excessively stimulating.'
  },
  {
    id: 18,
    domainId: 'food_lifestyle',
    domainName: 'Food & Lifestyle Habits',
    guna: 'tamas',
    statement: 'I frequently consume stale, leftover, heavily processed, deep-fried foods or overeat late at night.',
    explanation: 'Tamasic food is stale, tasteless, heavy, spoiled, or lacking life force (prana).'
  },

  // 7. Sleep & Vital Energy
  {
    id: 19,
    domainId: 'sleep_energy',
    domainName: 'Sleep & Vital Energy',
    guna: 'sattva',
    statement: 'I sleep soundly for an adequate duration and wake up feeling naturally refreshed, light, and alert.',
    explanation: 'Sattvic sleep is restful, restorative, and leaves the mind clear.'
  },
  {
    id: 20,
    domainId: 'sleep_energy',
    domainName: 'Sleep & Vital Energy',
    guna: 'rajas',
    statement: 'I struggle to fall asleep because my mind won’t stop racing, or I rely on caffeine to stay functional.',
    explanation: 'Rajasic sleep is disturbed by overactive thoughts and sensory hyper-arousal.'
  },
  {
    id: 21,
    domainId: 'sleep_energy',
    domainName: 'Sleep & Vital Energy',
    guna: 'tamas',
    statement: 'I sleep excessively (over 8-9 hours) yet still wake up feeling heavy, groggy, and physically fatigued.',
    explanation: 'Tamasic sleep is heavy, excessive, and leads to lingering lethargy.'
  },

  // 8. Learning & Curiosity
  {
    id: 22,
    domainId: 'learning_curiosity',
    domainName: 'Learning & Curiosity',
    guna: 'sattva',
    statement: 'I seek knowledge out of genuine curiosity, love of truth, and a desire for inner self-mastery.',
    explanation: 'Sattvic learning seeks wisdom, self-knowledge, and holistic understanding.'
  },
  {
    id: 23,
    domainId: 'learning_curiosity',
    domainName: 'Learning & Curiosity',
    guna: 'rajas',
    statement: 'I pursue information primarily to gain a competitive advantage, professional prestige, or win debates.',
    explanation: 'Rajasic learning is pragmatic, utilitarian, and status-seeking.'
  },
  {
    id: 24,
    domainId: 'learning_curiosity',
    domainName: 'Learning & Curiosity',
    guna: 'tamas',
    statement: 'I feel disinterested in expanding my mind, or I rigidly hold onto opinions without verifying facts.',
    explanation: 'Tamasic mind is dogmatic, incurious, and resistant to new truths.'
  },

  // 9. Spiritual Practices & Self-Awareness
  {
    id: 25,
    domainId: 'spiritual_awareness',
    domainName: 'Spiritual Practices & Self-Awareness',
    guna: 'sattva',
    statement: 'I engage in daily quiet introspection, meditation, or prayer with a serene and sincere spirit.',
    explanation: 'Sattvic spiritual practice is quiet, steady, and inwardly directed.'
  },
  {
    id: 26,
    domainId: 'spiritual_awareness',
    domainName: 'Spiritual Practices & Self-Awareness',
    guna: 'rajas',
    statement: 'I perform spiritual or self-improvement practices with high ambition, treating them like achievements to showcase.',
    explanation: 'Rajasic practice is theatrical, goal-obsessed, or display-oriented.'
  },
  {
    id: 27,
    domainId: 'spiritual_awareness',
    domainName: 'Spiritual Practices & Self-Awareness',
    guna: 'tamas',
    statement: 'I view meditation, self-reflection, or spiritual inquiry as pointless, boring, or uncomfortable.',
    explanation: 'Tamas rejects spiritual reflection due to ignorance or mental lethargy.'
  },

  // 10. Relationships & Communication
  {
    id: 28,
    domainId: 'relationships_communication',
    domainName: 'Relationships & Communication',
    guna: 'sattva',
    statement: 'My speech is truthful, pleasant, beneficial, non-injurious, and I listen attentively to others.',
    explanation: 'Sattvic speech (satya and priya-vak) brings peace, truth, and harmony.'
  },
  {
    id: 29,
    domainId: 'relationships_communication',
    domainName: 'Relationships & Communication',
    guna: 'rajas',
    statement: 'I tend to dominate conversations, interrupt frequently, raise my voice, or use persuasive rhetoric to win.',
    explanation: 'Rajasic communication is forceful, vocal, and self-assertive.'
  },
  {
    id: 30,
    domainId: 'relationships_communication',
    domainName: 'Relationships & Communication',
    guna: 'tamas',
    statement: 'I engage in malicious gossip, deceptive speech, sarcastic slurs, or passive-aggressive silent treatment.',
    explanation: 'Tamasic communication is toxic, deceptive, or obstructive.'
  },

  // 11. Attachment to Success, Praise & Possessions
  {
    id: 31,
    domainId: 'attachment_possessions',
    domainName: 'Attachment & Possessions',
    guna: 'sattva',
    statement: 'I strive to give my best effort in life while remaining mentally unattached to praise, blame, or specific outcomes.',
    explanation: 'Sattvic action is performed as duty (Nishkama Karma) without selfish craving.'
  },
  {
    id: 32,
    domainId: 'attachment_possessions',
    domainName: 'Attachment & Possessions',
    guna: 'rajas',
    statement: 'My sense of self-worth depends heavily on public recognition, social status, wealth accumulation, and success.',
    explanation: 'Rajas links personal value strictly to external validation and tangible rewards.'
  },
  {
    id: 33,
    domainId: 'attachment_possessions',
    domainName: 'Attachment & Possessions',
    guna: 'tamas',
    statement: 'I hoard old items out of insecurity, while simultaneously feeling hopeless about improving my financial situation.',
    explanation: 'Tamas manifests as fearful hoarding combined with fatalistic resignation.'
  },

  // 12. Decision-Making & Self-Control
  {
    id: 34,
    domainId: 'decision_selfcontrol',
    domainName: 'Decision-Making & Self-Control',
    guna: 'sattva',
    statement: 'I make decisions thoughtfully after weighing long-term ethical principles, wisdom, and genuine well-being.',
    explanation: 'Sattvic intellect (Buddhi) clearly discerns what is beneficial vs. harmful.'
  },
  {
    id: 35,
    domainId: 'decision_selfcontrol',
    domainName: 'Decision-Making & Self-Control',
    guna: 'rajas',
    statement: 'I make impulsive decisions driven by immediate desire, excitement, or short-term gains, ignoring future consequences.',
    explanation: 'Rajasic intellect is clouded by passionate impulse and immediate gratification.'
  },
  {
    id: 36,
    domainId: 'decision_selfcontrol',
    domainName: 'Decision-Making & Self-Control',
    guna: 'tamas',
    statement: 'I avoid making necessary choices out of fear or habit, often letting problems fester until forced to act.',
    explanation: 'Tamasic intellect mistakes delusion for wisdom and resists timely action.'
  }
];
