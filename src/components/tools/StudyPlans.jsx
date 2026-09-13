import React, { useState } from 'react';
import { Calendar, CheckSquare, Square, Award, ArrowRight, Sparkles } from 'lucide-react';
import { dataManager } from '../../utils/dataManager';

export default function StudyPlans({ plansData }) {
  const plans = plansData?.plans || [];
  const [selectedPlanId, setSelectedPlanId] = useState(plans[0]?.id || 'PLAN-30');
  const [progress, setProgress] = useState(dataManager.getStudyProgress());

  const currentPlan = plans.find(p => p.id === selectedPlanId) || plans[0];

  const handleToggleTask = (planId, taskId) => {
    const updated = dataManager.toggleStudyTask(planId, taskId);
    setProgress({ ...updated });
  };

  // Calculate completion percentage
  let totalTasks = 0;
  let completedTasks = 0;
  (currentPlan?.weeks || []).forEach((w, wIdx) => {
    (w.milestones || []).forEach((_, mIdx) => {
      totalTasks++;
      const key = `${currentPlan.id}_${wIdx}_${mIdx}`;
      if (progress[key]) completedTasks++;
    });
  });

  const completionPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-ga-600" />
              <span>Structured Study Plans & Milestones</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Time-tested daily roadmaps structured for comprehensive Mains general awareness coverage.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {plans.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPlanId(p.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedPlanId === p.id
                    ? 'bg-ga-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {p.name.split(' ')[0]} Plan
              </button>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-700 dark:text-slate-300">{currentPlan?.name}</span>
            <span className="text-ga-600">{completionPct}% ({completedTasks}/{totalTasks} Tasks)</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-ga-600 transition-all duration-500 rounded-full"
              style={{ width: `${completionPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Weeks Breakdown */}
      <div className="space-y-4">
        {(currentPlan?.weeks || []).map((w, wIdx) => (
          <div 
            key={wIdx}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded bg-ga-100 dark:bg-ga-950 text-ga-800 dark:text-ga-300">
                Week {w.week_num}
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Focus: {w.focus}
              </span>
            </div>

            <div className="space-y-2 pt-2">
              {(w.milestones || []).map((m, mIdx) => {
                const key = `${currentPlan.id}_${wIdx}_${mIdx}`;
                const isChecked = !!progress[key];

                return (
                  <div
                    key={mIdx}
                    onClick={() => handleToggleTask(currentPlan.id, `${wIdx}_${mIdx}`)}
                    className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-center gap-3 cursor-pointer ${
                      isChecked 
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-300 line-through opacity-75'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                    <span>{m}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
