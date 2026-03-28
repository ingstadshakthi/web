"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import CopyButton from "./CopyButton";

interface Phase {
  id: number;
  phase: string;
  line: string;
  description: string;
  variableEnv: Record<string, { value: string; color: string }>;
  scopeChain: string;
  thisValue: string;
  highlight: number[];
  realWorldNote: string;
}

const CODE_LINES = [
  'var name = "Ada";',
  'let language = "JavaScript";',
  "const year = 1995;",
  "",
  "function greet() {",
  '  return "Hello, " + name;',
  "}",
  "",
  "var result = greet();",
];

const PHASES: Phase[] = [
  {
    id: 0,
    phase: "Creation Phase",
    line: "Engine scans all declarations",
    description:
      "Before executing a single line, the engine creates the Global Execution Context. During the Creation Phase, it scans the entire code for declarations. Variables declared with var are allocated memory and set to undefined. Functions declared with function keyword are stored entirely. But let and const are allocated memory too, just not initialized (they enter the Temporal Dead Zone).",
    variableEnv: {
      name: { value: "undefined", color: "text-amber-400" },
      language: { value: "<uninitialized>", color: "text-red-400" },
      year: { value: "<uninitialized>", color: "text-red-400" },
      greet: { value: "fn()", color: "text-emerald-400" },
      result: { value: "undefined", color: "text-amber-400" },
    },
    scopeChain: "Global",
    thisValue: "window (browser) / globalThis (Node)",
    highlight: [0, 1, 2, 4, 8],
    realWorldNote:
      "This is why you can call a function before its declaration in your code. The engine already knows about it from the Creation Phase. But var being undefined (not the actual value) is where most hoisting bugs come from.",
  },
  {
    id: 1,
    phase: "Execution Phase",
    line: 'Line 1: var name = "Ada"',
    description:
      'Now the engine starts executing line by line. It hits the first line and assigns the string "Ada" to the variable name. The var declaration was already processed in the Creation Phase (that is hoisting), so now it just updates the value from undefined to "Ada".',
    variableEnv: {
      name: { value: '"Ada"', color: "text-emerald-400" },
      language: { value: "<uninitialized>", color: "text-red-400" },
      year: { value: "<uninitialized>", color: "text-red-400" },
      greet: { value: "fn()", color: "text-emerald-400" },
      result: { value: "undefined", color: "text-amber-400" },
    },
    scopeChain: "Global",
    thisValue: "window / globalThis",
    highlight: [0],
    realWorldNote:
      "If you logged name before this line, you'd get undefined (not a ReferenceError). That's the practical effect of var hoisting. The variable exists but hasn't been assigned yet.",
  },
  {
    id: 2,
    phase: "Execution Phase",
    line: 'Line 2: let language = "JavaScript"',
    description:
      'The engine reaches the let declaration and initializes language with "JavaScript". Before this exact line, any attempt to access language would throw a ReferenceError because it was in the Temporal Dead Zone. Now it leaves the TDZ and becomes usable.',
    variableEnv: {
      name: { value: '"Ada"', color: "text-emerald-400" },
      language: { value: '"JavaScript"', color: "text-emerald-400" },
      year: { value: "<uninitialized>", color: "text-red-400" },
      greet: { value: "fn()", color: "text-emerald-400" },
      result: { value: "undefined", color: "text-amber-400" },
    },
    scopeChain: "Global",
    thisValue: "window / globalThis",
    highlight: [1],
    realWorldNote:
      "This is the key difference between var and let. Both are hoisted (the engine knows about them), but let isn't initialized until the engine reaches the declaration. Accessing it early is a ReferenceError, not undefined.",
  },
  {
    id: 3,
    phase: "Execution Phase",
    line: "Line 3: const year = 1995",
    description:
      "The const declaration is initialized with 1995. Like let, it was in the TDZ until this line. Unlike let, it can never be reassigned after this. The binding is locked.",
    variableEnv: {
      name: { value: '"Ada"', color: "text-emerald-400" },
      language: { value: '"JavaScript"', color: "text-emerald-400" },
      year: { value: "1995", color: "text-emerald-400" },
      greet: { value: "fn()", color: "text-emerald-400" },
      result: { value: "undefined", color: "text-amber-400" },
    },
    scopeChain: "Global",
    thisValue: "window / globalThis",
    highlight: [2],
    realWorldNote:
      "const prevents reassignment, not mutation. const obj = {} is fine, and you can still add properties. The binding (the variable pointing to the object) is locked. The object itself is not frozen.",
  },
  {
    id: 4,
    phase: "Execution Phase",
    line: "Line 9: var result = greet()",
    description:
      "The engine hits the greet() call. Before assigning to result, it needs to execute greet. A new Function Execution Context is created and pushed onto the Call Stack. Inside greet, the engine creates a new Variable Environment, scope chain (greet scope + Global), and sets this.",
    variableEnv: {
      name: { value: '"Ada"', color: "text-emerald-400" },
      language: { value: '"JavaScript"', color: "text-emerald-400" },
      year: { value: "1995", color: "text-emerald-400" },
      greet: { value: "fn() ← executing", color: "text-blue-400" },
      result: { value: "undefined", color: "text-amber-400" },
    },
    scopeChain: "greet() → Global",
    thisValue: "window / globalThis",
    highlight: [4, 5, 6, 8],
    realWorldNote:
      "Every function call creates a brand new Execution Context. If greet called another function, that would get its own context too. This is the Call Stack in action. And because greet was declared with function keyword, it was available from the very first step.",
  },
  {
    id: 5,
    phase: "Execution Phase",
    line: "greet() returns, result assigned",
    description:
      'greet() returns the string "Hello, Ada". The function\'s Execution Context is popped off the Call Stack and destroyed. Control returns to the Global Execution Context, and result is assigned the return value.',
    variableEnv: {
      name: { value: '"Ada"', color: "text-emerald-400" },
      language: { value: '"JavaScript"', color: "text-emerald-400" },
      year: { value: "1995", color: "text-emerald-400" },
      greet: { value: "fn()", color: "text-emerald-400" },
      result: { value: '"Hello, Ada"', color: "text-emerald-400" },
    },
    scopeChain: "Global",
    thisValue: "window / globalThis",
    highlight: [8],
    realWorldNote:
      "Once greet finishes, its Execution Context is garbage collected. All local variables inside greet are gone. This is why local variables don't persist between function calls (unless closures are involved, which is the next topic).",
  },
];

