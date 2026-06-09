"use client";

import { motion } from "motion/react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import LeakyBucketDiagram from "./components/LeakyBucketDiagram";
import TokenBucketDiagram from "./components/TokenBucketDiagram";
import FixedWindowCounterDiagram from "./components/FixedWindowCounterDiagram";
import SlidingWindowLogDiagram from "./components/SlidingWindowLogDiagram";
import SlidingWindowCounterDiagram from "./components/SlidingWindowCounterDiagram";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const TAKEAWAYS = [
  {
    title: "No single algorithm wins everywhere",
    description:
      "Leaky bucket smooths traffic, token bucket allows bursts, fixed window is simple but bursty at edges, sliding window is precise but memory-heavy.",
    icon: "⚖️",
  },
  {
    title: "Memory vs accuracy is always the tradeoff",
    description:
      "Sliding window log gives perfect accuracy but stores every timestamp. Sliding window counter approximates with two counters and almost no memory.",
    icon: "🧠",
  },
  {
    title: "Distributed rate limiting is harder",
    description:
      "Single-server limiters are straightforward. Once you scale to multiple nodes, you need Redis or a shared store to sync counters across instances.",
    icon: "🌐",
  },
  {
    title: "Burst tolerance is a product decision",
    description:
      "Token bucket lets users spend saved-up tokens in quick bursts. Leaky bucket enforces a strict constant output. Choose based on your user experience goals.",
    icon: "💡",
  },
  {
    title: "Always return proper headers",
    description:
      "X-RateLimit-Remaining and Retry-After headers let clients back off gracefully instead of hammering your API blindly until they get through.",
    icon: "📬",
  },
  {
    title: "Rate limiting protects your users too",
    description:
      "Without limits, one misbehaving client can starve everyone else. Rate limiting is as much about fairness as it is about security.",
    icon: "🛡️",
  },
];

