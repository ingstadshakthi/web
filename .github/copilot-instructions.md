# Frontend Mastery — Project Guidelines

## Project Overview

Frontend Mastery is a premium, interactive educational platform covering 66 frontend engineering topics across 8 learning tracks. Built with Next.js 16 (App Router), React 19, Tailwind CSS 4, Framer Motion, and GSAP.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19, Turbopack)
- **Styling:** Tailwind CSS 4 with custom design tokens in `app/globals.css`
- **Animation:** Framer Motion for layout transitions and micro-interactions; GSAP for complex timeline and scroll-linked animations
- **UI Library:** Aceternity UI components (Tailwind + Framer Motion based) — always check Aceternity before building custom
- **Component Library:** shadcn/ui with custom dark theme tokens
- **Utilities:** `cn()` from `lib/utils.ts` (clsx + tailwind-merge), Lucide React icons
- **Fonts:** Playfair Display (headings), Inter (body), Geist (sans fallback)

## Commands

```
npm run dev     # Start dev server (Turbopack)
npm run build   # Production build
npm run lint    # ESLint
```

## File Structure Conventions

```
app/(tracks)/           → Topic pages organized by track
  {track}/{topic}/
    page.tsx            → Main topic page (client component with TOC, sections)
    components/         → Interactive diagrams and topic-specific components
app/components/         → App-level shared components (Header, AnimatedCounter)
components/             → Project-level shared components (Breadcrumb, TopicNavigation, ui/)
components/ui/          → shadcn/Aceternity primitives
lib/constants.ts        → TRACKS, TOPIC_ROUTES, FEATURED_TOPICS, SITE_CONFIG
lib/utils.ts            → cn() utility
skills/                 → Domain skill reference documents
```

## Design System Tokens (60/30/10 Rule)

| Role           | Color                    | Token            |
| -------------- | ------------------------ | ---------------- |
| 60% Background | `#1A1C1E`                | `bg-deep`        |
| 30% Surfaces   | `#282A2D`                | `bg-surface`     |
| 10% Accent     | `#B0C4DE`                | `text-accent`    |
| Text Primary   | `#F8F9FA`                | `text-platinum`  |
| Text Secondary | `#9CA3AF`                | `text-secondary` |
| Text Muted     | `#6B7280`                | `text-muted`     |
| Dividers       | `rgba(255,255,255,0.12)` | `border-divider` |

## Code Conventions

- Use `"use client"` only when the component needs interactivity (hooks, event handlers, browser APIs)
- Import motion from `"motion/react"` (not `"framer-motion"`)
- Use `cn()` for all conditional/merged Tailwind classes
- Border radius: `0px` to `2px` maximum (sharp, architectural geometry)
- Animation easing: `cubic-bezier(0.25, 0.1, 0.25, 1)` or `ease-in-out`, duration 300-500ms
- No bouncy or playful animations — fluid and deliberate only
- Always implement `prefers-reduced-motion` for animations
- Aggressive negative space (2x-3x standard padding)
- WCAG AAA contrast for all typography

## Topic Page Pattern

Every topic page follows this structure:

1. TOC sidebar (sticky, with scroll-spy active highlighting)
2. Numbered sections with `SectionAnchor`, `SectionLabel`, `SectionTitle`
3. `Prose` wrapper for body text
4. Interactive diagrams/components per section
5. `Callout` boxes for tips, warnings, notes
6. `CodeBlock` with copy button for code examples

## Content Voice

- Write like a senior dev teaching a friend — direct, conversational, first/second person
- No em-dashes or en-dashes in user-visible text
- Avoid AI-sounding language ("it is worth noting", "delve into", "robust", "comprehensive")
- Use real company names and specific numbers in examples
- Use `&apos;` for quotes in JSX text

## When Adding New Topics

1. Create route at `app/(tracks)/{track}/{topic-slug}/page.tsx`
2. Create interactive components in `app/(tracks)/{track}/{topic-slug}/components/`
3. Add route to `TOPIC_ROUTES` in `lib/constants.ts`
4. Follow the section structure from existing published topics
5. Each topic needs 3-7 interactive diagrams/components

## References

- See `requirements.md` for the full roadmap and remaining work
- See `skills/` directory for domain-specific skill documents
- See existing topic pages for implementation patterns
