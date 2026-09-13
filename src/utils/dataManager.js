/**
 * dataManager.js - Central Offline Storage and Synchronization Manager
 * 100% Client-side persistence using localStorage
 */

const STORAGE_KEYS = {
  STATS: 'gam_user_stats',
  MISTAKES: 'gam_mistakes_notebook',
  BOOKMARKS: 'gam_bookmarks',
  FLASHCARDS: 'gam_flashcards_progress',
  STUDY_PLAN: 'gam_study_plan_progress',
  MOCK_HISTORY: 'gam_mock_test_history',
  SETTINGS: 'gam_user_settings'
};

// Default initial state
const defaultStats = {
  totalAttempted: 0,
  totalCorrect: 0,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  categoryAccuracy: {
    'CURRENT AFFAIRS': { attempted: 0, correct: 0 },
    'BANKING & ECONOMY': { attempted: 0, correct: 0 },
    'GOVERNMENT SCHEMES': { attempted: 0, correct: 0 },
    'STATIC GK': { attempted: 0, correct: 0 },
    'POLITY & HISTORY': { attempted: 0, correct: 0 }
  }
};

const defaultSettings = {
  language: 'en', // 'en' or 'hi'
  darkMode: false,
  soundEffects: true,
  timerDuration: 15 // seconds for rapid fire
};

export const getStorageItem = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
};

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage:`, e);
  }
};

export const dataManager = {
  // Stats
  getStats: () => getStorageItem(STORAGE_KEYS.STATS, defaultStats),
  
  updateStats: (isCorrect, category = 'GENERAL') => {
    const stats = dataManager.getStats();
    stats.totalAttempted += 1;
    if (isCorrect) stats.totalCorrect += 1;

    // Check streak
    const today = new Date().toISOString().split('T')[0];
    if (stats.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (stats.lastActiveDate === yesterday) {
        stats.streakDays += 1;
      } else {
        stats.streakDays = 1;
      }
      stats.lastActiveDate = today;
    }

    // Category accuracy
    const catKey = Object.keys(stats.categoryAccuracy).find(k => 
      category.toUpperCase().includes(k) || k.includes(category.toUpperCase())
    ) || 'CURRENT AFFAIRS';

    if (!stats.categoryAccuracy[catKey]) {
      stats.categoryAccuracy[catKey] = { attempted: 0, correct: 0 };
    }
    stats.categoryAccuracy[catKey].attempted += 1;
    if (isCorrect) stats.categoryAccuracy[catKey].correct += 1;

    setStorageItem(STORAGE_KEYS.STATS, stats);
    return stats;
  },

  // Mistakes Notebook
  getMistakes: () => getStorageItem(STORAGE_KEYS.MISTAKES, []),
  
  addMistake: (questionItem, userSelectedIdx, reflectionTag = 'Factual Confusion') => {
    const mistakes = dataManager.getMistakes();
    const existingIndex = mistakes.findIndex(m => m.id === questionItem.id);
    const entry = {
      ...questionItem,
      userSelectedIdx,
      reflectionTag,
      timestamp: new Date().toISOString(),
      revisionCount: existingIndex >= 0 ? (mistakes[existingIndex].revisionCount || 0) + 1 : 1,
      resolved: false
    };

    if (existingIndex >= 0) {
      mistakes[existingIndex] = entry;
    } else {
      mistakes.unshift(entry);
    }
    setStorageItem(STORAGE_KEYS.MISTAKES, mistakes);
    return mistakes;
  },

  resolveMistake: (questionId) => {
    const mistakes = dataManager.getMistakes();
    const updated = mistakes.map(m => m.id === questionId ? { ...m, resolved: true } : m);
    setStorageItem(STORAGE_KEYS.MISTAKES, updated);
    return updated;
  },

  removeMistake: (questionId) => {
    const mistakes = dataManager.getMistakes().filter(m => m.id !== questionId);
    setStorageItem(STORAGE_KEYS.MISTAKES, mistakes);
    return mistakes;
  },

  // Bookmarks
  getBookmarks: () => getStorageItem(STORAGE_KEYS.BOOKMARKS, []),
  
  toggleBookmark: (item) => {
    const bookmarks = dataManager.getBookmarks();
    const exists = bookmarks.some(b => b.id === item.id);
    let updated;
    if (exists) {
      updated = bookmarks.filter(b => b.id !== item.id);
    } else {
      updated = [{ ...item, bookmarkedAt: new Date().toISOString() }, ...bookmarks];
    }
    setStorageItem(STORAGE_KEYS.BOOKMARKS, updated);
    return { bookmarks: updated, isBookmarked: !exists };
  },

  isBookmarked: (itemId) => {
    const bookmarks = dataManager.getBookmarks();
    return bookmarks.some(b => b.id === itemId);
  },

  // Flashcards Progress (Leitner System)
  getFlashcardProgress: () => getStorageItem(STORAGE_KEYS.FLASHCARDS, {}),
  
  saveFlashcardReview: (cardId, remembered) => {
    const progress = dataManager.getFlashcardProgress();
    const current = progress[cardId] || { box: 1, reviews: 0, lastReview: null };
    let newBox = current.box;

    if (remembered) {
      newBox = Math.min(5, newBox + 1);
    } else {
      newBox = 1; // Back to box 1 on failure
    }

    progress[cardId] = {
      box: newBox,
      reviews: current.reviews + 1,
      lastReview: new Date().toISOString()
    };

    setStorageItem(STORAGE_KEYS.FLASHCARDS, progress);
    return progress[cardId];
  },

  // Study Plan Progress
  getStudyProgress: () => getStorageItem(STORAGE_KEYS.STUDY_PLAN, {}),
  
  toggleStudyTask: (planId, taskId) => {
    const progress = dataManager.getStudyProgress();
    const key = `${planId}_${taskId}`;
    progress[key] = !progress[key];
    setStorageItem(STORAGE_KEYS.STUDY_PLAN, progress);
    return progress;
  },

  // Mock Test History
  getMockHistory: () => getStorageItem(STORAGE_KEYS.MOCK_HISTORY, []),
  
  saveMockResult: (result) => {
    const history = dataManager.getMockHistory();
    const record = {
      ...result,
      id: `MOCK-${Date.now()}`,
      date: new Date().toISOString()
    };
    history.unshift(record);
    setStorageItem(STORAGE_KEYS.MOCK_HISTORY, history);
    return history;
  },

  // Settings
  getSettings: () => getStorageItem(STORAGE_KEYS.SETTINGS, defaultSettings),
  updateSettings: (newSettings) => {
    const settings = { ...dataManager.getSettings(), ...newSettings };
    setStorageItem(STORAGE_KEYS.SETTINGS, settings);
    return settings;
  },

  // Export / Import
  exportBackup: () => {
    const dump = {};
    for (const [key, storageKey] of Object.entries(STORAGE_KEYS)) {
      dump[key] = getStorageItem(storageKey, null);
    }
    dump.exportedAt = new Date().toISOString();
    dump.app = 'General Awareness Master';
    const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GA-Master-Backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  importBackup: (jsonData) => {
    try {
      const parsed = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      for (const [key, storageKey] of Object.entries(STORAGE_KEYS)) {
        if (parsed[key] !== undefined) {
          setStorageItem(storageKey, parsed[key]);
        }
      }
      return { success: true };
    } catch (e) {
      console.error('Import failed:', e);
      return { success: false, error: e.message };
    }
  },

  resetAllData: () => {
    for (const storageKey of Object.values(STORAGE_KEYS)) {
      localStorage.removeItem(storageKey);
    }
  }
};
