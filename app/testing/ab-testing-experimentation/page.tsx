"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import ABTestFlowDiagram from "./components/ABTestFlowDiagram";
import StatisticsConceptsDiagram from "./components/StatisticsConceptsDiagram";
import Link from "next/link";

/* ── Scroll reveal variant ── */
const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/* ── Real world examples of what gets A/B tested ── */
const REAL_EXAMPLES = [
  {
    company: "Booking.com",
    change: "Added urgency text: \"Only 3 rooms left!\" on hotel listings",
    result: "+18% conversion rate. So impactful they now run 1,000+ concurrent experiments.",
    emoji: "🏨",
  },
  {
    company: "Obama Campaign (2008)",
    change: "Tested different images and button text on the email sign-up form",
    result: "The winning variant raised $60M more in donations than the original",
    emoji: "🗳️",
  },
  {
    company: "Netflix",
    change: "Tested many different thumbnail images for the same show",
    result: "The right thumbnail for each user type increased play rates by 20–30%",
    emoji: "🎬",
  },
  {
    company: "LinkedIn",
    change: "Added a \"People Also Viewed\" sidebar to profile pages",
    result: "Massive jump in profile page visits, which led to a key product pattern.",
    emoji: "💼",
  },
];

/* ── Common mistakes frontend devs make ── */
const MISTAKES = [
  {
    id: "stopping-early",
    mistake: "Stopping the test as soon as you see a positive result",
    whyBad: "Imagine flipping a coin and seeing Heads 7 times out of 10. Does that mean the coin always lands Heads? No. It's just random variance. Experiments early in their run look more extreme than reality. If you stop early when things look good, you'll celebrate a lot of false wins.",
    fix: "Decide how long the test should run before you start. Many teams use a sample size calculator to figure out exactly how many users they need, then stick to that number no matter what the early results look like.",
    icon: "⏰",
  },
  {
    id: "multiple-metrics",
    mistake: "Optimizing for one metric while silently breaking another",
    whyBad: "You test a more prominent promotional banner and it increases clicks by 15%. Shipped! But buried in the data: users who clicked the banner were 2x more likely to immediately leave after landing on the product page. Your revenue actually dropped.",
    fix: "Define both your primary metric (what you're trying to improve) and your guardrail metrics (things that must not get worse) before you run. Check both when evaluating results.",
    icon: "📊",
  },
  {
    id: "novelty",
    mistake: "The \"new shiny thing\" problem",
    whyBad: "People naturally click on things that look new or different. If you change the color of a button, users may click it more in the first few days simply because it's new. After a week or two, behavior normalizes. An experiment that ran only 3 days might be measuring curiosity, not preference.",
    fix: "Run experiments for at least 2 weeks. If you have a high-traffic site, make sure you're exposing enough returning users (not just new visitors) to both variants before calling a winner.",
    icon: "✨",
  },
  {
    id: "no-hypothesis",
    mistake: "Testing without a clear \"why\"",
    whyBad: "\"Let's just test it and see\" sounds reasonable, but if you don't have a reason for why a change should work, you can't learn from the result, whether it wins or loses. You'll be stuck wondering: 'The blue button won... but why? Should we make everything blue now?'",
    fix: "Write a one-sentence hypothesis before you start: 'We believe [change] will [impact] because [reasoning].' Example: 'We believe adding social proof under the pricing plans will increase plan upgrades because users trust what other people choose.'",
    icon: "📋",
  },
];

