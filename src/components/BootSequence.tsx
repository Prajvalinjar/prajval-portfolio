"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AiCoreGraphic from "./AiCoreGraphic";
import { useTransition } from "./TransitionProvider";
import { soundEngine } from "@/utils/audio";
import { useIsMobile } from "@/hooks/useIsMobile";

interface OSBootStep {
  timeMs: number;
  text: string;
}

const OS_BOOT_STEPS: OSBootStep[] = [
  { timeMs: 0, text: "PORTFOLIO.OS" },
  { timeMs: 400, text: "Initializing..." },
  { timeMs: 800, text: "Loading Experience..." },
  { timeMs: 1200, text: "Ready." },
];

export const BootSequenceComponent: React.FC<{ onUnlockScroll?: () => void }> = ({ onUnlockScroll }) => {
  const { hasBooted, markAsBooted } = useTransition();
  const isMobile = useIsMobile();

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState<string>("PORTFOLIO.OS");
  const [isBooting, setIsBooting] = useState(!hasBooted);
  const [isPulseExpanding, setIsPulseExpanding] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isRepeatVisit, setIsRepeatVisit] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const booted = localStorage.getItem("hasBootedBefore");
      if (booted === "true") {
        setIsRepeatVisit(true);
      }
    }
  }, []);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundEngine.setEnabled(nextState);
    if (nextState) {
      soundEngine.playVerification();
    }
  };

  useEffect(() => {
    if (hasBooted) {
      setIsBooting(false);
      if (onUnlockScroll) onUnlockScroll();
      return;
    }

    // Check reduced motion preference
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Mobile: 2000ms first visit (readable ~2.0s presentation), 1000ms repeat visit (200ms if reduced motion)
    // Desktop: 2000ms first visit, 1000ms repeat visit
    const totalDurationMs = prefersReducedMotion
      ? 200
      : (isMobile ? (isRepeatVisit ? 1000 : 2000) : (isRepeatVisit ? 1000 : 2000));
    const intervalMs = 20;
    let elapsedMs = 0;

    const interval = setInterval(() => {
      elapsedMs += intervalMs;
      const currentPct = Math.min(100, (elapsedMs / totalDurationMs) * 100);
      setProgress(currentPct);

      // Evaluate active OS boot step line
      const scaledTime = isRepeatVisit ? elapsedMs * 2 : elapsedMs;
      for (let i = OS_BOOT_STEPS.length - 1; i >= 0; i--) {
        if (scaledTime >= OS_BOOT_STEPS[i].timeMs) {
          setCurrentLine(OS_BOOT_STEPS[i].text);
          break;
        }
      }

      // Boot Complete -> Smooth 350ms transition into Hero
      if (elapsedMs >= totalDurationMs) {
        clearInterval(interval);
        setIsPulseExpanding(true);

        if (typeof window !== "undefined") {
          localStorage.setItem("hasBootedBefore", "true");
        }

        setTimeout(() => {
          setIsBooting(false);
          if (onUnlockScroll) onUnlockScroll();
          markAsBooted();
        }, prefersReducedMotion ? 50 : 350);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [hasBooted, isMobile, isRepeatVisit, markAsBooted, onUnlockScroll]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden">
      <AnimatePresence>
        {isBooting && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1, scale: isPulseExpanding ? 1.02 : 1 }}
            // Mobile: lightweight opacity-only exit (no heavy GPU blur filter)
            exit={isMobile
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.05, filter: "blur(16px)" }
            }
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-between p-6 sm:p-12 bg-[#030712] text-white overflow-hidden pointer-events-auto select-none"
          >
            {/* Ambient Grid Background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] pointer-events-none" />
            
            {/* Radial Accent Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.14)_0%,rgba(3,5,9,0.98)_80%)] pointer-events-none" />

            {/* Top Bar: Minimal OS Header & Sound Control */}
            <div className="w-full max-w-5xl flex items-center justify-between z-20">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-1.5 w-1.5">
                  {/* Static dot on mobile, pinging on desktop */}
                  {!isMobile && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>}
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00E5FF]"></span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase font-semibold">
                  PORTFOLIO.OS
                </span>
              </div>

              <button
                onClick={toggleSound}
                className={`flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-mono tracking-wider text-secondary/70 hover:text-white hover:border-cyan-400/40 transition-all cursor-pointer active:scale-95 shadow-sm ${
                  isMobile ? "" : "backdrop-blur-md"
                }`}
              >
                <span>{soundEnabled ? "🔊 SOUND ON" : "🔇 SOUND OFF"}</span>
              </button>
            </div>

            {/* Center Area: AI Core Graphic (desktop only) & OS Boot Line */}
            <div className="flex flex-col items-center justify-center gap-6 my-auto z-20">
              {/* Skip AiCoreGraphic on mobile — multiple rotating/pulsing rings waste GPU */}
              {!isMobile && (
                <AiCoreGraphic
                  progress={progress}
                  activePhase={progress < 35 ? 1 : progress < 70 ? 2 : 3}
                  isComplete={isPulseExpanding}
                />
              )}

              {/* Mobile: Simple minimal loader instead */}
              {isMobile && (
                <div className="w-16 h-16 rounded-full border-2 border-[#00E5FF]/30 border-t-[#00E5FF] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#00E5FF]" />
                </div>
              )}

              <div className="flex flex-col items-center justify-center min-h-[50px] text-center px-4">
                <motion.div
                  key={currentLine}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center gap-1 text-center"
                >
                  <span className="text-sm sm:text-base font-mono tracking-widest text-cyan-300 font-semibold uppercase">
                    {currentLine}
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Minimal High-Speed Progress Bar */}
            <div className="w-full max-w-xs z-20 mb-4 flex flex-col items-center gap-2">
              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-300 transition-all duration-75 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(BootSequenceComponent);

