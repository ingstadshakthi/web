---
name: topic-builder
description: "Build complete educational topic pages for Frontend Mastery. Use when: creating new topic pages, adding sections to topics, building interactive diagrams, writing educational content, adding topics to routes, structuring TOC, creating step-through visualizers, designing diagram components. Covers page structure, content voice, section primitives, and interactive component patterns."
argument-hint: "Which topic to build and any specific section focus"
---

# Topic Page Builder

## Purpose

Build complete, production-grade educational topic pages following the established Frontend Mastery patterns. Handles page structure, interactive diagrams, content writing, and route registration.

## When to Use

- Creating a new topic page from scratch
- Adding sections to an existing topic
- Building interactive step-through diagrams
- Writing educational content for any section
- Structuring a topic's TOC and navigation

## Page Structure Template

Every topic page follows this exact pattern:

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useScroll } from "motion/react";
// Import interactive components from ./components/

// 1. Types
interface TocSection {
  id: string;
  number: string;
  title: string;
}

// 2. TOC array
const TOC: TocSection[] = [
  { id: "s-intro", number: "01", title: "Section Title" },
  // ... 6-10 sections
];

// 3. Reusable primitives (SectionAnchor, SectionLabel, SectionTitle, Prose, Callout, CodeBlock)
// Copy from existing topic pages — these are standardized

// 4. Main component with:
//    - Scroll-spy TOC sidebar (sticky)
//    - Reading progress bar
//    - Responsive layout (hidden TOC on mobile)
//    - Each section follows: SectionAnchor → SectionLabel → SectionTitle → Prose → Diagram → Callout
```

## Section Primitive Reference

```tsx
// Anchor for scroll-spy targeting
function SectionAnchor({ id }: { id: string }) {
  return <div id={id} className="scroll-mt-24" />;
}

// Section number label
function SectionLabel({ number }: { number: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-[10px] font-bold font-mono text-accent/50 tabular-nums">
        {number}
      </span>
      <div className="flex-1 h-px bg-divider" />
    </div>
  );
}

// Section heading
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-heading text-2xl md:text-3xl font-bold text-platinum mb-4"
      style={{ letterSpacing: "-0.025em" }}
    >
      {children}
    </h2>
  );
}

// Body text wrapper
function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-secondary text-sm leading-[1.9] space-y-4 max-w-2xl">
      {children}
    </div>
  );
}

// Callout boxes (tip, warning, note, good, bad)
function Callout({
  type,
  children,
}: {
  type: "tip" | "warning" | "note" | "good" | "bad";
  children: React.ReactNode;
}) {
  // See existing pages for full implementation with icons and colors
}
```

## Interactive Diagram Patterns

### Step-Through Diagram

The most common pattern. Users click through numbered steps.

```tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// Each step tells a story:
const STEPS = [
  {
    title: "Step title",
    description:
      "What happened in this phase, with specific details and numbers.",
    // Visual content for this step
    realWorldNote: "The real lesson: what this means for you.",
  },
];

// Render with step indicators, prev/next controls, AnimatePresence for transitions
// Always include prefers-reduced-motion support
```

### Comparison Diagram

Side-by-side good vs bad examples. See `GoodBadComparison.tsx`.

### Interactive Gallery

Clickable items revealing details. See `InputTypeGallery.tsx`.

### Timeline/History

Chronological progression. See `HTMLTimeMachine.tsx`.

## Content Writing Rules

See [content standards reference](./references/content-standards.md) for complete rules.

Key rules:

1. Write like a senior dev teaching a friend
2. No em-dashes or en-dashes — use periods, commas, colons
3. No AI language patterns ("it is worth noting", "delve into", "robust")
4. Use real company names and specific numbers
5. `&apos;` for quotes in JSX text

## Checklist: New Topic Page

1. [ ] Create `app/(tracks)/{track}/{topic-slug}/page.tsx`
2. [ ] Create `app/(tracks)/{track}/{topic-slug}/components/` directory
3. [ ] Build 3-7 interactive diagram components
4. [ ] Define TOC with 6-10 sections
5. [ ] Implement scroll-spy and reading progress bar
6. [ ] Write all section content following voice guidelines
7. [ ] Add route to `TOPIC_ROUTES` in `lib/constants.ts`
8. [ ] Test keyboard navigation on all interactive elements
9. [ ] Add `prefers-reduced-motion` to all animations
10. [ ] Verify WCAG AAA contrast ratios
