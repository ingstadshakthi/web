---
description: "Use when editing topic page files under app/(tracks)/. Enforces page structure, content voice, section primitives, and interactive diagram patterns for educational topic pages."
applyTo: "app/(tracks)/**/*.tsx"
---

# Topic Page Instructions

## Page Structure

Every topic page must include:

1. `"use client"` directive (topic pages use scroll-spy hooks)
2. TOC array with `{ id, number, title }` entries
3. Scroll-spy implementation with `IntersectionObserver`
4. Reading progress bar using `useScroll`
5. Sticky TOC sidebar (hidden on mobile, `lg:block`)
6. Sections using: `SectionAnchor` → `SectionLabel` → `SectionTitle` → `Prose` → Interactive component → `Callout`

## Content Voice

- Write as a senior dev teaching a friend
- No em-dashes (`—`) or en-dashes (`–`) in user-visible text
- No AI patterns ("it is worth noting", "delve into", "robust", "comprehensive")
- Use real company names and specific numbers
- `&apos;` for quotes in JSX text
- `<strong className="text-platinum">` for 2-4 words max

## Interactive Components

- Each goes in `./components/{DiagramName}.tsx`
- Each is a `"use client"` component
- Must support `prefers-reduced-motion`
- Must be keyboard navigable
- Import motion from `"motion/react"`
- Use `cn()` for dynamic classes
- Border radius: 0-2px only

## Design Tokens

Use only the established design tokens:

- Backgrounds: `bg-deep`, `bg-surface`, `bg-elevated`
- Text: `text-platinum`, `text-secondary`, `text-muted`, `text-accent`
- Borders: `border-divider`, `border-accent`
- Animation: `cubic-bezier(0.25, 0.1, 0.25, 1)`, 300-500ms
