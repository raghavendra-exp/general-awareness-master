import React, { useState } from 'react';
import { Compass, Waves, Mountain, ShieldCheck, MapPin } from 'lucide-react';

export default function GeographyExplorer({ data }) {
  const [activeTab, setActiveTab] = useState('rivers');

  if (!data) return <div className="p-8 text-center text-slate-400">Loading Geography Explorer...</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Indian Geography Explorer
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Himalayan and Peninsular rivers, multipurpose dams, mountain peaks and strategic passes.
        </p>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 pt-4">
          {[
            { id: 'rivers', label: 'River Systems & Confluences' },
            { id: 'dams', label: 'Major Dams & Projects' },
            { id: 'peaks', label: 'Mountain Peaks & Passes' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === t.id
                  ? 'bg-ga-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Rivers */}
      {activeTab === 'rivers' && (
        <div className="space-y-4">
          {(data.river_systems || []).map((sys, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Waves className="w-5 h-5 text-blue-500" />
                <span>{sys.system}</span>
              </h2>
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div>Origin: <strong>{sys.origin}</strong></div>
                {sys.length && <div>Length: <strong>{sys.length}</strong></div>}
              </div>

              {/* Panch Prayag special block */}
              {sys.panch_prayag && (
                <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 mt-3 space-y-2">
                  <div className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider">
                    Panch Prayag (Five Holy Confluences)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                    {sys.panch_prayag.map((pp, i) => (
                      <div key={i} className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-blue-100 dark:border-blue-900">
                        <strong className="text-blue-700 dark:text-blue-400 block">{pp.confluence}</strong>
                        <span className="text-slate-600 dark:text-slate-300">{pp.rivers}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Peninsular Rivers Grid */}
              {sys.east_flowing && (
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Major East-Flowing Rivers (Bay of Bengal)
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sys.east_flowing.map((r, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs space-y-1">
                        <span className="font-bold text-slate-900 dark:text-white block">{r.river} ({r.length})</span>
                        <div>Origin: {r.origin}</div>
                        {r.tributaries && <div className="text-slate-500">Tributaries: {r.tributaries}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {sys.west_flowing_rift_valley && (
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    West-Flowing Rift Valley Rivers (Arabian Sea)
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sys.west_flowing_rift_valley.map((r, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs space-y-1">
                        <span className="font-bold text-slate-900 dark:text-white block">{r.river} {r.length ? `(${r.length})` : ''}</span>
                        {r.origin && <div>Origin: {r.origin}</div>}
                        {r.significance && <div className="text-amber-700 dark:text-amber-400 font-medium">{r.significance}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 2. Dams */}
      {activeTab === 'dams' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(data.major_dams_and_projects || []).map((d, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {d.dam}
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  {d.state}
                </span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                River: <strong className="text-slate-900 dark:text-white">{d.river}</strong>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                {d.facts}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 3. Peaks & Passes */}
      {activeTab === 'peaks' && (
        <div className="space-y-5">
          {/* Peaks */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Mountain className="w-5 h-5 text-ga-600" />
              <span>Highest Mountain Peaks of India</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(data.peaks_and_passes?.mountain_peaks || []).map((p, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{p.peak}</span>
                    <span className="font-mono font-bold text-ga-700 dark:text-ga-400">{p.elevation}</span>
                  </div>
                  <div className="text-slate-500">{p.location}</div>
                  <p className="text-slate-600 dark:text-slate-300 pt-1">{p.facts}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Passes */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-ga-600" />
              <span>Strategic Mountain Passes</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(data.peaks_and_passes?.mountain_passes || []).map((mp, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">{mp.pass}</span>
                  <div className="text-slate-600 dark:text-slate-300">Connects: <strong>{mp.connects}</strong></div>
                  {mp.facts && <p className="text-slate-500 pt-1">{mp.facts}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
