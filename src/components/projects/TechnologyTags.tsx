"use client";

import React from "react";

interface TechnologyTagsProps {
  techStack: string[];
  selectedTech?: string | null;
  onSelectTech?: (tech: string) => void;
  limit?: number;
}

export default function TechnologyTags({
  techStack,
  selectedTech,
  onSelectTech,
  limit
}: TechnologyTagsProps) {
  const visibleTech = limit ? techStack.slice(0, limit) : techStack;
  const hiddenCount = limit ? Math.max(0, techStack.length - limit) : 0;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {visibleTech.map((tech) => {
        const isSelected = selectedTech?.toLowerCase() === tech.toLowerCase();

        return (
          <button
            key={tech}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onSelectTech) {
                onSelectTech(tech);
              }
            }}
            aria-label={`Filter projects by technology ${tech}`}
            className={`px-3 py-1.5 rounded-md text-[11px] font-mono font-medium transition-all duration-300 border focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none ${
              isSelected
                ? "bg-accent/20 border-accent/60 text-accent shadow-[0_0_8px_rgba(0,229,255,0.3)] scale-105"
                : "bg-white/[0.03] border-white/10 text-secondary/70 hover:text-white hover:border-accent/40 hover:bg-accent/10 active:scale-95"
            } ${onSelectTech ? "cursor-pointer" : "cursor-default"}`}
          >
            <span>{tech}</span>
          </button>
        );
      })}

      {hiddenCount > 0 && (
        <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-[11px] font-mono text-secondary/40">
          +{hiddenCount}
        </span>
      )}
    </div>
  );
}
