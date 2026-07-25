"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  House,
  Route,
  Target,
  Layers,
  TrendingUp,
  BrainCircuit,
  Send,
  Menu,
  X,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  target: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "01",
    label: "HOME",
    target: "hero",
    icon: House,
  },
  {
    id: "02",
    label: "MY JOURNEY",
    target: "journey",
    icon: Route,
  },
  {
    id: "03",
    label: "PROJECT INTELLIGENCE CENTER",
    target: "projects",
    icon: Target,
  },
  {
    id: "04",
    label: "TECH ECOSYSTEM",
    target: "engineering-stack",
    icon: Layers,
  },
  {
    id: "05",
    label: "PROFESSIONAL GROWTH",
    target: "professional-growth",
    icon: TrendingUp,
  },
  {
    id: "06",
    label: "AI ASSISTANT",
    target: "ai-assistant",
    icon: BrainCircuit,
  },
  {
    id: "07",
    label: "LET'S CONNECT",
    target: "contact",
    icon: Send,
  },
];

export function LeftNavigationComponent() {
  const [activeId, setActiveId] = useState("01");
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // If viewing a project subpage, highlight the "Projects" tab
    if (pathname && pathname.startsWith("/projects/")) {
      setActiveId("03");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const item = NAV_ITEMS.find(
              (n) => n.target === entry.target.id || (n.target === "hero" && entry.target.id === "hero-section")
            );
            if (item) {
              setActiveId(item.id);
              // Gently update URL hash without cluttering browser history during scrolling
              if (window.location.hash !== `#${item.target === "hero" ? "" : item.target}`) {
                const newHash = item.target === "hero" ? window.location.pathname : `#${item.target}`;
                window.history.replaceState(null, "", newHash);
              }
            }
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    NAV_ITEMS.forEach((item) => {
      const targetId = item.target === "hero" ? "hero-section" : item.target;
      const el = document.getElementById(targetId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  const handleNavClick = (target: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("closeModals"));
    }
    setMobileOpen(false);
    const targetId = target === "hero" ? "hero-section" : target;
    if (pathname === "/") {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${target === "hero" ? "" : target}`);
      }
    } else {
      router.push(target === "hero" ? "/" : `/#${target}`);
    }
  };

  const activeItem = NAV_ITEMS.find((item) => item.id === activeId) || NAV_ITEMS[0];

  const NavigationPanel = () => (
    <div className="relative flex flex-col w-full pointer-events-auto select-none p-4 sm:p-4.5 rounded-[22px] border border-white/[0.08] bg-[#060810]/75 backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.7),0_0_24px_rgba(0,229,255,0.03),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
      
      {/* 1. TOP PROFILE HEADER */}
      <div className="flex flex-col pb-3.5 mb-3 border-b border-white/[0.06] relative">
        <div className="flex items-center justify-between">
          <h1 className="text-base sm:text-lg font-heading font-extrabold text-white tracking-tight leading-none drop-shadow-sm">
            Prajval's Portfolio
          </h1>
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
          </div>
        </div>
        {/* Subtle Cyan Accent Line */}
        <div className="h-[2px] w-9 bg-gradient-to-r from-[#00E5FF] via-[#00E5FF]/60 to-transparent mt-2.5 rounded-full shadow-[0_0_6px_rgba(0,229,255,0.4)]" />
      </div>

      {/* 2. VERTICAL TIMELINE & MENU ITEMS */}
      <div className="relative flex flex-col gap-2.5 my-1.5">
        {/* Continuous Subtle Vertical Timeline Line */}
        <div className="absolute left-[24px] top-3.5 bottom-3.5 w-[1.5px] bg-gradient-to-b from-[#00E5FF]/40 via-white/10 to-[#00E5FF]/20 pointer-events-none z-0" />

        {NAV_ITEMS.map((item) => {
          const isActive = item.id === activeId;
          const IconComponent = item.icon;

          return (
            <motion.div
              key={item.id}
              role="button"
              tabIndex={0}
              aria-label={`Navigate to ${item.label}`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => handleNavClick(item.target)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleNavClick(item.target);
                }
              }}
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="group relative flex items-center justify-between px-3 py-2.5 rounded-[14px] cursor-pointer transition-all duration-200 z-10 focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
            >
              {/* Active Item Premium Glass Highlight */}
              {isActive && (
                <motion.div
                  layoutId="activeNavGlass"
                  className="absolute inset-0 rounded-[14px] bg-gradient-to-r from-[#00E5FF]/[0.14] via-[#00E5FF]/[0.06] to-[#00E5FF]/[0.02] border border-[#00E5FF]/35 shadow-[0_0_20px_rgba(0,229,255,0.12),inset_0_1px_0_0_rgba(255,255,255,0.12)] pointer-events-none z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Left Content: Timeline Number Badge + Icon + Title */}
              <div className="flex items-center gap-2.5 min-w-0 z-10 w-full">
                {/* Number Badge Sitting Perfectly on Timeline */}
                <div
                  className={`relative flex items-center justify-center w-6 h-6 rounded-md text-[10px] font-mono font-medium shrink-0 transition-all duration-300 z-10 ${
                    isActive
                      ? "bg-[#00E5FF]/20 border border-[#00E5FF]/60 text-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.4)]"
                      : "bg-[#080c16] border border-white/10 text-[#8CA3BB] group-hover:text-white group-hover:border-white/25"
                  }`}
                >
                  <span>{item.id}</span>
                  {/* Subtle Glowing Node indicator on active item */}
                  {isActive && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_6px_#00E5FF] animate-pulse" />
                  )}
                </div>

                {/* Lucide Icon */}
                <div
                  className={`shrink-0 transition-all duration-300 ${
                    isActive
                      ? "text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]"
                      : "text-[#8CA3BB] group-hover:text-white group-hover:translate-x-0.5"
                  }`}
                >
                  <IconComponent className="w-[18px] h-[18px]" strokeWidth={isActive ? 2 : 1.75} />
                </div>

                {/* Title */}
                <span
                  className={`text-[11px] font-sans font-semibold tracking-tight uppercase truncate transition-colors duration-200 ${
                    isActive ? "text-white drop-shadow-sm" : "text-[#8CA3BB] group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>
              </div>

              {/* Active Subtle Right Node Dot */}
              {isActive && (
                <div className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] shrink-0 ml-1 z-10" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* 3. BOTTOM SYSTEM STATUS */}
      <div className="mt-3.5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono tracking-wider">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_6px_#00E5FF] animate-pulse" />
            <span className="text-[#00E5FF] font-semibold text-[9.5px]">SYSTEM ONLINE</span>
          </div>
          <span className="text-[#8CA3BB]/60 text-[9px] tracking-widest">Portfolio OS v2.8</span>
        </div>

        {/* Minimal Animated Signal Bar */}
        <div className="flex items-end gap-[2.5px] h-3 px-1">
          <span className="w-[2px] bg-[#00E5FF]/80 animate-[pulse_1.2s_ease-in-out_infinite_100ms] h-full rounded-full" />
          <span className="w-[2px] bg-[#00E5FF]/80 animate-[pulse_1.2s_ease-in-out_infinite_300ms] h-2/3 rounded-full" />
          <span className="w-[2px] bg-[#00E5FF]/80 animate-[pulse_1.2s_ease-in-out_infinite_200ms] h-4/5 rounded-full" />
          <span className="w-[2px] bg-[#00E5FF]/80 animate-[pulse_1.2s_ease-in-out_infinite_400ms] h-1/2 rounded-full" />
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sticky Panel */}
      <div className="hidden lg:block w-full">
        <NavigationPanel />
      </div>

      {/* Mobile / Tablet Floating Trigger Header Bar */}
      <div className="lg:hidden fixed top-4 left-4 right-4 z-[99] pointer-events-auto flex items-center justify-between px-4 py-2.5 rounded-xl border border-white/10 bg-[#060810]/85 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
          <span className="text-xs font-mono font-semibold text-white tracking-wider truncate max-w-[200px]">
            {activeItem.label}
          </span>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5 text-[#00E5FF]" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* Mobile / Tablet Slide-out OS Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-[98] flex justify-start pointer-events-auto">
            {/* Dark Glass Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-[320px] max-w-[88vw] h-full p-4 pt-20 overflow-y-auto"
            >
              <NavigationPanel />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default React.memo(LeftNavigationComponent);

