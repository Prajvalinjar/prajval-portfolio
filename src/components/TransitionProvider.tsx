"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

interface TransitionContextType {
  triggerTransition: (slug: string, title: string, projectNum: string, image: string) => void;
  isTransitioning: boolean;
  hasBooted: boolean;
  markAsBooted: () => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
}

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasBooted, setHasBooted] = useState(false);
  const [loadingData, setLoadingData] = useState<{
    title: string;
    projectNum: string;
    image: string;
  } | null>(null);

  const markAsBooted = () => setHasBooted(true);

  // Setup vertical page scroll progress tracking
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  // When pathname changes (navigation completed), end the transition after a short delay
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 800); // Allow time for the new page components to mount and start their intro animations
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const triggerTransition = (slug: string, title: string, projectNum: string, image: string) => {
    if (isTransitioning) return;
    
    setLoadingData({ title, projectNum, image });
    setIsTransitioning(true);

    // Screen fades to dark, display loading overlay, then route to standalone project page
    setTimeout(() => {
      router.push(`/projects/${slug}`);
    }, 1000); // 1.0s total time for reading the loading sequence before triggering route push
  };

  return (
    <TransitionContext.Provider value={{ triggerTransition, isTransitioning, hasBooted, markAsBooted }}>
      {/* Top screen scroll progress line (Only mounts after boot completion) */}
      {hasBooted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent to-[#00aaff] origin-[0%] z-[9999] shadow-[0_0_10px_rgba(0,229,255,0.4)] pointer-events-none"
          style={{ scaleX }}
        />
      )}
      {children}
      
      <AnimatePresence>
        {isTransitioning && loadingData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] select-none"
          >
            {/* Holographic blueprint lines and background animations */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
              <div className="w-full h-full bg-grid-pattern" />
              <div className="w-full h-[1px] bg-accent absolute top-1/4" />
              <div className="w-full h-[1px] bg-accent absolute top-3/4" />
              <div className="w-[1px] h-full bg-accent absolute left-1/4" />
              <div className="w-[1px] h-full bg-accent absolute right-1/4" />
            </div>

            {/* Glowing HUD core */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none animate-pulse" />

            <div className="relative flex flex-col items-center gap-8 text-center max-w-lg px-6 z-10">
              {/* Circular HUD Loader */}
              <div className="relative w-24 h-24 flex items-center justify-center rounded-2xl border border-accent/20 bg-accent/5">
                {/* Rotating HUD circle */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 rounded-full border border-accent/20 border-t-accent"
                />
                
                {/* Folder icon */}
                <svg 
                  width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" 
                  className="text-accent"
                >
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>

              {/* Status information */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-mono tracking-widest text-accent/60 uppercase">
                  ACCESSING ENGINEERING DOCUMENTATION...
                </span>
                
                <h3 className="text-sm font-mono tracking-wider text-secondary/40 uppercase">
                  Loading Case File #{loadingData.projectNum}
                </h3>
                
                <h2 className="text-3xl font-heading font-extrabold text-white tracking-widest uppercase mt-1">
                  {loadingData.title}
                </h2>

                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <div className="px-3 py-1 bg-emerald-400/10 border border-emerald-400/20 rounded-md flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[9px] font-mono tracking-widest text-emerald-400 uppercase font-semibold">
                      Verified Engineering Archive
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
