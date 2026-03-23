"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils"; // Assuming cn is available

interface MessagePart {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
}

const REQUEST_PARTS: MessagePart[] = [
  {
    id: "request-line",
    title: "1. Request Line",
    description: "Defines what the client wants to do.",
    content: (
      <div className="space-y-2 font-mono text-sm">
        <div className="flex flex-wrap gap-2 items-center text-platinum p-3 bg-surface/50 border border-divider/50 rounded-sm">
          <span className="text-accent font-bold">GET</span>
          <span className="text-muted-foreground mr-2">/api/v1/users?status=active</span>
          <span className="text-[#8892b0]">HTTP/1.1</span>
        </div>
        <div className="text-xs text-secondary pl-2 grid grid-cols-[1fr_2fr_1fr] gap-4">
          <div><span className="text-accent">Method:</span> The action (GET, POST, PUT, DELETE, etc.)</div>
          <div><span className="text-platinum">Target (Path + Query):</span> The resource being requested.</div>
          <div><span className="text-[#8892b0]">Version:</span> The HTTP protocol version.</div>
        </div>
      </div>
    ),
  },
  {
    id: "request-headers",
    title: "2. Headers",
    description: "Key-value pairs containing metadata about the request or client.",
    content: (
      <div className="space-y-1 font-mono text-sm bg-surface/50 p-3 border border-divider/50 rounded-sm">
        <div className="flex gap-4"><span className="text-accent min-w-[120px]">Host:</span><span className="text-platinum truncate">api.example.com</span></div>
        <div className="flex gap-4"><span className="text-accent min-w-[120px]">User-Agent:</span><span className="text-platinum truncate">Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...</span></div>
        <div className="flex gap-4"><span className="text-accent min-w-[120px]">Accept:</span><span className="text-platinum truncate">application/json</span></div>
        <div className="flex gap-4"><span className="text-accent min-w-[120px]">Authorization:</span><span className="text-platinum truncate">Bearer eyJhbGciOiJIUzI1NiIs...</span></div>
      </div>
    ),
  },
  {
    id: "request-empty-line",
    title: "3. Empty Line",
    description: "A crucial blank line (CRLF) that signals the end of the headers.",
    content: (
      <div className="bg-surface/20 border border-dashed border-divider p-2 text-center text-xs font-mono text-muted rounded-sm">
        \r\n (Carriage Return + Line Feed)
      </div>
    ),
  },
  {
    id: "request-body",
    title: "4. Body (Optional)",
    description: "The data payload. Usually empty for GET requests, but crucial for POST/PUT.",
    content: (
      <div className="font-mono text-sm bg-surface/50 p-3 border border-divider/50 text-muted rounded-sm">
        {`{
  // Empty for GET requests
  // For POST: {"name": "Alice", "role": "admin"}
}`}
      </div>
    ),
  },
];

const RESPONSE_PARTS: MessagePart[] = [
  {
    id: "status-line",
    title: "1. Status Line",
    description: "The server's result of processing the request.",
    content: (
      <div className="space-y-2 font-mono text-sm">
        <div className="flex items-center gap-3 text-platinum p-3 bg-surface/50 border border-divider/50 rounded-sm">
          <span className="text-[#8892b0]">HTTP/1.1</span>
          <span className="text-emerald-400 font-bold">200</span>
          <span className="text-emerald-400/80">OK</span>
        </div>
      </div>
    ),
  },
  {
    id: "response-headers",
    title: "2. Headers",
    description: "Metadata about the response and the server.",
    content: (
      <div className="space-y-1 font-mono text-sm bg-surface/50 p-3 border border-divider/50 rounded-sm">
        <div className="flex gap-4"><span className="text-accent min-w-[140px]">Date:</span><span className="text-platinum">Wed, 21 Oct 2026 07:28:00 GMT</span></div>
        <div className="flex gap-4"><span className="text-accent min-w-[140px]">Content-Type:</span><span className="text-platinum">application/json; charset=utf-8</span></div>
        <div className="flex gap-4"><span className="text-accent min-w-[140px]">Content-Length:</span><span className="text-platinum">142</span></div>
        <div className="flex gap-4"><span className="text-accent min-w-[140px]">Cache-Control:</span><span className="text-platinum">max-age=3600</span></div>
      </div>
    ),
  },
  {
    id: "response-empty-line",
    title: "3. Empty Line",
    description: "Separates headers from the body.",
    content: (
      <div className="bg-surface/20 border border-dashed border-divider p-2 text-center text-xs font-mono text-muted rounded-sm">
        \r\n (Carriage Return + Line Feed)
      </div>
    ),
  },
  {
    id: "response-body",
    title: "4. Body",
    description: "The actual resource requested by the client.",
    content: (
      <div className="font-mono text-sm bg-[#15171a] p-4 text-[#e2e8f0] rounded-sm overflow-x-auto">
        <pre>{`{
  "status": "success",
  "data": {
    "users": [
      { "id": 1, "username": "alice99", "status": "active" },
      { "id": 2, "username": "bob_builder", "status": "active" }
    ]
  }
}`}</pre>
      </div>
    ),
  },
];

