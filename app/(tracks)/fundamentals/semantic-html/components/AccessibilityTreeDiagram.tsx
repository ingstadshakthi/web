"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface TreeNode {
  role: string;
  name?: string;
  element: string;
  isLandmark?: boolean;
  children?: TreeNode[];
}

const SEMANTIC_TREE: TreeNode = {
  role: "document",
  element: "html",
  children: [
    {
      role: "banner",
      element: "header",
      isLandmark: true,
      children: [
        { role: "heading", name: "Frontend Mastery", element: "h1" },
        {
          role: "navigation",
          element: "nav",
          isLandmark: true,
          name: "Main",
          children: [
            { role: "list", element: "ul", children: [
              { role: "listitem", element: "li", children: [
                { role: "link", name: "Home", element: "a" }
              ]}
            ]}
          ],
        },
      ],
    },
    {
      role: "main",
      element: "main",
      isLandmark: true,
      children: [
        {
          role: "article",
          element: "article",
          children: [
            { role: "heading", name: "Understanding Semantic HTML", element: "h2" },
            { role: "paragraph", element: "p", name: "HTML gives meaning..." },
          ],
        },
      ],
    },
    {
      role: "contentinfo",
      element: "footer",
      isLandmark: true,
      children: [
        { role: "paragraph", element: "p", name: "© 2026" },
      ],
    },
  ],
};

const DIV_TREE: TreeNode = {
  role: "generic",
  element: "div",
  children: [
    {
      role: "generic",
      element: "div.header",
      children: [
        { role: "generic", element: "div.h1", name: "Frontend Mastery" },
        {
          role: "generic",
          element: "div.nav",
          children: [
            { role: "generic", element: "div.ul", children: [
              { role: "generic", element: "div.li", children: [
                { role: "link", name: "Home", element: "a" }
              ]}
            ]}
          ],
        },
      ],
    },
    {
      role: "generic",
      element: "div.main",
      children: [
        {
          role: "generic",
          element: "div.article",
          children: [
            { role: "generic", element: "div.h2", name: "Understanding Semantic HTML" },
            { role: "generic", element: "div.p", name: "HTML gives meaning..." },
          ],
        },
      ],
    },
    {
      role: "generic",
      element: "div.footer",
      children: [
        { role: "generic", element: "div.p", name: "© 2026" },
      ],
    },
  ],
};

function TreeNodeComponent({
  node,
  depth = 0,
  mode,
}: {
  node: TreeNode;
  depth?: number;
  mode: "semantic" | "divs";
}) {
  const [open, setOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isGeneric = node.role === "generic";
  const isLandmark = node.isLandmark;

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1.5 py-1 px-2 text-[11px] font-mono cursor-pointer rounded-sm group transition-colors",
          isLandmark && mode === "semantic"
            ? "bg-accent/8 hover:bg-accent/12"
            : "hover:bg-white/4"
        )}
        style={{ marginLeft: `${depth * 14}px` }}
        onClick={() => hasChildren && setOpen((o) => !o)}
      >
        {hasChildren ? (
          <span className="text-muted/60 text-[9px] w-3 text-center">
            {open ? "▼" : "▶"}
          </span>
        ) : (
          <span className="w-3" />
        )}

        {/* Element */}
        <span className="text-accent/70">&lt;{node.element}&gt;</span>

        {/* Role badge */}
        {mode === "semantic" ? (
          <span
            className={cn(
              "text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 border",
              isLandmark
                ? "text-green-400/90 border-green-500/30 bg-green-500/8"
                : isGeneric
                  ? "text-muted/40 border-divider"
                  : "text-accent/80 border-accent/20 bg-accent/5"
            )}
            style={{ borderRadius: "1px" }}
          >
            {node.role}
          </span>
        ) : (
          <span
            className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 border text-muted/30 border-divider/50"
            style={{ borderRadius: "1px" }}
          >
            {node.role}
          </span>
        )}

        {node.name && (
          <span className="text-muted/50 text-[10px] truncate max-w-[120px]">
            &quot;{node.name}&quot;
          </span>
        )}

        {isLandmark && mode === "semantic" && (
          <span className="ml-auto text-[8px] text-green-400/70 font-bold uppercase tracking-widest hidden group-hover:block">
            landmark
          </span>
        )}
      </div>

      <AnimatePresence>
        {open && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {node.children!.map((child, i) => (
              <TreeNodeComponent
                key={i}
                node={child}
                depth={depth + 1}
                mode={mode}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AccessibilityTreeDiagram() {
  const [mode, setMode] = useState<"semantic" | "divs">("semantic");

  return (
    <div className="w-full border border-divider overflow-hidden" style={{ borderRadius: "2px" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-surface/50 border-b border-divider">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-accent/60" />
          <span className="text-xs font-bold uppercase tracking-widest text-platinum">
            Accessibility Tree
          </span>
        </div>
        <div className="flex bg-black/40 p-0.5 border border-divider" style={{ borderRadius: "1px" }}>
          <button
            onClick={() => setMode("semantic")}
            className={cn(
              "px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-all",
              mode === "semantic" ? "bg-accent text-black" : "text-muted hover:text-platinum"
            )}
          >
            Semantic
          </button>
          <button
            onClick={() => setMode("divs")}
            className={cn(
              "px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-all",
              mode === "divs" ? "bg-accent text-black" : "text-muted hover:text-platinum"
            )}
          >
            Div Soup
          </button>
        </div>
      </div>

      {/* Tree */}
      <div className="p-4 bg-black/20 min-h-[320px] overflow-x-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: mode === "semantic" ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <TreeNodeComponent
              node={mode === "semantic" ? SEMANTIC_TREE : DIV_TREE}
              mode={mode}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer insight */}
      <div className="px-5 py-3 border-t border-divider bg-black/30">
        <AnimatePresence mode="wait">
          <motion.p
            key={mode}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[11px] text-secondary/80 leading-relaxed"
          >
            {mode === "semantic"
              ? "Screen reader users can press 'B' to jump to banners, 'M' for main content, 'N' for navigation. Green nodes are landmarks. Every screen reader has a direct keyboard shortcut to each one."
              : "With div soup, every node shows role='generic'. There are no landmarks. A blind user must tab through every single link and button to find the content they want."}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
