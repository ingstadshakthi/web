---
description: "Use when editing CSS, globals.css, or Tailwind configuration. Enforces design tokens, 60/30/10 color science, custom properties, and Tailwind CSS 4 patterns."
applyTo: ["**/*.css", "postcss.config.mjs"]
---

# Styling Instructions

## Design Tokens

All colors are defined as CSS custom properties in `app/globals.css` and as Tailwind `@theme` tokens:

```
--bg-deep: #1A1C1E        → bg-deep
--bg-surface: #282A2D     → bg-surface
--bg-elevated: #32353A    → bg-elevated
--accent: #B0C4DE         → text-accent, border-accent
--platinum: #F8F9FA       → text-platinum
--secondary: #9CA3AF      → text-secondary
--muted: #6B7280          → text-muted
--divider: rgba(255,255,255,0.12) → border-divider
```

## Rules

- Never introduce new color values outside the established palette
- Use CSS custom properties for any new tokens
- Border radius: 0-2px maximum project-wide
- Animation easing: `var(--ease)` = `cubic-bezier(0.25, 0.1, 0.25, 1)`
- Font stacks: `var(--font-heading)` for Playfair, `var(--font-body)` for Inter
- shadcn tokens are overridden for dark-first theme in `:root`
