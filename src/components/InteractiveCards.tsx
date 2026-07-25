"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Noise = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none mix-blend-overlay rounded-2xl" xmlns="http://www.w3.org/2000/svg">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
  </svg>
);

const JourneyBlueprint = () => (
  <div className="absolute inset-0 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden z-0">
    <svg className="w-full h-full" viewBox="0 0 300 200" fill="none" stroke="currentColor">
      <g className="opacity-10 group-hover:opacity-100 transition-opacity duration-1000">
        <path d="M0 50h300M0 100h300M0 150h300M100 0v200M200 0v200" strokeWidth="0.5" strokeDasharray="4 4" />
      </g>
      <path 
        d="M40 100 L 100 100 L 150 70 L 200 130 L 260 100" 
        strokeWidth="1" 
        className="transition-all duration-[1500ms] ease-out" 
        style={{ strokeDasharray: 300, strokeDashoffset: 300 }}
        strokeLinejoin="round"
      />
      <style>{`.group:hover path { stroke-dashoffset: 0 !important; }`}</style>
      
      <circle cx="40" cy="100" r="2.5" className="opacity-0 group-hover:opacity-100 transition-opacity delay-300" />
      <circle cx="100" cy="100" r="2.5" className="opacity-0 group-hover:opacity-100 transition-opacity delay-500" />
      <circle cx="150" cy="70" r="2.5" className="opacity-0 group-hover:opacity-100 transition-opacity delay-700" />
      <circle cx="200" cy="130" r="2.5" className="opacity-0 group-hover:opacity-100 transition-opacity delay-900" />
      <circle cx="260" cy="100" r="2.5" className="opacity-0 group-hover:opacity-100 transition-opacity delay-1100" />
      
      <text x="35" y="90" fontSize="5" fontFamily="monospace" fill="currentColor">V1.0</text>
      <text x="95" y="90" fontSize="5" fontFamily="monospace" fill="currentColor">V1.2</text>
      <text x="145" y="60" fontSize="5" fontFamily="monospace" fill="currentColor">V2.0</text>
      <text x="195" y="120" fontSize="5" fontFamily="monospace" fill="currentColor">V2.4</text>
      <text x="255" y="90" fontSize="5" fontFamily="monospace" fill="currentColor">V3.0</text>
    </svg>
    <div className="absolute top-6 right-6 text-[7px] font-mono tracking-widest opacity-20">REV 2.1</div>
    <div className="absolute bottom-6 right-16 text-[7px] font-mono tracking-widest opacity-20">WAYPOINTS ACTIVE</div>
  </div>
);

const EngineeringBlueprint = () => (
  <div className="absolute inset-0 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden z-0">
    <svg className="w-full h-full" viewBox="0 0 300 200" fill="none" stroke="currentColor">
      <g className="opacity-10">
        <path d="M0 20h300M0 40h300M0 60h300M0 80h300M0 100h300M0 120h300M0 140h300M0 160h300M0 180h300" strokeWidth="0.2" />
        <path d="M20 0v200M40 0v200M60 0v200M80 0v200M100 0v200M120 0v200M140 0v200M160 0v200M180 0v200M200 0v200M220 0v200M240 0v200M260 0v200M280 0v200" strokeWidth="0.2" />
      </g>
      
      {/* Nodes */}
      <rect x="40" y="85" width="30" height="30" rx="2" strokeWidth="1" className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
      <text x="45" y="102" fontSize="5" fontFamily="monospace" fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">CLIENT</text>

      <rect x="110" y="85" width="40" height="30" rx="2" strokeWidth="1" className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300" />
      <text x="115" y="102" fontSize="5" fontFamily="monospace" fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300">GATEWAY</text>

      <rect x="190" y="55" width="30" height="20" rx="2" strokeWidth="1" className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-500" />
      <text x="195" y="66" fontSize="5" fontFamily="monospace" fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-500">AUTH</text>

      <rect x="190" y="90" width="30" height="20" rx="2" strokeWidth="1" className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-500" />
      <text x="195" y="101" fontSize="5" fontFamily="monospace" fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-500">API</text>

      <rect x="190" y="125" width="30" height="20" rx="2" strokeWidth="1" className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-500" />
      <text x="195" y="136" fontSize="5" fontFamily="monospace" fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-500">DB</text>

      <rect x="250" y="90" width="30" height="55" rx="2" strokeWidth="1" className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-700" />
      <text x="255" y="120" fontSize="5" fontFamily="monospace" fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-700">AI CORE</text>

      {/* Connections */}
      <g strokeDasharray="100" strokeDashoffset="100" className="transition-all duration-[800ms] ease-out">
        <path d="M70 100h40" strokeWidth="0.5" className="delay-[200ms]" />
        <path d="M150 100h20v-35h20" strokeWidth="0.5" fill="none" className="delay-[400ms]" />
        <path d="M150 100h40" strokeWidth="0.5" className="delay-[400ms]" />
        <path d="M150 100h20v35h20" strokeWidth="0.5" fill="none" className="delay-[400ms]" />
        <path d="M220 100h30" strokeWidth="0.5" className="delay-[600ms]" />
        <path d="M220 135h30" strokeWidth="0.5" className="delay-[600ms]" />
      </g>
    </svg>
    <div className="absolute top-6 right-6 text-[7px] font-mono tracking-widest opacity-20">ARCH: MICROSERVICES</div>
    <div className="absolute bottom-6 right-16 text-[7px] font-mono tracking-widest opacity-20">NODE 03 ACTIVE</div>
  </div>
);

