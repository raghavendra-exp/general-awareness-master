import React, { useState } from 'react';
import { BarChart3, TrendingUp, Layers, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PyqAnalytics({ pyqData }) {
  const [selectedExamIndex, setSelectedExamIndex] = useState(0);

  const exams = pyqData?.exams || [];
  const matrix = pyqData?.priority_matrix || [];
  const currentExam = exams[selectedExamIndex] || exams[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-ga-600" />
          <span>Empirical PYQ & Weightage Analytics (2020-2026)</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Data-driven topic breakdown and 5-Tier Priority Matrix derived from authentic SBI, IBPS, and RRB Mains shifts.
        </p>

        {/* Exam switch buttons */}
        <div className="flex items-center gap-2 pt-2">
          {exams.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedExamIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedExamIndex === idx
                  ? 'bg-ga-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {ex.exam_name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Exam Analytics Card */}
      {currentExam && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {currentExam.exam_name}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Section: {currentExam.section_name} • {currentExam.questions_count} Qs / {currentExam.maximum_marks} Marks ({currentExam.sectional_time_minutes || currentExam.composite_time_recommendation_minutes} Mins)
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold text-xs">
              Negative Marking: -{currentExam.negative_marking}
            </span>
          </div>

          {/* Topic Distribution Progress Bars */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Empirical Weightage Distribution
            </h3>
            <div className="space-y-3">
              {Object.entries(currentExam.weightage_trend || {}).map(([topic, weight], i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300 capitalize">
                      {topic.replace(/_/g, ' ')}
                    </span>
                    <span className="text-ga-600 dark:text-ga-400 font-bold">{weight}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-ga-600 rounded-full"
                      style={{ width: weight.match(/\d+%/)?.[0] || '20%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Observations */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Exam Faculty Observations & Trends
            </h3>
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              {currentExam.key_observations?.map((obs, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ga-600 shrink-0 mt-0.5" />
                  <span>{obs}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5-Tier Priority Matrix */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-ga-600" />
          <span>The 5-Tier GA Priority Matrix (Topper Blueprint)</span>
        </h2>

        <div className="space-y-3">
          {matrix.map((tier, i) => (
            <div 
              key={i}
              className={`p-5 rounded-2xl border shadow-sm space-y-2.5 ${
                i === 0 ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900/60' :
                i === 1 ? 'bg-blue-50/60 dark:bg-blue-950/20 border-blue-300 dark:border-blue-900/60' :
                i === 2 ? 'bg-purple-50/60 dark:bg-purple-950/20 border-purple-300 dark:border-purple-900/60' :
                i === 3 ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-300 dark:border-amber-900/60' :
                'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                  {tier.tier}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Action: {tier.action}
                </span>
              </div>

              <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                {tier.topics.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
