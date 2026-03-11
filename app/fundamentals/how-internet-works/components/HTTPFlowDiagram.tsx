"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const REQUEST_HEADERS = `GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
Accept: text/html,application/xhtml+xml
Accept-Language: en-US,en;q=0.9
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Cache-Control: no-cache`;

const RESPONSE_HEADERS = `HTTP/1.1 200 OK
Date: Mon, 11 Mar 2026 15:00:00 GMT
Content-Type: text/html; charset=UTF-8
Content-Length: 1256
Server: nginx/1.24.0
Cache-Control: max-age=3600
X-Frame-Options: DENY
Content-Encoding: gzip
Connection: keep-alive`;

interface HeaderLine {
  key: string;
  value: string;
  explanation: string;
}

const REQUEST_EXPLAINED: HeaderLine[] = [
  { key: "GET /index.html HTTP/1.1", value: "", explanation: "Request method (GET), resource path, and HTTP version" },
  { key: "Host", value: "www.example.com", explanation: "The domain name of the server (required in HTTP/1.1)" },
  { key: "User-Agent", value: "Mozilla/5.0...", explanation: "Identifies the browser/client making the request" },
  { key: "Accept", value: "text/html, application/xhtml+xml", explanation: "Media types the client can understand" },
  { key: "Accept-Encoding", value: "gzip, deflate, br", explanation: "Compression algorithms the client supports" },
  { key: "Connection", value: "keep-alive", explanation: "Requests the TCP connection stay open for future requests" },
  { key: "Cache-Control", value: "no-cache", explanation: "Forces validation with the server before using cached copy" },
];

const RESPONSE_EXPLAINED: HeaderLine[] = [
  { key: "HTTP/1.1 200 OK", value: "", explanation: "Protocol version, status code, and status text — 200 means success" },
  { key: "Content-Type", value: "text/html; charset=UTF-8", explanation: "The format of the response body" },
  { key: "Content-Length", value: "1256", explanation: "Size of the response body in bytes" },
  { key: "Server", value: "nginx/1.24.0", explanation: "Web server software handling the request" },
  { key: "Cache-Control", value: "max-age=3600", explanation: "Browser can cache this for 1 hour (3600 seconds)" },
  { key: "X-Frame-Options", value: "DENY", explanation: "Security header — prevents the page from being embedded in iframes" },
  { key: "Content-Encoding", value: "gzip", explanation: "Response body is compressed with gzip" },
];

interface HTTPMethod {
  method: string;
  description: string;
  safe: boolean;
  useCase: string;
  fetch: string;
  curl: string;
  axios: string;
}

const HTTP_METHODS: HTTPMethod[] = [
  {
    method: "GET",
    description: "Retrieve data from the server",
    safe: true,
    useCase: "Loading web pages, fetching API data, downloading files",
    fetch: `const response = await fetch('https://api.example.com/users');
const data = await response.json();
console.log(data);`,
    curl: `curl -X GET https://api.example.com/users \\
  -H "Accept: application/json"`,
    axios: `const { data } = await axios.get('https://api.example.com/users');
