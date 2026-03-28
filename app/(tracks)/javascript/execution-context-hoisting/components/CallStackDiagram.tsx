"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import CopyButton from "./CopyButton";

interface StackFrame {
  name: string;
  color: string;
  line: number;
}

interface Step {
  id: number;
  action: string;
  description: string;
  stack: StackFrame[];
  currentLine: number;
  output: string[];
  realWorldNote: string;
}

const CODE_LINES = [
  "function multiply(a, b) {",
  "  return a * b;",
  "}",
  "",
  "function square(n) {",
  "  return multiply(n, n);",
  "}",
  "",
  "function printSquare(n) {",
  "  const result = square(n);",
  "  console.log(result);",
  "}",
  "",
  "printSquare(5);",
];

const STEPS: Step[] = [
  {
    id: 0,
    action: "Program starts",
    description:
      "The engine creates the Global Execution Context and pushes it onto the Call Stack. During the Creation Phase, all three function declarations are hoisted and stored in memory. The engine then begins executing line by line.",
    stack: [{ name: "Global", color: "bg-slate-600", line: -1 }],
    currentLine: 0,
    output: [],
    realWorldNote:
      "The Global Execution Context is always at the bottom of the stack. It is created when your script first loads and only removed when the program ends (or the browser tab closes).",
  },
  {
    id: 1,
    action: "Call printSquare(5)",
    description:
      "The engine reaches line 14 and calls printSquare(5). A new Function Execution Context is created for printSquare with n = 5. This context is pushed onto the Call Stack. The engine enters printSquare and starts executing its body.",
    stack: [
      { name: "Global", color: "bg-slate-600", line: -1 },
      { name: "printSquare(5)", color: "bg-blue-600/80", line: 13 },
    ],
    currentLine: 13,
    output: [],
    realWorldNote:
      "Each function call creates its own Execution Context with its own Variable Environment. The argument 5 is bound to the parameter n inside printSquare's context. The outer Global context is paused while printSquare runs.",
  },
  {
    id: 2,
    action: "Call square(5)",
    description:
      "Inside printSquare, the engine hits line 10: const result = square(n). To assign result, it needs to first execute square(5). A new Execution Context for square is created and pushed onto the stack. The engine enters square.",
    stack: [
      { name: "Global", color: "bg-slate-600", line: -1 },
      { name: "printSquare(5)", color: "bg-blue-600/80", line: 13 },
      { name: "square(5)", color: "bg-violet-600/80", line: 9 },
    ],
    currentLine: 9,
    output: [],
    realWorldNote:
      "Notice the stack is growing. printSquare is paused mid-execution, waiting for square to return. This is the fundamental nature of synchronous, single-threaded JavaScript: only one thing at a time, and it must finish before the caller continues.",
  },
  {
    id: 3,
    action: "Call multiply(5, 5)",
    description:
      "Inside square, the engine hits line 6: return multiply(n, n). It calls multiply(5, 5), creating yet another Execution Context. The stack is now 4 frames deep: Global → printSquare → square → multiply.",
    stack: [
      { name: "Global", color: "bg-slate-600", line: -1 },
      { name: "printSquare(5)", color: "bg-blue-600/80", line: 13 },
      { name: "square(5)", color: "bg-violet-600/80", line: 9 },
      { name: "multiply(5, 5)", color: "bg-emerald-600/80", line: 5 },
    ],
    currentLine: 5,
    output: [],
    realWorldNote:
      'This is 4 levels deep. In production, deeply nested recursive functions can push thousands of frames. Most browsers limit the stack to ~10,000-25,000 frames. Beyond that: "Maximum call stack size exceeded" (a Stack Overflow).',
  },
  {
    id: 4,
    action: "multiply returns 25",
    description:
      "multiply computes 5 * 5 = 25 and returns. Its Execution Context is popped off the stack and destroyed. Control returns to square, which now has the return value 25.",
    stack: [
      { name: "Global", color: "bg-slate-600", line: -1 },
      { name: "printSquare(5)", color: "bg-blue-600/80", line: 13 },
      { name: "square(5)", color: "bg-violet-600/80", line: 9 },
    ],
    currentLine: 5,
    output: [],
    realWorldNote:
      "When a function returns, its entire Execution Context is garbage collected. All local variables (a and b in multiply) are gone. The only thing that survives is the return value, which gets passed back to the caller.",
  },
  {
    id: 5,
    action: "square returns 25",
    description:
      "square receives 25 from multiply and immediately returns it. Its Execution Context is popped off the stack. Control returns to printSquare, where result is now assigned the value 25.",
    stack: [
      { name: "Global", color: "bg-slate-600", line: -1 },
      { name: "printSquare(5)", color: "bg-blue-600/80", line: 13 },
    ],
    currentLine: 9,
    output: [],
    realWorldNote:
      "The stack is unwinding. Each return pops one frame. This LIFO (Last In, First Out) behavior is what makes the Call Stack a stack. The most recently called function is always the first to finish.",
  },
  {
    id: 6,
    action: "console.log(25)",
    description:
      "Back in printSquare, result is now 25. The engine executes line 11: console.log(result), which outputs 25 to the console. Then printSquare finishes (implicit return undefined) and its context is popped.",
    stack: [{ name: "Global", color: "bg-slate-600", line: -1 }],
    currentLine: 10,
    output: ["25"],
    realWorldNote:
      "After all functions return, we are back to just the Global Execution Context. The entire chain of multiply → square → printSquare happened synchronously. The Call Stack was never empty during execution (Global is always there) until the program ends.",
  },
];

