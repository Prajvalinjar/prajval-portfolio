"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import BootSequence from "@/components/BootSequence";
import BackgroundEngine from "@/components/BackgroundEngine";
import CustomCursor from "@/components/CustomCursor";
import HeroReveal from "@/components/HeroReveal";
import AIAssistant from "@/components/AIAssistant";
import LeftNavigation from "@/components/journey/LeftNavigation";
import JourneyChapter from "@/components/journey/JourneyChapter";
import { useTransition } from "@/components/TransitionProvider";
import { ToastProvider } from "@/components/ToastContext";
import { AdaptivePerformanceProvider } from "@/context/PerformanceContext";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

// Lightweight Skeleton Fallback Component
const SectionSkeleton = () => (
  <div className="w-full min-h-[300px] rounded-2xl bg-[#080E1A]/40 border border-white/5 animate-pulse flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-[#00E5FF]/30 border-t-[#00E5FF] animate-spin" />
  </div>
);

// Below-The-Fold Chapters (Dynamically Loaded for Max Bundle Reduction)
const ProjectsChapter = dynamic(() => import("@/components/projects/ProjectsChapter"), {
  loading: SectionSkeleton,
});
const EngineeringStackChapter = dynamic(() => import("@/components/stack/EngineeringStackChapter"), {
  loading: SectionSkeleton,
});
const ExperienceChapter = dynamic(() => import("@/components/experience/ExperienceChapter"), {
  loading: SectionSkeleton,
});
const AiAssistantChapter = dynamic(() => import("@/components/ai-assistant/AiAssistantChapter"), {
  loading: SectionSkeleton,
});
const ContactChapter = dynamic(() => import("@/components/contact/ContactChapter"), {
  loading: SectionSkeleton,
});

function PortfolioApp() {
  const { hasBooted } = useTransition();
  const [mounted, setMounted] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(!hasBooted);
  const [showSidebar, setShowSidebar] = useState(false);

  useKeyboardShortcuts();

  // Client hydration check
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync scroll lock with contextual boot state
  useEffect(() => {
    if (hasBooted) {
      setIsScrollLocked(false);
    }
  }, [hasBooted]);

  // Handle initial URL hash scroll & popstate browser back/forward navigation
  useEffect(() => {
    if (!hasBooted || !mounted) return;

    const scrollToHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const targetId = hash === "hero" ? "hero-section" : hash;
        const el = document.getElementById(targetId);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    };

    scrollToHash();
    window.addEventListener("popstate", scrollToHash);
    return () => window.removeEventListener("popstate", scrollToHash);
  }, [hasBooted, mounted]);

  // Bulletproof global scroll lock
  useEffect(() => {
    if (isScrollLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isScrollLocked]);

  // Track scroll position to show sidebar when user scrolls past Hero into Journey
  useEffect(() => {
    if (!hasBooted) return;

    const handleScroll = () => {
      const heroEl = document.getElementById("hero-section");
      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        if (heroBottom < window.innerHeight * 0.75) {
          setShowSidebar(true);
        } else {
          setShowSidebar(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasBooted]);

  // Initial SSR / Hydration Fallback: Black screen to prevent any FOUC before JS mounts
  if (!mounted) {
    return <div className="w-full min-h-screen bg-[#030509]" />;
  }

  return (
    <div className="relative w-full min-h-screen bg-[#030712] md:bg-[#030509] overflow-x-clip">
      <AnimatePresence mode="wait">
        {!hasBooted ? (
          /* STEP 1: Boot Sequence (ONLY component mounted in DOM during startup) */
          <motion.div
            key="boot-sequence-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-full min-h-screen"
          >
            <BootSequence onUnlockScroll={() => setIsScrollLocked(false)} />
          </motion.div>
        ) : (
          /* STEP 2: Main Portfolio Application (Mounts AFTER boot completes with 250ms crossfade) */
          <motion.div
            key="portfolio-application"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="relative flex flex-col items-center justify-start w-full min-h-screen"
          >
            <CustomCursor />
            <BackgroundEngine />
            
            {/* 1. CINEMATIC HERO SECTION: Distraction-free, full width personal introduction */}
            <section id="hero-section" className="w-full relative z-20">
              <HeroReveal />
              <AIAssistant />
            </section>

            {/* 2. INTERACTIVE PORTFOLIO APP SHELL (Journey → Contact): 2-Column Layout with Animated Sidebar */}
            <div className="w-full max-w-[1440px] mx-auto px-0 sm:px-6 lg:px-8 py-8 lg:py-10 relative z-10">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start w-full relative">
                
                {/* Animated Sidebar Column (265px width, sticky on desktop, slides in when reaching Journey) */}
                <aside className="hidden lg:block lg:w-[265px] shrink-0 lg:sticky lg:top-20 z-40" role="navigation" aria-label="Main Portfolio Sidebar Navigation">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ 
                      opacity: showSidebar ? 1 : 0, 
                      x: showSidebar ? 0 : -30,
                      pointerEvents: showSidebar ? "auto" : "none"
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full"
                  >
                    <LeftNavigation />
                  </motion.div>
                </aside>

                {/* Independent Main Content Column */}
                <main className="flex-1 w-full min-w-0 flex flex-col gap-14 lg:gap-20 z-10">
                  <section id="journey" className="w-full pt-6" role="region" aria-label="My Journey">
                    <JourneyChapter />
                  </section>
                  
                  <section id="projects" className="w-full" role="region" aria-label="Project Intelligence Center">
                    <ProjectsChapter />
                  </section>

                  <section id="engineering-stack" className="w-full" role="region" aria-label="Tech Ecosystem">
                    <EngineeringStackChapter />
                  </section>

                  <section id="professional-growth" className="w-full" role="region" aria-label="Professional Growth">
                    <ExperienceChapter />
                  </section>

                  <section id="ai-assistant" className="w-full" role="region" aria-label="AI Assistant Chapter">
                    <AiAssistantChapter />
                  </section>

                  <section id="contact" className="w-full" role="region" aria-label="Let's Connect">
                    <ContactChapter />
                  </section>
                </main>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <AdaptivePerformanceProvider>
      <ToastProvider>
        <PortfolioApp />
      </ToastProvider>
    </AdaptivePerformanceProvider>
  );
}
