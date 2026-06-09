"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

/*
  SLIDING WINDOW LOG — Accurate simulation
  
  Store the timestamp of every request. When a new request comes in:
  1. Remove all timestamps older than (now - windowDuration)
  2. If remaining count < limit, allow and add new timestamp
  3. Otherwise reject
  
  Key behavior:
  - PERFECT accuracy — no boundary exploits possible
  - High memory cost: stores up to `limit` timestamps per user
  - Timestamps expire continuously in real time (not at boundaries)
  - The "memory cost" is the core tradeoff to understand
*/

interface TimestampEntry {
  id: number;
  createdAt: number; // actual ms timestamp
  relativeTime: string; // human-readable
}

export default function SlidingWindowLogDiagram() {
  const LIMIT = 5;
  const WINDOW_MS = 10000; // 10 second window

  const timestampsRef = useRef<{ id: number; createdAt: number }[]>([]);
  const [displayTimestamps, setDisplayTimestamps] = useState<TimestampEntry[]>(
    [],
  );
  const [accepted, setAccepted] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [lastResponse, setLastResponse] = useState<"ok" | "limited" | null>(
    null,
  );
  const [now, setNow] = useState(Date.now());
  const startTime = useRef(Date.now());
  const idRef = useRef(0);
  const tickRef = useRef<NodeJS.Timeout | null>(null);

  // Real-time tick to update "time ago" and expire old timestamps visually
  useEffect(() => {
    tickRef.current = setInterval(() => {
      setNow(Date.now());
    }, 200);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, []);

  const getRelative = useCallback((ts: number) => {
    const ago = ((Date.now() - ts) / 1000).toFixed(1);
    return `${ago}s ago`;
  }, []);

  const getAbsolute = useCallback((ts: number) => {
    const rel = ((ts - startTime.current) / 1000).toFixed(1);
    return `t=${rel}s`;
  }, []);

  const cleanExpired = useCallback(() => {
    const cutoff = Date.now() - WINDOW_MS;
    timestampsRef.current = timestampsRef.current.filter(
      (t) => t.createdAt > cutoff,
    );
  }, []);

  const handleRequest = useCallback(() => {
    cleanExpired();
    const currentCount = timestampsRef.current.length;

    if (currentCount < LIMIT) {
      const entry = { id: ++idRef.current, createdAt: Date.now() };
      timestampsRef.current.push(entry);
      setAccepted((a) => a + 1);
      setLastResponse("ok");
    } else {
      setRejected((r) => r + 1);
      setLastResponse("limited");
    }

    // Sync display
    setDisplayTimestamps(
      timestampsRef.current.map((t) => ({
        id: t.id,
        createdAt: t.createdAt,
        relativeTime: getAbsolute(t.createdAt),
      })),
    );
  }, [cleanExpired, getAbsolute]);

  const handleBurst = useCallback(() => {
    for (let i = 0; i < 7; i++) {
      handleRequest();
    }
  }, [handleRequest]);

  const handleReset = useCallback(() => {
    timestampsRef.current = [];
    setDisplayTimestamps([]);
    setAccepted(0);
    setRejected(0);
    setLastResponse(null);
    startTime.current = Date.now();
    idRef.current = 0;
  }, []);

  // Calculate which timestamps are still valid right now
  const validCount = timestampsRef.current.filter(
    (t) => t.createdAt > now - WINDOW_MS,
  ).length;

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
          Reset
        </button>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-muted font-mono">
            Window:
          </span>
          <span className="text-xs font-mono text-platinum">
            10 seconds (sliding)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-muted font-mono">
            Active:
          </span>
          <span
            className={cn(
              "text-xs font-mono font-bold",
              validCount >= LIMIT ? "text-red-400" : "text-accent",
            )}
          >
            {validCount} / {LIMIT}
          </span>
        </div>
        {lastResponse && (
          <span
            className={cn(
              "text-[10px] font-mono px-2 py-0.5",
              lastResponse === "ok"
                ? "text-emerald-400 bg-emerald-400/10"
                : "text-red-400 bg-red-400/10",
            )}
            style={{ borderRadius: "1px" }}
          >
            {lastResponse === "ok" ? "200 OK" : "429 — all 5 slots in use"}
          </span>
        )}
      </div>

      {/* Timestamp cards */}
      <div className="mb-6">
        <span className="text-[10px] uppercase tracking-widest text-muted font-mono mb-3 block">
          Stored Timestamps (each expires individually after 10s)
        </span>
        <div
          className="min-h-[100px] border border-divider bg-[#15171a] p-4"
          style={{ borderRadius: "2px" }}
        >
          {displayTimestamps.length === 0 ? (
            <p className="text-[10px] text-muted/40 font-mono text-center py-6">
              No timestamps stored. Send a request to begin.
            </p>
          ) : (
            <div className="flex flex-wrap gap-3">
              <AnimatePresence>
                {displayTimestamps.map((entry) => {
                  const age = (now - entry.createdAt) / 1000;
                  const remaining = Math.max(0, 10 - age);
                  const isExpiring = remaining < 3;
                  const isExpired = remaining <= 0;

                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: isExpired ? 0.25 : 1,
                        scale: isExpired ? 0.9 : 1,
                      }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "relative px-3 py-2 border flex flex-col items-center gap-1 min-w-[80px]",
                        isExpired
                          ? "border-divider/50 bg-surface/10"
                          : isExpiring
                            ? "border-amber-500/40 bg-amber-500/5"
                            : "border-accent/30 bg-accent/5",
                      )}
                      style={{ borderRadius: "2px" }}
                    >
                      <span
                        className={cn(
                          "text-[10px] font-mono font-bold",
                          isExpired
                            ? "text-muted/40"
                            : isExpiring
                              ? "text-amber-400"
                              : "text-accent",
                        )}
                      >
                        {entry.relativeTime}
                      </span>
                      <span
                        className={cn(
                          "text-[9px] font-mono",
                          isExpired ? "text-muted/30" : "text-muted",
                        )}
                      >
                        {isExpired
                          ? "expired"
                          : `${remaining.toFixed(1)}s left`}
                      </span>
                      {/* Expiry progress bar */}
                      {!isExpired && (
                        <div
                          className="w-full h-0.5 bg-surface/50 mt-1 overflow-hidden"
                          style={{ borderRadius: "1px" }}
                        >
                          <div
                            className={cn(
                              "h-full transition-all duration-200",
                              isExpiring ? "bg-amber-400/60" : "bg-accent/40",
                            )}
                            style={{ width: `${(remaining / 10) * 100}%` }}
                          />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Memory usage indicator */}
      <div
        className="p-4 border border-divider bg-surface/20 mb-6"
        style={{ borderRadius: "2px" }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-widest text-muted font-mono">
            Memory per User
          </span>
          <span className="text-xs font-mono text-amber-400">
            {displayTimestamps.length} × 8 bytes ={" "}
            {displayTimestamps.length * 8} bytes
          </span>
        </div>
        <div className="text-[10px] font-mono text-muted leading-relaxed">
          At scale: 1M users × {LIMIT} timestamps × 8 bytes ={" "}
          <span className="text-amber-400">
            ~{((1000000 * LIMIT * 8) / 1024 / 1024).toFixed(0)} MB
          </span>{" "}
          just for rate limiter state. This is the tradeoff for perfect
          accuracy.
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
        <strong className="text-platinum">What to observe:</strong> Send 5
        requests and watch the timestamp cards. Each shows a live countdown.
        They expire one by one (not all at once like fixed window). After the
        first one expires (~10s later), you can send another request. There is
        no &quot;reset boundary&quot; to exploit. Try the burst — 5 succeed, 2
        fail, and you must wait for individual expiries.
      </div>
    </div>
  );
}
