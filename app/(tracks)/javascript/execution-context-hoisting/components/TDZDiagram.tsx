"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import CopyButton from "./CopyButton";

interface TDZVariable {
  keyword: string;
  name: string;
  color: string;
  phases: {
    label: string;
    status: "tdz" | "initialized" | "usable" | "hoisted-undefined";
    width: string;
  }[];
  description: string;
}

const VARIABLES: TDZVariable[] = [
  {
    keyword: "var",
    name: "count",
    color: "bg-amber-500",
    phases: [
      {
        label: "Hoisted (undefined)",
        status: "hoisted-undefined",
        width: "w-[30%]",
      },
      { label: "Assigned", status: "usable", width: "w-[70%]" },
    ],
    description:
      "var is hoisted and immediately initialized to undefined. You can access it before the declaration line. You won't get an error, but you'll get undefined, which is often a silent bug.",
  },
  {
    keyword: "let",
    name: "count",
    color: "bg-blue-500",
    phases: [
      { label: "TDZ (ReferenceError)", status: "tdz", width: "w-[30%]" },
      { label: "Initialized", status: "initialized", width: "w-[10%]" },
      { label: "Usable", status: "usable", width: "w-[60%]" },
    ],
    description:
      "let is hoisted but NOT initialized. From the start of the block scope to the declaration line, accessing it throws a ReferenceError. This zone is the Temporal Dead Zone. After the declaration, it works normally.",
  },
  {
    keyword: "const",
    name: "COUNT",
    color: "bg-violet-500",
    phases: [
      { label: "TDZ (ReferenceError)", status: "tdz", width: "w-[30%]" },
      {
        label: "Initialized (locked)",
        status: "initialized",
        width: "w-[10%]",
      },
      {
        label: "Usable (immutable binding)",
        status: "usable",
        width: "w-[60%]",
      },
    ],
    description:
      "const behaves like let regarding the TDZ but also prevents reassignment after initialization. The binding is locked. You can still mutate object properties (const obj = {}; obj.x = 1 is fine), but you can't reassign the variable itself.",
  },
  {
    keyword: "function",
    name: "greet()",
    color: "bg-emerald-500",
    phases: [
      { label: "Fully hoisted (callable)", status: "usable", width: "w-full" },
    ],
    description:
      "Function declarations are fully hoisted with their entire body. They are usable from the very first line of their scope. This is unique to function declarations. Function expressions and arrow functions behave like their binding keyword (var, let, or const).",
  },
  {
    keyword: "class",
    name: "Animal",
    color: "bg-rose-500",
    phases: [
      { label: "TDZ (ReferenceError)", status: "tdz", width: "w-[40%]" },
      { label: "Initialized", status: "initialized", width: "w-[10%]" },
      { label: "Usable", status: "usable", width: "w-[50%]" },
    ],
    description:
      "Classes are hoisted but sit in the TDZ until the class declaration is evaluated, just like let and const. You cannot use new Animal() before the class declaration line.",
  },
];

const STATUS_STYLES = {
  tdz: "bg-red-500/20 border-red-500/40 text-red-400",
  "hoisted-undefined": "bg-amber-500/20 border-amber-500/40 text-amber-400",
  initialized: "bg-blue-500/20 border-blue-500/40 text-blue-400",
  usable: "bg-emerald-500/20 border-emerald-500/40 text-emerald-400",
};

