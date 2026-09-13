import React, { useState } from 'react';
import { 
  Calendar, 
  ExternalLink, 
  Bookmark, 
  CheckCircle, 
  HelpCircle, 
  Link as LinkIcon, 
  Sparkles, 
  ShieldCheck,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { dataManager } from '../../utils/dataManager';

export default function DailyCurrentAffairs({ data, onBookmarkToggle, isBookmarked }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState({});

  if (!data || !data.records || data.records.length === 0) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <p className="text-slate-500">Loading daily current affairs digest...</p>
      </div>
    );
  }

  const handleSelectOption = (recordId, mcqIdx, optionIdx, correctIdx, category) => {
    const key = `${recordId}_${mcqIdx}`;
    if (selectedAnswers[key] !== undefined) return; // already answered

    const isCorrect = optionIdx === correctIdx;
    setSelectedAnswers(prev => ({ ...prev, [key]: optionIdx }));
    setShowExplanation(prev => ({ ...prev, [key]: true }));

    // Record stats
    dataManager.updateStats(isCorrect, category);

    // If incorrect, add to mistakes notebook
    if (!isCorrect) {
      const record = data.records.find(r => r.id === recordId);
      const mcq = record.mcqs[mcqIdx];
      dataManager.addMistake({
        id: `${recordId}-M${mcqIdx}`,
        question: mcq.question,
        options: mcq.options,
        answer: mcq.answer,
        explanation: mcq.explanation,
        category: record.category,
        exam: 'Current Affairs Daily'
      }, optionIdx, 'Factual Confusion');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ga-50 dark:bg-ga-950 text-ga-700 dark:text-ga-300 text-xs font-bold border border-ga-200 dark:border-ga-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-ga-600" />
            <span>High-Yield Daily Digest</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Daily Current Affairs & Static Linkage
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Every record contains proven exam facts, static concepts connection, and interactive test MCQs.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold">
          <Calendar className="w-4 h-4 text-ga-600" />
          <span>Date: {data.date || 'Today'}</span>
        </div>
      </div>

      {/* List of Digest Cards */}
      <div className="space-y-5">
        {data.records.map((rec) => {
          const bookmarked = isBookmarked ? isBookmarked(rec.id) : false;

          return (
            <div 
              key={rec.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              {/* Category, Date & Bookmark */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-ga-100 dark:bg-ga-950 text-ga-800 dark:text-ga-300 border border-ga-200 dark:border-ga-800">
                    {rec.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    {rec.date}
                  </span>
                </div>

                <button
                  onClick={() => onBookmarkToggle(rec)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    bookmarked
                      ? 'bg-amber-50 text-amber-600 border-amber-300 dark:bg-amber-950 dark:text-amber-400'
                      : 'text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                  title={bookmarked ? 'Remove Bookmark' : 'Bookmark this record'}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              {/* Headline */}
              <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {rec.headline}
              </h2>

              {/* Summary */}
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {rec.summary}
              </p>

              {/* High-Yield Exam Fact Callout */}
              <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border-l-4 border-amber-500 text-amber-950 dark:text-amber-200">
                <div className="text-xs font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Exam Fact (Direct Question Potential)</span>
                </div>
                <div className="text-xs sm:text-sm font-medium">
                  {rec.exam_fact}
                </div>
              </div>

              {/* Static & Banking Connections */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {rec.related_static_topic && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 mb-1">
                      <LinkIcon className="w-3.5 h-3.5 text-ga-600" /> Link to Static Concept:
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">{rec.related_static_topic}</span>
                  </div>
                )}
                {rec.related_banking_topic && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-bank-600" /> Link to Banking Rule:
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">{rec.related_banking_topic}</span>
                  </div>
                )}
              </div>

              {/* Inbuilt Practice MCQ */}
              {rec.mcqs && rec.mcqs.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-ga-600" />
                    <span>Quick Concept Check MCQ</span>
                  </div>

                  {rec.mcqs.map((mcq, mIdx) => {
                    const key = `${rec.id}_${mIdx}`;
                    const answered = selectedAnswers[key] !== undefined;
                    const userSelected = selectedAnswers[key];

                    return (
                      <div key={mIdx} className="space-y-3 bg-slate-50/70 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                          {mcq.question}
                        </p>

                        <div className="grid grid-cols-1 gap-2">
                          {mcq.options.map((opt, oIdx) => {
                            let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800';
                            
                            if (answered) {
                              if (oIdx === mcq.answer) {
                                btnStyle = 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                              } else if (userSelected === oIdx) {
                                btnStyle = 'bg-rose-50 dark:bg-rose-950 border-rose-500 text-rose-800 dark:text-rose-200 line-through';
                              } else {
                                btnStyle = 'bg-white dark:bg-slate-900 opacity-50 border-slate-200 dark:border-slate-800 text-slate-400';
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={answered}
                                onClick={() => handleSelectOption(rec.id, mIdx, oIdx, mcq.answer, rec.category)}
                                className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {answered && oIdx === mcq.answer && (
                                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation block */}
                        {showExplanation[key] && (
                          <div className="mt-2.5 p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-slate-700 dark:text-slate-300 animate-fade-in">
                            <strong className="text-emerald-800 dark:text-emerald-300 font-bold">Explanation: </strong>
                            {mcq.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Source Provenance */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Source: <strong>{rec.source}</strong>
                </span>
                <span>Verified: {rec.last_verified}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