export default function CallStackDiagram() {
  const [step, setStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = () => {
    setStep(-1);
    setIsPlaying(true);
    let current = 0;
    intervalRef.current = setInterval(() => {
      if (current >= STEPS.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsPlaying(false);
        return;
      }
      setStep(current);
      current++;
    }, 3000);
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

  const currentStep = step >= 0 ? STEPS[step] : null;

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
              {step >= 0 ? "Replay" : "Watch Call Stack"}
            </>
          )}
        </button>
        {step >= 0 && (
          <span className="text-xs text-muted">
            Step {step + 1} of {STEPS.length}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-divider">
        {/* Code View */}
        <div className="p-6 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-mono uppercase tracking-widest text-muted">
              Source Code
            </span>
            <CopyButton text={CODE_LINES.join("\n")} />
          </div>
          <div className="font-mono text-xs space-y-0">
            {CODE_LINES.map((line, i) => {
              const isActive = currentStep?.currentLine === i;
              return (
                <motion.div
                  key={i}
                  animate={{
                    opacity: step < 0 ? 0.6 : isActive ? 1 : 0.3,
                    backgroundColor: isActive
                      ? "rgba(176, 196, 222, 0.08)"
                      : "transparent",
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-2 px-2 py-0.5"
                  style={{ borderRadius: "2px" }}
                >
                  <span className="text-[9px] text-muted/30 w-4 text-right shrink-0 select-none pt-px">
                    {i + 1}
                  </span>
                  <span className="text-secondary whitespace-pre">{line}</span>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-accent ml-auto text-[9px] shrink-0"
                    >
                      ◄
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call Stack Visualization */}
        <div className="p-6 lg:col-span-1">
          <span className="text-[9px] font-mono uppercase tracking-widest text-muted mb-4 block">
            Call Stack
          </span>

          <div className="flex flex-col-reverse gap-1 min-h-[200px] justify-start">
            <AnimatePresence>
              {currentStep?.stack.map((frame, i) => (
                <motion.div
                  key={frame.name}
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`${frame.color} px-4 py-3 text-center border border-white/10`}
                  style={{ borderRadius: "2px" }}
                >
                  <span className="text-xs font-mono text-white font-medium">
                    {frame.name}
                  </span>
                  {i === currentStep.stack.length - 1 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="block text-[9px] text-white/70 mt-0.5"
                    >
                      ← running
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {!currentStep && (
              <div className="flex items-center justify-center h-40 text-xs text-muted">
                Click &quot;Watch Call Stack&quot; to begin
              </div>
            )}
          </div>

          {/* Console Output */}
          {currentStep && currentStep.output.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 border border-divider bg-[#15171a] px-3 py-2"
              style={{ borderRadius: "2px" }}
            >
              <span className="text-[9px] font-mono uppercase tracking-widest text-muted block mb-1">
                Console
              </span>
              {currentStep.output.map((line, i) => (
                <span
                  key={i}
                  className="text-xs font-mono text-emerald-400 block"
                >
                  {line}
                </span>
              ))}
            </motion.div>
          )}
        </div>

        {/* Description */}
        <div className="p-6 lg:col-span-1">
          <AnimatePresence mode="wait">
            {currentStep ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-4"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accent/60 block mb-2">
                    {currentStep.action}
                  </span>
                  <p
                    className="text-sm text-secondary leading-relaxed"
                    style={{ lineHeight: "1.8" }}
                  >
                    {currentStep.description}
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
                    {currentStep.realWorldNote}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-40 text-xs text-muted">
                Step through to see the stack
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Step Navigation */}
      {currentStep && (
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
            {step + 1} / {STEPS.length}
          </span>
          <button
            onClick={() => {
              stopAnimation();
              setStep(Math.min(STEPS.length - 1, step + 1));
            }}
            disabled={step >= STEPS.length - 1}
            className="text-xs text-muted hover:text-platinum disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ transition: "color 300ms" }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
