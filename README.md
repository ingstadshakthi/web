# 🌐 Frontend Mastery — Deep Dive into Frontend Engineering

> A beautifully crafted, statically generated educational platform built with **Next.js 16**, covering every core frontend engineering concept — from browser internals to system design.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](#license)

---

## 📖 About

**Frontend Mastery** is a comprehensive, framework-agnostic educational platform that covers every core frontend engineering concept in a single, beautifully designed static site. Every page is pre-rendered at build time for blazing-fast performance and can be deployed anywhere.

The goal: **provide a one-stop resource that helps frontend engineers learn, revise, and master the fundamentals that outlast any framework or library.**

---

## 🎯 Project Goals

- **Frontend Focused** — Exclusively covers frontend engineering concepts
- **Framework Agnostic** — Core concepts that apply regardless of your framework choice
- **Static & Fast** — All pages statically generated (`output: 'export'`) for instant load times
- **Interactive** — Live code playgrounds, quizzes, and visual demos embedded in content
- **Searchable** — Global search bar with ⌘K shortcut to find any topic instantly
- **Beautiful UI** — Premium dark design with smooth animations and responsive layouts
- **SEO Optimized** — Proper meta tags, structured headings, and semantic HTML
- **Accessible** — WCAG 2.1 AA compliant with keyboard navigation and screen reader support

---

## 📚 Content Topics

The platform is organized into **6 learning tracks** with 43 individual topic pages. Each topic includes theory, visual diagrams, code examples, and practice exercises.

### 🏗️ Track 1 — Web Fundamentals

| # | Topic |
|---|-------|
| 1 | How the Internet Works |
| 2 | HTTP & HTTPS Deep Dive |
| 3 | Semantic HTML & Accessibility |
| 4 | HTML Forms & Validation |
| 5 | SEO Fundamentals |
| 6 | Web Standards & Specifications |

### ⚡ Track 2 — JavaScript Deep Dive

| # | Topic |
|---|-------|
| 7 | Execution Context & Hoisting |
| 8 | Closures & Scope Chain |
| 9 | Prototypes & Inheritance |
| 10 | The Event Loop & Task Queues |
| 11 | Promises, Async/Await & Generators |
| 12 | Memory Management & Garbage Collection |
| 13 | ES2024+ Features |
| 14 | JavaScript Design Patterns |

### 🎨 Track 3 — CSS & UI Engineering

| # | Topic |
|---|-------|
| 15 | Box Model & Positioning |
| 16 | Flexbox & Grid Layouts |
| 17 | CSS Custom Properties & Cascade Layers |
| 18 | Animations, Transitions & Transforms |
| 19 | Responsive Design & Container Queries |
| 20 | CSS Architecture (BEM, ITCSS, Cube CSS) |
| 21 | Typography & Color Systems |

### 🖥️ Track 4 — Browser Internals & Networking

| # | Topic |
|---|-------|
| 22 | How Browsers Render a Page |
| 23 | DOM, CSSOM & Render Tree |
| 24 | Reflow vs Repaint |
| 25 | Critical Rendering Path Optimization |
| 26 | HTTP Caching & CDN Strategies |
| 27 | Communication Protocols (REST, GraphQL, WebSockets, SSE) |
| 28 | Polling, Long Polling & Real-Time Patterns |

### 🧠 Track 5 — Frontend System Design

| # | Topic |
|---|-------|
| 29 | Component Design & Composition Patterns |
| 30 | State Management Strategies |
| 31 | Rendering Patterns (CSR, SSR, SSG, ISR) |
| 32 | Micro-Frontends Architecture |
| 33 | Data Fetching & API Integration |
| 34 | Offline Support & Service Workers |
| 35 | Logging, Monitoring & Error Tracking |
| 36 | Design Case Studies (Newsfeed, Video Player, E-Commerce) |

### 🚀 Track 6 — Performance & Security

| # | Topic |
|---|-------|
| 37 | Core Web Vitals & Lighthouse |
| 38 | Lazy Loading, Virtualization & Code Splitting |
| 39 | Image Optimization & Asset Delivery |
| 40 | Debouncing, Throttling & Memoization |
| 41 | Frontend Security (XSS, CSRF, Clickjacking) |
| 42 | Content Security Policy & CORS |
| 43 | Build Tools, Bundlers & Tree Shaking |

---

## 🏛️ Project Architecture

```
web/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (nav, footer, theme)
│   ├── page.tsx                  # Landing / home page
│   ├── globals.css               # Global styles & design system
│   │
│   ├── components/               # Client components
│   │   ├── Header.tsx            # Sticky header with search bar
│   │   ├── AnimatedCounter.tsx   # Scroll-triggered counter
│   │   └── ScrollReveal.tsx      # Intersection Observer fade-in
│   │
│   ├── tracks/                   # Learning tracks overview page
│   │   └── page.tsx
│   │
│   └── topics/                   # Individual topic pages
│       ├── [slug]/
│       │   └── page.tsx
│       └── page.tsx
│
├── lib/                          # Utility functions & constants
│   └── constants.ts              # Site config, tracks, topics data
│
├── content/                      # Markdown/MDX content files
│   └── topics/                   # Individual topic .mdx files
│
├── public/                       # Static assets
│
├── skills/                       # AI skill definitions
│   ├── ui_architect.md           # UI design system rules
│   └── frontend_architect.md     # Architecture & engineering rules
│
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies & scripts
└── README.md                     # This file
```

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 16 | App Router, static export, Turbopack |
| **UI Library** | React 19.2 | Server Components, View Transitions |
| **Language** | TypeScript 5 | Type safety, enhanced DX |
| **Styling** | Tailwind CSS 4 | Utility-first, JIT, zero-runtime |
| **Content** | MDX | Markdown + JSX for rich content |
| **Animations** | CSS + IntersectionObserver | Zero-dependency scroll reveals |
| **Linting** | ESLint 9 | Flat config, Next.js rules |

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** ≥ 20.9
- **npm** (bundled with Node.js)

### Installation

```bash
git clone https://github.com/your-username/web.git
cd web
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Static Build

```bash
npm run build
npx serve out
```

---

## 🔧 Configuration for Static Export

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

---

## 🎨 Design Principles

1. **Dark-first design** — Rich dark theme (60/30/10 color rule)
2. **Sharp geometry** — 0-2px border radius, architectural feel
3. **Typography-driven** — Playfair Display headings / Inter body text
4. **Cinematic motion** — 300-500ms transitions, cubic-bezier easing
5. **Content-focused** — Generous whitespace, readable line lengths
6. **Mobile-responsive** — Fully adaptive from 320px to 4K displays
7. **Accessible** — `prefers-reduced-motion` support, WCAG AAA contrast

---

## 🗺️ Roadmap

### Phase 1 — Foundation *(Current)*
- [x] Project scaffolding with Next.js 16
- [x] Design system & component library
- [x] Layout structure (header with search, footer)
- [x] Landing page with track overview
- [ ] MDX pipeline setup with syntax highlighting
- [ ] Static export configuration

### Phase 2 — Core Content
- [ ] Track 1: Web Fundamentals (6 topics)
- [ ] Track 2: JavaScript Deep Dive (8 topics)
- [ ] Track 3: CSS & UI Engineering (7 topics)
- [ ] Interactive code playground component
- [ ] Table of contents sidebar for each topic

### Phase 3 — Advanced Content
- [ ] Track 4: Browser Internals & Networking (7 topics)
- [ ] Track 5: Frontend System Design (8 topics)
- [ ] Track 6: Performance & Security (7 topics)
- [ ] Quiz engine with progress tracking
- [ ] Diagram rendering with Mermaid.js

### Phase 4 — Polish & Launch
- [ ] Dark/light theme toggle
- [ ] SEO optimization (OG images, sitemap)
- [ ] PWA support (offline access)
- [ ] Performance audit
- [ ] Deploy to production

---

## 📜 Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build + static export |
| `npm run start` | Serve production build locally |
| `npm run lint` | Run ESLint checks |

---

## 🤝 Contributing

Contributions are welcome! Whether it's fixing a typo, adding a new topic, or improving the UI:

1. Fork the repository
2. Create a feature branch (`git checkout -b topic/event-loop`)
3. Commit your changes (`git commit -m 'Add event loop deep dive'`)
4. Push to the branch (`git push origin topic/event-loop`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ using Next.js 16 · React 19 · TypeScript · Tailwind CSS
</p>
