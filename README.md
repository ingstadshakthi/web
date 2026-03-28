# Frontend Mastery

> A deeply researched, framework-agnostic educational platform for frontend engineers. Every concept is taught through interactive diagrams, real-world examples, and step-through animations, not walls of text.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Static Export](https://img.shields.io/badge/Output-Static_Export-orange)](#static-export)

---

## What Is This

Frontend Mastery is a one-stop resource that helps frontend engineers learn, revise, and master the fundamentals that outlast any framework or library.

Every topic page includes:

- **Interactive diagrams** with play/pause step-through animations (DNS resolution, TCP handshakes, TLS negotiation, A/B test experiment flows)
- **Real-world examples** with named companies and real numbers (Booking.com +18% conversion, Obama campaign $60M, Netflix +20-30% play rates)
- **Terminal commands** you can run locally to verify concepts (`dig`, `traceroute`, `curl -v`, `openssl s_client`)
- **Live demos** of browser-native features (HTML5 `<dialog>`, `<meter>`, input type gallery with 12 types)
- **Code comparisons** showing semantic vs non-semantic markup side by side

The entire site is statically generated. No server required. Deploy anywhere.

---

## What's Live

**4 fully published topics** with 16+ interactive components across 2 tracks:

| Track            | Topic                                                                | Interactive Components                                                                                                                                                                                                                                        |
| ---------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Web Fundamentals | [How the Internet Works](/fundamentals/how-internet-works)           | DNS Resolution (7-step walkthrough), TCP 3-Way Handshake (GSAP animated), OSI 7-Layer Model (interactive encapsulation), Packet Journey, 8 terminal commands                                                                                                  |
| Web Fundamentals | [HTTP & HTTPS Deep Dive](/fundamentals/http-https-deep-dive)         | HTTP Message Anatomy (request/response inspector), Status Codes Reference, TLS 1.3 Handshake (4-step animated), 4 curl/openssl commands                                                                                                                       |
| Web Fundamentals | [Semantic HTML](/fundamentals/semantic-html)                         | HTML Time Machine (4-era comparison: 1991/1997/1999/2014), Accessibility Tree Visualizer, Document Outline Checker, Input Type Gallery (12 types), Native `<dialog>` Demo, `<meter>`/`<output>` Calculator, Good vs Bad Comparison (6 categories), Sticky TOC |
| Frontend Testing | [A/B Testing & Experimentation](/testing/ab-testing-experimentation) | Experiment Flow (6-phase Spotify case study), Statistics Visualizer (p-values, sample size, confidence intervals), 4 company case studies, Tools comparison                                                                                                   |

Plus a **landing page** with animated hero, track directory, featured topics grid, and global search (Cmd+K).

---

## Content Roadmap

**7 tracks. 51 topics.** The 4 published topics set the quality bar. Everything below follows the same depth.

### Track 1 — Web Fundamentals (7 topics)

| #   | Topic                          | Status       |
| --- | ------------------------------ | ------------ |
| 1   | How the Internet Works         | ✅ Published |
| 2   | HTTP & HTTPS Deep Dive         | ✅ Published |
| 3   | Semantic HTML                  | ✅ Published |
| 4   | HTML Forms & Validation        | Planned      |
| 5   | SEO Fundamentals               | Planned      |
| 6   | Web Standards & Specifications | Planned      |
| 7   | Web Accessibility              | Planned      |

### Track 2 — JavaScript Deep Dive (8 topics)

| #   | Topic                                  | Status  |
| --- | -------------------------------------- | ------- |
| 1   | Execution Context & Hoisting           | Planned |
| 2   | Closures & Scope Chain                 | Planned |
| 3   | Prototypes & Inheritance               | Planned |
| 4   | The Event Loop & Task Queues           | Planned |
| 5   | Promises, Async/Await & Generators     | Planned |
| 6   | Memory Management & Garbage Collection | Planned |
| 7   | ES2024+ Features                       | Planned |
| 8   | JavaScript Design Patterns             | Planned |

### Track 3 — CSS & UI Engineering (7 topics)

| #   | Topic                                   | Status  |
| --- | --------------------------------------- | ------- |
| 1   | Box Model & Positioning                 | Planned |
| 2   | Flexbox & Grid Layouts                  | Planned |
| 3   | CSS Custom Properties & Cascade Layers  | Planned |
| 4   | Animations, Transitions & Transforms    | Planned |
| 5   | Responsive Design & Container Queries   | Planned |
| 6   | CSS Architecture (BEM, ITCSS, Cube CSS) | Planned |
| 7   | Typography & Color Systems              | Planned |

### Track 4 — Browser Internals & Networking (7 topics)

| #   | Topic                                                    | Status  |
| --- | -------------------------------------------------------- | ------- |
| 1   | How Browsers Render a Page                               | Planned |
| 2   | DOM, CSSOM & Render Tree                                 | Planned |
| 3   | Reflow vs Repaint                                        | Planned |
| 4   | Critical Rendering Path Optimization                     | Planned |
| 5   | HTTP Caching & CDN Strategies                            | Planned |
| 6   | Communication Protocols (REST, GraphQL, WebSockets, SSE) | Planned |
| 7   | Polling, Long Polling & Real-Time Patterns               | Planned |

### Track 5 — Frontend System Design (8 topics)

| #   | Topic                                                    | Status  |
| --- | -------------------------------------------------------- | ------- |
| 1   | Component Design & Composition Patterns                  | Planned |
| 2   | State Management Strategies                              | Planned |
| 3   | Rendering Patterns (CSR, SSR, SSG, ISR)                  | Planned |
| 4   | Micro-Frontends Architecture                             | Planned |
| 5   | Data Fetching & API Integration                          | Planned |
| 6   | Offline Support & Service Workers                        | Planned |
| 7   | Logging, Monitoring & Error Tracking                     | Planned |
| 8   | Design Case Studies (Newsfeed, Video Player, E-Commerce) | Planned |

### Track 6 — Performance & Security (7 topics)

| #   | Topic                                         | Status  |
| --- | --------------------------------------------- | ------- |
| 1   | Core Web Vitals & Lighthouse                  | Planned |
| 2   | Lazy Loading, Virtualization & Code Splitting | Planned |
| 3   | Image Optimization & Asset Delivery           | Planned |
| 4   | Debouncing, Throttling & Memoization          | Planned |
| 5   | Frontend Security (XSS, CSRF, Clickjacking)   | Planned |
| 6   | Content Security Policy & CORS                | Planned |
| 7   | Build Tools, Bundlers & Tree Shaking          | Planned |

### Track 7 — Frontend Testing (8 topics)

| #   | Topic                                  | Status       |
| --- | -------------------------------------- | ------------ |
| 1   | Unit Testing with Vitest & Jest        | Planned      |
| 2   | Component Testing with Testing Library | Planned      |
| 3   | Integration Testing Strategies         | Planned      |
| 4   | End-to-End Testing with Playwright     | Planned      |
| 5   | Performance & Load Testing             | Planned      |
| 6   | A/B Testing & Experimentation          | ✅ Published |
| 7   | Test-Driven Development (TDD)          | Planned      |
| 8   | Testing in CI/CD Pipelines             | Planned      |

---

## Tech Stack

| Layer             | Technology                | Purpose                                                          |
| ----------------- | ------------------------- | ---------------------------------------------------------------- |
| **Framework**     | Next.js 16 (App Router)   | Static export, route groups, React Server Components             |
| **UI**            | React 19.2                | Server Components, View Transitions API                          |
| **Language**      | TypeScript 5              | Type safety across all components and data                       |
| **Styling**       | Tailwind CSS 4            | Utility-first with PostCSS, `cn()` merge utility                 |
| **Animation**     | GSAP 3.14 + @gsap/react   | Timeline-based scroll animations, TCP handshake, TLS walkthrough |
| **Animation**     | Framer Motion 12.35       | Page transitions, layout animations, micro-interactions          |
| **UI Components** | Aceternity UI + shadcn/ui | Tracing Beam, Timeline, Text Generate Effect, Tabs, Typewriter   |
| **Primitives**    | Radix UI                  | Accessible tabs, base UI components                              |
| **Icons**         | Lucide React              | Consistent SVG icon system                                       |
| **Linting**       | ESLint 9                  | Flat config with Next.js rules                                   |

### Design System

| Token         | Value                                 |
| ------------- | ------------------------------------- |
| Background    | `#1A1C1E` (Deep Slate Gray, 60%)      |
| Surfaces      | `#282A2D` (Elevated Charcoal, 30%)    |
| Accent        | `#B0C4DE` (Light Steel Blue, 10%)     |
| Text          | `#F8F9FA` (Crisp Platinum)            |
| Headings      | Playfair Display (serif, 400/600/700) |
| Body          | Inter (sans-serif, 300/400/500/600)   |
| Border Radius | 0-2px (sharp, architectural)          |
| Motion Easing | `cubic-bezier(0.25, 0.1, 0.25, 1)`    |
| Transitions   | 300-500ms                             |

---

## Project Structure

```
web/
├── app/
│   ├── layout.tsx                          # Root layout: fonts, header, footer, metadata
│   ├── page.tsx                            # Landing page: hero, tracks grid, featured topics
│   ├── globals.css                         # Design tokens, custom utilities, keyframes
│   │
│   ├── components/                         # App-level client components
│   │   ├── Header.tsx                      # Sticky header with Cmd+K search across 51 topics
│   │   ├── AnimatedCounter.tsx             # Scroll-triggered number counter (stats section)
│   │   └── TypewriterCycle.tsx             # Rotating text animation (hero)
│   │
│   └── (tracks)/                           # Route group (no URL segment)
│       ├── layout.tsx                      # Breadcrumbs + prev/next topic navigation wrapper
│       │
│       ├── fundamentals/
│       │   ├── how-internet-works/
│       │   │   ├── page.tsx                # URL-to-render journey, 7 sections, terminal commands
│       │   │   └── components/
│       │   │       ├── DNSResolutionDiagram.tsx      # 7-step recursive DNS walkthrough
│       │   │       ├── TCPHandshakeDiagram.tsx       # GSAP-animated SYN/SYN-ACK/ACK
│       │   │       ├── OSILayerDiagram.tsx            # Interactive 7-layer model
│       │   │       └── PacketJourneyDiagram.tsx       # Full request journey animation
│       │   │
│       │   ├── http-https-deep-dive/
│       │   │   ├── page.tsx                # HTTP anatomy, status codes, TLS deep dive
│       │   │   └── components/
│       │   │       ├── HTTPMessageStructureDiagram.tsx  # Request/response inspector
│       │   │       ├── HTTPStatusCodesDiagram.tsx       # 2xx-5xx categorized reference
│       │   │       └── HTTPSAndTLSDiagram.tsx           # TLS 1.3 handshake step-through
│       │   │
│       │   └── semantic-html/
│       │       ├── page.tsx                # 10-section deep dive with sticky TOC
│       │       └── components/
│       │           ├── HTMLTimeMachine.tsx             # 4-era code comparison (1991-2014)
│       │           ├── AccessibilityTreeDiagram.tsx    # Semantic vs div-soup tree view
│       │           ├── DocumentOutlineVisualizer.tsx   # Good vs bad heading hierarchy
│       │           ├── InputTypeGallery.tsx            # 12 HTML5 input types, live demos
│       │           ├── NativeDialogDemo.tsx            # <dialog> showModal + form method
│       │           ├── InteractiveMeterOutput.tsx      # <meter> gauges + loan calculator
│       │           └── GoodBadComparison.tsx           # 6 categories of semantic mistakes
│       │
│       └── testing/
│           └── ab-testing-experimentation/
│               ├── page.tsx                # Full experimentation lifecycle guide
│               └── components/
│                   ├── ABTestFlowDiagram.tsx           # 6-phase Spotify experiment narrative
│                   └── StatisticsConceptsDiagram.tsx   # p-values, sample size, CI visualizer
│
├── components/
│   ├── DynamicBreadcrumb.tsx               # Auto-resolves track/topic from pathname
│   ├── TopicNavigation.tsx                 # Prev/next topic cards with Framer Motion
│   └── ui/                                 # Aceternity + shadcn component library
│       ├── button.tsx                      # CVA button variants
│       ├── tabs.tsx                        # Radix tabs with custom styling
│       ├── timeline.tsx                    # Vertical step-through narrative
│       ├── tracing-beam.tsx                # Scroll-guided content highlight
│       ├── text-generate-effect.tsx        # Animated text reveal
│       ├── typewriter-effect.tsx           # Character-by-character animation
│       └── flip-words.tsx                  # Word rotation effect
│
├── lib/
│   ├── constants.ts                        # 7 tracks, 51 topics, routes, stats, featured topics
│   └── utils.ts                            # cn() — clsx + tailwind-merge
│
├── skills/                                 # AI agent configuration (Copilot custom instructions)
│   ├── frontend_architect.md               # Next.js 16 architecture, caching, GSAP, 3D patterns
│   ├── topic_content_standards.md          # Voice, formatting, complexity levels, real examples
│   ├── ui_architect.md                     # Color science, typography, spacing, motion rules
│   └── aceternity_component_resolver.md    # Aceternity-first component resolution directive
│
├── next.config.ts                          # Static export config
├── components.json                         # shadcn/Aceternity registry config
├── tsconfig.json
├── package.json
└── postcss.config.mjs
```

---

## Interactive Components

Each published topic has custom-built, self-contained interactive components. These are not generic widgets. Each tells a specific story with real data.

### Patterns Used Across All Diagrams

| Pattern                    | Description                                                             |
| -------------------------- | ----------------------------------------------------------------------- |
| **State-Driven Animation** | `useState(currentStep)` drives which phase of the animation is active   |
| **Play/Pause Controls**    | GSAP timelines or Framer intervals with replay, pause, and step-skip    |
| **Progressive Disclosure** | Early steps are simple, later steps reveal deeper complexity            |
| **Real-World Context**     | Named companies, real metrics, actual terminal output                   |
| **Type Safety**            | Full TypeScript interfaces for all step data, config objects, and props |

### Component Inventory

| Component                     | Topic                  | What It Does                                                                                |
| ----------------------------- | ---------------------- | ------------------------------------------------------------------------------------------- |
| `DNSResolutionDiagram`        | How the Internet Works | 7-step recursive DNS lookup: Browser Cache → OS → Router → ISP → Root → TLD → Authoritative |
| `TCPHandshakeDiagram`         | How the Internet Works | GSAP-animated 3-way handshake with SYN/SYN-ACK/ACK arrow animations                         |
| `OSILayerDiagram`             | How the Internet Works | All 7 OSI layers with protocols, data units, and full encapsulation visualization           |
| `PacketJourneyDiagram`        | How the Internet Works | Animated packet path from browser through each network hop                                  |
| `HTTPMessageStructureDiagram` | HTTP & HTTPS Deep Dive | Interactive request/response anatomy with clickable header inspection                       |
| `HTTPStatusCodesDiagram`      | HTTP & HTTPS Deep Dive | Categorized 2xx/3xx/4xx/5xx reference with real-world examples                              |
| `HTTPSAndTLSDiagram`          | HTTP & HTTPS Deep Dive | TLS 1.3 handshake: Client Hello → Server Hello → Key Exchange → Secure Channel              |
| `HTMLTimeMachine`             | Semantic HTML          | Side-by-side code from 4 eras (HTML 1.0, HTML 3.2, HTML 4.01, HTML5) with live preview      |
| `AccessibilityTreeDiagram`    | Semantic HTML          | Visual diff: semantic HTML accessibility tree vs div-soup tree                              |
| `DocumentOutlineVisualizer`   | Semantic HTML          | Good vs bad heading hierarchy with screen reader navigation hints                           |
| `InputTypeGallery`            | Semantic HTML          | 12 HTML5 input types with live demos and mobile keyboard hints                              |
| `NativeDialogDemo`            | Semantic HTML          | Working `<dialog>` with `showModal()`, focus trap, `::backdrop`, `returnValue`              |
| `InteractiveMeterOutput`      | Semantic HTML          | `<meter>` gauges + loan calculator using `<output>`                                         |
| `GoodBadComparison`           | Semantic HTML          | 6 tabbed categories of semantic vs non-semantic code                                        |
| `ABTestFlowDiagram`           | A/B Testing            | 6-phase Spotify Follow Button experiment with real metrics (4.1% vs 5.9%)                   |
| `StatisticsConceptsDiagram`   | A/B Testing            | Interactive p-value, confidence interval, and sample size visualizations                    |

---

## Navigation System

| Feature                  | Description                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| **Global Search**        | Cmd+K / Ctrl+K opens search across all 51 topics. Shows track grouping, "Coming Soon" badges for unpublished topics |
| **Dynamic Breadcrumbs**  | Auto-resolves current track and topic from URL pathname                                                             |
| **Prev/Next Navigation** | Bottom of every topic page. Links to adjacent topics within the same track with Framer Motion transitions           |
| **Featured Topics**      | 12 curated topics on the landing page for quick access                                                              |
| **Track Directory**      | Full 7-track grid on landing page with topic counts and custom SVG icons                                            |

---

## Getting Started

### Prerequisites

- **Node.js** >= 20.9
- **npm** (bundled with Node.js)

### Install & Run

```bash
git clone <repo-url>
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Static Build

```bash
npm run build
npx serve out
```

The `output: 'export'` config in `next.config.ts` generates a fully static `out/` directory. No Node.js server needed in production.

---

## Scripts

| Command         | Description                                |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Start dev server                           |
| `npm run build` | Production build + static export to `out/` |
| `npm start`     | Serve production build locally             |
| `npm run lint`  | Run ESLint checks                          |

---

## Design Principles

1. **Dark-first** — 60/30/10 color rule. Deep Slate Gray background, Charcoal surfaces, Light Steel Blue accents
2. **Sharp geometry** — 0-2px border radius, 1px borders at 10-15% opacity, architectural feel
3. **Typography-driven** — Serif headings (Playfair Display) for personality, sans-serif body (Inter) for readability
4. **Cinematic motion** — `cubic-bezier(0.25, 0.1, 0.25, 1)` easing, 300-500ms durations, no bouncing
5. **Content-first** — Aggressive whitespace, low density, 8pt grid, readable line lengths (1.6-1.8 line-height)
6. **Mobile-responsive** — Fully adaptive from 320px to 4K. Collapsible TOC, responsive grids
7. **Accessible** — WCAG AAA contrast for long study sessions, `prefers-reduced-motion` fallbacks, semantic HTML throughout, keyboard navigation

---

## Content Standards

Every topic follows conventions defined in `skills/topic_content_standards.md`:

- **Voice**: First/second person, conversational. Senior dev teaching a friend
- **Real examples**: Named companies with real numbers. No hypotheticals
- **Interactive diagrams**: Story-driven with specific data, "real lesson" callouts per step
- **No em-dashes** (render inconsistently across systems)
- **Avoid AI patterns**: No "leveraging", "delve into", "cutting edge", or passive voice
- **Section structure**: Definition + Why → Visual/Interactive element → Key insight callout
- **Complexity levels**: Main content accessible to anyone. Optional Advanced sections collapsible with badge

---

## AI Agent Configuration

The `skills/` directory contains Copilot custom instructions that maintain consistency when AI assists with development:

| File                               | Purpose                                                                                                     |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `frontend_architect.md`            | Next.js 16 architecture patterns, caching strategies, GSAP/Framer orchestration, 3D/WebGL, security headers |
| `topic_content_standards.md`       | Writing voice, formatting rules, complexity levels, section structure, interactive diagram patterns         |
| `ui_architect.md`                  | Color science (60/30/10), geometry, spacing (8pt grid), typography scale, motion rules, video optimization  |
| `aceternity_component_resolver.md` | Aceternity-first directive: check library before building custom. Provides CLI commands for installation    |

---

## License

MIT
