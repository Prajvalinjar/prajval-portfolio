"use client";

import { useState, useMemo, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types/project";
import { FilterCategory, filterProjects, calculateFilterCounts } from "@/lib/filters";
import { searchProjects, getSearchSuggestions } from "@/lib/search";
import FeaturedProjectCard from "./FeaturedProjectCard";
import ProjectCard from "./ProjectCard";
import ProjectSearch from "./ProjectSearch";
import ProjectFilters from "./ProjectFilters";
import ProjectStats from "./ProjectStats";
import ProjectModal from "./ProjectModal";
import { SearchX, RotateCcw } from "lucide-react";

interface ProjectsCenterProps {
  projects: Project[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: FilterCategory;
  setActiveCategory: (category: FilterCategory) => void;
  selectedTech: string | null;
  setSelectedTech: (tech: string | null) => void;
  onOpenCaseFile: (projectId: string) => void;
}

export default function ProjectsCenter({
  projects,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  selectedTech,
  setSelectedTech,
  onOpenCaseFile
}: ProjectsCenterProps) {
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const pathname = usePathname();

  // Automatically reset modal on route/navigation/hash changes
  useEffect(() => {
    setPreviewProject(null);
  }, [pathname]);

  useEffect(() => {
    const handleClose = () => {
      setPreviewProject(null);
    };

    window.addEventListener("closeModals", handleClose);
    window.addEventListener("hashchange", handleClose);
    window.addEventListener("popstate", handleClose);

    return () => {
      window.removeEventListener("closeModals", handleClose);
      window.removeEventListener("hashchange", handleClose);
      window.removeEventListener("popstate", handleClose);
    };
  }, []);

  // 1. Calculate live counts for all chips from full projects dataset
  const filterCounts = useMemo(() => calculateFilterCounts(projects), [projects]);

  // 2. Perform search filtering
  const searchedProjects = useMemo(
    () => searchProjects(projects, searchQuery),
    [projects, searchQuery]
  );

  // 3. Perform category & technology filtering
  const filteredProjects = useMemo(
    () => filterProjects(searchedProjects, activeCategory, selectedTech),
    [searchedProjects, activeCategory, selectedTech]
  );

  const featuredProject = filteredProjects.find((p) => p.id === "resumeiq-ai");
  const otherProjects = filteredProjects.filter((p) => p.id !== "resumeiq-ai");

  const resetAllFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setSelectedTech(null);
  };

  return (
    <div className="flex flex-col w-full min-w-0 relative px-4 sm:px-0">
      {/* Mobile Ambient HUD Pulse Node (1 cyan beacon, mobile only) */}
      <div className="hud-node-container top-10 left-5 sm:hidden" aria-hidden="true">
        <div className="hud-node-dot hud-node-dot-cyan" />
        <div className="hud-pulse-ring hud-ring-cyan" />
      </div>
      {/* Quick Preview Modal */}
      <AnimatePresence>
        {previewProject && (
          <ProjectModal
            project={previewProject}
            onClose={() => setPreviewProject(null)}
            onOpenCaseFile={onOpenCaseFile}
            onSelectTech={(tech) => setSelectedTech(tech)}
          />
        )}
      </AnimatePresence>

      {/* Chapter Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <div className="text-accent text-[10px] font-mono tracking-widest uppercase mb-3">
          CHAPTER 03
        </div>
        <h2 className="text-4xl sm:text-5xl font-heading font-bold text-[#00E5FF] tracking-tight mb-2 drop-shadow-lg uppercase">
          PROJECT INTELLIGENCE CENTER
        </h2>
        <h3 className="text-lg sm:text-xl font-mono tracking-wide text-secondary/60 mb-4">
          The central hub of all engineering projects.
        </h3>
        <p className="text-sm text-secondary/60 max-w-xl leading-relaxed">
          Explore real-world problem statements, technical decision logs, and live architecture blueprints.
        </p>
      </motion.div>

      {/* Controls Bar: Search & Filter Chips */}
      <div className="flex flex-col gap-4 mb-8 relative z-20 w-full min-w-0">
        {/* Row 1: Search Bar */}
        <div className="w-full sm:w-[360px] min-w-0">
          <ProjectSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        {/* Row 2: Filter Chips Horizontal Scroll Container */}
        <div className="w-full min-w-0 max-w-full overflow-x-auto overflow-y-hidden pb-1">
          <ProjectFilters
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            counts={filterCounts}
            selectedTech={selectedTech}
            onClearTechFilter={() => setSelectedTech(null)}
          />
        </div>
      </div>

      {/* Dynamic Statistics Strip */}
      <ProjectStats
        filteredProjects={filteredProjects}
        totalProjectsCount={projects.length}
      />

      {/* Projects Grid Container */}
      <AnimatePresence mode="popLayout">
        {/* Flagship Featured Product */}
        {featuredProject && (
          <motion.div
            key="flagship"
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-16"
          >
            <h3 className="text-[10px] font-mono tracking-widest text-accent uppercase mb-6 flex items-center gap-2">
              ⭐ FLAGSHIP PRODUCT
              <span className="text-secondary/40 ml-2 hidden sm:inline normal-case tracking-normal">
                AI resume intelligence platform.
              </span>
              <div className="flex-1 h-[1px] bg-white/5 ml-4" />
            </h3>
            <FeaturedProjectCard
              project={featuredProject}
              onOpenCaseFile={onOpenCaseFile}
              onOpenQuickPreview={(p) => setPreviewProject(p)}
              onSelectTech={(tech) => setSelectedTech(tech)}
              selectedTech={selectedTech}
            />
          </motion.div>
        )}

        {/* Other Projects Grid */}
        {otherProjects.length > 0 && (
          <motion.div key="other" layout className="w-full">
            <h3 className="text-[10px] font-mono tracking-widest text-accent uppercase mb-6 flex items-center gap-2">
              Other Deployments ({otherProjects.length})
              <div className="flex-1 h-[1px] bg-white/5 ml-4" />
            </h3>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <AnimatePresence>
                {otherProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="h-full"
                  >
                    <ProjectCard
                      project={project}
                      index={idx}
                      onOpenCaseFile={onOpenCaseFile}
                      onOpenQuickPreview={(p) => setPreviewProject(p)}
                      onSelectTech={(tech) => setSelectedTech(tech)}
                      selectedTech={selectedTech}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* No Results Found State with Helpful Suggestions */}
        {filteredProjects.length === 0 && (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full flex flex-col items-center justify-center py-20 px-6 border border-white/10 border-dashed rounded-3xl bg-[#060810]/60 backdrop-blur-md text-center my-8"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-secondary/40 mb-4">
              <SearchX className="w-7 h-7 text-[#00E5FF]/60" />
            </div>
            <h4 className="text-xl font-heading font-bold text-white mb-2">No Deployments Found</h4>
            <p className="text-sm text-secondary/60 max-w-md mb-6">
              No projects matched your active search query or filter selection. Try adjusting your parameters.
            </p>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-lg">
              <span className="text-[10px] font-mono text-secondary/40 uppercase mr-1">Try searching:</span>
              {getSearchSuggestions().slice(0, 5).map((sug) => (
                <button
                  key={sug}
                  onClick={() => setSearchQuery(sug)}
                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-secondary/80 hover:text-white hover:border-[#00E5FF]/40 transition-colors"
                >
                  {sug}
                </button>
              ))}
            </div>

            <button
              onClick={resetAllFilters}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#00E5FF]/20 transition-all focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
