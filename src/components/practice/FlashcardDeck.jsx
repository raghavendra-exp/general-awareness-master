import React, { useState, useMemo } from 'react';
import { Layers, RotateCw, Check, X, Sparkles, BookOpen, ChevronRight, Award } from 'lucide-react';
import { dataManager } from '../../utils/dataManager';
import { spacedRepetitionEngine } from '../../utils/spacedRepetitionEngine';
import { generateFlashcardsFromData } from '../../utils/questionGenerator';

export default function FlashcardDeck({ dataRepository }) {
  const [deckType, setDeckType] = useState('countries');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState(dataManager.getFlashcardProgress());

  // Build card deck based on selected category
  const cards = useMemo(() => {
    return generateFlashcardsFromData(deckType, dataRepository?.[deckType]);
  }, [deckType, dataRepository]);

  const currentCard = cards[currentIndex] || cards[0];
  const cardId = currentCard?.id;
  const currentCardProg = progress[cardId] || { box: 1 };

  const deckStats = useMemo(() => {
    return spacedRepetitionEngine.calculateStats(cards, progress);
  }, [cards, progress]);

  const handleReview = (remembered) => {
    if (!cardId) return;

    const updated = dataManager.saveFlashcardReview(cardId, remembered);
    setProgress(prev => ({ ...prev, [cardId]: updated }));
    setIsFlipped(false);

    if (currentIndex < cards.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setCurrentIndex(0); // Loop back or finish
    }
  };

  const deckOptions = [
    { id: 'countries', name: 'Capitals & Currencies' },
    { id: 'states', name: 'States, CMs & Dances' },
    { id: 'orgs', name: 'International HQ & Heads' },
    { id: 'parks', name: 'National Parks & Species' },
    { id: 'schemes', name: 'Government Schemes' }
  ];

  if (!currentCard) {
    return (
      <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
        <p className="text-slate-500">Loading flashcard decks...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header & Deck Selector */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-ga-600" />
              <span>Leitner Spaced Repetition Flashcards</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Active recall 5-box memory algorithm. Lock static GK into permanent neural pathways.
            </p>
          </div>
          <span className="text-xs font-bold text-ga-600 px-3 py-1 rounded-full bg-ga-50 dark:bg-ga-950 border border-ga-200 dark:border-ga-800 self-start sm:self-auto">
            {deckStats.masteryPercentage}% Mastered
          </span>
        </div>

        {/* Deck Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {deckOptions.map(d => (
            <button
              key={d.id}
              onClick={() => {
                setDeckType(d.id);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                deckType === d.id
                  ? 'bg-ga-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>

        {/* 5-Box Visual Progress Bar */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1.5">
            <span>Leitner Memory Distribution:</span>
            <span>Card {currentIndex + 1} of {cards.length}</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
            {[1, 2, 3, 4, 5].map(box => (
              <div 
                key={box}
                className={`py-1.5 rounded-lg border font-bold text-[11px] ${
                  currentCardProg.box === box
                    ? 'bg-ga-600 text-white border-ga-600 ring-2 ring-ga-400/40'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                Box {box}: {deckStats.boxCounts[box] || 0}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive 3D Flip Card */}
      <div 
        onClick={() => setIsFlipped(f => !f)}
        className="cursor-pointer group select-none"
      >
        <div className={`min-h-[280px] sm:min-h-[320px] rounded-3xl p-8 border shadow-xl flex flex-col justify-between transition-all duration-300 transform ${
          isFlipped
            ? 'bg-gradient-to-br from-ga-950 to-slate-900 border-ga-500 text-white'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-ga-400'
        }`}>
          {/* Card Top */}
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md ${
              isFlipped 
                ? 'bg-ga-800 text-ga-200' 
                : 'bg-ga-100 dark:bg-ga-950 text-ga-800 dark:text-ga-300'
            }`}>
              {currentCard.category} • In Box {currentCardProg.box || 1}
            </span>

            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
              <span>Click to {isFlipped ? 'Show Front' : 'Reveal Answer'}</span>
            </div>
          </div>

          {/* Card Center Content */}
          <div className="py-6 text-center">
            {!isFlipped ? (
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold leading-relaxed">
                  {currentCard.front}
                </h2>
                {currentCard.hint && (
                  <p className="text-xs text-slate-400 italic">
                    Hint: {currentCard.hint}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-3 animate-fade-in">
                <div className="text-xs uppercase font-extrabold text-ga-400 tracking-wider">
                  Verified Factual Answer
                </div>
                <div className="text-sm sm:text-base font-medium whitespace-pre-line leading-relaxed text-slate-100">
                  {currentCard.back}
                </div>
              </div>
            )}
          </div>

          {/* Card Bottom */}
          <div className="text-center text-[11px] text-slate-400">
            {!isFlipped ? 'Tap card to flip' : 'Ready to grade your recall?'}
          </div>
        </div>
      </div>

      {/* Recall Feedback Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleReview(false)}
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-950/70 text-rose-700 dark:text-rose-300 font-bold text-sm border border-rose-200 dark:border-rose-900/60 transition-all"
        >
          <X className="w-4 h-4" />
          <span>Forgot / Wrong (Reset to Box 1)</span>
        </button>

        <button
          onClick={() => handleReview(true)}
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
        >
          <Check className="w-4 h-4" />
          <span>Remembered (Advance to Box {(currentCardProg.box || 1) + 1})</span>
        </button>
      </div>
    </div>
  );
}
