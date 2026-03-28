"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import ExecutionContextDiagram from "./components/ExecutionContextDiagram";
import CallStackDiagram from "./components/CallStackDiagram";
import HoistingVisualizer from "./components/HoistingVisualizer";
import TDZDiagram from "./components/TDZDiagram";
import ScopeChainDiagram from "./components/ScopeChainDiagram";
import ThisBindingDiagram from "./components/ThisBindingDiagram";
import CopyButton from "./components/CopyButton";

/* ── Scroll reveal variant ── */
const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/* ── Console Experiments (grouped by topic) ── */
const CONSOLE_EXPERIMENT_GROUPS = [
  {
    group: "Hoisting Basics",
    experiments: [
      {
        title: "var hoisting vs let/const",
        code: `console.log(a);  // undefined (hoisted)
console.log(b);  // ReferenceError!

var a = 1;
let b = 2;`,
        output: `undefined
ReferenceError: Cannot access 'b' before initialization`,
        note: "var is hoisted and initialized to undefined. let is hoisted but stays in the TDZ.",
      },
      {
        title: "Function declaration hoisting",
        code: `greet();  // Works!

function greet() {
  console.log("Hello!");
}`,
        output: `"Hello!"`,
        note: "Function declarations are fully hoisted with their body. You can call them before the definition.",
      },
      {
        title: "Function expression is NOT hoisted",
        code: `greet();  // TypeError!

var greet = function() {
  console.log("Hello!");
};`,
        output: `TypeError: greet is not a function`,
        note: "var greet is hoisted as undefined. Calling undefined() throws TypeError, not ReferenceError.",
      },
      {
        title: "Arrow function hoisting",
        code: `sayHi();  // TypeError!

var sayHi = () => console.log("Hi!");`,
        output: `TypeError: sayHi is not a function`,
        note: "Arrow functions behave like function expressions. The var is hoisted, the function is not.",
      },
      {
        title: "let in a block scope",
        code: `let x = "outer";
{
  // x is in TDZ here for THIS block's x
  // console.log(x);  // Would throw ReferenceError!
  let x = "inner";
  console.log(x);
}
console.log(x);`,
        output: `"inner"
"outer"`,
        note: "Each block creates its own scope. The inner let x shadows the outer one, and has its own TDZ.",
      },
    ],
  },
  {
    group: "Global Scope Behavior",
    experiments: [
      {
        title: "var pollutes the global object",
        code: `var x = 1;
let y = 2;
const z = 3;

console.log(window.x);  // 1
console.log(window.y);  // undefined
console.log(window.z);  // undefined`,
        output: `1
undefined
undefined`,
        note: "var creates a property on the global object (window). let and const do not. This is why var leaks.",
      },
      {
        title: "Undeclared assignment creates global",
        code: `function leaky() {
  oops = "I'm global now!";  // No var/let/const
}
leaky();
console.log(window.oops);`,
        output: `"I'm global now!"`,
        note: "Forgetting var/let/const makes a variable global. Use 'use strict' to catch this as an error.",
      },
      {
        title: "typeof on undeclared variables",
        code: `console.log(typeof undeclaredVar);
console.log(typeof undefined);
console.log(typeof null);`,
        output: `"undefined"
"undefined"
"object"  // Famous JS bug since 1995`,
        note: "typeof is the only operator that doesn't throw on undeclared variables. typeof null === 'object' is a known bug.",
      },
    ],
  },
  {
    group: "The this Keyword",
    experiments: [
      {
        title: "this in a method vs standalone",
        code: `const user = {
  name: "Ada",
  greet() {
    console.log(this.name);
  }
};

user.greet();         // "Ada" (method call)
const fn = user.greet;
fn();                 // undefined (standalone)`,
        output: `"Ada"
undefined`,
        note: "Method call: this = object before dot. Standalone call: this = window (sloppy) or undefined (strict).",
      },
      {
        title: "Arrow function inherits this",
        code: `const user = {
  name: "Ada",
  greet: () => {
    console.log(this.name);
  }
};

user.greet();  // undefined!`,
        output: `undefined`,
        note: "Arrow functions don't have their own this. Object literals don't create scope, so this = window.",
      },
      {
        title: "Arrow function inside a method (the correct pattern)",
        code: `const user = {
  name: "Ada",
  loadData() {
    // Regular method: this = user
    setTimeout(() => {
      // Arrow: inherits this from loadData
      console.log(this.name);
    }, 100);
  }
};

user.loadData();`,
        output: `"Ada"  // after 100ms`,
        note: "This is the real use case for arrow functions. The arrow inherits this from the enclosing method.",
      },
      {
        title: "call, apply, and bind",
        code: `function introduce(greeting) {
  console.log(\`\${greeting}, I'm \${this.name}\`);
}

const ada = { name: "Ada" };

introduce.call(ada, "Hello");
introduce.apply(ada, ["Hi"]);

const bound = introduce.bind(ada);
bound("Hey");`,
        output: `"Hello, I'm Ada"
"Hi, I'm Ada"
"Hey, I'm Ada"`,
        note: "call/apply invoke immediately. bind returns a new function with this locked. bind is great for event handlers.",
      },
      {
        title: "new keyword creates a fresh this",
        code: `function Car(make) {
  this.make = make;
  console.log(this);
}

const myCar = new Car("Toyota");
console.log(myCar.make);`,
        output: `Car { make: "Toyota" }
"Toyota"`,
        note: "new creates a new empty object, sets this to it, runs the function, and returns this.",
      },
      {
        title: "this in class methods",
        code: `class Timer {
  constructor() { this.seconds = 0; }
  start() {
    // Wrong: standalone function loses this
    // setInterval(function() { this.seconds++; }, 1000);
    
    // Right: arrow function inherits this
    setInterval(() => {
      this.seconds++;
      console.log(this.seconds);
    }, 1000);
  }
}

new Timer().start();`,
        output: `1  // after 1s
2  // after 2s
3  // after 3s ...`,
        note: "In classes, use arrow functions for callbacks to preserve this. This is the #1 pattern in React.",
      },
    ],
  },
  {
    group: "Scope & Closures",
    experiments: [
      {
        title: "The classic closure-over-var bug",
        code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}`,
        output: `3
3
3`,
        note: "All three callbacks share the same i. By the time they run, the loop is done and i is 3.",
      },
      {
        title: "Fix: use let instead of var",
        code: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}`,
        output: `0
1
2`,
        note: "let creates a new binding for each iteration. Each callback closes over its own i.",
      },
      {
        title: "Fix: use an IIFE (pre-ES6 pattern)",
        code: `for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}`,
        output: `0
1
2`,
        note: "Before let existed, developers used IIFEs to create a new scope per iteration. Knowledge of this helps you read older codebases.",
      },
      {
        title: "Closure preserves the scope chain",
        code: `function outer() {
  const secret = 42;
  return function inner() {
    console.log(secret);
  };
}

const fn = outer();
fn();  // Can still access secret!`,
        output: `42`,
        note: "inner() still has access to secret even after outer() has returned. The scope chain is preserved.",
      },
      {
        title: "Closures create private state",
        code: `function createCounter() {
  let count = 0;
  return {
    increment() { count++; },
    getCount() { return count; }
  };
}

const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.getCount());
console.log(counter.count);  // Can't access directly`,
        output: `2
undefined`,
        note: "count is private. Only the returned methods can access it. This is the module pattern.",
      },
      {
        title: "Each call creates a new scope",
        code: `function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(3));
console.log(add10(3));`,
        output: `8
13`,
        note: "Each call to makeAdder creates a new closure with its own x. add5 and add10 are independent.",
      },
      {
        title: "Lexical scope (where defined, not where called)",
        code: `const x = "global";

function outer() {
  const x = "outer";
  function inner() {
    console.log(x);
  }
  return inner;
}

function callFromElsewhere() {
  const x = "elsewhere";
  const fn = outer();
  fn();  // Where does it look for x?
}

callFromElsewhere();`,
        output: `"outer"`,
        note: "inner() looks up x where it was defined (inside outer), not where it was called. This is lexical scoping.",
      },
    ],
  },
  {
    group: "Tricky Interview Questions",
    experiments: [
      {
        title: "Function declaration inside block scope",
        code: `var a = 1;
function b() {
  a = 10;
  return;
  function a() {}
}
b();
console.log(a);`,
        output: `1`,
        note: "function a() {} is hoisted inside b(), creating a local a. a = 10 sets the local one, not global.",
      },
      {
        title: "Variable shadowing",
        code: `var x = 10;
function test() {
  console.log(x);  // What is x here?
  var x = 20;
  console.log(x);
}
test();`,
        output: `undefined
20`,
        note: "The inner var x is hoisted to the top of test(), shadowing the outer x. First log sees undefined.",
      },
      {
        title: "Hoisting order: function > var",
        code: `console.log(typeof foo);
var foo = "bar";
function foo() {}`,
        output: `"function"`,
        note: "Function declarations are hoisted before var. So foo is the function, not undefined.",
      },
      {
        title: "Multiple var declarations",
        code: `var x = 1;
var x = 2;
var x = 3;
console.log(x);

// With let:
// let y = 1;
// let y = 2;  // SyntaxError: already declared`,
        output: `3`,
        note: "var allows redeclaration (just overwrites). let and const throw SyntaxError on redeclaration.",
      },
      {
        title: "IIFE and hoisting",
        code: `var result = (function() {
  var x = 10;
  return x;
})();

console.log(result);
// console.log(x);  // ReferenceError: x is not defined`,
        output: `10`,
        note: "IIFEs create their own scope. x is trapped inside. The only way out is through the return value.",
      },
      {
        title: "Named function expression",
        code: `var foo = function bar() {
  console.log(typeof bar);  // "function"
  console.log(typeof foo);  // "function"
};

foo();
console.log(typeof bar);`,
        output: `"function"
"function"
"undefined"`,
        note: "Named function expressions: the name (bar) is only accessible inside the function body, not outside.",
      },
      {
        title: "Strict mode changes this behavior",
        code: `"use strict";

function test() {
  console.log(this);
}

test();              // undefined (not window!)
test.call(null);     // null (not window!)
test.call(undefined);  // undefined`,
        output: `undefined
null
undefined`,
        note: "In strict mode, standalone functions get this = undefined. call/apply don't coerce null/undefined to window.",
      },
      {
        title: "The comma operator in for loops",
        code: `for (var i = 0, j = 10; i < 3; i++, j--) {
  console.log(i, j);
}`,
        output: `0 10
1 9
2 8`,
        note: "The comma operator evaluates both expressions. Both i and j are in the same var declaration.",
      },
      {
        title: "arguments object vs arrow functions",
        code: `function regular() {
  console.log(arguments.length);
}

const arrow = () => {
  // console.log(arguments);  // ReferenceError!
  console.log("arrows have no arguments object");
};

regular(1, 2, 3);
arrow();`,
        output: `3
"arrows have no arguments object"`,
        note: "Arrow functions don't have their own arguments object. Use rest parameters (...args) instead.",
      },
    ],
  },
];

