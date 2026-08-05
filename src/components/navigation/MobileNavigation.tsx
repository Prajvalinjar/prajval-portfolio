"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import NavigationDrawer from "./NavigationDrawer";

export const MobileNavigation: React.FC = React.memo(() => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[120] px-4 py-2.5 bg-[#030509]/95 border-b border-white/5 flex items-center justify-between pointer-events-auto">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF]" />
          </span>
          <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
            PORTFOLIO.OS
          </span>
        </div>

        {/* Engineer Mode Badge — Pill shape */}
        <div className="hidden min-[360px]:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-[9px] font-mono tracking-widest uppercase font-semibold">
          <span>ENGINEER MODE</span>
        </div>

        {/* Hamburger Menu Button — Pill/circle shape button with 44px touch region */}
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open mobile navigation menu"
          className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.03] flex items-center justify-center text-white active:scale-95 transition-all cursor-pointer touch-manipulation"
        >
          <Menu className="w-4 h-4 text-[#00E5FF]" />
        </button>
      </header>

      <NavigationDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
});

MobileNavigation.displayName = "MobileNavigation";
export default MobileNavigation;
