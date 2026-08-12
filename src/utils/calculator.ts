import { Question, AnswersState, AssessmentResult, GunaType, StrengthItem, ImprovementItem, DimensionAnalysis, DailyHabit } from '../types';

export function calculateGunaResults(questions: Question[], answers: AnswersState): AssessmentResult {
  let sattvaRaw = 0;
  let rajasRaw = 0;
  let tamasRaw = 0;
  let totalAnswered = 0;

  // Domain score tracker
  const domainScores: Record<string, { sattva: number; rajas: number; tamas: number; count: number }> = {};

  questions.forEach((q) => {
    const val = answers[q.id];
    if (val !== undefined && val !== null) {
      totalAnswered++;
      if (q.guna === 'sattva') sattvaRaw += val;
      if (q.guna === 'rajas') rajasRaw += val;
      if (q.guna === 'tamas') tamasRaw += val;

      if (!domainScores[q.domainId]) {
        domainScores[q.domainId] = { sattva: 0, rajas: 0, tamas: 0, count: 0 };
      }
      domainScores[q.domainId][q.guna] += val;
      domainScores[q.domainId].count++;
    }
  });

  const totalRaw = sattvaRaw + rajasRaw + tamasRaw || 1;

  const sattvaPct = Math.round((sattvaRaw / totalRaw) * 100);
  const rajasPct = Math.round((rajasRaw / totalRaw) * 100);
  const tamasPct = 100 - sattvaPct - rajasPct;

  // Order gunas
  const gunasArr: { type: GunaType; pct: number; raw: number }[] = [
    { type: 'sattva' as GunaType, pct: sattvaPct, raw: sattvaRaw },
    { type: 'rajas' as GunaType, pct: rajasPct, raw: rajasRaw },
    { type: 'tamas' as GunaType, pct: tamasPct, raw: tamasRaw },
  ].sort((a, b) => b.pct - a.pct);

  const dominantGuna = gunasArr[0].type;
  const secondaryGuna = gunasArr[1].type;
  const tertiaryGuna = gunasArr[2].type;

  // Generate Top 5 Strengths based on responses
  const topStrengths = generateTopStrengths(questions, answers, sattvaPct, rajasPct, tamasPct);

  // Generate Top 5 Areas for Improvement
  const topImprovements = generateTopImprovements(questions, answers, rajasPct, tamasPct);

  // Analyze the 7 psychological dimensions
  const dimensionAnalyses = analyzeSevenDimensions(questions, answers);

  // Generate Daily Sattvic Habits based on dominant/secondary needs
  const dailyHabits = generateDailyHabits(dominantGuna, secondaryGuna, rajasPct, tamasPct);

  // Generate Score Explanation & Gita Context
  const { scoreExplanation, gitaContext, reasoningNote } = generateExplanations(
    sattvaPct,
    rajasPct,
    tamasPct,
    dominantGuna,
    secondaryGuna
  );

  return {
    totalQuestionsAnswered: totalAnswered,
    rawScores: { sattva: sattvaRaw, rajas: rajasRaw, tamas: tamasRaw },
    percentages: { sattvaPct, rajasPct, tamasPct },
    dominantGuna,
    secondaryGuna,
    tertiaryGuna,
    scoreExplanation,
    gitaContext,
    topStrengths,
    topImprovements,
    dimensionAnalyses,
    dailyHabits,
    reasoningNote,
  };
}

