"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { TRACKS, FEATURED_TOPICS, STATS, VALUE_PROPS, TOPIC_ROUTES } from "@/lib/constants";
import AnimatedCounter from "@/app/components/AnimatedCounter";
import { TypewriterCycle } from "@/app/components/TypewriterCycle";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

/* ── Framer Motion scroll-reveal variant (replaces custom ScrollReveal) ── */
const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/* ── Track Icons (inline SVG, stroke-only, architectural) ── */
const TRACK_ICONS: Record<string, React.ReactNode> = {
  "web-fundamentals": (
    <svg className="h-7 w-7 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  "javascript-deep-dive": (
    <svg className="h-7 w-7 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  "css-ui-engineering": (
    <svg className="h-7 w-7 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  ),
  "browser-networking": (
    <svg className="h-7 w-7 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="1" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  "frontend-system-design": (
    <svg className="h-7 w-7 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  "performance-security": (
    <svg className="h-7 w-7 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
};

/* ── Value Prop Icons ── */
const VALUE_ICONS: React.ReactNode[] = [
  /* Layers — structured learning */
  <svg key="layers" className="h-8 w-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>,
  /* Code — framework agnostic */
  <svg key="code" className="h-8 w-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>,
  /* Target — system design depth */
  <svg key="target" className="h-8 w-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>,
];


export default function Home() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 text-center">
        {/* Dot grid background */}
        <div className="dot-grid-bg absolute inset-0" aria-hidden="true" />

        {/* Subtle radial glow behind heading */}
        <div
          className="absolute left-1/2 top-1/3 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(circle, rgba(176,196,222,0.06) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl">
          {/* Overline */}
          <p className="animate-fade-in-up mt-16 text-xs font-medium uppercase tracking-[0.25em] text-muted">
            Deep Dive into Frontend Engineering
          </p>

          {/* Heading with FlipWords */}
          <h1
            className="animate-fade-in-up mt-8 font-heading text-5xl font-bold leading-[1.1] text-platinum md:text-7xl"
            style={{ animationDelay: "100ms", letterSpacing: "-0.02em" }}
          >
            Master the Art of
            <br />
            <span className="inline-block min-h-[1.2em]">
              <TypewriterCycle
                words={["Frontend Engineering", "System Design", "Web Performance"]}
                typingSpeed={90}
                deletingSpeed={45}
                pauseDuration={3000}
                className="text-accent"
              />
            </span>
          </h1>

          {/* Subheading with TextGenerateEffect */}
          <div
            className="animate-fade-in-up mx-auto mt-8 max-w-xl"
            style={{ animationDelay: "200ms" }}
          >
            <TextGenerateEffect
              words="Your comprehensive, framework-agnostic guide to every core frontend concept — from browser internals to system design."
              className="!font-normal"
              duration={0.4}
              filter={false}
            />
          </div>

          {/* CTAs */}
          <div
            className="animate-fade-in-up mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            style={{ animationDelay: "300ms" }}
          >
            <a
              href="#tracks"
              className="cta-primary inline-flex h-12 w-full items-center justify-center bg-accent px-8 text-sm font-medium text-deep sm:w-auto"
            >
              Explore Tracks
            </a>
            <a
              href="#topics"
              className="cta-outline inline-flex h-12 w-full items-center justify-center border border-divider px-8 text-sm font-medium text-platinum sm:w-auto"
            >
              Browse All Topics →
            </a>
          </div>
        </div>

        {/* Stats Counter Bar */}
        <div
          className="animate-fade-in-up relative z-10 mt-24 w-full max-w-2xl border-t border-divider pt-12"
          style={{ animationDelay: "500ms" }}
        >
          <div className="grid grid-cols-3 gap-8">
            {STATS.map((stat) => (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Luminous divider */}
      <div className="section-glow-divider" aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════
          LEARNING TRACKS
          ═══════════════════════════════════════════════════════ */}
      <section id="tracks" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            <h2
              className="font-heading text-3xl font-semibold text-platinum md:text-4xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Learning Tracks
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-secondary">
              Structured paths from fundamentals to mastery. Each track builds
              on the last, guiding you through frontend engineering
              systematically.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TRACKS.map((track, i) => (
              <motion.div
                key={track.id}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: i * 0.08,
                }}
              >
                <div id={track.id} className="track-card flex h-full flex-col p-8">
                  {/* Icon */}
                  <div className="mb-6">
                    {TRACK_ICONS[track.id]}
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-semibold text-platinum">
                    {track.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-secondary">
                    {track.description}
                  </p>

                  {/* Topics List */}
                  <ul className="mt-5 space-y-1.5 border-t border-divider pt-5">
                    {track.topics.map((topic) => {
                      const route = TOPIC_ROUTES[topic];
                      return (
                        <li key={topic} className="flex items-start gap-2 text-xs">
                          <span className={`mt-1 block h-1 w-1 shrink-0 rounded-full ${route ? 'bg-accent' : 'bg-accent opacity-50'}`} />
                          {route ? (
                            <Link
                              href={route}
                              className="text-platinum hover:text-accent flex items-center gap-1.5 group"
                              style={{ transition: "color 300ms cubic-bezier(0.25, 0.1, 0.25, 1)" }}
                            >
                              {topic}
                              <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                            </Link>
                          ) : (
                            <span className="text-muted">{topic}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  {/* Topic Count Badge */}
                  <div className="mt-6 flex items-center justify-between">
                    <span
                      className="inline-flex items-center border border-divider px-3 py-1 text-xs font-medium text-muted"
                      style={{ borderRadius: "2px" }}
                    >
                      {track.topicCount} topics
                    </span>
                    <span className="text-xs text-accent">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Luminous divider */}
      <div className="section-glow-divider" aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════
          FEATURED TOPICS
          ═══════════════════════════════════════════════════════ */}
      <section id="topics" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            <h2
              className="font-heading text-3xl font-semibold text-platinum md:text-4xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Featured Topics
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-secondary">
              Essential frontend concepts every engineer should master.
              Dive into any subject that interests you.
            </p>
          </motion.div>

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.12 }}
            className="mt-12 flex flex-wrap justify-center gap-3"
          >
            {FEATURED_TOPICS.map((topic) => {
              const route = TOPIC_ROUTES[topic];
              return route ? (
                <Link key={topic} href={route} className="topic-pill hover:border-accent/40 hover:text-accent" style={{ transition: "all 300ms cubic-bezier(0.25, 0.1, 0.25, 1)" }}>
                  {topic}
                </Link>
              ) : (
                <span key={topic} className="topic-pill">
                  {topic}
                </span>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Luminous divider */}
      <div className="section-glow-divider" aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════
          VALUE PROPOSITIONS
          ═══════════════════════════════════════════════════════ */}
      <section id="about" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            <h2
              className="font-heading text-3xl font-semibold text-platinum md:text-4xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Why Frontend Mastery
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-secondary">
              Not just another tutorial site. A deeply researched, beautifully
              crafted learning experience built for engineers.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUE_PROPS.map((prop, i) => (
              <motion.div
                key={prop.title}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: i * 0.1,
                }}
              >
                <div className="value-card h-full">
                  {VALUE_ICONS[i]}
                  <h3 className="mt-6 font-heading text-lg font-semibold text-platinum">
                    {prop.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary" style={{ lineHeight: "1.8" }}>
                    {prop.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA BANNER
          ═══════════════════════════════════════════════════════ */}
      <section className="cta-section px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2
              className="font-heading text-3xl font-semibold text-platinum md:text-4xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Begin Your Journey Today
            </h2>
            <p className="mx-auto mt-6 max-w-md text-secondary">
              Explore 43 deep-dive topics across 6 structured learning
              tracks — all framework-agnostic and free.
            </p>
            <div className="mt-10">
              <a
                href="#tracks"
                className="cta-primary inline-flex h-12 items-center justify-center bg-accent px-10 text-sm font-medium text-deep"
              >
                Start Learning →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
