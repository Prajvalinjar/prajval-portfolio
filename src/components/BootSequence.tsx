"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AiCoreGraphic from "./AiCoreGraphic";
import { useTransition } from "./TransitionProvider";
import { soundEngine } from "@/utils/audio";

interface StatusStep {
  id: number;
  line: string;
  startTimeMs: number;
  endTimeMs: number;
}

// Slower, Cinematic Scene Schedule (Total ~6.8s - 8.4s for first visit):
// Scene 1 (0-1200ms): Environment wakes up, grid & AI Core form
// Scene 2 (1200-2600ms): Initializing Portfolio Intelligence... (1400ms)
// Scene 3 (2600-4000ms): Understanding the Engineer... (1400ms)
// Scene 4 (4000-5400ms): Connecting Projects... (1400ms)
// Scene 5 (5400-6800ms): Preparing Experience... (1400ms)
// Scene 6 (6800-8400ms): WELCOME Prajval Mahadev Injar (1600ms)
// Scene 7 (8400ms+): Seamless particle transform into Hero (1400ms)
const CINEMATIC_STEPS: StatusStep[] = [
  { id: 1, line: "Initializing Portfolio Intelligence...", startTimeMs: 1200, endTimeMs: 2600 },
  { id: 2, line: "Understanding the Engineer...", startTimeMs: 2600, endTimeMs: 4000 },
  { id: 3, line: "Connecting Projects...", startTimeMs: 4000, endTimeMs: 5400 },
  { id: 4, line: "Preparing Experience...", startTimeMs: 5400, endTimeMs: 6800 },
];

export default function BootSequence({ onUnlockScroll }: { onUnlockScroll?: () => void }) {
  const { hasBooted, markAsBooted } = useTransition();

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeStepId, setActiveStepId] = useState(1);
  const [currentLine, setCurrentLine] = useState<string>("");
  const [isBooting, setIsBooting] = useState(!hasBooted);
  const [isPulseExpanding, setIsPulseExpanding] = useState(false);
  const [revealStep, setRevealStep] = useState<"INIT" | "WELCOME" | "FINAL">("INIT");
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

    const totalDurationMs = isRepeatVisit ? 800 : 6800;
    const welcomeDurationMs = isRepeatVisit ? 400 : 1600;
    const heroTransitionMs = isRepeatVisit ? 400 : 1400;
    const intervalMs = isRepeatVisit ? 20 : 40;
    let elapsedMs = 0;

    const interval = setInterval(() => {
      elapsedMs += intervalMs;
      const currentPct = Math.min(100, (elapsedMs / totalDurationMs) * 100);
      setProgress(currentPct);

      // Evaluate active minimal status step line
      CINEMATIC_STEPS.forEach((step) => {
        const start = isRepeatVisit ? (step.startTimeMs * 800) / 6800 : step.startTimeMs;
        const end = isRepeatVisit ? (step.endTimeMs * 800) / 6800 : step.endTimeMs;

        if (elapsedMs >= start && elapsedMs < end) {
          setActiveStepId(step.id);
          setCurrentLine(step.line);
        }
      });

      // Initialization Complete (at 6800ms): Transition to Scene 6 (WELCOME)
      if (elapsedMs >= totalDurationMs) {
        clearInterval(interval);
        setCurrentLine("");

        // Scene 6: WELCOME & Prajval Mahadev Injar
        setRevealStep("WELCOME");
        soundEngine.playStartupChime();
        setIsPulseExpanding(true);

        setTimeout(() => {
          setRevealStep("FINAL");
          if (typeof window !== "undefined") {
            localStorage.setItem("hasBootedBefore", "true");
          }

          // Scene 7: Hero reveal & seamless dissolve into portfolio
          setTimeout(() => {
            setIsBooting(false);
            if (onUnlockScroll) onUnlockScroll();
            markAsBooted();
          }, heroTransitionMs);
        }, welcomeDurationMs);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [hasBooted, isRepeatVisit, markAsBooted, onUnlockScroll]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden">
      
      {/* Cinematic Minimal Boot Overlay */}
      <AnimatePresence>
        {isBooting && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1, scale: isPulseExpanding ? 1.03 : 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: "blur(32px)" }}
            transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-between p-6 sm:p-12 bg-[#030509] text-white overflow-hidden pointer-events-auto select-none"
          >
            {/* Ambient Grid Background Fade */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.08 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              className="absolute inset-0 bg-grid-pattern pointer-events-none" 
            />
            
            {/* Soft Radial Ambient Lighting */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: isPulseExpanding ? 0.45 : 0.2 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.18)_0%,rgba(3,5,9,0.98)_80%)] pointer-events-none" 
            />

            {/* Top Bar: Minimal Sound Control */}
            <div className="w-full max-w-5xl flex items-center justify-between z-20">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00E5FF]"></span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase font-semibold">
                  AI PORTFOLIO OS
                </span>
              </div>

              <button
                onClick={toggleSound}
                className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-[10px] font-mono tracking-wider text-secondary/70 hover:text-white hover:border-cyan-400/40 transition-all cursor-pointer active:scale-95 shadow-sm"
              >
                <span>{soundEnabled ? "🔊 SOUND ON" : "🔇 SOUND OFF"}</span>
              </button>
            </div>

            {/* Center Area: AI Core Centerpiece */}
            <div className="flex flex-col items-center justify-center gap-8 my-auto z-20">
              <AiCoreGraphic
                progress={progress}
                activePhase={Math.max(1, activeStepId)}
                isComplete={isPulseExpanding}
              />

              {/* Status Display Area */}
              <div className="flex flex-col items-center justify-center min-h-[70px] text-center px-4">
                <AnimatePresence mode="wait">
                  {revealStep === "INIT" && currentLine && (
                    <motion.div
                      key={currentLine}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                      className="flex flex-col items-center gap-1 text-center"
                    >
                      <span className="text-xs sm:text-sm font-mono tracking-widest text-cyan-300/80 uppercase font-medium">
                        {currentLine}
                      </span>
                    </motion.div>
                  )}

                  {(revealStep === "WELCOME" || revealStep === "FINAL") && (
                    <motion.div
                      key="welcome"
                      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="flex flex-col items-center gap-2 text-center"
                    >
                      <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold">
                        WELCOME
                      </span>
                      <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white tracking-tight uppercase drop-shadow-lg">
                        Prajval Mahadev Injar
                      </h1>
                      <span className="text-xs sm:text-sm font-mono tracking-wider text-secondary/70">
                        Data Analyst • Full Stack Developer
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Minimal Progress Bar */}
            <div className="w-full max-w-xs z-20 mb-4 flex flex-col items-center gap-2">
              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-300"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
