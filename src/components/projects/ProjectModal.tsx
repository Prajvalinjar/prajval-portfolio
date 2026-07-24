"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import TechnologyTags from "./TechnologyTags";
import { X, ExternalLink, FolderOpen, Calendar, Clock, Activity, CheckCircle2 } from "lucide-react";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenCaseFile: (id: string) => void;
  onSelectTech?: (tech: string) => void;
}

export default function ProjectModal({
  project,
  onClose,
  onOpenCaseFile,
  onSelectTech
}: ProjectModalProps) {
  // ESC key & navigation listeners
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        onClose();
      }
    };

    const handleCloseEvents = () => {
      onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", handleCloseEvents);
    window.addEventListener("hashchange", handleCloseEvents);
    window.addEventListener("closeModals", handleCloseEvents);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handleCloseEvents);
      window.removeEventListener("hashchange", handleCloseEvents);
      window.removeEventListener("closeModals", handleCloseEvents);
      document.body.style.overflow = originalOverflow || "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Quick Preview: ${project.title}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#060810]/95 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(0,229,255,0.1)] text-white p-6 sm:p-8 z-10 custom-scrollbar"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
              QUICK PREVIEW // {project.category}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_6px_#00E5FF] animate-pulse" />
          </div>

          <button
            onClick={onClose}
            aria-label="Close preview modal"
            className="p-1.5 rounded-xl border border-white/10 bg-white/5 text-secondary/60 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image & Quick Stats */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="w-full aspect-[16/10] rounded-2xl border border-white/10 overflow-hidden relative bg-[#030303] shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#050505]/90 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#00E5FF] uppercase font-bold">
                {project.status}
              </div>
            </div>

            {/* Timeline Strip */}
            <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-3">
              <span className="text-[10px] font-mono tracking-widest text-secondary/40 uppercase">Project Timeline & Status</span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono text-secondary/40 uppercase flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#00E5FF]" /> Started
                  </span>
                  <span className="font-semibold text-white">{project.startDate || "N/A"}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono text-secondary/40 uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Completed
                  </span>
                  <span className="font-semibold text-white">{project.completionDate || "N/A"}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono text-secondary/40 uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#00E5FF]" /> Duration
                  </span>
                  <span className="font-semibold text-white">{project.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <h3 className="text-3xl font-heading font-extrabold text-white tracking-tight uppercase mb-1">
                {project.title}
              </h3>
              <p className="text-sm font-medium text-secondary/80">{project.subtitle}</p>
            </div>

            {/* Impact Metric */}
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#00E5FF] bg-[#00E5FF]/10 px-4 py-2 rounded-xl border border-[#00E5FF]/20 self-start">
              <Activity className="w-4 h-4" />
              <span>{project.impact}</span>
            </div>

            {/* Mission & Solution */}
            <div className="flex flex-col gap-3 text-xs text-secondary/80 leading-relaxed">
              <div>
                <h4 className="text-[10px] font-mono text-secondary/40 uppercase font-bold mb-1">Mission</h4>
                <p>{project.mission}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-mono text-secondary/40 uppercase font-bold mb-1">Solution</h4>
                <p>{project.solution}</p>
              </div>
            </div>

            {/* Clickable Tech Stack Tags */}
            <div>
              <h4 className="text-[10px] font-mono text-secondary/40 uppercase font-bold mb-2">Technologies (Click to Filter)</h4>
              <TechnologyTags
                techStack={project.techStack}
                onSelectTech={(tech) => {
                  if (onSelectTech) onSelectTech(tech);
                  onClose();
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10 mt-2">
              <button
                onClick={() => {
                  onOpenCaseFile(project.id);
                  onClose();
                }}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-[#00E5FF]/40 bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 text-[#00E5FF] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)] focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
              >
                <FolderOpen className="w-4 h-4" />
                Open Case File
              </button>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
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
                  className="w-full sm:w-auto py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
                >
                  <GithubIcon className="w-4 h-4 text-white" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
