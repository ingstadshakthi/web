"use client";

import { motion } from "motion/react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import HTTPMessageStructureDiagram from "./components/HTTPMessageStructureDiagram";
import HTTPStatusCodesDiagram from "./components/HTTPStatusCodesDiagram";
import HTTPSAndTLSDiagram from "./components/HTTPSAndTLSDiagram";
import Link from "next/link";

/* ── Scroll reveal variant ── */
const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/* ── Terminal Commands Data ── */
const TERMINAL_COMMANDS = [
  {
    command: "curl -I https://example.com",
    description: "Fetch only the HTTP Headers (-I or --head) without the response body. Great for debugging caching or checking server versions.",
    output: `HTTP/2 200 
server: ECS (dcb/7ECA)
content-type: text/html; charset=UTF-8
content-length: 1256
date: Wed, 21 Oct 2026 08:31:00 GMT`,
    platform: "All",
  },
  {
    command: "curl -v https://example.com",
    description: "Verbose mode (-v). Shows the entire resolution, TCP handshake, TLS handshake, request headers sent, and response headers received.",
    output: `* Trying 93.184.216.34...
* Connected to example.com (93.184.216.34) port 443 (#0)
* TLS 1.3 handshake completed
> GET / HTTP/2
> Host: example.com
> User-Agent: curl/8.1.2
> Accept: */*
> 
< HTTP/2 200 
< content-type: text/html; charset=UTF-8
...`,
    platform: "All",
  },
  {
    command: "openssl s_client -connect google.com:443",
    description: "Connect to a server and show intricate details about the SSL/TLS certificate chain and the handshake protocol.",
    output: `CONNECTED(00000003)
depth=2 C = US, O = Google Trust Services LLC, CN = GTS Root R1
verify return:1
depth=1 C = US, O = Google Trust Services LLC, CN = GTS CA 1C3
...
---
Certificate chain
 0 s:CN = *.google.com
   i:C = US, O = Google Trust Services LLC, CN = GTS CA 1C3`,
    platform: "macOS / Linux",
  },
  {
    command: "curl -X POST -H \"Content-Type: application/json\" -d '{\"key\":\"value\"}' https://echo.free.beeceptor.com",
    description: "Simulate a POST request by passing a custom method (-X POST), headers (-H) and a JSON data payload (-d).",
    output: `{"status": "Success", "parsed_body": {"key": "value"}}`,
    platform: "All",
  },
];

/* ── Key Takeaway Cards ── */
const TAKEAWAYS = [
  {
    title: "HTTP is the Lexicon",
    description:
      "HTTP defines the exact format of the text that clients and servers use to ask for and deliver data over the web.",
    icon: "📖",
  },
  {
    title: "Stateless by Default",
    description:
      "The server forgets you immediately after answering. Sessions, cookies, and tokens are add-ons to simulate a continuous conversation.",
    icon: "👻",
  },
  {
    title: "Headers are Metadata",
    description:
      "Headers silently control caching, authentication, content types, and device tracking before the body is even parsed.",
    icon: "🏷️",
  },
  {
    title: "Status Codes Tell the Story",
    description:
      "The 3-digit code efficiently tells the client if things succeeded (2xx), moved (3xx), failed locally (4xx), or failed at the server (5xx).",
    icon: "🚦",
  },
  {
    title: "HTTPS = HTTP + TLS",
    description:
      "HTTPS is simply normal HTTP traffic securely wrapped in an encrypted TLS tunnel to prevent eavesdropping and tampering.",
    icon: "🔒",
  },
  {
    title: "Symmetric Speed, Asymmetric Trust",
    description:
      "TLS uses slow asymmetric cryptography (RSA/ECC) just to securely agree on a fast symmetric key (AES) for the actual data transfer.",
    icon: "⚡",
  },
];

