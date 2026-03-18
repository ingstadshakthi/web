export const SITE_CONFIG = {
  name: "Frontend Mastery",
  title: "Frontend Mastery — Deep Dive into Frontend Engineering",
  description:
    "A comprehensive, interactive educational platform covering every major frontend engineering topic — from core web fundamentals to advanced system design.",
};

export const NAV_LINKS = [
  { label: "Tracks", href: "#tracks" },
  { label: "Topics", href: "#topics" },
  { label: "About", href: "#about" },
] as const;

export const TRACKS = [
  {
    id: "web-fundamentals",
    name: "Web Fundamentals",
    description:
      "How the internet works, DNS resolution, HTTP protocol, semantic HTML, forms, accessibility attributes, and SEO foundations.",
    topicCount: 6,
    topics: [
      "How the Internet Works",
      "HTTP & HTTPS Deep Dive",
      "Semantic HTML & Accessibility",
      "HTML Forms & Validation",
      "SEO Fundamentals",
      "Web Standards & Specifications",
    ],
  },
  {
    id: "javascript-deep-dive",
    name: "JavaScript Deep Dive",
    description:
      "Execution context, closures, prototypes, event loop, async patterns, memory management, and ES2024+ features.",
    topicCount: 8,
    topics: [
      "Execution Context & Hoisting",
      "Closures & Scope Chain",
      "Prototypes & Inheritance",
      "The Event Loop & Task Queues",
      "Promises, Async/Await & Generators",
      "Memory Management & Garbage Collection",
      "ES2024+ Features",
      "JavaScript Design Patterns",
    ],
  },
  {
    id: "css-ui-engineering",
    name: "CSS & UI Engineering",
    description:
      "Box model, Flexbox, Grid, cascade layers, custom properties, animations, responsive design, and CSS architecture patterns.",
    topicCount: 7,
    topics: [
      "Box Model & Positioning",
      "Flexbox & Grid Layouts",
      "CSS Custom Properties & Cascade Layers",
      "Animations, Transitions & Transforms",
      "Responsive Design & Container Queries",
      "CSS Architecture (BEM, ITCSS, Cube CSS)",
      "Typography & Color Systems",
    ],
  },
  {
    id: "browser-networking",
    name: "Browser Internals & Networking",
    description:
      "Rendering pipeline, DOM/CSSOM construction, reflow vs repaint, critical rendering path, caching, and communication protocols.",
    topicCount: 7,
    topics: [
      "How Browsers Render a Page",
      "DOM, CSSOM & Render Tree",
      "Reflow vs Repaint",
      "Critical Rendering Path Optimization",
      "HTTP Caching & CDN Strategies",
      "Communication Protocols (REST, GraphQL, WebSockets, SSE)",
      "Polling, Long Polling & Real-Time Patterns",
    ],
  },
  {
    id: "frontend-system-design",
    name: "Frontend System Design",
    description:
      "Component architecture, state management patterns, rendering strategies, micro-frontends, data modelling, and real-world design case studies.",
    topicCount: 8,
    topics: [
      "Component Design & Composition Patterns",
      "State Management Strategies",
      "Rendering Patterns (CSR, SSR, SSG, ISR)",
      "Micro-Frontends Architecture",
      "Data Fetching & API Integration",
      "Offline Support & Service Workers",
      "Logging, Monitoring & Error Tracking",
      "Design Case Studies (Newsfeed, Video Player, E-Commerce)",
    ],
  },
  {
    id: "performance-security",
    name: "Performance & Security",
    description:
      "Core Web Vitals, lazy loading, code splitting, tree shaking, XSS/CSRF prevention, CSP headers, and performance profiling.",
    topicCount: 7,
    topics: [
      "Core Web Vitals & Lighthouse",
      "Lazy Loading, Virtualization & Code Splitting",
      "Image Optimization & Asset Delivery",
      "Debouncing, Throttling & Memoization",
      "Frontend Security (XSS, CSRF, Clickjacking)",
      "Content Security Policy & CORS",
      "Build Tools, Bundlers & Tree Shaking",
    ],
  },
  {
    id: "frontend-testing",
    name: "Frontend Testing",
    description:
      "Unit, integration, and end-to-end testing strategies, mocking, test-driven development, performance testing, A/B experimentation, and CI/CD pipeline integration.",
    topicCount: 8,
    topics: [
      "Unit Testing with Vitest & Jest",
      "Component Testing with Testing Library",
      "Integration Testing Strategies",
      "End-to-End Testing with Playwright",
      "Performance & Load Testing",
      "A/B Testing & Experimentation",
      "Test-Driven Development (TDD)",
      "Testing in CI/CD Pipelines",
    ],
  },
] as const;

/** Flat list of ALL topic names across all tracks — used by search */
export const ALL_TOPICS = TRACKS.flatMap((track) =>
  track.topics.map((topic) => ({ topic, trackId: track.id, trackName: track.name }))
);

/**
 * Maps topic names to their actual page routes.
 * Only topics with published pages should be listed here.
 * Used by search, track cards, and featured topics for navigation.
 */
export const TOPIC_ROUTES: Record<string, string> = {
  "How the Internet Works": "/fundamentals/how-internet-works",
  "HTTP & HTTPS Deep Dive": "/fundamentals/http-https-deep-dive",
  "A/B Testing & Experimentation": "/testing/ab-testing-experimentation",
};

export const FEATURED_TOPICS = [
  "The Event Loop & Task Queues",
  "How Browsers Render a Page",
  "Closures & Scope Chain",
  "CSS Custom Properties & Cascade Layers",
  "Core Web Vitals & Lighthouse",
  "Component Design & Composition Patterns",
  "Reflow vs Repaint",
  "State Management Strategies",
  "End-to-End Testing with Playwright",
  "Frontend Security (XSS, CSRF, Clickjacking)",
  "Rendering Patterns (CSR, SSR, SSG, ISR)",
  "Unit Testing with Vitest & Jest",
] as const;

export const STATS = [
  { value: 51, suffix: "", label: "Topics" },
  { value: 7, suffix: "", label: "Learning Tracks" },
  { value: 100, suffix: "%", label: "Frontend Focused" },
] as const;

export const VALUE_PROPS = [
  {
    title: "Structured Learning",
    description:
      "Carefully ordered tracks that build knowledge incrementally — from web fundamentals to advanced frontend system design.",
  },
  {
    title: "Framework Agnostic",
    description:
      "Core concepts that apply everywhere — master the fundamentals and patterns that outlast any framework or library.",
  },
  {
    title: "System Design Depth",
    description:
      "Go beyond syntax — understand component architecture, rendering strategies, performance budgets, and real-world design trade-offs.",
  },
] as const;