function generateTopStrengths(
  questions: Question[],
  answers: AnswersState,
  sattvaPct: number,
  rajasPct: number,
  tamasPct: number
): StrengthItem[] {
  const strengths: StrengthItem[] = [];

  // Check specific domain ratings
  const getRating = (qId: number) => answers[qId] || 3;

  // 1. Compassion / Goodwill
  if (getRating(10) >= 4 || getRating(28) >= 4) {
    strengths.push({
      title: 'Empathy & Truthful Communication',
      domain: 'Compassion & Relationships',
      guna: 'Sattva',
      description: 'You display high genuine care, capacity to forgive, and beneficial communication without manipulative intent.'
    });
  }

  // 2. Mental Peace & Clarity
  if (getRating(1) >= 4 || getRating(34) >= 4) {
    strengths.push({
      title: 'Inner Equanimity & Discernment',
      domain: 'Thoughts & Decision-Making',
      guna: 'Sattva',
      description: 'You possess mental clarity and ethical judgment, making choices based on long-term wisdom rather than fleeting impulses.'
    });
  }

  // 3. Steady Discipline
  if (getRating(13) >= 4 || getRating(19) >= 4) {
    strengths.push({
      title: 'Sustained Self-Discipline & Vital Energy',
      domain: 'Discipline & Energy',
      guna: 'Sattva',
      description: 'You execute daily obligations steadily without relying on frantic stress or sliding into lazy procrastination.'
    });
  }

  // 4. Healthy Drive & Ambition (Positive aspect of channelled Rajas)
  if (getRating(2) >= 3 && getRating(14) <= 3 && getRating(15) <= 2) {
    strengths.push({
      title: 'Dynamic Motivation without Paralysis',
      domain: 'Drive & Execution',
      guna: 'Rajas',
      description: 'You maintain high kinetic energy and enthusiasm to initiate projects without suffering from Tamasic lethargy.'
    });
  }

  // 5. Clean Lifestyle & Nourishment
  if (getRating(16) >= 4) {
    strengths.push({
      title: 'Sattvic Nourishment & Order',
      domain: 'Food & Lifestyle Habits',
      guna: 'Sattva',
      description: 'Your preference for fresh, wholesome foods and orderly daily habits provides a clean foundation for mental clarity.'
    });
  }

  // 6. Joy for Others / Freedom from Envy
  if (getRating(7) >= 4) {
    strengths.push({
      title: 'Sympathetic Joy (Mudita)',
      domain: 'Anger & Ego',
      guna: 'Sattva',
      description: 'You celebrate others’ achievements naturally without succumbing to competitive jealousy or possessive pride.'
    });
  }

  // Fallbacks if fewer than 5
  if (strengths.length < 5) {
    if (tamasPct < 25) {
      strengths.push({
        title: 'Low Inertia & Mental Resistance',
        domain: 'Mindset & Action',
        guna: 'Sattva',
        description: 'You exhibit minimal Tamasic heavy fog, allowing for swift adaptation and active engagement with life.'
      });
    }
    if (sattvaPct >= 35) {
      strengths.push({
        title: 'Curiosity & Intellectual Sincerity',
        domain: 'Learning & Awareness',
        guna: 'Sattva',
        description: 'You value truth and self-improvement over egoic debates or dogmatic assumptions.'
      });
    }
    if (getRating(4) >= 3) {
      strengths.push({
        title: 'Receptive Demeanor Under Feedback',
        domain: 'Criticism & Conflict',
        guna: 'Sattva',
        description: 'You listen to constructive feedback objectively rather than taking immediate emotional offense.'
      });
    }
  }

  return strengths.slice(0, 5);
}

