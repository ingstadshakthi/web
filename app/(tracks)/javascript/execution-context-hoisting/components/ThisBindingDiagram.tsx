"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import CopyButton from "./CopyButton";

interface ThisExample {
  id: string;
  label: string;
  emoji: string;
  code: string[];
  output: string;
  thisValue: string;
  explanation: string;
  rule: string;
}

const EXAMPLES: ThisExample[] = [
  {
    id: "global",
    label: "Global Context",
    emoji: "🌍",
    code: [
      "console.log(this);",
      "",
      "// Browser: Window { ... }",
      "// Node.js: globalThis / {}",
      "// Strict mode: undefined",
    ],
    output:
      "Window {...}  (browser)\nglobalThis    (Node.js)\nundefined     (strict mode)",
    thisValue: "window / globalThis / undefined",
    explanation:
      "In the global execution context (outside any function), this refers to the global object. In a browser, that is the Window object. In Node.js, for the top-level of a module it is the module exports (an empty object). In strict mode, this is undefined in the global scope.",
    rule: "Global context: this = global object (or undefined in strict mode)",
  },
  {
    id: "method",
    label: "Object Method",
    emoji: "📦",
    code: [
      "const user = {",
      '  name: "Ada",',
      "  greet() {",
      "    console.log(this.name);",
      "  }",
      "};",
      "",
      'user.greet();   // "Ada"',
    ],
    output: '"Ada"',
    thisValue: "user (the object before the dot)",
    explanation:
      "When a function is called as a method of an object (using dot notation), this refers to the object that owns the method. Here, user.greet() means this = user. The object to the left of the dot is always the value of this.",
    rule: "Method call: this = the object to the left of the dot",
  },
  {
    id: "standalone",
    label: "Standalone Function",
    emoji: "💨",
    code: [
      "const user = {",
      '  name: "Ada",',
      "  greet() {",
      "    console.log(this.name);",
      "  }",
      "};",
      "",
      "const fn = user.greet;",
      "fn();   // undefined (or error in strict)",
    ],
    output: "undefined  (sloppy mode)\nTypeError  (strict mode)",
    thisValue: "window (sloppy) / undefined (strict)",
    explanation:
      "When you extract a method into a standalone variable and call it without an object, the this binding is lost. fn() has no dot notation, no object. In sloppy mode, this falls back to the global object (window), where window.name is undefined. In strict mode, this is undefined, and accessing .name on undefined throws a TypeError.",
    rule: "Standalone function: this = global (sloppy) / undefined (strict). The dot context is lost.",
  },
  {
    id: "arrow",
    label: "Arrow Function",
    emoji: "➡️",
    code: [
      "const user = {",
      '  name: "Ada",',
      "  greet: () => {",
      "    console.log(this.name);",
      "  }",
      "};",
      "",
      "user.greet();   // undefined!",
    ],
    output: "undefined",
    thisValue: "Inherited from enclosing scope (lexical this)",
    explanation:
      "Arrow functions do not have their own this. They inherit this from the enclosing scope at the time they are defined. Here, the arrow function is defined inside the user object literal, but object literals don't create a scope. The enclosing scope is the global scope, so this = window, and window.name is undefined.",
    rule: "Arrow functions: this = enclosing scope's this (lexical). They never get their own this.",
  },
  {
    id: "arrow-useful",
    label: "Arrow in Method",
    emoji: "✅",
    code: [
      "const user = {",
      '  name: "Ada",',
      "  loadFriends() {",
      "    // Regular method: this = user",
      '    fetch("/api/friends").then((res) => {',
      "      // Arrow: inherits this from loadFriends",
      '      console.log(this.name); // "Ada" ✓',
      "    });",
      "  }",
      "};",
    ],
    output: '"Ada"',
    thisValue: "user (inherited from loadFriends)",
    explanation:
      'This is where arrow functions shine. Inside loadFriends (a regular method), this is user. The .then callback is an arrow function, so it inherits this from loadFriends. Before arrow functions, developers had to use const self = this or .bind(this) to achieve this. Arrow functions solved the "lost this" problem in callbacks.',
    rule: "Arrow functions in callbacks inherit the correct this. This is their primary use case.",
  },
  {
    id: "call-apply-bind",
    label: "call / apply / bind",
    emoji: "🔧",
    code: [
      "function greet(greeting) {",
      "  console.log(`${greeting}, ${this.name}`);",
      "}",
      "",
      'const user = { name: "Ada" };',
      "",
      'greet.call(user, "Hello");   // "Hello, Ada"',
      'greet.apply(user, ["Hi"]);   // "Hi, Ada"',
      "",
      "const bound = greet.bind(user);",
      'bound("Hey");               // "Hey, Ada"',
    ],
    output: '"Hello, Ada"\n"Hi, Ada"\n"Hey, Ada"',
    thisValue: "Explicitly set to user",
    explanation:
      "call, apply, and bind let you explicitly set what this should be. call invokes immediately with comma-separated args. apply invokes immediately with an array of args. bind returns a new function with this permanently locked. bind is especially useful when passing methods as callbacks (e.g., event handlers).",
    rule: "call/apply invoke immediately with explicit this. bind returns a new function with locked this.",
  },
  {
    id: "constructor",
    label: "new Keyword",
    emoji: "🏗️",
    code: [
      "function User(name) {",
      "  // new creates a fresh empty object",
      "  // this = {} (the new object)",
      "  this.name = name;",
      '  this.role = "user";',
      "  // implicitly returns this",
      "}",
      "",
      'const ada = new User("Ada");',
      'console.log(ada.name);  // "Ada"',
    ],
    output: '"Ada"',
    thisValue: "The newly created object",
    explanation:
      "When you call a function with new, JavaScript creates a brand new empty object, sets this to that object, executes the function body (which typically adds properties to this), and then returns this automatically. The new keyword overrides all other this rules.",
    rule: "new keyword: this = a brand new object. Constructor functions capitalize by convention.",
  },
];