/* ── Key Takeaways ── */
const TAKEAWAYS = [
  {
    title: "Two phases, every time",
    description:
      'Every Execution Context goes through a Creation Phase (memory allocation) and an Execution Phase (running code). Understanding this two-step process is what makes "hoisting" intuitive instead of magical.',
    icon: "🔄",
  },
  {
    title: "var hoists with undefined, let/const don't initialize",
    description:
      "All declarations are hoisted (the engine knows about them), but var is initialized to undefined while let and const stay in the Temporal Dead Zone until their declaration line. This is why let and const are safer.",
    icon: "📦",
  },
  {
    title: "The Call Stack is your execution timeline",
    description:
      "Every function call pushes a new Execution Context. Every return pops one off. If the stack gets too deep (recursion without a base case), you get a Stack Overflow. Chrome DevTools shows the stack in the Sources panel.",
    icon: "📚",
  },
  {
    title: "Scope chain is set at creation, not at call time",
    description:
      "A function's scope chain is determined by where the function is written in the source code (lexical scoping), not where it is called from. This is what makes closures possible and predictable.",
    icon: "🔗",
  },
  {
    title: "this depends on how a function is called",
    description:
      "The same function can have different this values depending on whether it is called as a method, standalone, with new, or with call/apply/bind. Arrow functions are the exception: they inherit this from their enclosing scope.",
    icon: "🎯",
  },
  {
    title: "Use const by default, let when rebinding, never var",
    description:
      "Modern JavaScript best practice: const for everything, let when you genuinely need to reassign, var never. This eliminates hoisting confusion, prevents TDZ surprises by encouraging declare-before-use, and avoids global scope pollution.",
    icon: "✅",
  },
];