console.log(data);`,
  },
  {
    method: "POST",
    description: "Submit data to create a new resource",
    safe: false,
    useCase: "Form submissions, creating accounts, uploading files",
    fetch: `const response = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
});
const newUser = await response.json();`,
    curl: `curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"John Doe","email":"john@example.com"}'`,
    axios: `const { data } = await axios.post('https://api.example.com/users', {
  name: 'John Doe',
  email: 'john@example.com'
});`,
  },
  {
    method: "PUT",
    description: "Replace an entire resource with new data",
    safe: false,
    useCase: "Updating a user profile, replacing a document entirely",
    fetch: `const response = await fetch('https://api.example.com/users/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'admin'
  })
});`,
    curl: `curl -X PUT https://api.example.com/users/1 \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Jane Doe","email":"jane@example.com","role":"admin"}'`,
    axios: `const { data } = await axios.put('https://api.example.com/users/1', {
  name: 'Jane Doe',
  email: 'jane@example.com',
  role: 'admin'
});`,
  },
  {
    method: "PATCH",
    description: "Partially update a resource (only changed fields)",
    safe: false,
    useCase: "Changing just a user's email, toggling a setting",
    fetch: `const response = await fetch('https://api.example.com/users/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'newemail@example.com' })
});`,
    curl: `curl -X PATCH https://api.example.com/users/1 \\
  -H "Content-Type: application/json" \\
  -d '{"email":"newemail@example.com"}'`,
    axios: `const { data } = await axios.patch('https://api.example.com/users/1', {
  email: 'newemail@example.com'
});`,
  },
  {
    method: "DELETE",
    description: "Remove a resource from the server",
    safe: false,
    useCase: "Deleting an account, removing a post, clearing a cart item",
    fetch: `const response = await fetch('https://api.example.com/users/1', {
  method: 'DELETE'
});
// Status 204 = No Content (success, nothing returned)`,
    curl: `curl -X DELETE https://api.example.com/users/1 \\
  -H "Authorization: Bearer YOUR_TOKEN"`,
    axios: `await axios.delete('https://api.example.com/users/1', {
  headers: { Authorization: 'Bearer YOUR_TOKEN' }
});`,
  },
  {
    method: "HEAD",
    description: "Same as GET but returns only headers, no body",
    safe: true,
    useCase: "Checking if a resource exists, getting file size before download",
    fetch: `const response = await fetch('https://api.example.com/files/doc.pdf', {
  method: 'HEAD'
});
console.log(response.headers.get('Content-Length'));`,
    curl: `curl -I https://api.example.com/files/doc.pdf`,
    axios: `const { headers } = await axios.head('https://api.example.com/files/doc.pdf');
console.log(headers['content-length']);`,
  },
  {
    method: "OPTIONS",
    description: "Describe the communication options for a resource",
    safe: true,
    useCase: "CORS preflight requests, discovering allowed methods",
    fetch: `const response = await fetch('https://api.example.com/users', {
  method: 'OPTIONS'
});
console.log(response.headers.get('Allow'));
// "GET, POST, OPTIONS"`,
    curl: `curl -X OPTIONS https://api.example.com/users -i`,
    axios: `const { headers } = await axios.options('https://api.example.com/users');
console.log(headers['allow']);`,
  },
];

interface StatusCodeGroup {
  range: string;
  label: string;
  color: string;
  codes: { code: number; name: string; description: string }[];
}

const STATUS_CODES: StatusCodeGroup[] = [
  {
    range: "1xx",
    label: "Informational",
    color: "#6B7280",
    codes: [
      { code: 100, name: "Continue", description: "Server received the initial part of the request, client should continue sending the body" },
      { code: 101, name: "Switching Protocols", description: "Server agrees to switch protocols as requested (e.g., upgrading to WebSocket)" },
      { code: 103, name: "Early Hints", description: "Server sends preliminary headers to let the browser preload resources while the final response is being prepared" },
    ],
  },
  {
    range: "2xx",
    label: "Success",
    color: "#B0C4DE",
    codes: [
      { code: 200, name: "OK", description: "Request succeeded. The response body contains the requested data" },
      { code: 201, name: "Created", description: "Request succeeded and a new resource was created (common in POST responses)" },
      { code: 204, name: "No Content", description: "Request succeeded but there's nothing to return (common in DELETE responses)" },
      { code: 206, name: "Partial Content", description: "Only part of the resource is returned (used in range requests for large file downloads)" },
    ],
  },
  {
    range: "3xx",
    label: "Redirection",
    color: "#9CA3AF",
    codes: [
      { code: 301, name: "Moved Permanently", description: "Resource has permanently moved to a new URL. Search engines update their links" },
      { code: 302, name: "Found (Temporary Redirect)", description: "Resource temporarily available at a different URL. Original URL should be used for future requests" },
      { code: 304, name: "Not Modified", description: "Cached version is still valid. Server doesn't send the body again, saving bandwidth" },
      { code: 307, name: "Temporary Redirect", description: "Like 302 but guarantees the method and body won't change in the redirect" },
      { code: 308, name: "Permanent Redirect", description: "Like 301 but guarantees the method and body won't change in the redirect" },
    ],
  },
  {
    range: "4xx",
    label: "Client Error",
    color: "#F59E0B",
    codes: [
      { code: 400, name: "Bad Request", description: "Server cannot process the request due to malformed syntax, invalid parameters, or missing fields" },
      { code: 401, name: "Unauthorized", description: "Authentication required. The client hasn't provided valid credentials (login needed)" },
      { code: 403, name: "Forbidden", description: "Server understood the request but refuses to authorize it. Unlike 401, re-authenticating won't help" },
      { code: 404, name: "Not Found", description: "The requested resource doesn't exist on the server. The most famous HTTP error" },
      { code: 405, name: "Method Not Allowed", description: "HTTP method is not supported for this URL (e.g., DELETE on a read-only resource)" },
      { code: 409, name: "Conflict", description: "Request conflicts with the current state (e.g., trying to create a duplicate resource)" },
      { code: 429, name: "Too Many Requests", description: "Rate limit exceeded. Client is sending too many requests in a given time period" },
    ],
  },
  {
    range: "5xx",
    label: "Server Error",
    color: "#EF4444",
    codes: [
      { code: 500, name: "Internal Server Error", description: "Generic server error. Something went wrong but the server doesn't know exactly what" },
      { code: 502, name: "Bad Gateway", description: "Server acting as a gateway received an invalid response from the upstream server" },
      { code: 503, name: "Service Unavailable", description: "Server is temporarily unable to handle requests (overloaded or under maintenance)" },
      { code: 504, name: "Gateway Timeout", description: "Gateway server didn't receive a timely response from the upstream server" },
    ],
  },
];

