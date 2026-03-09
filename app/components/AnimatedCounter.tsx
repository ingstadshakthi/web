"use client";

import { useEffect, useRef } from "react";
import {
  useMotionValue,
  useTransform,
  animate,
  useInView,
  motion,
} from "motion/react";
import { cn } from "@/lib/utils";

export default function AnimatedCounter({
  value,
  suffix = "",
  label,
  className,
}: {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        count.set(value);
        return;
      }

      animate(count, value, {
        duration: 1.5,
        ease: [0.25, 0.1, 0.25, 1],
      });
    }
  }, [isInView, value, count]);

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <div className="flex items-baseline justify-center gap-0.5">
        <motion.span className="font-heading text-4xl font-bold text-platinum md:text-5xl">
          {rounded}
        </motion.span>
        {suffix && (
          <span className="font-heading text-3xl font-bold text-accent md:text-4xl">
            {suffix}
          </span>
        )}
      </div>
      <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
    </div>
  );
}