export default function HTTPHTTPSDeepDivePage() {
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
            className="text-xs font-medium uppercase tracking-[0.25em] text-muted whitespace-nowrap overflow-hidden text-ellipsis px-2"
          >
            Web Fundamentals · Topic 2 of 6
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.1,
            }}
            className="mt-6 font-heading text-4xl font-bold text-platinum md:text-5xl lg:text-6xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            HTTP & HTTPS Deep Dive
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
              words="Once the TCP connection is secure, your browser and the server begin a conversation. Let's dissect the language they speak: HTTP."
              className="!font-normal !text-secondary"
              duration={0.3}
              filter={false}
            />
          </motion.div>

          {/* Estimated reading time */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-8 flex items-center justify-center gap-4 text-xs text-muted flex-wrap px-4"
          >
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              20 min read
            </span>
            <span className="hidden sm:block w-px h-3 bg-divider" />
            <span className="whitespace-nowrap">Message Anatomy</span>
            <span className="hidden sm:block w-px h-3 bg-divider" />
            <span className="whitespace-nowrap">Cryptography Basics</span>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-glow-divider" aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════
          MAIN CONTENT — with Tracing Beam
          ═══════════════════════════════════════════════════════ */}
      <TracingBeam className="px-6 py-16 md:py-24">
        
        {/* ── Section 1: The HTTP Protocol ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader number="01" title="The Language of the Web" subtitle="Stateless by design." />

          <p className="text-sm text-secondary leading-relaxed mb-6 max-w-2xl" style={{ lineHeight: "1.8" }}>
            <strong className="text-platinum">HTTP (Hypertext Transfer Protocol)</strong> is the foundation of data communication for the World Wide Web. It operates perfectly like an order at a busy restaurant counter:
          </p>

          <ul className="list-disc text-sm text-secondary leading-relaxed pl-5 mb-10 max-w-2xl space-y-2" style={{ lineHeight: "1.8" }}>
              <li><strong className="text-platinum">You (The Client)</strong> send a <span className="font-mono text-accent text-xs">Request</span> (e.g., &quot;I want a coffee.&quot;).</li>
              <li><strong className="text-platinum">The Barista (The Server)</strong> processes it and returns a <span className="font-mono text-accent text-xs">Response</span> (e.g., &quot;Here is your coffee.&quot;).</li>
              <li>Crucially, HTTP is <strong className="text-platinum">Stateless</strong>. Next time you walk up to order, the barista has amnesia and doesn&apos;t remember you. Developers must use side-channels like <strong className="text-platinum">Cookies</strong> or <strong className="text-platinum">Tokens</strong> to give the server memory about your session.</li>
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-8 max-w-4xl">
              <div className="p-5 border border-divider bg-surface/30">
                  <h4 className="text-platinum text-sm font-semibold mb-3">HTTP Verbs (Methods)</h4>
                  <p className="text-xs text-secondary leading-relaxed mb-3">The verb defines the <i>intent</i> of the request:</p>
                  <ul className="space-y-2 font-mono text-[11px]">
                      <li><span className="text-emerald-400 font-bold w-12 inline-block">GET</span> Read a resource (No body allowed).</li>
                      <li><span className="text-blue-400 font-bold w-12 inline-block">POST</span> Create a new resource.</li>
                      <li><span className="text-amber-500 font-bold w-12 inline-block">PUT</span> Replace a resource entirely.</li>
                      <li><span className="text-purple-400 font-bold w-12 inline-block">PATCH</span> Update a resource partially.</li>
                      <li><span className="text-rose-500 font-bold w-12 inline-block">DELETE</span> Remove a resource.</li>
                  </ul>
              </div>
              <div className="p-5 border border-divider bg-surface/30">
                  <h4 className="text-platinum text-sm font-semibold mb-3">The Cost of Statelessness</h4>
                  <p className="text-xs text-secondary leading-relaxed mb-3" style={{ lineHeight: "1.7" }}>
                  Because HTTP is stateless, the server doesn&apos;t need to keep open connections or track memory for millions of users natively, making the web massively <strong className="text-platinum">scalable</strong>.
                  <br/><br/>
                  However, the tradeoff is overhead: every single request to a secure API must contain the full Authentication token (like a JWT) in its headers. If a JWT is large, sending it on every request wastes bandwidth. This is why headers are compressed in modern HTTP/2 and HTTP/3.
                  </p>
              </div>
          </div>
        </motion.section>

        {/* ── Section 2: Anatomy of a Message ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader number="02" title="Anatomy of a Message" subtitle="Plain text under the hood." />

          <p className="text-sm text-secondary leading-relaxed mb-10 max-w-2xl" style={{ lineHeight: "1.8" }}>
            Underneath the polished browsers and complex frameworks, HTTP is surprisingly simple. It is fundamentally just highly structured formatted text. Explore the structure of a standard Request and Response below.
          </p>

          <HTTPMessageStructureDiagram />
        </motion.section>

        {/* ── Section 3: Status Codes ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader number="03" title="Status Codes" subtitle="How servers summarize their responses." />

          <div className="space-y-6 mb-10 max-w-2xl">
            <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
              Rather than forcing the browser to parse descriptive text to figure out if an operation succeeded, HTTP uses standard 3-digit <strong className="text-platinum">Status Codes</strong>. The first digit defines the category of response.
            </p>
          </div>

          <HTTPStatusCodesDiagram />
        </motion.section>

        {/* ── Section 4: HTTPS and TLS ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader number="04" title="HTTPS & TLS" subtitle="Securing the plain-text channel." />

          <div className="space-y-6 mb-10 max-w-2xl">
            <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
              Remember how HTTP is just plain text? If sent over a network as-is, anyone sitting between you and the server (like a router on public Wi-Fi) can read your passwords, session tokens, and credit card numbers. This is a <strong className="text-platinum">Man-in-the-Middle (MITM)</strong> vulnerability.
            </p>
            <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
              <strong className="text-platinum">HTTPS (HTTP Secure)</strong> solves this. It isn&apos;t a new protocol, it&apos;s just HTTP routed inside a secure, encrypted tunnel called <strong className="text-platinum">TLS (Transport Layer Security)</strong>.
            </p>
            
            <div className="p-5 border-l-2 border-accent bg-accent/5 my-6">
                <h5 className="text-platinum text-xs font-bold uppercase tracking-widest mb-2">The Cryptography Dance</h5>
                <p className="text-xs text-secondary leading-relaxed" style={{ lineHeight: "1.7" }}>
                  Encryption is mathematically expensive. 
                  <strong className="text-platinum"> Asymmetric Encryption</strong> (like RSA or ECC) uses two keys: a Public key to lock data, and a Private key to unlock it. It is incredibly secure but very slow.
                  <strong className="text-platinum"> Symmetric Encryption</strong> (like AES) uses one key to both lock and unlock. It is incredibly fast, but if anyone intercepts the key while you share it, the system is broken.
                  <br/><br/>
                  TLS beautifully combines both: It uses the slow Asymmetric method <i>just once</i> during the handshake to securely exchange a temporary Symmetric "Session Key" over the open internet. Once they both safely have the Session Key, they switch to high-speed Symmetric encryption for the rest of the HTTP requests.
                </p>
            </div>
            
            <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
              Step through the modern TLS 1.3 Handshake below to see how they safely agree on a secret key without anyone else intercepting it, utilizing 1-RTT (One Round Trip Time).
            </p>
          </div>

          <HTTPSAndTLSDiagram />
        </motion.section>


        {/* ── Section 5: Useful Commands ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader number="05" title="Useful Commands" subtitle="Inspect reality." />

          <p className="text-sm text-secondary leading-relaxed mb-10 max-w-2xl" style={{ lineHeight: "1.8" }}>
            As a developer, the <span className="font-mono text-accent text-xs">curl</span> command is your best friend for interacting with HTTP APIs natively from the terminal without a browser.
          </p>

          <div className="space-y-4">
            {TERMINAL_COMMANDS.map((cmd, i) => (
              <motion.div
                key={cmd.command}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: i * 0.05,
                }}
              >
                <CommandBlock {...cmd} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Section 6: Key Takeaways ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <SectionHeader number="06" title="Key Takeaways" subtitle="The essential concepts to remember." />

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
                  transition: "border-color 400ms cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
              >
                <span className="text-2xl">{item.icon}</span>
                <h4 className="mt-3 text-sm font-medium text-platinum">
                  {item.title}
                </h4>
                <p className="mt-2 text-xs text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </TracingBeam>

      {/* Divider */}
      <div className="section-glow-divider" aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════
          TOPIC NAVIGATION (Prev / Next)
          ═══════════════════════════════════════════════════════ */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl flex items-center justify-between flex-wrap gap-4">
          <Link 
            href="/fundamentals/how-internet-works"
            className="group flex flex-col items-start px-5 py-3 border border-divider text-platinum hover:border-accent/40 hover:bg-surface/20 min-w-[200px]"
            style={{
              borderRadius: "2px",
              transition: "all 400ms cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          >
            <span className="text-[10px] text-muted uppercase tracking-widest mb-1 group-hover:text-accent transition-colors">← Previous</span>
            <span className="text-sm font-medium">How the Internet Works</span>
          </Link>

          {/* Placeholder for future next topic, or disable if it's the last one for now */}
          <div className="text-sm text-muted italic text-right">
             End of current module. Next topics coming soon.
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   Reusable Sub-Components (Duplicated for module isolation simplicity)
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

function CommandBlock({
  command,
  description,
  output,
  platform,
}: {
  command: string;
  description: string;
  output: string;
  platform: string;
}) {
  return (
    <div className="border border-divider overflow-hidden hover:border-divider-hover" style={{ borderRadius: "2px", transition: "border-color 300ms cubic-bezier(0.25, 0.1, 0.25, 1)" }}>
      {/* Command Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-divider bg-surface/50">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-accent text-xs">$</span>
          <code className="text-sm font-mono text-platinum truncate max-w-[200px] sm:max-w-none">{command}</code>
        </div>
        <span className="hidden sm:block text-[10px] uppercase tracking-[0.15em] text-muted shrink-0 ml-4">
          {platform}
        </span>
      </div>

      {/* Description */}
      <div className="px-5 py-3 border-b border-divider">
        <p className="text-xs text-secondary leading-relaxed">{description}</p>
      </div>

      {/* Output */}
      <div className="px-5 py-4 bg-[#15171a] overflow-x-auto">
        <pre className="text-xs font-mono text-muted leading-relaxed whitespace-pre">
          {output}
        </pre>
      </div>
    </div>
  );
}
