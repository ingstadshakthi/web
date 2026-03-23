"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const DNS_STEPS = [
  {
    id: 1,
    label: "Browser Cache",
    description:
      "The browser first checks its own local DNS cache. Modern browsers maintain a cache of recently resolved domain names to avoid redundant lookups.",
    icon: "🌐",
    detail: "Cache TTL (Time To Live) typically ranges from 60s to 86400s depending on the DNS record configuration. Chrome stores up to 1000 entries.",
    whenUsed: "Fastest resolution — instant if the domain was visited recently. No network requests needed.",
    command: "chrome://net-internals/#dns — view Chrome's DNS cache",
  },
  {
    id: 2,
    label: "OS Cache",
    description:
      "If the browser cache misses, the operating system's DNS resolver stub is queried. The OS also checks its own cache and the local hosts file.",
    icon: "💻",
    detail: "The hosts file is a plain text file that maps hostnames to IP addresses. It's checked before any DNS server query.",
    whenUsed: "Checked second. The hosts file can override DNS — used for local development (mapping localhost) and ad blocking.",
    command: "macOS/Linux: cat /etc/hosts | Windows: C:\\Windows\\System32\\drivers\\etc\\hosts",
  },
  {
    id: 3,
    label: "Router Cache",
    description:
      "Your home/office router often has its own DNS cache. When multiple devices on the same network visit the same domains, the router can serve cached results.",
    icon: "📶",
    detail: "Most consumer routers run a lightweight DNS forwarder (like dnsmasq) that caches results for all devices on the network.",
    whenUsed: "Checked third. Especially helpful in shared networks where multiple devices visit the same sites.",
    command: "Access via router admin panel (usually 192.168.1.1) to view/flush cache",
  },
  {
    id: 4,
    label: "ISP Recursive Resolver",
    description:
      "If no local cache has the answer, the query reaches your ISP's recursive DNS resolver. This server is responsible for doing the heavy lifting — it will chase down the answer through the DNS hierarchy if it doesn't have it cached.",
    icon: "📡",
    detail: "You can change your resolver to a public one for speed and privacy. Popular choices: Google (8.8.8.8 / 8.8.4.4), Cloudflare (1.1.1.1), OpenDNS (208.67.222.222).",
    whenUsed: "If all local caches miss. The resolver checks its own cache (shared across thousands of users), so popular domains are almost always cached.",
    command: "nslookup google.com — queries your configured resolver",
  },
  {
    id: 5,
    label: "Root Name Server",
    description:
      "The resolver queries one of 13 root name server clusters (labeled a through m). Root servers don't know the final IP — they direct the resolver to the correct TLD (Top-Level Domain) server for the domain extension (e.g., \".com\", \".org\", \".io\").",
    icon: "🌍",
    detail: "There are 13 logical root server clusters (a.root-servers.net through m.root-servers.net), but they are replicated across 1,500+ physical servers globally using anycast routing.",
    whenUsed: "Only reached if the ISP resolver doesn't have a cached answer. The root zone file is only ~2MB — it's just a directory of TLD servers.",
    command: "dig . NS — shows the root name server list",
  },
  {
    id: 6,
    label: "TLD Server",
    description:
      "The TLD (Top-Level Domain) name server for the domain extension (like \".com\") is queried. It doesn't know the final IP either, but it knows which authoritative name server is responsible for the specific domain.",
    icon: "📋",
    detail: "TLD types: Generic (.com, .org, .net, .io), Country-Code (.uk, .in, .jp, .de), Sponsored (.edu, .gov, .mil), and New gTLDs (.app, .dev, .xyz).",
    whenUsed: "Refers the resolver to the domain's authoritative servers. Verisign manages .com and .net TLDs (containing ~160 million domains).",
    command: "dig com. NS — shows the .com TLD servers",
  },
  {
    id: 7,
    label: "Authoritative Name Server",
    description:
      "The authoritative DNS server is the final authority for the domain. It holds all DNS records (A, AAAA, CNAME, MX, TXT, etc.) and returns the definitive IP address. This is the \"source of truth\" for the domain.",
    icon: "✅",
    detail: "The authoritative server is managed by the domain registrar or DNS hosting provider (Cloudflare, Route 53, Google Domains). It contains: A record (IPv4 address), AAAA record (IPv6), CNAME (alias), MX (mail), TXT (verification), NS (nameserver) records.",
    whenUsed: "The final stop. After this, the IP is returned to the resolver, which caches it, then returns it all the way back to your browser.",
    command: "dig example.com @ns1.example.com — query the authoritative server directly",
  },
];