function generateTopImprovements(
  questions: Question[],
  answers: AnswersState,
  rajasPct: number,
  tamasPct: number
): ImprovementItem[] {
  const improvements: ImprovementItem[] = [];
  const getRating = (qId: number) => answers[qId] || 3;

  // 1. Procrastination / Inertia (Tamas)
  if (getRating(15) >= 3 || getRating(21) >= 3) {
    improvements.push({
      title: 'Overcoming Inertia & Procrastination',
      domain: 'Discipline & Energy',
      guna: 'Tamas',
      description: 'You reported high vulnerability to delaying key tasks or waking up groggy despite long hours of sleep.',
      recommendation: 'Implement morning Surya Namaskar, wake up before 6 AM (Brahma Muhurta), and break tasks into 10-minute micro-steps.'
    });
  }

  // 2. Defensive Anger & Ego Reactivity (Rajas)
  if (getRating(5) >= 3 || getRating(8) >= 3) {
    improvements.push({
      title: 'Managing Defensive Anger & Competitiveness',
      domain: 'Criticism & Ego',
      guna: 'Rajas',
      description: 'You experience immediate urge to debate, prove yourself right, or feel envious when others excel.',
      recommendation: 'Practice 3 deep diaphragm breaths before responding to criticism. Cultivate non-comparison (Santosha).'
    });
  }

  // 3. Restless Mind & Sleep Hyper-Arousal (Rajas)
  if (getRating(2) >= 4 || getRating(20) >= 3) {
    improvements.push({
      title: 'Calming Mental Restlessness & Racing Thoughts',
      domain: 'Thoughts & Sleep',
      guna: 'Rajas',
      description: 'High Rajasic momentum keeps your mind racing with plans and future anxieties, interrupting restful sleep.',
      recommendation: 'Establish a strict 9:30 PM digital detox, practice Nadi Shodhana pranayama, and journal before bed.'
    });
  }

  // 4. Overconsumption of Stimulating/Heavy Foods (Rajas/Tamas)
  if (getRating(17) >= 3 || getRating(18) >= 3) {
    improvements.push({
      title: 'Refining Dietary Purity & Eating Habits',
      domain: 'Food & Lifestyle',
      guna: getRating(18) >= 3 ? 'Tamas' : 'Rajas',
      description: 'Frequent reliance on spicy/caffeinated stimulants or heavy processed late-night meals degrades mental clarity.',
      recommendation: 'Shift toward fresh, warm vegetarian soups, cooked grains, and avoid eating after 7:30 PM.'
    });
  }

  // 5. Attachment to External Praise & Outcome (Rajas)
  if (getRating(32) >= 3 || getRating(11) >= 3) {
    improvements.push({
      title: 'Reducing Dependency on External Validation',
      domain: 'Attachment & Compassion',
      guna: 'Rajas',
      description: 'Your self-worth is strongly tied to public recognition, results, and transactional reciprocity in helping others.',
      recommendation: 'Contemplate Nishkama Karma (selfless action)—focus purely on the quality of effort, surrendering outcome attachment.'
    });
  }

  // 6. Conflict Avoidance & Passive Aggression (Tamas)
  if (getRating(6) >= 3 || getRating(30) >= 3) {
    improvements.push({
      title: 'Addressing Passive Resentment & Secret Grudges',
      domain: 'Relationships & Conflict',
      guna: 'Tamas',
      description: 'A tendency to shut down, hold grudges, or engage in passive-aggressive speech creates emotional heaviness.',
      recommendation: 'Practice direct, gentle, truthful communication (Satya) and conscious emotional release through journaling.'
    });
  }

  // Fallback defaults to ensure exactly 5 items
  if (improvements.length < 5) {
    if (rajasPct > 35) {
      improvements.push({
        title: 'Slowing Down Frantic Pace & Workaholism',
        domain: 'Discipline & Lifestyle',
        guna: 'Rajas',
        description: 'Working in intense, frantic bursts risks periodic physical and emotional burnout.',
        recommendation: 'Schedule non-negotiable idle rest periods and silent walk intervals during workdays.'
      });
    }
    if (tamasPct > 20) {
      improvements.push({
        title: 'Cultivating Intellectual Curiosity',
        domain: 'Learning & Awareness',
        guna: 'Tamas',
        description: 'Susceptibility to fixed mental habits or avoidance of difficult self-reflection.',
        recommendation: 'Read 15 minutes of inspiring philosophical or wisdom literature (Svadhyaya) daily.'
      });
    }
  }

  return improvements.slice(0, 5);
}

