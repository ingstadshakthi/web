"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const STEPS = [
   { id: 1, name: "Client Hello", initiator: "client" },
   { id: 2, name: "Server Hello & Certificate", initiator: "server" },
   { id: 3, name: "Key Verification & Exchange", initiator: "client" },
   { id: 4, name: "Secure Connection Established", initiator: "both" },
];

export default function HTTPSAndTLSDiagram() {
   const [currentStep, setCurrentStep] = useState(0);

   const handleNext = () => {
      if (currentStep < STEPS.length) {
         setCurrentStep(s => s + 1);
      }
   };

   const handleReset = () => {
      setCurrentStep(0);
   };

   return (
      <div className="bg-[#1A1C1E] border border-divider rounded-[2px] p-6 lg:p-10 flex flex-col items-center">
         {/* Visualization Canvas */}
         <div className="relative w-full max-w-3xl h-[400px] border border-divider bg-[#15171a] rounded-[2px] flex items-center justify-between px-8 md:px-20 mb-10 overflow-hidden">

            {/* Connection Line Core */}
            <div className="absolute top-1/2 left-20 right-20 h-[1px] bg-divider -translate-y-1/2 z-0" />

            {/* Client Node */}
            <div className="relative z-10 flex flex-col items-center gap-3">
               <div className="w-16 h-16 rounded-[2px] bg-[#282A2D] border border-divider-hover flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-platinum" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
               </div>
               <span className="text-xs font-medium text-secondary uppercase tracking-widest font-mono text-center">Browser<br /><span className="text-[10px] text-muted normal-case font-sans opacity-70">Client</span></span>
            </div>

            {/* Center Animations base on currentStep */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] h-full pointer-events-none flex flex-col items-center justify-center z-10 p-4">
               {currentStep === 1 && (
                  <motion.div
                     initial={{ x: -100, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="bg-accent/10 border border-accent/30 text-accent text-xs px-4 py-2 rounded-full mb-8"
                  >
                     &quot;Hello! I support TLS 1.3.&quot;
                  </motion.div>
               )}
               {currentStep === 2 && (
                  <motion.div
                     initial={{ x: 100, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-4 py-2 rounded-full flex gap-2 items-center"
                  >
                     &quot;Me too! Here is my ID Card (Certificate)&quot;
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </motion.div>
               )}
               {currentStep === 3 && (
                  <motion.div
                     initial={{ scale: 0.9, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     className="text-center"
                  >
                     <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs px-4 py-2 rounded-full mb-2">
                        *Validates Certificate & Exchanges Secret Key*
                     </div>
                  </motion.div>
               )}
               {currentStep === 4 && (
                  <motion.div
                     initial={{ opacity: 0, scale: 0.5 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ type: "spring", stiffness: 200, damping: 20 }}
                     className="flex flex-col items-center gap-2"
                  >
                     <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/50 mb-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                        <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                     </div>
                  </motion.div>
               )}
            </div>

            {/* Encrypted Tunnel Overlay */}
            {currentStep === 4 && (
               <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute top-1/2 left-24 right-24 h-[6px] bg-gradient-to-r from-accent/50 via-emerald-400/50 to-accent/50 -translate-y-1/2 z-0 rounded-full blur-[2px]"
               />
            )}


            {/* Server Node */}
            <div className="relative z-10 flex flex-col items-center gap-3">
               <div className="w-16 h-16 rounded-[2px] bg-[#282A2D] border border-divider-hover flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-platinum" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
               </div>
               <span className="text-xs font-medium text-secondary uppercase tracking-widest font-mono text-center">Server<br /><span className="text-[10px] text-muted normal-case font-sans opacity-70">example.com</span></span>
            </div>
         </div>

         {/* Controls & Steps text */}
         <div className="max-w-3xl w-full">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-heading text-platinum">TLS 1.3 Handshake Process</h3>
               <div className="flex gap-3">
                  <button
                     onClick={handleReset}
                     disabled={currentStep === 0}
                     className="px-4 py-2 text-xs font-medium border border-divider text-muted hover:text-platinum hover:border-divider-hover disabled:opacity-50 disabled:cursor-not-allowed rounded-[2px]"
                  >
                     Reset
                  </button>
                  <button
                     onClick={handleNext}
                     disabled={currentStep === 4}
                     className="px-4 py-2 text-xs font-medium bg-platinum text-[#1A1C1E] disabled:opacity-50 disabled:cursor-not-allowed rounded-[2px] min-w-[120px]"
                  >
                     {currentStep === 0 ? "Start Handshake" : currentStep === 4 ? "Connected" : "Next Step →"}
                  </button>
               </div>
            </div>

            {/* Steps Timeline Track */}
            <div className="grid grid-cols-4 gap-2">
               {STEPS.map((step) => {
                  const isActive = currentStep >= step.id;
                  const isCurrent = currentStep === step.id;
                  return (
                     <div key={step.id} className="flex flex-col gap-2">
                        <div className="h-1 w-full rounded-full bg-surface/50 overflow-hidden">
                           <motion.div
                              className={cn("h-full w-full bg-accent origin-left", currentStep === 4 ? "bg-emerald-400" : "")}
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: isActive ? 1 : 0 }}
                              transition={{ duration: 0.4 }}
                           />
                        </div>
                        <span className={cn(
                           "text-[10px] font-mono leading-tight",
                           isCurrent ? "text-platinum font-bold" : isActive ? "text-secondary" : "text-muted opacity-50"
                        )}>
                           {step.name}
                        </span>
                     </div>
                  )
               })}
            </div>

            {/* Detail text box */}
            <div className="mt-8 p-4 bg-surface/20 border border-divider/50 rounded-[2px] min-h-[100px] flex items-center">
               <p className="text-sm text-secondary leading-relaxed">
                  {currentStep === 0 && "Without HTTPS, your HTTP requests are sent in &apos;plaintext&apos;. Anyone on the network (like a cafe Wi-Fi or ISP) can read the passwords, headers, and data you send. Click &apos;Start Handshake&apos; to see how TLS secures it."}
                  {currentStep === 1 && <><strong className="text-platinum">Step 1:</strong> The client reaches out over TCP port 443 and proposes TLS versions and cipher suites it supports to start encryption.</>}
                  {currentStep === 2 && <><strong className="text-platinum">Step 2:</strong> The server replies with its chosen configuration and sends its Digital Certificate (its cryptographic ID card) signed by a trusted Certificate Authority.</>}
                  {currentStep === 3 && <><strong className="text-platinum">Step 3:</strong> The client verifies the certificate. They then use Asymmetric Encryption (RSA/ECC) to securely exchange a symmetric &apos;session key&apos;.</>}
                  {currentStep === 4 && <><strong className="text-emerald-400">Secure!</strong> The handshake is complete. All further HTTP traffic (Request & Response) is now encrypted symmetrically (e.g., AES) using the shared session key, guaranteeing secrecy and integrity.</>}
               </p>
            </div>
         </div>
      </div>
   );
}