/* ── Tooling recommendations ── */
const TOOLS = [
  {
    name: "PostHog",
    type: "Open Source",
    typeColor: "text-emerald-400",
    tagline: "Best place to start. Free, open source, and all-in-one.",
    desc: "Combines A/B testing, analytics, session recordings, and feature flags in one tool. You can self-host it for free or use their cloud. For most frontend teams just getting into experimentation, PostHog is the easiest starting point.",
    emoji: "🦔",
  },
  {
    name: "GrowthBook",
    type: "Open Source",
    typeColor: "text-emerald-400",
    tagline: "Powerful open-source experimentation with great DX.",
    desc: "Built specifically for A/B testing. Supports both Bayesian and Frequentist statistics, has a clean React SDK, and gives you full control. Great if you want a dedicated experimentation tool that you can run yourself.",
    emoji: "🌱",
  },
  {
    name: "Statsig",
    type: "SaaS",
    typeColor: "text-blue-400",
    tagline: "Enterprise-grade experimentation with a generous free tier.",
    desc: "What tools like Meta and Airbnb built internally, productized. Has advanced variance reduction techniques that help you get statistically significant results faster. Good if you're scaling up your experimentation program.",
    emoji: "📈",
  },
  {
    name: "LaunchDarkly",
    type: "SaaS (Feature Flags)",
    typeColor: "text-purple-400",
    tagline: "The industry standard for feature flags and gradual rollouts.",
    desc: "Primarily a feature flag tool, but with experimentation built in. Great if your main need is safely rolling out features to a percentage of users and progressively expanding based on results.",
    emoji: "🚀",
  },
];

/* ── Takeaway cards ── */
const TAKEAWAYS = [
  {
    icon: "🎯",
    title: "Your gut feeling is not data",
    desc: "Everyone on your team has opinions about what will improve the product. Most of those opinions, even from senior people, will be wrong about 70% of the time. A/B tests tell you the truth.",
  },
  {
    icon: "📉",
    title: "Losing is learning",
    desc: "When your experiment shows no improvement, that's genuinely useful. You've learned that this particular change doesn't help, which saves you from shipping complexity that gives you nothing in return.",
  },
  {
    icon: "📏",
    title: "Small changes, big impact",
    desc: "The most impactful A/B test results often come from surprisingly small changes: button text, image placement, the order of items on a list. You rarely need a full redesign to move a metric.",
  },
  {
    icon: "⏳",
    title: "Patience is the job",
    desc: "Good experiments take time. Rushing to call a winner early is the #1 mistake teams make. The whole point of the experiment is to get trustworthy data, and that takes enough users and enough time.",
  },
  {
    icon: "🔗",
    title: "One change per test",
    desc: "If you test two changes at once (new button + new headline), and the variant wins, you don't know which change caused it. Keep experiments focused. Test one thing at a time.",
  },
  {
    icon: "🗣️",
    title: "Share results with the team",
    desc: "Build a culture of sharing experiment results, both wins and losses. Over time this builds shared intuition about what actually works for your users, which makes everyone smarter.",
  },
];