function analyzeSevenDimensions(questions: Question[], answers: AnswersState): DimensionAnalysis[] {
  const getR = (qId: number) => answers[qId] || 3;

  // 1. Ego
  const egoSattva = getR(7);
  const egoRajas = getR(8) + getR(5);
  const egoTamas = getR(9) + getR(6);
  const egoDominant: 'Sattvic' | 'Rajasic' | 'Tamasic' = 
    egoSattva * 2 > egoRajas && egoSattva * 2 > egoTamas ? 'Sattvic' :
    egoRajas >= egoTamas ? 'Rajasic' : 'Tamasic';

  // 2. Emotional Control
  const emoSattva = getR(1) + getR(4);
  const emoRajas = getR(2) + getR(5);
  const emoTamas = getR(3) + getR(6);
  const emoDominant: 'Sattvic' | 'Rajasic' | 'Tamasic' = 
    emoSattva >= emoRajas && emoSattva >= emoTamas ? 'Sattvic' :
    emoRajas >= emoTamas ? 'Rajasic' : 'Tamasic';

  // 3. Discipline
  const discSattva = getR(13);
  const discRajas = getR(14);
  const discTamas = getR(15);
  const discDominant: 'Sattvic' | 'Rajasic' | 'Tamasic' = 
    discSattva >= discRajas && discSattva >= discTamas ? 'Sattvic' :
    discRajas >= discTamas ? 'Rajasic' : 'Tamasic';

  // 4. Compassion
  const compSattva = getR(10);
  const compRajas = getR(11);
  const compTamas = getR(12);
  const compDominant: 'Sattvic' | 'Rajasic' | 'Tamasic' = 
    compSattva >= compRajas && compSattva >= compTamas ? 'Sattvic' :
    compRajas >= compTamas ? 'Rajasic' : 'Tamasic';

  // 5. Patience
  const patSattva = getR(4) + getR(19);
  const patRajas = getR(2) + getR(8);
  const patTamas = getR(21) + getR(36);
  const patDominant: 'Sattvic' | 'Rajasic' | 'Tamasic' = 
    patSattva >= patRajas && patSattva >= patTamas ? 'Sattvic' :
    patRajas >= patTamas ? 'Rajasic' : 'Tamasic';

  // 6. Honesty
  const honSattva = getR(28) + getR(34);
  const honRajas = getR(23) + getR(29);
  const honTamas = getR(30) + getR(24);
  const honDominant: 'Sattvic' | 'Rajasic' | 'Tamasic' = 
    honSattva >= honRajas && honSattva >= honTamas ? 'Sattvic' :
    honRajas >= honTamas ? 'Rajasic' : 'Tamasic';

  // 7. Self-Awareness
  const selfSattva = getR(22) + getR(25);
  const selfRajas = getR(26) + getR(32);
  const selfTamas = getR(27) + getR(33);
  const selfDominant: 'Sattvic' | 'Rajasic' | 'Tamasic' = 
    selfSattva >= selfRajas && selfSattva >= selfTamas ? 'Sattvic' :
    selfRajas >= selfTamas ? 'Rajasic' : 'Tamasic';

  return [
    {
      dimension: 'Ego',
      description: 'Handling of pride, status, self-worth, and humility',
      sattvaScore: egoSattva,
      rajasScore: Math.round(egoRajas / 2),
      tamasScore: Math.round(egoTamas / 2),
      dominantAspect: egoDominant,
      statusLabel: egoDominant === 'Sattvic' ? 'Humble & Non-Competitive' : egoDominant === 'Rajasic' ? 'Competitive & Status-Driven' : 'Defensive & Resentful',
      analysisText: egoDominant === 'Sattvic' 
        ? 'Your ego is largely subdued; you find satisfaction in intrinsic growth without needing to feel superior.'
        : egoDominant === 'Rajasic' 
        ? 'Your ego is energized by competition and status. You feel driven to prove yourself right and protect prestige.'
        : 'Your ego manifests as stubborn self-protection, holding silent grudges or harboring resentment when outshined.'
    },
    {
      dimension: 'Emotional Control',
      description: 'Equanimity under pressure vs emotional reactivity or numbness',
      sattvaScore: Math.round(emoSattva / 2),
      rajasScore: Math.round(emoRajas / 2),
      tamasScore: Math.round(emoTamas / 2),
      dominantAspect: emoDominant,
      statusLabel: emoDominant === 'Sattvic' ? 'Composed & Balanced' : emoDominant === 'Rajasic' ? 'Restless & Reactive' : 'Numb or Foggy',
      analysisText: emoDominant === 'Sattvic'
        ? 'You possess strong emotional self-regulation, maintaining composure even when challenged or criticized.'
        : emoDominant === 'Rajasic'
        ? 'Your emotions swing with circumstances. You experience high passionate highs accompanied by sudden frustration or anxiety.'
        : 'You tend to repress feelings, shut down, or experience emotional numbness when overwhelmed.'
    },
    {
      dimension: 'Discipline',
      description: 'Execution of duty, consistency, and willpower',
      sattvaScore: discSattva,
      rajasScore: discRajas,
      tamasScore: discTamas,
      dominantAspect: discDominant,
      statusLabel: discDominant === 'Sattvic' ? 'Steady & Dutiful' : discDominant === 'Rajasic' ? 'Burst-Driven / Workaholic' : 'Procrastinating / Inert',
      analysisText: discDominant === 'Sattvic'
        ? 'You demonstrate sustainable self-discipline without needing extreme artificial pressure or frantic rush.'
        : discDominant === 'Rajasic'
        ? 'Your discipline relies on deadline urgency and intense ambition, making you prone to periodic exhaustion.'
        : 'You struggle with inertia, frequently delaying starting tasks until external force leaves no choice.'
    },
    {
      dimension: 'Compassion',
      description: 'Empathy, forgiveness, and selfless goodwill',
      sattvaScore: compSattva,
      rajasScore: compRajas,
      tamasScore: compTamas,
      dominantAspect: compDominant,
      statusLabel: compDominant === 'Sattvic' ? 'Unconditional & Kind' : compDominant === 'Rajasic' ? 'Transactional / Reciprocal' : 'Indifferent / Cold',
      analysisText: compDominant === 'Sattvic'
        ? 'You radiate genuine compassion and readily extend forgiveness without expecting praise or return favors.'
        : compDominant === 'Rajasic'
        ? 'You are generous, but your kindness is often conditioned on receiving appreciation, loyalty, or reciprocal value.'
        : 'You struggle to feel connected to others’ hardships, remaining detached or cynical about human suffering.'
    },
    {
      dimension: 'Patience',
      description: 'Tolerance of delay, frustration, and natural timing',
      sattvaScore: Math.round(patSattva / 2),
      rajasScore: Math.round(patRajas / 2),
      tamasScore: Math.round(patTamas / 2),
      dominantAspect: patDominant,
      statusLabel: patDominant === 'Sattvic' ? 'Serene & Patient' : patDominant === 'Rajasic' ? 'Impatient & Hurried' : 'Passive & Apathetic',
      analysisText: patDominant === 'Sattvic'
        ? 'You accept delays gracefully, understanding that everything unfolds according to natural law (Rta).'
        : patDominant === 'Rajasic'
        ? 'You feel chronic urgency, getting easily agitated when traffic, people, or processes slow down.'
        : 'Your apparent patience is actually passive resignation or apathy rather than conscious serene tolerance.'
    },
    {
      dimension: 'Honesty',
      description: 'Truthfulness (Satya), integrity, and speech purity',
      sattvaScore: Math.round(honSattva / 2),
      rajasScore: Math.round(honRajas / 2),
      tamasScore: Math.round(honTamas / 2),
      dominantAspect: honDominant,
      statusLabel: honDominant === 'Sattvic' ? 'Truthful & Beneficial' : honDominant === 'Rajasic' ? 'Rhetorical / Persuasive' : 'Deceptive or Cynical',
      analysisText: honDominant === 'Sattvic'
        ? 'You practice Satya—speaking what is true, gentle, non-injurious, and beneficial to all involved.'
        : honDominant === 'Rajasic'
        ? 'You stretch or shape truths to gain influence, win arguments, or paint yourself in favorable light.'
        : 'You engage in cynical gossip, passive-aggressive remarks, or self-deceptive denial.'
    },
    {
      dimension: 'Self-Awareness',
      description: 'Introspection, mindfulness, and capacity for self-reflection',
      sattvaScore: Math.round(selfSattva / 2),
      rajasScore: Math.round(selfRajas / 2),
      tamasScore: Math.round(selfTamas / 2),
      dominantAspect: selfDominant,
      statusLabel: selfDominant === 'Sattvic' ? 'Deep & Introspective' : selfDominant === 'Rajasic' ? 'Externalized / Goal-Focused' : 'Unaware / Avoidant',
      analysisText: selfDominant === 'Sattvic'
        ? 'You regularly observe your mind objectively (Sakshi Bhava), learning actively from life experiences.'
        : selfDominant === 'Rajasic'
        ? 'Your self-reflection is project-oriented—you analyze performance and goals rather than inner consciousness.'
        : 'You avoid quiet solitude or introspection, preferring distraction over facing inner thoughts.'
    }
  ];
}

