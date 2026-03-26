"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useScroll } from "motion/react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import HTMLTimeMachine from "./components/HTMLTimeMachine";
import AccessibilityTreeDiagram from "./components/AccessibilityTreeDiagram";
import DocumentOutlineVisualizer from "./components/DocumentOutlineVisualizer";
import InputTypeGallery from "./components/InputTypeGallery";
import NativeDialogDemo from "./components/NativeDialogDemo";
import InteractiveMeterOutput from "./components/InteractiveMeterOutput";
import GoodBadComparison from "./components/GoodBadComparison";

/* ────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────── */
interface TocSection {
  id: string;
  number: string;
  title: string;
}

const TOC: TocSection[] = [
  { id: "s-history", number: "01", title: "The HTML Time Machine" },
  { id: "s-what", number: "02", title: "What & Why" },
  { id: "s-structure", number: "03", title: "Document Structure" },
  { id: "s-a11y", number: "04", title: "Accessibility Tree" },
  { id: "s-outline", number: "05", title: "Document Outline" },
  { id: "s-content", number: "06", title: "Content Elements" },
  { id: "s-forms", number: "07", title: "Forms & Inputs" },
  { id: "s-interactive", number: "08", title: "Interactive Elements" },
  { id: "s-data", number: "09", title: "Data & Metrics" },
  { id: "s-pitfalls", number: "10", title: "Common Pitfalls" },
];

/* ────────────────────────────────────────────────
   Reusable content primitives
   ──────────────────────────────────────────────── */
function SectionAnchor({ id }: { id: string }) {
  return <div id={id} className="scroll-mt-24" />;
}

function SectionLabel({ number }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-[10px] font-bold font-mono text-accent/50 tabular-nums">{number}</span>
      <div className="flex-1 h-px bg-divider" />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-2xl md:text-3xl font-bold text-platinum mb-4" style={{ letterSpacing: "-0.025em" }}>
      {children}
    </h2>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-secondary text-sm leading-[1.9] space-y-4 max-w-2xl">
      {children}
    </div>
  );
}

function Callout({ type, children }: { type: "tip" | "warning" | "note" | "good" | "bad"; children: React.ReactNode }) {
  const config = {
    tip: { icon: "💡", label: "Tip", border: "border-l-yellow-400/50", bg: "bg-yellow-500/5", text: "text-yellow-200/70" },
    warning: { icon: "⚠️", label: "Warning", border: "border-l-red-400/50", bg: "bg-red-500/5", text: "text-red-200/70" },
    note: { icon: "ℹ️", label: "Note", border: "border-l-blue-400/50", bg: "bg-blue-500/5", text: "text-blue-200/70" },
    good: { icon: "✅", label: "Do this", border: "border-l-green-400/50", bg: "bg-green-500/5", text: "text-green-200/70" },
    bad: { icon: "❌", label: "Avoid", border: "border-l-red-400/50", bg: "bg-red-500/5", text: "text-red-200/70" },
  }[type];
  return (
    <div className={`border-l-2 ${config.border} ${config.bg} px-4 py-3`} style={{ borderRadius: "0 2px 2px 0" }}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm">{config.icon}</span>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${config.text}`}>{config.label}</span>
      </div>
      <div className="text-xs text-secondary/80 leading-relaxed">{children}</div>
    </div>
  );
}

