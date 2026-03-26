"use client";

import { useState } from "react";
import { motion } from "motion/react";

const METRICS = [
  { label: "Disk usage", value: 68, max: 100, unit: "%", low: 50, high: 80, optimum: 20 },
  { label: "CPU load",   value: 34, max: 100, unit: "%", low: 40, high: 70, optimum: 10 },
  { label: "Battery",    value: 82, max: 100, unit: "%", low: 20, high: 30, optimum: 90 },
  { label: "RAM",        value: 51, max: 100, unit: "%", low: 50, high: 75, optimum: 30 },
];

type LoanFields = {
  amount: number;
  rate: number;
  years: number;
};

function monthlyPayment({ amount, rate, years }: LoanFields): number {
  const r = rate / 100 / 12;
  const n = years * 12;
  if (r === 0) return amount / n;
  return (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export default function InteractiveMeterOutput() {
  const [loan, setLoan] = useState<LoanFields>({ amount: 250000, rate: 4.5, years: 30 });
  const payment = monthlyPayment(loan);
  const totalPaid = payment * loan.years * 12;
  const totalInterest = totalPaid - loan.amount;

  return (
    <div className="w-full space-y-8">
      {/* Meter Section */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-muted/80 mb-4">
          &lt;meter&gt;: Scalar measurement within a known range
        </h4>
        <div className="space-y-4">
          {METRICS.map((m) => {
            const ratio = m.value / m.max;
            const isGood = m.value <= m.low;
            const isBad = m.value >= m.high;
            const color = isGood ? "#4ade80" : isBad ? "#f87171" : "#fbbf24";
            return (
              <div key={m.label} className="flex items-center gap-4">
                <span className="text-xs text-secondary/80 w-28 shrink-0">{m.label}</span>
                <div className="flex-1 relative h-2 bg-white/6 overflow-hidden" style={{ borderRadius: "1px" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${ratio * 100}%` }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute inset-y-0 left-0"
                    style={{ background: color, opacity: 0.8 }}
                  />
                </div>
                <span className="text-xs font-mono text-platinum/70 w-12 text-right">
                  {m.value}{m.unit}
                </span>
              </div>
            );
          })}
        </div>
        <pre className="mt-4 p-3 bg-black/40 border border-divider text-[10px] font-mono text-accent/70 overflow-x-auto" style={{ borderRadius: "2px" }}>
          <code>{`<meter value="68" min="0" max="100" low="50" high="80" optimum="20">
  68%
</meter>`}</code>
        </pre>
      </div>

      <div className="border-t border-divider" />

      {/* Output Section - Loan Calculator */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-muted/80 mb-4">
          &lt;output&gt;: Loan calculator using &lt;input&gt; + &lt;output&gt;
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-muted/70 mb-2">
              Principal ($)
            </label>
            <input
              type="range" min="50000" max="1000000" step="10000"
              value={loan.amount}
              onChange={(e) => setLoan((l) => ({ ...l, amount: +e.target.value }))}
              className="w-full accent-accent"
            />
            <output className="block text-sm font-mono text-platinum mt-1">
              ${loan.amount.toLocaleString()}
            </output>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-muted/70 mb-2">
              Interest Rate (%)
            </label>
            <input
              type="range" min="1" max="12" step="0.1"
              value={loan.rate}
              onChange={(e) => setLoan((l) => ({ ...l, rate: +e.target.value }))}
              className="w-full accent-accent"
            />
            <output className="block text-sm font-mono text-platinum mt-1">
              {loan.rate.toFixed(1)}%
            </output>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-muted/70 mb-2">
              Term (years)
            </label>
            <input
              type="range" min="5" max="30" step="5"
              value={loan.years}
              onChange={(e) => setLoan((l) => ({ ...l, years: +e.target.value }))}
              className="w-full accent-accent"
            />
            <output className="block text-sm font-mono text-platinum mt-1">
              {loan.years} yrs
            </output>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Monthly Payment", value: `$${payment.toFixed(2)}`, highlight: true },
            { label: "Total Paid", value: `$${(totalPaid / 1000).toFixed(1)}k` },
            { label: "Total Interest", value: `$${(totalInterest / 1000).toFixed(1)}k` },
          ].map(({ label, value, highlight }) => (
            <div
              key={label}
              className={`p-4 border ${highlight ? "border-accent/30 bg-accent/5" : "border-divider bg-surface/20"}`}
              style={{ borderRadius: "2px" }}
            >
              <p className="text-[10px] uppercase tracking-widest text-muted/60 mb-1">{label}</p>
              <motion.output
                key={value}
                initial={{ scale: 0.95, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={`block text-lg font-bold font-mono ${highlight ? "text-accent" : "text-platinum"}`}
              >
                {value}
              </motion.output>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
