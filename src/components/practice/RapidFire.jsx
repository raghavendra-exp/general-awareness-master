import React, { useState, useEffect, useRef } from 'react';
import { Zap, Flame, Award, RotateCcw, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { dataManager } from '../../utils/dataManager';

export default function RapidFire({ questions, onComplete }) {
  const [timerSeconds, setTimerSeconds] = useState(15);
  const [duration, setDuration] = useState(15);
  const [gameState, setGameState] = useState('IDLE'); // 'IDLE', 'RUNNING', 'FINISHED'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'CORRECT', 'WRONG', 'TIMEOUT'

  const timerRef = useRef(null);

  const shuffleArray = (arr) => [...arr].sort(() => 0.5 - Math.random());
  const [quizPool, setQuizPool] = useState([]);

  const startQuiz = (sec = 15) => {
    setDuration(sec);
    setTimerSeconds(sec);
    setQuizPool(shuffleArray(questions).slice(0, 15));
    setCurrentIndex(0);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setFeedback(null);
    setGameState('RUNNING');
  };

  useEffect(() => {
    if (gameState === 'RUNNING') {
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            handleTimeout();
            return duration;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState, currentIndex, duration]);

  const handleTimeout = () => {
    setFeedback('TIMEOUT');
    setCombo(0);
    advanceToNext(false);
  };

  const handleSelectOption = (optIdx) => {
    const currentQ = quizPool[currentIndex];
    const isCorrect = optIdx === currentQ.answer;

    dataManager.updateStats(isCorrect, currentQ.category);

    if (isCorrect) {
      const multiplier = combo >= 5 ? 3 : combo >= 2 ? 2 : 1;
      setScore(s => s + (10 * multiplier));
      setCombo(c => {
        const nextC = c + 1;
        if (nextC > maxCombo) setMaxCombo(nextC);
        return nextC;
      });
      setFeedback('CORRECT');
    } else {
      setCombo(0);
      setFeedback('WRONG');
      dataManager.addMistake(currentQ, optIdx, 'Factual Confusion');
    }

    advanceToNext(isCorrect);
  };

  const advanceToNext = (wasCorrect) => {
    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 >= quizPool.length) {
        setGameState('FINISHED');
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } else {
        setCurrentIndex(i => i + 1);
        setTimerSeconds(duration);
      }
    }, 600);
  };

  const currentQ = quizPool[currentIndex];

  if (gameState === 'IDLE') {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-500 mx-auto flex items-center justify-center shadow-inner">
          <Zap className="w-8 h-8 fill-amber-500" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Rapid Fire Speed Drill
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Train subconscious recognition speed under tight countdown pressure. 15 questions per sprint with combo multipliers!
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 space-y-2 text-left">
          <div className="font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider text-[11px]">
            ⚡ Speed Rules:
          </div>
          <div>• Select time limit per question (10s, 15s, or 20s).</div>
          <div>• 2 consecutive correct answers = <strong className="text-amber-600">2x Multiplier</strong></div>
          <div>• 5 consecutive correct answers = <strong className="text-amber-600">3x Multiplier</strong></div>
          <div>• Wrong answer or timeout resets your streak to 0.</div>
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Choose Timer Speed:
          </span>
          <div className="flex items-center justify-center gap-3">
            {[
              { label: 'Pro (10s)', sec: 10 },
              { label: 'Standard (15s)', sec: 15 },
              { label: 'Relaxed (20s)', sec: 20 }
            ].map(spd => (
              <button
                key={spd.sec}
                onClick={() => startQuiz(spd.sec)}
                className="px-5 py-3 rounded-2xl font-bold text-sm bg-ga-600 hover:bg-ga-700 text-white shadow-md hover:scale-105 transition-all"
              >
                {spd.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'FINISHED') {
    return (
      <div className="max-w-xl mx-auto p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center">
          <Award className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Sprint Completed!
          </h2>
          <p className="text-xs text-slate-500">
            Rapid fire reflexes sharpened for Mains speed.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-xs text-slate-400 block font-semibold">Total Score</span>
            <span className="text-3xl font-black text-ga-600">{score}</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-xs text-slate-400 block font-semibold">Max Combo Streak</span>
            <span className="text-3xl font-black text-amber-500 flex items-center justify-center gap-1">
              <Flame className="w-6 h-6 fill-amber-500" /> {maxCombo}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => startQuiz(duration)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-ga-600 hover:bg-ga-700 text-white font-bold text-sm shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>
        </div>
      </div>
    );
  }

  // Active RUNNING state
  const timerPercentage = (timerSeconds / duration) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-fade-in">
      {/* HUD Header */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        {/* Progress */}
        <div className="text-xs font-bold text-slate-500">
          Q {currentIndex + 1} / {quizPool.length}
        </div>

        {/* Timer Bar */}
        <div className="flex-1 max-w-xs">
          <div className="flex items-center justify-between text-xs font-bold mb-1">
            <span className="text-slate-400">Time Left</span>
            <span className={`font-mono text-sm ${timerSeconds <= 3 ? 'text-rose-600 animate-pulse' : 'text-slate-800 dark:text-slate-200'}`}>
              {timerSeconds}s
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-linear ${
                timerSeconds <= 3 ? 'bg-rose-500' : 'bg-ga-500'
              }`}
              style={{ width: `${timerPercentage}%` }}
            />
          </div>
        </div>

        {/* Score & Combo */}
        <div className="flex items-center gap-3">
          {combo > 1 && (
            <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-black flex items-center gap-1 animate-bounce">
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              {combo}x Combo
            </span>
          )}
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-semibold">Score</span>
            <span className="text-base font-black text-slate-900 dark:text-white">{score}</span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className={`bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border shadow-lg space-y-6 transition-colors ${
        feedback === 'CORRECT' ? 'border-emerald-500 ring-4 ring-emerald-500/10' :
        feedback === 'WRONG' || feedback === 'TIMEOUT' ? 'border-rose-500 ring-4 ring-rose-500/10' :
        'border-slate-200 dark:border-slate-800'
      }`}>
        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-ga-100 dark:bg-ga-950 text-ga-800 dark:text-ga-300">
          {currentQ.category}
        </span>

        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
          {currentQ.question}
        </h2>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {currentQ.options.map((opt, oIdx) => (
            <button
              key={oIdx}
              disabled={feedback !== null}
              onClick={() => handleSelectOption(oIdx)}
              className="w-full text-left p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-sm font-medium hover:border-ga-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all flex items-center justify-between"
            >
              <span>{opt}</span>
              <span className="text-xs font-bold text-slate-400 w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                {String.fromCharCode(65 + oIdx)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
