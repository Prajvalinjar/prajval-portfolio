"use client";

import React, { useCallback } from "react";
import { motion } from "framer-motion";

interface MobileCardProps {
  systemId: string;
  title: string;
  subtitle: string;
  targetId: string;
  icon: React.ReactNode;
  accentColor: string;
}

const MobileCardItem: React.FC<MobileCardProps> = React.memo(
  ({ systemId, title, subtitle, targetId, icon, accentColor }) => {
    const handleClick = useCallback(() => {
      const el = document.getElementById(targetId);
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
        window.history.pushState(null, "", `#${targetId}`);
      }
    }, [targetId]);

    return (
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        className="w-full min-h-[86px] p-3.5 sm:p-4 rounded-xl bg-[#030612]/95 border border-white/10 hover:border-[#00E5FF]/40 active:scale-[0.98] transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden shadow-md focus:outline-none focus:ring-2 focus:ring-[#00E5FF]"
      >
        {/* Accent Top Line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-70"
          style={{ background: accentColor }}
        />

        <div className="flex items-center justify-between gap-3 w-full">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/10 shrink-0"
              style={{ background: "rgba(255,255,255,0.03)", color: accentColor }}
            >
              {icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-secondary/50 tracking-widest uppercase">
                {systemId}
              </span>
              <h3 className="text-sm font-semibold text-white tracking-tight leading-tight">
                {title}
              </h3>
            </div>
          </div>

          <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-secondary/60 shrink-0">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>

        <p className="text-[11px] text-secondary/70 mt-1.5 line-clamp-1 font-normal">
          {subtitle}
        </p>
      </div>
    );
  }
);
MobileCardItem.displayName = "MobileCardItem";

export const MobileCards: React.FC = React.memo(() => {
  return (
    <div className="flex flex-col gap-3 w-full max-w-md mx-auto px-4 z-20 relative">
      <MobileCardItem
        systemId="[01] JOURNEY.LOG"
        title="Explore My Journey"
        subtitle="Student into engineer timeline & milestones."
        targetId="journey"
        accentColor="#00E5FF"
        icon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6" />
            <circle cx="18" cy="6" r="2" />
            <circle cx="6" cy="18" r="2" />
            <circle cx="12" cy="13" r="2" />
          </svg>
        }
      />

      <MobileCardItem
        systemId="[02] ENGINEERING.HUB"
        title="Engineering Projects"
        subtitle="Featured AI, Full-Stack & Systems Case Studies."
        targetId="projects"
        accentColor="#00E5FF"
        icon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        }
      />

      <MobileCardItem
        systemId="[03] RECRUITER.BRIEF"
        title="Quick Recruiter View"
        subtitle="Key highlights & resume summary in under 2 mins."
        targetId="professional-growth"
        accentColor="#10B981"
        icon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        }
      />
    </div>
  );
});
MobileCards.displayName = "MobileCards";

export default MobileCards;
