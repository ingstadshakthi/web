"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Era = "html1" | "html32" | "html4" | "html5";

interface EraConfig {
  id: Era;
  year: string;
  label: string;
  badge: string;
  badgeColor: string;
  code: string;
  preview: React.ReactNode;
  note: string;
}

const ERAS: EraConfig[] = [
  {
    id: "html1",
    year: "1991",
    label: "HTML 1.0",
    badge: "18 elements",
    badgeColor: "text-blue-300/80 bg-blue-500/10 border-blue-500/20",
    code: `<!DOCTYPE html PUBLIC "-//IETF//DTD HTML 2.0//EN">
<title>My Homepage</title>
<h1>Welcome to My Page</h1>
<p>Hello! This is my website.</p>
<p><a href="about.html">About me</a></p>
<p><a href="mailto:user@cern.ch">Email me</a></p>`,
    preview: (
      <div className="font-serif text-black bg-white p-4 h-full text-sm leading-normal">
        <h1 className="text-2xl font-bold mb-2">Welcome to My Page</h1>
        <p className="mb-2">Hello! This is my website.</p>
        <p className="mb-2"><a href="#" className="text-blue-700 underline">About me</a></p>
        <p><a href="#" className="text-blue-700 underline">Email me</a></p>
      </div>
    ),
    note: "Only 18 elements existed. No CSS. No images by default. Tim Berners-Lee wanted a simple way to share scientific papers at CERN.",
  },
  {
    id: "html32",
    year: "1997",
    label: "HTML 3.2",
    badge: "Browser Wars",
    badgeColor: "text-red-300/80 bg-red-500/10 border-red-500/20",
    code: `<html>
<body bgcolor="#00FFFF" text="#FF0000">
<center>
  <font face="Comic Sans MS" size="6" color="#FF00FF">
    <b>Welcome to My Page!!</b>
  </font>
</center>
<table border="5" cellpadding="10" bgcolor="yellow">
  <tr>
    <td>
      <marquee>Hello Internet!!</marquee>
    </td>
  </tr>
</table>
<hr noshade>
<font size="2">Made with IE 4.0</font>
</body>
</html>`,
    preview: (
      <div className="bg-[#00FFFF] p-4 h-full text-sm font-sans overflow-hidden">
        <div className="text-center">
          <span className="font-bold text-2xl text-[#FF00FF]" style={{ fontFamily: "Comic Sans MS, cursive" }}>
            Welcome to My Page!!
          </span>
        </div>
        <div
          className="border-4 border-black bg-yellow-400 p-2 mt-3"
          style={{ borderStyle: "outset" }}
        >
          <div className="relative overflow-hidden">
            <span className="text-red-600 font-bold text-sm">Hello Internet!!</span>
          </div>
        </div>
        <hr className="border-t-2 border-black my-2" />
        <span className="text-red-600 text-xs">Made with IE 4.0</span>
      </div>
    ),
    note: "The dark age. Netscape and Internet Explorer added proprietary tags like <blink>, <marquee>, and <font>. Layout was done entirely with nested tables.",
  },
  {
    id: "html4",
    year: "1999",
    label: "HTML 4.01",
    badge: "CSS Era Begins",
    badgeColor: "text-yellow-300/80 bg-yellow-500/10 border-yellow-500/20",
    code: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>My Page</title>
  <link rel="stylesheet" href="style.css" type="text/css">
</head>
<body>
  <div id="header">
    <h1>Welcome to My Page</h1>
  </div>
  <div id="nav">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </div>
  <div id="content">
    <p>Content goes here.</p>
  </div>
</body>
</html>`,
    preview: (
      <div className="bg-white p-4 h-full text-sm font-sans text-black">
        <div className="border-b-2 border-gray-400 pb-2 mb-2">
          <h1 className="text-xl font-bold text-gray-800">Welcome to My Page</h1>
        </div>
        <div className="flex gap-4 mb-2 text-blue-700 text-xs">
          <a href="#" className="underline">Home</a>
          <a href="#" className="underline">About</a>
        </div>
        <p className="text-gray-700">Content goes here.</p>
      </div>
    ),
    note: "W3C pushed back against presentational HTML. CSS arrived as the proper place for styling. The <div> era began. Structure was finally separated from visual style, but with zero semantic meaning.",
  },
  {
    id: "html5",
    year: "2014",
    label: "HTML5",
    badge: "Living Standard",
    badgeColor: "text-green-300/80 bg-green-500/10 border-green-500/20",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My Page | Site Name</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Welcome to My Page</h1>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <article>
      <h2>Latest Post</h2>
      <p>Content goes here.</p>
    </article>
  </main>
  <footer>
    <p><small>&copy; 2026 My Site</small></p>
  </footer>
</body>
</html>`,
    preview: (
      <div className="bg-white p-4 h-full text-sm font-sans text-black">
        <header className="border-b border-gray-200 pb-2 mb-2">
          <h1 className="text-xl font-bold text-gray-800">Welcome to My Page</h1>
          <nav className="flex gap-4 text-blue-700 text-xs mt-1">
            <a href="#" className="underline">Home</a>
            <a href="#" className="underline">About</a>
          </nav>
        </header>
        <main>
          <article>
            <h2 className="font-semibold text-gray-700 mb-1">Latest Post</h2>
            <p className="text-gray-600 text-xs">Content goes here.</p>
          </article>
        </main>
        <footer className="border-t border-gray-200 mt-2 pt-1">
          <small className="text-gray-400">&copy; 2026 My Site</small>
        </footer>
      </div>
    ),
    note: "Semantic HTML5 elements tell the browser WHAT each part of the page IS. A screen reader can jump directly to <main> or <nav>. SEO bots understand the structure. The code reads like English.",
  },
];

