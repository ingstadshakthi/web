"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

/*
  LEAKY BUCKET — Accurate simulation
  
  The queue has a fixed capacity. Incoming requests are added to the queue.
  The queue drains at a fixed rate (one item removed at a constant interval).
  If the queue is full when a new request arrives, the request is immediately rejected.
  
  Key behavior:
  - Output rate is ALWAYS constant regardless of input rate
  - No burst tolerance — even if queue was empty, output is still one-at-a-time
  - Overflow = instant rejection
*/

interface LogEntry {
  id: number;
  action: "queued" | "dropped" | "drained";
}

export default function LeakyBucketDiagram() {
  const CAPACITY = 6;
  const DRAIN_MS = 1200;

  const queueRef = useRef(0);
  const [queue, setQueue] = useState(0);
  const [totalProcessed, setTotalProcessed] = useState(0);
  const [totalDropped, setTotalDropped] = useState(0);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [drainPulse, setDrainPulse] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const logId = useRef(0);

  const syncQueue = useCallback((val: number) => {
    queueRef.current = val;
    setQueue(val);
  }, []);

  const addLog = useCallback((action: LogEntry["action"]) => {
    setLog((prev) => [{ id: ++logId.current, action }, ...prev].slice(0, 15));
  }, []);

  const startDrain = useCallback(() => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      if (queueRef.current > 0) {
        const next = queueRef.current - 1;
        queueRef.current = next;
        setQueue(next);
        setTotalProcessed((p) => p + 1);
        setDrainPulse(true);
        addLog("drained");
        setTimeout(() => setDrainPulse(false), 250);
      } else {
        clearInterval(timerRef.current!);
        timerRef.current = null;
      }
    }, DRAIN_MS);
  }, [addLog]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleRequest = useCallback(() => {
    if (queueRef.current < CAPACITY) {
      syncQueue(queueRef.current + 1);
      addLog("queued");
      startDrain();
    } else {
      setTotalDropped((d) => d + 1);
      addLog("dropped");
    }
  }, [syncQueue, addLog, startDrain]);

  const handleBurst = useCallback(() => {
    for (let i = 0; i < 9; i++) {
      handleRequest();
    }
  }, [handleRequest]);

  const handleReset = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    syncQueue(0);
    setTotalProcessed(0);
    setTotalDropped(0);
    setLog([]);
    logId.current = 0;
  }, [syncQueue]);

  const fillPercent = (queue / CAPACITY) * 100;

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
          + Add Request
        </button>
        <button
          onClick={handleBurst}
          className="px-4 py-2 text-xs font-medium bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-colors"
          style={{ borderRadius: "2px" }}
        >
          Burst 9 at Once
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 text-xs font-medium bg-surface border border-divider text-secondary hover:text-platinum transition-colors"
          style={{ borderRadius: "2px" }}
        >
          Reset
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Bucket visualization */}
        <div className="flex-1 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] uppercase tracking-widest text-muted font-mono">
              Bucket
            </span>
            <span
              className={cn(
                "text-xs font-mono",
                queue >= CAPACITY ? "text-red-400" : "text-platinum",
              )}
            >
              {queue}/{CAPACITY}
            </span>
            {queue >= CAPACITY && (
              <span
                className="text-[9px] font-mono text-red-400 bg-red-400/10 px-1.5 py-0.5"
                style={{ borderRadius: "1px" }}
              >
                OVERFLOW
              </span>
            )}
          </div>

          {/* Bucket body */}
          <div
            className="relative w-44 h-52 border-2 border-divider border-t-0 bg-[#12141680] overflow-hidden"
            style={{
              borderRadius: "0 0 4px 4px",
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
          >
            {/* Water fill */}
            <motion.div
              className={cn(
                "absolute bottom-0 left-0 right-0",
                queue >= CAPACITY ? "bg-red-500/15" : "bg-accent/12",
              )}
              animate={{ height: `${fillPercent}%` }}
              transition={{
                type: "tween",
                duration: 0.35,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            />
            {/* Capacity lines */}
            {Array.from({ length: CAPACITY }).map((_, i) => (
              <div
                key={i}
                className="absolute left-2 right-2 border-b border-dashed border-white/[0.04]"
                style={{ bottom: `${((i + 1) / CAPACITY) * 100}%` }}
              >
                <span className="absolute right-0 -top-2 text-[7px] font-mono text-muted/30">
                  {i + 1}
                </span>
              </div>
            ))}
            {/* Request items */}
            <div className="absolute inset-0 flex flex-col-reverse items-center justify-start p-2 gap-1">
              <AnimatePresence>
                {Array.from({ length: queue }).map((_, i) => (
                  <motion.div
                    key={`r-${i}`}
                    initial={{ opacity: 0, y: -15, scale: 0.7 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.7 }}
                    transition={{ duration: 0.25 }}
                    className="w-[85%] h-5 border border-accent/25 bg-accent/10 flex items-center justify-center"
                    style={{ borderRadius: "1px" }}
                  >
                    <span className="text-[8px] font-mono text-accent/60">
                      req
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Drain indicator */}
          <div className="flex flex-col items-center mt-1">
            <div
              className={cn(
                "w-6 h-4 border-x border-b border-divider flex items-center justify-center transition-colors duration-200",
                drainPulse ? "bg-emerald-500/20" : "bg-[#15171a]",
              )}
            >
              <motion.div
                animate={{
                  scale: drainPulse ? 1.5 : 1,
                  backgroundColor: drainPulse
                    ? "rgb(52,211,153)"
                    : "rgb(107,114,128)",
                }}
                className="w-1.5 h-1.5"
                style={{ borderRadius: "50%" }}
              />
            </div>
            <span className="text-[9px] font-mono text-muted mt-1.5">
              ↓ 1 req / 1.2s (constant)
            </span>
          </div>
        </div>

        {/* Log panel */}
        <div className="w-full lg:w-72">
          <span className="text-[10px] uppercase tracking-widest text-muted font-mono mb-2 block">
            Event Log
          </span>
          <div
            className="h-64 border border-divider bg-[#15171a] overflow-y-auto p-3 space-y-1"
            style={{ borderRadius: "2px" }}
          >
            {log.length === 0 && (
              <p className="text-[10px] text-muted/40 font-mono">
                No events yet.
              </p>
            )}
            <AnimatePresence initial={false}>
              {log.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex items-center gap-2 text-[10px] font-mono py-0.5"
                >
                  <span className="text-muted/60 w-5 text-right">
                    #{entry.id}
                  </span>
                  <span
                    className={cn(
                      "px-1.5 py-0.5",
                      entry.action === "queued" && "text-accent bg-accent/10",
                      entry.action === "dropped" &&
                        "text-red-400 bg-red-400/10",
                      entry.action === "drained" &&
                        "text-emerald-400 bg-emerald-400/10",
                    )}
                    style={{ borderRadius: "1px" }}
                  >
                    {entry.action === "queued" && "QUEUED"}
                    {entry.action === "dropped" && "DROPPED"}
                    {entry.action === "drained" && "PROCESSED ↓"}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div
          className="p-3 border border-divider bg-surface/20 text-center"
          style={{ borderRadius: "2px" }}
        >
          <div className="text-lg font-mono text-accent">{queue}</div>
          <div className="text-[9px] uppercase tracking-widest text-muted mt-1">
            In Queue
          </div>
        </div>
        <div
          className="p-3 border border-divider bg-surface/20 text-center"
          style={{ borderRadius: "2px" }}
        >
          <div className="text-lg font-mono text-emerald-400">
            {totalProcessed}
          </div>
          <div className="text-[9px] uppercase tracking-widest text-muted mt-1">
            Processed
          </div>
        </div>
        <div
          className="p-3 border border-divider bg-surface/20 text-center"
          style={{ borderRadius: "2px" }}
        >
          <div className="text-lg font-mono text-red-400">{totalDropped}</div>
          <div className="text-[9px] uppercase tracking-widest text-muted mt-1">
            Dropped
          </div>
        </div>
      </div>

      {/* Insight */}
      <div
        className="mt-6 p-4 border border-divider bg-surface/30 text-xs text-secondary leading-relaxed"
        style={{ borderRadius: "2px", lineHeight: "1.8" }}
      >
        <strong className="text-platinum">What to observe:</strong> Hit
        &quot;Burst 9 at Once.&quot; The bucket only holds 6 — so 6 are queued
        and 3 are dropped immediately. Then watch the drain: exactly 1 request
        leaves every 1.2 seconds. The output never speeds up, no matter how fast
        the input was. That&apos;s the core guarantee of leaky bucket.
      </div>
    </div>
  );
}
