"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, House, Route, Target, Layers, TrendingUp, BrainCircuit, Send, FileText } from "lucide-react";

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { id: "hero-section", label: "HOME / HERO", icon: House },
  { id: "journey", label: "MY JOURNEY", icon: Route },
  { id: "projects", label: "PROJECT INTELLIGENCE", icon: Target },
  { id: "engineering-stack", label: "TECH ECOSYSTEM", icon: Layers },
  { id: "professional-growth", label: "PROFESSIONAL GROWTH", icon: TrendingUp },
  { id: "ai-assistant", label: "AI ASSISTANT", icon: BrainCircuit },
  { id: "contact", label: "LET'S CONNECT", icon: Send },
];

export const NavigationDrawer: React.FC<NavigationDrawerProps> = React.memo(({ isOpen, onClose }) => {
  const handleNavClick = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${id === "hero-section" ? "hero" : id}`);
      }
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] pointer-events-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#030509]/80 backdrop-blur-lg"
          />

          {/* Sliding Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="absolute top-0 right-0 w-[320px] max-w-[85vw] h-full bg-[#080E1A] border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto z-10 shadow-2xl"
          >
            {/* Header & Close Button */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase font-semibold">
                    SYSTEM NAVIGATION
                  </span>
                  <span className="text-xs font-heading text-white font-bold uppercase">
                    Portfolio OS
                  </span>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close navigation menu"
                  className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white active:scale-95 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className="w-full min-h-[48px] px-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-[#00E5FF]/10 hover:border-[#00E5FF]/30 active:scale-[0.98] transition-all flex items-center gap-3 text-left cursor-pointer"
                    >
                      <Icon className="w-4 h-4 text-[#00E5FF]" />
                      <span className="text-xs font-mono tracking-wider text-white font-medium uppercase">
                        {link.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Footer HUD Coordinates & Info (Moved from header to drawer as requested) */}
            <div className="pt-6 mt-6 border-t border-white/10 flex flex-col gap-3 text-[10px] font-mono text-secondary/60">
              <div className="flex items-center justify-between">
                <span>LATITUDE</span>
                <span className="text-white">18.5204° N</span>
              </div>
              <div className="flex items-center justify-between">
                <span>LONGITUDE</span>
                <span className="text-white">73.8567° E</span>
              </div>
              <div className="flex items-center justify-between">
                <span>MODE</span>
                <span className="text-[#00E5FF]">ENGINEER HUD</span>
              </div>
              
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-full min-h-[48px] rounded-xl border border-[#00E5FF]/40 bg-[#00E5FF]/10 text-[#00E5FF] text-xs font-mono font-semibold tracking-wider uppercase flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>DOWNLOAD RESUME PDF</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});
NavigationDrawer.displayName = "NavigationDrawer";
export default NavigationDrawer;
