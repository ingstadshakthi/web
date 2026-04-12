# Content Writing Standards Reference

## Voice: Senior Dev Teaching a Friend

Use first/second person. Be direct and conversational. Ask rhetorical questions and answer them. Use real-world examples with real companies and specific numbers.

**Good:** "Here's the problem: your team will never agree on what to build next."
**Bad:** "Product teams face the fundamental challenge of reaching consensus on development priorities."

## Banned Patterns

### Em-Dashes and En-Dashes

All `—` and `–` are banned. Replace with:

| Instead of                  | Use                        |
| --------------------------- | -------------------------- |
| `X — Y` (adding context)    | `X. Y` or `X, which Y`     |
| `X — Y` (clarifying)        | `X: Y`                     |
| `X — Y — Z` (parenthetical) | `X (Y) Z` or two sentences |
| `X — Y` (contrast)          | `X. But Y` or `X, not Y`   |

### AI Language

| Avoid                                       | Use instead  |
| ------------------------------------------- | ------------ |
| "It is worth noting that..."                | Just say it  |
| "In the realm of..."                        | "in"         |
| "Leveraging X"                              | "Using X"    |
| "Delve into"                                | "Look at"    |
| "Cutting-edge" / "robust" / "comprehensive" | Be specific  |
| Passive voice by default                    | Active voice |

## Content Complexity

1. **Main sections** — Accessible to newcomers. Analogies, plain language, real stories.
2. **Optional Advanced** — Collapsible, at the bottom. Label with "Optional · Advanced" badge.

## JSX Formatting

- `&apos;` for single quotes, `&quot;` for double quotes in JSX text
- `<strong className="text-platinum">` for 2-4 words only
- Subtitle on `<SectionHeader>`: ≤ 12 words, no dashes
- No orphan dashes in text nodes

## Interactive Diagram Steps

Each step must:

- Tell a story (beginning, middle, point)
- Use specific numbers and outcomes
- End with `realWorldNote`: "The real lesson: [practical takeaway]"

## Takeaway Cards

- 6 max, 3 per row at large breakpoint
- Title: plain statement ("Your gut feeling is not data"), not category ("Data-Driven Decisions")
- Description: start with why, then what to do

## Tool Comparison Sections

- Start with simplest/most beginner-friendly
- One emoji per tool for visual scanning
- Tagline: one sentence
- No superlatives — specific claims only
