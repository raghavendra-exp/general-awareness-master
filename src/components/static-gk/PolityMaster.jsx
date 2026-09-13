import React, { useState } from 'react';
import { Shield, BookOpen, Scale, Award, ListFilter, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PolityMaster({ data }) {
  const [activeSection, setActiveSection] = useState('preamble');

  if (!data) return <div className="p-8 text-center text-slate-400">Loading Indian Polity Master...</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Indian Polity & Constitution Master
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Constituent Assembly milestones, high-yield articles, 12 schedules, and constitutional bodies.
        </p>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-1">
          {[
            { id: 'preamble', label: 'Preamble & Assembly' },
            { id: 'articles', label: 'High-Yield Articles' },
            { id: 'schedules', label: '12 Schedules' },
            { id: 'bodies', label: 'Constitutional Bodies' }
          ].map(sec => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeSection === sec.id
                  ? 'bg-ga-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Preamble & Assembly */}
      {activeSection === 'preamble' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-ga-600" />
              <span>Constituent Assembly Milestones</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {Object.entries(data.preamble_and_making?.constituent_assembly || {}).map(([key, val], idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <span className="text-[10px] font-bold text-ga-700 dark:text-ga-400 uppercase tracking-wider block mb-1">
                    {key.replace(/_/g, ' ')}
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sources Borrowed Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-ga-600" />
              <span>Major Sources Borrowed from Other Constitutions</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(data.preamble_and_making?.sources_borrowed || []).map((src, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                  <span className="text-xs font-black text-ga-700 dark:text-ga-400 uppercase tracking-wide">
                    {src.source}
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {src.feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. High Yield Articles */}
      {activeSection === 'articles' && (
        <div className="space-y-3">
          {(data.articles_and_parts || []).map((part, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-2.5 py-0.5 rounded bg-ga-100 dark:bg-ga-950 text-ga-800 dark:text-ga-300">
                  {part.part}: {part.articles}
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {part.subject}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 leading-relaxed">
                <strong className="text-ga-700 dark:text-ga-400 font-bold">Key Articles: </strong>
                {part.high_yield_article}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. 12 Schedules */}
      {activeSection === 'schedules' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(data.twelve_schedules || []).map((sch, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-xs font-black text-ga-600 dark:text-ga-400 uppercase tracking-wider block">
                {sch.schedule}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {sch.provisions}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 4. Constitutional Bodies */}
      {activeSection === 'bodies' && (
        <div className="space-y-4">
          {(data.constitutional_bodies || []).map((b, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {b.body}
                </h3>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                  {b.article}
                </span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                <strong className="text-slate-800 dark:text-slate-200">Composition & Tenure: </strong>
                {b.composition}
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                <strong className="text-slate-800 dark:text-slate-200">Key Functions: </strong>
                {b.role}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
