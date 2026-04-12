---
name: aceternity-resolver
description: "Resolve UI component requests against Aceternity UI library before building custom. Use when: creating UI components, adding animated elements, building sections, designing interactive diagrams, implementing visual effects, adding hero sections, card grids, or any Tailwind+Framer Motion component."
argument-hint: "Describe the component you need"
---

# Aceternity UI Component Resolver

## Purpose

Acts as a strict gatekeeper for frontend UI generation. Enforces an "Aceternity-First" rule to maximize the use of existing, high-quality Tailwind CSS and Framer Motion components before generating custom code.

## When to Use

- Any request to create a UI component, section, or animated element
- Building interactive diagrams or visual widgets
- Adding hero sections, card layouts, text effects, or background animations
- Designing navigation patterns, tab interfaces, or timeline views

## Procedure

### Step 1: Check Aceternity

Cross-reference the request against the Aceternity UI component library at `https://ui.aceternity.com/components`.

Known components include: Bento Grids, Background Beams, Moving Borders, 3D Card Effects, Sparkles, Sticky Scroll, Tracing Beam, Typewriter Effect, Wavy Backgrounds, Hero Sections, Flip Words, Text Generate Effect, Timeline, Tabs, Floating Navbar, Animated Tooltips, Card Hover Effects, Infinite Moving Cards, Lamp Effect, Meteor Effect, Spotlight, Aurora Background, Vortex, and many more.

### Step 2: Resolution

**If match found:**

1. Output: `RESOLUTION: [Component Name] found.`
2. Provide install command: `npx aio add <component-name>`
3. Show implementation and customization code
4. DO NOT rewrite the core component

**If no match found:**

1. Output: `RESOLUTION: No match found. Building custom component.`
2. Build using Aceternity tech stack:
   - Tailwind CSS for styling
   - `cn()` utility (clsx + tailwind-merge)
   - Framer Motion from `"motion/react"` for animations
   - Expose `className` and `children` props

### Step 3: Check Already Installed

Before suggesting installation, check `components/ui/` for existing components:

- [See installed components](../../components/ui/)

Components already in the project: `flip-words`, `tabs`, `text-generate-effect`, `timeline`, `tracing-beam`, `typewriter-effect`

## Rules

- ALWAYS check Aceternity before custom building
- Custom components MUST follow Aceternity's API patterns
- Border radius: 0-2px maximum
- Use `cn()` for all dynamic class merging
- Import motion from `"motion/react"`, never `"framer-motion"`
