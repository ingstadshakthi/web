"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import CopyButton from "./CopyButton";

interface HoistingExample {
  id: string;
  title: string;
  emoji: string;
  original: string[];
  hoisted: string[];
  output: string;
  explanation: string;
  gotcha: string;
}

const EXAMPLES: HoistingExample[] = [
  {
    id: "var",
    title: "var declaration",
    emoji: "📦",
    original: [
      "console.log(x);   // ???",
      "var x = 10;",
      "console.log(x);   // ???",
    ],
    hoisted: [
      "var x;             // hoisted (undefined)",
      "console.log(x);   // undefined",
      "x = 10;            // assignment stays",
      "console.log(x);   // 10",
    ],
    output: "undefined\n10",
    explanation:
      "var declarations are hoisted to the top of their scope and initialized with undefined. The assignment (= 10) stays in place. So the first console.log sees x as undefined, not a ReferenceError.",
    gotcha:
      "This is the #1 source of confusion in legacy JavaScript. A variable exists but has no value yet. Many teams ban var entirely in favor of let/const to avoid this.",
  },
  {
    id: "function-declaration",
    title: "Function declaration",
    emoji: "⚡",
    original: [
      "greet();           // ???",
      "",
      "function greet() {",
      '  console.log("Hello!");',
      "}",
    ],
    hoisted: [
      "function greet() { // entirely hoisted",
      '  console.log("Hello!");',
      "}",
      "",
      'greet();           // "Hello!"',
    ],
    output: '"Hello!"',
    explanation:
      "Function declarations are fully hoisted. The entire function body is available before any code runs. This is why you can call a function before you define it in your source code. The engine already processed it during the Creation Phase.",
    gotcha:
      "This only works for function declarations (the function keyword at statement level). Function expressions and arrow functions behave differently. See the next example.",
  },
  {
    id: "function-expression",
    title: "Function expression (var)",
    emoji: "⚠️",
    original: [
      "greet();           // ???",
      "",
      "var greet = function() {",
      '  console.log("Hello!");',
      "};",
    ],
    hoisted: [
      "var greet;         // hoisted (undefined)",
      "",
      "greet();           // TypeError!",
      "                   // greet is not a function",
      "greet = function() {",
      '  console.log("Hello!");',
      "};",
    ],
    output: "TypeError: greet is not a function",
    explanation:
      "var greet is hoisted and set to undefined. When you try to call undefined(), you get a TypeError (not a ReferenceError). The function itself is never hoisted because it is an expression assigned to a variable, not a function declaration.",
    gotcha:
      "This catches people who mix up function declarations and function expressions. The same happens with arrow functions: var greet = () => {} has the same hoisting behavior. The variable is hoisted, but the function value is not.",
  },
  {
    id: "let-const",
    title: "let and const (TDZ)",
    emoji: "🚫",
    original: [
      "console.log(name); // ???",
      'let name = "Ada";',
      "",
      "console.log(age);  // ???",
      "const age = 30;",
    ],
    hoisted: [
      "// let name exists   (TDZ starts here)",
      "// const age exists   (TDZ starts here)",
      "",
      "console.log(name); // ReferenceError!",
      'let name = "Ada";  // TDZ ends, initialized',
      "",
      "console.log(age);  // ReferenceError!",
      "const age = 30;    // TDZ ends, initialized",
    ],
    output: "ReferenceError: Cannot access 'name'\nbefore initialization",
    explanation:
      "let and const are hoisted (the engine knows about them during the Creation Phase) but are NOT initialized. They sit in the Temporal Dead Zone (TDZ) from the start of the scope until the declaration is reached. Accessing them in the TDZ throws a ReferenceError.",
    gotcha:
      "The TDZ exists specifically to catch bugs early. If let behaved like var, you'd silently get undefined. The ReferenceError forces you to declare before you use, which is what you should always do anyway.",
  },
  {
    id: "class",
    title: "Class declaration",
    emoji: "🏗️",
    original: [
      'const dog = new Animal("Rex");',
      "",
      "class Animal {",
      "  constructor(name) {",
      "    this.name = name;",
      "  }",
      "}",
    ],
    hoisted: [
      "// class Animal exists (TDZ starts)",
      "",
      'const dog = new Animal("Rex");',
      "// ReferenceError! Animal is in TDZ",
      "",
      "class Animal {     // TDZ ends",
      "  constructor(name) {",
      "    this.name = name;",
      "  }",
      "}",
    ],
    output: "ReferenceError: Cannot access 'Animal'\nbefore initialization",
    explanation:
      "Classes behave exactly like let and const. They are hoisted (the engine knows the name exists) but they sit in the TDZ until the class declaration is evaluated. You cannot instantiate a class before it is declared.",
    gotcha:
      "This is different from function declarations, which are fully hoisted. If you are coming from a function-declaration mindset, expect this to catch you. Always declare classes before using them.",
  },
  {
    id: "mixed",
    title: "Mixed: interview classic",
    emoji: "🎯",
    original: [
      "var a = 1;",
      "function b() {",
      "  a = 10;",
      "  return;",
      "  function a() {}",
      "}",
      "b();",
      "console.log(a);    // ???",
    ],
    hoisted: [
      "var a;",
      "function b() {",
      "  function a() {} // hoisted inside b!",
      "  a = 10;         // sets LOCAL a, not global",
      "  return;",
      "}",
      "a = 1;",
      "b();",
      "console.log(a);    // 1 (not 10!)",
    ],
    output: "1",
    explanation:
      "Inside b(), the function a() {} declaration is hoisted to the top of b's scope. This creates a local variable a that shadows the outer a. When a = 10 runs, it assigns to the local a (the hoisted function), not the global a. So the global a stays 1.",
    gotcha:
      "This is a classic interview question. The key insight: function declarations inside a function scope create local variables that shadow outer ones. The return statement doesn't matter because hoisting happens before execution.",
  },
];

