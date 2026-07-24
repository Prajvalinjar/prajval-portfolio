"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JourneyMilestone } from "@/types/journey";
import Link from "next/link";
import TechnologyTags from "@/components/projects/TechnologyTags";
import AssetUploadPlaceholder from "./AssetUploadPlaceholder";
import { ChevronDown, BookOpen, Images, Award, CheckCircle2, AlertCircle, Eye } from "lucide-react";

interface TimelineMilestoneProps {
  data: JourneyMilestone;
  index: number;
  onOpenGallery: (images: any[], startIndex: number) => void;
}

export default function TimelineMilestone({
  data,
  index,
  onOpenGallery
}: TimelineMilestoneProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 w-full group relative"
    >
      {/* Left side: Year & Category Label */}
      <div className="flex flex-row sm:flex-col items-center sm:items-end w-full sm:w-[100px] shrink-0 sm:pr-4 z-10 sm:mt-2">
        <div className="text-xl sm:text-2xl font-heading font-extrabold text-[#00E5FF] tracking-tight group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.6)] transition-all duration-300">
          {data.year}
        </div>
        <span className="text-[9px] font-mono tracking-widest text-secondary/40 uppercase font-bold text-right ml-3 sm:ml-0 group-hover:text-secondary/80 transition-colors">
          {data.categoryLabel}
        </span>
      </div>

      {/* Center Node Dot */}
      <div className="absolute left-[16px] sm:left-[110px] -translate-x-1/2 top-[6px] sm:top-[16px] w-4 h-4 rounded-full border border-white/20 bg-[#050505] flex items-center justify-center z-20 transition-all duration-500 group-hover:border-[#00E5FF] group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.8)]">
        <div className="w-1.5 h-1.5 rounded-full bg-white/40 transition-all duration-500 group-hover:bg-[#00E5FF]" />
      </div>

      {/* Right side: Card Container */}
      <div className="flex-1 w-full pl-8 sm:pl-4 relative">
        <div className="hidden sm:block absolute left-[-16px] top-[24px] w-[16px] h-[1px] bg-white/10 transition-colors duration-500 group-hover:bg-[#00E5FF]/40" />

        <div className="w-full rounded-2xl border border-white/10 bg-[#060810]/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden relative transition-all duration-500 hover:border-[#00E5FF]/40 hover:bg-[#090d1a]/90 hover:shadow-[0_20px_40px_rgba(0,229,255,0.1)]">
          
          {/* Photo Banner (always visible — stacked on top of content) */}
          {data.images && data.images.length > 0 && (
            <div className="w-full h-[160px] relative overflow-hidden border-b border-white/10 bg-[#030303]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.images[0].url}
                alt={data.images[0].alt}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenGallery(data.images, 0);
                }}
                className="w-full h-full object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-500 cursor-pointer"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060810] via-transparent to-transparent pointer-events-none" />

              {/* Category Badge */}
              <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-mono text-[#00E5FF] uppercase font-bold pointer-events-none">
                {data.images[0].category}
              </div>

              {/* Gallery View Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenGallery(data.images, 0);
                }}
                aria-label={`Open photo gallery for ${data.title}`}
                className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 text-[9px] font-mono text-white hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
              >
                <Eye className="w-3 h-3 text-[#00E5FF]" />
                <span>{data.images.length > 1 ? `${data.images.length} Photos` : "View"}</span>
              </button>
            </div>
          )}

          {/* Content Area */}
          <div className="p-5 sm:p-6 flex flex-col gap-2">
            {/* Header — clickable to toggle expand */}
            <div
              onClick={() => setIsExpanded(!isExpanded)}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              aria-label={`Toggle details for ${data.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsExpanded(!isExpanded);
                }
              }}
              className="flex items-start justify-between gap-4 cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none rounded-lg"
            >
              <div className="flex flex-col gap-1 flex-1">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-white tracking-tight group-hover:text-[#00E5FF] transition-colors">
                  {data.title}
                </h3>
                <p className="text-xs text-secondary/70 font-medium leading-relaxed">
                  {data.subtitle}
                </p>
              </div>

              <div className={`p-1.5 rounded-xl border border-white/10 bg-white/5 text-secondary/60 transition-transform duration-300 shrink-0 mt-1 ${isExpanded ? "rotate-180 text-[#00E5FF] border-[#00E5FF]/40" : ""}`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            {/* Lesson Preview when Collapsed */}
            {!isExpanded && (
              <div className="mt-1 text-[11px] font-mono text-[#00E5FF]/80 italic truncate">
                "{data.lesson}"
              </div>
            )}

            {/* Expanded Drawer */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-5 overflow-hidden"
                >
                  {/* Story Narrative */}
                  <div>
                    <h4 className="text-[10px] font-mono text-[#00E5FF] uppercase font-bold mb-1.5">
                      Story & Background
                    </h4>
                    <p className="text-xs text-secondary/80 leading-relaxed">
                      {data.summary}
                    </p>
                  </div>

                  {/* Challenges & Achievements */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-1.5">
                      <span className="text-[9.5px] font-mono text-amber-400 uppercase font-bold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Challenges
                      </span>
                      <ul className="flex flex-col gap-1 text-[11px] text-secondary/70">
                        {data.challenges.map((c, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-amber-400 shrink-0">•</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-1.5">
                      <span className="text-[9.5px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" /> Achievements
                      </span>
                      <ul className="flex flex-col gap-1 text-[11px] text-secondary/70">
                        {data.achievements.map((a, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Engineering Lesson */}
                  <div className="p-3.5 rounded-xl border border-[#00E5FF]/20 bg-[#00E5FF]/5 flex flex-col gap-1">
                    <span className="text-[8.5px] font-mono text-[#00E5FF] uppercase font-bold tracking-widest">
                      ENGINEERING LESSON LEARNED
                    </span>
                    <p className="text-xs font-semibold text-white italic">
                      "{data.lesson}"
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-[10px] font-mono text-secondary/40 uppercase font-bold mb-1.5">
                      Technologies Mastered
                    </h4>
                    <TechnologyTags techStack={data.techStack} />
                  </div>

                  {/* Missing Assets */}
                  {data.missingAssets && data.missingAssets.length > 0 && (
                    <AssetUploadPlaceholder missingAssets={data.missingAssets} />
                  )}

                  {/* Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
                    <button
                      onClick={() => onOpenGallery(data.images, 0)}
                      aria-label={`View photo gallery for ${data.title}`}
                      className="px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-all focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
                    >
                      <Images className="w-3.5 h-3.5 text-[#00E5FF]" />
                      Gallery ({data.images.length})
                    </button>

                    <Link
                      href={`/journey/${data.slug}`}
                      className="px-4 py-2 rounded-xl border border-[#00E5FF]/40 bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 text-[#00E5FF] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)] focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Open Full Story
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
