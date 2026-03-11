import Link from "next/link";

/* ── Topic navigation data (will grow as we add topics) ── */
const FUNDAMENTALS_TOPICS = [
  {
    slug: "how-internet-works",
    title: "How the Internet Works",
  },
  // Future topics will be added here:
  // { slug: "http-https-deep-dive", title: "HTTP & HTTPS Deep Dive" },
  // { slug: "semantic-html-accessibility", title: "Semantic HTML & Accessibility" },
];

export default function FundamentalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* ── Breadcrumb Bar ── */}
      <div className="border-b border-divider bg-deep/80 backdrop-blur-md sticky top-16 z-30">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center gap-2 text-xs">
          <Link
            href="/"
            className="text-muted hover:text-platinum"
            style={{
              transition: "color 300ms cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          >
            Home
          </Link>
          <span className="text-muted/50">›</span>
          <span className="text-accent">Web Fundamentals</span>
        </div>
      </div>

      {children}
    </div>
  );
}
