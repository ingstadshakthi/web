"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/*
  FIXED WINDOW COUNTER — Accurate simulation
  
  Time is divided into fixed windows (e.g. every 8 seconds).
  A counter tracks requests in the current window.
  When the window expires, the counter resets to 0.
  
  All timer-related state lives in refs to avoid stale closure bugs.
  React state is only for rendering.
*/

interface WindowRecord {
  number: number;
  count: number;
  maxedOut: boolean;
}

export default function FixedWindowCounterDiagram() {
  const LIMIT = 5;
  const WINDOW_SECONDS = 8;

  // All mutable state in refs (single source of truth)
  const counterRef = useRef(0);
  const secondsLeftRef = useRef(WINDOW_SECONDS);
  const windowNumRef = useRef(1);
  const isRunningRef = useRef(false);
  const tickRef = useRef<NodeJS.Timeout | null>(null);

  // React state for rendering only
  const [counter, setCounter] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(WINDOW_SECONDS);
  const [windowNum, setWindowNum] = useState(1);
  const [accepted, setAccepted] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [history, setHistory] = useState<WindowRecord[]>([]);
  const [lastResponse, setLastResponse] = useState<"ok" | "limited" | null>(
    null,
  );

  const startClock = useCallback(() => {
    if (tickRef.current) return;
    isRunningRef.current = true;
    tickRef.current = setInterval(() => {
      secondsLeftRef.current--;

      if (secondsLeftRef.current <= 0) {
        // Window expired — record and reset
        setHistory((h) => [
          ...h,
          {
            number: windowNumRef.current,
            count: counterRef.current,
            maxedOut: counterRef.current >= LIMIT,
          },
        ]);
        windowNumRef.current++;
        setWindowNum(windowNumRef.current);
        counterRef.current = 0;
        setCounter(0);
        secondsLeftRef.current = WINDOW_SECONDS;
      }

      setSecondsLeft(secondsLeftRef.current);
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, []);

  const handleRequest = useCallback(() => {
    if (!isRunningRef.current) startClock();
    if (counterRef.current < LIMIT) {
      counterRef.current++;
      setCounter(counterRef.current);
      setAccepted((a) => a + 1);
      setLastResponse("ok");
    } else {
      setRejected((r) => r + 1);
      setLastResponse("limited");
    }
  }, [startClock]);

  const handleFillWindow = useCallback(() => {
    if (!isRunningRef.current) startClock();
    const remaining = LIMIT - counterRef.current;
    if (remaining <= 0) {
      setLastResponse("limited");
      return;
    }
    counterRef.current = LIMIT;
    setCounter(LIMIT);
    setAccepted((a) => a + remaining);
    setLastResponse("ok");
  }, [startClock]);

  const handleReset = useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
    counterRef.current = 0;
    secondsLeftRef.current = WINDOW_SECONDS;
    windowNumRef.current = 1;
    isRunningRef.current = false;
    setCounter(0);
    setSecondsLeft(WINDOW_SECONDS);
    setWindowNum(1);
    setAccepted(0);
    setRejected(0);
    setHistory([]);
    setLastResponse(null);
  }, []);

  return (
    <div
      className="border border-divider bg-[#1A1C1E] p-6 lg:p-8"
      style={{ borderRadius: "2px" }}
    >
      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={handleRequest}
          className="px-4 py-2 text-xs font-medium bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition-colors"
          style={{ borderRadius: "2px" }}
        >
          Send Request
        </button>
        <button
          onClick={handleFillWindow}
          className="px-4 py-2 text-xs font-medium bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-colors"
          style={{ borderRadius: "2px" }}
        >
          Fill Current Window
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 text-xs font-medium bg-surface border border-divider text-secondary hover:text-platinum transition-colors"
          style={{ borderRadius: "2px" }}
        >
          Reset
        </button>
      </div>

      {/* Current window display */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-widest text-muted font-mono">
              Window {windowNum}
            </span>
            <span
              className={cn(
                "text-xs font-mono",
                counter >= LIMIT ? "text-red-400" : "text-platinum",
              )}
            >
              {counter} / {LIMIT} requests used
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-muted">resets in</span>
            <span
              className={cn(
                "text-sm font-mono font-bold tabular-nums",
                secondsLeft <= 2 ? "text-amber-400" : "text-platinum",
              )}
            >
              {secondsLeft}s
            </span>
          </div>
        </div>

        {/* Time progress bar */}
        <div
          className="h-2 border border-divider bg-[#15171a] overflow-hidden mb-5"
          style={{ borderRadius: "1px" }}
        >
          <motion.div
            className={cn(
              "h-full",
              secondsLeft <= 2 ? "bg-amber-400/50" : "bg-accent/30",
            )}
            animate={{
              width: `${((WINDOW_SECONDS - secondsLeft) / WINDOW_SECONDS) * 100}%`,
            }}
            transition={{ duration: 0.9, ease: "linear" }}
          />
        </div>

        {/* Counter blocks */}
        <div className="flex gap-2">
          {Array.from({ length: LIMIT }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                backgroundColor:
                  i < counter
                    ? counter >= LIMIT
                      ? "rgba(239,68,68,0.2)"
                      : "rgba(176,196,222,0.15)"
                    : "rgba(21,23,26,0.8)",
                borderColor:
                  i < counter
                    ? counter >= LIMIT
                      ? "rgba(239,68,68,0.4)"
                      : "rgba(176,196,222,0.35)"
                    : "rgba(255,255,255,0.08)",
                scale: i < counter ? 1 : 0.92,
              }}
              transition={{ duration: 0.2 }}
              className="flex-1 h-12 border flex items-center justify-center"
              style={{ borderRadius: "2px" }}
            >
              <span
                className={cn(
                  "text-sm font-mono",
                  i < counter
                    ? counter >= LIMIT
                      ? "text-red-400"
                      : "text-accent"
                    : "text-muted/20",
                )}
              >
                {i < counter ? "●" : "○"}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Response status */}
        {lastResponse && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2"
          >
            <span className="text-[10px] font-mono text-muted">Response:</span>
            <span
              className={cn(
                "text-xs font-mono px-2 py-0.5",
                lastResponse === "ok"
                  ? "text-emerald-400 bg-emerald-400/10"
                  : "text-red-400 bg-red-400/10",
              )}
              style={{ borderRadius: "1px" }}
            >
              {lastResponse === "ok"
                ? "200 OK"
                : "429 Rate Limited — wait for window reset"}
            </span>
          </motion.div>
        )}
      </div>

      {/* Window history */}
      {history.length > 0 && (
        <div className="mb-6">
          <span className="text-[10px] uppercase tracking-widest text-muted font-mono mb-2 block">
            Past Windows
          </span>
          <div className="flex gap-2 flex-wrap">
            {history.map((w) => (
              <div
                key={w.number}
                className={cn(
                  "px-3 py-2 border text-[10px] font-mono",
                  w.maxedOut
                    ? "border-red-500/30 bg-red-500/5 text-red-400"
                    : "border-divider bg-surface/30 text-secondary",
                )}
                style={{ borderRadius: "2px" }}
              >
                W{w.number}: {w.count}/{LIMIT} {w.maxedOut && "⚠"}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div
          className="p-3 border border-divider bg-surface/20 text-center"
          style={{ borderRadius: "2px" }}
        >
          <div className="text-lg font-mono text-emerald-400">{accepted}</div>
          <div className="text-[9px] uppercase tracking-widest text-muted mt-1">
            Total Accepted
          </div>
        </div>
        <div
          className="p-3 border border-divider bg-surface/20 text-center"
          style={{ borderRadius: "2px" }}
        >
          <div className="text-lg font-mono text-red-400">{rejected}</div>
          <div className="text-[9px] uppercase tracking-widest text-muted mt-1">
            Total Rejected
          </div>
        </div>
      </div>

      {/* Boundary exploit explanation */}
      <div
        className="p-4 border border-amber-500/20 bg-amber-500/5 text-xs text-secondary leading-relaxed"
        style={{ borderRadius: "2px", lineHeight: "1.8" }}
      >
        <strong className="text-amber-400">The boundary burst problem:</strong>{" "}
        Click &quot;Fill Current Window&quot; to max out the counter, then wait
        for the reset. As soon as the counter drops to 0, quickly hit &quot;Fill
        Current Window&quot; again. You just sent 10 requests within a few
        seconds despite the limit being 5 per window. This is the fundamental
        flaw: limits are enforced per window, not per sliding duration.
      </div>
    </div>
  );
}
