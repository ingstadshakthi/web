"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface InputTypeItem {
  type: string;
  label: string;
  mobileLabel: string;
  purpose: string;
  placeholder: string;
  inputmode?: string;
  attrs?: Record<string, string>;
  tag?: string;
}

const INPUT_TYPES: InputTypeItem[] = [
  { type: "text", label: "text", mobileLabel: "Standard keyboard", purpose: "Free-form single-line text. The default.", placeholder: "Type anything..." },
  { type: "email", label: "email", mobileLabel: "Email keyboard (@, .)", purpose: "Validates email format. Mobile shows @ key.", placeholder: "user@example.com" },
  { type: "tel", label: "tel", mobileLabel: "Phone keypad", purpose: "No server-side validation (phone formats vary globally), but it triggers the numeric phone keyboard on mobile.", placeholder: "+1 (555) 000-0000" },
  { type: "url", label: "url", mobileLabel: "URL keyboard (/, .com)", purpose: "Validates URL format. Mobile shows slash key.", placeholder: "https://example.com" },
  { type: "number", label: "number", mobileLabel: "Numeric keyboard", purpose: "Numeric input with spin controls. Use inputmode='numeric' for credit cards.", placeholder: "42", attrs: { min: "0", max: "100" } },
  { type: "search", label: "search", mobileLabel: "Search keyboard", purpose: "Same as text but with a clear button. Semantically a search field.", placeholder: "Search..." },
  { type: "password", label: "password", mobileLabel: "Dense keyboard", purpose: "Masks input. Use autocomplete='current-password' for password managers.", placeholder: "••••••••" },
  { type: "date", label: "date", mobileLabel: "Native date picker", purpose: "Returns YYYY-MM-DD. Browser UI varies wildly.", placeholder: "2026-03-26" },
  { type: "color", label: "color", mobileLabel: "Native color picker", purpose: "Returns #RRGGBB hex. No alpha channel support.", placeholder: "", attrs: { value: "#B0C4DE" } },
  { type: "range", label: "range", mobileLabel: "Slider control", purpose: "A drag slider. Always show the current value in an <output> element.", placeholder: "", attrs: { min: "0", max: "100", defaultValue: "40" } },
  { type: "checkbox", label: "checkbox", mobileLabel: "Toggle", purpose: "Binary choice. Group related checkboxes in a <fieldset>.", placeholder: "" },
  { type: "radio", label: "radio", mobileLabel: "Selection", purpose: "One of many. Grouped by name attribute. Navigate with arrow keys.", placeholder: "" },
];

export default function InputTypeGallery() {
  const [active, setActive] = useState<InputTypeItem>(INPUT_TYPES[0]);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4">
      {/* Grid of tags */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 lg:w-72 lg:grid-cols-3 shrink-0">
        {INPUT_TYPES.map((item) => (
          <button
            key={item.type}
            onClick={() => setActive(item)}
            className={cn(
              "px-2 py-2 text-[10px] font-mono font-bold border transition-all",
              active.type === item.type
                ? "bg-accent/10 border-accent/40 text-accent"
                : "border-divider text-muted hover:border-divider-hover hover:text-secondary"
            )}
            style={{ borderRadius: "2px" }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.type}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex-1 border border-divider bg-surface/20 overflow-hidden"
          style={{ borderRadius: "2px" }}
        >
          <div className="px-5 py-4 border-b border-divider bg-surface/40">
            <div className="flex items-center gap-3 flex-wrap">
              <code className="text-accent font-bold text-sm">type=&quot;{active.type}&quot;</code>
              <span className="text-[10px] text-muted/60 px-2 py-0.5 bg-accent/5 border border-accent/10 font-mono uppercase tracking-wider" style={{ borderRadius: "2px" }}>
                📱 {active.mobileLabel}
              </span>
            </div>
            <p className="mt-2 text-xs text-secondary/80 leading-relaxed">{active.purpose}</p>
          </div>

          <div className="p-5 space-y-4">
            {/* Live input */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted/60 mb-2">
                Live Demo
              </p>
              {active.type === "checkbox" ? (
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="demo-cb" className="w-4 h-4 accent-accent" />
                  <label htmlFor="demo-cb" className="text-sm text-secondary">I agree to the terms</label>
                </div>
              ) : active.type === "radio" ? (
                <div className="space-y-2">
                  {["Option A", "Option B", "Option C"].map((opt) => (
                    <div key={opt} className="flex items-center gap-3">
                      <input type="radio" name="demo-radio" value={opt} className="accent-accent" />
                      <label className="text-sm text-secondary">{opt}</label>
                    </div>
                  ))}
                </div>
              ) : (
                <input
                  type={active.type}
                  placeholder={active.placeholder}
                  {...(active.attrs || {})}
                  className="w-full bg-black/40 border border-divider px-3 py-2.5 text-sm font-mono text-platinum placeholder:text-muted/30 focus:outline-none focus:border-accent/40 transition-colors"
                  style={{ borderRadius: "2px" }}
                />
              )}
            </div>

            {/* Code */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted/60 mb-2">
                HTML
              </p>
              <pre className="bg-black/40 border border-divider p-3 text-[11px] font-mono text-accent/70 overflow-x-auto" style={{ borderRadius: "2px" }}>
                <code>{'<input type="'}{active.type}{'"'}{active.placeholder ? `\n  placeholder="${active.placeholder}"` : ""}{Object.entries(active.attrs || {}).map(([k, v]) => `\n  ${k}="${v}"`).join("")}
                  {" />"}
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
