"use client";

import { motion } from "motion/react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Timeline } from "@/components/ui/timeline";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import DNSResolutionDiagram from "./components/DNSResolutionDiagram";
import TCPHandshakeDiagram from "./components/TCPHandshakeDiagram";
import OSILayerDiagram from "./components/OSILayerDiagram";
import HTTPFlowDiagram from "./components/HTTPFlowDiagram";
import PacketJourneyDiagram from "./components/PacketJourneyDiagram";

/* ── Scroll reveal variant ── */
const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/* ── Timeline data for "What happens when you type a URL" ── */
const URL_JOURNEY_DATA = [
  {
    title: "Step 1",
    content: (
      <div>
        <h4 className="text-lg font-semibold text-platinum mb-3">
          URL Parsing
        </h4>
        <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
          The browser parses the URL you typed — splitting it into{" "}
          <span className="text-accent font-mono text-xs">protocol</span> (https://),{" "}
          <span className="text-accent font-mono text-xs">domain</span> (www.example.com),{" "}
          <span className="text-accent font-mono text-xs">path</span> (/page), and{" "}
          <span className="text-accent font-mono text-xs">query parameters</span> (?key=value).
          It first checks if the input is a valid URL or a search query.
        </p>
      </div>
    ),
  },
  {
    title: "Step 2",
    content: (
      <div>
        <h4 className="text-lg font-semibold text-platinum mb-3">
          DNS Lookup
        </h4>
        <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
          The browser needs to find the IP address behind the domain name. It checks the browser
          cache → OS cache → router cache → ISP's DNS resolver. If none have it cached, a full
          recursive DNS lookup begins through root servers, TLD servers, and authoritative servers.
        </p>
      </div>
    ),
  },
  {
    title: "Step 3",
    content: (
      <div>
        <h4 className="text-lg font-semibold text-platinum mb-3">
          TCP Connection
        </h4>
        <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
          With the IP address resolved, the browser initiates a <strong className="text-platinum">TCP three-way handshake</strong> (SYN → SYN-ACK → ACK)
          to establish a reliable connection. For HTTPS sites, a <strong className="text-platinum">TLS handshake</strong> follows to encrypt the channel.
        </p>
      </div>
    ),
  },
  {
    title: "Step 4",
    content: (
      <div>
        <h4 className="text-lg font-semibold text-platinum mb-3">
          HTTP Request
        </h4>
        <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
          The browser sends an HTTP GET request with headers containing the Host, User-Agent,
          accepted content types, cookies, and more. The request travels through routers and load
          balancers to reach the web server.
        </p>
      </div>
    ),
  },
  {
    title: "Step 5",
    content: (
      <div>
        <h4 className="text-lg font-semibold text-platinum mb-3">
          Server Processing & Response
        </h4>
        <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
          The web server (Nginx, Apache, etc.) receives the request, processes it — potentially
          querying databases, running application logic — and sends back an HTTP response with a
          status code (200 OK), headers, and the HTML body.
        </p>
      </div>
    ),
  },
  {
    title: "Step 6",
    content: (
      <div>
        <h4 className="text-lg font-semibold text-platinum mb-3">
          Browser Rendering
        </h4>
        <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
          The browser parses the HTML to build the <strong className="text-platinum">DOM tree</strong>, parses CSS to build the{" "}
          <strong className="text-platinum">CSSOM tree</strong>, combines them into a{" "}
          <strong className="text-platinum">Render Tree</strong>, computes layout, paints pixels,
          and composites layers. JavaScript is parsed and executed, potentially modifying the DOM.
        </p>
      </div>
    ),
  },
];

/* ── Terminal Commands Data ── */
const TERMINAL_COMMANDS = [
  {
    command: "nslookup google.com",
    description: "Query DNS to find the IP address of a domain",
    output: `Server:    8.8.8.8
Address:   8.8.8.8#53

Non-authoritative answer:
Name:  google.com
Address: 142.250.80.46`,
    platform: "All",
  },
  {
    command: "dig example.com +short",
    description: "Advanced DNS lookup with concise output showing just the IP",
    output: `93.184.216.34`,
    platform: "macOS / Linux",
  },
  {
    command: "traceroute google.com",
    description: "Trace the route packets take to reach a destination, showing each hop",
    output: `traceroute to google.com (142.250.80.46), 30 hops max
 1  192.168.1.1     1.234 ms
 2  10.0.0.1        5.678 ms
 3  72.14.215.85   12.345 ms
 4  142.250.80.46  15.678 ms`,
    platform: "macOS / Linux",
  },
  {
    command: "ping -c 4 google.com",
    description: "Send ICMP echo requests to test connectivity and measure latency",
    output: `PING google.com (142.250.80.46): 56 data bytes
64 bytes from 142.250.80.46: icmp_seq=0 ttl=117 time=12.3 ms
64 bytes from 142.250.80.46: icmp_seq=1 ttl=117 time=11.8 ms
64 bytes from 142.250.80.46: icmp_seq=2 ttl=117 time=12.1 ms
64 bytes from 142.250.80.46: icmp_seq=3 ttl=117 time=11.9 ms

--- google.com ping statistics ---
4 packets transmitted, 4 received, 0% packet loss
round-trip min/avg/max = 11.8/12.0/12.3 ms`,
    platform: "All",
  },
  {
    command: "ipconfig /flushdns",
    description:
      "Flush the DNS resolver cache — forces fresh DNS lookups for all domains",
    output: `Windows IP Configuration

Successfully flushed the DNS Resolver Cache.`,
    platform: "Windows",
  },
  {
    command: "sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder",
    description:
      "Flush DNS cache on macOS — useful when DNS records have changed",
    output: `Password: ********
(cache flushed silently — no output means success)`,
    platform: "macOS",
  },
  {
    command: "curl -v https://example.com",
    description:
      "Make an HTTP request with verbose output showing connection details, TLS handshake, headers",
    output: `* Trying 93.184.216.34:443...
* Connected to example.com (93.184.216.34) port 443
* TLS 1.3 handshake completed
> GET / HTTP/1.1
> Host: example.com
> User-Agent: curl/8.1.2
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Type: text/html; charset=UTF-8
< Content-Length: 1256
<
<!doctype html>...`,
    platform: "All",
  },
  {
    command: "whois example.com",
    description:
      "Look up domain registration details — registrar, creation date, nameservers",
    output: `Domain Name: EXAMPLE.COM
Registry Domain ID: 2336799_DOMAIN_COM-VRSN
Registrar: RESERVED-Internet Assigned Numbers Authority
Creation Date: 1995-08-14T04:00:00Z
Name Server: A.IANA-SERVERS.NET
Name Server: B.IANA-SERVERS.NET`,
    platform: "All",
  },
];

/* ── Key Takeaway Cards ── */
const TAKEAWAYS = [
  {
    title: "DNS is the Phone Book",
    description:
      "Domain names are human-friendly aliases. DNS translates them to IP addresses that computers use to route traffic.",
    icon: "📋",
  },
  {
    title: "TCP Ensures Reliability",
    description:
      "The three-way handshake guarantees both sides are ready to communicate. TCP ensures packets arrive in order and retransmits lost ones.",
    icon: "🔗",
  },
  {
    title: "HTTP is Stateless",
    description:
      "Each HTTP request is independent. Cookies, sessions, and tokens are used to maintain state across requests.",
    icon: "📨",
  },
  {
    title: "Layers Abstract Complexity",
    description:
      "The OSI model separates networking into layers so each can evolve independently. You rarely deal with all 7 layers directly.",
    icon: "📚",
  },
  {
    title: "Caching Exists Everywhere",
    description:
      "From browser cache to CDN to DNS cache — caching at every layer reduces latency and load on servers.",
    icon: "⚡",
  },
  {
    title: "Security is Multi-Layered",
    description:
      "HTTPS/TLS encrypts data in transit, DNSSEC validates DNS responses, and firewalls filter traffic at the network layer.",
    icon: "🔒",
  },
];

export default function HowInternetWorksPage() {
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
            Web Fundamentals · Topic 1 of 6
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
            How the Internet Works
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
              words="Every time you type a URL and press Enter, a remarkable chain of events unfolds in milliseconds. Let's trace that journey, step by step."
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
            className="mt-8 flex items-center justify-center gap-6 text-xs text-muted"
          >
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              15 min read
            </span>
            <span className="w-px h-3 bg-divider" />
            <span>Interactive Diagrams</span>
            <span className="w-px h-3 bg-divider" />
            <span>Terminal Commands</span>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-glow-divider" aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════
          MAIN CONTENT — with Tracing Beam
          ═══════════════════════════════════════════════════════ */}
      <TracingBeam className="px-6 py-16 md:py-24">
        {/* ── Section 1: The Big Picture ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader number="01" title="The Big Picture" subtitle="What happens when you type a URL and press Enter?" />

          <p className="text-sm text-secondary leading-relaxed mb-10 max-w-2xl" style={{ lineHeight: "1.8" }}>
            Before diving deep into each concept, let&apos;s visualize the complete journey a request
            takes — from your browser to a server and back. Click &quot;Watch the Journey&quot; to see it unfold.
          </p>

          <PacketJourneyDiagram />
        </motion.section>

        {/* ── Section 2: What Happens Step by Step (Timeline) ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader number="02" title="Step-by-Step Breakdown" subtitle="The 6 stages of loading a web page" />

          <p className="text-sm text-secondary leading-relaxed mb-6 max-w-2xl" style={{ lineHeight: "1.8" }}>
            Each stage involves different protocols, systems, and layers of abstraction.
            Scroll through to understand what happens at each stage.
          </p>

          <Timeline
            data={URL_JOURNEY_DATA}
            title="From URL to Rendered Page"
            description="Scroll through the 6 critical stages that transform a typed URL into a fully rendered web page."
          />
        </motion.section>

        {/* ── Section 3: DNS Resolution ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader number="03" title="DNS Resolution" subtitle="How domain names become IP addresses" />

          <div className="space-y-6 mb-10 max-w-2xl">
            <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
              The <strong className="text-platinum">Domain Name System (DNS)</strong> is often called the
              &quot;phone book of the internet.&quot; It translates human-readable domain names like{" "}
              <span className="font-mono text-accent text-xs">www.google.com</span> into machine-readable
              IP addresses like <span className="font-mono text-accent text-xs">142.250.80.46</span>.
            </p>
            <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
              The lookup process is hierarchical and cached at multiple levels for performance.
              Click &quot;Watch Lookup&quot; to see the full recursive resolution process, or click
              individual steps to explore.
            </p>
          </div>

          <DNSResolutionDiagram />
        </motion.section>

        {/* ── Section 4: TCP/IP & The Handshake ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader number="04" title="TCP/IP & The Handshake" subtitle="Establishing a reliable connection" />

          <div className="space-y-6 mb-10 max-w-2xl">
            <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
              <strong className="text-platinum">TCP (Transmission Control Protocol)</strong> ensures data
              is delivered reliably and in order. Before any data exchange happens, client and server
              perform a <strong className="text-platinum">three-way handshake</strong> to establish the
              connection.
            </p>
            <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
              This is different from <strong className="text-platinum">UDP (User Datagram Protocol)</strong>,
              which skips the handshake for lower latency but doesn&apos;t guarantee delivery — ideal for
              video streaming, gaming, and DNS queries.
            </p>
          </div>

          <TCPHandshakeDiagram />
        </motion.section>

        {/* ── Section 5: HTTP Request & Response ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader number="05" title="HTTP Request & Response" subtitle="The language of the web" />

          <div className="space-y-6 mb-10 max-w-2xl">
            <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
              <strong className="text-platinum">HTTP (HyperText Transfer Protocol)</strong> defines how
              messages are formatted and transmitted between clients and servers. Every web page load
              involves at least one HTTP request-response cycle.
            </p>
            <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
              Explore the tabs below to understand request and response headers, HTTP methods, and
              the meaning behind status codes you encounter daily.
            </p>
          </div>

          <HTTPFlowDiagram />
        </motion.section>

        {/* ── Section 6: The OSI Model ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader number="06" title="The OSI Model" subtitle="Understanding the 7 layers of networking" />

          <div className="space-y-6 mb-10 max-w-2xl">
            <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
              The <strong className="text-platinum">OSI (Open Systems Interconnection)</strong> model is a
              conceptual framework that standardizes networking into 7 distinct layers. Each layer has a
              specific responsibility, and data flows down the stack on the sender&apos;s side, gaining a new
              header at each layer — a process called <strong className="text-platinum">encapsulation</strong>.
            </p>
            <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
              Below, we trace a <strong className="text-platinum">real HTTPS request</strong> through all
              7 layers. Click on each layer to see exactly how the data is transformed, what headers are
              added, and what the packet looks like at that stage. You&apos;ll see how a simple HTTP GET
              request becomes a full Ethernet frame ready for physical transmission.
            </p>
          </div>

          <OSILayerDiagram />
        </motion.section>

        {/* ── Section 7: Useful Commands ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-24"
        >
          <SectionHeader number="07" title="Useful Commands" subtitle="Terminal tools for deeper understanding" />

          <p className="text-sm text-secondary leading-relaxed mb-10 max-w-2xl" style={{ lineHeight: "1.8" }}>
            The best way to understand networking is to experiment. These terminal commands let you
            peek under the hood — query DNS, trace routes, inspect HTTP connections, and flush caches.
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

        {/* ── Section 8: Key Takeaways ── */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <SectionHeader number="08" title="Key Takeaways" subtitle="The essential concepts to remember" />

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
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <div className="text-sm text-muted">
            ← Previous topic
          </div>
          <a
            href="/fundamentals/how-internet-works"
            className="px-5 py-2.5 text-sm font-medium border border-divider text-platinum hover:border-accent/40 hover:text-accent"
            style={{
              borderRadius: "2px",
              transition: "all 400ms cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          >
            Next: HTTP & HTTPS Deep Dive →
          </a>
        </div>
      </section>
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
          <code className="text-sm font-mono text-platinum truncate">{command}</code>
        </div>
        <span className="text-[10px] uppercase tracking-[0.15em] text-muted shrink-0 ml-4">
          {platform}
        </span>
      </div>

      {/* Description */}
      <div className="px-5 py-3 border-b border-divider">
        <p className="text-xs text-secondary">{description}</p>
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