export default function ExecutionContextHoistingPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="dot-grid-bg absolute inset-0" aria-hidden="true" />
        <div
          className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(circle, rgba(176,196,222,0.05) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-xs font-medium uppercase tracking-[0.25em] text-muted"
          >
            JavaScript Deep Dive · Topic 1 of 8
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.1,
            }}
            className="mt-6 font-heading text-4xl font-bold text-platinum md:text-6xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Execution Context & Hoisting
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2,
            }}
            className="mt-6 mx-auto max-w-xl"
          >
            <TextGenerateEffect
              words="Before your JavaScript runs a single line, the engine has already read your entire code and set up memory. Understanding this invisible setup phase is the key to understanding hoisting, scope, closures, and the this keyword."
              className="!font-normal !text-secondary"
              duration={0.3}
              filter={false}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-8 flex items-center justify-center gap-6 text-xs text-muted"
          >
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              25 min read
            </span>
            <span className="w-px h-3 bg-divider" />
            <span>6 Interactive Diagrams</span>
            <span className="w-px h-3 bg-divider" />
            <span>Console Experiments</span>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-glow-divider" aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════
          MAIN CONTENT
          ═══════════════════════════════════════════════════════ */}
      <TracingBeam className="px-6 py-16 md:py-24">
        {/* ── Section 1: What is an Execution Context? ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader
            number="01"
            title="What is an Execution Context?"
            subtitle="The invisible container your code runs inside"
          />

          <div className="space-y-6 max-w-2xl">
            <p
              className="text-sm text-secondary leading-relaxed"
              style={{ lineHeight: "1.8" }}
            >
              Every piece of JavaScript runs inside something called an{" "}
              <strong className="text-platinum">Execution Context</strong>.
              Think of it as a workspace the engine creates to run your code. It
              contains everything the code needs: which variables exist, what
              their values are, what scope it has access to, and what{" "}
              <code className="text-accent text-xs font-mono">this</code> refers
              to.
            </p>

            <p
              className="text-sm text-secondary leading-relaxed"
              style={{ lineHeight: "1.8" }}
            >
              There are three types. The{" "}
              <strong className="text-platinum">
                Global Execution Context
              </strong>{" "}
              is created when your script first loads. There is always exactly
              one. A{" "}
              <strong className="text-platinum">
                Function Execution Context
              </strong>{" "}
              is created every time a function is called. And an{" "}
              <strong className="text-platinum">Eval Execution Context</strong>{" "}
              is created inside eval() (which you should never use in
              production).
            </p>

            <p
              className="text-sm text-secondary leading-relaxed"
              style={{ lineHeight: "1.8" }}
            >
              The critical insight: each Execution Context goes through{" "}
              <strong className="text-platinum">two phases</strong>. First, a
              Creation Phase where the engine allocates memory for all
              declarations. Then, an Execution Phase where it runs your code
              line by line. This two-step process is the entire explanation for
              &quot;hoisting.&quot;
            </p>

            {/* Three types card grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8">
              {[
                {
                  type: "Global",
                  desc: "Created once when your script loads. Sets up the global object (window in browsers), creates the global scope, and sets this = window.",
                  icon: "🌍",
                },
                {
                  type: "Function",
                  desc: "Created every time a function is called. Has its own Variable Environment, scope chain (linked to where it was defined), and its own this value.",
                  icon: "⚡",
                },
                {
                  type: "Eval",
                  desc: "Created when eval() runs a string of code. Inherits the calling context's scope. Avoid eval() in production. It breaks optimizations, creates security risks, and makes debugging impossible.",
                  icon: "⚠️",
                },
              ].map((item) => (
                <div
                  key={item.type}
                  className="p-5 border border-divider hover:border-divider-hover bg-surface/20"
                  style={{
                    borderRadius: "2px",
                    transition:
                      "border-color 400ms cubic-bezier(0.25, 0.1, 0.25, 1)",
                  }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <h4 className="mt-2 text-sm font-medium text-platinum">
                    {item.type}
                  </h4>
                  <p
                    className="mt-2 text-xs text-secondary leading-relaxed"
                    style={{ lineHeight: "1.8" }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-l-2 border-accent/40 pl-4">
              <p
                className="text-xs text-secondary leading-relaxed"
                style={{ lineHeight: "1.8" }}
              >
                💡 <strong className="text-platinum">Key insight:</strong> When
                someone says &quot;hoisting&quot; in JavaScript, they are really
                describing the Creation Phase of the Execution Context. The
                engine doesn&apos;t physically move code. It just processes
                declarations before running anything.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── Section 2: Creation Phase vs Execution Phase ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader
            number="02"
            title="Creation Phase vs Execution Phase"
            subtitle="What the engine does before running your first line"
          />

          <div className="space-y-6 mb-10 max-w-2xl">
            <p
              className="text-sm text-secondary leading-relaxed"
              style={{ lineHeight: "1.8" }}
            >
              Here is a real code snippet. Watch what the JavaScript engine does
              with it. During the{" "}
              <strong className="text-platinum">Creation Phase</strong>, it
              scans for all variable and function declarations and allocates
              memory. <code className="text-accent text-xs font-mono">var</code>{" "}
              gets set to{" "}
              <code className="text-accent text-xs font-mono">undefined</code>.
              Function declarations are stored entirely.{" "}
              <code className="text-accent text-xs font-mono">let</code> and{" "}
              <code className="text-accent text-xs font-mono">const</code> are
              registered but not initialized (the Temporal Dead Zone).
            </p>

            <p
              className="text-sm text-secondary leading-relaxed"
              style={{ lineHeight: "1.8" }}
            >
              Then in the{" "}
              <strong className="text-platinum">Execution Phase</strong>, the
              engine runs code line by line, assigning values and calling
              functions. Step through the diagram below to see the exact memory
              state at each point.
            </p>
          </div>

          <ExecutionContextDiagram />
        </motion.section>

        {/* ── Section 3: The Call Stack ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader
            number="03"
            title="The Call Stack"
            subtitle="How JavaScript tracks what is running right now"
          />

          <div className="space-y-6 mb-10 max-w-2xl">
            <p
              className="text-sm text-secondary leading-relaxed"
              style={{ lineHeight: "1.8" }}
            >
              JavaScript is{" "}
              <strong className="text-platinum">single-threaded</strong>. It can
              only do one thing at a time. The Call Stack is how the engine
              keeps track of where it is in your code. When a function is
              called, a new Execution Context is pushed onto the stack. When a
              function returns, its context is popped off. The context on top is
              the one currently running.
            </p>

            <p
              className="text-sm text-secondary leading-relaxed"
              style={{ lineHeight: "1.8" }}
            >
              V8 (Chrome, Node.js) and SpiderMonkey (Firefox) both use a
              stack-based execution model. The stack has a fixed size limit. If
              you push too many frames (usually from infinite recursion), you
              get the famous{" "}
              <strong className="text-platinum">
                &quot;Maximum call stack size exceeded&quot;
              </strong>{" "}
              error. Chrome limits it to about 10,000-16,000 frames depending on
              the frame size.
            </p>
          </div>

          <CallStackDiagram />

          <div className="mt-8 border-l-2 border-accent/40 pl-4 max-w-2xl">
            <p
              className="text-xs text-secondary leading-relaxed"
              style={{ lineHeight: "1.8" }}
            >
              💡 <strong className="text-platinum">Open Chrome DevTools</strong>{" "}
              (Sources panel → Call Stack) and set a breakpoint inside a nested
              function. You will see the exact same stack structure shown above.
              Every frame shows the function name, the file, and the line
              number. This is the most useful debugging tool you have.
            </p>
          </div>
        </motion.section>

        {/* ── Section 4: Hoisting Demystified ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader
            number="04"
            title="Hoisting Demystified"
            subtitle="What you write vs what the engine actually does"
          />

          <div className="space-y-6 mb-10 max-w-2xl">
            <p
              className="text-sm text-secondary leading-relaxed"
              style={{ lineHeight: "1.8" }}
            >
              &quot;Hoisting&quot; is the most misunderstood concept in
              JavaScript. People say &quot;declarations are moved to the
              top.&quot; That is a useful mental model, but it is not what
              actually happens. The engine doesn&apos;t move your code. During
              the Creation Phase, it{" "}
              <strong className="text-platinum">
                scans for declarations and allocates memory
              </strong>{" "}
              before executing anything. The code stays exactly where you wrote
              it.
            </p>

            <p
              className="text-sm text-secondary leading-relaxed"
              style={{ lineHeight: "1.8" }}
            >
              Here are 6 examples showing exactly what happens with different
              declaration types. Each one shows your original code on the left
              and what the engine effectively does on the right. These are the
              exact patterns that show up in interviews at companies like
              Google, Meta, and Amazon.
            </p>
          </div>

          <HoistingVisualizer />
        </motion.section>

        {/* ── Section 5: The Temporal Dead Zone ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader
            number="05"
            title="The Temporal Dead Zone"
            subtitle="Why let and const throw errors before their declaration"
          />

          <div className="space-y-6 mb-10 max-w-2xl">
            <p
              className="text-sm text-secondary leading-relaxed"
              style={{ lineHeight: "1.8" }}
            >
              The Temporal Dead Zone (TDZ) is the period between the start of a
              block scope and the line where a{" "}
              <code className="text-accent text-xs font-mono">let</code> or{" "}
              <code className="text-accent text-xs font-mono">const</code>{" "}
              variable is declared. Accessing the variable during this period
              throws a <strong className="text-platinum">ReferenceError</strong>
              .
            </p>

            <p
              className="text-sm text-secondary leading-relaxed"
              style={{ lineHeight: "1.8" }}
            >
              The name &quot;temporal&quot; means it is about{" "}
              <strong className="text-platinum">time</strong>, not position. It
              is not about where the variable is in the code, but when the
              execution reaches the declaration. The TDZ exists from the moment
              the scope is entered until the declaration is executed. Click on
              each variable type below to see the full lifecycle.
            </p>
          </div>

          <TDZDiagram />

          <div className="mt-8 border-l-2 border-accent/40 pl-4 max-w-2xl">
            <p
              className="text-xs text-secondary leading-relaxed"
              style={{ lineHeight: "1.8" }}
            >
              💡{" "}
              <strong className="text-platinum">Why does the TDZ exist?</strong>{" "}
              It catches bugs early. With{" "}
              <code className="text-accent text-xs font-mono">var</code>,
              accessing a variable before assignment silently gives you{" "}
              <code className="text-accent text-xs font-mono">undefined</code>,
              which often leads to hard-to-trace bugs. The TDZ forces you to
              declare before you use. The ReferenceError is a feature, not a
              bug. The TC39 committee (the group that designs JavaScript) added
              it deliberately after years of var-related pain.
            </p>
          </div>
        </motion.section>

        {/* ── Section 6: Scope Chain ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader
            number="06"
            title="The Scope Chain"
            subtitle="How JavaScript finds your variables"
          />

          <div className="space-y-6 mb-10 max-w-2xl">
            <p
              className="text-sm text-secondary leading-relaxed"
              style={{ lineHeight: "1.8" }}
            >
              When the engine encounters a variable, it doesn&apos;t search
              every scope randomly. It follows a strict lookup order called the{" "}
              <strong className="text-platinum">Scope Chain</strong>. It starts
              in the current Execution Context, and if the variable isn&apos;t
              found, it walks up to the enclosing scope, then to that
              scope&apos;s enclosing scope, all the way up to Global.
            </p>

            <p
              className="text-sm text-secondary leading-relaxed"
              style={{ lineHeight: "1.8" }}
            >
              Crucially, the scope chain is determined by{" "}
              <strong className="text-platinum">
                where the function is written
              </strong>{" "}
              (lexical scoping), not where it is called. This is what makes
              JavaScript closures predictable. A function always has access to
              the variables from the scope where it was defined, even if it is
              called from somewhere completely different.
            </p>
          </div>

          <ScopeChainDiagram />
        </motion.section>

        {/* ── Section 7: The this Keyword ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader
            number="07"
            title="The this Keyword"
            subtitle="Seven rules that determine what this refers to"
          />

          <div className="space-y-6 mb-10 max-w-2xl">
            <p
              className="text-sm text-secondary leading-relaxed"
              style={{ lineHeight: "1.8" }}
            >
              <code className="text-accent text-xs font-mono">this</code> is
              part of every Execution Context. Unlike scope (which is determined
              by where a function is written),{" "}
              <code className="text-accent text-xs font-mono">this</code> is
              determined by{" "}
              <strong className="text-platinum">
                how a function is called
              </strong>
              . The same function can have completely different{" "}
              <code className="text-accent text-xs font-mono">this</code> values
              depending on how you invoke it.
            </p>

            <p
              className="text-sm text-secondary leading-relaxed"
              style={{ lineHeight: "1.8" }}
            >
              This is one of the most asked topics in frontend interviews.
              Companies like Airbnb, Stripe, and Shopify routinely test this
              because it separates developers who understand JavaScript deeply
              from those who only use it. There are 7 scenarios. Click through
              each one below.
            </p>
          </div>

          <ThisBindingDiagram />
        </motion.section>

        {/* ── Section 8: Console Experiments ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader
            number="08"
            title="Console Experiments"
            subtitle="Try these in your browser right now"
          />

          <p
            className="text-sm text-secondary leading-relaxed mb-10 max-w-2xl"
            style={{ lineHeight: "1.8" }}
          >
            The best way to internalize these concepts is to experiment. Open
            your browser&apos;s DevTools (Cmd+Option+J on Mac, Ctrl+Shift+J on
            Windows) and paste these one by one. Predict the output before you
            run it.
          </p>

          <ConsoleExperimentsStepper />
        </motion.section>

        {/* ── Section 9: Key Takeaways ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <SectionHeader
            number="09"
            title="Key Takeaways"
            subtitle="The concepts that stick"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            {TAKEAWAYS.map((item, i) => (
              <motion.div
                key={item.title}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: i * 0.08,
                }}
                className="group p-6 border border-divider hover:border-divider-hover bg-surface/30"
                style={{
                  borderRadius: "2px",
                  transition:
                    "border-color 400ms cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
              >
                <span className="text-2xl">{item.icon}</span>
                <h4 className="mt-3 text-sm font-medium text-platinum">
                  {item.title}
                </h4>
                <p
                  className="mt-2 text-xs text-secondary leading-relaxed"
                  style={{ lineHeight: "1.8" }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </TracingBeam>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   Reusable Sub-Components
   ═══════════════════════════════════════════════════════════ */

function SectionHeader({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-8">
      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-accent/60">
        Section {number}
      </span>
      <h2
        className="mt-2 font-heading text-2xl font-semibold text-platinum md:text-3xl"
        style={{ letterSpacing: "-0.02em" }}
      >
        {title}
      </h2>
      <p className="mt-2 text-sm text-muted">{subtitle}</p>
    </div>
  );
}

function ConsoleExperimentsStepper() {
  const [groupIdx, setGroupIdx] = useState(0);
  const [expIdx, setExpIdx] = useState(0);

  const group = CONSOLE_EXPERIMENT_GROUPS[groupIdx];
  const exp = group.experiments[expIdx];
  const totalInGroup = group.experiments.length;

  const switchGroup = (i: number) => {
    setGroupIdx(i);
    setExpIdx(0);
  };

  return (
    <div
      className="border border-divider bg-[#1A1C1E] overflow-hidden"
      style={{ borderRadius: "2px" }}
    >
      {/* Group Tabs */}
      <div className="border-b border-divider overflow-x-auto scrollbar-none">
        <div className="flex min-w-max">
          {CONSOLE_EXPERIMENT_GROUPS.map((g, i) => (
            <button
              key={g.group}
              onClick={() => switchGroup(i)}
              className={`px-5 py-3 text-xs transition-colors duration-300 whitespace-nowrap border-b-2 ${
                i === groupIdx
                  ? "text-accent border-accent bg-surface/30"
                  : "text-muted border-transparent hover:text-secondary hover:bg-surface/10"
              }`}
            >
              {g.group}
            </button>
          ))}
        </div>
      </div>

      {/* Counter */}
      <div className="flex items-center justify-between px-5 py-2 border-b border-divider bg-surface/20">
        <span className="text-[10px] uppercase tracking-[0.15em] text-muted">
          Example {expIdx + 1} of {totalInGroup}
        </span>
        <span className="text-[10px] uppercase tracking-[0.15em] text-muted">
          {group.group}
        </span>
      </div>

      {/* Experiment Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${groupIdx}-${expIdx}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Title */}
          <div className="px-5 py-3 border-b border-divider">
            <h5 className="text-sm font-medium text-platinum">{exp.title}</h5>
          </div>

          {/* Code */}
          <div className="relative border-b border-divider bg-[#15171a]">
            <div className="absolute top-2 right-2 z-10">
              <CopyButton text={exp.code} />
            </div>
            <div className="px-5 py-4 overflow-x-auto">
              <pre className="text-xs font-mono text-platinum/80 leading-relaxed whitespace-pre">
                {exp.code}
              </pre>
            </div>
          </div>

          {/* Output */}
          <div className="border-b border-divider px-5 py-3 bg-surface/20">
            <span className="text-[10px] uppercase tracking-[0.15em] text-muted block mb-2">
              Output
            </span>
            <pre className="text-xs font-mono text-emerald-400/80 leading-relaxed whitespace-pre overflow-x-auto">
              {exp.output}
            </pre>
          </div>

          {/* Note */}
          <div className="px-5 py-3 border-b border-divider">
            <p className="text-xs text-secondary leading-relaxed">{exp.note}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between px-5 py-3">
        <button
          onClick={() => setExpIdx((i) => Math.max(0, i - 1))}
          disabled={expIdx === 0}
          className="flex items-center gap-2 text-xs transition-colors duration-300 disabled:opacity-20 disabled:cursor-not-allowed text-muted hover:text-accent"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Previous
        </button>

        {/* Dots */}
        <div className="flex gap-1.5">
          {group.experiments.map((_, i) => (
            <button
              key={i}
              onClick={() => setExpIdx(i)}
              className={`w-1.5 h-1.5 transition-all duration-300 ${
                i === expIdx
                  ? "bg-accent scale-125"
                  : "bg-muted/30 hover:bg-muted/60"
              }`}
              style={{ borderRadius: "1px" }}
              aria-label={`Go to example ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setExpIdx((i) => Math.min(totalInGroup - 1, i + 1))}
          disabled={expIdx === totalInGroup - 1}
          className="flex items-center gap-2 text-xs transition-colors duration-300 disabled:opacity-20 disabled:cursor-not-allowed text-muted hover:text-accent"
        >
          Next
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
