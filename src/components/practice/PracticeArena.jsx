import React, { useState, useMemo } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Bookmark, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Languages, 
  AlertCircle,
  ShieldCheck,
  RotateCcw,
  Zap
} from 'lucide-react';
import { dataManager } from '../../utils/dataManager';

export default function PracticeArena({ 
  questions, 
  onBookmarkToggle, 
  isBookmarked,
  onNavigate
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [lang, setLang] = useState('en'); // 'en' or 'hi'
  const [userSelected, setUserSelected] = useState({});
  const [showExplanation, setShowExplanation] = useState({});
  const [reflectionTags, setReflectionTags] = useState({});

  const categories = ['ALL', 'ECONOMY & BANKING', 'GOVERNMENT SCHEMES', 'STATIC GK', 'POLITY & CONSTITUTION', 'SPORTS', 'AWARDS & HONOURS'];

  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'ALL') return questions;
    return questions.filter(q => 
      q.category.toUpperCase().includes(selectedCategory) ||
      selectedCategory.includes(q.category.toUpperCase())
    );
  }, [questions, selectedCategory]);

  const currentQ = filteredQuestions[currentIndex] || questions[0];
  const qKey = currentQ?.id;
  const isAnswered = userSelected[qKey] !== undefined;
  const userOption = userSelected[qKey];
  const isCorrect = isAnswered && userOption === currentQ?.answer;
  const bookmarked = isBookmarked ? isBookmarked(qKey) : false;

  const handleSelectOption = (idx) => {
    if (isAnswered) return;

    setUserSelected(prev => ({ ...prev, [qKey]: idx }));
    setShowExplanation(prev => ({ ...prev, [qKey]: true }));

    const correct = idx === currentQ.answer;
    dataManager.updateStats(correct, currentQ.category);

    if (!correct) {
      dataManager.addMistake(currentQ, idx, 'Factual Confusion');
    }
  };

  const handleSetReflectionTag = (tag) => {
    setReflectionTags(prev => ({ ...prev, [qKey]: tag }));
    dataManager.addMistake(currentQ, userOption, tag);
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (!currentQ) {
    return (
      <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <p className="text-slate-500">No questions available in this category.</p>
        <button 
          onClick={() => setSelectedCategory('ALL')}
          className="mt-3 px-4 py-2 bg-ga-600 text-white rounded-xl text-xs font-bold"
        >
          Reset to All Categories
        </button>
      </div>
    );
  }

  const qText = lang === 'hi' && currentQ.question_hi ? currentQ.question_hi : currentQ.question;
  const optionsList = lang === 'hi' && currentQ.options_hi ? currentQ.options_hi : currentQ.options;
  const expText = lang === 'hi' && currentQ.explanation_hi ? currentQ.explanation_hi : currentQ.explanation;

  return (
    <div className="max-w-4xl mx-auto space-y-5 animate-fade-in">
      {/* Category selector & Language toggle */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1 rounded-lg font-semibold shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-ga-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bilingual Lang Toggle */}
        <button
          onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 self-start sm:self-auto shrink-0"
        >
          <Languages className="w-3.5 h-3.5 text-ga-600" />
          <span>{lang === 'en' ? 'English (हिन्दी)' : 'हिन्दी (English)'}</span>
        </button>
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* Top metadata bar */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-ga-100 dark:bg-ga-950 text-ga-800 dark:text-ga-300">
              Q {currentIndex + 1} of {filteredQuestions.length}
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              {currentQ.provenance}
            </span>
            {currentQ.exam && (
              <span className="text-xs text-slate-400 hidden sm:inline-block">
                • {currentQ.exam} ({currentQ.year})
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onBookmarkToggle(currentQ)}
              className={`p-2 rounded-xl border transition-colors ${
                bookmarked
                  ? 'bg-amber-50 text-amber-600 border-amber-300 dark:bg-amber-950 dark:text-amber-400'
                  : 'text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title={bookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question Text */}
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
          {qText}
        </h2>

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {optionsList.map((opt, oIdx) => {
            let style = 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-ga-400 hover:bg-slate-50 dark:hover:bg-slate-800/50';

            if (isAnswered) {
              if (oIdx === currentQ.answer) {
                style = 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/20';
              } else if (userOption === oIdx) {
                style = 'bg-rose-50 dark:bg-rose-950/80 border-rose-500 text-rose-900 dark:text-rose-200 line-through';
              } else {
                style = 'bg-white dark:bg-slate-900 opacity-40 border-slate-200 dark:border-slate-800 text-slate-400';
              }
            }

            return (
              <button
                key={oIdx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(oIdx)}
                className={`w-full text-left p-4 rounded-2xl border text-sm sm:text-base transition-all flex items-center justify-between gap-4 ${style}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    isAnswered && oIdx === currentQ.answer
                      ? 'bg-emerald-600 text-white'
                      : isAnswered && userOption === oIdx
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span>{opt}</span>
                </div>

                {isAnswered && oIdx === currentQ.answer && (
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswered && userOption === oIdx && oIdx !== currentQ.answer && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Shortcut Box */}
        {isAnswered && (
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800 animate-fade-in">
            <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
              isCorrect 
                ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-slate-800 dark:text-slate-200' 
                : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-slate-800 dark:text-slate-200'
            }`}>
              <div className="font-bold flex items-center gap-1.5 mb-1.5">
                {isCorrect ? (
                  <span className="text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Correct Answer!
                  </span>
                ) : (
                  <span className="text-rose-700 dark:text-rose-300 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Incorrect (-0.25 Mark).
                  </span>
                )}
              </div>
              <strong className="text-slate-900 dark:text-white block mb-1">Official Explanation:</strong>
              {expText}

              {currentQ.exam_shortcut && (
                <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-start gap-2 text-ga-800 dark:text-ga-300 font-semibold">
                  <Zap className="w-4 h-4 text-ga-600 shrink-0 mt-0.5" />
                  <span>Exam Shortcut / Memory Cue: {currentQ.exam_shortcut}</span>
                </div>
              )}
            </div>

            {/* If incorrect, Self-Reflection Tag Picker */}
            {!isCorrect && (
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                  <span>Tag this mistake for revision:</span>
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Factual Confusion', 'Guessed Wrong', 'Read Question Hurriedly', 'Outdated Info'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleSetReflectionTag(tag)}
                      className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                        reflectionTags[qKey] === tag
                          ? 'bg-rose-600 text-white'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 disabled:opacity-40"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs text-slate-400 font-medium">
            Question {currentIndex + 1} / {filteredQuestions.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentIndex === filteredQuestions.length - 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-ga-600 text-white hover:bg-ga-700 disabled:opacity-40 shadow-sm"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
