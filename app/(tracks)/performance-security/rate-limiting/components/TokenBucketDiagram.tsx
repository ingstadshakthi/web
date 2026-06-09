"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

/*
  TOKEN BUCKET — Accurate simulation
  
  A bucket holds tokens (max = capacity). Tokens are added at a fixed rate.
  Each request consumes 1 token. If tokens are available, request passes immediately.
  If no tokens, request is rejected.
  
  Key behavior:
  - Tokens ACCUMULATE when idle, up to capacity
  - Allows BURSTS up to the number of accumulated tokens
  - After a burst depletes tokens, must wait for refills
  - Contrast with leaky bucket: burst friendly vs burst hostile
*/

interface LogEntry {
  id: number;
  action: "allowed" | "rejected" | "refill";
  tokensAfter: number;
}

export default function TokenBucketDiagram() {
  const CAPACITY = 5;
  const REFILL_MS = 2000; // +1 token every 2 seconds

  const tokensRef = useRef(CAPACITY); // start full
  const [tokens, setTokens] = useState(CAPACITY);
  const [accepted, setAccepted] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [refillPulse, setRefillPulse] = useState(false);
  const refillTimer = useRef<NodeJS.Timeout | null>(null);
  const logId = useRef(0);

  const syncTokens = useCallback((val: number) => {
    tokensRef.current = val;
    setTokens(val);
  }, []);

  const addLog = useCallback(
    (action: LogEntry["action"], tokensAfter: number) => {
      setLog((prev) =>
        [{ id: ++logId.current, action, tokensAfter }, ...prev].slice(0, 15),
      );
    },
    [],
  );

  // Start refill timer on mount
  useEffect(() => {
    refillTimer.current = setInterval(() => {
      if (tokensRef.current < CAPACITY) {
        const next = tokensRef.current + 1;
        tokensRef.current = next;
        setTokens(next);
        addLog("refill", next);
        setRefillPulse(true);
        setTimeout(() => setRefillPulse(false), 300);
      }
    }, REFILL_MS);
    return () => {
      if (refillTimer.current) clearInterval(refillTimer.current);
    };
  }, [addLog]);

  const handleRequest = useCallback(() => {
    if (tokensRef.current > 0) {
      const next = tokensRef.current - 1;
      syncTokens(next);
      setAccepted((a) => a + 1);
      addLog("allowed", next);
    } else {
      setRejected((r) => r + 1);
      addLog("rejected", 0);
    }
  }, [syncTokens, addLog]);

  const handleBurst = useCallback(() => {
    // Attempt 7 requests instantly
    for (let i = 0; i < 7; i++) {
      handleRequest();
    }
  }, [handleRequest]);

  const handleReset = useCallback(() => {
    syncTokens(CAPACITY);
    setAccepted(0);
    setRejected(0);
    setLog([]);
    logId.current = 0;
  }, [syncTokens]);

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
          Send Request (costs 1 token)
        </button>
        <button
          onClick={handleBurst}
          className="px-4 py-2 text-xs font-medium bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-colors"
          style={{ borderRadius: "2px" }}
        >
          Burst 7 Requests
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 text-xs font-medium bg-surface border border-divider text-secondary hover:text-platinum transition-colors"
          style={{ borderRadius: "2px" }}
        >
          Reset (refill all)
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Token visualization */}
        <div className="flex-1">
          {/* Token count header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] uppercase tracking-widest text-muted font-mono">
              Available Tokens
            </span>
            <span
              className={cn(
                "text-sm font-mono font-bold",
                tokens === 0 ? "text-red-400" : "text-accent",
              )}
            >
              {tokens} / {CAPACITY}
            </span>
          </div>

          {/* Token slots */}
          <div className="flex gap-3 mb-4">
            {Array.from({ length: CAPACITY }).map((_, i) => {
              const isFilled = i < tokens;
              return (
                <motion.div
                  key={i}
                  animate={{
                    scale: isFilled ? 1 : 0.85,
                    opacity: isFilled ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className={cn(
                    "w-14 h-14 border-2 flex items-center justify-center transition-colors duration-200",
                    isFilled
                      ? "border-accent/50 bg-accent/15"
                      : "border-divider bg-surface/10",
                  )}
                  style={{ borderRadius: "2px" }}
                >
                  <motion.span
                    animate={{ opacity: isFilled ? 1 : 0.2 }}
                    className={cn(
                      "text-xl",
                      isFilled ? "text-accent" : "text-muted/30",
                    )}
                  >
                    ●
                  </motion.span>
                </motion.div>
              );
            })}
          </div>

          {/* Refill indicator */}
          <div className="flex items-center gap-2 mb-6">
            <motion.div
              animate={{
                backgroundColor: refillPulse
                  ? "rgb(52,211,153)"
                  : "rgba(52,211,153,0.3)",
                scale: refillPulse ? 1.3 : 1,
              }}
              transition={{ duration: 0.2 }}
              className="w-2 h-2"
              style={{ borderRadius: "50%" }}
            />
            <span className="text-[10px] font-mono text-muted">
              Auto-refill: +1 token every 2 seconds{" "}
              {tokens >= CAPACITY && "(bucket full, waiting)"}
            </span>
          </div>

          {/* Response indicator */}
          <div
            className="flex items-center gap-3 p-3 border border-divider bg-[#15171a]"
            style={{ borderRadius: "2px" }}
          >
            <span className="text-[10px] font-mono text-muted">
              Last response:
            </span>
            {log.length > 0 && log[0].action !== "refill" && (
              <span
                className={cn(
                  "text-xs font-mono px-2 py-0.5",
                  log[0].action === "allowed"
                    ? "text-emerald-400 bg-emerald-400/10"
                    : "text-red-400 bg-red-400/10",
                )}
                style={{ borderRadius: "1px" }}
              >
                {log[0].action === "allowed"
                  ? "200 OK — token consumed"
                  : "429 Too Many Requests — no tokens"}
              </span>
            )}
            {(log.length === 0 || log[0].action === "refill") && (
              <span className="text-[10px] font-mono text-muted/40">
                waiting...
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div
              className="p-3 border border-divider bg-surface/20 text-center"
              style={{ borderRadius: "2px" }}
            >
              <div className="text-lg font-mono text-accent">{tokens}</div>
              <div className="text-[9px] uppercase tracking-widest text-muted mt-1">
                Tokens Left
              </div>
            </div>
            <div
              className="p-3 border border-divider bg-surface/20 text-center"
              style={{ borderRadius: "2px" }}
            >
              <div className="text-lg font-mono text-emerald-400">
                {accepted}
              </div>
              <div className="text-[9px] uppercase tracking-widest text-muted mt-1">
                Allowed
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
        </div>

        {/* Log panel */}
        <div className="w-full lg:w-64">
          <span className="text-[10px] uppercase tracking-widest text-muted font-mono mb-2 block">
            Live Activity
          </span>
          <div
            className="h-72 border border-divider bg-[#15171a] overflow-y-auto p-3 space-y-1"
            style={{ borderRadius: "2px" }}
          >
            {log.length === 0 && (
              <p className="text-[10px] text-muted/40 font-mono">
                Tokens refilling...
              </p>
            )}
            <AnimatePresence initial={false}>
              {log.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 text-[10px] font-mono py-0.5"
                >
                  <span
                    className={cn(
                      "px-1.5 py-0.5 shrink-0",
                      entry.action === "allowed" &&
                        "text-emerald-400 bg-emerald-400/10",
                      entry.action === "rejected" &&
                        "text-red-400 bg-red-400/10",
                      entry.action === "refill" &&
                        "text-blue-400 bg-blue-400/10",
                    )}
                    style={{ borderRadius: "1px" }}
                  >
                    {entry.action === "allowed" && "✓ OK"}
                    {entry.action === "rejected" && "✗ 429"}
                    {entry.action === "refill" && "+ REFILL"}
                  </span>
                  <span className="text-muted/50">
                    → {entry.tokensAfter} left
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div
        className="mt-6 p-4 border border-divider bg-surface/30 text-xs text-secondary leading-relaxed"
        style={{ borderRadius: "2px", lineHeight: "1.8" }}
      >
        <strong className="text-platinum">What to observe:</strong> The bucket
        starts full (5 tokens). Hit &quot;Burst 7 Requests&quot; — the first 5
        pass instantly (spending all saved-up tokens), and requests 6 and 7 are
        rejected. Now wait 4 seconds — 2 tokens refill. Click once — it passes.
        This is why APIs like Stripe use token bucket: it rewards well-behaved
        clients who space out requests by letting them burst when needed.
      </div>
    </div>
  );
}