export default function RateLimitingPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="dot-grid-bg absolute inset-0" aria-hidden="true" />
        <div
          className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(circle, rgba(176,196,222,0.05) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-xs font-medium uppercase tracking-[0.25em] text-muted whitespace-nowrap overflow-hidden text-ellipsis px-2"
          >
            Performance &amp; Security · Rate Limiting Algorithms
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.1,
            }}
            className="mt-6 font-heading text-4xl font-bold text-platinum md:text-5xl lg:text-6xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Rate Limiting
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2,
            }}
            className="mt-6 mx-auto max-w-xl"
          >
            <TextGenerateEffect
              words="Every API has limits. The difference between a graceful 429 and a crashed server comes down to which algorithm you pick and how you implement it."
              className="!font-normal !text-secondary"
              duration={0.3}
              filter={false}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-8 flex items-center justify-center gap-4 text-xs text-muted flex-wrap px-4"
          >
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              18 min read
            </span>
            <span className="hidden sm:block w-px h-3 bg-divider" />
            <span className="whitespace-nowrap">5 Algorithms</span>
            <span className="hidden sm:block w-px h-3 bg-divider" />
            <span className="whitespace-nowrap">Interactive Simulations</span>
          </motion.div>
        </div>
      </section>

      <div className="section-glow-divider" aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════
          MAIN CONTENT
          ═══════════════════════════════════════════════════════ */}
      <TracingBeam className="px-6 py-16 md:py-24">
        {/* ── Section 1: Leaky Bucket ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader
            number="01"
            title="Leaky Bucket"
            subtitle="A constant drip, no matter the flood."
          />

          <p
            className="text-sm text-secondary leading-relaxed mb-4 max-w-2xl"
            style={{ lineHeight: "1.8" }}
          >
            Imagine a bucket with a small hole at the bottom. You can pour water
            in at any rate, but it always drains out at a{" "}
            <strong className="text-platinum">fixed, constant rate</strong>. If
            you pour too fast and the bucket overflows, those requests are
            dropped.
          </p>
          <p
            className="text-sm text-secondary leading-relaxed mb-10 max-w-2xl"
            style={{ lineHeight: "1.8" }}
          >
            This is what network routers use for traffic shaping. It guarantees
            a smooth, predictable output rate regardless of how bursty the input
            is. The downside? Even if the system is idle, saved-up capacity
            doesn&apos;t let you process a sudden burst faster.
          </p>

          <LeakyBucketDiagram />

          <div
            className="mt-8 p-5 border-l-2 border-accent bg-accent/5 max-w-2xl"
            style={{ borderRadius: "0 2px 2px 0" }}
          >
            <h5 className="text-platinum text-xs font-bold uppercase tracking-widest mb-2">
              Node.js Implementation
            </h5>
            <pre className="text-xs font-mono text-secondary leading-relaxed overflow-x-auto whitespace-pre">{`class LeakyBucketRateLimiter {
  constructor(capacity, leakRate) {
    this.capacity = capacity;     // Max queue size
    this.leakRate = leakRate;     // Requests drained per second
    this.queue = 0;
    this.lastLeakTime = Date.now();
  }

  leak() {
    const now = Date.now();
    const elapsed = (now - this.lastLeakTime) / 1000;
    const leaked = Math.floor(elapsed * this.leakRate);
    if (leaked > 0) {
      this.queue = Math.max(0, this.queue - leaked);
      this.lastLeakTime = now;
    }
  }

  allowRequest() {
    this.leak();
    if (this.queue < this.capacity) {
      this.queue++;
      return true;
    }
    return false; // Bucket full, reject
  }
}`}</pre>
          </div>
        </motion.section>

        {/* ── Section 2: Token Bucket ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader
            number="02"
            title="Token Bucket"
            subtitle="Save tokens, spend them in bursts."
          />

          <p
            className="text-sm text-secondary leading-relaxed mb-4 max-w-2xl"
            style={{ lineHeight: "1.8" }}
          >
            Think of it like a prepaid meter. Tokens are added to a bucket at a
            steady rate. Each request costs one token. If tokens are available,
            the request goes through instantly. If the bucket is empty, the
            request is rejected.
          </p>
          <p
            className="text-sm text-secondary leading-relaxed mb-10 max-w-2xl"
            style={{ lineHeight: "1.8" }}
          >
            The key difference from leaky bucket: if no requests come in for a
            while, tokens accumulate up to the bucket&apos;s capacity. Then a
            sudden burst of requests can all be served immediately. This is what{" "}
            <strong className="text-platinum">AWS API Gateway</strong> and{" "}
            <strong className="text-platinum">Stripe</strong> use because it
            provides a better user experience for legitimate traffic patterns.
          </p>

          <TokenBucketDiagram />

          <div
            className="mt-8 p-5 border-l-2 border-accent bg-accent/5 max-w-2xl"
            style={{ borderRadius: "0 2px 2px 0" }}
          >
            <h5 className="text-platinum text-xs font-bold uppercase tracking-widest mb-2">
              Node.js Implementation
            </h5>
            <pre className="text-xs font-mono text-secondary leading-relaxed overflow-x-auto whitespace-pre">{`class TokenBucketRateLimiter {
  constructor(capacity, refillRate) {
    this.capacity = capacity;       // Max tokens
    this.refillRate = refillRate;   // Tokens added per second
    this.tokens = capacity;         // Start full
    this.lastRefillTime = Date.now();
  }

  refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefillTime) / 1000;
    const newTokens = elapsed * this.refillRate;
    this.tokens = Math.min(this.capacity, this.tokens + newTokens);
    this.lastRefillTime = now;
  }

  allowRequest(tokensNeeded = 1) {
    this.refill();
    if (this.tokens >= tokensNeeded) {
      this.tokens -= tokensNeeded;
      return true;
    }
    return false; // Not enough tokens
  }
}`}</pre>
          </div>
        </motion.section>

        {/* ── Section 3: Fixed Window Counter ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader
            number="03"
            title="Fixed Window Counter"
            subtitle="Simple counting with hard resets."
          />

          <p
            className="text-sm text-secondary leading-relaxed mb-4 max-w-2xl"
            style={{ lineHeight: "1.8" }}
          >
            The simplest approach. Divide time into fixed windows (say, 1-minute
            intervals). Count requests in the current window. If the count
            exceeds the limit, reject until the window resets.
          </p>
          <p
            className="text-sm text-secondary leading-relaxed mb-10 max-w-2xl"
            style={{ lineHeight: "1.8" }}
          >
            The problem?{" "}
            <strong className="text-platinum">Boundary bursts.</strong> A user
            can send 100 requests at 11:59:59 and another 100 at 12:00:01,
            effectively getting 200 requests in 2 seconds while the limit is
            &quot;100 per minute.&quot; GitHub&apos;s older API rate limiter had
            this exact issue.
          </p>

          <FixedWindowCounterDiagram />

          <div
            className="mt-8 p-5 border-l-2 border-accent bg-accent/5 max-w-2xl"
            style={{ borderRadius: "0 2px 2px 0" }}
          >
            <h5 className="text-platinum text-xs font-bold uppercase tracking-widest mb-2">
              Node.js Implementation
            </h5>
            <pre className="text-xs font-mono text-secondary leading-relaxed overflow-x-auto whitespace-pre">{`class FixedWindowRateLimiter {
  constructor(windowMs, maxRequests) {
    this.windowMs = windowMs;         // Window duration in ms
    this.maxRequests = maxRequests;
    this.windows = new Map();         // key -> { count, windowStart }
  }

  allowRequest(key) {
    const now = Date.now();
    const record = this.windows.get(key);
    const windowStart = Math.floor(now / this.windowMs) * this.windowMs;

    if (!record || record.windowStart !== windowStart) {
      this.windows.set(key, { count: 1, windowStart });
      return true;
    }

    if (record.count < this.maxRequests) {
      record.count++;
      return true;
    }

    return false; // Limit exceeded for this window
  }
}`}</pre>
          </div>
        </motion.section>

        {/* ── Section 4: Sliding Window Log ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader
            number="04"
            title="Sliding Window Log"
            subtitle="Perfect accuracy, every timestamp remembered."
          />

          <p
            className="text-sm text-secondary leading-relaxed mb-4 max-w-2xl"
            style={{ lineHeight: "1.8" }}
          >
            Instead of counting within fixed boundaries, store the exact
            timestamp of every request. When a new request comes in, discard all
            timestamps older than the window duration, then count what remains.
          </p>
          <p
            className="text-sm text-secondary leading-relaxed mb-10 max-w-2xl"
            style={{ lineHeight: "1.8" }}
          >
            This eliminates the boundary burst problem completely. The window
            slides with each request, giving{" "}
            <strong className="text-platinum">pixel-perfect accuracy</strong>.
            The cost? Memory. If you allow 10,000 requests per hour per user,
            you store up to 10,000 timestamps per user. At scale with millions
            of users, that adds up fast.
          </p>

          <SlidingWindowLogDiagram />

          <div
            className="mt-8 p-5 border-l-2 border-accent bg-accent/5 max-w-2xl"
            style={{ borderRadius: "0 2px 2px 0" }}
          >
            <h5 className="text-platinum text-xs font-bold uppercase tracking-widest mb-2">
              Node.js Implementation
            </h5>
            <pre className="text-xs font-mono text-secondary leading-relaxed overflow-x-auto whitespace-pre">{`class SlidingWindowLogRateLimiter {
  constructor(windowMs, maxRequests) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.logs = new Map(); // key -> sorted array of timestamps
  }

  allowRequest(key) {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    if (!this.logs.has(key)) {
      this.logs.set(key, []);
    }

    const timestamps = this.logs.get(key);

    // Remove expired timestamps
    while (timestamps.length > 0 && timestamps[0] <= windowStart) {
      timestamps.shift();
    }

    if (timestamps.length < this.maxRequests) {
      timestamps.push(now);
      return true;
    }

    return false; // Window is full
  }
}`}</pre>
          </div>
        </motion.section>

        {/* ── Section 5: Sliding Window Counter ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader
            number="05"
            title="Sliding Window Counter"
            subtitle="The best of both worlds."
          />

          <p
            className="text-sm text-secondary leading-relaxed mb-4 max-w-2xl"
            style={{ lineHeight: "1.8" }}
          >
            This is the clever hybrid that companies like{" "}
            <strong className="text-platinum">Cloudflare</strong> use in
            production. It combines the low memory of fixed window counters with
            the smoothness of sliding windows using a weighted calculation.
          </p>
          <p
            className="text-sm text-secondary leading-relaxed mb-10 max-w-2xl"
            style={{ lineHeight: "1.8" }}
          >
            Keep counters for the current and previous windows. When checking
            the limit, calculate:{" "}
            <code className="text-accent text-xs font-mono">
              previousCount * overlapPercentage + currentCount
            </code>
            . If the current window is 30% through, 70% of the previous
            window&apos;s count still matters. This gives near-perfect accuracy
            with only two numbers stored per user.
          </p>

          <SlidingWindowCounterDiagram />

          <div
            className="mt-8 p-5 border-l-2 border-accent bg-accent/5 max-w-2xl"
            style={{ borderRadius: "0 2px 2px 0" }}
          >
            <h5 className="text-platinum text-xs font-bold uppercase tracking-widest mb-2">
              Node.js Implementation
            </h5>
            <pre className="text-xs font-mono text-secondary leading-relaxed overflow-x-auto whitespace-pre">{`class SlidingWindowCounterRateLimiter {
  constructor(windowMs, maxRequests) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.windows = new Map(); // key -> { prev, curr, currStart }
  }

  allowRequest(key) {
    const now = Date.now();
    const currentWindowStart = Math.floor(now / this.windowMs) * this.windowMs;

    if (!this.windows.has(key)) {
      this.windows.set(key, { prev: 0, curr: 0, currStart: currentWindowStart });
    }

    const record = this.windows.get(key);

    // Rotate windows if we moved to a new one
    if (currentWindowStart !== record.currStart) {
      record.prev = record.curr;
      record.curr = 0;
      record.currStart = currentWindowStart;
    }

    // Weighted count: how far into current window are we?
    const elapsed = (now - currentWindowStart) / this.windowMs;
    const weight = 1 - elapsed;
    const estimatedCount = record.prev * weight + record.curr;

    if (estimatedCount < this.maxRequests) {
      record.curr++;
      return true;
    }

    return false;
  }
}`}</pre>
          </div>
        </motion.section>

        {/* ── Section 6: Key Takeaways ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <SectionHeader
            number="06"
            title="Key Takeaways"
            subtitle="What to remember when choosing an algorithm."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {TAKEAWAYS.map((item, i) => (
              <motion.div
                key={item.title}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: i * 0.08,
                }}
                className="group p-6 border border-divider hover:border-divider-hover bg-surface/30"
                style={{
                  borderRadius: "2px",
                  transition:
                    "border-color 400ms cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
              >
                <span className="text-2xl">{item.icon}</span>
                <h4 className="mt-3 text-sm font-medium text-platinum">
                  {item.title}
                </h4>
                <p
                  className="mt-2 text-xs text-secondary leading-relaxed"
                  style={{ lineHeight: "1.8" }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </TracingBeam>
    </>
  );
}

function SectionHeader({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-8">
      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-accent/60">
        Section {number}
      </span>
      <h2
        className="mt-2 font-heading text-2xl font-semibold text-platinum md:text-3xl"
        style={{ letterSpacing: "-0.02em" }}
      >
        {title}
      </h2>
      <p className="mt-2 text-sm text-muted">{subtitle}</p>
    </div>
  );
}
