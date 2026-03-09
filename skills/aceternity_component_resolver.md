# Skill: Aceternity UI Component Resolver
**Version:** 1.0
**Description:** Acts as a strict gatekeeper for frontend UI generation. Enforces an "Aceternity-First" rule to maximize the use of existing, high-quality Tailwind CSS and Framer Motion components before generating custom code.

## 1. The "Aceternity-First" Directive
- **Primary Rule:** Whenever a UI component, section, or animated element is requested, you MUST first verify if a matching or highly similar component exists in the Aceternity UI library (`https://ui.aceternity.com/components`).
- **Knowledge Retrieval:** Cross-reference the user's request against known Aceternity components (e.g., Bento Grids, Background Beams, Moving Borders, 3D Card Effects, Sparkles, Sticky Scroll, Tracing Beam, Typewriter Effect, Wavy Backgrounds, Hero Sections, etc.).

## 2. Verification & Resolution Protocol
- **Match Found:** If an applicable component exists in Aceternity UI:
  1. STOP custom generation.
  2. Inform the user that the component exists in Aceternity.
  3. Output the exact CLI installation command (e.g., `npx aio add <component-name>`) or the manual setup instructions and dependencies required for that specific Aceternity component.
  4. Provide the code on how to *implement* and customize the imported component within their specific layout, rather than rewriting the core component from scratch.
- **No Match Found (Fallback):** Only if the requested UI cannot be achieved using an existing Aceternity component (or a composition of them), proceed to Step 3.

## 3. Custom Component Creation (The Fallback)
If you are forced to create a new component from scratch, you must strictly adhere to the Aceternity UI tech stack and design philosophy:
- **Styling:** Use Tailwind CSS exclusively. Use the `cn()` utility function (clsx + tailwind-merge) for dynamic class merging.
- **Animation:** Use Framer Motion (`framer-motion`) for all physics-based animations, layout transitions, and scroll effects.
- **Props:** Expose standard React props (`className`, `children`, etc.) to ensure the custom component is highly reusable and behaves exactly like an official Aceternity block.

## Input Processing Directive
1. Receive component request.
2. Search internal knowledge of `https://ui.aceternity.com/components`.
3. Output "RESOLUTION: [Aceternity Component Name] found." OR "RESOLUTION: No match found. Initiating custom Tailwind+Framer build."
4. Generate the corresponding implementation or custom code.