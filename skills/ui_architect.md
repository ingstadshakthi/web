# Skill: UI Architect
**Version:** 1.0
**Description:** Generates premium, high-end user interfaces for educational platforms by applying strict rules of minimalism, sharp geometry, and a constrained "premium gray" color science.

## 1. Color Science & Hierarchy
- **Framework:** Strict adherence to the 60/30/10 rule.
- **Palette:** - 60% Background: `#1A1C1E` (Deep Slate Gray)
  - 30% Surfaces: `#282A2D` (Elevated Charcoal)
  - 10% Accents: `#B0C4DE` (Light Steel Blue) and `#F8F9FA` (Crisp Platinum)
- **Constraints:** Never use highly saturated primary colors. Ensure all typography meets WCAG AAA contrast standards for maximum legibility during long study sessions.

## 2. Geometry & Depth
- **Border Radius:** `0px` to `2px` maximum. Sharp edges convey a bespoke, architectural, and serious tone.
- **Borders:** `1px` solid, utilizing low opacity (10-15% pure white) to create hairline dividers.
- **Depth:** Rely heavily on flat design and color contrast to separate layers. If shadows are strictly required, use a large blur radius (`>30px`) and extremely low opacity (`<8%`).

## 3. Spacing & Layout
- **Negative Space:** Aggressive use of whitespace. Components must use 2x or 3x standard padding to isolate educational content and prevent cognitive overload.
- **Grid:** Standard 8pt grid system.
- **Density:** Low. Focus the user entirely on the current lesson, video, or reading material.

## 4. Typography
- **Headings (Course Titles, Module Names):** High-contrast, elegant Serif fonts (e.g., Playfair Display, GT Super) or ultra-wide Sans-Serifs. Use `-0.02em` letter spacing for large headings.
- **Body (Lesson Text, Transcripts):** Clean, highly legible geometric Sans-Serif fonts (e.g., Inter, Roboto). Increase line-height (`1.6` to `1.8`) to make dense educational text effortless to read.

## 5. Media & Video Player Guidelines
- **Portrait & Mobile-First Video Optimization:** Educational modules frequently utilize vertical video formats. Ensure portrait video containers maintain sharp corners, utilize minimal interface overlays, and scale cleanly without letterboxing to provide an immersive, premium viewing experience.
- **Imagery:** Any placeholder or structural imagery should be muted or uniformly color-graded to match the gray/blue palette.

## 6. Motion & Micro-interactions
- **Easing:** Use `cubic-bezier(0.25, 0.1, 0.25, 1)` or smooth `ease-in-out`.
- **Duration:** `300ms` to `500ms` for a deliberate, cinematic feel.
- **Constraint:** Bouncy or playful animations are strictly prohibited. Progress bars and UI transitions must feel fluid and heavy.

## Input Processing Directive
When receiving UI generation requests, parse the intent and automatically map the requested educational components (e.g., course dashboards, video players, lesson sidebars) to the rules defined in this document before generating the final code.