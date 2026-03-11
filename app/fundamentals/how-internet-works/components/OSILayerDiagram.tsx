"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface OSILayer {
  number: number;
  name: string;
  protocols: string[];
  analogy: string;
  description: string;
  dataUnit: string;
  color: string;
  deepExplanation: string;
  example: string;
  packetView: string;
  keyDevices: string;
  practicalNote: string;
}

const LAYERS: OSILayer[] = [
  {
    number: 7,
    name: "Application",
    protocols: ["HTTP", "HTTPS", "FTP", "SMTP", "DNS", "WebSocket", "gRPC"],
    analogy: "The language you speak when writing a letter — English, Hindi, etc.",
    description:
      "The layer closest to the end user. It provides network services directly to applications — web browsers, email clients, and file transfer tools interact at this layer. This is where you write your code.",
    dataUnit: "Data",
    color: "rgba(176, 196, 222, 0.15)",
    deepExplanation:
      "When you open a browser and visit https://www.example.com, the browser constructs an HTTP GET request. This request includes the URL path, headers (Host, User-Agent, Accept-Language, cookies), and possibly a body (for POST requests). The Application layer doesn't care HOW the data gets to the server — it just defines WHAT to say. Think of it as the conversation itself, not the delivery mechanism.",
    example: `GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html
Cookie: session=abc123`,
    packetView: "[ Application Data: HTTP GET request with headers and path ]",
    keyDevices: "Web servers (Nginx, Apache), Application firewalls (WAF), Load balancers (L7), Reverse proxies",
    practicalNote: "As a developer, this is the layer you interact with most. REST APIs, GraphQL, WebSockets — all operate here.",
  },
  {
    number: 6,
    name: "Presentation",
    protocols: ["SSL/TLS", "JPEG", "GIF", "ASCII", "UTF-8", "MIME", "gzip"],
    analogy: "Translating your letter, putting it in an envelope, and encrypting it.",
    description:
      "Handles data encoding, encryption, and compression. Ensures that data from the application layer is in a format the receiving system can understand. SSL/TLS encryption happens here.",
    dataUnit: "Data",
    color: "rgba(176, 196, 222, 0.12)",
    deepExplanation:
      "The Presentation layer transforms data into formats both systems agree on. If you're sending text, it needs to agree on character encoding (UTF-8 vs ASCII). For images, it handles JPEG/PNG encoding. Most critically, TLS encryption happens here — your HTTP request becomes encrypted ciphertext that only the intended server can decrypt. Compression (gzip, Brotli) also occurs here, reducing payload size before transmission.",
    example: `Before: GET /index.html HTTP/1.1 (plain text)
After TLS: 17 03 03 00 1C 6A 8B 2C F4... (encrypted bytes)
After gzip: compressed from 1.2KB → 400B`,
    packetView: "[ Encrypted + Compressed Application Data ]",
    keyDevices: "SSL/TLS accelerators, Encoding libraries, Compression engines",
    practicalNote: "This is why HTTPS URLs show a lock icon — TLS at layer 6 encrypts everything from layer 7 before sending it down the stack.",
  },
  {
    number: 5,
    name: "Session",
    protocols: ["NetBIOS", "RPC", "SOCKS", "PPTP", "SIP"],
    analogy: "Keeping the phone line open for the duration of the call.",
    description:
      "Manages sessions between applications — establishing, maintaining, and terminating connections. It handles authentication, authorization, and session restoration after disconnection.",
    dataUnit: "Data",
    color: "rgba(176, 196, 222, 0.10)",
    deepExplanation:
      "The Session layer manages dialogues between devices. It determines whether the communication is half-duplex (one direction at a time, like a walkie-talkie) or full-duplex (both directions simultaneously, like a phone call). It uses checkpoints to synchronize data exchange — if a large file transfer fails midway, the session layer can resume from the last checkpoint instead of restarting. In modern HTTP, concepts like cookies and session tokens approximate session management.",
    example: `Session established: ID=0x4F2A
Mode: Full-duplex
Checkpoint 1: 0-500KB transferred ✓
Checkpoint 2: 501KB-1MB transferred ✓
Session tear-down after idle timeout`,
    packetView: "[ Session ID + Sync Checkpoints + Encrypted Data ]",
    keyDevices: "Session managers, Authentication servers, VPN concentrators",
    practicalNote: "In modern web apps, session management is often handled at the application layer through JWT tokens and session cookies — the OSI session layer concept is still present but abstracted.",
  },
  {
    number: 4,
    name: "Transport",
    protocols: ["TCP", "UDP", "QUIC", "SCTP"],
    analogy: "Choosing between registered mail (TCP) or postcards (UDP).",
    description:
      "Provides reliable (TCP) or unreliable (UDP) data transfer between hosts. Handles segmentation, flow control, and error recovery. Port numbers live here — they identify which application on a machine should receive the data.",
    dataUnit: "Segment",
    color: "rgba(176, 196, 222, 0.08)",
    deepExplanation:
      "The Transport layer is where the data gets chopped into manageable pieces called segments. TCP adds a header with source port, destination port, sequence number, acknowledgment number, and flags (SYN, ACK, FIN). This is the layer that provides reliability: if segment #47 out of 100 gets lost, TCP detects it (via missing ACK) and retransmits only that segment. Flow control (window sizing) prevents a fast sender from overwhelming a slow receiver. Congestion control (algorithms like Cubic) prevents overwhelming the network itself.",
    example: `TCP Segment:
┌─────────────────────────────────────┐
│ Src Port: 52431  │ Dst Port: 443   │
│ Seq Number: 1001                    │
│ Ack Number: 5001                    │
│ Flags: ACK, PSH  │ Window: 65535   │
│ Checksum: 0xA3F1                    │
├─────────────────────────────────────┤
│ [Encrypted Application Data]        │
└─────────────────────────────────────┘`,
    packetView: "[ TCP Header (Src Port + Dst Port + Seq + Ack + Flags) | Session + Encrypted Data ]",
    keyDevices: "Firewalls (stateful), Load balancers (L4), Port scanners (nmap)",
    practicalNote: "Port 80 = HTTP, Port 443 = HTTPS, Port 22 = SSH, Port 53 = DNS. When debugging, 'connection refused' means the transport layer couldn't establish a connection to the target port.",
  },
  {
    number: 3,
    name: "Network",
    protocols: ["IPv4", "IPv6", "ICMP", "ARP", "OSPF", "BGP"],
    analogy: "The postal address system — routing letters between cities.",
    description:
      "Handles logical addressing (IP addresses) and routing. Determines the best path for data to travel across networks. Routers operate at this layer, making forwarding decisions based on destination IP.",
    dataUnit: "Packet",
    color: "rgba(176, 196, 222, 0.06)",
    deepExplanation:
      "The Network layer wraps the TCP segment inside an IP packet by adding a header with source IP address, destination IP address, TTL (Time To Live), and protocol identifier. This is the layer that enables inter-network communication — your data can now travel from your home network in India to a server in California because routers at every hop examine the destination IP and forward the packet accordingly. The TTL field prevents packets from looping forever — it decreases by 1 at each router, and the packet is dropped when it hits 0.",
    example: `IP Packet:
┌─────────────────────────────────────┐
│ Version: IPv4    │ Header Len: 20B │
│ TTL: 64          │ Protocol: TCP   │
│ Src IP:  192.168.1.100              │
│ Dst IP:  93.184.216.34              │
│ Checksum: 0xB2E4                    │
├─────────────────────────────────────┤
│ [TCP Segment]                       │
│   [Src:52431 → Dst:443]            │
│   [Encrypted Application Data]     │
└─────────────────────────────────────┘`,
    packetView: "[ IP Header (Src IP + Dst IP + TTL + Protocol) | TCP Segment | Encrypted Data ]",
    keyDevices: "Routers, L3 switches, IP firewalls, traceroute, ping",
    practicalNote: "The 'traceroute' command works at this layer — it sends packets with increasing TTL values to discover each router hop between you and the destination.",
  },
  {
    number: 2,
    name: "Data Link",
    protocols: ["Ethernet (802.3)", "Wi-Fi (802.11)", "PPP", "MAC", "ARP", "VLAN"],
    analogy: "The local mail carrier who delivers within your neighborhood.",
    description:
      "Provides node-to-node transfer on the same network segment (LAN). Handles MAC addressing, error detection (CRC), and frame synchronization. Switches operate here.",
    dataUnit: "Frame",
    color: "rgba(176, 196, 222, 0.04)",
    deepExplanation:
      "The Data Link layer wraps the IP packet inside an Ethernet frame. It adds source and destination MAC addresses (physical hardware addresses of network cards). Unlike IP addresses which are logical and can route globally, MAC addresses only matter on the local network. When your packet needs to reach a router to leave your network, the destination MAC is set to the router's MAC (not the final server's MAC). At each hop, the frame is stripped and re-wrapped with new MAC addresses. The frame also includes an FCS (Frame Check Sequence) — a CRC checksum to detect bit errors from transmission.",
    example: `Ethernet Frame:
┌─────────────────────────────────────┐
│ Dst MAC: AA:BB:CC:DD:EE:FF (router) │
│ Src MAC: 11:22:33:44:55:66 (you)    │
│ EtherType: 0x0800 (IPv4)            │
├─────────────────────────────────────┤
│ [IP Packet]                          │
│   [Src IP:192.168.1.100]            │
│   [Dst IP:93.184.216.34]            │
│   [TCP → Encrypted Data]            │
├─────────────────────────────────────┤
│ FCS: 0x3B4A2C1D (error check)       │
└─────────────────────────────────────┘`,
    packetView: "[ Ethernet Header (Src MAC + Dst MAC + Type) | IP Packet | TCP Segment | Data | FCS ]",
    keyDevices: "Network switches, NICs (Network Interface Cards), Bridges, Access Points",
    practicalNote: "MAC addresses are why your computer can be uniquely identified on a local network. 'arp -a' shows the MAC-to-IP mapping table on your machine.",
  },
  {
    number: 1,
    name: "Physical",
    protocols: ["Ethernet Cable (Cat5/6)", "Fiber Optic", "Wi-Fi Radio (2.4/5GHz)", "USB", "Bluetooth"],
    analogy: "The roads, trucks, and infrastructure that physically carry the mail.",
    description:
      "The physical transmission of raw bits (0s and 1s) over a communication channel — electrical signals over copper, light pulses over fiber, or radio waves through air. Cables, switches, and NICs operate at this layer.",
    dataUnit: "Bit",
    color: "rgba(176, 196, 222, 0.02)",
    deepExplanation:
      "The Physical layer converts the Ethernet frame into raw bits and transmits them as physical signals. Over copper Ethernet cables, 1s and 0s are represented as voltage changes. Over fiber optic, they're pulses of light. Over Wi-Fi, they're radio frequency modulations. The speed of signal propagation depends on the medium: light in fiber travels at ~200,000 km/s (2/3 speed of light), electrical signals in copper at ~200,000 km/s, and radio at ~300,000 km/s. This is also where concepts like bandwidth (maximum data rate), latency (signal propagation delay), and interference come into play.",
    example: `Physical Transmission:
Ethernet (Cat6): 1000 Mbps, ~100m max
Fiber Optic:     100 Gbps, ~80km max
Wi-Fi (802.11ax): 9.6 Gbps theoretical

Signal: 01001000 01010100 01010100 01010000...
  (binary representation of "HTTP" in ASCII)
  Over copper: +5V -5V +5V -5V +5V -5V...`,
    packetView: "[ Electrical/Light/Radio signals encoding the entire frame as binary bits ]",
    keyDevices: "Cables (Cat5e/Cat6/Fiber), Network hubs, Repeaters, Modems, Wi-Fi antennas",
    practicalNote: "When your internet is slow, the problem might be here — a damaged cable, Wi-Fi interference from microwaves, or distance from the router. 'ethtool eth0' (Linux) shows physical link status.",
  },
];