export default function ThisBindingDiagram() {
  const [activeTab, setActiveTab] = useState(0);
  const example = EXAMPLES[activeTab];

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
              onClick={() => setActiveTab(i)}
              className={`shrink-0 px-4 py-3 text-xs font-medium border-b-2 transition-all duration-300 ${
                activeTab === i
                  ? "text-accent border-accent bg-surface/20"
                  : "text-muted border-transparent hover:text-secondary hover:bg-surface/10"
              }`}
            >
              <span className="mr-1.5">{ex.emoji}</span>
              <span className="hidden sm:inline">{ex.label}</span>
            </button>
          ))}
        </div>
        {/* Scroll fade hint */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#1A1C1E] to-transparent pointer-events-none sm:hidden" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-divider">
            {/* Code */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-muted">
                  Code
                </span>
                <CopyButton text={example.code.join("\n")} />
              </div>
              <div
                className="font-mono text-sm bg-[#15171a] border border-divider p-4 space-y-0.5 overflow-x-auto"
                style={{ borderRadius: "2px" }}
              >
                {example.code.map((line, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-[10px] text-muted/30 w-4 text-right shrink-0 select-none">
                      {i + 1}
                    </span>
                    <span
                      className={`whitespace-pre ${line.startsWith("//") ? "text-muted" : "text-secondary"}`}
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </div>

              {/* Output */}
              <div className="mt-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-muted block mb-2">
                  Output
                </span>
                <pre
                  className="font-mono text-xs px-4 py-3 border border-divider bg-[#15171a] text-emerald-400 whitespace-pre-wrap"
                  style={{ borderRadius: "2px" }}
                >
                  {example.output}
                </pre>
              </div>
            </div>

            {/* Explanation */}
            <div className="p-6 space-y-4">
              {/* This Value Badge */}
              <div
                className="border border-divider px-4 py-3 bg-surface/20"
                style={{ borderRadius: "2px" }}
              >
                <span className="text-[9px] font-mono uppercase tracking-widest text-muted block mb-1">
                  this =
                </span>
                <span className="text-sm font-mono text-accent font-medium">
                  {example.thisValue}
                </span>
              </div>

              <p
                className="text-sm text-secondary leading-relaxed"
                style={{ lineHeight: "1.8" }}
              >
                {example.explanation}
              </p>

              {/* Rule Card */}
              <div className="border-l-2 border-accent/40 pl-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent/60 block mb-1">
                  ★ The Rule
                </span>
                <p
                  className="text-xs text-secondary leading-relaxed"
                  style={{ lineHeight: "1.8" }}
                >
                  {example.rule}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Summary Table */}
      <div className="border-t border-divider px-6 py-5">
        <span className="text-[9px] font-mono uppercase tracking-widest text-muted block mb-3">
          Quick Reference
        </span>
        <div
          className="border border-divider overflow-x-auto"
          style={{ borderRadius: "2px" }}
        >
          <div className="grid grid-cols-3 px-4 py-2 border-b border-divider bg-surface/30 text-[10px] font-mono uppercase tracking-widest text-muted min-w-[400px]">
            <span>How Called</span>
            <span>this =</span>
            <span>Example</span>
          </div>
          {[
            ["Method call", "Object before dot", "obj.fn()"],
            ["Standalone", "global / undefined", "fn()"],
            ["Arrow function", "Enclosing scope", "() => {}"],
            ["new keyword", "New object", "new Fn()"],
            ["call / apply", "First argument", "fn.call(obj)"],
            ["bind", "Locked argument", "fn.bind(obj)"],
          ].map(([how, value, ex], i) => (
            <div
              key={i}
              className="grid grid-cols-3 px-4 py-2 border-b border-divider last:border-b-0 text-xs min-w-[400px]"
            >
              <span className="text-secondary">{how}</span>
              <span className="font-mono text-accent">{value}</span>
              <span className="font-mono text-muted">{ex}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
