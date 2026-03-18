"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

// A real example from a product team: Spotify changing their "Follow Artist" button placement
const EXPERIMENT_STEPS = [
  {
    id: 0,
    phase: "The Idea",
    label: "Hypothesis",
    emoji: "💡",
    description:
      "Your product team notices that fewer users are following artists after listening to a song. Someone has a hunch: maybe moving the Follow button from the artist page to directly below the now-playing bar would make it easier to tap in the moment of discovery.",
    realWorldNote:
      "This is a hypothesis: 'If we move the Follow button to the now-playing screen, more users will follow artists because the intent is highest right when they're listening.' Write this down before you start. Don't change it after.",
  },
  {
    id: 1,
    phase: "The Setup",
    label: "Traffic Split",
    emoji: "🔀",
    description:
      "You configure the experiment: 50% of your users (Group A, the Control) keep seeing the old experience. The other 50% (Group B, the Variant) see the new now-playing Follow button. The split is random but consistent. The same user always sees the same version.",
    realWorldNote:
      "\"Random but consistent\" is key. If a user sees the old design on Monday and the new one on Wednesday, your data becomes useless. Platforms achieve this by hashing the user ID so the same user always lands in the same bucket.",
  },
  {
    id: 2,
    phase: "Running",
    label: "Collecting Data",
    emoji: "📊",
    description:
      "The experiment runs for 2 full weeks. Both groups listen to music normally. Every time someone taps Follow, both groups' counts are recorded. At the end: Control had a 4.2% follow rate. Variant had a 5.8% follow rate. That's a +38% relative lift. Seemingly huge.",
    realWorldNote:
      "Two weeks is the minimum for most experiments. The first week often shows inflated results because new things grab attention (the \"novelty effect\"). You need returning users, not just first-timers, to see if the change actually helps.",
  },
  {
    id: 3,
    phase: "Analyzing",
    label: "Did It Work, Really?",
    emoji: "🔬",
    description:
      "Here's where teams make their biggest mistake: they see +38% and ship it immediately. But you need to ask: could this difference have happened by random chance? With 800 total users in this test, the answer is yes. The p-value is 0.18, which means there's an 18% chance the improvement is just luck. Not good enough.",
    realWorldNote:
      "The industry standard is p < 0.05 (less than 5% chance the result is random). A p-value of 0.18 means we can't be sure. You need more users. Run a sample size calculator before you start. It tells you exactly how many users you need to be confident.",
  },
  {
    id: 4,
    phase: "Scaling Up",
    label: "More Data",
    emoji: "⏳",
    description:
      "You extend the experiment. After 30 days and 8,000 users, the follow rate is 4.1% vs 5.9%. Still about +44% lift. This time the p-value is 0.002. That means there's only a 0.2% chance this is random. The confidence interval is 5.2% to 6.7% for the variant. The result is real.",
    realWorldNote:
      "Notice how extending the experiment slightly changed the numbers (4.2% → 4.1%, 5.8% → 5.9%). This is normal. Early data is noisy. With enough users, the results stabilize and become trustworthy.",
  },
  {
    id: 5,
    phase: "The Decision",
    label: "Ship It",
    emoji: "🚀",
    description:
      "The variant wins. You ship the new now-playing Follow button to 100% of users. Artist follow rates go up by ~40%, which translates directly into users building better music libraries and spending more time on the platform. One small UI change. Measured. Shipped with confidence.",
    realWorldNote:
      "But what if the variant had lost? That's also a win. You learned that moving the button didn't help, so you don't add complexity that doesn't benefit users. Failed experiments are not failures. They're answers.",
  },
];

