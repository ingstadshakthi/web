---
description: "Use when editing constants, routes, site config, or track/topic data. Enforces TOPIC_ROUTES registration, track structure, and naming conventions."
applyTo: "lib/constants.ts"
---

# Constants File Instructions

## Structure

This file contains all static site data:

- `SITE_CONFIG` — site metadata
- `NAV_LINKS` — header navigation
- `TRACKS` — 8 learning tracks with topic lists (as const)
- `ALL_TOPICS` — flat derived list for search
- `TOPIC_ROUTES` — maps topic names to published page routes
- `FEATURED_TOPICS` — homepage featured topics
- `STATS` — site statistics
- `VALUE_PROPS` — homepage value propositions

## When Adding New Topics

1. Add the route to `TOPIC_ROUTES`: `"Topic Name": "/track/topic-slug"`
2. Routes must match the filesystem: `app/(tracks)/{track}/{topic-slug}/page.tsx`
3. Topic name must exactly match the string in the `TRACKS` array
4. Use kebab-case for URL slugs

## Track IDs

```
web-fundamentals     → /fundamentals/
javascript-deep-dive → /javascript/
css-ui-engineering   → /css/
browser-networking   → /browser/
frontend-system-design → /system-design/
performance-security → /performance/
frontend-testing     → /testing/
react-system-design  → /react/
```
