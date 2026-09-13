import React, { useState } from 'react';
import { Landmark, Compass, History, Sparkles } from 'lucide-react';

export default function HistoryTimeline({ data }) {
  const [phase, setPhase] = useState('ancient');

  if (!data) return <div className="p-8 text-center text-slate-400">Loading History Timeline...</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Indian History High-Yield Chronology
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Ancient sites & councils, medieval dynasties, and the modern freedom movement.
        </p>

        {/* Phase Switcher */}
        <div className="flex items-center gap-2 pt-4">
          {[
            { id: 'ancient', label: 'Ancient India (IVC & Empires)' },
            { id: 'medieval', label: 'Medieval India (Sultanate & Mughals)' },
            { id: 'modern', label: 'Modern India (1857 & Freedom Movement)' }
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setPhase(p.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                phase === p.id
                  ? 'bg-ga-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Ancient India */}
      {phase === 'ancient' && (
        <div className="space-y-4">
          {/* IVC */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Indus Valley Civilization Major Sites & Findings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(data.ancient_india?.[0]?.key_sites || []).map((s, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{s.site}</span>
                    <span className="text-[10px] text-slate-400">{s.excavated_by || ''}</span>
                  </div>
                  <div className="text-xs text-ga-700 dark:text-ga-400 font-medium">{s.location}</div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 pt-1">
                    <strong>Findings: </strong>{s.findings}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Buddhist Councils */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              The Four Buddhist Councils (Key Bank Exam Target)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(data.ancient_india?.[1]?.buddhism?.four_councils || []).map((bc, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <div className="text-xs font-black text-amber-700 dark:text-amber-400 uppercase">
                    {bc.council}
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                    <div>Venue: <strong>{bc.venue}</strong></div>
                    <div>Patron: <strong>{bc.patron}</strong></div>
                    <div>President: <strong>{bc.president}</strong></div>
                    <div>Outcome: <strong>{bc.outcome}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. Medieval India */}
      {phase === 'medieval' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Delhi Sultanate: The Five Dynasties (1206-1526)
            </h2>
            <div className="space-y-3">
              {(data.medieval_india?.[0]?.five_dynasties || []).map((d, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                  <span className="text-xs font-black text-ga-600 dark:text-ga-400 uppercase tracking-wide">
                    {d.dynasty}
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {d.founder}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Mughal Empire: Rulers & Architecture
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(data.medieval_india?.[1]?.key_rulers || []).map((r, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {r.ruler}
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {r.notes || r.battles}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Modern India */}
      {phase === 'modern' && (
        <div className="space-y-4">
          {/* 1857 Revolt */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Revolt of 1857: Centers, Indian Leaders & British Suppressors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {(data.modern_india?.[0]?.revolt_of_1857?.centers_and_leaders || []).map((c, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <span className="text-xs font-bold text-ga-600 dark:text-ga-400 block">{c.center}</span>
                  <div>Leader: <strong className="text-slate-900 dark:text-white">{c.leader}</strong></div>
                  <div className="text-slate-500">Suppressor: {c.british_suppressor}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key INC Sessions */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Landmark Indian National Congress (INC) Sessions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(data.modern_india?.[1]?.key_inc_sessions || []).map((s, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{s.year} - {s.place}</span>
                    <span className="text-[11px] text-ga-600 dark:text-ga-400 font-semibold">{s.president}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {s.importance}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
