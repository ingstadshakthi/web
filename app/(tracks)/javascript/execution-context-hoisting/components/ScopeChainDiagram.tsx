"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import CopyButton from "./CopyButton";

interface ScopeLevel {
  name: string;
  type: string;
  color: string;
  borderColor: string;
  variables: { name: string; value: string }[];
}

interface LookupStep {
  id: number;
  variable: string;
  searchPath: string[];
  foundIn: string;
  description: string;
}

const SCOPES: ScopeLevel[] = [
  {
    name: "Global Scope",
    type: "Global Execution Context",
    color: "bg-slate-800/50",
    borderColor: "border-slate-500/30",
    variables: [
      { name: "appName", value: '"MyApp"' },
      { name: "version", value: "2" },
    ],
  },
  {
    name: "createUser() Scope",
    type: "Function Execution Context",
    color: "bg-blue-900/20",
    borderColor: "border-blue-500/30",
    variables: [
      { name: "name", value: '"Ada"' },
      { name: "role", value: '"admin"' },
    ],
  },
  {
    name: "formatGreeting() Scope",
    type: "Function Execution Context",
    color: "bg-violet-900/20",
    borderColor: "border-violet-500/30",
    variables: [{ name: "prefix", value: '"Welcome"' }],
  },
];

const LOOKUP_STEPS: LookupStep[] = [
  {
    id: 0,
    variable: "prefix",
    searchPath: ["formatGreeting()"],
    foundIn: "formatGreeting()",
    description:
      "The engine looks for prefix in the current scope (formatGreeting). Found it right here. No need to climb the scope chain. This is the fastest lookup.",
  },
  {
    id: 1,
    variable: "name",
    searchPath: ["formatGreeting()", "createUser()"],
    foundIn: "createUser()",
    description:
      "prefix is found, but the template also needs name. formatGreeting doesn't have it. The engine walks up the scope chain to createUser() and finds name = \"Ada\" there. This is a closure in action: the inner function accesses the outer function's variables.",
  },
  {
    id: 2,
    variable: "role",
    searchPath: ["formatGreeting()", "createUser()"],
    foundIn: "createUser()",
    description:
      'Next, it needs role. Again, not in formatGreeting, so the engine walks up to createUser() and finds role = "admin". Each lookup climbs one level at a time. It never skips a scope.',
  },
  {
    id: 3,
    variable: "appName",
    searchPath: ["formatGreeting()", "createUser()", "Global"],
    foundIn: "Global",
    description:
      "Finally, the greeting template uses appName. Not in formatGreeting. Not in createUser. The engine climbs all the way to the Global scope and finds appName = \"MyApp\". If it wasn't there either, you'd get a ReferenceError.",
  },
  {
    id: 4,
    variable: "nonExistent",
    searchPath: [
      "formatGreeting()",
      "createUser()",
      "Global",
      "ReferenceError!",
    ],
    foundIn: "nowhere",
    description:
      "What happens if you access a variable that doesn't exist anywhere? The engine searches formatGreeting → createUser → Global. Not found in any scope. The result: ReferenceError: nonExistent is not defined. The chain has no more links to check.",
  },
];

const CODE_LINES = [
  'const appName = "MyApp";',
  "const version = 2;",
  "",
  "function createUser(name, role) {",
  "  function formatGreeting() {",
  '    const prefix = "Welcome";',
  "    // Where does each variable come from?",
  "    return `${prefix}, ${name}! (${role} on ${appName})`;",
  "  }",
  "  return formatGreeting();",
  "}",
  "",
  'createUser("Ada", "admin");',
  '// "Welcome, Ada! (admin on MyApp)"',
];

