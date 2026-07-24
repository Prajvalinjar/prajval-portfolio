"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CameraDrift({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Extremely slow camera drift (4px over 15 seconds)
    gsap.to(containerRef.current, {
      x: 4,
      y: 2,
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col flex-1 items-center justify-center">
      {children}
    </div>
  );
}