export default function TDZDiagram() {
  const [activeVar, setActiveVar] = useState<number | null>(null);

  return (
    <div
      className="w-full border border-divider bg-[#1A1C1E]"
      style={{ borderRadius: "2px" }}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-divider">
        <span className="text-[9px] font-mono uppercase tracking-widest text-muted block mb-2">
          Variable Lifecycle Timeline
        </span>
        <div className="flex flex-wrap items-center gap-4 text-[10px] text-muted">
          <span className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 bg-red-500/40 border border-red-500/60"
              style={{ borderRadius: "1px" }}
            />
            Temporal Dead Zone
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 bg-amber-500/40 border border-amber-500/60"
              style={{ borderRadius: "1px" }}
            />
            Hoisted (undefined)
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 bg-blue-500/40 border border-blue-500/60"
              style={{ borderRadius: "1px" }}
            />
            Initialized
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 bg-emerald-500/40 border border-emerald-500/60"
              style={{ borderRadius: "1px" }}
            />
            Usable
          </span>
        </div>
      </div>

      {/* Timeline Labels */}
      <div className="px-6 pt-4 pb-2 flex justify-between text-[9px] font-mono text-muted/50">
        <span>Scope start</span>
        <span>Declaration line</span>
        <span>Scope end</span>
      </div>

      {/* Timelines */}
      <div className="px-6 pb-4 space-y-3">
        {VARIABLES.map((v, i) => (
          <motion.button
            key={v.keyword}
            className={`w-full text-left cursor-pointer border border-transparent p-3 transition-all duration-300 ${
              activeVar === i
                ? "border-divider bg-surface/20"
                : "hover:bg-surface/10"
            }`}
            style={{ borderRadius: "2px" }}
            onClick={() => setActiveVar(activeVar === i ? null : i)}
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 ${v.color} text-white`}
                style={{ borderRadius: "2px" }}
              >
                {v.keyword}
              </span>
              <span className="text-xs font-mono text-secondary">{v.name}</span>
            </div>

            {/* Phase Bar */}
            <div className="flex gap-0.5 h-8">
              {v.phases.map((phase, j) => (
                <motion.div
                  key={j}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: j * 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className={`${phase.width} ${STATUS_STYLES[phase.status]} border flex items-center justify-center origin-left group/phase relative`}
                  style={{ borderRadius: "2px" }}
                  title={phase.label}
                >
                  <span className="text-[9px] font-mono truncate px-1 hidden sm:inline">
                    {phase.label}
                  </span>
                  <span className="text-[9px] font-mono sm:hidden px-0.5">
                    {phase.status === "tdz"
                      ? "TDZ"
                      : phase.status === "hoisted-undefined"
                        ? "undef"
                        : phase.status === "initialized"
                          ? "Init"
                          : "✓"}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Expanded Description */}
            <AnimatePresence>
              {activeVar === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3"
                >
                  <p
                    className="text-xs text-secondary leading-relaxed"
                    style={{ lineHeight: "1.8" }}
                  >
                    {v.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Code Example */}
      <div className="border-t border-divider px-6 py-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] font-mono uppercase tracking-widest text-muted">
            Proof in Code
          </span>
          <CopyButton text={`// --- var: no TDZ ---\nconsole.log(a);  // undefined\nvar a = 5;\n\n// --- let: TDZ exists ---\nconsole.log(b);  // ReferenceError!\nlet b = 5;\n\n// --- function: fully hoisted ---\ngreet();         // "Hello!"\nfunction greet() { console.log("Hello!"); }\n\n// --- class: TDZ exists ---\nnew Dog();       // ReferenceError!\nclass Dog {}`} />
        </div>
        <div
          className="font-mono text-xs bg-[#15171a] border border-divider p-4 space-y-0.5"
          style={{ borderRadius: "2px" }}
        >
          <div className="text-muted">{"// --- var: no TDZ ---"}</div>
          <div className="text-secondary">
            {"console.log(a);  "}
            <span className="text-amber-400">{"// undefined"}</span>
          </div>
          <div className="text-secondary">{"var a = 5;"}</div>
          <div className="text-secondary">&nbsp;</div>
          <div className="text-muted">{"// --- let: TDZ exists ---"}</div>
          <div className="text-secondary">
            {"console.log(b);  "}
            <span className="text-red-400">{"// ReferenceError!"}</span>
          </div>
          <div className="text-secondary">{"let b = 5;"}</div>
          <div className="text-secondary">&nbsp;</div>
          <div className="text-muted">
            {"// --- function: fully hoisted ---"}
          </div>
          <div className="text-secondary">
            {"greet();         "}
            <span className="text-emerald-400">{'// "Hello!"'}</span>
          </div>
          <div className="text-secondary">
            {'function greet() { console.log("Hello!"); }'}
          </div>
          <div className="text-secondary">&nbsp;</div>
          <div className="text-muted">{"// --- class: TDZ exists ---"}</div>
          <div className="text-secondary">
            {"new Dog();       "}
            <span className="text-red-400">{"// ReferenceError!"}</span>
          </div>
          <div className="text-secondary">{"class Dog {}"}</div>
        </div>
      </div>
    </div>
  );
}
