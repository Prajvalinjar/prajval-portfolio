"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "./ToastContext";

function AIGlyph() {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-accent/5 border border-accent/20">
      {/* 3 nodes */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent animate-[pulse_6s_ease-in-out_infinite]" />
      <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-accent animate-[pulse_6s_ease-in-out_infinite_1s]" />
      <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-accent animate-[pulse_6s_ease-in-out_infinite_2s]" />
      {/* Connections */}
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 32 32">
        <path d="M16 9 L9 23 L23 23 Z" fill="none" stroke="currentColor" className="text-accent" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const { showToast, showDownload } = useToast();

  useEffect(() => {
    // Wait for hero animation (which takes ~5s total for BootSequence + HeroReveal)
    // Actually Boot sequence handles this delay, but let's just use a fixed 6s delay
    const timer = setTimeout(() => setShowButton(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleActionClick = (action: string) => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("closeModals"));
    }
    switch (action) {
      case "Best Project": {
        const el = document.getElementById("projects");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", "#projects");
        }
        break;
      }
      case "Engineering View":
      case "Skills": {
        const el = document.getElementById("engineering-stack");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", "#engineering-stack");
        }
        break;
      }
      case "Resume Summary": {
        showToast("Opening Resume...", "info", "Resume View");
        window.open("/resume", "_blank", "noopener,noreferrer");
        break;
      }
      case "Ask Anything": {
        const el = document.getElementById("ai-assistant");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", "#ai-assistant");
        }
        break;
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-[14px] sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.92 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3.5 w-72 sm:w-80 rounded-2xl bg-[#030303]/95 backdrop-blur-xl border border-white/15 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)] shadow-[0_0_30px_rgba(0,229,255,0.15)] p-5 pointer-events-auto"
          >
            <div className="flex items-start gap-3 mb-4">
              <AIGlyph />
              <div>
                <p className="text-[13px] text-white/90 leading-relaxed">
                  Hello.<br/>
                  I'm your AI Guide.<br/><br/>
                  I can help you explore projects, engineering decisions, case studies, skills, achievements, or summarize this portfolio.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <p className="text-[10px] font-mono text-secondary/40 tracking-widest uppercase mb-1">Quick Actions</p>
              {[
                "Best Project",
                "Engineering View",
                "Resume Summary",
                "Skills",
                "Ask Anything"
              ].map((action, i) => (
                <button 
                  key={i}
                  onClick={() => handleActionClick(action)}
                  className="flex items-center gap-2 px-3 py-2 text-[12px] font-medium text-secondary/80 bg-white/[0.03] hover:bg-accent/10 hover:text-accent border border-white/5 hover:border-accent/20 rounded-lg active:scale-[0.98] transition-all duration-300 w-full text-left focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
                >
                  <span className="w-1 h-1 rounded-full bg-current opacity-50" />
                  {action}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle Portfolio AI Guide"
            className="pointer-events-auto flex items-center justify-center w-14 h-14 md:w-auto md:h-auto md:px-4 md:py-3 rounded-full bg-[#050505]/85 backdrop-blur-xl border border-white/15 md:border-white/10 hover:border-accent/40 hover:bg-[#0a0a0a] active:scale-[0.94] transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.25)] md:shadow-[0_10px_20px_-10px_rgba(0,0,0,0.8)] group focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
          >
            <AIGlyph />
            <div className="hidden md:flex flex-col items-start pr-2 ml-3">
              <span className="text-[13px] font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors">
                AI Guide
              </span>
              <span className="text-[9px] font-mono tracking-widest text-secondary/50 uppercase group-hover:text-accent/70 transition-colors">
                Powered by Portfolio AI
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
