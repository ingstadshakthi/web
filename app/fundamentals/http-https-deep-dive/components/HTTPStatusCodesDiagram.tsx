"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const STATUS_CATEGORIES = [
  { id: "1xx", range: "100-199", title: "Informational", desc: "Hold on, processing.", color: "text-blue-400" },
  { id: "2xx", range: "200-299", title: "Success", desc: "Here you go!", color: "text-emerald-400" },
  { id: "3xx", range: "300-399", title: "Redirection", desc: "Go look over there.", color: "text-purple-400" },
  { id: "4xx", range: "400-499", title: "Client Error", desc: "You messed up.", color: "text-amber-500" },
  { id: "5xx", range: "500-599", title: "Server Error", desc: "I messed up.", color: "text-rose-500" },
];

const CODES = {
  "1xx": [
    { code: 100, message: "Continue", detail: "The server has received the request headers and the client should proceed to send the request body." },
    { code: 101, message: "Switching Protocols", detail: "The requester has asked the server to switch protocols (e.g., from HTTP to WebSocket)." }
  ],
  "2xx": [
    { code: 200, message: "OK", detail: "Standard response for successful HTTP requests. The requested resource is in the payload." },
    { code: 201, message: "Created", detail: "The request has been fulfilled, resulting in the creation of a new resource (often used after a POST)." },
    { code: 204, message: "No Content", detail: "The server successfully processed the request, but isn't returning any content. (Good for DELETEs)" }
  ],
  "3xx": [
    { code: 301, message: "Moved Permanently", detail: "This and all future requests should be directed to the given URI." },
    { code: 302, message: "Found", detail: "The requested resource resides temporarily under a different URI. Used for temporary redirects." },
    { code: 304, message: "Not Modified", detail: "Indicates that the resource has not been modified since the version specified by the request headers. (Cache validation)" }
  ],
  "4xx": [
    { code: 400, message: "Bad Request", detail: "The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax)." },
    { code: 401, message: "Unauthorized", detail: "Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or hasn't been provided." },
    { code: 403, message: "Forbidden", detail: "The client does not have access rights to the content. Tie server understands the request but refuses to authorize it." },
    { code: 404, message: "Not Found", detail: "The requested resource could not be found but may be available in the future." },
    { code: 429, message: "Too Many Requests", detail: "The user has sent too many requests in a given amount of time (Rate Limiting)." }
  ],
  "5xx": [
    { code: 500, message: "Internal Server Error", detail: "A generic error message, given when an unexpected condition was encountered and no more specific message is suitable." },
    { code: 502, message: "Bad Gateway", detail: "The server was acting as a gateway or proxy and received an invalid response from the upstream server." },
    { code: 503, message: "Service Unavailable", detail: "The server is currently unable to handle the request due to a temporary overload or maintenance of the server." }
  ]
};

export default function HTTPStatusCodesDiagram() {
  const [activeCategory, setActiveCategory] = useState("2xx");

  return (
    <div className="bg-[#1A1C1E] border border-divider rounded-[2px] p-6 lg:p-10">
      
      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
        {STATUS_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "flex flex-col items-start p-4 border transition-all duration-300 rounded-[2px] text-left relative overflow-hidden group",
              activeCategory === cat.id
                ? "border-divider-hover bg-[#282A2D]"
                : "border-divider/50 bg-black/20 hover:border-divider hover:bg-surface/30"
            )}
          >
            <span className={cn("text-xl font-bold font-mono tracking-tight", cat.color, 
                activeCategory !== cat.id && "opacity-70 group-hover:opacity-100"
            )}>
              {cat.id}
            </span>
            <span className={cn("text-xs font-medium mt-2",
               activeCategory === cat.id ? "text-platinum" : "text-secondary"
            )}>
              {cat.title}
            </span>
            <span className="text-[10px] text-muted italic mt-1 line-clamp-1">
              &quot;{cat.desc}&quot;
            </span>

            {activeCategory === cat.id && (
              <motion.div
                layoutId="status-cat-indicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-current opacity-50"
                style={{ color: "currentColor" }} // Adapts faintly to the category color natively below
              />
            )}
            {/* Native color strip logic */}
            {activeCategory === cat.id && cat.id === "1xx" && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500" />}
            {activeCategory === cat.id && cat.id === "2xx" && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500" />}
            {activeCategory === cat.id && cat.id === "3xx" && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-500" />}
            {activeCategory === cat.id && cat.id === "4xx" && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500" />}
            {activeCategory === cat.id && cat.id === "5xx" && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-500" />}
          </button>
        ))}
      </div>

      {/* Code Details */}
      <div className="bg-[#15171a] border border-[#282a2d] rounded-[2px] p-6 lg:p-8 min-h-[350px]">
        <div className="flex items-center gap-4 mb-6 border-b border-[#282a2d] pb-4">
            <h3 className="text-lg font-heading text-platinum">Common {activeCategory.replace('xx', '00s')} Status Codes</h3>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], staggerChildren: 0.1 }}
            className="space-y-4"
          >
            {CODES[activeCategory as keyof typeof CODES].map((codeItem, index) => (
              <motion.div 
                key={codeItem.code}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col md:flex-row md:items-start gap-4 p-4 border border-divider/40 rounded-[2px] bg-black/20 hover:border-divider-hover transition-colors"
              >
                  <div className={cn(
                      "font-mono text-2xl font-bold min-w-[70px] shrink-0",
                      STATUS_CATEGORIES.find(c => c.id === activeCategory)?.color
                  )}>
                      {codeItem.code}
                  </div>
                  <div>
                      <h4 className="text-sm font-bold text-platinum mb-1">{codeItem.message}</h4>
                      <p className="text-xs text-secondary leading-relaxed max-w-2xl">{codeItem.detail}</p>
                  </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
