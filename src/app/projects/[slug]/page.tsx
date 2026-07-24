"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CASE_STUDIES, CaseStudy } from "@/data/caseStudiesData";
import Background from "@/components/Background";
import LeftNavigation from "@/components/journey/LeftNavigation";
import Architecture from "@/components/case-file/Architecture";
import AIPipeline from "@/components/case-file/AIPipeline";
import { ArrowLeft, ArrowRight, ExternalLink, Database, CheckCircle2, FileText, Activity } from "lucide-react";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function CaseFilePage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<CaseStudy | null>(null);

  const slug = params?.slug as string;

  useEffect(() => {
    if (slug && CASE_STUDIES[slug]) {
      setProject(CASE_STUDIES[slug]);
      window.scrollTo(0, 0);
    } else if (slug) {
      router.push("/#projects");
    }
  }, [slug, router]);

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Calculate Previous and Next Case Study navigation
  const studyKeys = Object.keys(CASE_STUDIES);
  const currentIndex = studyKeys.indexOf(slug);
  
  const prevIndex = (currentIndex - 1 + studyKeys.length) % studyKeys.length;
  const prevSlug = studyKeys[prevIndex];
  const prevProject = CASE_STUDIES[prevSlug];

  const nextIndex = (currentIndex + 1) % studyKeys.length;
  const nextSlug = studyKeys[nextIndex];
  const nextProject = CASE_STUDIES[nextSlug];

  const handleBackToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/#projects");
    }
  };

  const handleNavigateCaseFile = (e: React.MouseEvent, targetSlug: string) => {
    e.preventDefault();
    router.push(`/projects/${targetSlug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative flex flex-col flex-1 items-center justify-start w-full min-h-screen bg-[#050505] text-white">
      <Background />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 w-full relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start w-full relative">
          {/* Permanent Sidebar Navigation */}
          <aside className="w-full lg:w-[265px] shrink-0 lg:sticky lg:top-20 z-40">
            <LeftNavigation />
          </aside>

          {/* Main Case Study Content */}
          <main className="flex-1 w-full min-w-0 z-10 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col w-full max-w-5xl mx-auto"
            >
              {/* Back Bar & Case Number */}
              <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-5">
                <button
                  onClick={handleBackToProjects}
                  aria-label="Back to Projects"
                  className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#00E5FF] uppercase hover:text-[#00E5FF]/80 transition-colors focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none rounded-lg p-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  ← Back to Projects
                </button>

                <div className="text-[10px] font-mono tracking-widest text-secondary/50 uppercase">
                  CASE FILE #{project.projectNum}
                </div>
              </div>

              {/* 1. HERO BANNER & METADATA */}
              <div className="flex flex-col xl:flex-row gap-10 lg:gap-14 items-start justify-center mb-16">
                <div className="flex-1 flex flex-col justify-center w-full">
                  <span className="text-[10px] font-mono tracking-widest text-accent/90 uppercase mb-3">
                    Verified Technical Case Study
                  </span>
                  <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight mb-3 uppercase">
                    {project.title}
                  </h1>
                  <p className="text-lg font-medium text-secondary/80 mb-8">{project.subtitle}</p>

                  {/* Meta Matrix */}
                  <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-8 pb-8 border-b border-white/5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-mono tracking-widest text-secondary/40 uppercase">Status</span>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                        <span className="text-xs font-semibold text-white">{project.status}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-mono tracking-widest text-secondary/40 uppercase">Duration</span>
                      <span className="text-xs font-semibold text-white">{project.duration}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-mono tracking-widest text-secondary/40 uppercase">Role</span>
                      <span className="text-xs font-semibold text-white">{project.role}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-mono tracking-widest text-secondary/40 uppercase">Platform</span>
                      <span className="text-xs font-semibold text-white">{project.platform}</span>
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="flex flex-wrap gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-[#00E5FF] text-[#050505] hover:bg-[#00E5FF]/90 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)] focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
                      >
                        <GithubIcon className="w-4 h-4" />
                        GitHub Repository
                      </a>
                    )}
                    {project.docUrl && (
                      <a
                        href={project.docUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] text-secondary/80 text-xs font-semibold flex items-center justify-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
                      >
                        <FileText className="w-4 h-4 text-secondary/50" />
                        Documentation
                      </a>
                    )}
                  </div>
                </div>

                {/* Hero Image */}
                <div className="w-full xl:w-[50%] shrink-0 flex flex-col">
                  <div className="w-full aspect-[4/3] rounded-2xl border border-white/10 overflow-hidden relative bg-[#030303] shadow-2xl">
                    <div className="absolute inset-3 border border-white/5 rounded-xl z-20 pointer-events-none" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between px-3 mt-3 text-[9px] font-mono tracking-widest text-secondary/40 uppercase">
                    <span>CAD ARCHIVE // {project.projectNum}</span>
                    <span>VERIFIED PRODUCT</span>
                  </div>
                </div>
              </div>

              {/* 2. OVERVIEW */}
              <div className="mb-14 border-t border-white/10 pt-10 flex flex-col gap-3">
                <h3 className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
                  [01] Project Overview
                </h3>
                <p className="text-sm sm:text-base text-secondary/80 leading-relaxed max-w-3xl">
                  {project.overview}
                </p>
              </div>

              {/* 3. PROBLEM STATEMENT */}
              <div className="mb-14 border-t border-white/10 pt-10 flex flex-col gap-3">
                <h3 className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
                  [02] Problem Statement
                </h3>
                <p className="text-sm sm:text-base text-secondary/80 leading-relaxed max-w-3xl">
                  {project.problemStatement}
                </p>
              </div>

              {/* 4. RESEARCH & DISCOVERY */}
              <div className="mb-14 border-t border-white/10 pt-10 flex flex-col gap-3">
                <h3 className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
                  [03] Research & Discovery
                </h3>
                <p className="text-sm sm:text-base text-secondary/80 leading-relaxed max-w-3xl">
                  {project.research}
                </p>
              </div>

              {/* 5. SPRINT PLANNING & ROADMAP */}
              <div className="mb-14 border-t border-white/10 pt-10 flex flex-col gap-3">
                <h3 className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
                  [04] Sprint Planning & Execution
                </h3>
                <p className="text-sm sm:text-base text-secondary/80 leading-relaxed max-w-3xl">
                  {project.planning}
                </p>
              </div>

              {/* 6. ARCHITECTURE & SYSTEM DESIGN */}
              <div className="mb-14 border-t border-white/10 pt-10 flex flex-col gap-6">
                <h3 className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
                  [05] Architecture & System Design
                </h3>
                <p className="text-sm sm:text-base text-secondary/80 leading-relaxed max-w-3xl">
                  {project.architecture.description}
                </p>

                {/* Architecture Components Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.architecture.components.map((c, i) => (
                    <div key={i} className="p-5 rounded-2xl border border-white/10 bg-[#060810]/75 flex flex-col gap-2">
                      <span className="text-[9px] font-mono text-[#00E5FF] uppercase font-bold">{c.type}</span>
                      <h4 className="text-sm font-bold text-white">{c.name}</h4>
                      <p className="text-xs text-secondary/70 leading-relaxed">{c.details}</p>
                    </div>
                  ))}
                </div>

                {slug === "resumeiq" && (
                  <div className="flex flex-col gap-12 w-full p-6 rounded-2xl bg-[#080808] border border-white/5 mt-4">
                    <Architecture />
                    <AIPipeline />
                  </div>
                )}
              </div>

              {/* 7. TECH STACK SELECTION */}
              <div className="mb-14 border-t border-white/10 pt-10 flex flex-col gap-6">
                <h3 className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
                  [06] Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs font-mono text-secondary/80 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 8. DATABASE DESIGN & SCHEMA */}
              <div className="mb-14 border-t border-white/10 pt-10 flex flex-col gap-6">
                <h3 className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase font-bold flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  [07] Database Design & Schemas
                </h3>
                <p className="text-sm text-secondary/80 leading-relaxed">
                  Engine: <strong className="text-white">{project.databaseDesign.engine}</strong>. {project.databaseDesign.schemaOverview}
                </p>

                {/* Tables Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.databaseDesign.tables.map((t, i) => (
                    <div key={i} className="p-5 rounded-2xl border border-white/10 bg-[#060810]/75 flex flex-col gap-2">
                      <span className="text-xs font-mono font-bold text-[#00E5FF]">{t.name}</span>
                      <p className="text-[11px] font-mono text-secondary/50 break-words">{t.fields}</p>
                      <p className="text-xs text-secondary/70 leading-relaxed mt-1">{t.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 9 & 10. ENGINEERING DECISIONS, CHALLENGES & SOLUTIONS */}
              <div className="mb-14 border-t border-white/10 pt-10 flex flex-col gap-6">
                <h3 className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
                  [08] Engineering Challenges & Solutions
                </h3>

                <div className="flex flex-col gap-4">
                  {project.challenges.map((c, i) => (
                    <div key={i} className="p-5 rounded-2xl border border-white/10 bg-[#060810]/75 flex flex-col gap-2">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        {c.challenge}
                      </h4>
                      <p className="text-xs text-secondary/70 leading-relaxed pl-6">{c.solution}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 11 & 12 & 13. RESULTS & METRICS */}
              <div className="mb-14 border-t border-white/10 pt-10 flex flex-col gap-6">
                <h3 className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase font-bold flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  [09] Results & Key Metrics
                </h3>
                <p className="text-sm sm:text-base text-secondary/80 leading-relaxed max-w-3xl">
                  {project.results}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="p-5 rounded-2xl border border-white/10 bg-[#060810]/75 flex flex-col gap-1 items-center text-center">
                      <span className="text-3xl font-heading font-extrabold text-[#00E5FF]">{m.metric}</span>
                      <span className="text-xs font-mono font-bold text-white uppercase">{m.label}</span>
                      <span className="text-[11px] text-secondary/60 mt-1">{m.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 14. LESSONS LEARNED */}
              <div className="mb-14 border-t border-white/10 pt-10 flex flex-col gap-3">
                <h3 className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
                  [10] Key Lessons Learned
                </h3>
                <p className="text-sm sm:text-base text-secondary/80 leading-relaxed max-w-3xl">
                  {project.lessons}
                </p>
              </div>

              {/* 15. FUTURE IMPROVEMENTS */}
              <div className="mb-16 border-t border-white/10 pt-10 flex flex-col gap-4">
                <h3 className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
                  [11] Future Roadmap & Improvements
                </h3>
                <ul className="flex flex-col gap-2 text-xs text-secondary/80">
                  {project.futureImprovements.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 16. PREVIOUS & NEXT PROJECT NAVIGATION BAR */}
              <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Previous Project */}
                <button
                  onClick={(e) => handleNavigateCaseFile(e, prevSlug)}
                  className="p-5 rounded-2xl border border-white/10 bg-[#060810]/75 hover:bg-white/[0.04] transition-all text-left flex flex-col gap-1 group focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
                >
                  <span className="text-[9.5px] font-mono tracking-widest text-secondary/40 uppercase flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    Previous Case Study
                  </span>
                  <span className="text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                    {prevProject.title}
                  </span>
                  <span className="text-xs text-secondary/60 truncate">{prevProject.subtitle}</span>
                </button>

                {/* Next Project */}
                <button
                  onClick={(e) => handleNavigateCaseFile(e, nextSlug)}
                  className="p-5 rounded-2xl border border-white/10 bg-[#060810]/75 hover:bg-white/[0.04] transition-all text-right flex flex-col gap-1 items-end group focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
                >
                  <span className="text-[9.5px] font-mono tracking-widest text-secondary/40 uppercase flex items-center gap-1">
                    Next Case Study
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                    {nextProject.title}
                  </span>
                  <span className="text-xs text-secondary/60 truncate">{nextProject.subtitle}</span>
                </button>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
