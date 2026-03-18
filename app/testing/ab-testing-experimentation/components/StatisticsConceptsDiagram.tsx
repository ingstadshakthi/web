"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const SAMPLE_SIZES = [
  { label: "Too Small", n: 100, pValueA: 0.52, pValueB: 0.61, conclusive: false, message: "With only 100 users, the observed +9% difference could easily be random noise. Not enough statistical power. Wait for more data." },
  { label: "Borderline", n: 500, pValueA: 0.52, pValueB: 0.61, conclusive: false, message: "500 users gets us closer, but still underpowered for this effect size. A type I error is still likely. Extend the experiment." },
  { label: "Sufficient", n: 2000, pValueA: 0.52, pValueB: 0.61, conclusive: true, message: "2,000+ users provides enough statistical power (80%) to detect a 9% lift reliably. p=0.021. We can confidently say the result is real." },
];

const PITFALLS = [
  {
    id: "peeking",
    title: "Peeking at Results",
    risk: "High",
    riskColor: "text-rose-400",
    detail: "Checking your experiment mid-run and stopping when you see p<0.05 inflates your false positive rate significantly. A 5% alpha becomes ~30% if you peek 5 times.",
    fix: "Pre-determine sample size via power analysis. Only look at results after reaching it. Use Sequential testing (e.g., SPRT) if you need to check results early, because it is specifically built for that.",
  },
  {
    id: "novelty",
    title: "Novelty Effect",
    risk: "Medium",
    riskColor: "text-amber-400",
    detail: "Users engage more with new things initially. A new blue button might outperform purely because it's unfamiliar, not because it's better. This effect fades over 2-4 weeks.",
    fix: "Run experiments long enough (ideally 2+ weeks) to let the novelty effect subside and expose returning users to both variants.",
  },
  {
    id: "segmentation",
    title: "Simpson&apos;s Paradox",
    risk: "High",
    riskColor: "text-rose-400",
    detail: "Variant B may win overall but lose in every individual user segment (mobile, desktop, logged-in, new). The aggregate can mask important segment-level regressions.",
    fix: "Always perform segment-level breakdowns (by device, user type, geography). If the variant hurts a key segment, reconsider shipping.",
  },
  {
    id: "interaction",
    title: "Experiment Interaction",
    risk: "Medium",
    riskColor: "text-amber-400",
    detail: "Running two experiments that affect the same page can cause interaction effects. Users in both tests may have contaminated results that neither team can explain.",
    fix: "Use mutual exclusion layers (e.g., in GrowthBook, Statsig) to ensure two experiments never affect the same user at the same time.",
  },
];

