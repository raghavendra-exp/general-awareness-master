import React, { useState } from 'react';
import { Bookmark, Trash2, Search, ExternalLink, HelpCircle } from 'lucide-react';
import { dataManager } from '../../utils/dataManager';

export default function BookmarksViewer() {
  const [bookmarks, setBookmarks] = useState(dataManager.getBookmarks());
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = bookmarks.filter(b => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      b.headline?.toLowerCase().includes(q) ||
      b.question?.toLowerCase().includes(q) ||
      b.country?.toLowerCase().includes(q) ||
      b.name?.toLowerCase().includes(q)
    );
  });

  const handleRemove = (item) => {
    const res = dataManager.toggleBookmark(item);
    setBookmarks(res.bookmarks);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-amber-500" />
              <span>Saved Bookmarks</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Your curated repository of high-yield questions, current affairs articles, and static facts.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900 self-start sm:self-auto">
            {filtered.length} Bookmarks
          </span>
        </div>

        {/* Search */}
        <div className="relative pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 mt-1" />
          <input
            type="text"
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ga-500"
            placeholder="Search within saved bookmarks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
            <Bookmark className="w-10 h-10 text-slate-400 mx-auto opacity-40" />
            <p className="font-bold text-slate-700 dark:text-slate-300">No bookmarks saved yet</p>
            <p className="text-xs text-slate-400">
              Click the bookmark icon on any question or current affairs record to save it here for fast review.
            </p>
          </div>
        ) : (
          filtered.map((b, i) => (
            <div 
              key={i}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-ga-100 dark:bg-ga-950 text-ga-800 dark:text-ga-300">
                  {b.category || 'Saved Item'}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white pt-0.5">
                  {b.headline || b.question || b.name || b.country}
                </h3>
                {b.exam_fact && (
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    <strong>Fact: </strong>{b.exam_fact}
                  </p>
                )}
                {b.explanation && (
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    <strong>Explanation: </strong>{b.explanation}
                  </p>
                )}
              </div>

              <button
                onClick={() => handleRemove(b)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg shrink-0"
                title="Remove Bookmark"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
