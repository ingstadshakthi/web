"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

interface JourneyNode {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  description: string;
}

const NODES: JourneyNode[] = [
  { id: "browser", label: "Your Browser", icon: "🌐", x: 50, y: 50, description: "You type www.example.com and press Enter. The browser first parses the URL into protocol, domain, path, and query." },
  { id: "browser-cache", label: "Browser Cache", icon: "💾", x: 170, y: 50, description: "The browser checks its local DNS cache. If this domain was visited recently, the cached IP is used — no network request needed." },
  { id: "os-cache", label: "OS Cache", icon: "💻", x: 290, y: 50, description: "If the browser cache misses, the OS-level DNS resolver is queried. This includes the hosts file (/etc/hosts) and the system DNS cache." },
  { id: "isp", label: "ISP Resolver", icon: "📡", x: 410, y: 50, description: "The query reaches your ISP's recursive DNS resolver (or a public one like Google 8.8.8.8 or Cloudflare 1.1.1.1)." },
  { id: "dns", label: "DNS Server", icon: "📋", x: 530, y: 50, description: "If not cached at the ISP, a full recursive DNS lookup begins: Root Server → TLD Server → Authoritative Server to resolve the IP." },
  { id: "server", label: "Web Server", icon: "🖥️", x: 530, y: 160, description: "A TCP connection is established (3-way handshake), then the browser sends an HTTP request. The server processes it and prepares the response." },
  { id: "response", label: "Response", icon: "📦", x: 290, y: 160, description: "The server sends back an HTTP response with status code, headers, and the body (HTML, CSS, JS files) compressed with gzip/brotli." },
  { id: "render", label: "Render", icon: "✨", x: 50, y: 160, description: "The browser parses HTML (DOM), CSS (CSSOM), builds the Render Tree, computes layout, paints pixels, and composites layers. The page appears!" },
];

export default function PacketJourneyDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startJourney = () => {
    setActiveNode(-1);
    setIsPlaying(true);
    let step = 0;
    intervalRef.current = setInterval(() => {
      if (step >= NODES.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsPlaying(false);
        return;
      }
      setActiveNode(step);
      step++;
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const svgWidth = 600;
  const svgHeight = 210;

  // Build path segments from sequential nodes
  const pathSegments = NODES.slice(0, -1).map((_, i) => ({ from: i, to: i + 1 }));

  return (
    <div className="w-full" ref={containerRef}>
      {/* Controls */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={startJourney}
          disabled={isPlaying}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-divider text-platinum hover:border-accent/40 hover:text-accent disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            borderRadius: "2px",
            transition: "all 400ms cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
          {activeNode >= 0 ? "Replay Journey" : "Watch the Journey"}
        </button>
        {isPlaying && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted"
          >
            Step {Math.min(activeNode + 2, NODES.length)} of {NODES.length}
          </motion.span>
        )}
      </div>

      {/* SVG Diagram */}
      <div className="border border-divider p-4 md:p-8 overflow-x-auto" style={{ borderRadius: "2px" }}>
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto"
          style={{ minWidth: "550px" }}
        >
          {/* Connection Paths */}
          {pathSegments.map((seg, i) => {
            const from = NODES[seg.from];
            const to = NODES[seg.to];
            const isActive = activeNode >= seg.to;

            return (
              <g key={`path-${i}`}>
                {/* Background path */}
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1.5"
                  strokeDasharray="6,4"
                />
                {/* Active path */}
                <motion.line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#B0C4DE"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: isActive ? 1 : 0,
                    opacity: isActive ? 0.6 : 0,
                  }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </g>
            );
          })}

          {/* Nodes */}
          {NODES.map((node, i) => {
            const isActive = i <= activeNode;
            const isCurrent = i === activeNode;

            return (
              <g
                key={node.id}
                className="cursor-pointer"
                onClick={() => {
                  if (!isPlaying) setActiveNode(i);
                }}
              >
                {/* Pulse ring */}
                {isCurrent && (
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r="18"
                    fill="none"
                    stroke="#B0C4DE"
                    strokeWidth="1"
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}

                {/* Node circle */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="16"
                  fill={isActive ? "rgba(176, 196, 222, 0.1)" : "rgba(50, 53, 58, 0.8)"}
                  stroke={isActive ? "#B0C4DE" : "rgba(255,255,255,0.12)"}
                  strokeWidth="1"
                  animate={{
                    fill: isActive ? "rgba(176, 196, 222, 0.1)" : "rgba(50, 53, 58, 0.8)",
                    stroke: isActive ? "#B0C4DE" : "rgba(255,255,255,0.12)",
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Icon */}
                <text
                  x={node.x}
                  y={node.y + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="12"
                >
                  {node.icon}
                </text>

                {/* Label */}
                <motion.text
                  x={node.x}
                  y={node.y + 30}
                  textAnchor="middle"
                  fontSize="8"
                  fontFamily="var(--font-inter, Inter, sans-serif)"
                  fontWeight="500"
                  animate={{
                    fill: isActive ? "#F8F9FA" : "#6B7280",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {node.label}
                </motion.text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Active Node Description */}
      {activeNode >= 0 && (
        <motion.div
          key={activeNode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-6 p-5 border border-divider bg-surface/30"
          style={{ borderRadius: "2px" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-lg">{NODES[activeNode].icon}</span>
            <h4 className="text-sm font-medium text-platinum">
              Step {activeNode + 1}: {NODES[activeNode].label}
            </h4>
          </div>
          <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
            {NODES[activeNode].description}
          </p>
        </motion.div>
      )}
    </div>
  );
}