export default function ScopeChainDiagram() {
  const [activeLookup, setActiveLookup] = useState(-1);
  const currentLookup = activeLookup >= 0 ? LOOKUP_STEPS[activeLookup] : null;

  return (
    <div
      className="w-full border border-divider bg-[#1A1C1E]"
      style={{ borderRadius: "2px" }}
    >
      {/* Code Display */}
      <div className="border-b border-divider p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[9px] font-mono uppercase tracking-widest text-muted">
            Source Code
          </span>
          <CopyButton text={CODE_LINES.join("\n")} />
        </div>
        <div
          className="font-mono text-xs bg-[#15171a] border border-divider p-4 space-y-0 overflow-x-auto"
          style={{ borderRadius: "2px" }}
        >
          {CODE_LINES.map((line, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-[10px] text-muted/30 w-5 text-right shrink-0 select-none">
                {i + 1}
              </span>
              <span
                className={`whitespace-pre ${line.includes("//") ? "text-muted" : "text-secondary"}`}
              >
                {line}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-divider">
        {/* Scope Chain Visual */}
        <div className="p-6">
          <span className="text-[9px] font-mono uppercase tracking-widest text-muted mb-4 block">
            Nested Scope Chain
          </span>

          <div className="space-y-0">
            {SCOPES.map((scope, i) => {
              const isSearched = currentLookup?.searchPath.includes(
                scope.name.replace(" Scope", ""),
              );
              const isFound =
                currentLookup?.foundIn === scope.name.replace(" Scope", "");

              return (
                <motion.div
                  key={scope.name}
                  animate={{
                    borderColor: isFound
                      ? "rgba(52, 211, 153, 0.5)"
                      : isSearched
                        ? "rgba(176, 196, 222, 0.3)"
                        : undefined,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`${scope.color} border ${scope.borderColor} p-4`}
                  style={{ borderRadius: "2px", marginLeft: `${i * 24}px` }}
                >
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-mono font-medium text-platinum">
                      {scope.name}
                    </span>
                    <span className="text-[9px] text-muted">{scope.type}</span>
                    <span className="flex-1" />
                    {isFound && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[9px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 border border-emerald-400/30 shrink-0"
                        style={{ borderRadius: "2px" }}
                      >
                        ✓ Found {currentLookup?.variable} here
                      </motion.span>
                    )}
                    {isSearched && !isFound && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[9px] font-mono text-muted shrink-0"
                      >
                        ✗ Not here, go up
                      </motion.span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {scope.variables.map((v) => {
                      const isTarget =
                        currentLookup?.variable === v.name && isFound;
                      return (
                        <motion.span
                          key={v.name}
                          animate={{
                            backgroundColor: isTarget
                              ? "rgba(52, 211, 153, 0.15)"
                              : "rgba(40, 42, 45, 0.8)",
                            borderColor: isTarget
                              ? "rgba(52, 211, 153, 0.4)"
                              : "rgba(255,255,255,0.06)",
                          }}
                          className="text-xs font-mono px-2 py-1 border"
                          style={{ borderRadius: "2px" }}
                        >
                          <span className="text-muted">{v.name}</span>
                          <span className="text-accent mx-1">=</span>
                          <span className="text-emerald-400">{v.value}</span>
                        </motion.span>
                      );
                    })}
                  </div>

                  {/* Arrow pointing up */}
                  {i < SCOPES.length - 1 && (
                    <div className="flex items-center gap-1 mt-3 ml-4 text-[10px] text-muted/40">
                      <span>↓ contains</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Lookup Steps */}
        <div className="p-6">
          <span className="text-[9px] font-mono uppercase tracking-widest text-muted mb-4 block">
            Variable Lookups (click to trace)
          </span>

          <div className="space-y-2">
            {LOOKUP_STEPS.map((lookup, i) => (
              <motion.button
                key={lookup.id}
                onClick={() => setActiveLookup(activeLookup === i ? -1 : i)}
                className={`w-full text-left px-4 py-3 border transition-all duration-300 ${
                  activeLookup === i
                    ? "border-accent/40 bg-surface/30"
                    : "border-divider hover:border-divider-hover"
                }`}
                style={{ borderRadius: "2px" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-sm font-medium ${
                      lookup.foundIn === "nowhere"
                        ? "text-red-400"
                        : "text-accent"
                    }`}
                  >
                    {lookup.variable}
                  </span>
                  <span className="text-[10px] text-muted">
                    {lookup.searchPath.join(" → ")}
                  </span>
                </div>

                <AnimatePresence>
                  {activeLookup === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-xs text-secondary leading-relaxed mt-2"
                      style={{ lineHeight: "1.8" }}
                    >
                      {lookup.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