export default function OSILayerDiagram() {
  const [expandedLayer, setExpandedLayer] = useState<number | null>(null);

  return (
    <div className="w-full">
      {/* Introduction: The Running Example */}
      <div className="mb-8 p-5 border border-accent/20 bg-accent/5" style={{ borderRadius: "2px" }}>
        <p className="text-[10px] uppercase tracking-[0.15em] text-accent mb-2">Running Example</p>
        <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
          To understand each layer, we&apos;ll follow a single example through the entire stack:
          <strong className="text-platinum"> your browser sending an HTTPS request to https://www.example.com</strong>.
          At each layer, watch how the data gets wrapped with new headers — this process is called <strong className="text-accent">encapsulation</strong>.
          When the data reaches the server, each layer strips off its header in reverse — this is <strong className="text-accent">de-encapsulation</strong>.
        </p>
      </div>

      {/* OSI Stack */}
      <div className="space-y-1">
        {LAYERS.map((layer) => {
          const isExpanded = expandedLayer === layer.number;

          return (
            <motion.div
              key={layer.number}
              layout
              className="border border-divider cursor-pointer group overflow-hidden"
              style={{
                borderRadius: "2px",
                background: isExpanded ? "var(--bg-surface)" : "transparent",
              }}
              onClick={() =>
                setExpandedLayer(isExpanded ? null : layer.number)
              }
              whileHover={{
                borderColor: "rgba(255, 255, 255, 0.22)",
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Header Row */}
              <div className="flex items-center gap-4 px-5 py-4">
                {/* Layer Number */}
                <div
                  className="w-8 h-8 flex items-center justify-center text-xs font-mono font-bold shrink-0"
                  style={{
                    backgroundColor: layer.color,
                    color: "var(--accent)",
                    border: "1px solid var(--divider)",
                    borderRadius: "2px",
                  }}
                >
                  L{layer.number}
                </div>

                {/* Layer Name */}
                <div className="flex-1 min-w-0">
                  <h4
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isExpanded ? "text-accent" : "text-platinum"
                    }`}
                  >
                    {layer.name}
                  </h4>
                  <p className="text-xs text-muted mt-0.5 truncate">
                    {layer.protocols.join(" · ")}
                  </p>
                </div>

                {/* Data Unit Badge */}
                <span
                  className="hidden sm:inline-flex text-[10px] font-mono uppercase tracking-wider text-muted px-2 py-1 border border-divider"
                  style={{ borderRadius: "2px" }}
                >
                  {layer.dataUnit}
                </span>

                {/* Expand indicator */}
                <motion.svg
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-4 h-4 text-muted shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
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
                    <div
                      className="px-5 pb-6 pt-3 space-y-5 border-t border-divider"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Description */}
                      <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
                        {layer.description}
                      </p>

                      {/* Deep explanation */}
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-muted mb-2">
                          How It Works
                        </p>
                        <p className="text-sm text-secondary leading-relaxed" style={{ lineHeight: "1.8" }}>
                          {layer.deepExplanation}
                        </p>
                      </div>

                      {/* Example: What the data looks like at this layer */}
                      <div className="bg-[#15171a] border border-divider p-4 overflow-x-auto" style={{ borderRadius: "2px" }}>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-muted mb-3">
                          Example — What data looks like at Layer {layer.number}
                        </p>
                        <pre className="text-xs font-mono text-accent/80 leading-relaxed whitespace-pre">
                          {layer.example}
                        </pre>
                      </div>

                      {/* Packet View — how encapsulation builds up */}
                      <div className="p-4 border border-accent/15 bg-accent/5" style={{ borderRadius: "2px" }}>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-accent/60 mb-2">
                          Encapsulation at Layer {layer.number} — {layer.dataUnit}
                        </p>
                        <code className="text-[11px] font-mono text-accent/90 leading-relaxed block whitespace-pre-wrap">
                          {layer.packetView}
                        </code>
                      </div>

                      {/* Analogy */}
                      <div
                        className="p-4 bg-accent/5 border border-accent/10"
                        style={{ borderRadius: "2px" }}
                      >
                        <p className="text-[10px] uppercase tracking-[0.15em] text-muted mb-1.5">
                          Real-world Analogy
                        </p>
                        <p className="text-sm text-accent italic">
                          &ldquo;{layer.analogy}&rdquo;
                        </p>
                      </div>

                      {/* Key Devices & Practical Note */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.15em] text-muted mb-2">
                            Key Devices & Technologies
                          </p>
                          <p className="text-xs text-secondary leading-relaxed" style={{ lineHeight: "1.7" }}>
                            {layer.keyDevices}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.15em] text-muted mb-2">
                            Practical Note for Developers
                          </p>
                          <p className="text-xs text-secondary leading-relaxed" style={{ lineHeight: "1.7" }}>
                            {layer.practicalNote}
                          </p>
                        </div>
                      </div>

                      {/* Protocols */}
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-muted mb-2">
                          Key Protocols & Technologies
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {layer.protocols.map((proto) => (
                            <span
                              key={proto}
                              className="text-[11px] font-mono text-platinum border border-divider px-2.5 py-1"
                              style={{ borderRadius: "2px" }}
                            >
                              {proto}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Full Packet Visualization at the bottom */}
      <div className="mt-8 p-5 border border-divider bg-[#15171a]" style={{ borderRadius: "2px" }}>
        <p className="text-[10px] uppercase tracking-[0.15em] text-accent mb-3">
          Complete Encapsulation — What The Final Frame Looks Like
        </p>
        <div className="overflow-x-auto">
          <pre className="text-xs font-mono text-secondary leading-relaxed whitespace-pre">{`┌───────────────────────────────────────────────────────────────────┐
│ Ethernet Header   │ IP Header    │ TCP Header   │ TLS │ HTTP  │ FCS  │
│ (L2: MAC addrs)   │ (L3: IPs)   │ (L4: Ports) │ (L6)│ (L7)  │(L2)  │
│                   │              │              │     │       │      │
│ Dst: AA:BB:CC...  │ Src: 192... │ Src: 52431  │ Enc │ GET / │ CRC  │
│ Src: 11:22:33...  │ Dst: 93...  │ Dst: 443    │     │ ...   │      │
└───────────────────────────────────────────────────────────────────┘
 ◄── Layer 2 ──► ◄── Layer 3 ──► ◄── Layer 4 ──► ◄ L6 ► ◄ L7 ► ◄L2►`}</pre>
        </div>
        <p className="text-xs text-muted mt-3 leading-relaxed" style={{ lineHeight: "1.7" }}>
          Each layer adds its own header (encapsulation). The receiving end strips them in reverse order (de-encapsulation).
          Layer 1 (Physical) transmits the entire frame as raw bits over the wire. Layer 5 (Session) manages the overall session state.
        </p>
      </div>
    </div>
  );
}