const RecruiterBlueprint = () => (
  <div className="absolute inset-0 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden z-0">
    <svg className="w-full h-full" viewBox="0 0 300 200" fill="none" stroke="currentColor">
      <g className="opacity-10 group-hover:opacity-100 transition-opacity duration-1000">
        <path d="M0 100h300M150 0v200" strokeWidth="0.5" strokeDasharray="2 4" />
      </g>
      
      {/* Mini dashboard blocks */}
      <rect x="30" y="30" width="100" height="50" rx="2" strokeWidth="0.5" className="opacity-0 group-hover:opacity-50 transition-opacity duration-500 delay-100" />
      <rect x="170" y="30" width="100" height="50" rx="2" strokeWidth="0.5" className="opacity-0 group-hover:opacity-50 transition-opacity duration-500 delay-200" />
      <rect x="30" y="100" width="100" height="70" rx="2" strokeWidth="0.5" className="opacity-0 group-hover:opacity-50 transition-opacity duration-500 delay-300" />
      <rect x="170" y="100" width="100" height="70" rx="2" strokeWidth="0.5" className="opacity-0 group-hover:opacity-50 transition-opacity duration-500 delay-400" />
      
      {/* Bar chart inside block 3 */}
      <g className="fill-currentColor opacity-30">
        <rect x="40" y="165" width="10" height="0" className="chart-bar-1 transition-all duration-700 ease-out" />
        <rect x="60" y="165" width="10" height="0" className="chart-bar-2 transition-all duration-700 ease-out delay-100" />
        <rect x="80" y="165" width="10" height="0" className="chart-bar-3 transition-all duration-700 ease-out delay-200" />
        <rect x="100" y="165" width="10" height="0" className="chart-bar-4 transition-all duration-700 ease-out delay-300" />
      </g>
      
      <style>{`
        .group:hover .chart-bar-1 { y: 150px; height: 15px; }
        .group:hover .chart-bar-2 { y: 135px; height: 30px; }
        .group:hover .chart-bar-3 { y: 145px; height: 20px; }
        .group:hover .chart-bar-4 { y: 120px; height: 45px; }
        .group:hover .line-chart { stroke-dashoffset: 0 !important; }
      `}</style>
      
      {/* Line chart inside block 4 */}
      <path 
        d="M180 150 L 200 140 L 220 145 L 240 120 L 260 110" 
        strokeWidth="1" 
        className="line-chart transition-all duration-[1500ms] ease-out" 
        style={{ strokeDasharray: 150, strokeDashoffset: 150 }}
      />

      <text x="35" y="45" fontSize="6" fontFamily="monospace" fill="currentColor" className="opacity-0 group-hover:opacity-30 transition-opacity delay-300">METRICS</text>
      <text x="175" y="45" fontSize="6" fontFamily="monospace" fill="currentColor" className="opacity-0 group-hover:opacity-30 transition-opacity delay-400">STATUS</text>
    </svg>
    <div className="absolute top-6 right-6 text-[7px] font-mono tracking-widest opacity-20">SYS: DASHBOARD</div>
    <div className="absolute bottom-6 right-16 text-[7px] font-mono tracking-widest opacity-20">FLOW ACTIVE</div>
  </div>
);

