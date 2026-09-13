import React from 'react';
import { 
  Zap, 
  Award, 
  Flame, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Layers, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Brain,
  Sparkles,
  Bookmark
} from 'lucide-react';
import { calculateReadinessScore } from '../../utils/adaptiveTutor';

export default function Dashboard({ 
  stats, 
  mistakes, 
  mockHistory, 
  onNavigate, 
  selectedExam, 
  setSelectedExam,
  latestCaData
}) {
  const readiness = calculateReadinessScore(stats, mistakes?.length || 0, mockHistory);
  const accuracy = stats.totalAttempted > 0 
    ? Math.round((stats.totalCorrect / stats.totalAttempted) * 100) 
    : 0;

  const exams = [
    { id: 'SBI_CLERK', name: 'SBI Clerk Mains', qs: 50, marks: 50, time: '35m', penalty: '-0.25', focus: 'High CA & RBI Notifications' },
    { id: 'IBPS_CLERK', name: 'IBPS Clerk / CSA Mains', qs: 50, marks: 50, time: '35m', penalty: '-0.25', focus: 'Schemes, Banking & Org HQ' },
    { id: 'RRB_OA', name: 'IBPS RRB Office Assistant', qs: 40, marks: 40, time: '20m', penalty: '-0.25', focus: 'Agri, RRB, Rural & Static GK' },
  ];

  const activeExam = exams.find(e => e.id === selectedExam) || exams[0];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Top Banner: Exam Selector & Live Readiness */}
      <div className="bg-gradient-to-r from-ga-900 via-ga-800 to-bank-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-ga-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-ga-200 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>General Awareness Master Platform</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Mission Mains: Target 40+ in GA
            </h1>
            <p className="text-sm text-slate-300">
              Zero fluff. Strictly empirical PYQ patterns, official data, and spaced repetition built for bank exam toppers.
            </p>

            {/* Exam Switcher Pills */}
            <div className="pt-2 flex flex-wrap gap-2">
              {exams.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExam(ex.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedExam === ex.id
                      ? 'bg-ga-400 text-slate-950 shadow-md ring-2 ring-ga-300'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  {ex.name}
                </button>
              ))}
            </div>
          </div>

          {/* GA Readiness Score Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 flex items-center gap-5 w-full sm:w-auto shrink-0 shadow-inner">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/20"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-ga-400 transition-all duration-1000 ease-out"
                  strokeDasharray={`${readiness.score}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-black text-white">{readiness.score}</span>
                <span className="text-[9px] uppercase tracking-wider text-ga-200">/ 100</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-ga-300 uppercase tracking-wider">GA Readiness</div>
              <div className="text-sm font-bold text-white mt-0.5">{readiness.level}</div>
              <div className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                <span>Attempted: <strong>{stats.totalAttempted}</strong></span>
                <span>•</span>
                <span>Acc: <strong>{accuracy}%</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Exam specific tip pill */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-ga-200">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-ga-400 shrink-0" />
            <span>Active Target: <strong>{activeExam.name}</strong> ({activeExam.qs} Questions • {activeExam.time} • -0.25 Negative)</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-ga-400/20 text-ga-300 font-medium">
            Core Focus: {activeExam.focus}
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">{stats.streakDays} Days</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Daily Study Streak</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">{accuracy}%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Overall Accuracy</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">{mistakes?.length || 0}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Mistakes to Clear</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">{mockHistory?.length || 0}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Mocks Completed</div>
          </div>
        </div>
      </div>

      {/* Latest 24-Hours Current Affairs Feed */}
      {latestCaData && latestCaData.records?.length > 0 && (
        <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
              <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span>High-Yield Last 24 Hours Current Affairs Digest</span>
            </div>
            <button 
              onClick={() => onNavigate('CURRENT_AFFAIRS', 'daily')}
              className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-2">
            {latestCaData.records.slice(0, 2).map((rec, i) => (
              <div 
                key={i} 
                onClick={() => onNavigate('CURRENT_AFFAIRS', 'daily')}
                className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-amber-200/60 dark:border-amber-900/40 hover:border-amber-400 cursor-pointer transition-all shadow-sm flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/70 text-amber-800 dark:text-amber-300">
                      {rec.category}
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 line-clamp-1">
                      {rec.headline}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-1">
                    <strong className="text-amber-700 dark:text-amber-400 font-semibold">Exam Fact:</strong> {rec.exam_fact}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Mode Launchpad Grid */}
      <div>
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <Brain className="w-5 h-5 text-ga-600 dark:text-ga-400" />
          <span>Prep Action Launchpad</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Sectional Mock */}
          <div 
            onClick={() => onNavigate('MOCK_TESTS')}
            className="group bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-ga-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-ga-50 dark:bg-ga-950 text-ga-600 dark:text-ga-400 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-ga-600 transition-colors">
                Full Exam Simulator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Simulate real SBI/IBPS/RRB 35-minute Mains GA section with live question palette & negative marking.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-ga-600 dark:text-ga-400">
              <span>Start 50-Q Test</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Rapid Fire Speed Drill */}
          <div 
            onClick={() => onNavigate('PRACTICE', 'rapid')}
            className="group bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                Rapid Fire Speed Drill
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                15-second timer per question with combo streak multipliers. Train lightning-fast instinctive recall.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400">
              <span>Launch Drill</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Spaced Repetition Flashcards */}
          <div 
            onClick={() => onNavigate('PRACTICE', 'flashcards')}
            className="group bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                Leitner Memory Flashcards
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                5-Box spaced repetition algorithm. Cement capitals, currencies, headquarters, and Ramsar sites for life.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span>Review Cards</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Mistakes Notebook */}
          <div 
            onClick={() => onNavigate('TOOLS', 'mistakes')}
            className="group bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-rose-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                Mistakes Notebook
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Review questions answered incorrectly, tagged with self-reflection notes like "Factual Confusion" or "Guessed".
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-rose-600 dark:text-rose-400">
              <span>Re-test ({mistakes?.length || 0})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Memory Lab */}
          <div 
            onClick={() => onNavigate('PRACTICE', 'memory')}
            className="group bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                GA Memory Lab
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Visual mnemonics (AMTM, RESC-CGC-F, 2-1.5-5) and memory tricks to prevent common exam traps.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400">
              <span>Explore Tricks</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: 1000+ High-Yield One-Liners */}
          <div 
            onClick={() => onNavigate('PRACTICE', 'oneliners')}
            className="group bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                High-Yield One-Liners
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Rapid glance factual repository with audio read-aloud support. Ideal for last-mile revision.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>Read One-Liners</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Adaptive Diagnostic Recommendations */}
      {readiness.recommendations?.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-ga-600 dark:text-ga-400" />
            <span>Personalized AI Diagnostic Recommendations</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {readiness.recommendations.map((rec, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <div className="text-[10px] font-bold uppercase tracking-wider text-ga-600 dark:text-ga-400 mb-1">
                  {rec.type}
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                  {rec.title}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {rec.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
