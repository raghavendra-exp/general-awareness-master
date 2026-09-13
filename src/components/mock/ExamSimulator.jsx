import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Award, 
  RotateCcw, 
  ArrowRight, 
  Bookmark, 
  ShieldCheck, 
  BarChart2,
  ChevronRight,
  Eye,
  HelpCircle,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { dataManager } from '../../utils/dataManager';

export default function ExamSimulator({ presetsData, questionsMaster }) {
  const presets = presetsData?.presets || [];
  const [selectedPreset, setSelectedPreset] = useState(presets[0]);
  const [examStatus, setExamStatus] = useState('PRE'); // 'PRE', 'LIVE', 'RESULT'
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(2100);
  const [examQuestions, setExamQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({}); // { [qIndex]: optionIndex }
  const [markedForReview, setMarkedForReview] = useState({}); // { [qIndex]: boolean }
  const [visited, setVisited] = useState({ 0: true });
  const [resultSummary, setResultSummary] = useState(null);

  const timerRef = useRef(null);

  // Start exam
  const handleStartExam = (preset) => {
    const activePreset = preset || selectedPreset;
    setSelectedPreset(activePreset);

    // Pick questions pool based on preset question count
    const pool = [...(questionsMaster?.questions || [])];
    // Fill up to target count by cycling if pool is small
    const targetQs = [];
    let pIdx = 0;
    for (let i = 0; i < activePreset.total_questions; i++) {
      const baseQ = pool[pIdx % pool.length];
      targetQs.push({ ...baseQ, mockIndex: i });
      pIdx++;
    }

    setExamQuestions(targetQs);
    setTimeRemaining(activePreset.time_limit_seconds);
    setUserAnswers({});
    setMarkedForReview({});
    setVisited({ 0: true });
    setCurrentQIndex(0);
    setExamStatus('LIVE');
  };

  // Timer effect
  useEffect(() => {
    if (examStatus === 'LIVE') {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [examStatus]);

  const handleSelectOption = (optIdx) => {
    setUserAnswers(prev => ({ ...prev, [currentQIndex]: optIdx }));
  };

  const handleClearResponse = () => {
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQIndex];
      return copy;
    });
  };

  const handleToggleMarkReview = () => {
    setMarkedForReview(prev => ({
      ...prev,
      [currentQIndex]: !prev[currentQIndex]
    }));
  };

  const handleNavigateQuestion = (idx) => {
    setVisited(prev => ({ ...prev, [idx]: true }));
    setCurrentQIndex(idx);
  };

  const handleSaveAndNext = () => {
    if (currentQIndex < examQuestions.length - 1) {
      handleNavigateQuestion(currentQIndex + 1);
    }
  };

  const handleSubmitExam = () => {
    clearInterval(timerRef.current);

    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    examQuestions.forEach((q, idx) => {
      const ans = userAnswers[idx];
      if (ans === undefined) {
        unattemptedCount++;
      } else if (ans === q.answer) {
        correctCount++;
        dataManager.updateStats(true, q.category);
      } else {
        wrongCount++;
        dataManager.updateStats(false, q.category);
        dataManager.addMistake(q, ans, 'Factual Confusion');
      }
    });

    const marksPerCorrect = 1.0;
    const penaltyPerWrong = selectedPreset.negative_mark || 0.25;
    const totalScore = Math.max(0, (correctCount * marksPerCorrect) - (wrongCount * penaltyPerWrong));
    const accuracy = (correctCount + wrongCount) > 0 
      ? Math.round((correctCount / (correctCount + wrongCount)) * 100) 
      : 0;

    const timeSpentSeconds = selectedPreset.time_limit_seconds - timeRemaining;

    const summary = {
      presetName: selectedPreset.title,
      totalQuestions: examQuestions.length,
      totalMarks: selectedPreset.total_marks,
      score: Number(totalScore.toFixed(2)),
      correctCount,
      wrongCount,
      unattemptedCount,
      accuracy,
      timeSpentSeconds,
      date: new Date().toISOString()
    };

    dataManager.saveMockResult(summary);
    setResultSummary(summary);
    setExamStatus('RESULT');

    if (totalScore >= selectedPreset.total_marks * 0.6) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  };

  // Helper formatting for seconds to MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Current active question
  const currentQ = examQuestions[currentQIndex];

  // 1. PRE-EXAM SCREEN
  if (examStatus === 'PRE') {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-7 h-7 text-ga-600" />
            <span>Full Exam Mains GA Simulator</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Real time-limited sectional exam conditions with authentic question palettes, -0.25 negative marking, and performance analytics.
          </p>
        </div>

        {/* Preset Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {presets.map((p) => (
            <div
              key={p.id}
              className={`p-6 rounded-3xl border shadow-sm flex flex-col justify-between transition-all ${
                selectedPreset?.id === p.id
                  ? 'bg-white dark:bg-slate-900 border-ga-500 ring-2 ring-ga-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-ga-100 dark:bg-ga-950 text-ga-800 dark:text-ga-300">
                    {p.target_exam}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {Math.floor(p.time_limit_seconds / 60)} Mins
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {p.title}
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {p.description}
                </p>

                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Questions</span>
                    <strong className="text-slate-900 dark:text-white text-sm">{p.total_questions}</strong>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Marks</span>
                    <strong className="text-slate-900 dark:text-white text-sm">{p.total_marks}</strong>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Negative</span>
                    <strong className="text-rose-600 text-sm">-{p.negative_mark}</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleStartExam(p)}
                className="mt-6 w-full py-3 rounded-2xl bg-ga-600 hover:bg-ga-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>Start Live Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. LIVE EXAM INTERFACE
  if (examStatus === 'LIVE') {
    return (
      <div className="space-y-4 animate-fade-in max-w-7xl mx-auto">
        {/* Top Exam Status Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4 sticky top-16 z-30">
          <div>
            <span className="text-xs font-bold text-ga-600 uppercase tracking-wider block">
              {selectedPreset.target_exam}
            </span>
            <span className="text-sm font-extrabold text-slate-900 dark:text-white">
              Question {currentQIndex + 1} of {examQuestions.length}
            </span>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-base font-black ${
              timeRemaining <= 300 
                ? 'bg-rose-50 text-rose-600 border border-rose-300 animate-pulse' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeRemaining)}</span>
            </div>

            <button
              onClick={handleSubmitExam}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              Submit Section
            </button>
          </div>
        </div>

        {/* Main Split View: Question Area & Palette */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Left: Question Box */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6 min-h-[480px]">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-ga-100 dark:bg-ga-950 text-ga-800 dark:text-ga-300">
                  {currentQ.category}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  Marks: +1.0 | Neg: -{selectedPreset.negative_mark}
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt, oIdx) => {
                  const isSelected = userAnswers[currentQIndex] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`w-full text-left p-4 rounded-2xl border text-sm transition-all flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-ga-50 dark:bg-ga-950/70 border-ga-600 text-ga-950 dark:text-ga-200 font-bold ring-2 ring-ga-500/20'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected ? 'bg-ga-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isSelected && <CheckCircle className="w-5 h-5 text-ga-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleMarkReview}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    markedForReview[currentQIndex]
                      ? 'bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-950 dark:text-purple-300'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {markedForReview[currentQIndex] ? 'Marked for Review' : 'Mark for Review'}
                </button>

                {userAnswers[currentQIndex] !== undefined && (
                  <button
                    onClick={handleClearResponse}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  >
                    Clear Response
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavigateQuestion(Math.max(0, currentQIndex - 1))}
                  disabled={currentQIndex === 0}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  onClick={handleSaveAndNext}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-ga-600 hover:bg-ga-700 text-white shadow-sm"
                >
                  Save & Next
                </button>
              </div>
            </div>
          </div>

          {/* Right: Question Palette */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Question Palette
            </h3>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Answered
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span> Not Answered
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span> Marked Review
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></span> Not Visited
              </div>
            </div>

            {/* Grid of question buttons */}
            <div className="grid grid-cols-5 gap-1.5 pt-2 max-h-72 overflow-y-auto pr-1">
              {examQuestions.map((_, idx) => {
                const isAnswered = userAnswers[idx] !== undefined;
                const isMarked = markedForReview[idx];
                const isCurr = idx === currentQIndex;
                const isVis = visited[idx];

                let color = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400';
                if (isAnswered && isMarked) {
                  color = 'bg-purple-600 text-white ring-2 ring-purple-300';
                } else if (isMarked) {
                  color = 'bg-purple-500 text-white';
                } else if (isAnswered) {
                  color = 'bg-emerald-600 text-white';
                } else if (isVis) {
                  color = 'bg-rose-500 text-white';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleNavigateQuestion(idx)}
                    className={`h-8 rounded-lg font-bold text-xs transition-all ${color} ${
                      isCurr ? 'ring-2 ring-slate-900 dark:ring-white scale-105' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. POST-EXAM RESULT SCREEN
  if (examStatus === 'RESULT' && resultSummary) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Scorecard Hero */}
        <div className="bg-gradient-to-br from-ga-900 to-bank-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 mx-auto flex items-center justify-center">
            <Award className="w-8 h-8 text-amber-300" />
          </div>
          <span className="text-xs uppercase tracking-widest text-ga-200 font-bold block">
            {resultSummary.presetName}
          </span>
          <h1 className="text-4xl font-black">
            {resultSummary.score} <span className="text-lg font-normal text-ga-200">/ {resultSummary.totalMarks} Marks</span>
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-2xl mx-auto text-xs">
            <div className="p-3 bg-white/10 rounded-2xl">
              <span className="text-ga-200 block">Accuracy</span>
              <strong className="text-lg text-white font-black">{resultSummary.accuracy}%</strong>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl">
              <span className="text-emerald-300 block">Correct (+1)</span>
              <strong className="text-lg text-emerald-200 font-black">{resultSummary.correctCount}</strong>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl">
              <span className="text-rose-300 block">Incorrect (-0.25)</span>
              <strong className="text-lg text-rose-200 font-black">{resultSummary.wrongCount}</strong>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl">
              <span className="text-slate-300 block">Unattempted</span>
              <strong className="text-lg text-slate-200 font-black">{resultSummary.unattemptedCount}</strong>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setExamStatus('PRE')}
              className="px-6 py-2.5 rounded-2xl bg-white text-slate-900 font-bold text-xs shadow-md hover:bg-slate-100 transition-colors"
            >
              Take Another Mock
            </button>
          </div>
        </div>

        {/* Detailed Answer Key & Review */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-ga-600" />
            <span>Complete Answer Key & Official Explanations</span>
          </h2>

          <div className="space-y-4">
            {examQuestions.map((q, idx) => {
              const userOpt = userAnswers[idx];
              const isCorrect = userOpt === q.answer;
              const isUnattempted = userOpt === undefined;

              return (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2.5 ${
                    isCorrect ? 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/40 dark:bg-emerald-950/20' :
                    isUnattempted ? 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40' :
                    'border-rose-200 bg-rose-50/40 dark:border-rose-900/40 dark:bg-rose-950/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500">
                      Q {idx + 1}. {q.category}
                    </span>
                    <span className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      isUnattempted ? 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300' :
                      'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      {isCorrect ? 'Correct (+1)' : isUnattempted ? 'Skipped (0)' : 'Incorrect (-0.25)'}
                    </span>
                  </div>

                  <p className="font-semibold text-slate-900 dark:text-white">
                    {q.question}
                  </p>

                  <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                    <div>Your Choice: <strong>{userOpt !== undefined ? q.options[userOpt] : 'None (Skipped)'}</strong></div>
                    <div>Correct Answer: <strong className="text-emerald-700 dark:text-emerald-400">{q.options[q.answer]}</strong></div>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                    <strong className="text-slate-900 dark:text-white block mb-0.5">Explanation: </strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