export default function HTMLTimeMachine() {
  const [activeEra, setActiveEra] = useState<Era>("html5");

  const current = ERAS.find((e) => e.id === activeEra)!;

  return (
    <div className="w-full">
      {/* Era Switcher */}
      <div className="flex flex-wrap gap-2 mb-6">
        {ERAS.map((era) => (
          <button
            key={era.id}
            onClick={() => setActiveEra(era.id)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all`}
            style={{
              borderRadius: "2px",
              borderColor: activeEra === era.id ? "rgba(176, 196, 222, 0.5)" : "rgba(255,255,255,0.12)",
              background: activeEra === era.id ? "rgba(176, 196, 222, 0.08)" : "transparent",
              color: activeEra === era.id ? "var(--color-platinum)" : "var(--color-muted)",
              transition: "all 300ms cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          >
            {era.year}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeEra}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-bold text-platinum">{current.label}</span>
            <span
              className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border ${current.badgeColor}`}
              style={{ borderRadius: "2px" }}
            >
              {current.badge}
            </span>
          </div>

          {/* Side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Code */}
            <div className="border border-divider overflow-hidden" style={{ borderRadius: "2px" }}>
              <div className="flex items-center gap-2 px-4 py-2 bg-surface/50 border-b border-divider">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-[10px] text-muted font-mono ml-2">index.html</span>
              </div>
              <pre className="p-4 text-[11px] font-mono leading-relaxed text-secondary/80 overflow-x-auto bg-black/30">
                <code>{current.code}</code>
              </pre>
            </div>

            {/* Browser Preview */}
            <div className="border border-divider overflow-hidden" style={{ borderRadius: "2px" }}>
              <div className="px-4 py-2 bg-surface/50 border-b border-divider flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 bg-black/40 rounded px-2 py-0.5 text-[10px] font-mono text-muted truncate">
                  localhost/index.html
                </div>
              </div>
              <div className="h-[260px] overflow-auto">{current.preview}</div>
            </div>
          </div>

          {/* Note */}
          <div className="mt-4 p-4 border-l-2 border-accent/40 bg-accent/5">
            <p className="text-xs text-secondary/90 leading-relaxed">{current.note}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