export default function StatisticsConceptsDiagram() {
  const [selectedSample, setSelectedSample] = useState(2);
  const [expandedPitfall, setExpandedPitfall] = useState<string | null>("peeking");

  const current = SAMPLE_SIZES[selectedSample];

  return (
    <div className="space-y-8">
      {/* ── Sample Size Selector ── */}
      <div className="bg-[#1A1C1E] border border-divider rounded-[2px] p-6 lg:p-8">
        <h3 className="text-base font-heading text-platinum mb-1">Does Sample Size Actually Matter?</h3>
        <p className="text-xs text-muted mb-6">Both groups have CTR 52% vs 61%. Only the number of users changes. Watch what happens to your confidence.</p>

        {/* Toggle */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {SAMPLE_SIZES.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setSelectedSample(i)}
              className={cn(
                "px-3 py-2 text-xs font-mono border rounded-[2px] transition-all duration-300",
                selectedSample === i
                  ? "bg-accent/10 border-accent/40 text-accent"
                  : "border-divider text-muted hover:text-platinum hover:border-divider-hover"
              )}
            >
              n = {s.n.toLocaleString()}
            </button>
          ))}
        </div>

        {/* Bar chart comparison */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {[
            { label: "Control (A)", value: current.pValueA, color: "bg-platinum/30", textColor: "text-platinum" },
            { label: "Variant (B)", value: current.pValueB, color: "bg-accent/60", textColor: "text-accent" },
          ].map((bar) => (
            <div key={bar.label}>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-[10px] font-mono text-muted uppercase tracking-widest">{bar.label}</span>
                <span className={cn("text-lg font-mono font-bold", bar.textColor)}>{Math.round(bar.value * 100)}%</span>
              </div>
              <div className="h-2.5 bg-surface/60 rounded-full overflow-hidden">
                <motion.div
                  key={`${bar.label}-${selectedSample}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${bar.value * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={cn("h-full rounded-full", bar.color)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Confidence intervals visualization */}
        <div className="border border-divider bg-[#15171a] rounded-[2px] p-4">
          <div className="text-[10px] text-muted font-mono uppercase tracking-widest mb-4">Confidence Intervals (95%)</div>
          <div className="space-y-4">
            {[
              { label: "A", mean: 52, margin: selectedSample === 0 ? 14 : selectedSample === 1 ? 6 : 2.8, color: "bg-platinum/50" },
              { label: "B", mean: 61, margin: selectedSample === 0 ? 16 : selectedSample === 1 ? 7 : 3.1, color: "bg-accent/60" },
            ].map((ci) => (
              <div key={ci.label} className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-muted w-4">{ci.label}</span>
                <div className="flex-1 relative h-4 flex items-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-px bg-surface" />
                  </div>
                  <motion.div
                    key={`ci-${ci.label}-${selectedSample}`}
                    initial={{ width: 0, x: `${ci.mean}%` }}
                    animate={{
                      width: `${ci.margin * 2}%`,
                      x: `${ci.mean - ci.margin}%`,
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={cn("absolute h-1.5 rounded-full opacity-70", ci.color)}
                    style={{ left: 0 }}
                  />
                  {/* Mean dot */}
                  <motion.div
                    key={`dot-${ci.label}-${selectedSample}`}
                    initial={{ left: "0%" }}
                    animate={{ left: `${ci.mean}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute w-2.5 h-2.5 rounded-full border-2 bg-[#1A1C1E] border-platinum -translate-x-1/2"
                    style={{ transform: "translateX(-50%)" }}
                  />
                </div>
                <span className="text-[10px] font-mono text-muted w-20 text-right">
                  {ci.mean}% ±{ci.margin.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-[10px] font-mono text-muted">
            0% <span className="float-right">100%</span>
          </div>
        </div>

        {/* Verdict */}
        <motion.div
          key={selectedSample}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={cn(
            "mt-5 flex items-start gap-3 p-4 border rounded-[2px]",
            current.conclusive
              ? "border-emerald-500/30 bg-emerald-500/5"
              : "border-rose-500/20 bg-rose-500/5"
          )}
        >
          <span className="text-lg mt-0.5">{current.conclusive ? "✅" : "⚠️"}</span>
          <div>
            <span className={cn("text-xs font-bold uppercase tracking-widest", current.conclusive ? "text-emerald-400" : "text-rose-400")}>
              {SAMPLE_SIZES[selectedSample].label}: {current.conclusive ? "Statistically Significant" : "Inconclusive"}
            </span>
            <p className="text-xs text-secondary mt-1 leading-relaxed">{current.message}</p>
          </div>
        </motion.div>
      </div>

      {/* ── Common Pitfalls ── */}
      <div className="bg-[#1A1C1E] border border-divider rounded-[2px] p-6 lg:p-8">
        <h3 className="text-base font-heading text-platinum mb-1">Common A/B Testing Pitfalls</h3>
        <p className="text-xs text-muted mb-6">Real-world experiments regularly fail because of these mistakes, not because the math is wrong.</p>

        <div className="space-y-2">
          {PITFALLS.map((pitfall) => (
            <div key={pitfall.id} className="border border-divider rounded-[2px] overflow-hidden">
              <button
                onClick={() => setExpandedPitfall(expandedPitfall === pitfall.id ? null : pitfall.id)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-surface/30"
                style={{ transition: "background 300ms cubic-bezier(0.25,0.1,0.25,1)" }}
              >
                <div className="flex items-center gap-3">
                  <span className={cn("text-[9px] uppercase tracking-widest font-bold border px-2 py-0.5 rounded-[2px]",
                    pitfall.risk === "High" ? "border-rose-500/30 text-rose-400 bg-rose-500/5" : "border-amber-500/30 text-amber-400 bg-amber-500/5"
                  )}>
                    {pitfall.risk}
                  </span>
                  <span className="text-sm font-medium text-platinum">{pitfall.title}</span>
                </div>
                <motion.span
                  animate={{ rotate: expandedPitfall === pitfall.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-muted text-xs"
                >
                  ▼
                </motion.span>
              </button>

              <motion.div
                initial={false}
                animate={{ height: expandedPitfall === pitfall.id ? "auto" : 0, opacity: expandedPitfall === pitfall.id ? 1 : 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 border-t border-divider pt-4 space-y-3">
                  <p className="text-xs text-secondary leading-relaxed">{pitfall.detail}</p>
                  <div className="flex items-start gap-2">
                    <span className="text-accent text-xs mt-0.5 shrink-0">✓</span>
                    <p className="text-xs text-secondary leading-relaxed"><strong className="text-accent">Fix:</strong> {pitfall.fix}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
