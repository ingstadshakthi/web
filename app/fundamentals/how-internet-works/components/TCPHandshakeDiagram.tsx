"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";

interface HandshakeStep {
  id: string;
  label: string;
  direction: "right" | "left";
  description: string;
  color: string;
  technical: string;
  detail: string;
  analogy: string;
}

const HANDSHAKE_STEPS: HandshakeStep[] = [
  {
    id: "syn",
    label: "SYN",
    direction: "right",
    description:
      "The client initiates the connection by sending a SYN (synchronize) packet. This packet contains a random sequence number (ISN — Initial Sequence Number) which will be used to track and order data throughout the connection.",
    color: "#B0C4DE",
    technical: "Flags: SYN=1, ACK=0 | Seq=1000 (random ISN) | Window Size=65535",
    detail: "The SYN flag tells the server that the client wants to establish a new connection. The random ISN prevents old duplicate packets from interfering with new connections — a security and reliability measure.",
    analogy: "Like raising your hand in class and saying \"I want to talk to you\" — you're expressing intent to communicate.",
  },
  {
    id: "syn-ack",
    label: "SYN-ACK",
    direction: "left",
    description:
      "The server responds with a SYN-ACK packet — simultaneously acknowledging the client's SYN and sending its own SYN with a random sequence number. The ACK number is the client's ISN + 1, confirming receipt.",
    color: "#9CA3AF",
    technical: "Flags: SYN=1, ACK=1 | Seq=5000 (server's ISN) | Ack=1001 (client's ISN + 1)",
    detail: "The server sends both SYN and ACK flags combined in a single packet for efficiency. The acknowledgment number (1001) tells the client: \"I received your sequence 1000 and expect 1001 next.\"",
    analogy: "The teacher says \"I see your hand, and I'm ready to listen\" — acknowledging you AND signaling readiness.",
  },
  {
    id: "ack",
    label: "ACK",
    direction: "right",
    description:
      "The client sends a final ACK packet, acknowledging the server's SYN. At this point, both sides have agreed on initial sequence numbers and the TCP connection is fully established. Data transfer can now begin.",
    color: "#B0C4DE",
    technical: "Flags: SYN=0, ACK=1 | Seq=1001 | Ack=5001 (server's ISN + 1)",
    detail: "After this packet, the connection enters the ESTABLISHED state on both sides. This packet can actually carry data payload already (TCP Fast Open can skip this step for repeat connections).",
    analogy: "You nod and start talking — both parties have confirmed they can hear each other. The conversation begins.",
  },
];