function MagneticCard({ 
  systemId,
  title, 
  description,
  icon,
  blueprint,
  targetId,
  onClick
}: { 
  systemId: string;
  title: string; 
  description: React.ReactNode;
  icon: React.ReactNode;
  blueprint: React.ReactNode;
  targetId?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["0.8deg", "-0.8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-0.8deg", "0.8deg"]);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-2px", "2px"]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-2px", "2px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${targetId}`);
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={`Open card: ${title}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        x: translateX,
        y: translateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
      className="relative flex flex-col h-[280px] p-8 rounded-2xl bg-[#060810]/75 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-500 hover:bg-[#0a0e1a]/85 hover:border-accent/40 hover:shadow-[0_20px_40px_rgba(0,229,255,0.12)] cursor-pointer group overflow-hidden focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
    >
      {/* Matte Finish Grain */}
      <Noise />
      
      {/* Ambient top-left lighting */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent pointer-events-none rounded-2xl" />

      {/* Dual Layer Border Highlight */}
      <div className="absolute inset-[1px] rounded-2xl border border-white/[0.08] group-hover:border-accent/30 transition-colors duration-500 pointer-events-none" />
      
      {/* Blueprint Background Layer */}
      {blueprint}

      {/* Glass Reflection Sweep Beam on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-2xl z-20">
        <div className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
      </div>

      {/* Border Tracing Animation on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent -translate-x-full group-hover:animate-[slideRight_2s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-accent/50 to-transparent translate-x-full group-hover:animate-[slideLeft_2s_ease-in-out_infinite]" />
      </div>

      <div style={{ transform: "translateZ(15px)" }} className="flex flex-col h-full z-10">
        
        {/* System Identifier & Icon */}
        <div className="flex items-start justify-between mb-6">
          <div className="text-accent/60 group-hover:animate-pulse group-hover:text-accent transition-colors duration-300">
            {icon}
          </div>
          <div className="text-[10px] font-mono text-secondary/40 tracking-widest uppercase">
            {systemId}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[17px] sm:text-[19px] font-semibold text-white tracking-tight mb-3 drop-shadow-sm">
          {title}
        </h3>
        
        {/* Description / List */}
        <div className="text-[13px] sm:text-[14px] text-secondary/70 flex-1 leading-relaxed">
          {description}
        </div>

      </div>
      
      {/* Bottom Layout: Cyan Progress Line & Arrow */}
      <div style={{ transform: "translateZ(10px)" }} className="absolute bottom-6 left-8 right-8 flex items-center justify-between z-10">
        
        {/* Tiny Cyan Line */}
        <div className="w-4 h-[2px] bg-accent/30 group-hover:bg-accent group-hover:w-8 transition-all duration-300 rounded-full" />
        
        {/* Animated Arrow (Slides 8px right) */}
        <div className="text-secondary/40 group-hover:text-white transform group-hover:translate-x-2 transition-all duration-300">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>

      </div>
    </motion.div>
  );
}

export function InteractiveCardsComponent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full" style={{ perspective: 1200 }}>
      <MagneticCard 
        systemId="[01] JOURNEY.LOG"
        title="Explore My Journey"
        targetId="journey"
        description="See how I grew from a student into an engineer."
        blueprint={<JourneyBlueprint />}
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6" />
            <circle cx="18" cy="6" r="2" />
            <circle cx="6" cy="18" r="2" />
            <circle cx="12" cy="13" r="2" />
          </svg>
        }
      />
      
      <MagneticCard 
        systemId="[02] ENGINEERING.HUB"
        title="Explore My Engineering"
        targetId="engineering-stack"
        description={
          <ul className="flex flex-col gap-1.5">
            {[
              "Architecture",
              "Systems",
              "Decision Logs",
              "Case Studies"
            ].map(item => (
              <li key={item} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-accent/50 group-hover:bg-accent transition-colors duration-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        }
        blueprint={<EngineeringBlueprint />}
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 12 12 17 22 12" />
            <polyline points="2 17 12 22 22 17" />
          </svg>
        }
      />
      
      <MagneticCard 
        systemId="[03] RECRUITER.BRIEF"
        title="Quick Recruiter View"
        targetId="professional-growth"
        description={
          <ul className="flex flex-col gap-1.5">
            {[
              "Everything important",
              "in under two minutes."
            ].map(item => (
              <li key={item} className="flex items-center gap-2">
                <span>{item}</span>
              </li>
            ))}
          </ul>
        }
        blueprint={<RecruiterBlueprint />}
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        }
      />
    </div>
  );

}

export default React.memo(InteractiveCardsComponent);

