import React, { useState, useMemo } from 'react';
import { Award, Search, Globe, TrendingUp, BarChart2 } from 'lucide-react';

export default function ReportsMatrix({ data }) {
  const [searchTerm, setSearchTerm] = useState('');

  const indexes = data?.indexes || [];

  const filteredIndexes = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return indexes;
    return indexes.filter(idx => 
      idx.index_name.toLowerCase().includes(q) ||
      idx.publishing_organization.toLowerCase().includes(q) ||
      idx.india_rank_latest?.toLowerCase().includes(q) ||
      idx.top_ranking_country?.toLowerCase().includes(q)
    );
  }, [indexes, searchTerm]);

  if (!data) return <div className="p-8 text-center text-slate-400">Loading Reports Matrix...</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Reports, Indexes & India Rankings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Global publishing bodies, evaluation dimensions, latest India ranks, and top rankers.
        </p>

        {/* Search */}
        <div className="relative pt-4 w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 mt-2 -translate-y-1/2" />
          <input
            type="text"
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ga-500"
            placeholder="Search report name or publisher (e.g. HDI, WEF, Hunger)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Index Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIndexes.map((idx, i) => (
          <div 
            key={i}
            className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-ga-400 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-ga-100 dark:bg-ga-950 text-ga-800 dark:text-ga-300">
                  {idx.publishing_organization}
                </span>
                <h2 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {idx.index_name}
                </h2>
              </div>
            </div>

            {/* Rank Callouts */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {idx.india_rank_latest && (
                <div className="p-2.5 rounded-xl bg-ga-50 dark:bg-ga-950/60 border border-ga-200 dark:border-ga-900">
                  <span className="text-[10px] uppercase font-bold text-ga-700 dark:text-ga-400 block">India Rank</span>
                  <span className="text-sm font-extrabold text-ga-900 dark:text-ga-200">{idx.india_rank_latest}</span>
                </div>
              )}
              {idx.top_ranking_country && (
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Top Ranker</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{idx.top_ranking_country}</span>
                </div>
              )}
            </div>

            {idx.dimensions && (
              <div className="text-xs text-slate-600 dark:text-slate-300">
                <strong className="text-slate-800 dark:text-slate-200 font-bold">Dimensions / Indicators: </strong>
                {idx.dimensions}
              </div>
            )}

            {idx.top_performing_states && (
              <div className="text-xs text-slate-600 dark:text-slate-300">
                <strong className="text-slate-800 dark:text-slate-200 font-bold">Top States: </strong>
                {idx.top_performing_states}
              </div>
            )}

            {idx.key_fact && (
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-400">
                <strong>Key Exam Fact: </strong>{idx.key_fact}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
