"use client";

import React from "react";
import DesktopHero from "@/components/hero/DesktopHero";
import MobileHero from "@/components/hero/MobileHero";
import { useIsMobile } from "@/hooks/useIsMobile";

export const HeroReveal: React.FC = React.memo(() => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileHero /> : <DesktopHero />;
});

HeroReveal.displayName = "HeroReveal";
export default HeroReveal;
