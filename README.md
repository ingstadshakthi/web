# 🌐 WebDev Mastery — The Interactive Web Encyclopedia

> A beautifully crafted, statically generated educational platform built with **Next.js 16**, covering every major web development topic — from fundamentals to advanced architecture.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](#license)

---

## 📖 About

**WebDev Mastery** is a comprehensive, interactive educational platform that covers all major web development topics in a single, beautifully designed static site. Every page is pre-rendered at build time for blazing-fast performance and can be deployed anywhere — GitHub Pages, Vercel, Netlify, or any static file server.

The goal is simple: **provide a one-stop resource that helps developers learn, revise, and master web technologies** through well-structured content, interactive code examples, and visual explanations.

---

## 🎯 Project Goals

- **Educational First** — Deep, accurate content written for developers at all levels
- **Static & Fast** — All pages statically generated (`output: 'export'`) for instant load times
- **Interactive** — Live code playgrounds, quizzes, and visual demos embedded in content
- **Beautiful UI** — Premium design with dark mode, smooth animations, and responsive layouts
- **SEO Optimized** — Proper meta tags, structured headings, and semantic HTML on every page
- **Accessible** — WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Open Source** — Community contributions welcome

---

## 📚 Content Topics

The platform is organized into **learning tracks** with individual topic pages. Each topic includes theory, visual diagrams, code examples, and practice exercises.

### 🏗️ Track 1 — Web Fundamentals

| # | Topic | Description |
|---|-------|-------------|
| 1 | **How the Internet Works** | DNS, TCP/IP, HTTP/HTTPS, request-response cycle, CDNs |
| 2 | **How Browsers Work** | Parsing, rendering pipeline, CSSOM, DOM tree, layout & paint |
| 3 | **HTML Deep Dive** | Semantic elements, forms, accessibility attributes, meta tags |
| 4 | **CSS Mastery** | Box model, flexbox, grid, animations, custom properties, cascade layers |
| 5 | **JavaScript Essentials** | Event loop, closures, prototypes, ES2024+ features, modules |

### 🎨 Track 2 — Frontend Development

| # | Topic | Description |
|---|-------|-------------|
| 6 | **DOM Manipulation** | Querying, events, mutation observers, virtual DOM concept |
| 7 | **Responsive Design** | Media queries, fluid typography, container queries, mobile-first |
| 8 | **CSS Architecture** | BEM, CSS Modules, Tailwind CSS, CSS-in-JS patterns |
| 9 | **React Fundamentals** | Components, hooks, state management, JSX, rendering lifecycle |
| 10 | **Advanced React Patterns** | Compound components, render props, HOCs, React 19 features |
| 11 | **State Management** | Context API, Zustand, Redux Toolkit, Jotai, signals |
| 12 | **TypeScript for the Web** | Type systems, generics, utility types, type-safe APIs |

### ⚙️ Track 3 — Backend & Full-Stack

| # | Topic | Description |
|---|-------|-------------|
| 13 | **Node.js & Runtime** | Event loop, streams, worker threads, Bun vs Deno vs Node |
| 14 | **REST API Design** | HTTP methods, status codes, versioning, HATEOAS, OpenAPI/Swagger |
| 15 | **GraphQL** | Schema design, queries, mutations, subscriptions, Apollo/Relay |
| 16 | **Databases** | SQL vs NoSQL, PostgreSQL, MongoDB, Redis, ORMs (Prisma, Drizzle) |
| 17 | **Authentication & Security** | OAuth 2.0, JWT, sessions, CORS, CSP, XSS, CSRF protection |
| 18 | **Server-Side Rendering** | SSR vs SSG vs ISR, hydration, streaming, React Server Components |

### 🚀 Track 4 — Modern Tooling & DevOps

| # | Topic | Description |
|---|-------|-------------|
| 19 | **Build Tools & Bundlers** | Webpack, Vite, Turbopack, esbuild, tree shaking, code splitting |
| 20 | **Package Managers** | npm, pnpm, Yarn, dependency resolution, lockfiles, monorepos |
| 21 | **Testing** | Unit, integration, E2E testing, Vitest, Playwright, Testing Library |
| 22 | **CI/CD Pipelines** | GitHub Actions, linting, automated testing, deployment workflows |
| 23 | **Containerization** | Docker, Docker Compose, multi-stage builds, container registries |
| 24 | **Cloud & Deployment** | Vercel, AWS, GCP, serverless functions, edge computing |

### 🧠 Track 5 — Advanced Concepts

| # | Topic | Description |
|---|-------|-------------|
| 25 | **Web Performance** | Core Web Vitals, lazy loading, caching strategies, image optimization |
| 26 | **Web Accessibility (a11y)** | ARIA, screen readers, color contrast, focus management |
| 27 | **Progressive Web Apps** | Service workers, manifest, offline support, push notifications |
| 28 | **WebSockets & Real-Time** | WebSocket API, Server-Sent Events, Socket.io, real-time patterns |
| 29 | **Web APIs** | Intersection Observer, Web Workers, Storage APIs, Geolocation, Canvas |
| 30 | **Micro-Frontends** | Module federation, single-spa, iframe-based, design system sharing |
| 31 | **Web3 & Decentralized Web** | Blockchain basics, smart contracts, IPFS, wallet integration |
| 32 | **AI on the Web** | TensorFlow.js, WebLLM, AI-assisted UX, prompt engineering for devs |

---

## 🏛️ Project Architecture

```
web/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (nav, footer, theme)
│   ├── page.tsx                  # Landing / home page
│   ├── globals.css               # Global styles & Tailwind imports
│   │
│   ├── tracks/                   # Learning tracks overview page
│   │   └── page.tsx
│   │
│   ├── topics/                   # Individual topic pages
│   │   ├── [slug]/               # Dynamic route for each topic
│   │   │   └── page.tsx          # Topic detail page (statically generated)
│   │   └── page.tsx              # Topics listing / search page
│   │
│   ├── playground/               # Interactive code playground
│   │   └── page.tsx
│   │
│   ├── quiz/                     # Quiz section
│   │   ├── [topic]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   │
│   └── about/                    # About the project
│       └── page.tsx
│
├── components/                   # Reusable UI components
│   ├── ui/                       # Primitives (Button, Card, Badge, etc.)
│   ├── layout/                   # Header, Footer, Sidebar, Navigation
│   ├── content/                  # CodeBlock, DiagramViewer, Quiz, etc.
│   └── shared/                   # SEO Head, Theme Toggle, ScrollToTop
│
├── content/                      # Markdown/MDX content files
│   ├── tracks/                   # Track metadata (JSON/YAML)
│   └── topics/                   # Individual topic .mdx files
│       ├── how-the-internet-works.mdx
│       ├── how-browsers-work.mdx
│       ├── html-deep-dive.mdx
│       └── ...
│
├── lib/                          # Utility functions & helpers
│   ├── content.ts                # MDX parsing, frontmatter extraction
│   ├── constants.ts              # Site metadata, navigation config
│   └── utils.ts                  # General utility functions
│
├── public/                       # Static assets
│   ├── images/                   # Topic illustrations, diagrams
│   ├── icons/                    # Custom SVG icons
│   └── og/                       # Open Graph images for social sharing
│
├── styles/                       # Additional style modules (if needed)
│
├── next.config.ts                # Next.js configuration (static export)
├── tailwind.config.ts            # Tailwind CSS customization
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies & scripts
└── README.md                     # This file
```

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 16 | App Router, static export, Turbopack, Cache Components |
| **UI Library** | React 19.2 | Server Components, View Transitions, `<Activity>` |
| **Language** | TypeScript 5 | Type safety, enhanced DX, better refactoring |
| **Styling** | Tailwind CSS 4 | Utility-first, JIT, zero-runtime, design tokens |
| **Content** | MDX | Markdown + JSX for rich, interactive content pages |
| **Code Highlighting** | Shiki / Rehype Pretty Code | Beautiful syntax highlighting with theme support |
| **Animations** | Framer Motion | Spring-based, layout animations, view transitions |
| **Diagrams** | Mermaid.js | Flowcharts, sequence diagrams, architecture visuals |
| **Icons** | Lucide React | Consistent, accessible SVG icon set |
| **Linting** | ESLint 9 | Flat config, Next.js rules |
| **Deployment** | Vercel / Static Export | Zero-config deploy or host anywhere as static files |

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** ≥ 20.9 (you're on v24.6.0 ✅)
- **npm** (bundled with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/web.git
cd web

# Install dependencies
npm install
```

### Development

```bash
# Start the dev server (Turbopack enabled by default)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Static Build

```bash
# Generate static export
npm run build

# The output will be in the `out/` directory
# Serve it locally to test:
npx serve out
```

### Linting

```bash
npm run lint
```

---

## 🔧 Configuration for Static Export

To enable full static export, update `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",         // Enable static HTML export
  images: {
    unoptimized: true,      // Required for static export (no image optimization server)
  },
};

export default nextConfig;
```

---

## 📝 Content Authoring

Each topic is written as an **MDX file** in the `content/topics/` directory with frontmatter metadata:

```mdx
---
title: "How the Internet Works"
slug: "how-the-internet-works"
track: "web-fundamentals"
order: 1
description: "Understand DNS, TCP/IP, HTTP, and the full request-response lifecycle."
tags: ["internet", "dns", "http", "networking"]
difficulty: "beginner"
readTime: "12 min"
lastUpdated: "2026-03-10"
---

# How the Internet Works

When you type a URL into your browser, a fascinating chain of events unfolds...

<CodeBlock language="http">
GET /index.html HTTP/1.1
Host: example.com
</CodeBlock>

<Diagram type="sequence">
  Browser->DNS: Resolve domain
  DNS->Browser: Return IP
  Browser->Server: TCP handshake
  Server->Browser: HTML response
</Diagram>

<Quiz
  question="What protocol does HTTPS use for encryption?"
  options={["SSL", "TLS", "SSH", "FTP"]}
  answer={1}
/>
```

---

## 🎨 Design Principles

1. **Dark-first design** — Rich dark theme as default with a light mode toggle
2. **Typography-driven** — Clean type hierarchy using Inter / JetBrains Mono
3. **Glassmorphism accents** — Frosted glass cards and overlays for depth
4. **Micro-animations** — Subtle hover effects, page transitions, scroll reveals
5. **Content-focused** — Generous whitespace, readable line lengths (65–75 chars)
6. **Mobile-responsive** — Fully adaptive from 320px to 4K displays

---

## 🗺️ Roadmap

### Phase 1 — Foundation *(Current)*
- [x] Project scaffolding with Next.js 16
- [ ] Design system & component library
- [ ] Layout structure (header, sidebar, footer)
- [ ] Landing page with track overview
- [ ] MDX pipeline setup with syntax highlighting
- [ ] Static export configuration

### Phase 2 — Core Content
- [ ] Track 1: Web Fundamentals (5 topics)
- [ ] Track 2: Frontend Development (7 topics)
- [ ] Interactive code playground component
- [ ] Search functionality across all topics
- [ ] Table of contents sidebar for each topic

### Phase 3 — Advanced Features
- [ ] Track 3: Backend & Full-Stack (6 topics)
- [ ] Track 4: Modern Tooling & DevOps (6 topics)
- [ ] Quiz engine with progress tracking (localStorage)
- [ ] Diagram rendering with Mermaid.js
- [ ] Reading progress indicator

### Phase 4 — Polish & Launch
- [ ] Track 5: Advanced Concepts (8 topics)
- [ ] Dark/light theme with system preference detection
- [ ] SEO optimization (OG images, meta tags, sitemap)
- [ ] PWA support (offline access to content)
- [ ] Performance audit & optimization
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
2. Create a feature branch (`git checkout -b topic/web-performance`)
3. Commit your changes (`git commit -m 'Add web performance topic'`)
4. Push to the branch (`git push origin topic/web-performance`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ using Next.js 16 · React 19 · TypeScript · Tailwind CSS
</p>
