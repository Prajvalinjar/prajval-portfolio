"use client";

import { useState, useEffect } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isTouch =
        typeof window !== "undefined" &&
        (window.matchMedia("(pointer: coarse)").matches ||
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0);
      const isSmall = typeof window !== "undefined" && window.innerWidth < 768;
      const reducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      setIsMobile(isTouch || isSmall || reducedMotion);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}
