import React, { useState } from 'react';
import { TrendingUp, Percent, DollarSign, Scale, PieChart, ShieldAlert } from 'lucide-react';

export default function EconomyMaster({ data }) {
  const [activeTab, setActiveTab] = useState('inflation');

  if (!data) return <div className="p-8 text-center text-slate-400">Loading Economy Master...</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Indian Macro-Economy & Core Concepts
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          CPI/WPI inflation metrics, IIP 8 core industries, fiscal deficit mathematics, and Balance of Payments.
        </p>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 pt-4">
          {[
            { id: 'inflation', label: 'Inflation & Core IIP' },
            { id: 'deficits', label: 'Fiscal Policy & Deficits' },
            { id: 'national_income', label: 'GDP & National Income' },
            { id: 'bop', label: 'Balance of Payments (BoP)' }
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

      {/* 1. Inflation Metrics */}
      {activeTab === 'inflation' && (
        <div className="space-y-4">
          {(data.inflation_metrics || []).map((inf, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {inf.metric}
                </h3>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  Base Year: {inf.base_year}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Published By</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{inf.published_by}</span>
                </div>
                {inf.release_frequency && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Frequency</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{inf.release_frequency}</span>
                  </div>
                )}
              </div>

              {inf.basket_composition && (
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-800 dark:text-slate-200 font-bold">Basket Weights: </strong>
                  {inf.basket_composition}
                </div>
              )}

              {inf.eight_core_industries && (
                <div className="p-3.5 rounded-xl bg-ga-50/70 dark:bg-ga-950/30 border border-ga-200 dark:border-ga-800 text-xs space-y-1">
                  <strong className="text-ga-800 dark:text-ga-300 font-bold block">
                    Eight Core Industries (40.27% of IIP):
                  </strong>
                  <p className="text-slate-700 dark:text-slate-300">{inf.eight_core_industries}</p>
                </div>
              )}

              <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 text-xs text-amber-900 dark:text-amber-200">
                <strong>Bank Exam Significance: </strong>{inf.exam_significance}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Fiscal Policy & Deficits */}
      {activeTab === 'deficits' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(data.fiscal_policy_and_deficits?.budget_deficits || []).map((def, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {def.type}
                </h3>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-xs font-bold text-ga-700 dark:text-ga-400">
                  {def.formula}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 pt-1">
                  {def.significance}
                </p>
              </div>
            ))}
          </div>

          {/* FRBM Act Details */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {data.fiscal_policy_and_deficits?.frbm_act?.name}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {data.fiscal_policy_and_deficits?.frbm_act?.key_amendments}
            </p>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Mandated Targets: </strong>{data.fiscal_policy_and_deficits?.frbm_act?.statutory_targets}
            </div>
          </div>
        </div>
      )}

      {/* 3. GDP Concepts */}
      {activeTab === 'national_income' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(data.national_income?.concepts || []).map((con, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {con.term}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {con.definition}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 4. Balance of Payments */}
      {activeTab === 'bop' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Balance of Payments (BoP) Structure
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {data.balance_of_payments?.definition}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {(data.balance_of_payments?.accounts || []).map((acc, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm block">{acc.account}</span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{acc.components}</p>
                  {acc.cad && <p className="text-amber-700 dark:text-amber-400 font-medium">{acc.cad}</p>}
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-ga-50/70 dark:bg-ga-950/30 text-xs text-ga-900 dark:text-ga-200 mt-2">
              <strong>Forex Components (RBI Section 40): </strong>
              {data.balance_of_payments?.forex_components}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