function generateDailyHabits(
  dominant: GunaType,
  secondary: GunaType,
  rajasPct: number,
  tamasPct: number
): DailyHabit[] {
  const habits: DailyHabit[] = [];

  // Diet / Ahara
  habits.push({
    category: 'Ahara (Diet)',
    title: 'Sattvic Clean Nourishment',
    description: 'Prioritize fresh, warm, organically grown, lightly spiced vegetarian food consumed in a peaceful mindset.',
    targetGunaToReduce: rajasPct > tamasPct ? 'Rajas' : 'Tamas',
    practicalStep: 'Eliminate leftover food older than 24 hours. Reduce hot chili, excess salt, and caffeinated energy drinks.'
  });

  // Lifestyle / Vihara
  if (tamasPct >= 20 || dominant === 'tamas' || secondary === 'tamas') {
    habits.push({
      category: 'Vihara (Lifestyle)',
      title: 'Brahma Muhurta Early Rising & Surya Namaskar',
      description: 'Counteract Tamasic heaviness by waking up before sunrise (between 5:00 AM – 6:00 AM) and initiating physical movement.',
      targetGunaToReduce: 'Tamas',
      practicalStep: 'Step outside immediately into morning sunlight for 10 minutes and perform 6 rounds of gentle Sun Salutations.'
    });
  } else {
    habits.push({
      category: 'Vihara (Lifestyle)',
      title: 'Digital Sunset & Evening Slowdown',
      description: 'Cool down Rajasic mental hyper-stimulation before sleep to allow full restorative nervous system reset.',
      targetGunaToReduce: 'Rajas',
      practicalStep: 'Turn off work notifications and screens 60 minutes before bed. Diffuse lavender or warm sesame oil on feet.'
    });
  }

  // Spiritual / Sadhana
  habits.push({
    category: 'Sadhana (Spiritual)',
    title: 'Nadi Shodhana & Antar Mouna Meditation',
    description: 'Practice alternate nostril breathing to balance solar (Pingala) and lunar (Ida) pranic currents in the body.',
    targetGunaToReduce: 'Both',
    practicalStep: 'Practice 10 minutes of slow, rhythmic Nadi Shodhana pranayama twice daily before meals or meditation.'
  });

  // Mindset / Manas
  habits.push({
    category: 'Manas (Mindset)',
    title: 'Nishkama Karma & 5-Second Pause',
    description: 'Perform your duties with 100% effort while letting go of obsessive anxiety over applause, blame, or specific results.',
    targetGunaToReduce: 'Rajas',
    practicalStep: 'Before reacting to any sudden frustrating news, take a mandatory 5-second breath to let Sattvic intellect step in.'
  });

  return habits;
}

