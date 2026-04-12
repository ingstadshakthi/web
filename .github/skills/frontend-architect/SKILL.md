---
name: frontend-architect
description: "Apply Principal Frontend Architect patterns for Next.js 16, React 19, performance optimization, security, and system design. Use when: architecting features, designing component hierarchies, optimizing performance, implementing caching strategies, setting up security headers, planning rendering strategies (SSR/SSG/CSR), configuring Turbopack, implementing 3D/WebGL, managing state, or making HLD/LLD decisions."
argument-hint: "Describe the architectural decision or feature to design"
---

# Frontend Architect

## Purpose

Emulates a Principal Frontend Architect. Produces HLD/LLD breakdowns, enforces Next.js 16 best practices, optimizes for Core Web Vitals, and maintains security baselines.

## When to Use

- Architecting a new feature or page
- Making technology or pattern choices
- Optimizing performance (LCP, CLS, INP)
- Implementing caching strategies
- Setting up security headers or CSP
- Planning rendering strategies
- Designing component hierarchies
- Implementing 3D/WebGL canvases
- Any question about "how should this be structured"

## Architecture Decision Process

For any significant feature:

1. **HLD (High-Level Design)**: What are the major components, their responsibilities, and data flow?
2. **LLD (Low-Level Design)**: What are the specific interfaces, state management, and rendering strategies?
3. **Performance Budget**: What's the impact on LCP, CLS, INP?
4. **Security Review**: Are there XSS vectors, CSP implications, or data exposure risks?

## Next.js 16 Patterns

### Server vs Client Components

```
Default: Server Component (no directive needed)
"use client" ONLY when: hooks, event handlers, browser APIs, Framer Motion, GSAP
```

### Caching

- Use Next.js 16 explicit caching (`use cache` for Cache Components)
- `updateTag()` / `refresh()` for granular cache invalidation
- No guesswork — every cache decision is documented

### Network Boundaries

- Edge routing via `proxy.ts` for lightweight traffic control
- Strict separation of edge and server logic
- CSP and security headers at the edge layer

## Animation Architecture

| Use Case                          | Technology         |
| --------------------------------- | ------------------ |
| Layout transitions                | Framer Motion      |
| Shared element morphing           | Framer Motion      |
| Micro-interactions (hover, press) | Framer Motion      |
| Complex timelines                 | GSAP               |
| Scroll-linked animations          | GSAP ScrollTrigger |
| Heavy sequencing                  | GSAP               |

Both require `prefers-reduced-motion` support.

## Performance Checklist

- [ ] Instant LCP — critical content renders without JS
- [ ] Zero INP — interactions respond in < 200ms
- [ ] No CLS — all dynamic content has reserved space
- [ ] Lazy loaded diagrams via Intersection Observer
- [ ] GSAP tree-shaken (only import used plugins)
- [ ] Font loading: `display: swap` + preload critical fonts
- [ ] Images: Next.js `<Image>` with proper sizing
- [ ] Non-critical JS deferred

## Security Baseline

- Strict TypeScript (no `any`)
- Zod validation at network boundaries
- CSP headers (script-src, style-src, frame-ancestors)
- HSTS and X-Frame-Options headers
- No `dangerouslySetInnerHTML` without sanitization
- No user input reflected without encoding

## State Management Hierarchy

1. **React Server Components** — pass data from server to client naturally
2. **Component-local state** — `useState` / `useReducer` for UI state
3. **URL state** — `useSearchParams` for shareable state
4. **Context** — for deeply nested prop threading (rarely needed)
5. **Zustand** — only for complex client-side interactive state (last resort)

Never reach for a global state library first.

## Testing Strategy

| Layer     | Tool                     | Purpose                     |
| --------- | ------------------------ | --------------------------- |
| E2E       | Playwright               | Critical user flows         |
| Component | Vitest + Testing Library | Component logic             |
| Types     | TypeScript strict mode   | Compile-time safety         |
| Runtime   | Zod                      | Network boundary validation |
