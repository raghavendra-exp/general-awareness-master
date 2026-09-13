import React from 'react';
import { Sparkles, Brain, AlertTriangle, Lightbulb, ShieldAlert } from 'lucide-react';

export default function MemoryLab({ data }) {
  const tricks = data?.tricks || [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-600" />
          <span>GA Memory Lab & Mnemonics</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          High-yield mnemonic mental models, acronyms, and exam trap alerts designed to prevent costly negative marks.
        </p>
      </div>

      {/* Grid of Tricks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tricks.map((t) => (
          <div 
            key={t.id}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5 hover:border-purple-400 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300">
                {t.id}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                Memory Hack
              </span>
            </div>

            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t.title}
            </h2>

            {/* Mnemonic Callout */}
            <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border-l-4 border-purple-600 text-purple-950 dark:text-purple-200 text-xs sm:text-sm font-black">
              <span className="block text-[10px] uppercase font-bold text-purple-700 dark:text-purple-400 mb-0.5">
                Mnemonic Formula:
              </span>
              {t.mnemonic}
            </div>

            {t.shortcut && (
              <div className="text-xs font-semibold text-ga-700 dark:text-ga-300">
                Shortcut: {t.shortcut}
              </div>
            )}

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.explanation}
            </p>

            {/* Trap alert */}
            {t.trap_alert && (
              <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-rose-700 dark:text-rose-300 font-bold">Exam Trap Alert: </strong>
                  {t.trap_alert}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
