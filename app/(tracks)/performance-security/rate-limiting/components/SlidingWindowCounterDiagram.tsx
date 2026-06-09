"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/*
  SLIDING WINDOW COUNTER — Accurate simulation
  
  Hybrid of fixed window + sliding window. Keep counters for:
  - Previous window count
  - Current window count
  
  Estimated request count = (prevCount × overlapWeight) + currCount
  where overlapWeight = 1 - (elapsedTimeInCurrentWindow / windowDuration)
  
  Key behavior:
  - Only stores 2 integers per user (minimal memory)
  - Approximates sliding window behavior without storing individual timestamps
  - As time progresses through a window, previous window's influence decreases
  - Near-perfect accuracy (within a few % of true sliding window)
  - Used by Cloudflare, Kong, and most production API gateways
*/

export default function SlidingWindowCounterDiagram() {
  const LIMIT = 10;
  const WINDOW_SECONDS = 10;

  const prevCountRef = useRef(0);
  const currCountRef = useRef(0);
  const [prevCount, setPrevCount] = useState(0);
  const [currCount, setCurrCount] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [windowNum, setWindowNum] = useState(1);
  const [accepted, setAccepted] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lastResponse, setLastResponse] = useState<"ok" | "limited" | null>(
    null,
  );
  const tickRef = useRef<NodeJS.Timeout | null>(null);
  const elapsedRef = useRef(0);

  const getEstimate = useCallback(() => {
    const weight = 1 - elapsedRef.current / WINDOW_SECONDS;
    return prevCountRef.current * weight + currCountRef.current;
  }, []);

  const startClock = useCallback(() => {
    if (tickRef.current) return;
    setIsRunning(true);
    tickRef.current = setInterval(() => {
      elapsedRef.current++;
      if (elapsedRef.current >= WINDOW_SECONDS) {
        // Rotate: current becomes previous
        prevCountRef.current = currCountRef.current;
        currCountRef.current = 0;
        setPrevCount(prevCountRef.current);
        setCurrCount(0);
        setWindowNum((w) => w + 1);
        elapsedRef.current = 0;
        setElapsedSeconds(0);
      } else {
        setElapsedSeconds(elapsedRef.current);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, []);

  const handleRequest = useCallback(() => {
    if (!isRunning) startClock();
    const estimate = getEstimate();
    if (estimate < LIMIT) {
      currCountRef.current++;
      setCurrCount(currCountRef.current);
      setAccepted((a) => a + 1);
      setLastResponse("ok");
    } else {
      setRejected((r) => r + 1);
      setLastResponse("limited");
    }
  }, [isRunning, startClock, getEstimate]);

  const handleSetPrevious = useCallback(
    (count: number) => {
      if (!isRunning) startClock();
      prevCountRef.current = count;
      setPrevCount(count);
    },
    [isRunning, startClock],
  );

  const handleReset = useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
    prevCountRef.current = 0;
    currCountRef.current = 0;
    elapsedRef.current = 0;
    setPrevCount(0);
    setCurrCount(0);
    setElapsedSeconds(0);
    setWindowNum(1);
    setAccepted(0);
    setRejected(0);
    setIsRunning(false);
    setLastResponse(null);
  }, []);

  const weight = 1 - elapsedSeconds / WINDOW_SECONDS;
  const weightedPrev = prevCount * weight;
  const estimate = weightedPrev + currCount;

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
          onClick={() => handleSetPrevious(7)}
          className="px-4 py-2 text-xs font-medium bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 transition-colors"
          style={{ borderRadius: "2px" }}
        >
          Set Previous = 7
        </button>
        <button
          onClick={() => handleSetPrevious(10)}
          className="px-4 py-2 text-xs font-medium bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
          style={{ borderRadius: "2px" }}
        >
          Set Previous = 10 (was full)
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 text-xs font-medium bg-surface border border-divider text-secondary hover:text-platinum transition-colors"
          style={{ borderRadius: "2px" }}
        >
          Reset
        </button>
      </div>

      {/* Window pair visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Previous window */}
        <div
          className="p-5 border border-purple-500/20 bg-[#15171a]"
          style={{ borderRadius: "2px" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase tracking-widest text-purple-400/60 font-mono">
              Previous Window
            </span>
            <span className="text-[10px] font-mono text-purple-400/80">
              W{windowNum - 1 > 0 ? windowNum - 1 : "–"}
            </span>
          </div>
          {/* Counter visual */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {Array.from({ length: LIMIT }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-7 h-7 border flex items-center justify-center text-[9px] font-mono",
                  i < prevCount
                    ? "border-purple-400/40 bg-purple-400/12 text-purple-400"
                    : "border-divider/50 bg-surface/5 text-muted/15",
                )}
                style={{ borderRadius: "1px" }}
              >
                {i < prevCount ? "●" : "○"}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-muted">
              Count: <span className="text-purple-400">{prevCount}</span>
            </span>
            <span className="text-muted">
              Weight:{" "}
              <span className="text-purple-400">
                {(weight * 100).toFixed(0)}%
              </span>
            </span>
            <span className="text-muted">
              Contribution:{" "}
              <span className="text-purple-400 font-bold">
                {weightedPrev.toFixed(1)}
              </span>
            </span>
          </div>
        </div>

        {/* Current window */}
        <div
          className="p-5 border border-accent/25 bg-[#15171a]"
          style={{ borderRadius: "2px" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase tracking-widest text-accent/60 font-mono">
              Current Window
            </span>
            <span className="text-[10px] font-mono text-accent/80">
              W{windowNum}
            </span>
          </div>
          {/* Counter visual */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {Array.from({ length: LIMIT }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-7 h-7 border flex items-center justify-center text-[9px] font-mono",
                  i < currCount
                    ? "border-accent/40 bg-accent/12 text-accent"
                    : "border-divider/50 bg-surface/5 text-muted/15",
                )}
                style={{ borderRadius: "1px" }}
              >
                {i < currCount ? "●" : "○"}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-muted">
              Count: <span className="text-accent">{currCount}</span>
            </span>
            <span className="text-muted">
              Elapsed:{" "}
              <span className="text-accent">
                {elapsedSeconds}s / {WINDOW_SECONDS}s
              </span>
            </span>
          </div>
          {/* Time progress */}
          <div
            className="mt-2 h-1.5 bg-surface/30 overflow-hidden"
            style={{ borderRadius: "1px" }}
          >
            <motion.div
              className="h-full bg-accent/30"
              animate={{ width: `${(elapsedSeconds / WINDOW_SECONDS) * 100}%` }}
              transition={{ duration: 0.8, ease: "linear" }}
            />
          </div>
        </div>
      </div>

      {/* Formula calculation — the core of understanding */}
      <div
        className="p-5 border border-divider bg-surface/30 mb-6"
        style={{ borderRadius: "2px" }}
      >
        <span className="text-[10px] uppercase tracking-widest text-muted font-mono block mb-4">
          Weighted Estimate (the algorithm&apos;s core calculation)
        </span>

        {/* Formula breakdown */}
        <div className="flex flex-wrap items-center gap-2 text-sm font-mono mb-4">
          <div
            className="flex items-center gap-1.5 px-2 py-1 bg-purple-400/5 border border-purple-400/20"
            style={{ borderRadius: "2px" }}
          >
            <span className="text-purple-400">{prevCount}</span>
            <span className="text-muted">×</span>
            <span className="text-purple-400/70">{weight.toFixed(2)}</span>
          </div>
          <span className="text-muted text-lg">+</span>
          <div
            className="px-2 py-1 bg-accent/5 border border-accent/20"
            style={{ borderRadius: "2px" }}
          >
            <span className="text-accent">{currCount}</span>
          </div>
          <span className="text-muted text-lg">=</span>
          <div
            className={cn(
              "px-3 py-1 font-bold text-base border",
              estimate >= LIMIT
                ? "text-red-400 bg-red-400/10 border-red-400/30"
                : "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
            )}
            style={{ borderRadius: "2px" }}
          >
            {estimate.toFixed(1)}
          </div>
          <span className="text-muted text-xs">/ {LIMIT} limit</span>
        </div>

        {/* Visual capacity bar */}
        <div
          className="h-4 bg-[#15171a] border border-divider overflow-hidden flex"
          style={{ borderRadius: "1px" }}
        >
          {/* Previous window contribution */}
          <motion.div
            className="h-full bg-purple-400/30 border-r border-purple-400/20"
            animate={{ width: `${(weightedPrev / LIMIT) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
          {/* Current window contribution */}
          <motion.div
            className="h-full bg-accent/30"
            animate={{ width: `${(currCount / LIMIT) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex items-center gap-4 mt-2 text-[9px] font-mono text-muted">
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-2 bg-purple-400/30"
              style={{ borderRadius: "1px" }}
            />
            <span>Previous ({weightedPrev.toFixed(1)})</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-2 bg-accent/30"
              style={{ borderRadius: "1px" }}
            />
            <span>Current ({currCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-2 bg-[#15171a] border border-divider"
              style={{ borderRadius: "1px" }}
            />
            <span>Remaining ({Math.max(0, LIMIT - estimate).toFixed(1)})</span>
          </div>
        </div>

        {/* Response */}
        {lastResponse && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[10px] font-mono text-muted">
              Last response:
            </span>
            <span
              className={cn(
                "text-[10px] font-mono px-2 py-0.5",
                lastResponse === "ok"
                  ? "text-emerald-400 bg-emerald-400/10"
                  : "text-red-400 bg-red-400/10",
              )}
              style={{ borderRadius: "1px" }}
            >
              {lastResponse === "ok"
                ? "200 OK — estimate within limit"
                : "429 — weighted estimate exceeds limit"}
            </span>
          </div>
        )}
      </div>

      {/* Memory comparison */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div
          className="p-3 border border-emerald-500/20 bg-emerald-500/5 text-center"
          style={{ borderRadius: "2px" }}
        >
          <div className="text-sm font-mono text-emerald-400">~16 bytes</div>
          <div className="text-[9px] uppercase tracking-widest text-muted mt-1">
            This algorithm (2 integers)
          </div>
        </div>
        <div
          className="p-3 border border-amber-500/20 bg-amber-500/5 text-center"
          style={{ borderRadius: "2px" }}
        >
          <div className="text-sm font-mono text-amber-400">~80 KB</div>
          <div className="text-[9px] uppercase tracking-widest text-muted mt-1">
            Sliding log (10K timestamps)
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div
          className="p-3 border border-divider bg-surface/20 text-center"
          style={{ borderRadius: "2px" }}
        >
          <div className="text-lg font-mono text-emerald-400">{accepted}</div>
          <div className="text-[9px] uppercase tracking-widest text-muted mt-1">
            Accepted
          </div>
        </div>
        <div
          className="p-3 border border-divider bg-surface/20 text-center"
          style={{ borderRadius: "2px" }}
        >
          <div className="text-lg font-mono text-red-400">{rejected}</div>
          <div className="text-[9px] uppercase tracking-widest text-muted mt-1">
            Rejected
          </div>
        </div>
      </div>

      {/* Insight */}
      <div
        className="p-4 border border-divider bg-surface/30 text-xs text-secondary leading-relaxed"
        style={{ borderRadius: "2px", lineHeight: "1.8" }}
      >
        <strong className="text-platinum">What to observe:</strong> Set
        &quot;Previous = 7&quot; then watch what happens as time advances. Early
        in the window (weight ~90%), the previous count dominates: 7 × 0.9 =
        6.3, leaving only ~3.7 capacity. But at the END of the window (weight
        ~10%), it&apos;s 7 × 0.1 = 0.7, leaving ~9.3 capacity. The same previous
        count matters less and less over time. This is how 2 simple integers
        approximate a perfect sliding window.
      </div>
    </div>
  );
}
