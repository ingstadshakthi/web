# Requirements

Everything that needs to be built, improved, or considered. Grouped by priority and area.

---

## Remaining Content (47 Topics)

### Web Fundamentals (4 remaining)

- [ ] HTML Forms & Validation
- [ ] SEO Fundamentals
- [ ] Web Standards & Specifications
- [ ] Web Accessibility

### JavaScript Deep Dive (8 topics)

- [ ] Execution Context & Hoisting
- [ ] Closures & Scope Chain
- [ ] Prototypes & Inheritance
- [ ] The Event Loop & Task Queues
- [ ] Promises, Async/Await & Generators
- [ ] Memory Management & Garbage Collection
- [ ] ES2024+ Features
- [ ] JavaScript Design Patterns

### CSS & UI Engineering (7 topics)

- [ ] Box Model & Positioning
- [ ] Flexbox & Grid Layouts
- [ ] CSS Custom Properties & Cascade Layers
- [ ] Animations, Transitions & Transforms
- [ ] Responsive Design & Container Queries
- [ ] CSS Architecture (BEM, ITCSS, Cube CSS)
- [ ] Typography & Color Systems

### Browser Internals & Networking (7 topics)

- [ ] How Browsers Render a Page
- [ ] DOM, CSSOM & Render Tree
- [ ] Reflow vs Repaint
- [ ] Critical Rendering Path Optimization
- [ ] HTTP Caching & CDN Strategies
- [ ] Communication Protocols (REST, GraphQL, WebSockets, SSE)
- [ ] Polling, Long Polling & Real-Time Patterns

### Frontend System Design (8 topics)

- [ ] Component Design & Composition Patterns
- [ ] State Management Strategies
- [ ] Rendering Patterns (CSR, SSR, SSG, ISR)
- [ ] Micro-Frontends Architecture
- [ ] Data Fetching & API Integration
- [ ] Offline Support & Service Workers
- [ ] Logging, Monitoring & Error Tracking
- [ ] Design Case Studies (Newsfeed, Video Player, E-Commerce)

### Performance & Security (7 topics)

- [ ] Core Web Vitals & Lighthouse
- [ ] Lazy Loading, Virtualization & Code Splitting
- [ ] Image Optimization & Asset Delivery
- [ ] Debouncing, Throttling & Memoization
- [ ] Frontend Security (XSS, CSRF, Clickjacking)
- [ ] Content Security Policy & CORS
- [ ] Build Tools, Bundlers & Tree Shaking

### Frontend Testing (7 remaining)

- [ ] Unit Testing with Vitest & Jest
- [ ] Component Testing with Testing Library
- [ ] Integration Testing Strategies
- [ ] End-to-End Testing with Playwright
- [ ] Performance & Load Testing
- [ ] Test-Driven Development (TDD)
- [ ] Testing in CI/CD Pipelines

---

## Interactive Components Needed Per Topic

Each new topic should maintain the quality bar set by the first 4 published topics. Below are the types of interactive components each topic area will likely need. These are starting points, not exhaustive lists.

### HTML Forms & Validation

- [ ] Form validation state machine (valid/invalid/pending states visualized)
- [ ] Constraint Validation API demo (live form with native + custom validation)
- [ ] FormData API interactive explorer
- [ ] Accessible error messaging patterns (aria-describedby, aria-invalid, live regions)

### SEO Fundamentals

- [ ] Crawl budget visualizer (how bots traverse pages)
- [ ] Meta tag anatomy and Open Graph preview
- [ ] Structured data (JSON-LD) live editor with Google Rich Results preview
- [ ] Sitemap and robots.txt interactive builder

### The Event Loop & Task Queues

- [ ] Event loop step-through animation (call stack, microtask queue, macrotask queue, render)
- [ ] setTimeout vs Promise vs requestAnimationFrame ordering demo
- [ ] Task queue priority visualizer

### Closures & Scope Chain

- [ ] Scope chain tree visualizer (stepping through nested functions)
- [ ] Closure memory diagram (what gets captured vs garbage collected)
- [ ] Classic closure gotchas: loop variable demo

### How Browsers Render a Page

- [ ] DOM + CSSOM + Render Tree construction step-through
- [ ] Critical Rendering Path waterfall animation
- [ ] Paint/composite layer visualizer

### Rendering Patterns (CSR, SSR, SSG, ISR)

- [ ] Side-by-side timeline comparison of all 4 patterns (TTFB, FCP, TTI)
- [ ] Hydration visualizer (server HTML + client JS overlay)
- [ ] Decision tree: which pattern for which use case

### Frontend Security

