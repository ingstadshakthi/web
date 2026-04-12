---
name: ui-system
description: "Apply the Frontend Mastery premium UI design system. Use when: styling components, designing layouts, choosing colors, setting typography, configuring animations, creating cards or surfaces, building visual hierarchy. Enforces 60/30/10 color science, sharp 0-2px geometry, WCAG AAA contrast, and cinematic animation rules."
argument-hint: "Describe the UI element or layout to design"
---

# UI Design System

## Purpose

Generate premium, high-end user interfaces by applying strict rules of minimalism, sharp geometry, and a constrained "premium gray" color science specific to Frontend Mastery.

## When to Use

- Styling any component or layout
- Choosing colors, borders, shadows, or spacing
- Designing cards, surfaces, containers
- Setting typography hierarchy
- Configuring animations or transitions
- Building responsive layouts
- Creating visual separators or dividers

## Color Science: 60/30/10 Rule

| Role           | Hex                      | Token                           | Usage                    |
| -------------- | ------------------------ | ------------------------------- | ------------------------ |
| 60% Background | `#1A1C1E`                | `bg-deep`                       | Page canvas              |
| 30% Surfaces   | `#282A2D`                | `bg-surface`                    | Cards, elevated areas    |
| Elevated       | `#32353A`                | `bg-elevated`                   | Hover states, active     |
| 10% Accent     | `#B0C4DE`                | `text-accent` / `border-accent` | Links, active highlights |
| Primary Text   | `#F8F9FA`                | `text-platinum`                 | Headings                 |
| Body Text      | `#9CA3AF`                | `text-secondary`                | Paragraphs               |
| Muted Text     | `#6B7280`                | `text-muted`                    | Labels, metadata         |
| Dividers       | `rgba(255,255,255,0.12)` | `border-divider`                | Separators               |

**NEVER** use highly saturated primary colors.

## Geometry

- **Border Radius**: `0px` to `2px`. Sharp edges are the signature. `style={{ borderRadius: "2px" }}`
- **Borders**: `1px` solid, `border-divider` (10-15% white opacity)
- **Shadows**: Avoid. If required: `blur > 30px`, `opacity < 8%`
- **Spacing**: 2x-3x standard padding. Aggressive whitespace.
- **Grid**: 8pt system

## Typography

| Element       | Font             | Classes                                                                                 |
| ------------- | ---------------- | --------------------------------------------------------------------------------------- |
| Page Titles   | Playfair Display | `font-heading text-3xl md:text-5xl font-bold text-platinum` + `letterSpacing: -0.025em` |
| Section Heads | Playfair Display | `font-heading text-2xl md:text-3xl font-bold text-platinum`                             |
| Body          | Inter            | `text-secondary text-sm leading-[1.9]`                                                  |
| Labels        | Inter            | `text-[10px] font-medium uppercase tracking-[0.2em] text-muted`                         |
| Code          | Mono             | `font-mono text-sm` in `bg-surface` container                                           |
| Numbers       | Mono             | `font-mono text-accent/50 tabular-nums`                                                 |

## Animation Contract

```tsx
// Standard transition
style={{ transition: "all 400ms cubic-bezier(0.25, 0.1, 0.25, 1)" }}

// Framer Motion
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
>

// REQUIRED: Reduced motion support
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
// OR in Framer Motion:
<motion.div
  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
  // ...
>
```

**FORBIDDEN**: Bouncy, spring-based, playful, or fast-pop animations.

## Common Patterns

### Card

```tsx
<div className="border border-divider bg-surface/50 px-6 py-5"
     style={{ borderRadius: "2px" }}>
```

### Hover Card

```tsx
<div className="border border-divider bg-surface/50 px-6 py-5 hover:border-accent/40 hover:bg-surface"
     style={{ borderRadius: "2px", transition: "all 400ms cubic-bezier(0.25, 0.1, 0.25, 1)" }}>
```

### Section Divider

```tsx
<div className="h-px bg-divider my-16" />
```

### Badge/Tag

```tsx
<span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted border border-divider px-2 py-1"
      style={{ borderRadius: "2px" }}>
```

### Active State

```tsx
<div className={cn(
  "border border-divider bg-surface/50 px-4 py-3",
  isActive && "border-accent/40 bg-accent/5"
)} style={{ borderRadius: "2px" }}>
```
