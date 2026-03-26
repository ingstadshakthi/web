# Semantic HTML — Complete Topic Plan
### Frontend Mastery · Web Fundamentals Track

> **Purpose of this document:** A full content + interactive example blueprint for the "Semantic HTML" topic page. Every section describes *what to cover*, *what the interactive demo should do*, and *design/visual notes* for implementation.

---

## 📐 Page Structure Overview

The page is split into **two major pillars**:

1. **Part I — The History of HTML** (narrative, timeline-driven)
2. **Part II — Core Semantic Elements** (reference + interactive playground)

Each section within Part II follows a consistent pattern:
- Concept explanation
- When to use / when NOT to use
- Live working code example (interactive)
- Common mistakes callout box
- Browser support note (where relevant)

---

---

# PART I — The History of HTML

---

## Chapter 1: The World Before HTML

### 1.1 The Pre-Web Era
- **What to cover:**
  - How documents were shared before the web (FTP, Gopher, SGML, ARPANET)
  - SGML (Standard Generalized Markup Language) — the parent of HTML
    - What SGML is, why it was too complex for the open web
    - DocTypes are a direct inheritance from SGML
  - The problem Tim Berners-Lee was solving — linking scientific documents at CERN
- **Interactive Example:**
  - Side-by-side visual: "A SGML document structure" vs "the same in HTML" — toggle between them to see the simplification
- **Design Note:** Use a timeline-style entry card, muted retro terminal aesthetic for code blocks

### 1.2 Tim Berners-Lee & The Birth of the Web (1989–1991)
- **What to cover:**
  - 1989: TBL's proposal "Information Management: A Proposal" at CERN
  - 1990: First web browser (WorldWideWeb, later renamed Nexus), first web server
  - 1991: First public website ever — `info.cern.ch` — what it contained
  - The original 18 HTML elements TBL proposed
  - HTML as a simple subset of SGML — intentionally limited
- **Interactive Example:**
  - Render a simulation of the very first webpage `info.cern.ch` using only the original 18 tags — a live retro browser window showing how it actually looked
- **Design Note:** Pixel/monochrome browser chrome simulation

---

## Chapter 2: The HTML Versions — A Complete History

### 2.1 HTML 1.0 (1993)
- **What to cover:**
  - Dave Raggett's informal spec — not an official W3C standard yet
  - The 18 original elements: `<title>`, `<a>`, `<isindex>`, `<plaintext>`, `<listing>`, `<p>`, `<h1>`–`<h6>`, `<ul>`, `<li>`, `<address>`, `<hp1>`, `<hp2>`, `<dl>`, `<dt>`, `<dd>`, `<img>` (added by Mosaic)
  - `<img>` was NOT in TBL's original proposal — Marc Andreessen added it unilaterally for Mosaic, sparking the first ever HTML debate
  - How browsers were already diverging from the spec
- **Interactive Example:**
  - Interactive element list: click any of the 18 original elements to see what it did, its original syntax, and whether it still exists today (with status badge: ✅ Alive / ⚠️ Changed / ❌ Deprecated)

### 2.2 HTML 2.0 (1995) — RFC 1866
- **What to cover:**
  - First formal specification — IETF RFC 1866
  - Standardized what browsers were already doing
  - Introduction of `<form>`, `<input>`, `<select>`, `<textarea>` — the first interactive HTML
  - Tables introduced (chaos begins)
  - Character entities introduced (`&amp;`, `&lt;`, etc.)
- **Interactive Example:**
  - Build a replica of a 1995-era contact form using only HTML 2.0 elements — functional, no CSS, raw browser defaults — show how forms were born

### 2.3 HTML 3.0 (1995) — The Draft That Never Was
- **What to cover:**
  - Dave Raggett's ambitious draft — math markup, figures, text flow around images
  - Why it was abandoned — too ambitious, browser vendors ignored it and moved on
  - The lesson: specs that outpace browser vendors die
  - What survived: ideas that eventually appeared in HTML5
- **Design Note:** "Abandoned draft" visual treatment — strikethrough styling, ghost/faded card

### 2.4 HTML 3.2 (1997) — The Browser Wars Begin
- **What to cover:**
  - First W3C Recommendation for HTML
  - Codified browser extensions from Netscape and Internet Explorer
  - Introduced: `<font>`, `<center>`, `<blink>`, `<marquee>`, `<table>` layout
  - Presentational HTML takes over — the dark age begins
  - The Netscape vs Internet Explorer war (1995–2001)
    - Netscape introduced JavaScript, frames, plugins
    - IE introduced ActiveX, VBScript, proprietary CSS
    - Developers had to write two separate websites
  - `<font color="red" size="4" face="Arial">` — why this was a disaster
- **Interactive Example:**
  - "Time Machine" toggle — show a page built with HTML 3.2 table layouts and `<font>` tags vs the same page in modern semantic HTML. Toggle between them live
  - Show the raw HTML source difference (character count, readability)

### 2.5 HTML 4.0 (1997) & HTML 4.01 (1999) — The Separation of Concerns Era
- **What to cover:**
  - W3C pushes back against presentational HTML
  - Introduction of CSS as the proper home for presentation
  - `<div>` and `<span>` introduced as neutral containers (to be styled with CSS)
  - Deprecation of `<font>`, `<center>`, `<b>`, `<i>` (as presentational) — though browsers kept supporting them
  - Three doctypes: Strict, Transitional, Frameset — and what they mean
  - `<link rel="stylesheet">` becomes the standard
  - `<script>`, `<style>`, `<meta>` formalised
  - Internationalisation — `lang` attribute, `dir` attribute, `<bdo>`
  - HTML 4.01 — minor fixes, the "final" HTML for 15 years
- **Interactive Example:**
  - Doctype selector — click between Strict / Transitional / Frameset and see what each allowed/disallowed with live validation indicators

### 2.6 XHTML 1.0 (2000) & XHTML 1.1 (2001) — The XML Detour
- **What to cover:**
  - W3C's vision: reformulate HTML as XML (strict, case-sensitive, self-closing tags)
  - XHTML rules: lowercase tags, quoted attributes, closed tags (`<br />`, `<img />`)
  - `text/html` vs `application/xhtml+xml` content type — why this mattered
  - XHTML 2.0 — the proposal that broke backwards compatibility
  - Why XHTML failed: browser vendors refused to implement hard XML parsing errors
  - The "yellow screen of death" — any malformed XML crashes the page
  - The lasting impact: XHTML made the web development world take code quality seriously
- **Interactive Example:**
  - Live validator: type HTML and see it graded against HTML4 rules vs XHTML rules vs HTML5 rules — shows how strictness differs

### 2.7 The WHATWG Rebellion (2004) — HTML Lives Again
- **What to cover:**
  - W3C abandons HTML, pursues XHTML 2.0 and XForms
  - Apple, Mozilla, and Opera form the Web Hypertext Application Technology Working Group (WHATWG) — June 2004
  - WHATWG's core principle: "Pave the cowpaths" — standardise what works, don't break the web
  - Ian Hickson (Google) becomes the primary editor of the HTML Living Standard
  - WHATWG's Web Applications 1.0 — what would become HTML5
  - The two competing visions: W3C (clean slate, XML) vs WHATWG (pragmatic, backwards compatible)
- **Design Note:** "Fork in the road" split-path visual illustration

