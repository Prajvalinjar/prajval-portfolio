"use client";

import { useState, useEffect } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Mobile is strictly defined by viewport width under 768px.
      // Touchscreen laptops & high-res tablets in landscape (>=768px) must always render Desktop view.
      const isSmall = typeof window !== "undefined" && window.innerWidth < 768;
      setIsMobile(isSmall);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}