function CodeBlock({ code, lang = "html" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);
  return (
    <div className="border border-divider overflow-hidden my-4" style={{ borderRadius: "2px" }}>
      <div className="flex items-center justify-between px-4 py-2 bg-surface/50 border-b border-divider">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className="text-[10px] text-muted font-mono ml-2">{lang}</span>
        </div>
        <button
          onClick={copy}
          className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-accent transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 text-[11px] font-mono leading-relaxed text-secondary/80 overflow-x-auto bg-black/30">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-10 border border-divider/80 bg-surface/10 overflow-hidden" style={{ borderRadius: "2px" }}>
      <div className="flex items-center gap-3 px-5 py-3 bg-surface/40 border-b border-divider">
        <div className="w-2 h-2 rounded-full bg-accent/50 animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted/70">Interactive Demo</span>
        <span className="ml-2 text-[10px] text-muted/50">·</span>
        <span className="text-[10px] text-muted/50">{title}</span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   Content Sections
   ──────────────────────────────────────────────── */
const SECTIONING_ELEMENTS = [
  { el: "header", role: "banner (landmark)", desc: "Introductory content for its nearest sectioning parent. At the page level it maps to the 'banner' landmark. You can have multiple headers, and one inside <article> is valid." },
  { el: "nav", role: "navigation (landmark)", desc: "A block of links for navigation. Use aria-label to distinguish multiple navs (main nav vs breadcrumbs vs footer links)." },
  { el: "main", role: "main (landmark)", desc: "The dominant content of the page. There should only be one visible <main> per page. Directly receiving keyboard shortcuts in most screen readers." },
  { el: "article", role: "article", desc: "Self-contained content that makes sense on its own: a blog post, a news item, a comment. Ask yourself: could this be syndicated? If yes, use <article>." },
  { el: "section", role: "region (if named)", desc: "A thematic group of content. A section should have a heading. Without a heading, use a <div> instead. It becomes a landmark only if it has aria-label or aria-labelledby." },
  { el: "aside", role: "complementary (landmark)", desc: "Tangentially related to the surrounding content (sidebars, pull quotes, ads). Not critical to understanding the main content." },
  { el: "footer", role: "contentinfo (landmark)", desc: "Footer for its nearest sectioning parent. At the page level it maps to the 'contentinfo' landmark. Can contain copyright, contact, links." },
  { el: "address", role: "group", desc: "Contact information for its nearest <article> or <body>. Not a generic mailing address. It's specifically contact info for the page or article author." },
];

const INLINE_ELEMENTS = [
  { el: "strong", usage: "Important, serious, or urgent content", note: "Not just bold. If you'd stress it while speaking, use <strong>." },
  { el: "em", usage: "Stressed emphasis that changes meaning", note: `"I never said she stole it" vs "I never said she stole it"` },
  { el: "small", usage: "Side comments, fine print, legal text", note: "Not 'small text'. Semantically means 'less important'." },
  { el: "cite", usage: "Title of a creative work", note: "Book title, song, film, article. Not for citing a person." },
  { el: "abbr", usage: "Abbreviation or acronym", note: 'Use title attribute: <abbr title="HyperText Markup Language">HTML</abbr>' },
  { el: "time", usage: "Machine-readable date/time", note: '<time datetime="2026-03-26">March 26th</time>' },
  { el: "mark", usage: "Highlighted/search result text", note: "Like a yellow highlighter. Also adds to accessibility tree." },
  { el: "del", usage: "Removed content (edit history)", note: "Semantically 'crossed out', not just with a line." },
  { el: "ins", usage: "Inserted content (edit history)", note: "The counterpart to <del>. Shows what was added." },
  { el: "code", usage: "Inline code", note: "For a filename, variable, or short snippet in prose." },
  { el: "pre", usage: "Preformatted text (whitespace matters)", note: "Wrap <code> inside <pre> for code blocks." },
  { el: "kbd", usage: "Keyboard input", note: "Press <kbd>Ctrl</kbd>+<kbd>C</kbd> to copy." },
  { el: "samp", usage: "Sample output from a computer program", note: "The counterpart to <kbd>. For terminal output etc." },
  { el: "var", usage: "Mathematical variable", note: "<var>x</var> = <var>y</var> + 2" },
  { el: "sub", usage: "Subscript (chemical formulas, footnotes)", note: "H<sub>2</sub>O" },
  { el: "sup", usage: "Superscript (exponents, footnotes)", note: "E = mc<sup>2</sup>" },
];

/* ────────────────────────────────────────────────
   Main Page
   ──────────────────────────────────────────────── */
export default function SemanticHTMLPage() {
  const [activeSection, setActiveSection] = useState("s-history");
  const { scrollYProgress } = useScroll();


  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const transition = { duration: 0.7, ease: "easeOut" as const };
  const reveal = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition },
  };

  return (
    <div className="min-h-screen bg-deep">
      {/* Reading progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent/70 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative px-6 py-24 md:py-40 overflow-hidden">
        <div className="dot-grid-bg absolute inset-0 opacity-15" aria-hidden="true" />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(176,196,222,0.07) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent/60 mb-8"
          >
            Web Fundamentals · Chapter 3
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl font-bold text-platinum mb-6"
            style={{ letterSpacing: "-0.045em", lineHeight: 1.06 }}
          >
            Semantic
            <br />
            <span className="text-accent">HTML</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto max-w-xl"
          >
            <TextGenerateEffect
              words="Stop writing HTML that only looks correct. Learn to write HTML that is correct: for browsers, search engines, assistive technologies, and future you at 2 a.m."
              className="!font-normal !text-secondary/90 !text-sm md:!text-base leading-relaxed"
              duration={0.25}
              filter={false}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-12 flex items-center justify-center gap-10 text-[10px] font-bold uppercase tracking-widest text-muted/50"
          >
            {[["~30 min", "Deep read"], ["10", "Interactive demos"], ["0", "Em-dashes"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-platinum/50 font-heading mb-1" style={{ letterSpacing: "-0.04em" }}>{val}</div>
                <div>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="section-glow-divider" />

      {/* ═══════════ BODY ═══════════ */}
      <div className="mx-auto max-w-7xl px-4 py-16 flex gap-8">
        {/* ── Sticky Table of Contents ── */}
        <aside className="hidden xl:block w-56 shrink-0">
          <div className="sticky top-24 space-y-1">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted/40 px-3 mb-4">
              Contents
            </p>
            {TOC.map(({ id, number, title }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`w-full text-left flex items-center gap-2 px-3 py-1.5 text-[11px] transition-all`}
                style={{
                  borderRadius: "2px",
                  color: activeSection === id ? "var(--color-platinum)" : "var(--color-muted)",
                  background: activeSection === id ? "rgba(176,196,222,0.06)" : "transparent",
                  borderLeft: activeSection === id ? "2px solid rgba(176,196,222,0.5)" : "2px solid transparent",
                }}
              >
                <span className="font-mono text-[10px] opacity-40">{number}</span>
                <span className="leading-snug">{title}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0 max-w-3xl">
          {/* ─────────────────────────────── SECTION 01 ─────────── */}
          <motion.section
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-24"
          >
            <SectionAnchor id="s-history" />
            <SectionLabel number="01" title="History" />
            <SectionTitle>The HTML Time Machine</SectionTitle>
            <Prose>
              <p>
                The web was never supposed to look like this. Tim Berners-Lee was a software engineer at CERN in 1989 trying to solve one problem: physicists couldn&apos;t share research because it lived on different computers with incompatible systems. He borrowed a markup language from IBM called SGML and stripped it down to 18 tags.
              </p>
              <p>
                The original spec had no concept of layout, no colors, no fonts. HTML was meant to describe <em>meaning</em>: this is a heading, this is a paragraph, this is a list. The browser could render those however it wanted. That was the plan. That original philosophy is exactly what we&apos;re trying to get back to.
              </p>
            </Prose>
            <DemoCard title="HTML across the eras: same page, 4 different versions">
              <HTMLTimeMachine />
            </DemoCard>
            <Prose>
              <p>
                Notice what happened in 1997. Netscape and Internet Explorer started competing for users by adding proprietary tags: <code className="text-accent text-xs font-mono">&lt;blink&gt;</code>, <code className="text-accent text-xs font-mono">&lt;marquee&gt;</code>, <code className="text-accent text-xs font-mono">&lt;font color=&quot;red&quot;&gt;</code>. Developers had to test in both browsers.
              </p>
              <p>
                By 2004, a group of browser vendors (Apple, Mozilla, Opera) got fed up with the W3C&apos;s direction toward strict XML and formed the WHATWG. Their philosophy was &quot;pave the cowpaths&quot;: look at what developers are already doing and standardize the best version of it. HTML5 was born from that group, and it brought back the idea of semantic markup with new elements built for the modern web.
              </p>
            </Prose>
          </motion.section>

          {/* ─────────────────────────────── SECTION 02 ─────────── */}
          <motion.section
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-24"
          >
            <SectionAnchor id="s-what" />
            <SectionLabel number="02" title="What & Why" />
            <SectionTitle>What Exactly Is &quot;Semantic&quot;?</SectionTitle>
            <Prose>
              <p>
                Semantics is the study of meaning. Semantic HTML means using the <em>correct</em> element for the job: choose an element based on what the content is, not what you want it to look like.
              </p>
              <p>
                You can make a <code className="text-accent text-xs font-mono">&lt;div&gt;</code> look like anything with CSS. But the browser won&apos;t know it&apos;s a button. A screen reader won&apos;t know it&apos;s a navigation landmark. A search engine won&apos;t know it&apos;s an article. The visual appearance is a lie.
              </p>
            </Prose>
            <Callout type="tip">
              The golden rule: choose your HTML element based on what the content means, not what you want it to look like. CSS handles appearance. HTML handles meaning.
            </Callout>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: "♿", title: "Accessibility", body: "The accessibility tree maps HTML elements to roles. Landmark navigation lets screen reader users jump between sections instantly." },
                { icon: "🔍", title: "SEO", body: "Search engine crawlers weight content inside semantic elements differently. A <h1> matters more than text in a <div>." },
                { icon: "🛠️", title: "Maintainability", body: "HTML that reads like English is easier to debug, review, and hand off. You can understand the page structure without reading the CSS." },
                { icon: "🔮", title: "Future Devices", body: "Voice assistants, smartwatches, and as-yet-uninvented devices all parse the HTML structure to understand your content." },
              ].map(({ icon, title, body }) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="p-6 border border-divider bg-surface/20 hover:border-divider-hover transition-colors"
                  style={{ borderRadius: "2px" }}
                >
                  <div className="text-2xl mb-3">{icon}</div>
                  <h3 className="text-sm font-bold text-platinum mb-2">{title}</h3>
                  <p className="text-xs text-secondary/80 leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ─────────────────────────────── SECTION 03 ─────────── */}
          <motion.section
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-24"
          >
            <SectionAnchor id="s-structure" />
            <SectionLabel number="03" title="Structure" />
            <SectionTitle>Document Structure Elements</SectionTitle>
            <Prose>
              <p>
                These are the elements that define the large-scale skeleton of your page. They carry no visual opinions (that&apos;s your job with CSS), but they create <strong className="text-platinum">ARIA landmark regions</strong> that assistive technology uses for navigation.
              </p>
            </Prose>
            <div className="mt-8 space-y-2">
              {SECTIONING_ELEMENTS.map(({ el, role, desc }) => (
                <motion.div
                  key={el}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="group flex gap-4 p-4 border border-divider hover:border-divider-hover bg-surface/10 hover:bg-surface/20 transition-all"
                  style={{ borderRadius: "2px" }}
                >
                  <div className="shrink-0 pt-0.5">
                    <code className="text-accent text-sm font-bold font-mono">&lt;{el}&gt;</code>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[9px] font-bold uppercase tracking-widest text-accent/60 px-2 py-0.5 border border-accent/20 bg-accent/5"
                        style={{ borderRadius: "1px" }}
                      >
                        role: {role}
                      </span>
                    </div>
                    <p className="text-xs text-secondary/80 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <CodeBlock code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page Title | Site Name</title>
</head>
<body>
  <header>
    <h1>Site Name</h1>
    <nav aria-label="Main">
      <!-- navigation links -->
    </nav>
  </header>
  
  <main>
    <article>
      <h2>Article Title</h2>
      <!-- article content -->
    </article>
    
    <aside>
      <h2>Related Posts</h2>
      <!-- sidebar content -->
    </aside>
  </main>
  
  <footer>
    <p><small>&copy; 2026 Company Name</small></p>
  </footer>
</body>
</html>`} />
          </motion.section>

          {/* ─────────────────────────────── SECTION 04 ─────────── */}
          <motion.section
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-24"
          >
            <SectionAnchor id="s-a11y" />
            <SectionLabel number="04" title="Accessibility" />
            <SectionTitle>The Accessibility Tree</SectionTitle>
            <Prose>
              <p>
                Alongside the DOM, the browser builds a second, parallel structure called the <strong className="text-platinum">accessibility tree</strong>. This is what assistive technologies like JAWS, NVDA, and VoiceOver actually consume. It is not the HTML you wrote verbatim. It is an interpreted tree of roles, names, and states.
              </p>
              <p>
                When you write <code className="text-accent text-xs font-mono">&lt;nav&gt;</code>, the browser automatically adds <code className="text-accent text-xs font-mono">role=&quot;navigation&quot;</code> to the accessibility tree. Screen reader users can press a keyboard shortcut to jump directly to any landmark. With <code className="text-accent text-xs font-mono">&lt;div class=&quot;nav&quot;&gt;</code>, none of that happens.
              </p>
            </Prose>
            <DemoCard title="Semantic HTML vs Div Soup: what the browser actually sees">
              <AccessibilityTreeDiagram />
            </DemoCard>
          </motion.section>

          {/* ─────────────────────────────── SECTION 05 ─────────── */}
          <motion.section
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-24"
          >
            <SectionAnchor id="s-outline" />
            <SectionLabel number="05" title="Outline" />
            <SectionTitle>Document Outline</SectionTitle>
            <Prose>
              <p>
                Headings create the document outline, which is essentially a table of contents for screen reader users. Every screen reader has a keyboard shortcut (usually &quot;H&quot;) to jump between headings. If your headings skip from <code className="text-accent text-xs font-mono">h1</code> to <code className="text-accent text-xs font-mono">h3</code>, users get confused.
              </p>
              <p>
                The rule is simple: never skip heading levels. You can go <em>up</em> any number of levels (from h4 back to h2 is fine at the end of a sub-section), but going <em>down</em> should only be one step at a time.
              </p>
            </Prose>
            <Callout type="warning">
              The HTML5 outline algorithm (where sectioning elements create their own heading context) was <strong>never implemented in any browser</strong> and has been removed from the spec. Heading level hierarchy is the only thing that matters for the document outline.
            </Callout>
            <DemoCard title="Document outline visualizer: good vs bad heading structure">
              <DocumentOutlineVisualizer />
            </DemoCard>
          </motion.section>

          {/* ─────────────────────────────── SECTION 06 ─────────── */}
          <motion.section
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-24"
          >
            <SectionAnchor id="s-content" />
            <SectionLabel number="06" title="Content" />
            <SectionTitle>Text & Inline Content Elements</SectionTitle>
            <Prose>
              <p>
                These are the elements people get wrong most often. Developers reach for <code className="text-accent text-xs font-mono">&lt;b&gt;</code> and <code className="text-accent text-xs font-mono">&lt;i&gt;</code> when they mean <code className="text-accent text-xs font-mono">&lt;strong&gt;</code> and <code className="text-accent text-xs font-mono">&lt;em&gt;</code>. The visual result is identical but the semantic meaning is completely different. Screen readers change their tone when they see <code className="text-accent text-xs font-mono">&lt;em&gt;</code>. They don&apos;t for <code className="text-accent text-xs font-mono">&lt;i&gt;</code>.
              </p>
            </Prose>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-divider">
                    <th className="text-left p-3 text-[10px] font-bold uppercase tracking-widest text-muted/60">Element</th>
                    <th className="text-left p-3 text-[10px] font-bold uppercase tracking-widest text-muted/60">Semantic meaning</th>
                    <th className="text-left p-3 text-[10px] font-bold uppercase tracking-widest text-muted/60">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-divider/50">
                  {INLINE_ELEMENTS.map(({ el, usage, note }) => (
                    <tr key={el} className="group hover:bg-surface/20 transition-colors">
                      <td className="p-3">
                        <code className="text-accent text-xs font-mono">&lt;{el}&gt;</code>
                      </td>
                      <td className="p-3 text-xs text-secondary/80">{usage}</td>
                      <td className="p-3 text-xs text-muted/60 font-mono">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* ─────────────────────────────── SECTION 07 ─────────── */}
          <motion.section
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-24"
          >
            <SectionAnchor id="s-forms" />
            <SectionLabel number="07" title="Forms" />
            <SectionTitle>Forms & Input Types</SectionTitle>
            <Prose>
              <p>
                Forms are where semantic HTML pays off the most. The right <code className="text-accent text-xs font-mono">type</code> attribute is not just about validation. It also controls which keyboard appears on mobile. <code className="text-accent text-xs font-mono">type=&quot;email&quot;</code> shows the @ key, <code className="text-accent text-xs font-mono">type=&quot;tel&quot;</code> shows the numpad. That is a direct UX improvement that costs you nothing.
              </p>
              <p>
                Every input must have a visible <code className="text-accent text-xs font-mono">&lt;label&gt;</code> associated with it via <code className="text-accent text-xs font-mono">for</code>/<code className="text-accent text-xs font-mono">id</code> pairing. Placeholder text is not a label. It disappears on input, which is a cognitive accessibility problem.
              </p>
            </Prose>
            <DemoCard title="Input type gallery: 12 types with mobile keyboard hints">
              <InputTypeGallery />
            </DemoCard>
            <Callout type="good">
              Always use <code className="text-accent font-mono">autocomplete</code> attributes on personal information fields. <code>autocomplete=&quot;given-name&quot;</code>, <code>autocomplete=&quot;email&quot;</code>, etc. Password managers and autofill rely on them.
            </Callout>
          </motion.section>

          {/* ─────────────────────────────── SECTION 08 ─────────── */}
          <motion.section
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-24"
          >
            <SectionAnchor id="s-interactive" />
            <SectionLabel number="08" title="Interactive" />
            <SectionTitle>Native Interactive Elements</SectionTitle>
            <Prose>
              <p>
                HTML5 shipped a proper <code className="text-accent text-xs font-mono">&lt;dialog&gt;</code> element. Before it, every modal in existence required complex JavaScript to trap focus, handle the Escape key, apply the right ARIA roles, and make the background inert. That&apos;s all now in the browser, for free.
              </p>
              <p>
                The same applies to <code className="text-accent text-xs font-mono">&lt;details&gt;</code> and <code className="text-accent text-xs font-mono">&lt;summary&gt;</code>: a zero-JavaScript accordion that works in every browser and is fully accessible out of the box.
              </p>
            </Prose>
            <DemoCard title="Native dialog element: fully accessible, browser handles everything">
              <NativeDialogDemo />
            </DemoCard>
            <Prose>
              <p>
                The <code className="text-accent text-xs font-mono">&lt;details&gt;</code> and <code className="text-accent text-xs font-mono">&lt;summary&gt;</code> combo is underused by most developers. It is a built-in accordion that is keyboard accessible, screen reader friendly, and requires zero JavaScript.
              </p>
            </Prose>
            <div className="mt-6 border border-divider overflow-hidden" style={{ borderRadius: "2px" }}>
              <div className="px-4 py-2 bg-surface/40 border-b border-divider">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted/60">Live: &lt;details&gt; / &lt;summary&gt; accordion</span>
              </div>
              <div className="p-4 space-y-2">
                {[
                  { q: "Do I need JavaScript for this?", a: "No. This entire accordion is pure HTML. Zero JavaScript. Zero CSS beyond your normal styles. The browser handles open/close state natively." },
                  { q: "Is it keyboard accessible?", a: "Yes. The <summary> element is focusable and responds to Enter and Space keys. Screen readers announce it as a button with expanded/collapsed state." },
                  { q: "Can I animate it?", a: 'Not easily with pure CSS yet. The `details[open]` selector exists but animating the closing state is tricky. A small JS snippet with the Web Animations API is the common workaround.' },
                ].map(({ q, a }) => (
                  <details
                    key={q}
                    className="border border-divider group"
                    style={{ borderRadius: "2px" }}
                  >
                    <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm text-platinum hover:bg-surface/20 transition-colors select-none list-none">
                      <span>{q}</span>
                      <span className="text-muted text-xs group-open:rotate-180 transition-transform duration-200">▼</span>
                    </summary>
                    <div className="px-4 py-3 border-t border-divider bg-surface/10">
                      <p className="text-xs text-secondary/80 leading-relaxed">{a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ─────────────────────────────── SECTION 09 ─────────── */}
          <motion.section
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-24"
          >
            <SectionAnchor id="s-data" />
            <SectionLabel number="09" title="Data" />
            <SectionTitle>Data, Metrics & Calculation</SectionTitle>
            <Prose>
              <p>
                HTML has specific elements for measurements and computed values that most developers have never used. <code className="text-accent text-xs font-mono">&lt;meter&gt;</code> represents a scalar value within a known range (like a gauge). <code className="text-accent text-xs font-mono">&lt;progress&gt;</code> is for task completion. <code className="text-accent text-xs font-mono">&lt;output&gt;</code> is for the result of a calculation.
              </p>
              <p>
                Using these elements instead of styled <code className="text-accent text-xs font-mono">&lt;div&gt;</code> bars means the browser automatically handles accessible announcements. Screen readers can understand &quot;disk usage: 68 out of 100&quot; from a properly configured <code className="text-accent text-xs font-mono">&lt;meter&gt;</code>.
              </p>
            </Prose>
            <DemoCard title="<meter> gauges + <output> loan calculator">
              <InteractiveMeterOutput />
            </DemoCard>
          </motion.section>

          {/* ─────────────────────────────── SECTION 10 ─────────── */}
          <motion.section
            variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-24"
          >
            <SectionAnchor id="s-pitfalls" />
            <SectionLabel number="10" title="Pitfalls" />
            <SectionTitle>Common Pitfalls (and What to Do Instead)</SectionTitle>
            <Prose>
              <p>
                These are the patterns senior developers catch in code reviews. Not syntax errors, but semantic errors. Your code compiles, it looks right in the browser, but the meaning is wrong.
              </p>
            </Prose>
            <DemoCard title="Good vs bad HTML: 6 categories of common mistakes">
              <GoodBadComparison />
            </DemoCard>
          </motion.section>
        </main>
      </div>
    </div>
  );
}