export default function ExecutionContextDiagram() {
  const [step, setStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = () => {
    setStep(-1);
    setIsPlaying(true);
    let current = 0;
    intervalRef.current = setInterval(() => {
      if (current >= PHASES.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsPlaying(false);
        return;
      }
      setStep(current);
      current++;
    }, 3500);
  };

  const stopAnimation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const currentPhase = step >= 0 ? PHASES[step] : null;

  return (
    <div
      className="w-full border border-divider bg-[#1A1C1E]"
      style={{ borderRadius: "2px" }}
    >
      {/* Controls */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-divider">
        <button
          onClick={isPlaying ? stopAnimation : startAnimation}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-divider text-platinum hover:border-accent/40 hover:text-accent"
          style={{
            borderRadius: "2px",
            transition: "all 400ms cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        >
          {isPlaying ? (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
              {step >= 0 ? "Replay" : "Watch Execution"}
            </>
          )}
        </button>
        {step >= 0 && (
          <span className="text-xs text-muted">
            Step {step + 1} of {PHASES.length}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-divider">
        {/* Left: Code View */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-mono uppercase tracking-widest text-muted">
              Source Code
            </span>
            <CopyButton text={CODE_LINES.join("\n")} />
          </div>
          <div className="font-mono text-sm space-y-0.5">
            {CODE_LINES.map((line, i) => {
              const isHighlighted = currentPhase?.highlight.includes(i);
              return (
                <motion.div
                  key={i}
                  animate={{
                    opacity: step < 0 ? 0.6 : isHighlighted ? 1 : 0.25,
                    backgroundColor: isHighlighted
                      ? "rgba(176, 196, 222, 0.06)"
                      : "transparent",
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-3 px-3 py-0.5"
                  style={{ borderRadius: "2px" }}
                >
                  <span className="text-[10px] text-muted/40 w-4 text-right shrink-0 select-none pt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-secondary whitespace-pre">{line}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right: Variable Environment */}
        <div className="p-6">
          <span className="text-[9px] font-mono uppercase tracking-widest text-muted mb-4 block">
            Variable Environment
          </span>

          <AnimatePresence mode="wait">
            {currentPhase ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-4"
              >
                {/* Phase Badge */}
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border ${
                      currentPhase.phase === "Creation Phase"
                        ? "text-amber-400 border-amber-400/30 bg-amber-400/5"
                        : "text-emerald-400 border-emerald-400/30 bg-emerald-400/5"
                    }`}
                    style={{ borderRadius: "2px" }}
                  >
                    {currentPhase.phase}
                  </span>
                </div>

                {/* Variables Table */}
                <div
                  className="border border-divider"
                  style={{ borderRadius: "2px" }}
                >
                  <div className="grid grid-cols-2 px-3 py-2 border-b border-divider bg-surface/30 text-[10px] font-mono uppercase tracking-widest text-muted">
                    <span>Identifier</span>
                    <span>Value</span>
                  </div>
                  {Object.entries(currentPhase.variableEnv).map(
                    ([key, val]) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-2 px-3 py-2 border-b border-divider last:border-b-0 text-xs font-mono"
                      >
                        <span className="text-platinum">{key}</span>
                        <span className={val.color}>{val.value}</span>
                      </motion.div>
                    ),
                  )}
                </div>

                {/* Scope Chain + this */}
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="border border-divider px-3 py-2"
                    style={{ borderRadius: "2px" }}
                  >
                    <span className="text-[9px] font-mono uppercase tracking-widest text-muted block mb-1">
                      Scope Chain
                    </span>
                    <span className="text-xs font-mono text-accent">
                      {currentPhase.scopeChain}
                    </span>
                  </div>
                  <div
                    className="border border-divider px-3 py-2"
                    style={{ borderRadius: "2px" }}
                  >
                    <span className="text-[9px] font-mono uppercase tracking-widest text-muted block mb-1">
                      this
                    </span>
                    <span className="text-xs font-mono text-accent">
                      {currentPhase.thisValue}
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-40 text-xs text-muted"
              >
                Click &quot;Watch Execution&quot; to step through
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Description Panel */}
      <AnimatePresence mode="wait">
        {currentPhase && (
          <motion.div
            key={step}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="border-t border-divider"
          >
            <div className="px-6 py-5 space-y-4">
              <div>
                <span className="text-xs font-medium text-platinum">
                  {currentPhase.line}
                </span>
                <p
                  className="mt-2 text-sm text-secondary leading-relaxed"
                  style={{ lineHeight: "1.8" }}
                >
                  {currentPhase.description}
                </p>
              </div>
              <div className="border-l-2 border-accent/40 pl-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent/60 block mb-1">
                  ★ The real lesson
                </span>
                <p
                  className="text-xs text-secondary leading-relaxed"
                  style={{ lineHeight: "1.8" }}
                >
                  {currentPhase.realWorldNote}
                </p>
              </div>
            </div>

            {/* Step Navigation */}
            <div className="flex items-center justify-between px-6 py-3 border-t border-divider bg-surface/20">
              <button
                onClick={() => {
                  stopAnimation();
                  setStep(Math.max(0, step - 1));
                }}
                disabled={step <= 0}
                className="text-xs text-muted hover:text-platinum disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ transition: "color 300ms" }}
              >
                ← Back
              </button>
              <span className="text-[10px] font-mono text-muted">
                {step + 1} / {PHASES.length}
              </span>
              <button
                onClick={() => {
                  stopAnimation();
                  setStep(Math.min(PHASES.length - 1, step + 1));
                }}
                disabled={step >= PHASES.length - 1}
                className="text-xs text-muted hover:text-platinum disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ transition: "color 300ms" }}
              >
                Next →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
