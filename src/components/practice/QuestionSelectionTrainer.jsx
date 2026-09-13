import React, { useState } from 'react';
import { Target, CheckCircle, XCircle, AlertTriangle, ArrowRight, RotateCcw, ShieldCheck } from 'lucide-react';

export default function QuestionSelectionTrainer({ questions }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDecision, setSelectedDecision] = useState(null); // 'ATTEMPT' or 'SKIP'
  const [stats, setStats] = useState({ correctDecisions: 0, total: 0, marksSaved: 0 });

  const scenarios = [
    {
      q: "The New Development Bank (NDB) approved membership for which North African nation in September 2026?",
      options: ["Egypt", "Morocco", "Algeria", "Tunisia", "Libya"],
      confidenceScenario: "You know Egypt already joined earlier in 2024. You are torn between Algeria and Morocco.",
      eliminatedOptions: ["Egypt (Already joined)", "Tunisia (Unlikely)", "Libya (Not member)"],
      remainingOptions: ["Algeria", "Morocco"],
      optimalDecision: "ATTEMPT",
      rationale: "With 2 options eliminated, you have a 50% probability of being right. Expected Value = (0.5 * 1) - (0.5 * 0.25) = +0.375 Marks. In Bank Mains, a 50-50 eliminated question should ALWAYS be attempted.",
      correctAnswer: "Algeria"
    },
    {
      q: "Under PM Surya Ghar Muft Bijli Yojana, what is the exact central subsidy amount for installing a 2 kW rooftop solar system?",
      options: ["₹30,000", "₹50,000", "₹60,000", "₹75,000", "₹78,000"],
      confidenceScenario: "You know 1 kW is ₹30,000 and the maximum is ₹78,000, but you have no clue what 2 kW gets.",
      eliminatedOptions: ["₹30,000 (1 kW)", "₹78,000 (3 kW+)"],
      remainingOptions: ["₹50,000", "₹60,000", "₹75,000"],
      optimalDecision: "SKIP",
      rationale: "With 3 options remaining, Expected Value = (0.33 * 1) - (0.67 * 0.25) = +0.16 marks, but in factual financial schemes with identical round numbers, blind guessing has a high risk of memory confusion. Toppers SKIP unless they can eliminate down to 2 options.",
      correctAnswer: "₹60,000"
    },
    {
      q: "Who was appointed as the Executive Director representing India at the International Monetary Fund (IMF) in Washington D.C.?",
      options: ["Raghuram Rajan", "Urjit Patel", "Senior Financial Economist", "Viral Acharya", "Gita Gopinath"],
      confidenceScenario: "You haven't read this appointment at all and all names sound plausible.",
      eliminatedOptions: [],
      remainingOptions: ["All 5 Options"],
      optimalDecision: "SKIP",
      rationale: "Pure 5-option blind guessing has an expected value of (0.2 * 1) - (0.8 * 0.25) = 0 Marks (or negative due to cognitive fatigue). Attempting blind guesses in GA is the #1 reason candidates fail sectional cutoffs.",
      correctAnswer: "Senior Financial Economist"
    }
  ];

  const current = scenarios[currentIndex] || scenarios[0];

  const handleDecision = (decision) => {
    setSelectedDecision(decision);
    const isOptimal = decision === current.optimalDecision;
    setStats(prev => ({
      correctDecisions: prev.correctDecisions + (isOptimal ? 1 : 0),
      total: prev.total + 1,
      marksSaved: prev.marksSaved + (decision === 'SKIP' && current.optimalDecision === 'SKIP' ? 0.25 : 0)
    }));
  };

  const handleNext = () => {
    setSelectedDecision(null);
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Target className="w-6 h-6 text-ga-600" />
          <span>Question Selection Strategy Trainer</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Mains exams are won by what you SKIP, not just what you solve. Practice optimal risk-reward decisions.
        </p>

        <div className="flex items-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300">
          <span>Optimal Decisions: <strong className="text-ga-600">{stats.correctDecisions} / {stats.total}</strong></span>
          <span>•</span>
          <span>Negative Marks Saved: <strong className="text-emerald-600">+{stats.marksSaved.toFixed(2)}</strong></span>
        </div>
      </div>

      {/* Scenario Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
          <span>Scenario {currentIndex + 1} of {scenarios.length}</span>
          <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-extrabold text-[10px] uppercase">
            Negative Marking Strategy
          </span>
        </div>

        {/* Question text */}
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
          {current.q}
        </h2>

        {/* User's mental state scenario */}
        <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-xs sm:text-sm text-amber-950 dark:text-amber-200 space-y-1.5">
          <strong className="text-amber-800 dark:text-amber-300 font-bold block text-xs uppercase tracking-wider">
            🧠 Your Real-Exam Situation:
          </strong>
          <p>{current.confidenceScenario}</p>
          {current.remainingOptions.length > 0 && (
            <div className="text-xs pt-1">
              Options in consideration: <strong>{current.remainingOptions.join(' vs ')}</strong>
            </div>
          )}
        </div>

        {/* Action Decision: ATTEMPT or SKIP */}
        {!selectedDecision ? (
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block text-center">
              What is your strategy decision?
            </span>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleDecision('ATTEMPT')}
                className="py-4 px-6 rounded-2xl bg-ga-600 hover:bg-ga-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>ATTEMPT (+1 or -0.25)</span>
              </button>
              <button
                onClick={() => handleDecision('SKIP')}
                className="py-4 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm border border-slate-300 dark:border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <XCircle className="w-5 h-5 text-rose-500" />
                <span>SKIP (0 Marks)</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-2 animate-fade-in">
            <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
              selectedDecision === current.optimalDecision
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200'
            }`}>
              <div className="font-bold text-sm flex items-center gap-2 mb-2">
                {selectedDecision === current.optimalDecision ? (
                  <span className="text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle className="w-5 h-5" /> Optimal Strategy Chosen!
                  </span>
                ) : (
                  <span className="text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-5 h-5" /> Sub-optimal Decision in Exam Hall.
                  </span>
                )}
              </div>

              <div className="mb-2">
                Optimal Choice: <strong>{current.optimalDecision}</strong> | Correct Answer was: <strong>{current.correctAnswer}</strong>
              </div>

              <p className="text-slate-700 dark:text-slate-300">
                <strong>Mathematical Rationale: </strong>{current.rationale}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 rounded-2xl bg-ga-600 hover:bg-ga-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Next Scenario</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
