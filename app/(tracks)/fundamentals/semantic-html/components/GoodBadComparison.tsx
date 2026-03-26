"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface BadGoodPair {
  id: string;
  title: string;
  category: string;
  bad: { code: string; label: string };
  good: { code: string; label: string };
  reason: string;
}

const PAIRS: BadGoodPair[] = [
  {
    id: "button",
    title: "Interactive Elements",
    category: "Interactivity",
    bad: {
      label: "A div pretending to be a button",
      code: `<div 
  class="btn" 
  onclick="submit()"
>
  Submit
</div>`,
    },
    good: {
      label: "A real button",
      code: `<button 
  type="submit"
>
  Submit
</button>`,
    },
    reason: "A <button> is focusable by default. It works with keyboard Enter and Space. It has role='button'. A styled <div> is invisible to keyboard users and screen readers unless you add tabindex, role, and keyboard event handlers. Why write 3 extra lines when the browser does it for free?",
  },
  {
    id: "heading",
    title: "Visual Headings",
    category: "Content",
    bad: {
      label: "Big bold text",
      code: `<p class="big-bold">
  Product Features
</p>`,
    },
    good: {
      label: "Semantic heading",
      code: `<h2>
  Product Features
</h2>`,
    },
    reason: "Screen reader users navigate pages by pressing 'H' to jump between headings. <p class='big-bold'> may look like a heading but it doesn't create a landmark. SEO bots also use heading tags to understand page hierarchy.",
  },
  {
    id: "nav",
    title: "Navigation",
    category: "Structure",
    bad: {
      label: "A div of links",
      code: `<div id="nav">
  <a href="/">Home</a>
  <a href="/blog">Blog</a>
  <a href="/contact">Contact</a>
</div>`,
    },
    good: {
      label: "Semantic nav",
      code: `<nav aria-label="Main">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/blog">Blog</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>`,
    },
    reason: "<nav> creates a 'navigation' landmark. Screen reader users can jump to it directly. aria-label distinguishes it from other navs (like breadcrumbs or footer links). The <ul>/<li> structure tells assistive tech 'there are 3 items in this list'.",
  },
  {
    id: "image",
    title: "Images",
    category: "Media",
    bad: {
      label: "Missing alt text",
      code: `<img src="logo.png">`,
    },
    good: {
      label: "Descriptive alt text",
      code: `<!-- Meaningful image -->
<img 
  src="logo.png" 
  alt="Company Logo"
>

<!-- Decorative image -->
<img 
  src="squiggle.svg" 
  alt=""
  aria-hidden="true"
>`,
    },
    reason: "Every meaningful image needs alt text that describes its content and function (not 'image of...'). Decorative images get alt='' so screen readers skip them. The first rule: if you removed the image, would the user miss information?",
  },
  {
    id: "form",
    title: "Form Inputs",
    category: "Forms",
    bad: {
      label: "Label as placeholder",
      code: `<input 
  type="text" 
  placeholder="First name"
>`,
    },
    good: {
      label: "Explicit label association",
      code: `<label for="fname">
  First name
</label>
<input 
  type="text" 
  id="fname" 
  name="fname"
  autocomplete="given-name"
>`,
    },
    reason: "placeholder disappears on input, so people with cognitive disabilities cannot recall what to type. Screen readers read the placeholder but do not associate it as a proper label. The <label for='x'> association also enlarges the click target to include the label text, which is a huge usability win.",
  },
  {
    id: "table",
    title: "Data Tables",
    category: "Data",
    bad: {
      label: "Layout table with styled divs",
      code: `<div class="table">
  <div class="row">
    <div class="cell bold">Name</div>
    <div class="cell bold">Price</div>
  </div>
  <div class="row">
    <div class="cell">Laptop</div>
    <div class="cell">$999</div>
  </div>
</div>`,
    },
    good: {
      label: "Semantic accessible table",
      code: `<table>
  <caption>Product Pricing</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Laptop</td>
      <td>$999</td>
    </tr>
  </tbody>
</table>`,
    },
    reason: "Screen readers read table cells in context: 'Price column, row 2: $999'. With div-tables they just read '$999' with no context. scope='col' associates header cells with their data columns so users always know what they're looking at.",
  },
];

export default function GoodBadComparison() {
  const [activeId, setActiveId] = useState(PAIRS[0].id);
  const active = PAIRS.find((p) => p.id === activeId)!;

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4">
      {/* Sidebar */}
      <div className="flex flex-wrap lg:flex-col gap-2 lg:w-52 shrink-0">
        {PAIRS.map((pair) => (
          <button
            key={pair.id}
            onClick={() => setActiveId(pair.id)}
            className={cn(
              "px-3 py-2.5 text-left text-xs border transition-all",
              activeId === pair.id
                ? "bg-accent/8 border-accent/40 text-platinum"
                : "border-divider text-muted hover:border-divider-hover hover:text-secondary"
            )}
            style={{ borderRadius: "2px" }}
          >
            <span className="block font-bold">{pair.title}</span>
            <span className="text-[10px] opacity-60">{pair.category}</span>
          </button>
        ))}
      </div>

      {/* Detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex-1 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bad */}
            <div className="border border-red-500/30 overflow-hidden" style={{ borderRadius: "2px" }}>
              <div className="px-4 py-2 bg-red-500/8 border-b border-red-500/20 flex items-center gap-2">
                <span className="text-red-400 text-xs font-bold">✕ Bad</span>
                <span className="text-[10px] text-red-300/60">{active.bad.label}</span>
              </div>
              <pre className="p-4 text-[11px] font-mono text-red-200/60 bg-black/30 overflow-x-auto leading-relaxed">
                <code>{active.bad.code}</code>
              </pre>
            </div>

            {/* Good */}
            <div className="border border-green-500/30 overflow-hidden" style={{ borderRadius: "2px" }}>
              <div className="px-4 py-2 bg-green-500/8 border-b border-green-500/20 flex items-center gap-2">
                <span className="text-green-400 text-xs font-bold">✓ Good</span>
                <span className="text-[10px] text-green-300/60">{active.good.label}</span>
              </div>
              <pre className="p-4 text-[11px] font-mono text-green-200/60 bg-black/30 overflow-x-auto leading-relaxed">
                <code>{active.good.code}</code>
              </pre>
            </div>
          </div>

          {/* Reason */}
          <div className="p-4 border-l-2 border-accent/40 bg-accent/5" style={{ borderRadius: "0 2px 2px 0" }}>
            <p className="text-xs text-secondary/90 leading-relaxed">{active.reason}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
