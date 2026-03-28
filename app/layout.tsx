import type { Metadata } from "next";
import { Playfair_Display, Inter, Geist } from "next/font/google";
import Header from "@/app/components/Header";
import { SITE_CONFIG } from "@/lib/constants";
import "./globals.css";
import { cn } from "@/lib/utils";
import Link from "next/link";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: [
    "web development",
    "learn",
    "html",
    "css",
    "javascript",
    "react",
    "nextjs",
    "tutorial",
    "educational",
  ],
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-deep text-platinum`}
      >
        <Header />

        <main className="pt-16">{children}</main>

        {/* ═══ Footer ═══ */}
        <footer className="border-t border-divider bg-deep">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {/* Brand */}
              <div>
                <h3 className="font-heading text-lg font-semibold text-platinum">
                  Frontend Mastery
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-secondary">
                  A comprehensive, framework-agnostic educational platform
                  covering every core frontend engineering concept.
                </p>
              </div>

              {/* Navigation */}
              <div>
                <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                  Navigation
                </h4>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link
                      href="/#tracks"
                      className="text-sm text-secondary hover:text-platinum"
                      style={{
                        transition:
                          "color 300ms cubic-bezier(0.25, 0.1, 0.25, 1)",
                      }}
                    >
                      Learning Tracks
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#topics"
                      className="text-sm text-secondary hover:text-platinum"
                      style={{
                        transition:
                          "color 300ms cubic-bezier(0.25, 0.1, 0.25, 1)",
                      }}
                    >
                      Featured Topics
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#about"
                      className="text-sm text-secondary hover:text-platinum"
                      style={{
                        transition:
                          "color 300ms cubic-bezier(0.25, 0.1, 0.25, 1)",
                      }}
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Built With */}
              <div>
                <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                  Built With
                </h4>
                <ul className="mt-4 space-y-3">
                  <li>
                    <span className="text-sm text-secondary">Next.js 16</span>
                  </li>
                  <li>
                    <span className="text-sm text-secondary">React 19.2</span>
                  </li>
                  <li>
                    <span className="text-sm text-secondary">
                      TypeScript &amp; Tailwind CSS
                    </span>
                  </li>
                  <li>
                    <span className="text-sm text-secondary">
                      Aceternity UI
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-16 border-t border-divider pt-8 text-center">
              <p className="text-xs text-muted">
                © 2026 Frontend Mastery. Built with precision.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