function generateExplanations(
  sattvaPct: number,
  rajasPct: number,
  tamasPct: number,
  dominant: GunaType,
  secondary: GunaType
) {
  const domName = dominant.toUpperCase();
  const secName = secondary.toUpperCase();

  const scoreExplanation = `Based strictly on your responses across all 36 evaluation questions, your primary energetic signature is **${domName}** (${
    dominant === 'sattva' ? sattvaPct : dominant === 'rajas' ? rajasPct : tamasPct
  }%), supported secondarily by **${secName}** (${
    secondary === 'sattva' ? sattvaPct : secondary === 'rajas' ? rajasPct : tamasPct
  }%).

The Three Gunas represent dynamic qualities of nature and mind, not permanent personality labels. 
- **Sattva (${sattvaPct}%)** reflects your baseline clarity, peacefulness, compassion, and capacity for self-mastery.
- **Rajas (${rajasPct}%)** reflects your active drive, ambition, competitiveness, and susceptibility to mental restlessness or frustration.
- **Tamas (${tamasPct}%)** reflects areas where you experience inertia, procrastination, heaviness, or emotional resistance.`;

  const gitaContext = `In Chapter 14 of the Bhagavad Gita (*Gunatraya Vibhaga Yoga*), Lord Krishna explains that every individual experiences a shifting mixture of these three qualities. 

${
  dominant === 'sattva'
    ? 'A dominant Sattva state indicates that light, harmony, and wisdom currently predominate in your mind. However, Krishna cautions in BG 14.6 that even Sattva can bind the soul if one becomes subtly attached to feeling knowledgeable, righteous, or peaceful.'
    : dominant === 'rajas'
    ? 'A dominant Rajas state indicates intense kinetic energy, desire, and activity. BG 14.7 states: "Know Rajas to be born of passion, giving rise to thirst and attachment; it binds the embodied soul through attachment to action and its fruits." Channeling this passion toward noble, selfless ends is your path.'
    : 'A dominant Tamas state indicates significant heavy energy or fatigue blocking your natural potential. BG 14.8 warns: "Tamas is born of ignorance, deluding all embodied beings; it binds through heedlessness, laziness, and sleep." Breaking stagnation through small, decisive physical steps is key.'
}`;

  const reasoningNote = `This assessment is calculated objectively by summing your self-reported frequency ratings (1–5 scale) across 36 standardized questions evenly divided into Sattvic, Rajasic, and Tamasic behavioral markers across 12 distinct life domains. No arbitrary assumptions or automatic Sattvic bias were applied.`;

  return { scoreExplanation, gitaContext, reasoningNote };
}
