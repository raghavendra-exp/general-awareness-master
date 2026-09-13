import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Search, 
  Calendar, 
  Bookmark, 
  ExternalLink, 
  Sparkles, 
  Tag, 
  Link as LinkIcon, 
  ShieldCheck,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { dataManager } from '../../utils/dataManager';

export default function CurrentAffairsRepository({ 
  monthlyData, 
  currentMonth, 
  onMonthChange, 
  availableMonths,
  onBookmarkToggle,
  isBookmarked
}) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState({});

  const categories = [
    'ALL',
    'ECONOMY & BANKING',
    'GOVERNMENT SCHEMES',
    'SCIENCE & DEFENCE',
    'INTERNATIONAL',
    'APPOINTMENTS',
    'AWARDS & HONOURS',
    'REPORTS & INDEXES',
    'SPORTS',
    'ENVIRONMENT'
  ];

  const records = monthlyData?.records || [];

  const filteredRecords = useMemo(() => {
    return records.filter(rec => {
      const matchesCategory = selectedCategory === 'ALL' || 
        rec.category.toUpperCase().includes(selectedCategory) ||
        selectedCategory.includes(rec.category.toUpperCase());
      
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch = !q || 
        rec.headline?.toLowerCase().includes(q) ||
        rec.summary?.toLowerCase().includes(q) ||
        rec.exam_fact?.toLowerCase().includes(q) ||
        rec.related_static_topic?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [records, selectedCategory, searchTerm]);

  const handleSelectOption = (recordId, mcqIdx, optionIdx, correctIdx, category) => {
    const key = `${recordId}_${mcqIdx}`;
    if (selectedAnswers[key] !== undefined) return;

    const isCorrect = optionIdx === correctIdx;
    setSelectedAnswers(prev => ({ ...prev, [key]: optionIdx }));
    setShowExplanation(prev => ({ ...prev, [key]: true }));
    dataManager.updateStats(isCorrect, category);

    if (!isCorrect) {
      const record = records.find(r => r.id === recordId);
      const mcq = record.mcqs[mcqIdx];
      dataManager.addMistake({
        id: `${recordId}-M${mcqIdx}`,
        question: mcq.question,
        options: mcq.options,
        answer: mcq.answer,
        explanation: mcq.explanation,
        category: record.category,
        exam: 'Current Affairs Repository'
      }, optionIdx, 'Factual Confusion');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Month Selector Bar & Search */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Current Affairs Archive
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Exam-oriented factual capsules categorized for fast revision
            </p>
          </div>

          {/* Month Selector Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {availableMonths.map(m => (
              <button
                key={m.slug}
                onClick={() => onMonthChange(m.slug)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  currentMonth === m.slug
                    ? 'bg-ga-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ga-500"
              placeholder="Search in this month by keywords (e.g. GDP, ISRO, NDB, Paris)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <span className="text-xs font-semibold text-slate-500 self-center">
            Showing {filteredRecords.length} records
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg font-semibold shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Record Cards */}
      <div className="space-y-4">
        {filteredRecords.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <Tag className="w-10 h-10 mx-auto mb-2 text-slate-400 opacity-50" />
            <p className="font-bold text-slate-700 dark:text-slate-300">No records found matching filters</p>
            <p className="text-xs text-slate-400 mt-1">Try selecting 'ALL' categories or clearing search keyword</p>
          </div>
        ) : (
          filteredRecords.map(rec => {
            const bookmarked = isBookmarked ? isBookmarked(rec.id) : false;

            return (
              <div 
                key={rec.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3.5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-ga-50 dark:bg-ga-950 text-ga-700 dark:text-ga-300 border border-ga-200 dark:border-ga-800">
                      {rec.category}
                    </span>
                    <span className="text-xs text-slate-400">{rec.date}</span>
                  </div>

                  <button
                    onClick={() => onBookmarkToggle(rec)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      bookmarked
                        ? 'bg-amber-50 text-amber-600 border-amber-300 dark:bg-amber-950 dark:text-amber-400'
                        : 'text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-600 dark:hover:text-slate-200'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <h2 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {rec.headline}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {rec.summary}
                </p>

                {/* Exam Fact Box */}
                <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border-l-4 border-amber-500 text-xs text-amber-950 dark:text-amber-200">
                  <strong className="text-amber-800 dark:text-amber-300 font-bold block mb-0.5">
                    High-Yield Exam Fact:
                  </strong>
                  {rec.exam_fact}
                </div>

                {/* Link to Static */}
                {rec.related_static_topic && (
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-xs flex items-center gap-2">
                    <LinkIcon className="w-3.5 h-3.5 text-ga-600 shrink-0" />
                    <span className="text-slate-500 dark:text-slate-400">Related Static:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{rec.related_static_topic}</span>
                  </div>
                )}

                {/* Question if present */}
                {rec.mcqs && rec.mcqs.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    {rec.mcqs.map((mcq, mIdx) => {
                      const key = `${rec.id}_${mIdx}`;
                      const answered = selectedAnswers[key] !== undefined;
                      const userSelected = selectedAnswers[key];

                      return (
                        <div key={mIdx} className="bg-slate-50/80 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2.5">
                          <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100">
                            {mcq.question}
                          </p>
                          <div className="grid grid-cols-1 gap-1.5">
                            {mcq.options.map((opt, oIdx) => {
                              let style = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800';
                              if (answered) {
                                if (oIdx === mcq.answer) style = 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                                else if (userSelected === oIdx) style = 'bg-rose-50 dark:bg-rose-950 border-rose-500 text-rose-800 dark:text-rose-200 line-through';
                                else style = 'bg-white dark:bg-slate-900 opacity-50 border-slate-200 dark:border-slate-800 text-slate-400';
                              }
                              return (
                                <button
                                  key={oIdx}
                                  disabled={answered}
                                  onClick={() => handleSelectOption(rec.id, mIdx, oIdx, mcq.answer, rec.category)}
                                  className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-all flex items-center justify-between ${style}`}
                                >
                                  <span>{opt}</span>
                                  {answered && oIdx === mcq.answer && (
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                          {showExplanation[key] && (
                            <div className="mt-2 p-2.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-slate-700 dark:text-slate-300">
                              <strong className="text-emerald-800 dark:text-emerald-300 font-bold">Explanation: </strong>
                              {mcq.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Source: {rec.source}</span>
                  <span>Last Verified: {rec.last_verified}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