- [ ] XSS attack demo (show injection, then show sanitized version)
- [ ] CSRF flow diagram (forged request visualization)
- [ ] CSP header builder with violation preview
- [ ] CORS preflight request walkthrough

---

## Platform Features

### Search & Discovery

- [ ] Full-text search across topic content (not just titles)
- [ ] Search result previews with content snippets
- [ ] Recently visited topics
- [ ] Topic difficulty indicators (beginner, intermediate, advanced)

### Navigation & Progress

- [ ] Reading progress bar on topic pages
- [ ] User progress tracking (which topics have been read)
- [ ] Estimated read time accuracy improvements
- [ ] Mobile-optimized TOC (the semantic-html sticky TOC pattern extended to all long topics)
- [ ] Cross-track topic linking (e.g., link from "HTTP Caching" to "Critical Rendering Path")

### Content Primitives

- [ ] Collapsible "Optional Advanced" sections (defined in content standards, not yet implemented)
- [ ] Runnable code snippets (inline JavaScript/CSS execution)
- [ ] Copy button for all code blocks
- [ ] Syntax highlighting for code blocks (if not already consistent)

---

## UX & Design

### Theme & Visual

- [ ] Dark/light mode toggle
- [ ] Print stylesheet optimization (interactive diagrams degrade gracefully to static)
- [ ] OG image generation for social sharing (per-topic)
- [ ] Favicon and PWA icons

### Animation & Performance

- [ ] `prefers-reduced-motion` audit across all GSAP and Framer Motion animations
- [ ] Lazy load interactive diagrams (only hydrate when scrolled into view)
- [ ] GSAP tree-shaking audit (ensure only used plugins are bundled)

### Responsive

- [ ] Tablet-specific layout optimizations (current responsive works but could be refined for iPad-width)
- [ ] Landscape mobile handling for interactive diagrams

---

## Technical Improvements

### Build & Deploy

- [ ] CI/CD pipeline setup (build + lint + deploy on push)
- [ ] Static export to hosting platform (Vercel, Cloudflare Pages, Netlify, or GitHub Pages)
- [ ] Sitemap generation for SEO
- [ ] robots.txt configuration
- [ ] 404 page for static export

### Performance

- [ ] Core Web Vitals audit (LCP, CLS, INP)
- [ ] Bundle size analysis (ensure Aceternity components are tree-shaken)
- [ ] Font loading optimization (font-display: swap, preload critical fonts)
- [ ] Image optimization (even with unoptimized: true, ensure proper sizing and formats)

### Accessibility

- [ ] Full WCAG 2.1 AA audit across all published pages
- [ ] Screen reader testing (VoiceOver, NVDA) for all interactive diagrams
- [ ] Keyboard navigation audit for diagrams (play/pause, step through controls)
- [ ] Focus management for search overlay open/close
- [ ] Skip-to-content link

### Code Quality

- [ ] Unit tests for utility functions (cn, constants resolution)
- [ ] Component tests for interactive diagrams (render, step through, accessibility)
- [ ] E2E tests for critical user flows (search, navigate, breadcrumbs)
- [ ] Playwright visual regression tests for diagram components

### SEO

- [ ] Per-topic meta descriptions and titles
- [ ] Canonical URLs
- [ ] JSON-LD structured data (Course, Article schemas)
- [ ] Open Graph and Twitter card meta tags per page

---

## Content Quality Standards

### Per Topic Checklist

Every new topic should hit these marks before shipping:

- [ ] Minimum 2 interactive diagrams with play/pause step-through
- [ ] At least 1 real-world example with named company and real metric
- [ ] Terminal commands section (where applicable)
- [ ] Key takeaways section (6 cards)
- [ ] Proper heading hierarchy (h1 > h2 > h3, no skips)
- [ ] Mobile-responsive diagrams
- [ ] Keyboard-accessible interactive elements
- [ ] No em-dashes, no AI-pattern language
- [ ] Code blocks with copy functionality

---

## Future Considerations

These are longer-term ideas, not immediate priorities.

- [ ] PWA with Service Worker for offline reading
- [ ] Topic bookmarking / favorites
- [ ] Spaced repetition quiz system for retention
- [ ] Community contributions workflow (topic proposals, content PRs)
- [ ] API for topic content (headless CMS potential)
- [ ] i18n support
- [ ] Video walkthroughs embedded in topics
- [ ] "Explain Like I'm 5" mode toggle per section
- [ ] Related topics sidebar recommendations
- [ ] Changelog / "What's New" page for newly published topics
- [ ] RSS feed for new content
- [ ] Analytics (privacy-respecting, e.g., Plausible or Umami)
