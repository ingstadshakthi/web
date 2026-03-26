"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingItem {
  id: string;
  level: HeadingLevel;
  text: string;
}

const PRESET_GOOD: HeadingItem[] = [
  { id: "h1", level: 1, text: "Semantic HTML Guide" },
  { id: "h2a", level: 2, text: "Document Structure" },
  { id: "h3a", level: 3, text: "The Head Element" },
  { id: "h3b", level: 3, text: "The Body Element" },
  { id: "h2b", level: 2, text: "Sectioning Elements" },
  { id: "h3c", level: 3, text: "Header and Footer" },
  { id: "h3d", level: 3, text: "Navigation Patterns" },
];

const PRESET_BAD: HeadingItem[] = [
  { id: "h3x", level: 3, text: "Big Title Here" },
  { id: "h1x", level: 1, text: "Subheading (actually huge)" },
  { id: "h4y", level: 4, text: "Another Section" },
  { id: "h2y", level: 2, text: "Back to H2?" },
  { id: "h6z", level: 6, text: "Jump to H6" },
];

function isOutlineValid(headings: HeadingItem[]): { valid: boolean; issues: string[] } {
  const issues: string[] = [];
  const h1s = headings.filter((h) => h.level === 1);
  if (h1s.length === 0) issues.push("No <h1> found. Every page needs exactly one.");
  if (h1s.length > 1) issues.push(`Found ${h1s.length} <h1> elements. Use only one.`);

  for (let i = 1; i < headings.length; i++) {
    const prev = headings[i - 1];
    const curr = headings[i];
    if (curr.level > prev.level + 1) {
      issues.push(`Heading level skipped: <h${prev.level}> to <h${curr.level}> (skipped h${prev.level + 1})`);
    }
  }
  return { valid: issues.length === 0, issues };
}

const LEVEL_COLORS: Record<HeadingLevel, string> = {
  1: "text-platinum",
  2: "text-accent",
  3: "text-secondary",
  4: "text-muted",
  5: "text-muted/70",
  6: "text-muted/50",
};

const LEVEL_SIZE: Record<HeadingLevel, string> = {
  1: "text-base font-bold",
  2: "text-sm font-semibold",
  3: "text-xs font-medium",
  4: "text-xs",
  5: "text-[11px]",
  6: "text-[11px]",
};

export default function DocumentOutlineVisualizer() {
  const [headings, setHeadings] = useState<HeadingItem[]>(PRESET_GOOD);
  const [mode, setMode] = useState<"good" | "bad">("good");

  const switchMode = useCallback((m: "good" | "bad") => {
    setMode(m);
    setHeadings(m === "good" ? PRESET_GOOD : PRESET_BAD);
  }, []);

  const validation = isOutlineValid(headings);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4">
      {/* Controls */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex bg-black/40 p-0.5 border border-divider",
            )}
            style={{ borderRadius: "1px" }}
          >
            <button
              onClick={() => switchMode("good")}
              className={cn(
                "px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all",
                mode === "good" ? "bg-green-500/80 text-black" : "text-muted hover:text-platinum"
              )}
            >
              Good Structure
            </button>
            <button
              onClick={() => switchMode("bad")}
              className={cn(
                "px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all",
                mode === "bad" ? "bg-red-500/60 text-white" : "text-muted hover:text-platinum"
              )}
            >
              Bad Structure
            </button>
          </div>
        </div>

        {/* Heading code view */}
        <div className="border border-divider bg-black/30" style={{ borderRadius: "2px" }}>
          <div className="px-4 py-2 border-b border-divider bg-surface/30">
            <span className="text-[10px] font-mono text-muted">Source order</span>
          </div>
          <div className="p-4 space-y-1.5">
            {headings.map((h) => {
              const isSkip =
                headings.findIndex((x) => x.id === h.id) > 0 &&
                h.level >
                  headings[headings.findIndex((x) => x.id === h.id) - 1].level + 1;
              return (
                <div
                  key={h.id}
                  className={cn(
                    "flex items-center gap-2 py-1 px-2 transition-colors",
                    isSkip ? "bg-red-500/10" : "hover:bg-white/4"
                  )}
                  style={{ borderRadius: "2px" }}
                >
                  <code
                    className={cn(
                      "text-[10px] font-bold font-mono w-8 shrink-0",
                      isSkip ? "text-red-400" : "text-accent/60"
                    )}
                  >
                    &lt;h{h.level}&gt;
                  </code>
                  <span className="text-xs text-secondary/80">{h.text}</span>
                  {isSkip && (
                    <span className="ml-auto text-[9px] text-red-400 font-bold uppercase tracking-widest shrink-0">
                      skip!
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Visual Outline */}
      <div className="flex-1 space-y-4">
        <div className="border border-divider bg-black/20 overflow-hidden" style={{ borderRadius: "2px" }}>
          <div className="px-4 py-2 border-b border-divider bg-surface/30 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted/80">
              Document Outline
            </span>
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                validation.valid ? "bg-green-400" : "bg-red-400"
              )}
            />
          </div>
          <div className="p-4 space-y-1">
            {headings.map((h, i) => {
              const prevLevel = i > 0 ? headings[i - 1].level : 1;
              const isSkip = i > 0 && h.level > prevLevel + 1;
              return (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={cn(
                    "flex items-center gap-2 py-0.5",
                    isSkip && "border-l-2 border-red-500/50"
                  )}
                  style={{ paddingLeft: `${(h.level - 1) * 16}px` }}
                >
                  <span className={cn("shrink-0 text-[9px] font-mono text-muted/40")}>
                    H{h.level}
                  </span>
                  <span
                    className={cn(LEVEL_SIZE[h.level], LEVEL_COLORS[h.level])}
                  >
                    {h.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Validation */}
        <AnimatePresence>
          {validation.issues.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border border-red-500/30 bg-red-500/5 p-4 space-y-2 overflow-hidden"
              style={{ borderRadius: "2px" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-red-400">
                Outline Issues
              </p>
              {validation.issues.map((issue, i) => (
                <p key={i} className="text-[11px] text-red-300/80">
                  {issue}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {validation.valid && (
          <div
            className="border border-green-500/30 bg-green-500/5 p-4"
            style={{ borderRadius: "2px" }}
          >
            <p className="text-[11px] text-green-300/80">
              Heading structure is valid. Screen reader users can navigate this page using the H key shortcut.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
