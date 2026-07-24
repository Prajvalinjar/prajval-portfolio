"use client";

import { useState } from "react";
import { PROJECTS } from "@/data/projects";
import { FilterCategory } from "@/lib/filters";
import ProjectsCenter from "./ProjectsCenter";
import ProjectsSidebar from "./ProjectsSidebar";
import { useTransition } from "@/components/TransitionProvider";

export default function ProjectsChapter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const { triggerTransition } = useTransition();

  // Calculate counts for sidebar
  const counts: Record<FilterCategory, number> = {
    All: PROJECTS.length,
    AI: PROJECTS.filter((p) => p.category === "AI").length,
    "Data Analytics": PROJECTS.filter((p) => p.category === "Data Analytics").length,
    "Full Stack": PROJECTS.filter((p) => p.category === "Full Stack").length,
    IoT: PROJECTS.filter((p) => p.category === "IoT").length,
    Hackathon: PROJECTS.filter((p) => p.category === "Hackathon").length,
    Completed: PROJECTS.filter((p) => p.status === "Production" || p.status === "Completed").length,
    "In Progress": PROJECTS.filter((p) => p.status === "Research" || p.status === "Prototype" || p.status === "In Progress").length
  };

  const getSlugFromId = (id: string) => {
    if (id === "resumeiq-ai") return "resumeiq";
    if (id === "customer-sales-analytics") return "customer-sales-analysis";
    return id;
  };

  const getNumFromId = (id: string) => {
    if (id === "resumeiq-ai") return "001";
    if (id === "transitops") return "002";
    if (id === "customer-sales-analytics") return "003";
    if (id === "e-tongue") return "004";
    return "000";
  };

  const handleOpenCaseFile = (projectId: string) => {
    const project = PROJECTS.find((p) => p.id === projectId);
    if (!project) return;
    const slug = getSlugFromId(projectId);
    const num = getNumFromId(projectId);
    triggerTransition(slug, project.title, num, project.image);
  };

  return (
    <section id="projects-chapter-section" className="relative w-full min-h-screen bg-transparent z-30 pt-24 pb-32">
      {/* CAD Overlay Guidelines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-8 right-12 text-[8px] font-mono text-white/50 tracking-widest">
          X: 231.88 <br /> Y: 120.11
        </div>
        <div className="w-full h-[1px] bg-white absolute top-10 flex items-center justify-around">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="h-1 w-[1px] bg-white" />
          ))}
        </div>
        <div className="w-[1px] h-full bg-white absolute left-1/4 flex flex-col items-center justify-around">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-1 h-[1px] bg-white" />
          ))}
        </div>
        <div className="w-[1px] h-full bg-white absolute right-1/4" />
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-stretch">
        {/* Main Center Content: Projects Grid */}
        <div className="lg:col-span-8 flex flex-col w-full min-w-0">
          <ProjectsCenter
            projects={PROJECTS}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            selectedTech={selectedTech}
            setSelectedTech={setSelectedTech}
            onOpenCaseFile={handleOpenCaseFile}
          />
        </div>

        {/* Right Sidebar: Stretches full height of section so position:sticky stays active until section ends */}
        <div className="lg:col-span-4 hidden lg:block relative h-full">
          <ProjectsSidebar
            activeCategory={activeCategory as any}
            setActiveCategory={setActiveCategory as any}
            counts={counts as any}
          />
        </div>
      </div>
    </section>
  );
}