export default function ABTestingExperimentationPage() {
  const [expandedMistake, setExpandedMistake] = useState<string | null>("stopping-early");
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="dot-grid-bg absolute inset-0" aria-hidden="true" />
        <div
          className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2"
          style={{ background: "radial-gradient(circle, rgba(176,196,222,0.05) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-xs font-medium uppercase tracking-[0.25em] text-muted"
          >
            Frontend Testing · Topic 1 of 7
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            className="mt-6 font-heading text-4xl font-bold text-platinum md:text-5xl lg:text-6xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            A/B Testing &{" "}
            <br className="hidden md:block" />
            Experimentation
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            className="mt-6 mx-auto max-w-xl"
          >
            <TextGenerateEffect
              words="Stop guessing. Start testing. Learn the practice that separates product teams that ship with confidence from teams that ship and hope."
              className="!font-normal !text-secondary"
              duration={0.3}
              filter={false}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-8 flex items-center justify-center gap-4 text-xs text-muted flex-wrap"
          >
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              20 min read
            </span>
            <span className="w-px h-3 bg-divider hidden sm:block" />
            <span>Beginner Friendly</span>
            <span className="w-px h-3 bg-divider hidden sm:block" />
            <span>Real Examples</span>
          </motion.div>
        </div>
      </section>

      <div className="section-glow-divider" aria-hidden="true" />

      <TracingBeam className="px-6 py-16 md:py-24">

        {/* ── Section 1: What is it, really? ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20 max-w-3xl"
        >
          <SectionHeader
            number="01"
            title="What is A/B Testing?"
            subtitle="A simple idea with a powerful guarantee: it's how you know something actually works."
          />

          <p className="text-sm text-secondary leading-relaxed mb-5" style={{ lineHeight: "1.8" }}>
            Here&apos;s the problem: your team will never agree on what to build next. A designer wants a cleaner hero. A PM wants a bigger CTA. A developer thinks the whole checkout flow needs a rethink. Everyone has strong opinions backed by almost no real evidence. Sound familiar?
          </p>

          <p className="text-sm text-secondary leading-relaxed mb-5" style={{ lineHeight: "1.8" }}>
            A/B testing is how you settle those debates with data instead of seniority. The idea is simple: you take your current version of something (let&apos;s call it <strong className="text-platinum">version A</strong>) and a new version you want to test (<strong className="text-platinum">version B</strong>). You show A to roughly half your users and B to the other half, at the same time, randomly. Then you measure what actually happened.
          </p>

          <p className="text-sm text-secondary leading-relaxed mb-8" style={{ lineHeight: "1.8" }}>
            If version B genuinely performs better, you can see it in the numbers. And because users were randomly assigned, you know the difference came from your change and not from some other factor like day of week, user location, or a new marketing campaign. That&apos;s the whole magic. It lets you <strong className="text-platinum">isolate cause and effect</strong>.
          </p>

          {/* Real world gallery */}
          <h3 className="text-sm font-semibold text-platinum mb-4">Real experiments, real impact</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {REAL_EXAMPLES.map((ex) => (
              <div key={ex.company} className="p-4 border border-divider bg-surface/10 rounded-[2px] hover:bg-surface/20" style={{ transition: "background 300ms cubic-bezier(0.25,0.1,0.25,1)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{ex.emoji}</span>
                  <span className="text-xs font-bold text-platinum">{ex.company}</span>
                </div>
                <p className="text-xs text-secondary mb-2 leading-relaxed">{ex.change}</p>
                <div className="flex items-start gap-1.5">
                  <span className="text-accent text-xs font-bold mt-0.5 shrink-0">↑</span>
                  <p className="text-xs text-accent/80 leading-relaxed">{ex.result}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 border-l-2 border-accent bg-accent/5">
            <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
              The thing that makes A/B testing so powerful isn&apos;t that it finds winners. It&apos;s that it <strong className="text-platinum">catches losers before they ship</strong>. Most product changes that seem obviously good in a design review end up having little to no impact, or sometimes even hurt metrics, when real users touch them. A/B testing is your safety net.
            </p>
          </div>
        </motion.section>

        {/* ── Section 2: How it actually works ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20 max-w-3xl"
        >
          <SectionHeader
            number="02"
            title="How an Experiment Actually Works"
            subtitle="Step through a real experiment from idea to shipping. No jargon, just the actual story."
          />

          <p className="text-sm text-secondary leading-relaxed mb-8" style={{ lineHeight: "1.8" }}>
            Below is a real-world style experiment, the kind a product team at a music app might run. Click through each phase to see what actually happens, why it takes time, and where most teams go wrong.
          </p>

          <ABTestFlowDiagram />
        </motion.section>

        {/* ── Section 3: The mistakes ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20 max-w-3xl"
        >
          <SectionHeader
            number="03"
            title="Mistakes That Kill Your Experiments"
            subtitle="These are things real teams do all the time. You'll recognize them."
          />

          <p className="text-sm text-secondary leading-relaxed mb-8" style={{ lineHeight: "1.8" }}>
            Running an A/B test is easy. Running a good one is harder. Most teams that &quot;do A/B testing&quot; are quietly invalidating their experiments through one of these patterns. Once you know them, you&apos;ll spot them everywhere.
          </p>

          <div className="space-y-2">
            {MISTAKES.map((m) => (
              <div key={m.id} className="border border-divider rounded-[2px] overflow-hidden">
                <button
                  onClick={() => setExpandedMistake(expandedMistake === m.id ? null : m.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-surface/20"
                  style={{ transition: "background 300ms cubic-bezier(0.25,0.1,0.25,1)" }}
                >
                  <span className="text-xl shrink-0">{m.icon}</span>
                  <span className="text-sm font-medium text-platinum flex-1">{m.mistake}</span>
                  <motion.span
                    animate={{ rotate: expandedMistake === m.id ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-muted text-xs shrink-0"
                  >
                    ▼
                  </motion.span>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: expandedMistake === m.id ? "auto" : 0, opacity: expandedMistake === m.id ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-3 border-t border-divider space-y-3">
                    <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
                      {m.whyBad}
                    </p>
                    <div className="flex items-start gap-2 p-3 bg-accent/5 border border-accent/15 rounded-[2px]">
                      <span className="text-accent text-xs mt-0.5 shrink-0">✓</span>
                      <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.7" }}>
                        <strong className="text-accent">What to do instead:</strong> {m.fix}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Section 4: Tools ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20 max-w-3xl"
        >
          <SectionHeader
            number="04"
            title="What Tools Do People Use?"
            subtitle="You don't need to build this from scratch. Here are the most popular options."
          />

          <p className="text-sm text-secondary leading-relaxed mb-8" style={{ lineHeight: "1.8" }}>
            If you&apos;re just starting out, don&apos;t try to build your own A/B testing infrastructure. Use one of these. They handle the hard parts like user bucketing, results analysis, and SDK integrations so you can focus on the experiments themselves.
          </p>

          <div className="grid grid-cols-1 gap-4">
            {TOOLS.map((tool, i) => (
              <motion.div
                key={tool.name}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.06 }}
                className="p-5 border border-divider bg-surface/10 hover:bg-surface/20 rounded-[2px]"
                style={{ transition: "background 300ms cubic-bezier(0.25,0.1,0.25,1)" }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">{tool.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-heading text-base font-semibold text-platinum">{tool.name}</h4>
                      <span className={`text-[9px] uppercase tracking-widest font-mono font-bold border px-2 py-0.5 rounded-[2px] border-current opacity-70 ${tool.typeColor}`}>{tool.type}</span>
                    </div>
                    <p className="text-xs text-accent mt-0.5 mb-2">{tool.tagline}</p>
                    <p className="text-xs text-secondary leading-relaxed" style={{ lineHeight: "1.7" }}>{tool.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Section 5: Key Takeaways ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20 max-w-3xl"
        >
          <SectionHeader
            number="05"
            title="Things Worth Remembering"
            subtitle="The habits and mindsets that make experimentation work long-term."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TAKEAWAYS.map((item, i) => (
              <motion.div
                key={item.title}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.07 }}
                className="p-5 border border-divider bg-surface/10 hover:bg-surface/20 rounded-[2px]"
                style={{ transition: "background 300ms cubic-bezier(0.25, 0.1, 0.25, 1)" }}
              >
                <span className="text-2xl">{item.icon}</span>
                <h4 className="mt-3 text-sm font-medium text-platinum">{item.title}</h4>
                <p className="mt-2 text-xs text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Advanced Section (Optional Toggle) ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8 max-w-3xl"
        >
          {/* Toggle header */}
          <div className="border border-divider rounded-[2px] overflow-hidden">
            <button
              onClick={() => setShowAdvanced((p) => !p)}
              className="w-full flex items-start justify-between p-6 text-left hover:bg-surface/20"
              style={{ transition: "background 300ms cubic-bezier(0.25,0.1,0.25,1)" }}
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400/70 border border-amber-400/20 px-2 py-0.5 rounded-[2px]">
                    Optional · Advanced
                  </span>
                </div>
                <h2 className="font-heading text-xl font-semibold text-platinum" style={{ letterSpacing: "-0.02em" }}>
                  The Statistics Behind It
                </h2>
                <p className="text-sm text-muted mt-1">
                  If you want to truly understand what p-values, confidence intervals, and Type I/II errors actually mean, this is for you. Not required, but worth the read when you&apos;re ready.
                </p>
              </div>
              <motion.div
                animate={{ rotate: showAdvanced ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-muted mt-1 ml-4 shrink-0"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </button>

            <motion.div
              initial={false}
              animate={{ height: showAdvanced ? "auto" : 0, opacity: showAdvanced ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-divider p-6 space-y-8">

                {/* p-values explained simply */}
                <div>
                  <h3 className="text-base font-semibold text-platinum mb-3">p-values in plain English</h3>
                  <p className="text-sm text-secondary leading-relaxed mb-4" style={{ lineHeight: "1.8" }}>
                    A p-value answers this question: if my change actually has zero effect, how often would I see a result this extreme just by random chance? A p-value of 0.05 means: if there were truly no difference, this result would happen 5% of the time by luck alone. The standard threshold is p &lt; 0.05, which means you accept a 5% risk of being fooled by randomness.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { value: "p = 0.45", label: "Inconclusive", color: "text-muted", bg: "bg-surface/30", note: "45% chance this result is random noise. Not reliable." },
                      { value: "p = 0.08", label: "Borderline", color: "text-amber-400", bg: "bg-amber-400/5", note: "Getting there but not reliable enough to ship." },
                      { value: "p = 0.02", label: "Significant ✓", color: "text-emerald-400", bg: "bg-emerald-400/5", note: "Only 2% chance this is random. Good to go." },
                    ].map((item) => (
                      <div key={item.value} className={`p-4 border border-divider rounded-[2px] ${item.bg}`}>
                        <div className={`font-mono text-lg font-bold ${item.color}`}>{item.value}</div>
                        <div className={`text-[10px] uppercase tracking-widest font-mono ${item.color} mb-2`}>{item.label}</div>
                        <p className="text-[11px] text-muted leading-relaxed">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample size explained */}
                <div>
                  <h3 className="text-base font-semibold text-platinum mb-3">Why sample size matters</h3>
                  <p className="text-sm text-secondary leading-relaxed mb-4" style={{ lineHeight: "1.8" }}>
                    Imagine you&apos;re testing a new checkout button. Your variant gets 61% CTR and control gets 52%. That&apos;s a 9% difference. Sounds big. But how many users was that? If it was 50 users per group, that difference could easily just be random luck. If it was 5,000 users per group, it&apos;s almost certainly real. The interactive tool below shows exactly this.
                  </p>
                  <StatisticsConceptsDiagram />
                </div>

                {/* False positives / negatives */}
                <div>
                  <h3 className="text-base font-semibold text-platinum mb-3">Two ways an experiment can be wrong</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 border border-rose-500/20 bg-rose-500/5 rounded-[2px]">
                      <h4 className="text-sm font-semibold text-rose-400 mb-2">False Positive: &quot;We think it works, but it doesn&apos;t&quot;</h4>
                      <p className="text-xs text-secondary leading-relaxed" style={{ lineHeight: "1.7" }}>
                        You declared a winner, but the improvement was just random noise. This happens when you stop tests too early, run them on too few users, or peek at results multiple times. The standard 5% significance threshold means 1 in 20 valid-looking experiments will be false positives.
                      </p>
                    </div>
                    <div className="p-5 border border-amber-500/20 bg-amber-500/5 rounded-[2px]">
                      <h4 className="text-sm font-semibold text-amber-400 mb-2">False Negative: &quot;We think it didn&apos;t work, but it does&quot;</h4>
                      <p className="text-xs text-secondary leading-relaxed" style={{ lineHeight: "1.7" }}>
                        Your variant actually helps users, but your experiment didn&apos;t detect it. Usually caused by not having enough users. This is called an underpowered test. You end up passing on improvements because your data was too noisy to see them.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </motion.section>

      </TracingBeam>

      <div className="section-glow-divider" aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════
          TOPIC NAVIGATION (Prev / Next)
          ═══════════════════════════════════════════════════════ */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/fundamentals/http-https-deep-dive"
            className="group flex flex-col items-start px-5 py-3 border border-divider text-platinum hover:border-accent/40 hover:bg-surface/20 min-w-[200px]"
            style={{ borderRadius: "2px", transition: "all 400ms cubic-bezier(0.25, 0.1, 0.25, 1)" }}
          >
            <span className="text-[10px] text-muted uppercase tracking-widest mb-1 group-hover:text-accent transition-colors">← Previous</span>
            <span className="text-sm font-medium">HTTP &amp; HTTPS Deep Dive</span>
          </Link>

          <div className="text-sm text-muted italic text-right">
            Next topics in this track coming soon.
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   Reusable Sub-Components
   ═══════════════════════════════════════════════════════════ */

function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-accent/60">
        Section {number}
      </span>
      <h2 className="mt-2 font-heading text-2xl font-semibold text-platinum md:text-3xl" style={{ letterSpacing: "-0.02em" }}>
        {title}
      </h2>
      <p className="mt-2 text-sm text-muted">{subtitle}</p>
    </div>
  );
}