export default function DNSResolutionDiagram() {
  const [activeStep, setActiveStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = () => {
    setActiveStep(-1);
    setIsPlaying(true);
    let step = 0;

    intervalRef.current = setInterval(() => {
      if (step >= DNS_STEPS.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsPlaying(false);
        return;
      }
      setActiveStep(step);
      step++;
    }, 2800);
  };

  const stopAnimation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex items-center gap-4 mb-10">
        <button
          onClick={isPlaying ? stopAnimation : startAnimation}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-divider text-platinum hover:border-accent/40 hover:text-accent"
          style={{
            borderRadius: "2px",
            transition:
              "all 400ms cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        >
          {isPlaying ? (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
              {activeStep >= 0 ? "Replay" : "Watch Lookup"}
            </>
          )}
        </button>
        {activeStep >= 0 && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted"
          >
            Step {Math.min(activeStep + 1, DNS_STEPS.length)} of{" "}
            {DNS_STEPS.length}
          </motion.span>
        )}
      </div>

      {/* DNS Lookup Chain */}
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-divider" />

        <div className="space-y-1">
          {DNS_STEPS.map((step, index) => {
            const isActive = index <= activeStep;
            const isCurrent = index === activeStep;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0.4 }}
                animate={{
                  opacity: isActive ? 1 : 0.4,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="relative cursor-pointer group"
                onClick={() => {
                  if (!isPlaying) setActiveStep(index);
                }}
              >
                {/* Node dot on the line */}
                <div className="absolute left-8 top-6 -translate-x-1/2 z-10">
                  <motion.div
                    animate={{
                      scale: isCurrent ? 1.4 : 1,
                      backgroundColor: isActive
                        ? "rgb(176, 196, 222)"
                        : "rgb(50, 53, 58)",
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="w-3 h-3 rounded-full border border-divider"
                  />
                </div>

                {/* Animated connector pulse */}
                {isCurrent && (
                  <motion.div
                    className="absolute left-8 top-6 -translate-x-1/2 z-0 w-3 h-3 rounded-full bg-accent"
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}

                {/* Content */}
                <div
                  className="ml-16 py-5 px-6 border border-transparent hover:border-divider"
                  style={{
                    borderRadius: "2px",
                    transition:
                      "border-color 300ms cubic-bezier(0.25, 0.1, 0.25, 1)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg">{step.icon}</span>
                    <h4
                      className={`text-sm font-medium transition-colors duration-300 ${
                        isActive ? "text-platinum" : "text-muted"
                      }`}
                    >
                      {step.label}
                    </h4>
                    <span className="text-[10px] font-mono text-muted/50">
                      {index + 1}/{DNS_STEPS.length}
                    </span>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[10px] uppercase tracking-[0.15em] text-accent font-medium"
                      >
                        {isCurrent ? "Querying..." : "✓ Checked"}
                      </motion.span>
                    )}
                  </div>

                  <p
                    className={`text-sm leading-relaxed transition-colors duration-300 ${
                      isActive ? "text-secondary" : "text-muted/60"
                    }`}
                    style={{ lineHeight: "1.8" }}
                  >
                    {step.description}
                  </p>

                  {/* Expanded detail — visible when active (clicked or reached) */}
                  <AnimatePresence>
                    {isCurrent && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-divider space-y-3">
                          {/* Technical detail */}
                          <div className="p-3 bg-accent/5 border border-accent/10" style={{ borderRadius: "2px" }}>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-muted mb-1">Technical Detail</p>
                            <p className="text-xs text-accent/90 leading-relaxed" style={{ lineHeight: "1.7" }}>
                              {step.detail}
                            </p>
                          </div>

                          {/* When is this used */}
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-muted mb-1">When This Is Used</p>
                            <p className="text-xs text-secondary leading-relaxed" style={{ lineHeight: "1.7" }}>
                              {step.whenUsed}
                            </p>
                          </div>

                          {/* Related command */}
                          <div className="flex items-start gap-2">
                            <span className="text-accent text-xs mt-0.5">$</span>
                            <code className="text-[11px] font-mono text-muted leading-relaxed">
                              {step.command}
                            </code>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Result banner */}
        <AnimatePresence>
          {activeStep >= DNS_STEPS.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="ml-16 mt-6 p-5 border border-accent/20 bg-accent/5"
              style={{ borderRadius: "2px" }}
            >
              <p className="text-sm font-medium text-accent">
                ✓ DNS Resolution Complete
              </p>
              <p className="text-xs text-secondary mt-2 leading-relaxed" style={{ lineHeight: "1.7" }}>
                IP address <span className="text-platinum font-mono">93.184.216.34</span> returned to browser and cached at every level.
                The entire process typically takes <strong className="text-platinum">20–120ms</strong> for a cold lookup. Cached lookups resolve in under 1ms.
              </p>
              <p className="text-xs text-muted mt-2">
                💡 In practice, steps 1-4 usually have the answer cached. Full recursive lookups (steps 5-7) are rare for popular domains.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
