import React, { useState, useMemo } from 'react';
import { AlertCircle, CheckCircle, RotateCcw, Trash2, Filter, Sparkles, HelpCircle } from 'lucide-react';
import { dataManager } from '../../utils/dataManager';

export default function RevisionMistakes({ onStartReTest }) {
  const [mistakes, setMistakes] = useState(dataManager.getMistakes());
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [showResolved, setShowResolved] = useState(false);

  const tags = ['ALL', 'Factual Confusion', 'Guessed Wrong', 'Read Question Hurriedly', 'Outdated Info'];

  const filteredMistakes = useMemo(() => {
    return mistakes.filter(m => {
      const matchTag = selectedTag === 'ALL' || m.reflectionTag === selectedTag;
      const matchResolved = showResolved ? true : !m.resolved;
      return matchTag && matchResolved;
    });
  }, [mistakes, selectedTag, showResolved]);

  const handleResolve = (id) => {
    const updated = dataManager.resolveMistake(id);
    setMistakes(updated);
  };

  const handleRemove = (id) => {
    const updated = dataManager.removeMistake(id);
    setMistakes(updated);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-rose-500" />
              <span>Personal Mistakes Notebook</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Analyze your factual blind spots and turn every negative mark (-0.25) into guaranteed future marks.
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 self-start sm:self-auto">
            {filteredMistakes.length} Active Mistakes
          </span>
        </div>

        {/* Tag Filters & Resolved Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {tags.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTag(t)}
                className={`px-3 py-1 rounded-lg font-semibold shrink-0 transition-colors ${
                  selectedTag === t
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              checked={showResolved}
              onChange={(e) => setShowResolved(e.target.checked)}
              className="rounded text-rose-600 focus:ring-rose-500"
            />
            <span>Include Resolved</span>
          </label>
        </div>
      </div>

      {/* Mistakes List */}
      <div className="space-y-4">
        {filteredMistakes.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto opacity-70" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              Clean Slate! No Unresolved Mistakes
            </h3>
            <p className="text-xs text-slate-400">
              Keep practicing questions in the Practice Arena or Mock Tests. Any wrong answers will be logged here automatically.
            </p>
          </div>
        ) : (
          filteredMistakes.map((m) => (
            <div 
              key={m.id}
              className={`p-6 rounded-3xl border shadow-sm space-y-3.5 bg-white dark:bg-slate-900 transition-all ${
                m.resolved 
                  ? 'opacity-60 border-slate-200 dark:border-slate-800' 
                  : 'border-rose-200 dark:border-rose-900/40 hover:border-rose-300'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300">
                    {m.reflectionTag || 'Factual Confusion'}
                  </span>
                  <span className="text-xs text-slate-400">
                    Category: {m.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {!m.resolved && (
                    <button
                      onClick={() => handleResolve(m.id)}
                      className="text-xs font-bold px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 flex items-center gap-1"
                      title="Mark as Mastered / Resolved"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Mark Resolved</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleRemove(m.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded-lg"
                    title="Delete permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                {m.question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200">
                  <span className="block text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400 mb-0.5">Your Mistake Option:</span>
                  <strong>{m.options ? m.options[m.userSelectedIdx] : 'Incorrectly Answered'}</strong>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200">
                  <span className="block text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 mb-0.5">Correct Answer:</span>
                  <strong>{m.options ? m.options[m.answer] : 'Verified Fact'}</strong>
                </div>
              </div>

              {m.explanation && (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong className="text-slate-900 dark:text-white block mb-0.5">Factual Clarification: </strong>
                  {m.explanation}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