export default function HoistingVisualizer() {
  const [activeExample, setActiveExample] = useState(0);
  const example = EXAMPLES[activeExample];

  return (
    <div
      className="w-full border border-divider bg-[#1A1C1E]"
      style={{ borderRadius: "2px" }}
    >
      {/* Tab Bar */}
      <div className="relative">
        <div className="flex overflow-x-auto border-b border-divider scrollbar-none">
          {EXAMPLES.map((ex, i) => (
            <button
              key={ex.id}
              onClick={() => setActiveExample(i)}
              className={`shrink-0 px-4 py-3 text-xs font-medium border-b-2 transition-all duration-300 ${
                activeExample === i
                  ? "text-accent border-accent bg-surface/20"
                  : "text-muted border-transparent hover:text-secondary hover:bg-surface/10"
              }`}
            >
              <span className="mr-1.5">{ex.emoji}</span>
              {ex.title}
            </button>
          ))}
        </div>
        {/* Scroll fade hint */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#1A1C1E] to-transparent pointer-events-none sm:hidden" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeExample}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Side by Side Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-divider">
            {/* What You Wrote */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-muted">
                  ✏️ What you wrote
                </span>
                <CopyButton text={example.original.join("\n")} />
              </div>
              <div
                className="font-mono text-sm bg-[#15171a] border border-divider p-4 space-y-0.5 overflow-x-auto"
                style={{ borderRadius: "2px" }}
              >
                {example.original.map((line, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-[10px] text-muted/30 w-4 text-right shrink-0 select-none">
                      {i + 1}
                    </span>
                    <span
                      className={`whitespace-pre ${line.includes("???") ? "text-amber-400" : "text-secondary"}`}
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* What JS Engine Sees */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-muted">
                  🔍 What the engine does
                </span>
                <CopyButton text={example.hoisted.join("\n")} />
              </div>
              <div
                className="font-mono text-sm bg-[#15171a] border border-divider p-4 space-y-0.5 overflow-x-auto"
                style={{ borderRadius: "2px" }}
              >
                {example.hoisted.map((line, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-[10px] text-muted/30 w-4 text-right shrink-0 select-none">
                      {i + 1}
                    </span>
                    <span
                      className={`whitespace-pre ${
                        line.includes("hoisted") ||
                        line.includes("TDZ") ||
                        line.includes("entirely")
                          ? "text-accent"
                          : line.includes("Error") || line.includes("TypeError")
                            ? "text-red-400"
                            : "text-secondary"
                      }`}
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="border-t border-divider px-6 py-4">
            <span className="text-[9px] font-mono uppercase tracking-widest text-muted block mb-2">
              Console Output
            </span>
            <pre
              className={`font-mono text-sm px-4 py-3 border border-divider bg-[#15171a] whitespace-pre-wrap ${
                example.output.includes("Error")
                  ? "text-red-400"
                  : "text-emerald-400"
              }`}
              style={{ borderRadius: "2px" }}
            >
              {example.output}
            </pre>
          </div>

          {/* Explanation */}
          <div className="border-t border-divider px-6 py-5 space-y-4">
            <p
              className="text-sm text-secondary leading-relaxed"
              style={{ lineHeight: "1.8" }}
            >
              {example.explanation}
            </p>
            <div className="border-l-2 border-accent/40 pl-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent/60 block mb-1">
                ★ Watch out
              </span>
              <p
                className="text-xs text-secondary leading-relaxed"
                style={{ lineHeight: "1.8" }}
              >
                {example.gotcha}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
