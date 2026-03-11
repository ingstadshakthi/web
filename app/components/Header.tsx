"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NAV_LINKS, ALL_TOPICS, SITE_CONFIG, TOPIC_ROUTES } from "@/lib/constants";

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter topics based on search query
  const filtered = query.trim().length > 0
    ? ALL_TOPICS.filter((t) =>
        t.topic.toLowerCase().includes(query.toLowerCase()) ||
        t.trackName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut: Cmd+K / Ctrl+K to open search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-divider"
      style={{
        background: "rgba(26, 28, 30, 0.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 font-heading text-lg font-semibold tracking-tight text-platinum"
        >
          {SITE_CONFIG.name}
        </Link>

        {/* Search Bar (desktop) */}
        <div ref={searchRef} className="relative hidden flex-1 max-w-sm md:block">
          <div
            className="search-bar flex items-center gap-2 border border-divider bg-surface px-3 h-9 cursor-text"
            onClick={() => {
              setSearchOpen(true);
              setTimeout(() => inputRef.current?.focus(), 50);
            }}
          >
            {/* Search icon */}
            <svg
              className="h-3.5 w-3.5 shrink-0 text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            {searchOpen ? (
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search topics..."
                className="w-full bg-transparent text-xs text-platinum placeholder-muted outline-none"
                aria-label="Search topics"
              />
            ) : (
              <span className="flex-1 text-xs text-muted">Search topics...</span>
            )}

            <kbd className="hidden shrink-0 rounded border border-divider px-1.5 py-0.5 text-[10px] text-muted lg:inline-block" style={{ borderRadius: "2px" }}>
              ⌘K
            </kbd>
          </div>

          {/* Search Results Dropdown */}
          {searchOpen && query.trim().length > 0 && (
            <div className="search-dropdown absolute left-0 right-0 top-full mt-1 max-h-[320px] overflow-y-auto border border-divider bg-surface py-1" style={{ borderRadius: "2px" }}>
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <button
                    key={`${item.trackId}-${item.topic}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setQuery("");
                      const route = TOPIC_ROUTES[item.topic];
                      if (route) {
                        router.push(route);
                      } else {
                        document.getElementById(item.trackId)?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="search-result flex w-full items-start gap-3 px-3 py-2.5 text-left"
                  >
                    <svg
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <div>
                      <p className="text-xs font-medium text-platinum">{item.topic}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[10px] text-muted">{item.trackName}</p>
                        {TOPIC_ROUTES[item.topic] && (
                          <span className="text-[9px] uppercase tracking-[0.12em] text-accent font-medium">Available</span>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-3 py-4 text-center text-xs text-muted">
                  No topics found for &ldquo;{query}&rdquo;
                </div>
              )}
            </div>
          )}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-secondary hover:text-platinum"
              style={{
                transition: "color 300ms cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile: search icon + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile search toggle */}
          <button
            onClick={() => {
              setSearchOpen(!searchOpen);
              setIsOpen(false);
            }}
            className="flex h-10 w-10 items-center justify-center text-secondary"
            aria-label="Search"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              setSearchOpen(false);
            }}
            className="flex h-10 w-10 items-center justify-center text-secondary"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {isOpen ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </>
              ) : (
                <>
                  <line x1="3" y1="5" x2="17" y2="5" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="15" x2="17" y2="15" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {searchOpen && (
        <div className="border-t border-divider bg-deep px-6 py-3 md:hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics..."
            className="w-full bg-surface border border-divider px-3 py-2 text-sm text-platinum placeholder-muted outline-none"
            style={{ borderRadius: "2px" }}
            aria-label="Search topics"
            autoFocus
          />
          {query.trim().length > 0 && (
            <div className="mt-2 max-h-[240px] overflow-y-auto">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <button
                    key={`mob-${item.trackId}-${item.topic}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setQuery("");
                      const route = TOPIC_ROUTES[item.topic];
                      if (route) {
                        router.push(route);
                      } else {
                        document.getElementById(item.trackId)?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="search-result flex w-full items-start gap-3 py-2.5 text-left"
                  >
                    <div>
                      <p className="text-sm text-platinum">{item.topic}</p>
                      <p className="text-xs text-muted">{item.trackName}</p>
                    </div>
                  </button>
                ))
              ) : (
                <p className="py-3 text-center text-xs text-muted">
                  No topics found
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <nav className="border-t border-divider bg-deep px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-sm text-secondary hover:text-platinum"
              style={{
                transition: "color 300ms cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