### 2.8 HTML5 — The Living Standard (2008–2014)
- **What to cover:**
  - 2007: W3C abandons XHTML 2.0 and adopts WHATWG's work as HTML5
  - 2008: First public working draft of HTML5
  - The HTML5 DOCTYPE: `<!DOCTYPE html>` — why it's so simple (just a legacy trigger, not a real SGML doctype)
  - What HTML5 introduced:
    - Semantic sectioning elements: `<header>`, `<footer>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`
    - New form input types: `email`, `url`, `number`, `range`, `date`, `time`, `search`, `color`
    - Native multimedia: `<video>`, `<audio>`, `<track>`
    - Graphics: `<canvas>`, inline `<svg>`
    - APIs: Web Storage, Web Workers, WebSockets, Geolocation, Drag and Drop, History API
    - `<details>`, `<summary>`, `<dialog>`, `<template>`, `<slot>`
    - `data-*` custom attributes
    - `contenteditable`, `draggable`, `spellcheck` global attributes
    - Microdata (`itemscope`, `itemtype`, `itemprop`)
  - 2014: HTML5 becomes an official W3C Recommendation
  - The parser algorithm — HTML5 defined exactly how browsers must parse broken HTML (no more yellow screens)
- **Interactive Example:**
  - "HTML5 Feature Radar" — an interactive wheel showing all HTML5 features grouped by category, click any to expand and see a live demo of that feature

### 2.9 HTML 5.1, 5.2, and The Living Standard (2016–Present)
- **What to cover:**
  - HTML 5.1 (2016) — `<picture>`, `<details>`/`<summary>` improvements, `<dialog>` (initially)
  - HTML 5.2 (2017) — `<dialog>` formally added, Payment Request API hooks, `allowpaymentrequest`
  - 2019: W3C and WHATWG sign a Memorandum of Understanding — WHATWG's HTML Living Standard becomes the single authoritative source
  - What "Living Standard" means — continuously updated, no version numbers, always current
  - How to follow changes: WHATWG GitHub commits, browser release notes
  - The concept of "baseline" — when a feature is safe to use across browsers
  - Where HTML is going: `<selectlist>`, Popover API, `<search>` element, Declarative Shadow DOM

### 2.10 Browser Compatibility & The Doctype Trigger
- **What to cover:**
  - How doctypes switched browsers between "quirks mode" and "standards mode"
  - Quirks mode — browsers emulate old IE4/NN4 bugs for legacy pages
  - Almost standards mode — existed briefly
  - Standards mode — `<!DOCTYPE html>` triggers this always
  - How to detect which mode a page is in (`document.compatMode`)
- **Interactive Example:**
  - Show the same CSS box model in quirks mode vs standards mode — visual difference of how IE calculated width (border-box vs content-box)

---

---

# PART II — Core Semantic Elements

> **Approach:** Every element gets its own sub-section. Each follows the pattern: Definition → Purpose → Syntax → Attributes → When to use / When NOT to use → Live interactive example → Common mistakes → Accessibility implications

---

## Chapter 3: Document Metadata Elements

> These live inside `<head>` and are invisible to the user but critical to the browser, search engines, and other systems.

### 3.1 `<!DOCTYPE>`
- **What to cover:** Not an HTML element — an instruction to the browser. History of complex doctypes. The HTML5 doctype is the only one you need today.
- **Interactive Example:** Doctype switcher — shows what mode the browser enters for different doctypes

### 3.2 `<html>`
- **What to cover:** Root element. The `lang` attribute — why it's critical for screen readers and SEO. `dir` attribute for RTL languages. `xmlns` in XHTML contexts.
- **Interactive Example:** Change the `lang` attribute live and observe how a screen reader would pronounce text differently (audio simulation)

### 3.3 `<head>`
- **What to cover:** Container for metadata. Nothing inside `<head>` renders directly. What belongs here vs what doesn't.

### 3.4 `<title>`
- **What to cover:** Browser tab text. SEO title (the most important on-page SEO element). Screen reader page announcement. Best practices: length (50–60 chars), format (Page Name | Site Name), uniqueness per page.
- **Interactive Example:** Live title editor — type a title and see a live preview of how it appears in Google search results, a browser tab, and how a screen reader announces it

### 3.5 `<base>`
- **What to cover:** Sets the base URL for all relative URLs on the page. The `target` attribute (default link target). When to use it (rarely). Why it can cause unexpected bugs. Only one `<base>` allowed per page.
- **Interactive Example:** Toggle `<base href>` on/off and observe how relative links on the page resolve differently

### 3.6 `<link>`
- **What to cover:**
  - `rel="stylesheet"` — loading CSS
  - `rel="icon"` / `rel="apple-touch-icon"` — favicons
  - `rel="canonical"` — SEO, preventing duplicate content
  - `rel="preload"`, `rel="prefetch"`, `rel="preconnect"`, `rel="dns-prefetch"` — performance hints
  - `rel="alternate"` — RSS feeds, language alternates
  - `rel="manifest"` — PWA web app manifest
  - `media` attribute — conditional stylesheets
  - `as` attribute for preloads
  - `crossorigin` and `integrity` (Subresource Integrity)
- **Interactive Example:** Performance visualiser — toggle different `<link>` preload strategies and see simulated waterfall diagrams showing the impact

### 3.7 `<meta>`
- **What to cover:**
  - `charset="UTF-8"` — must be the first meta tag, within the first 1024 bytes
  - `name="viewport"` — critical for responsive design. `width=device-width`, `initial-scale`, `maximum-scale`, `user-scalable`
  - `name="description"` — SEO meta description (120–158 chars)
  - `name="robots"` — `index/noindex`, `follow/nofollow`, `noarchive`, `nosnippet`
  - `name="theme-color"` — browser chrome color on mobile
  - `name="color-scheme"` — light/dark mode hint
  - `http-equiv` — `refresh`, `content-security-policy`, `X-UA-Compatible` (legacy IE)
  - Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) — how pages look when shared on social media
  - Twitter Card meta tags
  - `name="generator"` — CMS identification
- **Interactive Example:** Social preview builder — fill in Open Graph meta tags and see a live preview of how the link appears on Twitter/X, Facebook, LinkedIn, and iMessage

### 3.8 `<style>`
- **What to cover:** Inline `<style>` blocks vs external stylesheets. The `media` attribute. `<style>` in `<body>` (allowed in HTML5 but not recommended). Scoped styles (removed from spec, now back in discussion). `nonce` attribute for CSP.

### 3.9 `<script>`
- **What to cover:**
  - `src` vs inline scripts
  - `type="module"` — ES modules, deferred by default, strict mode
  - `type="importmap"` — defining module specifier maps
  - `defer` — executes after HTML parsed, in order
  - `async` — executes as soon as downloaded, out of order
  - `defer` vs `async` vs neither — execution timing diagram
  - `nomodule` — fallback for browsers that don't support modules
  - `integrity` — Subresource Integrity hash
  - `crossorigin` — CORS for scripts
  - `nonce` — Content Security Policy
- **Interactive Example:** Script loading timeline — animated diagram showing the HTML parse + script download + script execute timeline for `defer`, `async`, and blocking scripts side by side

---

## Chapter 4: Document Sectioning Elements

> These define the high-level structure of the page. They create the document outline and map directly to ARIA landmark roles.

### 4.1 `<body>`
- **What to cover:** The root of visible content. `onload` / `onunload` (legacy, prefer `addEventListener`). Background attributes (deprecated). The `class` and `id` on body for theming. Only one per document.

### 4.2 `<header>`
- **What to cover:**
  - Page-level header (site logo, site nav, search) — implicitly `role="banner"` when not inside another sectioning element
  - Section-level header (heading + subheading of an `<article>`) — just `role="generic"` in this context
  - What goes inside: `<h1>`–`<h6>`, `<nav>`, logo, byline, publication date for articles
  - What does NOT go inside: `<footer>`, another `<header>`
  - Common mistake: putting `<main>` inside `<header>`
- **Interactive Example:** Toggle between page-level vs section-level header with accessibility tree visualisation — shows how the ARIA landmark role changes

