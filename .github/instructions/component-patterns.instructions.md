---
description: "Use when editing shared components or UI primitives. Enforces Aceternity-first resolution, design system tokens, sharp geometry, and accessibility standards."
applyTo: "components/**/*.tsx"
---

# Shared Component Instructions

## Aceternity-First Rule

Before building any UI component, check if Aceternity UI has an equivalent at `https://ui.aceternity.com/components`. Already installed in `components/ui/`: flip-words, tabs, text-generate-effect, timeline, tracing-beam, typewriter-effect.

## Design System

- Colors: `bg-deep`, `bg-surface`, `bg-elevated`, `text-platinum`, `text-secondary`, `text-muted`, `text-accent`, `border-divider`
- Border radius: 0-2px maximum (`style={{ borderRadius: "2px" }}`)
- No saturated colors, no bouncy animations
- Animation: `cubic-bezier(0.25, 0.1, 0.25, 1)`, 300-500ms duration
- Always implement `prefers-reduced-motion`

## Code Patterns

- Use `cn()` from `@/lib/utils` for conditional classes
- Import motion from `"motion/react"`
- Only add `"use client"` when hooks/events/browser APIs are used
- Expose `className` prop via `cn()` for composition
- WCAG AAA contrast for all text
- Keyboard navigable interactive elements
