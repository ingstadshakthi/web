"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TRACKS, TOPIC_ROUTES } from "@/lib/constants";

export function TopicNavigation() {
  const pathname = usePathname();

  // Find the topic name that matches the current pathname
  const currentTopicEntry = Object.entries(TOPIC_ROUTES).find(
    ([_, path]) => path === pathname
  );

  if (!currentTopicEntry) return null; // Not on a topic page

  const currentTopicName = currentTopicEntry[0];

  const currentTrack = TRACKS.find((track) =>
    (track.topics as readonly string[]).includes(currentTopicName)
  );

  if (!currentTrack) return null;

  const publishedInTrack = currentTrack.topics.filter(
    (topic) => topic in TOPIC_ROUTES
  );

  const currentIndex = publishedInTrack.indexOf(currentTopicName as any);

  if (currentIndex === -1) return null;

  const prevTopicName = currentIndex > 0 ? publishedInTrack[currentIndex - 1] : null;
  const nextTopicName =
    currentIndex < publishedInTrack.length - 1 ? publishedInTrack[currentIndex + 1] : null;

  const prev = prevTopicName
    ? { name: prevTopicName, path: TOPIC_ROUTES[prevTopicName] }
    : null;
  const next = nextTopicName
    ? { name: nextTopicName, path: TOPIC_ROUTES[nextTopicName] }
    : null;

  return (
    <>
      {/* Divider */}
      <div className="section-glow-divider" aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════
          DYNAMIC TOPIC NAVIGATION (Prev / Next)
          ═══════════════════════════════════════════════════════ */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl flex items-center justify-between flex-wrap gap-4">
          {prev ? (
            <Link
              href={prev.path}
              className="group flex flex-col items-start px-5 py-3 border border-divider text-platinum hover:border-accent/40 hover:bg-surface/20 min-w-[200px]"
              style={{
                borderRadius: "2px",
                transition: "all 400ms cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            >
              <span className="text-[10px] text-muted uppercase tracking-widest mb-1 group-hover:text-accent transition-colors">
                ← Previous
              </span>
              <span className="text-sm font-medium">{prev.name}</span>
            </Link>
          ) : (
            <div className="min-w-[200px]" />
          )}

          {next ? (
            <Link
              href={next.path}
              className="group flex flex-col items-end px-5 py-3 border border-divider text-platinum hover:border-accent/40 hover:bg-surface/20 min-w-[200px]"
              style={{
                borderRadius: "2px",
                transition: "all 400ms cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            >
              <span className="text-[10px] text-muted uppercase tracking-widest mb-1 group-hover:text-accent transition-colors">
                Next →
              </span>
              <span className="text-sm font-medium">{next.name}</span>
            </Link>
          ) : (
            <div className="text-sm text-muted italic min-w-[200px] text-right">
              More topics coming soon.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