export default function ABTestFlowDiagram() {
  const [step, setStep] = useState(0);

  const currentStepData = EXPERIMENT_STEPS[step];
  const isFirst = step === 0;
  const isLast = step === EXPERIMENT_STEPS.length - 1;

  return (
    <div className="bg-[#1A1C1E] border border-divider rounded-[2px] overflow-hidden">
      {/* ── Visual — Control vs Variant side-by-side ── */}
      <div className="grid grid-cols-2 divide-x divide-divider border-b border-divider bg-[#15171a]">
        {/* Control Side — Old experience */}
        <div className="p-5 flex flex-col items-center gap-3 text-center">
          <span className="text-[9px] font-mono uppercase tracking-widest text-muted">Group A (Control)</span>
          {/* Now playing card mock */}
          <div className="w-full max-w-[130px] bg-[#1A1C1E] border border-divider rounded-[2px] p-3 space-y-2">
            <div className="w-full h-12 bg-surface/40 rounded-[2px] flex items-center justify-center">
              <span className="text-[9px] text-muted">🎵 Now Playing</span>
            </div>
            <div className="h-1 bg-surface rounded-full w-full" />
            <div className="flex justify-between items-center mt-1">
              <span className="text-[9px] text-muted">◀ ⏸ ▶</span>
            </div>
          </div>
          <span className="text-[10px] text-muted mt-1">Follow button on artist page only</span>
          {step >= 2 && (
            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-1">
              <span className="font-mono text-sm font-bold text-platinum">4.1%</span>
              <span className="text-[9px] text-muted ml-1">follow rate</span>
            </motion.div>
          )}
        </div>

        {/* Variant Side — New experience */}
        <div className={cn("p-5 flex flex-col items-center gap-3 text-center", step >= 1 ? "bg-accent/5" : "")}>
          <span className={cn("text-[9px] font-mono uppercase tracking-widest", step >= 1 ? "text-accent" : "text-muted")}>
            Group B (Variant)
          </span>
          {/* Now playing card mock with Follow button */}
          <div className="w-full max-w-[130px] bg-[#1A1C1E] border border-divider rounded-[2px] p-3 space-y-2">
            <div className="w-full h-12 bg-surface/40 rounded-[2px] flex items-center justify-center">
              <span className="text-[9px] text-muted">🎵 Now Playing</span>
            </div>
            <div className="h-1 bg-surface rounded-full w-full" />
            <div className="flex justify-between items-center mt-1">
              <span className="text-[9px] text-muted">◀ ⏸ ▶</span>
              <motion.div
                animate={step >= 1 ? { scale: [1, 1.1, 1], borderColor: ["rgba(176,196,222,0.1)", "rgba(176,196,222,0.5)", "rgba(176,196,222,0.1)"] } : {}}
                transition={{ duration: 2, repeat: step === 1 ? Infinity : 0 }}
                className="border border-accent/40 px-1.5 py-0.5 rounded-[2px]"
              >
                <span className="text-[8px] text-accent font-bold">+ Follow</span>
              </motion.div>
            </div>
          </div>
          <span className="text-[10px] text-muted mt-1">Follow button on now-playing screen</span>
          {step >= 2 && (
            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-1">
              <span className="font-mono text-sm font-bold text-accent">5.9%</span>
              <span className="text-[9px] text-muted ml-1">follow rate</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Statistical significance row (shown at step 4+) ── */}
      {step >= 4 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.4 }}
          className="border-b border-divider px-5 py-4 flex flex-wrap gap-6 bg-[#15171a]"
        >
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted font-mono uppercase tracking-widest">p-value</span>
            <span className="font-mono text-base font-bold text-accent">0.002</span>
            <span className="text-[9px] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-1.5 py-0.5 rounded-[2px]">
              p &lt; 0.05 ✓
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted font-mono uppercase tracking-widest">Lift</span>
            <span className="font-mono text-base font-bold text-emerald-400">+44%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted font-mono uppercase tracking-widest">Users tested</span>
            <span className="font-mono text-sm font-bold text-platinum">8,000</span>
          </div>
        </motion.div>
      )}

      {/* ── Winner banner ── */}
      {step === 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="border-b border-divider px-5 py-4 bg-emerald-500/5 flex items-center gap-3"
        >
          <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <p className="text-xs text-secondary">
            <strong className="text-emerald-400">Variant B shipped!</strong> The now-playing Follow button went to 100% of users. Artist follows increased by ~40%. One carefully tested UI change, shipped with full confidence.
          </p>
        </motion.div>
      )}

      {/* ── Step progress bar ── */}
      <div className="p-6">
        {/* Progress track */}
        <div className="grid gap-1.5 mb-5" style={{ gridTemplateColumns: `repeat(${EXPERIMENT_STEPS.length}, 1fr)` }}>
          {EXPERIMENT_STEPS.map((s, i) => (
            <button key={s.id} onClick={() => setStep(i)} className="flex flex-col gap-1 group text-left">
              <div className="h-0.5 w-full bg-surface/50 overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-accent origin-left"
                  initial={false}
                  animate={{ scaleX: step > i ? 1 : step === i ? 0.6 : 0 }}
                  transition={{ duration: 0.35 }}
                />
              </div>
              <span className={cn("text-[8px] font-mono hidden md:block leading-tight transition-colors",
                step === i ? "text-platinum font-bold" : "text-muted group-hover:text-secondary"
              )}>
                {s.label}
              </span>
            </button>
          ))}
        </div>

        {/* Content card */}
        <div className="border border-divider rounded-[2px] overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3 border-b border-divider bg-surface/30">
            <span className="text-lg">{currentStepData.emoji}</span>
            <div>
              <div className="text-[9px] text-muted uppercase tracking-widest font-mono">Phase {step + 1} of {EXPERIMENT_STEPS.length}</div>
              <div className="text-sm font-semibold text-platinum">{currentStepData.phase}: {currentStepData.label}</div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="p-5 space-y-4"
            >
              <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
                {currentStepData.description}
              </p>
              <div className="flex items-start gap-2 p-3 bg-accent/5 border border-accent/15 rounded-[2px]">
                <span className="text-accent text-xs mt-0.5 shrink-0">★</span>
                <p className="text-xs text-secondary leading-relaxed" style={{ lineHeight: "1.7" }}>
                  <strong className="text-accent">The real lesson:</strong> {currentStepData.realWorldNote}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={isFirst}
            className="px-4 py-2 text-xs font-medium border border-divider text-muted hover:text-platinum hover:border-divider-hover disabled:opacity-30 disabled:cursor-not-allowed rounded-[2px]"
            style={{ transition: "all 300ms cubic-bezier(0.25,0.1,0.25,1)" }}
          >
            ← Back
          </button>
          <span className="text-[10px] text-muted font-mono">{step + 1} / {EXPERIMENT_STEPS.length}</span>
          <button
            onClick={() => setStep((s) => Math.min(EXPERIMENT_STEPS.length - 1, s + 1))}
            disabled={isLast}
            className="px-4 py-2 text-xs font-medium bg-platinum text-[#1A1C1E] disabled:opacity-40 disabled:cursor-not-allowed rounded-[2px]"
            style={{ transition: "all 300ms cubic-bezier(0.25,0.1,0.25,1)" }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