### 4.3 `<nav>`
- **What to cover:**
  - `role="navigation"` landmark implicitly
  - Only for major navigation blocks — not every group of links
  - Multiple `<nav>` elements — use `aria-label` to distinguish them ("Main navigation", "Breadcrumb", "Pagination")
  - `<nav>` does NOT need to contain `<ul>` — but usually should
  - Breadcrumbs: `<nav aria-label="Breadcrumb">` + `aria-current="page"`
  - Skip links target `<main>`, not `<nav>`
- **Interactive Example:** Build a site with two `<nav>` elements (primary + footer nav), open the accessibility tree and show how screen readers list them as separate landmarks

### 4.4 `<main>`
- **What to cover:**
  - One per page (one visible at a time — hidden `<main>` elements allowed for SPAs)
  - `role="main"` implicitly
  - Must NOT be inside `<article>`, `<aside>`, `<footer>`, `<header>`, `<nav>`
  - The skip-to-main-content pattern
  - Why `<div id="main">` is not the same as `<main>`
- **Interactive Example:** Page layout builder — click to add/remove elements, instantly see the accessibility landmark tree update. Show what happens when `<main>` is missing.

### 4.5 `<article>`
- **What to cover:**
  - Self-contained, independently distributable (could go in an RSS feed, be syndicated)
  - Use cases: blog posts, news articles, forum posts, product cards, comments, social media posts, widgets
  - Articles can nest (a comment inside an article is its own `<article>`)
  - Should have a heading (`<h2>` or appropriate level)
  - `role="article"` implicitly — listed in the accessibility tree
  - Difference from `<section>`: article = standalone, section = thematic grouping
- **Interactive Example:** A blog post layout — show the same content marked up with `<div>` vs `<article>` and compare how a screen reader navigates it. RSS feed preview showing what gets syndicated.

### 4.6 `<section>`
- **What to cover:**
  - Thematic grouping of content that belongs together — not a generic container (`<div>` is for that)
  - Should always have a heading — a `<section>` without a visible heading is a code smell
  - `role="region"` when it has an accessible name (`aria-labelledby`), otherwise no landmark role
  - When NOT to use `<section>`: don't replace `<div>` with it just to seem semantic. If you can't name the section, it probably isn't one.
  - Common mistake: using `<section>` as a styling wrapper
- **Interactive Example:** Document outline visualiser — build a page with nested sections and headings, and watch the document outline tree update in real time

