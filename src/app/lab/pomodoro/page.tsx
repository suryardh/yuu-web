"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const MODES = [
  { label: "Focus", work: 25 * 60, break: 5 * 60 },
  { label: "Short", work: 10 * 60, break: 3 * 60 },
  { label: "Long", work: 50 * 60, break: 15 * 60 },
] as const;

type Phase = "work" | "break";

export default function PomodoroPage() {
  const [mode, setMode] = useState(0);
  const [phase, setPhase] = useState<Phase>("work");
  const [timeLeft, setTimeLeft] = useState(MODES[0].work);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = phase === "work" ? MODES[mode].work : MODES[mode].break;
  const progress = ((total - timeLeft) / total) * 100;

  const tick = useCallback(() => {
    setTimeLeft((t) => {
      if (t <= 1) {
        if (phase === "work") {
          setSessions((s) => s + 1);
          setPhase("break");
          return MODES[mode].break;
        } else {
          setPhase("work");
          return MODES[mode].work;
        }
      }
      return t - 1;
    });
  }, [phase, mode]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(tick, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, tick]);

  const reset = () => {
    setRunning(false);
    setPhase("work");
    setTimeLeft(MODES[mode].work);
  };

  const switchMode = (i: number) => {
    setMode(i);
    setRunning(false);
    setPhase("work");
    setTimeLeft(MODES[i].work);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  // Update page title
  useEffect(() => {
    document.title = running ? `${formatTime(timeLeft)} — Pomodoro` : "Pomodoro | Lab";
  }, [timeLeft, running]);

  return (
    <div className="min-h-[calc(100vh-5rem)] py-12 px-4 flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-light text-white mb-3 tracking-tight">Pomodoro</h1>
        <p className="text-neutral-400 font-light">Focus. Break. Repeat.</p>
      </div>

      {/* Mode Selector */}
      <div className="flex gap-2 mb-12">
        {MODES.map((m, i) => (
          <button
            key={m.label}
            onClick={() => switchMode(i)}
            className={`px-5 py-2 rounded-lg text-sm font-mono transition-all ${
              mode === i
                ? "bg-white text-black"
                : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Timer Circle */}
      <div className="relative w-64 h-64 mb-12">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" className="text-neutral-800" />
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            strokeLinecap="round"
            className="text-white transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-mono text-white font-light tracking-wider">
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-neutral-500 mt-2 uppercase tracking-widest font-mono">
            {phase === "work" ? "Focus" : "Break"}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 rounded-xl text-sm font-medium bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 transition-all"
        >
          Reset
        </button>
        <button
          onClick={() => setRunning(!running)}
          className="px-8 py-3 rounded-xl text-sm font-medium bg-white text-black hover:bg-neutral-200 transition-all"
        >
          {running ? "Pause" : "Start"}
        </button>
      </div>

      {/* Sessions */}
      <div className="mt-10 text-neutral-500 font-mono text-sm">
        Sessions completed: <span className="text-white">{sessions}</span>
      </div>
    </div>
  );
}