export default function TCPHandshakeDiagram() {
  const [activeStep, setActiveStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const arrowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const playAnimation = useCallback(() => {
    setActiveStep(-1);
    setIsComplete(false);
    setIsPlaying(true);
    setCompletedSteps([]);

    // Kill any existing timeline
    if (timelineRef.current) timelineRef.current.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        setIsPlaying(false);
      },
    });
    timelineRef.current = tl;

    HANDSHAKE_STEPS.forEach((step, index) => {
      tl.call(
        () => {
          setActiveStep(index);
          setCompletedSteps((prev) => [...prev, index]);
        },
        [],
        index === 0 ? 0.5 : `+=2.5`
      );

      // Animate the arrow
      const arrowEl = arrowRefs.current[index];
      if (arrowEl) {
        tl.fromTo(
          arrowEl,
          {
            scaleX: 0,
            opacity: 0,
            transformOrigin:
              step.direction === "right" ? "left center" : "right center",
          },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "<"
        );
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, []);

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex items-center gap-4 mb-10">
        <button
          onClick={playAnimation}
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
          {isComplete ? "Replay Handshake" : "Watch Handshake"}
        </button>
        {activeStep >= 0 && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted"
          >
            Step {activeStep + 1} of {HANDSHAKE_STEPS.length}
          </motion.span>
        )}
      </div>

      {/* Diagram Container */}
      <div className="border border-divider p-6 md:p-10" style={{ borderRadius: "2px" }}>
        {/* Client/Server Headers */}
        <div className="flex justify-between mb-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto border border-divider flex items-center justify-center bg-surface" style={{ borderRadius: "2px" }}>
              <svg className="w-7 h-7 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="1" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <p className="mt-3 text-xs font-medium text-platinum uppercase tracking-[0.15em]">
              Client
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto border border-divider flex items-center justify-center bg-surface" style={{ borderRadius: "2px" }}>
              <svg className="w-7 h-7 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="1" />
                <rect x="2" y="14" width="20" height="8" rx="1" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
            </div>
            <p className="mt-3 text-xs font-medium text-platinum uppercase tracking-[0.15em]">
              Server
            </p>
          </div>
        </div>

        {/* Vertical timeline lines */}
        <div className="relative">
          {/* Left vertical line (client) */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-divider" />
          {/* Right vertical line (server) */}
          <div className="absolute right-8 top-0 bottom-0 w-px bg-divider" />

          {/* Steps */}
          <div className="space-y-8 py-4">
            {HANDSHAKE_STEPS.map((step, index) => {
              const isVisible = completedSteps.includes(index);

              return (
                <div key={step.id} className="relative" style={{ minHeight: "60px" }}>
                  {/* Arrow */}
                  <div
                    className="absolute top-4 flex items-center"
                    style={{
                      left: "2rem",
                      right: "2rem",
                    }}
                  >
                    <div
                      ref={(el) => { arrowRefs.current[index] = el; }}
                      className="w-full flex items-center"
                      style={{
                        opacity: isVisible ? 1 : 0.15,
                        flexDirection: step.direction === "right" ? "row" : "row-reverse",
                      }}
                    >
                      {/* Line */}
                      <div
                        className="flex-1 h-px"
                        style={{ backgroundColor: step.color }}
                      />
                      {/* Arrow Head */}
                      <div
                        style={{
                          width: 0,
                          height: 0,
                          borderTop: "5px solid transparent",
                          borderBottom: "5px solid transparent",
                          ...(step.direction === "right"
                            ? { borderLeft: `8px solid ${step.color}` }
                            : { borderRight: `8px solid ${step.color}` }),
                        }}
                      />
                    </div>

                    {/* Label on arrow */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full -mt-1 px-3 py-1"
                      style={{
                        backgroundColor: "#1A1C1E",
                        border: `1px solid ${isVisible ? step.color : "transparent"}`,
                        borderRadius: "2px",
                      }}
                      animate={{
                        opacity: isVisible ? 1 : 0.3,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span
                        className="text-xs font-mono font-bold"
                        style={{ color: step.color }}
                      >
                        {step.label}
                      </span>
                    </motion.div>
                  </div>

                  {/* Step Detail — always visible once completed */}
                  <AnimatePresence>
                    {isVisible && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                        className="mt-12 mx-8 md:mx-12 p-5 border border-divider bg-surface/30"
                        style={{ borderRadius: "2px" }}
                      >
                        <p className="text-sm text-secondary leading-relaxed mb-3" style={{ lineHeight: "1.8" }}>
                          {step.description}
                        </p>

                        {/* Technical details */}
                        <div className="p-3 bg-[#15171a] border border-divider mb-3" style={{ borderRadius: "2px" }}>
                          <p className="text-[10px] uppercase tracking-[0.15em] text-muted mb-1">Packet Details</p>
                          <code className="text-[11px] font-mono text-accent/80">
                            {step.technical}
                          </code>
                        </div>

                        {/* Deeper explanation */}
                        <p className="text-xs text-secondary leading-relaxed mb-3" style={{ lineHeight: "1.7" }}>
                          {step.detail}
                        </p>

                        {/* Analogy */}
                        <div className="flex items-start gap-2 p-3 bg-accent/5 border border-accent/10" style={{ borderRadius: "2px" }}>
                          <span className="text-xs">💡</span>
                          <p className="text-xs text-accent/80 italic leading-relaxed">
                            {step.analogy}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Connection Established Banner */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-6 p-5 border border-accent/20 bg-accent/5 text-center"
              style={{ borderRadius: "2px" }}
            >
              <p className="text-sm font-medium text-accent">
                🔗 TCP Connection Established
              </p>
              <p className="text-xs text-secondary mt-2 leading-relaxed" style={{ lineHeight: "1.7" }}>
                Full-duplex communication channel is now open. Data can flow in
                both directions simultaneously. For HTTPS, a <strong className="text-platinum">TLS handshake</strong> follows
                (adding 1-2 more round trips for encryption key exchange).
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* TCP vs UDP comparison */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 border border-divider" style={{ borderRadius: "2px" }}>
          <h4 className="text-sm font-medium text-platinum mb-2">TCP — Reliable</h4>
          <ul className="space-y-1.5 text-xs text-secondary" style={{ lineHeight: "1.7" }}>
            <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Connection-oriented (handshake required)</li>
            <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Guaranteed delivery & ordering</li>
            <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Flow control & congestion control</li>
            <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Used by: HTTP, HTTPS, FTP, SMTP, SSH</li>
          </ul>
        </div>
        <div className="p-5 border border-divider" style={{ borderRadius: "2px" }}>
          <h4 className="text-sm font-medium text-platinum mb-2">UDP — Fast</h4>
          <ul className="space-y-1.5 text-xs text-secondary" style={{ lineHeight: "1.7" }}>
            <li className="flex items-start gap-2"><span className="text-muted mt-0.5">•</span> Connectionless (no handshake)</li>
            <li className="flex items-start gap-2"><span className="text-muted mt-0.5">•</span> No delivery guarantee — fire and forget</li>
            <li className="flex items-start gap-2"><span className="text-muted mt-0.5">•</span> Lower latency, less overhead</li>
            <li className="flex items-start gap-2"><span className="text-muted mt-0.5">•</span> Used by: DNS, video streaming, gaming, VoIP</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