### 4.7 `<aside>`
- **What to cover:**
  - Content tangentially related to surrounding content
  - Page-level `<aside>`: sidebars, pull quotes, related articles, ad slots — `role="complementary"` landmark
  - Article-level `<aside>`: a note, a glossary term — not a landmark
  - Multiple `<aside>` elements: use `aria-label` to differentiate
  - Common mistake: using `<aside>` for important content (it tells screen readers it's secondary)

### 4.8 `<footer>`
- **What to cover:**
  - Page-level footer — `role="contentinfo"` implicitly (only when not inside a sectioning element)
  - Section/article-level footer — author info, publication date, tags — no landmark role
  - What belongs: copyright, links to privacy/terms, sitemap links, social links, contact info
  - `<address>` often lives inside `<footer>`
  - Only one page-level `<footer>` that maps to `contentinfo`

### 4.9 `<address>`
- **What to cover:**
  - Contact information for the nearest `<article>` or `<body>`
  - Not for postal addresses in general — only contact info for the document/section author
  - What to put inside: email, phone, social links, physical address if it's the author's contact
  - Common mistake: using `<address>` for any postal address anywhere on the page

### 4.10 `<hgroup>` (Resurrected in HTML5.2)
- **What to cover:**
  - Groups a heading with related subheadings or taglines
  - Original HTML5 spec, removed, then re-added
  - Use case: `<h1>` + `<p>` subheading that should be treated as a unit in the document outline
  - How it affects the heading hierarchy

---

## Chapter 5: Heading Elements

### 5.1 `<h1>` through `<h6>`
- **What to cover:**
  - The document outline — heading hierarchy creates a navigable structure
  - `<h1>` — the top-level heading. One per page (best practice, not a hard rule)
  - `<h2>`–`<h6>` — subsections in order
  - The heading hierarchy as navigation — screen reader users navigate by headings constantly (the `H` key shortcut)
  - **Never skip heading levels** (e.g., `<h1>` → `<h3>`) — creates gaps in the outline
  - **Never use headings for visual size** — use CSS. If it looks like a heading but isn't one, use a `<p>` with a class
  - Headings in components — how a heading level should adapt to context (the unresolved "heading level problem" in components)
  - The `aria-level` hack for dynamic heading levels
- **Interactive Example:**
  - Document outline visualiser: add/edit headings on a mock page, instantly see the outline tree. Highlight when levels are skipped (red warning). Show how a screen reader would announce and navigate it.
  - A wrongly structured page (all `<div>` with font-size) vs correctly structured page (proper headings) — screen reader simulation

---

## Chapter 6: Text Content / Block Elements

### 6.1 `<p>`
- **What to cover:** The paragraph — most used element. Block-level. Cannot contain block-level elements. Auto-closed by the parser in many cases (omittable end tag). Margin collapsing behaviour. Common mistake: using `<br><br>` instead of `<p>`.

### 6.2 `<blockquote>`
- **What to cover:**
  - Extended quotation from another source
  - `cite` attribute — URL of the source (machine-readable, not displayed)
  - `<cite>` element (inline) for displayed attribution
  - Must not use `<blockquote>` for visual indentation (use CSS)
  - Nesting is valid
- **Interactive Example:** Pull quote builder — compose a blockquote with proper `<cite>` attribution and see the rendered output + screen reader announcement

### 6.3 `<pre>`
- **What to cover:**
  - Preformatted text — preserves whitespace and line breaks
  - Used for code blocks (with nested `<code>`), ASCII art, poetry
  - `<pre><code>` — the canonical code block pattern
  - Horizontal scrolling consideration for accessibility
  - `tab-size` CSS property

### 6.4 `<hr>`
- **What to cover:**
  - Thematic break between paragraph-level content — a scene change, a topic shift
  - Not a visual rule — for visual dividers, use CSS `border`
  - `role="separator"` implicitly
  - Historical: was a horizontal rule in HTML 3.2, repurposed semantically in HTML5

### 6.5 `<figure>` and `<figcaption>`
- **What to cover:**
  - Self-contained unit of content referenced from the main flow — image, diagram, code listing, table, video
  - `<figcaption>` — optional, first or last child of `<figure>`
  - How `<figure>` can be moved without disrupting the main narrative
  - `<figure>` is not only for images — code examples, charts, poems, quotes
  - Accessibility: the `<figcaption>` provides an accessible name for the `<figure>`
- **Interactive Example:** Figure/caption builder — toggle different content types (image, code, table) inside a figure, see how it renders and is announced

### 6.6 `<div>`
- **What to cover:**
  - The element of last resort — no semantic meaning, generic container
  - Valid uses: styling wrappers, JavaScript hooks, layout containers
  - The `<div>` soup problem — overuse hiding meaning from browsers and assistive tech
  - Rule of thumb: if a more specific element fits, use it. `<div>` only when nothing else fits.
  - `<div>` vs `<span>` — block vs inline

---

## Chapter 7: Inline Text Semantics

### 7.1 `<a>` — The Anchor Element
- **What to cover:**
  - `href` — URL types: absolute, relative, root-relative, protocol-relative, `mailto:`, `tel:`, `#fragment`, `javascript:void(0)` (and why to avoid it)
  - `target="_blank"` — always use `rel="noopener noreferrer"` (security: reverse tabnapping)
  - `rel` attribute — `nofollow`, `noopener`, `noreferrer`, `sponsored`, `ugc`, `me`
  - `download` attribute — force download, optional filename
  - `hreflang` — language of the linked resource
  - `type` — MIME type hint
  - `ping` — analytics ping URLs
  - Wrapping block elements in `<a>` (valid in HTML5)
  - Meaningful link text — "click here" is an anti-pattern; link text must make sense out of context
  - `<a>` without `href` — a placeholder link, not interactive, not focusable
  - `<button>` vs `<a>`: navigation = `<a>`, action = `<button>`
- **Interactive Example:**
  - Link text analyser: enter a page's links and score them for accessibility (out-of-context meaningfulness)
  - Visual: `target="_blank"` without/with `rel="noopener"` — animated tabnapping demo

### 7.2 `<strong>` vs `<b>`
- **What to cover:**
  - `<strong>` — strong importance, seriousness, urgency. Screen readers may stress the word.
  - `<b>` — stylistically offset text, no extra importance (keywords, product names, lead sentences)
  - Both render bold by default — the difference is semantic, not visual
  - Nested `<strong>` increases importance level
- **Interactive Example:** Side-by-side — screen reader audio simulation of `<strong>` vs `<b>` pronunciation

### 7.3 `<em>` vs `<i>`
- **What to cover:**
  - `<em>` — stress emphasis that changes meaning ("I *never* said she stole the money")
  - `<i>` — alternate voice, technical terms, foreign words, thoughts, titles of short works, taxonomic names
  - Both render italic by default — semantic difference
  - Nesting `<em>` increases stress level
- **Interactive Example:** Sentence emphasis explorer — click different words in a sentence to wrap in `<em>` and hear how it changes the implied meaning

### 7.4 `<small>`
- **What to cover:**
  - Side comments, fine print, legal disclaimers, copyright notices
  - Not for making text visually small — use CSS for that
  - Semantic: "this is secondary information"

### 7.5 `<s>`
- **What to cover:**
  - Content that is no longer accurate or relevant (strikethrough)
  - vs `<del>` — `<del>` is a document edit (tracked change), `<s>` is just "no longer relevant"
  - Pricing pages: `<s>$99</s> $49` — but add accessible text ("was $99, now $49") since strikethrough isn't announced

### 7.6 `<u>`
- **What to cover:**
  - Unarticulated annotation — proper nouns in Chinese, spelling errors, misspelled words
  - NOT for underline styling — CSS `text-decoration: underline` for that
  - Users expect underline = link — use with caution and differentiate visually

### 7.7 `<cite>`
- **What to cover:**
  - Title of a creative work — book, film, article, song, poem, game
  - NOT for the person's name (a common mistake)
  - Should render in italics by default
  - Use with `<blockquote>` for attribution

### 7.8 `<q>`
- **What to cover:**
  - Inline quotation — browser adds quotation marks automatically (locale-aware)
  - `cite` attribute — URL source
  - vs `<blockquote>` — `<q>` for short inline quotes, `<blockquote>` for extended block quotes

### 7.9 `<abbr>`
- **What to cover:**
  - Abbreviations and acronyms
  - `title` attribute — full expansion shown on hover
  - Accessibility: first use should spell it out in text; `<abbr>` alone isn't enough for screen readers
  - `aria-label` as an alternative to `title` for screen reader support
- **Interactive Example:** Abbreviation first-use pattern builder — shows correct first-use expansion then `<abbr>` for subsequent uses

### 7.10 `<time>`
- **What to cover:**
  - Machine-readable dates and times
  - `datetime` attribute formats: date (`2026-03-15`), time (`14:30`), datetime (`2026-03-15T14:30:00Z`), duration (`PT2H30M`), year-month (`2026-03`), week (`2026-W11`)
  - Why this matters: search engines, calendar integrations, screen readers
  - `<time>` for relative time displays (e.g., "3 hours ago") — use `datetime` for the actual timestamp
- **Interactive Example:** Date format playground — enter a date in natural language, see it converted to valid `datetime` attribute values for different formats

### 7.11 `<mark>`
- **What to cover:**
  - Highlighted/marked text — relevant to the user's current activity (search results highlighting)
  - Not for general emphasis — that's `<strong>` or `<em>`
  - Accessibility: screen readers don't always announce `<mark>` — use `::before`/`::after` CSS content or `aria-label` workaround
- **Interactive Example:** Search results highlighter — type a search term and watch it get wrapped in `<mark>` in the results

### 7.12 `<dfn>`
- **What to cover:**
  - Marks the defining instance of a term
  - The term being defined — either the content of `<dfn>` or its `title` attribute
  - Used once per page per term — subsequent uses link back with `<a href="#dfn-term">`
- **Interactive Example:** Glossary builder — define terms with `<dfn>`, link subsequent uses with `<a>` pointing to the definition

### 7.13 `<data>`
- **What to cover:**
  - Links content to a machine-readable value
  - `value` attribute — the machine-readable version
  - Use cases: product IDs, category codes, structured data
  - `<time>` is a specialisation of `<data>` for dates/times

### 7.14 `<code>`, `<var>`, `<samp>`, `<kbd>`
- **What to cover:**
  - `<code>` — inline code snippet, computer output
  - `<var>` — variable in mathematical or programming context
  - `<samp>` — sample output from a computer program
  - `<kbd>` — keyboard input (what the user types or a keyboard shortcut)
  - Combining them: `<samp><kbd>Ctrl</kbd> + <kbd>C</kbd></samp>`
  - Nesting patterns — `<pre><code>` for code blocks
- **Interactive Example:** Technical writing builder — a mini editor where you label content as code/var/samp/kbd and see it rendered with correct semantics

### 7.15 `<sub>` and `<sup>`
- **What to cover:**
  - `<sub>` — subscript: chemical formulae (H₂O), footnotes
  - `<sup>` — superscript: mathematical exponents (E=mc²), ordinal indicators (1st), footnote markers
  - Never use for visual offset — only when semantics are correct
- **Interactive Example:** Scientific formula builder — type a chemical formula or math expression and mark sub/superscript correctly

### 7.16 `<ruby>`, `<rt>`, `<rp>`
- **What to cover:**
  - Ruby annotations — phonetic guides for East Asian characters (Japanese furigana, Chinese pinyin)
  - `<rt>` — the ruby text (annotation)
  - `<rp>` — fallback parentheses for browsers that don't support ruby
  - Accessibility considerations
- **Interactive Example:** Interactive furigana demonstrator with live ruby annotation rendering

### 7.17 `<bdi>` and `<bdo>`
- **What to cover:**
  - `<bdi>` — Bidirectional Isolate: isolates text that might have different text direction from surrounding content (user-generated content with unknown direction — names, usernames)
  - `<bdo>` — Bidirectional Override: overrides the text direction entirely
  - `dir` attribute: `ltr`, `rtl`, `auto`
  - Why this matters: Arabic, Hebrew, and other RTL language text embedded in LTR context
- **Interactive Example:** RTL text embedding demo — a user list with Arabic and Hebrew names showing correct `<bdi>` isolation vs broken rendering without it

### 7.18 `<br>` and `<wbr>`
- **What to cover:**
  - `<br>` — line break. Valid in: addresses, poems, song lyrics. NOT for paragraph spacing or layout.
  - `<wbr>` — Word Break Opportunity: hints where a long word MAY break if needed. URL display, long compound words.
- **Interactive Example:** `<wbr>` vs `<br>` in a long URL or compound word — resize the container to see where it breaks

### 7.19 `<span>`
- **What to cover:**
  - Inline element of last resort — no semantic meaning
  - Valid uses: styling hooks, JavaScript targets, wrapping text for internationalisation
  - The inline equivalent of `<div>`
  - Should be the last choice — if a semantic inline element fits, use it

---

## Chapter 8: List Elements

### 8.1 `<ul>` — Unordered List
- **What to cover:**
  - List of items where order doesn't matter
  - Only valid direct child: `<li>`
  - `type` attribute deprecated — use CSS `list-style-type`
  - Navigation menus are almost always `<ul>` — order doesn't matter
  - Common mistake: `<ul>` for ordered steps

### 8.2 `<ol>` — Ordered List
- **What to cover:**
  - List where order matters (steps, rankings, instructions)
  - `start` attribute — start from a number other than 1
  - `reversed` attribute — count down
  - `type` attribute — `1`, `A`, `a`, `I`, `i` (numeral style)
  - `value` on individual `<li>` — override that item's number
- **Interactive Example:** Recipe steps builder — toggle between `<ul>` and `<ol>`, instantly see the semantic and accessibility difference

### 8.3 `<li>` — List Item
- **What to cover:**
  - Direct child of `<ul>`, `<ol>`, or `<menu>`
  - `value` attribute — sets the ordinal value in `<ol>` context
  - Nested lists — `<li>` contains a nested `<ul>` or `<ol>`

### 8.4 `<dl>`, `<dt>`, `<dd>` — Description List
- **What to cover:**
  - `<dl>` — description list (name-value pairs, glossaries, metadata)
  - `<dt>` — term / name
  - `<dd>` — description / value (indented by default)
  - Multiple `<dt>` per `<dd>` and vice versa — valid
  - Use cases: glossaries, FAQs, metadata panels, key-value displays, recipe nutrition facts
  - Common mistake: using `<dl>` for general content just to get the indent
- **Interactive Example:** FAQ builder using `<dl>`/`<dt>`/`<dd>` — toggle to show `<div>` version vs `<dl>` version and compare accessibility tree

### 8.5 `<menu>`
- **What to cover:**
  - HTML5 re-purposed `<menu>` — currently for toolbars (experimental, limited support)
  - `<menu>` vs `<ul>` — `<menu>` implies interactive commands
  - The context menu / toolbar use case
  - Current browser support status

---

## Chapter 9: Table Elements

> Tables are for tabular data — rows and columns with a relationship. Not for layout.

### 9.1 The Table Element Family
- **What to cover (all in one section):**
  - `<table>` — the table container, `role="table"`
  - `<caption>` — table title (first child of `<table>`) — accessible name for the table. Always include it.
  - `<thead>` — table head section
  - `<tbody>` — table body (can have multiple `<tbody>` for grouped rows)
  - `<tfoot>` — table foot section (rendered last but can appear anywhere in source)
  - `<tr>` — table row
  - `<th>` — header cell. `scope` attribute: `col`, `row`, `colgroup`, `rowgroup`. `abbr` attribute for long header text.
  - `<td>` — data cell. `colspan`, `rowspan` — merging cells. `headers` attribute for complex tables.
  - `<colgroup>` and `<col>` — grouping and styling columns
- **Interactive Example:**
  - Table builder playground — drag to add rows/columns, mark cells as `<th>`, set `scope`, and watch the accessibility tree update in real time
  - Complex table: a merged-cell table with `headers` and `id` associations visualised
  - "Table vs CSS Grid" comparison for layout

### 9.2 Table Accessibility Deep Dive
- **What to cover:**
  - How screen readers navigate tables (row by row, cell by cell — headers announced for each cell)
  - Simple tables vs complex tables
  - `scope="col"` vs `scope="row"` vs `headers`+`id` for complex associations
  - Responsive table patterns — scrollable wrapper, stacked layout, hidden columns
  - Never use `<table>` for layout — no `<table>` layout in 2026
- **Interactive Example:** Screen reader simulation — navigate a simple table and a complex table, hear header cells announced for each data cell

---

## Chapter 10: Form Elements

> Forms deserve their own deep section — every element, every attribute.

### 10.1 `<form>`
- **What to cover:**
  - `action` — URL to submit to (defaults to current URL)
  - `method` — `GET` (data in URL, cacheable, bookmarkable) vs `POST` (data in body)
  - `enctype` — `application/x-www-form-urlencoded` (default), `multipart/form-data` (file uploads), `text/plain`
  - `novalidate` — disable browser's built-in validation
  - `autocomplete` — `on` / `off` — whether the browser offers autocomplete for the whole form
  - `target` — where to display the response
  - `rel` — `noopener`, `noreferrer` when targeting another context
  - Implicit form submission (Enter key in a single-input form)
- **Interactive Example:** Form method explorer — toggle GET vs POST and watch the URL bar change / request payload change in the network tab simulation

### 10.2 `<label>`
- **What to cover:**
  - Every input must have a label — this is the most important form accessibility rule
  - Explicit label: `<label for="inputId">`
  - Implicit label: `<label><input></label>` — wrapping
  - Clicking a label focuses its control — improves usability especially for checkboxes/radios
  - Placeholder is NOT a label — it disappears, has low contrast, can't be relied on
  - `aria-label` and `aria-labelledby` as alternatives (when visible label isn't possible)
  - Multiple labels for one input (valid)
- **Interactive Example:** Label association demo — show click-area expansion when using `<label for>`. Show a form without labels vs with labels in the accessibility tree.

### 10.3 `<input>` — All Types
Each type deserves explanation + live demo:

- **`type="text"`** — default, single line. `maxlength`, `minlength`, `pattern`, `placeholder`, `size`, `autocomplete`, `list` (datalist), `spellcheck`
- **`type="password"`** — masked input. `autocomplete="current-password"` vs `"new-password"`. The show/hide password toggle pattern.
- **`type="email"`** — validates email format. `multiple` allows comma-separated emails. Mobile shows email keyboard.
- **`type="url"`** — validates URL format. Mobile shows URL keyboard.
- **`type="number"`** — `min`, `max`, `step`. Spinner controls. Not for anything that looks like a number but isn't (phone, credit card, zip code — use `type="text"` with `inputmode`).
- **`type="range"`** — slider. `min`, `max`, `step`, `list` for tick marks. Always needs a visible value display.
- **`type="tel"`** — telephone number. No validation (formats vary globally). Mobile shows phone keyboard.
- **`type="search"`** — search input. Clear button in some browsers. `role="searchbox"`.
- **`type="date"`** — date picker. `min`, `max`, `step`. `value` format: `YYYY-MM-DD`. Browser UI varies significantly.
- **`type="time"`** — time picker. `min`, `max`, `step`. `value` format: `HH:MM`.
- **`type="datetime-local"`** — date + time (no timezone). `value` format: `YYYY-MM-DDTHH:MM`.
- **`type="month"`** — year and month selector.
- **`type="week"`** — year and week selector.
- **`type="color"`** — color picker. `value` must be `#RRGGBB`. Limited to opaque colors (no alpha).
- **`type="checkbox"`** — binary choice. `checked`, `indeterminate` (JS only). Grouping with `<fieldset>`.
- **`type="radio"`** — one of many. `name` groups radio buttons. `checked`. Arrow keys navigate within a group.
- **`type="file"`** — `accept` (MIME types, extensions), `multiple`, `capture` (camera/mic on mobile). File size limits are server-side.
- **`type="hidden"`** — not shown. Submits data with the form. `name`+`value`. CSRF tokens often use this.
- **`type="submit"`** — submits the form. `value` sets button text.
- **`type="reset"`** — resets all form fields. Rarely useful, often harmful — avoid.
- **`type="button"`** — no default behaviour. Use `<button>` instead.
- **`type="image"`** — graphical submit button. `src`, `alt`, `width`, `height`. Submits click coordinates.

- **Common attributes across all types:** `name`, `id`, `value`, `disabled`, `readonly`, `required`, `autofocus`, `form` (associate with form by ID), `autocomplete`, `tabindex`, `inputmode`

- **`inputmode`** — hint for virtual keyboard without changing input type: `numeric`, `decimal`, `tel`, `email`, `url`, `search`, `none`

- **Interactive Example:** Input type gallery — a grid of all input types, click any to see: rendered UI, keyboard that appears on mobile, validation behaviour, `value` format, and accessibility announcement

### 10.4 `<button>`
- **What to cover:**
  - `type="submit"` (default inside a form), `type="button"`, `type="reset"`
  - Always specify `type` — default is `submit` which can accidentally submit forms
  - `<button>` vs `<input type="submit">` — `<button>` is more flexible (can contain HTML)
  - `<button>` vs `<a>` — actions vs navigation
  - `disabled` state and accessibility
  - `name` + `value` — multiple submit buttons in one form
  - `form` attribute — button outside its form element
  - `formaction`, `formmethod`, `formenctype`, `formnovalidate` — per-button form overrides
- **Interactive Example:** Button type confusion demo — a form with an untyped `<button>` that accidentally submits, then the fix

### 10.5 `<select>`, `<option>`, `<optgroup>`
- **What to cover:**
  - `<select>` — dropdown or listbox
  - `multiple` — listbox (multi-select). `size` — visible rows
  - `<option>` — each choice. `value`, `selected`, `disabled`, `label`
  - `<optgroup>` — group options with a `label`. Not selectable itself.
  - `<select>` styling limitations and why custom dropdowns exist
  - The upcoming `<selectlist>` / `<select>` with `<datalist>` improvements
- **Interactive Example:** Country selector with `<optgroup>` by region — keyboard navigation demo

### 10.6 `<datalist>`
- **What to cover:**
  - Provides autocomplete suggestions for an `<input>` (linked by `list` attribute)
  - Not a replacement for `<select>` — suggestions are optional, user can type anything
  - Rendering varies by browser (some show dropdown, some inline)
  - Works with: `text`, `email`, `url`, `number`, `range`, `date`, `time`, `color`
  - Use case: search suggestions, city names, recent entries

### 10.7 `<textarea>`
- **What to cover:**
  - Multi-line text input
  - `rows`, `cols` — initial size (CSS preferred)
  - `resize` CSS property — `none`, `vertical`, `horizontal`, `both`
  - `maxlength`, `minlength`, `placeholder`, `autocomplete`, `spellcheck`, `wrap`
  - `<textarea>` has no `value` attribute — content goes between tags
  - Always pair with `<label>`

### 10.8 `<fieldset>` and `<legend>`
- **What to cover:**
  - `<fieldset>` — groups related form controls
  - `<legend>` — caption for the `<fieldset>`, announced by screen readers before each control
  - Essential for: radio groups, checkbox groups, address sections
  - `disabled` on `<fieldset>` — disables all descendant controls
  - Styling: default browser border, how to remove it (`border: 0`, `padding: 0`)
- **Interactive Example:** Address form using `<fieldset>`+`<legend>` for "Shipping" and "Billing" groups — accessibility tree view showing how legend is announced

### 10.9 `<output>`
- **What to cover:**
  - Result of a calculation or user action
  - `for` attribute — space-separated IDs of inputs that feed into the output
  - `role="status"` implicitly — live region, announced by screen readers
  - Use case: real-time calculation result, character count remaining
- **Interactive Example:** Loan calculator — two `<input type="range">` for amount/term, `<output>` shows monthly payment live

### 10.10 `<progress>` and `<meter>`
- **What to cover:**
  - `<progress>` — completion of a task. `value` (current), `max`. Indeterminate state (no `value` = spinning/unknown).
  - `<meter>` — scalar measurement within a known range. `value`, `min`, `max`, `low`, `high`, `optimum`. Changes colour based on thresholds.
  - Key difference: `<progress>` = how far along a process, `<meter>` = where a value sits in a range
  - Both have implicit ARIA roles (`progressbar` and `meter`)
  - Always provide an accessible label — they render graphically, need text alternative
- **Interactive Example:** Interactive `<meter>` — adjust `value`, `low`, `high`, `optimum` sliders and see the colour change live. Separate `<progress>` file upload simulation.

---

## Chapter 11: Interactive / Disclosure Elements

### 11.1 `<details>` and `<summary>`
- **What to cover:**
  - Native disclosure widget — expand/collapse without JavaScript
  - `<summary>` — always the first child, the visible toggle label
  - `open` attribute — expanded by default
  - Styling the triangle marker (`::marker`, `list-style`)
  - Multiple `<details>` — each independent (not an accordion by default — exclusive accordion needs JS)
  - `name` attribute (new!) — creates an exclusive accordion group natively
  - Accessibility: `role="group"`, `<summary>` has `role="button"`, `aria-expanded` managed automatically
- **Interactive Example:**
  - FAQ accordion using `<details>`/`<summary>` with zero JavaScript
  - Exclusive accordion using the new `name` attribute

### 11.2 `<dialog>`
- **What to cover:**
  - Native modal and non-modal dialog element
  - `.showModal()` — modal mode (blocks background interaction, adds `::backdrop`)
  - `.show()` — non-modal mode
  - `.close(returnValue)` — close with a value
  - `open` attribute
  - `::backdrop` pseudo-element — styles the overlay
  - Accessibility: `role="dialog"`, focus is trapped inside automatically in `.showModal()`
  - `autofocus` — which element gets focus when dialog opens
  - `<form method="dialog">` — submit closes the dialog and sets `returnValue`
  - `Escape` key closes modal dialogs automatically
  - `close` event — fires when dialog closes
  - Browser support (now excellent — Baseline 2022)
- **Interactive Example:**
  - Confirmation dialog: delete button → modal dialog → confirm/cancel — all native, zero libraries
  - Compare native `<dialog>` vs a `<div role="dialog">` custom modal — show what you get for free

---

## Chapter 12: Embedded Content Elements

### 12.1 `<img>`
- **What to cover:**
  - `src`, `alt`, `width`, `height` (always set to prevent layout shift — CLS)
  - `alt=""` for decorative images (empty, not missing — missing means the filename is read)
  - Writing good alt text — describe the content and function, not "image of…"
  - `loading="lazy"` — defer offscreen images (don't use on LCP image!)
  - `decoding="async"` — decode off the main thread
  - `fetchpriority="high"` — hint for LCP image
  - `srcset` and `sizes` — responsive images (resolution switching)
  - `<picture>` for art direction
  - `crossorigin` — for CORS-enabled image use in Canvas
  - `ismap` and `usemap` — server-side and client-side image maps
- **Interactive Example:** Image optimisation playground — same image with different `loading`, `fetchpriority`, `decoding` values, simulated LCP score impact

### 12.2 `<picture>` and `<source>`
- **What to cover:**
  - Art direction — different crop/composition at different screen sizes
  - Format switching — serve WebP/AVIF with JPEG/PNG fallback
  - `<source media="">` — viewport-based selection
  - `<source type="">` — format-based selection
  - `<img>` is always required as the last child (fallback)
  - Order matters — first matching `<source>` wins
- **Interactive Example:** Art direction demo — a portrait photo on mobile, landscape on desktop, all via `<picture>`. Format switcher showing file size difference between AVIF, WebP, and JPEG.

### 12.3 `<video>` and `<audio>`
- **What to cover:**
  - `src` vs `<source>` children (multiple formats)
  - `controls` — show browser controls (always for accessibility)
  - `autoplay` — requires `muted` to work (browser policy). Never autoplay with sound.
  - `muted` — starts muted
  - `loop`
  - `preload` — `none`, `metadata`, `auto`
  - `poster` — video thumbnail image
  - `playsinline` — mobile: play inline, not fullscreen
  - `crossorigin`
  - `width`, `height` — prevent layout shift
  - JavaScript API: `play()`, `pause()`, `currentTime`, `duration`, `volume`, `playbackRate`, events (`play`, `pause`, `ended`, `timeupdate`)
  - Accessibility: always provide `<track>` for captions
- **Interactive Example:** Custom video player built entirely with HTML + CSS + minimal JS using the native video API

### 12.4 `<track>`
- **What to cover:**
  - Provides timed text tracks for `<video>` and `<audio>`
  - `kind` — `subtitles`, `captions`, `descriptions`, `chapters`, `metadata`
  - `src` — URL to a WebVTT file
  - `srclang` — language of the track
  - `label` — user-visible name
  - `default` — this track is enabled by default
  - Captions vs Subtitles: captions include sound effects and speaker identification; subtitles are just the dialogue
  - WebVTT format basics
- **Interactive Example:** Video with multiple caption tracks — English subtitles + audio descriptions. WebVTT file format shown.

### 12.5 `<iframe>`
- **What to cover:**
  - Embeds another HTML document
  - `src`, `title` (required for accessibility — describes what's embedded)
  - `width`, `height`
  - `allow` — Permissions Policy: `camera`, `microphone`, `geolocation`, `fullscreen`, `payment`
  - `sandbox` — restrict iframe capabilities: `allow-scripts`, `allow-same-origin`, `allow-forms`, `allow-popups`
  - `loading="lazy"` — lazy load iframes
  - `referrerpolicy`
  - `srcdoc` — inline HTML content
  - Security: clickjacking via iframes, `X-Frame-Options` / `frame-ancestors` CSP
  - When to avoid: accessibility challenges, performance cost, SEO
- **Interactive Example:** `sandbox` attribute explorer — toggle sandbox flags and observe what an embedded page can/can't do

### 12.6 `<embed>`, `<object>`, `<param>`
- **What to cover:**
  - Legacy embedding elements — Flash era
  - `<embed>` — plugin content (PDF, Flash)
  - `<object>` — more flexible embedding with fallback content
  - `<param>` — parameters for `<object>`
  - Modern use: embedding PDFs (`<object type="application/pdf">`)
  - Why these are mostly obsolete (Flash is dead, use `<video>` for video)

### 12.7 `<map>` and `<area>`
- **What to cover:**
  - Client-side image maps — clickable regions on an image
  - `<map name="">` links to `<img usemap="#name">`
  - `<area>` — defines a clickable region. `shape`: `rect`, `circle`, `poly`. `coords`. `href`, `alt`.
  - Accessibility: each `<area>` needs `alt` text
  - Modern alternatives: CSS + SVG are almost always better
- **Interactive Example:** Simple image map on a world map — click regions to navigate

### 12.8 `<canvas>`
- **What to cover:**
  - Rasterised 2D drawing surface via JavaScript API
  - Always set `width` and `height` attributes (not CSS — different from CSS sizing)
  - Fallback content between `<canvas>` tags for browsers without support
  - 2D context: `getContext("2d")` — drawing primitives
  - WebGL context: `getContext("webgl")` — 3D graphics
  - Accessibility: `<canvas>` is a black box to screen readers — always provide text alternative or use ARIA
  - Performance: `requestAnimationFrame` for animation, offscreen canvas for workers
- **Interactive Example:** Mini drawing app using `<canvas>` 2D API

### 12.9 Inline `<svg>`
- **What to cover:**
  - Inline SVG vs `<img src=".svg">` vs CSS background — tradeoffs
  - Inline SVG: styleable with CSS, interactive with JS, accessible
  - `viewBox`, `width`, `height`
  - Accessibility: `<title>` (first child, accessible name), `<desc>` (description), `role="img"`, `aria-labelledby`
  - Decorative SVGs: `aria-hidden="true"`, `focusable="false"` (IE legacy)
  - SVG icons — `<use>` with `<symbol>` sprite pattern
- **Interactive Example:** Icon system using `<svg>` sprite with `<use>` — accessible and non-accessible versions compared

---

## Chapter 13: Scripting & Template Elements

### 13.1 `<noscript>`
- **What to cover:**
  - Fallback content when JavaScript is disabled or blocked
  - Can appear in `<head>` (meta redirects) or `<body>` (fallback UI)
  - Less relevant today but important for progressive enhancement

### 13.2 `<template>`
- **What to cover:**
  - Client-side template — inert HTML fragment, not rendered, not active
  - Content is in a `DocumentFragment` (`template.content`)
  - Use with JavaScript: `cloneNode(true)` to stamp out instances
  - The foundation of Web Components templating
  - `shadowrootmode` attribute — Declarative Shadow DOM (new!)
- **Interactive Example:** Dynamic list using `<template>` — add items by clicking, stamping from the template

### 13.3 `<slot>`
- **What to cover:**
  - Part of the Web Components / Shadow DOM spec
  - Named slots vs default slot
  - How `<slot>` enables content projection in custom elements
  - `slotchange` event

---

## Chapter 14: Global Attributes

> These apply to every HTML element.

### 14.1 Core Global Attributes
- **What to cover (each with example):**
  - `id` — unique identifier. Case-sensitive. Used for: fragment links, `<label for>`, `aria-labelledby`, `aria-describedby`, JavaScript. Must be unique per page.
  - `class` — space-separated list of CSS classes. No unique constraint. JavaScript and CSS hooks.
  - `style` — inline styles. Use sparingly. High specificity. Useful for dynamic values (CSS custom properties).
  - `title` — advisory tooltip. Only shown on hover (not mobile-accessible). Not a substitute for `aria-label`.
  - `lang` — language of the element's content (overrides document `lang`). Critical for correct screen reader pronunciation.
  - `dir` — text direction: `ltr`, `rtl`, `auto`
  - `tabindex` — `0` (natural order), `-1` (programmatically focusable), positive (explicit order — avoid)
  - `hidden` — removes from layout and accessibility tree. Different from `display: none` in CSS specificity. `hidden="until-found"` — new: findable by browser search but visually hidden.
  - `inert` — makes element and all descendants non-interactive and invisible to assistive tech. Replaces complex "disable everything" patterns.
  - `contenteditable` — `true`, `false`, `plaintext-only`
  - `draggable` — `true`, `false`, `auto`
  - `spellcheck` — `true`, `false`
  - `translate` — `yes`, `no` — whether to translate with browser translate / translation services
  - `autocapitalize` — `off`, `none`, `on`, `sentences`, `words`, `characters`
  - `enterkeyhint` — label for the virtual keyboard Enter key: `enter`, `done`, `go`, `next`, `previous`, `search`, `send`
  - `inputmode` — virtual keyboard type (used on non-input elements with `contenteditable`)
  - `is` — extends a built-in element with a custom element

### 14.2 `data-*` Custom Data Attributes
- **What to cover:**
  - Store custom data private to the page/application
  - `dataset` API in JavaScript — `element.dataset.myValue`
  - Naming: `data-my-value` → `dataset.myValue` (camelCase conversion)
  - Use cases: configuration, state, targeting without class pollution
  - When NOT to use: for accessibility state — use ARIA attributes instead. For styling hooks — use classes instead.
- **Interactive Example:** Tab component using `data-*` for state management — no classes changed, pure data attribute logic

### 14.3 ARIA Global Attributes
> (Brief here — full coverage in the Accessibility topic)
- `role`, `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-hidden`, `aria-live`, `aria-atomic`

### 14.4 Event Handler Attributes
- **What to cover:**
  - `onclick`, `onchange`, `onsubmit`, etc. — inline event handlers
  - Why they're an anti-pattern (content security policy blocks them, separation of concerns)
  - `addEventListener` is always preferred
  - When inline handlers are acceptable (email templates, edge cases)

---

## Chapter 15: Deprecated & Obsolete Elements

> Know them so you can remove them from legacy codebases.

### 15.1 Presentational Elements (Deprecated in HTML4, Removed in HTML5)
| Element | What it did | Modern replacement |
|---|---|---|
| `<font>` | Set font, size, colour | CSS `font-family`, `font-size`, `color` |
| `<center>` | Centred content | CSS `text-align: center` / Flexbox |
| `<big>` | Larger text | CSS `font-size` |
| `<tt>` | Teletype/monospace | `<code>` or `<kbd>` |
| `<strike>` | Strikethrough | `<s>` or `<del>` |
| `<basefont>` | Default font for page | CSS on `body` |
| `<blink>` | Blinking text | CSS animation (use sparingly) |
| `<marquee>` | Scrolling text | CSS animation |
| `<nobr>` | No line break | CSS `white-space: nowrap` |

### 15.2 Structural Elements (Removed)
| Element | What it did | Modern replacement |
|---|---|---|
| `<frame>` | Frameset frame | `<iframe>` or SPA routing |
| `<frameset>` | Frame container | CSS layout |
| `<noframes>` | Frameset fallback | N/A |
| `<applet>` | Java applet | N/A (Java applets dead) |
| `<isindex>` | Search input | `<input type="search">` |
| `<dir>` | Directory list | `<ul>` |
| `<listing>` | Preformatted code | `<pre><code>` |
| `<plaintext>` | Plain text mode | N/A |
| `<xmp>` | Example code | `<pre><code>` |

- **Interactive Example:** Deprecated element museum — render each deprecated element in an iframe (they still work in browsers), show the modern equivalent side by side

---

## Chapter 16: Document Outline & The Accessibility Tree

### 16.1 The HTML Document Outline Algorithm
- **What to cover:**
  - How the browser builds a document outline from headings
  - The outline algorithm — original HTML5 algorithm (sectioning elements create sub-outlines) vs the heading-only algorithm browsers actually implement
  - Why the HTML5 outline algorithm was never implemented in browsers (and was removed from the spec)
  - What actually matters: heading hierarchy (`<h1>`–`<h6>`) — not sectioning elements
  - Tools: Headings Map browser extension, accessibility tree in DevTools

### 16.2 The Accessibility Tree
- **What to cover:**
  - The parallel tree built alongside the DOM for assistive technologies
  - What appears in the accessibility tree vs the DOM
  - Accessible name, accessible description, role, state, value
  - How `aria-hidden`, `hidden`, `display:none`, `visibility:hidden` affect the accessibility tree
  - Chrome DevTools Accessibility panel walkthrough
- **Interactive Example:** Live DOM vs Accessibility Tree visualiser — build a simple page, see both trees side by side. Toggle ARIA attributes and watch the accessibility tree update.

### 16.3 Implicit vs Explicit ARIA Roles
- **What to cover:**
  - Every HTML element has an implicit ARIA role
  - The full mapping table: `<main>` = `main`, `<nav>` = `navigation`, `<button>` = `button`, etc.
  - When to use explicit roles (overriding implicit role with `role` attribute)
  - The first rule of ARIA: don't use ARIA if native HTML can do it
- **Interactive Example:** Interactive element-to-role mapping table — click any HTML element to highlight its implicit ARIA role and see it in the accessibility tree

---

## Chapter 17: HTML Validation & Tooling

### 17.1 HTML Validation
- **What to cover:**
  - W3C Nu HTML Checker (validator.w3.org)
  - What validation catches and what it doesn't
  - Using validation in CI/CD
  - HTMLHint, html-validate — linting tools
  - Common validation errors and how to fix them

### 17.2 Browser DevTools for HTML
- **What to cover:**
  - Inspecting and editing the live DOM
  - Accessibility panel — accessibility tree, properties
  - Computed ARIA roles
  - `document.designMode = "on"` — live page editing

### 17.3 HTML in the Build Pipeline
- **What to cover:**
  - HTML minification
  - Template engines (Nunjucks, Handlebars, Pug) vs native HTML
  - Static site generators and HTML output
  - HTML in component frameworks (JSX, Vue templates, Svelte) — differences from HTML spec (className, htmlFor, etc.)
  - React JSX differences from HTML: `className` vs `class`, `htmlFor` vs `for`, `onClick` vs `onclick`, self-closing tags required, fragments

---

# 📋 Interactive Demo Summary

| # | Demo | Technology | Complexity |
|---|---|---|---|
| 1 | Original 18-element retro browser simulation | HTML + CSS | Medium |
| 2 | HTML version time machine (3.2 vs modern) | HTML + CSS + JS toggle | Medium |
| 3 | Doctype mode switcher | JS iframe | Medium |
| 4 | Document outline live visualiser | JS + tree rendering | High |
| 5 | Input type gallery (all 22 types) | HTML | Low |
| 6 | Social meta preview builder | JS + API simulation | High |
| 7 | Table builder with accessibility tree | JS | High |
| 8 | `<details>`/`<summary>` accordion (no JS) | HTML only | Low |
| 9 | Native `<dialog>` modal demo | HTML + minimal JS | Low |
| 10 | Custom video player | HTML + CSS + JS | High |
| 11 | Image format switcher (AVIF/WebP/JPEG) | HTML + JS | Medium |
| 12 | Script loading timeline diagram | SVG animation | Medium |
| 13 | DOM vs Accessibility Tree visualiser | JS | High |
| 14 | Link text accessibility scorer | JS | Medium |
| 15 | Deprecated element museum | iframes | Low |
| 16 | `<meter>` + `<progress>` interactive | HTML + JS | Low |
| 17 | `<output>` loan calculator | HTML + JS | Low |
| 18 | `<template>` dynamic list | JS | Medium |
| 19 | `<canvas>` mini drawing app | Canvas API | High |
| 20 | SVG icon sprite system | SVG | Medium |

---

# 🗂️ Page Design Notes

## Layout Principles
- **Left sidebar** — sticky table of contents with all 17 chapters, active section highlighted on scroll
- **Reading width** — max ~720px for prose, full-width for interactive demos
- **Demo cards** — distinct visual treatment: dark background, bordered, labelled "Interactive Demo"
- **Code blocks** — syntax highlighted, copy button, tab between "HTML", "CSS", "JS" if multiple files
- **Callout boxes** — three types:
  - 🟡 `tip` — best practice
  - 🔴 `warning` — common mistake / anti-pattern
  - 🔵 `note` — browser support / spec note
  - ✅ `good` — correct example
  - ❌ `bad` — incorrect example

## Progress Tracking
- Each chapter has a checkmark the user can tick — stored in `localStorage`
- Progress bar at the top of the page
- "Estimated read time" per chapter

## Code Example Convention
Every element follows this block structure:
```
MINIMAL USAGE
FULL USAGE (all attributes)
REAL-WORLD USAGE (in context)
ANTI-PATTERN (what not to do)
```

---

# ✅ Definition of Done

The "Semantic HTML" topic page is complete when:

- [ ] All 17 chapters have written content
- [ ] All 20 interactive demos are built and functional
- [ ] Every element in the HTML spec has at least one working code example
- [ ] All deprecated elements are documented with modern replacements
- [ ] Document outline visualiser works in real time
- [ ] Accessibility tree visualiser works for key demos
- [ ] Mobile-responsive layout
- [ ] Code examples are copy-pasteable and valid HTML5
- [ ] All demos work without external dependencies where possible
- [ ] Page passes Lighthouse accessibility audit at 100
- [ ] HTML on the page itself is valid (validator.w3.org)
