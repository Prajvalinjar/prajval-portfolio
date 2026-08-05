"use client";

import React from "react";
import DesktopHero from "@/components/hero/DesktopHero";
import MobileHero from "@/components/hero/MobileHero";

export const HeroReveal: React.FC = React.memo(() => {
  return (
    <>
      {/* Desktop / Laptop Widescreen Hero (>=768px) */}
      <div className="hidden md:block w-full">
        <DesktopHero />
      </div>

      {/* Dedicated Mobile Hero (<768px) */}
      <div className="block md:hidden w-full">
        <MobileHero />
      </div>
    </>
  );
});

HeroReveal.displayName = "HeroReveal";
export default HeroReveal;


