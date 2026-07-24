"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TECHNOLOGIES, TechCategory } from "@/data/stack";
import TechLogo from "./TechLogo";
import TechnologyDetailPanel from "./TechnologyDetailPanel";

interface TechnologyGridProps {
  selectedTechId: string | null;
  setSelectedTechId: (id: string | null) => void;
}

const CATEGORY_ORDER: TechCategory[] = [
  "Programming Languages",
  "Frontend",
  "Backend",
  "Databases",
  "AI & Data",
  "Tools & Cloud",
];

export default function TechnologyGrid({ selectedTechId, setSelectedTechId }: TechnologyGridProps) {
  const handleChipClick = (id: string) => {
    if (selectedTechId === id) {
      setSelectedTechId(null);
    } else {
      setSelectedTechId(id);
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      {CATEGORY_ORDER.map((category) => {
        const categoryTechs = TECHNOLOGIES.filter((t) => t.category === category);
        if (categoryTechs.length === 0) return null;

        // Check if currently selected tech belongs to this category
        const selectedTechInCategory = categoryTechs.find((t) => t.id === selectedTechId);

        return (
          <div key={category} className="flex flex-col gap-4">
            {/* Category Header */}
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <h3 className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                {category}
              </h3>
              <div className="flex-1 h-[1px] bg-white/5" />
            </div>

            {/* Compact Chips Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {categoryTechs.map((tech) => {
                const isSelected = selectedTechId === tech.id;

                return (
                  <motion.button
                    key={tech.id}
                    onClick={() => handleChipClick(tech.id)}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className={`group relative flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-300 cursor-pointer min-h-[90px] ${
                      isSelected
                        ? "bg-accent/15 border-accent shadow-[0_0_20px_rgba(147,51,234,0.3)] backdrop-blur-xl"
                        : "bg-[#070914]/75 backdrop-blur-xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:bg-[#0c1024]/85 hover:border-accent/40 hover:shadow-[0_10px_25px_rgba(147,51,234,0.15)]"
                    }`}
                  >
                    {/* Active Cyan Glow Dot */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,229,255,1)] animate-pulse" />
                    )}

                    {/* Official Vector Logo */}
                    <div className="w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <TechLogo id={tech.id} className="w-7 h-7" />
                    </div>

                    {/* Tech Name Only */}
                    <span
                      className={`text-xs font-mono tracking-wider transition-colors duration-300 ${
                        isSelected ? "text-white font-bold" : "text-secondary/70 group-hover:text-white"
                      }`}
                    >
                      {tech.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Inline Expanded Information Panel */}
            <AnimatePresence mode="wait">
              {selectedTechInCategory && (
                <TechnologyDetailPanel
                  key={selectedTechInCategory.id}
                  technology={selectedTechInCategory}
                  onClose={() => setSelectedTechId(null)}
                />
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
