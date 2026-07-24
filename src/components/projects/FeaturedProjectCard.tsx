"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/project";
import TechnologyTags from "./TechnologyTags";
import { ExternalLink, Eye, FolderOpen, Calendar, Clock, FileText } from "lucide-react";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

interface FeaturedProjectCardProps {
  project: Project;
  onOpenCaseFile: (id: string) => void;
  onOpenQuickPreview?: (project: Project) => void;
  onSelectTech?: (tech: string) => void;
  selectedTech?: string | null;
}

export default function FeaturedProjectCard({
  project,
  onOpenCaseFile,
  onOpenQuickPreview,
  onSelectTech,
  selectedTech
}: FeaturedProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover="hover"
      transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full rounded-3xl border border-white/10 bg-[#050505] overflow-hidden group relative transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:border-[#00E5FF]/40 hover:shadow-[0_20px_50px_rgba(0,229,255,0.1)]"
    >
      {/* Blueprint lines on hover */}
      <motion.div
        variants={{ hover: { opacity: 0.1 } }}
        initial={{ opacity: 0.02 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="w-full h-[1px] bg-white absolute top-1/2" />
        <div className="w-[1px] h-full bg-white absolute left-1/2" />
      </motion.div>

      {/* Deepening Shadow on Hover */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-black/40 pointer-events-none mix-blend-multiply"
      />

      {/* Border Traces on Hover */}
      <motion.div
        variants={{ hover: { scaleX: 1 } }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute top-0 left-0 w-full h-[1px] bg-accent/40 origin-left"
      />
      <motion.div
        variants={{ hover: { scaleY: 1 } }}
        initial={{ scaleY: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        className="absolute top-0 right-0 w-[1px] h-full bg-accent/40 origin-top"
      />

      {/* Main Content Area */}
      <div className="flex flex-col items-center p-8 sm:p-12 lg:p-14 gap-10 lg:gap-12 relative z-10">
        {/* Large Image Pane */}
        <motion.div
          variants={{ hover: { y: -5 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-5xl flex flex-col gap-3"
        >
          <div className="w-full aspect-[16/9] rounded-2xl border border-white/10 overflow-hidden relative group/img bg-[#030303] shadow-2xl">
            {/* Quick Preview Overlay Button */}
            {onOpenQuickPreview && (
              <button
                onClick={() => onOpenQuickPreview(project)}
                aria-label={`Quick Preview for ${project.title}`}
                className="absolute top-4 right-4 z-30 flex items-center gap-2 px-4 py-2 rounded-xl bg-[#060810]/90 border border-white/20 text-[#00E5FF] text-xs font-mono font-bold opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 shadow-xl hover:bg-[#00E5FF]/20 focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
              >
                <Eye className="w-4 h-4" />
                <span>Quick Preview</span>
              </button>
            )}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover scale-[1.02] group-hover/img:scale-[1.05] transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            />
          </div>

          <div className="flex items-center justify-between px-2 text-[9.5px] font-mono tracking-widest text-secondary/40 uppercase">
            <span className="flex items-center gap-2">
              <Calendar className="w-3 h-3 text-[#00E5FF]" />
              STARTED MAR 2025 • COMPLETED MAY 2025
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-emerald-400" />
              DURATION: {project.duration}
            </span>
          </div>
        </motion.div>

        {/* Info Pane */}
        <div className="w-full max-w-3xl flex flex-col items-center text-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] bg-[#00E5FF]/10 px-3 py-1 rounded-full border border-[#00E5FF]/20 uppercase">
              ⭐ FLAGSHIP DEPLOYMENT // {project.category}
            </span>
            <h4 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight uppercase">
              {project.title}
            </h4>
            <p className="text-base sm:text-lg font-medium text-secondary/80">{project.subtitle}</p>
          </div>

          {/* Key Impact Metric */}
          <div className="flex items-center gap-4 text-xs sm:text-sm font-mono tracking-wide text-white/90 uppercase bg-white/[0.03] px-6 py-2.5 rounded-full border border-white/10">
            <span>94 ATS ACCURACY, 500+ RESUME TESTS</span>
          </div>

          {/* Clickable Tech Stack Tags */}
          <div className="flex justify-center my-2">
            <TechnologyTags
              techStack={project.techStack}
              selectedTech={selectedTech}
              onSelectTech={onSelectTech}
            />
          </div>

          {/* Primary CTAs */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl mx-auto">
            <button
              onClick={() => onOpenCaseFile(project.id)}
              aria-label={`Open case file for ${project.title}`}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl border border-accent/40 bg-accent/10 hover:bg-accent/20 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.15)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
            >
              <FolderOpen className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold text-accent uppercase tracking-widest">
                📂 Open Case File
              </span>
            </button>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live Demo for ${project.title}`}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 transition-all text-xs font-semibold text-white flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
              >
                <ExternalLink className="w-4 h-4 text-[#00E5FF]" />
                Live Demo
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub Repository for ${project.title}`}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 transition-all text-xs font-semibold text-white flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
              >
                <GithubIcon className="w-4 h-4 text-white" />
                GitHub
              </a>
            )}

            {project.docUrl && (
              <a
                href={project.docUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Download Documentation for ${project.title}`}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 transition-all text-xs font-semibold text-secondary/80 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
              >
                <FileText className="w-4 h-4 text-secondary/60" />
                Docs
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
