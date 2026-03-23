"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TRACKS, TOPIC_ROUTES } from "@/lib/constants";

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  const currentTopicEntry = Object.entries(TOPIC_ROUTES).find(
    ([_, path]) => path === pathname
  );
  const currentTopicName = currentTopicEntry ? currentTopicEntry[0] : null;

  let trackName = "Track";
  if (currentTopicName) {
    const track = TRACKS.find((t) =>
      (t.topics as readonly string[]).includes(currentTopicName)
    );
    if (track) {
      trackName = track.name;
    }
  }

  return (
    <div className="border-b border-divider bg-deep/80 backdrop-blur-md relative z-30">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center gap-2 text-xs">
        <Link
          href="/"
          className="text-muted hover:text-platinum"
          style={{ transition: "color 300ms cubic-bezier(0.25, 0.1, 0.25, 1)" }}
        >
          Home
        </Link>
        <span className="text-muted/50">›</span>
        <span className="text-accent">{trackName}</span>
      </div>
    </div>
  );
}
