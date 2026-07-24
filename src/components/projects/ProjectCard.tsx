"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/project";
import TechnologyTags from "./TechnologyTags";
import { ExternalLink, Eye, FolderOpen, Calendar, Clock } from "lucide-react";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const STATUS_CONFIG = {
  Production: {
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    dot: "bg-emerald-400",
    label: "PRODUCTION"
  },
  Completed: {
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    dot: "bg-emerald-400",
    label: "COMPLETED"
  },
  Research: {
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    dot: "bg-blue-400",
    label: "RESEARCH"
  },
  Prototype: {
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    dot: "bg-amber-400",
    label: "PROTOTYPE"
  },
  "In Progress": {
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    dot: "bg-amber-400",
    label: "IN PROGRESS"
  }
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenCaseFile: (id: string) => void;
  onOpenQuickPreview?: (project: Project) => void;
  onSelectTech?: (tech: string) => void;
  selectedTech?: string | null;
}

export default function ProjectCard({
  project,
  index,
  onOpenCaseFile,
  onOpenQuickPreview,
  onSelectTech,
  selectedTech
}: ProjectCardProps) {
  const statusKey = (project.status in STATUS_CONFIG
    ? project.status
    : "Production") as keyof typeof STATUS_CONFIG;
  const status = STATUS_CONFIG[statusKey];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover="hover"
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full flex flex-col rounded-3xl border border-white/10 bg-[#060810]/75 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)] overflow-hidden group relative transition-all duration-500 hover:bg-[#090d1a]/85 hover:border-accent/40 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,229,255,0.12)] h-full"
    >
      {/* Blueprint background lines on hover */}
      <motion.div
        variants={{ hover: { opacity: 0.08 } }}
        initial={{ opacity: 0.02 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="w-full h-[1px] bg-white absolute top-[40%]" />
        <div className="w-[1px] h-full bg-white absolute left-1/3" />
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

      {/* Image Section */}
      <div className="p-4 sm:p-5 pb-0 relative z-10">
        <motion.div
          variants={{ hover: { y: -4 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full aspect-[16/10] rounded-2xl border border-white/10 overflow-hidden relative group/img bg-[#030303] shadow-lg"
        >
          {/* Status Tag */}
          <div className={`absolute top-3 left-3 z-30 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#050505]/90 backdrop-blur-md border ${status.border}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            <span className={`text-[9px] font-mono tracking-widest uppercase ${status.color}`}>
              {status.label}
            </span>
          </div>

          {/* Quick Preview Trigger Button Overlay */}
          {onOpenQuickPreview && (
            <button
              onClick={() => onOpenQuickPreview(project)}
              aria-label={`Quick Preview for ${project.title}`}
              className="absolute top-3 right-3 z-30 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#060810]/90 border border-white/20 text-[#00E5FF] text-[10px] font-mono font-bold opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 shadow-xl hover:bg-[#00E5FF]/20 focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
          )}

          {/* Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover scale-[1.01] group-hover/img:scale-[1.04] transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] relative z-0"
          />
        </motion.div>

        {/* Timeline Indicator Strip */}
        <div className="mt-3 px-1 flex items-center justify-between text-[9px] font-mono tracking-wider text-secondary/50">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#00E5FF]/80" />
            {project.completionDate ? `Completed ${project.completionDate}` : project.duration}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-secondary/40" />
            {project.complexity}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 pt-3 relative z-10">
        <div className="flex flex-col gap-1 mb-3">
          <div className="flex items-start justify-between gap-1.5">
            <h4 className="text-lg font-heading font-bold text-white tracking-tight leading-snug">{project.title}</h4>
            <span className="text-[9px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 rounded border border-[#00E5FF]/20 uppercase shrink-0">
              {project.category}
            </span>
          </div>
          <p className="text-xs font-medium text-secondary/70 line-clamp-2 leading-relaxed">{project.subtitle}</p>
        </div>

        {/* Key Impact Metric */}
        <div className="inline-flex items-center gap-1.5 text-[9.5px] font-mono tracking-widest text-accent uppercase bg-accent/5 px-2.5 py-1 rounded-lg border border-accent/10 mb-4 self-start">
          <div className="w-1 h-1 rounded-full bg-accent/50" />
          <span className="truncate max-w-[200px]">{project.impact}</span>
        </div>

        {/* Clickable Tech Stack Tags */}
        <div className="mb-4">
          <TechnologyTags
            techStack={project.techStack}
            selectedTech={selectedTech}
            onSelectTech={onSelectTech}
            limit={3}
          />
        </div>

        {/* Primary CTAs */}
        <div className="mt-auto pt-3 border-t border-white/5 flex flex-col gap-2.5">
          <button
            onClick={() => onOpenCaseFile(project.id)}
            aria-label={`Open case file for ${project.title}`}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-accent/40 hover:border-accent/70 bg-accent/10 hover:bg-accent/20 backdrop-blur-md transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.1)] hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] active:scale-[0.98] group/btn focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
          >
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest flex items-center gap-1.5">
              <FolderOpen className="w-3.5 h-3.5" /> OPEN CASE FILE
            </span>
            <motion.svg
              variants={{ hover: { x: 3 } }}
              transition={{ duration: 0.3 }}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </motion.svg>
          </button>

          {/* Graceful Links Grid */}
          <div className="grid grid-cols-2 gap-2">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live Demo for ${project.title}`}
                className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.01] hover:bg-white/[0.05] hover:border-white/20 transition-all text-[9.5px] font-mono tracking-wider text-secondary/70 hover:text-white focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
              >
                <ExternalLink className="w-3 h-3 text-[#00E5FF]" />
                Live Demo
              </a>
            ) : (
              <button
                disabled
                className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/5 bg-white/[0.01] text-[9.5px] font-mono text-secondary/30 opacity-50 cursor-not-allowed"
              >
                Demo N/A
              </button>
            )}

            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub Repository for ${project.title}`}
                className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.01] hover:bg-white/[0.05] hover:border-white/20 transition-all text-[9.5px] font-mono tracking-wider text-secondary/70 hover:text-white focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
              >
                <GithubIcon className="w-3 h-3 text-white" />
                GitHub
              </a>
            ) : (
              <button
                disabled
                className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/5 bg-white/[0.01] text-[9.5px] font-mono text-secondary/30 opacity-50 cursor-not-allowed"
              >
                GitHub N/A
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
