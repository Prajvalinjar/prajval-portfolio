"use client";

import React, { useRef } from "react";
import { FilterCategory, FILTER_CHIPS } from "@/lib/filters";
import { X } from "lucide-react";

interface ProjectFiltersProps {
  activeCategory: FilterCategory;
  setActiveCategory: (category: FilterCategory) => void;
  counts: Record<FilterCategory, number>;
  selectedTech: string | null;
  onClearTechFilter: () => void;
}

export default function ProjectFilters({
  activeCategory,
  setActiveCategory,
  counts,
  selectedTech,
  onClearTechFilter
}: ProjectFiltersProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (index + 1) % FILTER_CHIPS.length;
      setActiveCategory(FILTER_CHIPS[nextIndex]);
      const nextButton = containerRef.current?.querySelectorAll("button")[nextIndex];
      nextButton?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (index - 1 + FILTER_CHIPS.length) % FILTER_CHIPS.length;
      setActiveCategory(FILTER_CHIPS[prevIndex]);
      const prevButton = containerRef.current?.querySelectorAll("button")[prevIndex];
      prevButton?.focus();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5 w-full min-w-0 max-w-full overflow-x-auto overflow-y-hidden py-1 hide-scrollbar">
      {/* Category & Status Filter Chips */}
      <div
        ref={containerRef}
        role="tablist"
        aria-label="Project Categories and Status Filters"
        className="flex items-center gap-2 overflow-x-auto max-w-full hide-scrollbar shrink-0"
      >
        {FILTER_CHIPS.map((cat, index) => {
          const isActive = activeCategory === cat;
          const count = counts[cat] || 0;

          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveCategory(cat)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`whitespace-nowrap flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-mono font-medium transition-all duration-300 border focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none shrink-0 ${
                isActive
                  ? "bg-[#00E5FF]/10 border-[#00E5FF]/40 text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.15)] font-bold scale-[1.02]"
                  : "bg-[#060810]/80 border-white/10 text-secondary/60 hover:text-white hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                  isActive
                    ? "bg-[#00E5FF]/20 text-[#00E5FF]"
                    : "bg-white/5 text-secondary/40"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Tech Filter Active Tag */}
      {selectedTech && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#00E5FF]/40 bg-[#00E5FF]/10 text-[#00E5FF] text-[11px] font-mono font-bold animate-fadeIn shrink-0">
          <span>Tech: {selectedTech}</span>
          <button
            onClick={onClearTechFilter}
            aria-label={`Remove filter for ${selectedTech}`}
            className="p-0.5 hover:bg-[#00E5FF]/20 rounded transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