type ActiveTab = "headers" | "methods" | "status";

export default function HTTPFlowDiagram() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("headers");
  const [headerView, setHeaderView] = useState<"request" | "response">("request");
  const [hoveredHeader, setHoveredHeader] = useState<number | null>(null);
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null);
  const [expandedStatusGroup, setExpandedStatusGroup] = useState<string | null>(null);
  const [codeTab, setCodeTab] = useState<"fetch" | "curl" | "axios">("fetch");

  const tabs: { id: ActiveTab; label: string }[] = [
    { id: "headers", label: "Headers" },
    { id: "methods", label: "Methods" },
    { id: "status", label: "Status Codes" },
  ];

  const currentHeaders = headerView === "request" ? REQUEST_EXPLAINED : RESPONSE_EXPLAINED;
  const rawHeaders = headerView === "request" ? REQUEST_HEADERS : RESPONSE_HEADERS;

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex items-center gap-1 mb-8 border border-divider inline-flex p-1" style={{ borderRadius: "2px" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative px-4 py-2 text-xs font-medium transition-colors duration-300"
            style={{ borderRadius: "2px" }}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="httpActiveTab"
                className="absolute inset-0 bg-surface border border-divider"
                style={{ borderRadius: "2px" }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className={`relative z-10 ${activeTab === tab.id ? "text-accent" : "text-muted hover:text-platinum"}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ═══ Headers Tab ═══ */}
        {activeTab === "headers" && (
          <motion.div
            key="headers"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Request/Response Toggle */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setHeaderView("request")}
                className={`text-xs font-medium px-4 py-2 border transition-all duration-300 ${
                  headerView === "request"
                    ? "border-accent/30 text-accent bg-accent/5"
                    : "border-divider text-muted hover:text-platinum"
                }`}
                style={{ borderRadius: "2px" }}
              >
                → Request
              </button>
              <button
                onClick={() => setHeaderView("response")}
                className={`text-xs font-medium px-4 py-2 border transition-all duration-300 ${
                  headerView === "response"
                    ? "border-accent/30 text-accent bg-accent/5"
                    : "border-divider text-muted hover:text-platinum"
                }`}
                style={{ borderRadius: "2px" }}
              >
                ← Response
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Raw Headers */}
              <div className="border border-divider bg-[#1a1c1e] p-5 font-mono text-xs overflow-x-auto" style={{ borderRadius: "2px" }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-muted">
                    Raw {headerView === "request" ? "Request" : "Response"}
                  </span>
                </div>
                <pre className="text-secondary leading-relaxed whitespace-pre-wrap">
                  {rawHeaders.split("\n").map((line, i) => (
                    <motion.span
                      key={`${headerView}-${i}`}
                      className="block"
                      onMouseEnter={() => setHoveredHeader(i)}
                      onMouseLeave={() => setHoveredHeader(null)}
                      animate={{
                        color: hoveredHeader === i ? "#B0C4DE" : "#9CA3AF",
                      }}
                      transition={{ duration: 0.2 }}
                      style={{ cursor: "default" }}
                    >
                      {line}
                    </motion.span>
                  ))}
                </pre>
              </div>

              {/* Explained Headers */}
              <div className="space-y-2">
                {currentHeaders.map((header, i) => (
                  <motion.div
                    key={`${headerView}-detail-${i}`}
                    className="p-3 border border-transparent hover:border-divider"
                    style={{ borderRadius: "2px" }}
                    animate={{
                      backgroundColor: hoveredHeader === i ? "rgba(176, 196, 222, 0.04)" : "transparent",
                    }}
                    onMouseEnter={() => setHoveredHeader(i)}
                    onMouseLeave={() => setHoveredHeader(null)}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-mono font-medium text-accent">
                        {header.key}
                      </span>
                      {header.value && (
                        <span className="text-xs font-mono text-muted truncate">
                          {header.value}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-secondary leading-relaxed">
                      {header.explanation}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ Methods Tab ═══ */}
        {activeTab === "methods" && (
          <motion.div
            key="methods"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="space-y-2">
              {HTTP_METHODS.map((m) => {
                const isExpanded = expandedMethod === m.method;
                return (
                  <div key={m.method}>
                    <div
                      onClick={() => setExpandedMethod(isExpanded ? null : m.method)}
                      className="flex items-center gap-4 p-4 border border-divider hover:border-divider-hover group cursor-pointer"
                      style={{
                        borderRadius: "2px",
                        transition: "border-color 300ms cubic-bezier(0.25, 0.1, 0.25, 1)",
                        borderBottomLeftRadius: isExpanded ? 0 : "2px",
                        borderBottomRightRadius: isExpanded ? 0 : "2px",
                      }}
                    >
                      <span
                        className="text-xs font-mono font-bold px-3 py-1.5 border shrink-0"
                        style={{
                          borderRadius: "2px",
                          color: m.safe ? "var(--accent)" : "#F8F9FA",
                          borderColor: m.safe ? "rgba(176, 196, 222, 0.3)" : "var(--divider)",
                          backgroundColor: m.safe ? "rgba(176, 196, 222, 0.08)" : "transparent",
                        }}
                      >
                        {m.method}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-secondary">{m.description}</span>
                        <span className="text-xs text-muted block mt-0.5">{m.useCase}</span>
                      </div>
                      <span
                        className="text-[10px] uppercase tracking-[0.15em] shrink-0"
                        style={{ color: m.safe ? "var(--accent)" : "var(--muted)" }}
                      >
                        {m.safe ? "Safe" : "Unsafe"}
                      </span>
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

                    {/* Expanded code examples */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden border border-t-0 border-divider"
                          style={{
                            borderBottomLeftRadius: "2px",
                            borderBottomRightRadius: "2px",
                          }}
                        >
                          <div className="p-5">
                            {/* Code tab selector */}
                            <div className="flex items-center gap-1 mb-4 border border-divider inline-flex p-0.5" style={{ borderRadius: "2px" }}>
                              {(["fetch", "curl", "axios"] as const).map((t) => (
                                <button
                                  key={t}
                                  onClick={() => setCodeTab(t)}
                                  className={`px-3 py-1.5 text-[11px] font-mono transition-colors duration-200 ${
                                    codeTab === t
                                      ? "text-accent bg-accent/10"
                                      : "text-muted hover:text-platinum"
                                  }`}
                                  style={{ borderRadius: "2px" }}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>

                            {/* Code block */}
                            <div className="bg-[#15171a] border border-divider p-4 overflow-x-auto" style={{ borderRadius: "2px" }}>
                              <pre className="text-xs font-mono text-secondary leading-relaxed whitespace-pre">
                                {m[codeTab]}
                              </pre>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ═══ Status Codes Tab ═══ */}
        {activeTab === "status" && (
          <motion.div
            key="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="space-y-3">
              {STATUS_CODES.map((group) => {
                const isExpanded = expandedStatusGroup === group.range;
                return (
                  <div key={group.range}>
                    <div
                      onClick={() => setExpandedStatusGroup(isExpanded ? null : group.range)}
                      className="flex items-center gap-5 p-5 border border-divider hover:border-divider-hover cursor-pointer"
                      style={{
                        borderRadius: "2px",
                        transition: "border-color 300ms cubic-bezier(0.25, 0.1, 0.25, 1)",
                        borderBottomLeftRadius: isExpanded ? 0 : "2px",
                        borderBottomRightRadius: isExpanded ? 0 : "2px",
                      }}
                    >
                      <span className="text-lg font-mono font-bold w-12" style={{ color: group.color }}>
                        {group.range}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-platinum">{group.label}</p>
                        <p className="text-xs text-muted mt-0.5">{group.codes.length} status codes</p>
                      </div>
                      <div className="hidden sm:block w-24 h-1" style={{ backgroundColor: group.color, opacity: 0.4, borderRadius: "1px" }} />
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

                    {/* Expanded status codes */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden border border-t-0 border-divider bg-surface/20"
                          style={{
                            borderBottomLeftRadius: "2px",
                            borderBottomRightRadius: "2px",
                          }}
                        >
                          <div className="divide-y divide-divider">
                            {group.codes.map((code) => (
                              <div key={code.code} className="px-5 py-4 flex items-start gap-4">
                                <span className="text-sm font-mono font-bold shrink-0 w-10" style={{ color: group.color }}>
                                  {code.code}
                                </span>
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-platinum">{code.name}</p>
                                  <p className="text-xs text-secondary mt-1 leading-relaxed" style={{ lineHeight: "1.7" }}>
                                    {code.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
