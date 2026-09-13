/**
 * spacedRepetitionEngine.js - Leitner 5-Box Scheduler & Flashcard Mastery
 */

export const LEITNER_INTERVALS_DAYS = {
  1: 1,   // Daily
  2: 3,   // Every 3 days
  3: 7,   // Weekly
  4: 14,  // Bi-weekly
  5: 30   // Monthly (Mastered)
};

export const spacedRepetitionEngine = {
  isDue: (cardProgress) => {
    if (!cardProgress || !cardProgress.lastReview) return true;
    const box = cardProgress.box || 1;
    const intervalDays = LEITNER_INTERVALS_DAYS[box] || 1;
    const lastDate = new Date(cardProgress.lastReview).getTime();
    const now = Date.now();
    const diffDays = (now - lastDate) / (1000 * 60 * 60 * 24);
    return diffDays >= intervalDays;
  },

  calculateStats: (allCards, progressMap) => {
    const boxCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, unreviewed: 0 };
    let dueCount = 0;

    allCards.forEach(card => {
      const prog = progressMap[card.id];
      if (!prog || !prog.lastReview) {
        boxCounts.unreviewed += 1;
        dueCount += 1;
      } else {
        const box = prog.box || 1;
        boxCounts[box] = (boxCounts[box] || 0) + 1;
        if (spacedRepetitionEngine.isDue(prog)) {
          dueCount += 1;
        }
      }
    });

    const masteredCount = boxCounts[5] || 0;
    const total = allCards.length;
    const masteryPercentage = total > 0 ? Math.round((masteredCount / total) * 100) : 0;

    return {
      total,
      boxCounts,
      dueCount,
      masteredCount,
      masteryPercentage
    };
  }
};
