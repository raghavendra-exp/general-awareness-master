/**
 * adaptiveTutor.js - GA Readiness Score & Diagnostic Recommendations
 */

export const calculateReadinessScore = (stats, mistakesCount, mockHistory) => {
  // Base parameters
  const totalAttempted = stats.totalAttempted || 0;
  const totalCorrect = stats.totalCorrect || 0;
  const overallAccuracy = totalAttempted > 0 ? (totalCorrect / totalAttempted) : 0;

  // 1. Volume & Practice Factor (max 25 pts)
  // Target: 200+ questions attempted for max practice factor
  const volumeScore = Math.min(25, Math.round((totalAttempted / 200) * 25));

  // 2. Accuracy Factor (max 35 pts)
  // 90% accuracy gives 35 pts, scaled linearly
  const accuracyScore = Math.round(overallAccuracy * 35);

  // 3. Mock Test Experience (max 25 pts)
  let mockScore = 0;
  if (mockHistory && mockHistory.length > 0) {
    const recentMocks = mockHistory.slice(0, 3);
    const avgScorePct = recentMocks.reduce((acc, m) => acc + (m.score / m.totalMarks), 0) / recentMocks.length;
    mockScore = Math.min(25, Math.round(avgScorePct * 25));
  }

  // 4. Mistakes Management Penalty / Bonus (max 15 pts)
  // If user has few unresolved mistakes relative to practice, higher score
  let mistakesFactor = 15;
  if (mistakesCount > 20) {
    mistakesFactor = 5;
  } else if (mistakesCount > 10) {
    mistakesFactor = 10;
  }

  const totalScore = Math.min(100, Math.max(10, volumeScore + accuracyScore + mockScore + mistakesFactor));

  // Level classification
  let level = 'Beginner (Ground Zero)';
  let color = 'text-amber-500';
  let badgeClass = 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300';
  
  if (totalScore >= 80) {
    level = 'Exam Ready (Mains Contender 40+)';
    color = 'text-emerald-600';
    badgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300';
  } else if (totalScore >= 60) {
    level = 'Intermediate (Speed & Revision Stage)';
    color = 'text-blue-600';
    badgeClass = 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300';
  } else if (totalScore >= 40) {
    level = 'Foundation (Concept Clearing)';
    color = 'text-indigo-600';
    badgeClass = 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-300';
  }

  // Generate Personalized Recommendations
  const recommendations = [];
  if (totalAttempted < 50) {
    recommendations.push({
      type: 'PRACTICE',
      title: 'Attempt more daily MCQs',
      desc: 'You need at least 50+ attempted questions to establish reliable accuracy baselines.'
    });
  }
  if (mistakesCount > 5) {
    recommendations.push({
      type: 'REVISION',
      title: `Clear ${mistakesCount} items in Mistakes Notebook`,
      desc: 'Review your tagged mistakes to avoid repeating identical factual traps in Mains.'
    });
  }
  if (!mockHistory || mockHistory.length === 0) {
    recommendations.push({
      type: 'MOCK',
      title: 'Take your first 35-minute Sectional Mock',
      desc: 'Train your time allocation and negative marking control under exam simulation pressure.'
    });
  } else if (mockHistory.length > 0 && mockHistory[0].accuracy < 75) {
    recommendations.push({
      type: 'STRATEGY',
      title: 'Exercise Negative Marking Avoidance',
      desc: 'Avoid blind guessing. Use Question Selection Strategy to skip uncertain questions.'
    });
  }
  if (recommendations.length < 3) {
    recommendations.push({
      type: 'FLASHCARDS',
      title: 'Review Leitner Spaced Repetition Flashcards',
      desc: 'Lock static facts (Capitals, Headquarters, Ramsar Sites) into permanent long-term memory.'
    });
  }

  return {
    score: totalScore,
    level,
    color,
    badgeClass,
    breakdown: {
      volumeScore,
      accuracyScore,
      mockScore,
      mistakesFactor
    },
    recommendations
  };
};