export default function HTTPMessageStructureDiagram() {
  const [activeTab, setActiveTab] = useState<"request" | "response">("request");
  const [activePart, setActivePart] = useState<string | null>(null);

  const parts = activeTab === "request" ? REQUEST_PARTS : RESPONSE_PARTS;

  return (
    <div className="bg-[#1A1C1E] border border-divider rounded-[2px] overflow-hidden">
      {/* Tab Switcher */}
      <div className="flex border-b border-divider">
        <button
          onClick={() => {
            setActiveTab("request");
            setActivePart(null);
          }}
          className={cn(
            "flex-1 py-4 px-6 text-sm font-medium transition-colors relative",
            activeTab === "request" ? "text-platinum bg-surface/30" : "text-muted hover:text-secondary hover:bg-surface/10"
          )}
        >
          HTTP Request (Client)
          {activeTab === "request" && (
            <motion.div
              layoutId="message-tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
            />
          )}
        </button>
        <button
          onClick={() => {
            setActiveTab("response");
            setActivePart(null);
          }}
          className={cn(
            "flex-1 py-4 px-6 text-sm font-medium transition-colors relative border-l border-divider",
            activeTab === "response" ? "text-platinum bg-surface/30" : "text-muted hover:text-secondary hover:bg-surface/10"
          )}
        >
          HTTP Response (Server)
          {activeTab === "response" && (
            <motion.div
              layoutId="message-tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
            />
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-8">
        {/* Left Column: Interactive Structure Map */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium text-muted uppercase tracking-widest mb-2 border-b border-divider/50 pb-2">
            Structure Map
          </p>
          {parts.map((part) => (
            <button
              key={part.id}
              onClick={() => setActivePart(part.id)}
              className={cn(
                "text-left p-4 border transition-all duration-300 rounded-[2px] relative",
                activePart === part.id
                  ? "border-accent/50 bg-[#282A2D]"
                  : "border-divider/50 bg-[#1A1C1E] hover:border-divider-hover hover:bg-surface/30"
              )}
            >
              <h3 className={cn("font-semibold text-sm", activePart === part.id ? "text-platinum" : "text-secondary")}>
                {part.title}
              </h3>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                {part.description}
              </p>
              
              {activePart === part.id && (
                <motion.div
                  layoutId="part-indicator"
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent"
                />
              )}
            </button>
          ))}
        </div>

        {/* Right Column: Code Detail View */}
        <div className="bg-[#15171a] border border-[#282a2d] rounded-[2px] p-6 min-h-[400px] flex flex-col relative overflow-hidden">
          <p className="text-xs font-medium text-muted uppercase tracking-widest mb-6 border-b border-[#282a2d] pb-2">
            Inspecting: {activePart ? parts.find(p => p.id === activePart)?.title : "Raw Output Overview"}
          </p>
          
          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              {activePart ? (
                <motion.div
                  key={activePart}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute inset-0"
                >
                  {parts.find((p) => p.id === activePart)?.content}
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-muted font-mono h-full flex items-center justify-center opacity-50"
                >
                   &lt;-- Select a structural component to inspect its anatomy
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
