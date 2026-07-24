"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { JOURNEY_MILESTONES, getMilestoneBySlug } from "@/data/journeyData";
import { JourneyMilestone } from "@/types/journey";
import Background from "@/components/Background";
import LeftNavigation from "@/components/journey/LeftNavigation";
import TechnologyTags from "@/components/projects/TechnologyTags";
import GalleryLightbox from "@/components/journey/GalleryLightbox";
import AssetUploadPlaceholder from "@/components/journey/AssetUploadPlaceholder";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar, Award, CheckCircle2, AlertCircle, Images, BookOpen } from "lucide-react";

export default function StoryPage() {
  const params = useParams();
  const router = useRouter();
  const [milestone, setMilestone] = useState<JourneyMilestone | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const slug = params?.slug as string;

  useEffect(() => {
    setIsLightboxOpen(false);
  }, [slug]);

  useEffect(() => {
    const handleClose = () => {
      setIsLightboxOpen(false);
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

  const { scrollYProgress } = useScroll();
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    if (slug) {
      const found = getMilestoneBySlug(slug);
      if (found) {
        setMilestone(found);
        window.scrollTo(0, 0);
      } else {
        router.push("/#journey");
      }
    }
  }, [slug, router]);

  if (!milestone) {
    return (
      <div className="w-full min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00E5FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Previous & Next Chapter navigation calculation
  const currentIndex = JOURNEY_MILESTONES.findIndex((m) => m.slug === slug);
  const prevIndex = (currentIndex - 1 + JOURNEY_MILESTONES.length) % JOURNEY_MILESTONES.length;
  const prevMilestone = JOURNEY_MILESTONES[prevIndex];

  const nextIndex = (currentIndex + 1) % JOURNEY_MILESTONES.length;
  const nextMilestone = JOURNEY_MILESTONES[nextIndex];

  const handleBackToJourney = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLightboxOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("closeModals"));
    }
    router.push("/#journey");
  };

  const handleOpenGallery = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <div className="relative flex flex-col flex-1 items-center justify-start w-full min-h-screen bg-[#050505] text-white">
      <Background />

      {/* Reading Progress Indicator Bar at Top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-[9999] pointer-events-none">
        <motion.div
          style={{ width: progressBarWidth }}
          className="h-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]"
        />
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && milestone.images && milestone.images.length > 0 && (
          <GalleryLightbox
            images={milestone.images}
            initialIndex={lightboxIndex}
            isOpen={isLightboxOpen}
            onClose={() => setIsLightboxOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 w-full relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start w-full relative">
          {/* Permanent Sidebar Navigation */}
          <aside className="w-full lg:w-[265px] shrink-0 lg:sticky lg:top-20 z-40">
            <LeftNavigation />
          </aside>

          {/* Dedicated Main Content Area */}
          <main className="flex-1 w-full min-w-0 z-10 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col w-full max-w-4xl mx-auto"
            >
              {/* Back Bar & Reading Time */}
              <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-5">
                <button
                  onClick={handleBackToJourney}
                  aria-label="Back to Journey timeline"
                  className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#00E5FF] uppercase hover:text-[#00E5FF]/80 transition-colors focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none rounded-lg p-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  ← Back to Journey
                </button>

                <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-secondary/50 uppercase">
                  <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>{milestone.readingTimeMinutes || 3} min read</span>
                </div>
              </div>

              {/* HERO SECTION */}
              <div className="flex flex-col gap-6 mb-12">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#00E5FF] px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 uppercase">
                    {milestone.year} // {milestone.categoryLabel}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight uppercase">
                  {milestone.title}
                </h1>

                <p className="text-lg sm:text-xl font-medium text-secondary/80 leading-relaxed">
                  {milestone.subtitle}
                </p>
              </div>

              {/* HERO IMAGE */}
              {milestone.images && milestone.images.length > 0 && (
                <div className="w-full aspect-[16/9] rounded-3xl border border-white/10 overflow-hidden relative bg-[#030303] shadow-2xl mb-14 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={milestone.images[0].url}
                    alt={milestone.images[0].alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/90">
                    <span>{milestone.images[0].caption}</span>
                    <button
                      onClick={() => handleOpenGallery(0)}
                      className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/20 hover:bg-[#00E5FF]/20 hover:border-[#00E5FF]/40 text-[#00E5FF] transition-all flex items-center gap-1.5"
                    >
                      <Images className="w-3.5 h-3.5" />
                      View Fullscreen
                    </button>
                  </div>
                </div>
              )}

              {/* CORE ENGINEERING LESSON QUOTE */}
              <div className="p-6 rounded-2xl border border-[#00E5FF]/30 bg-[#00E5FF]/5 mb-14 shadow-[0_0_20px_rgba(0,229,255,0.08)]">
                <span className="text-[10px] font-mono text-[#00E5FF] uppercase font-bold tracking-widest block mb-1">
                  ENGINEERING LESSON LEARNED
                </span>
                <p className="text-lg sm:text-xl font-heading font-bold text-white italic">
                  "{milestone.lesson}"
                </p>
              </div>

              {/* ARTICLE STORY NARRATIVE */}
              <div className="mb-14 border-t border-white/10 pt-10 flex flex-col gap-4">
                <h3 className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
                  [01] The Story & What Happened
                </h3>
                <p className="text-base sm:text-lg text-secondary/90 leading-relaxed font-sans">
                  {milestone.storyText}
                </p>
              </div>

              {/* WHAT HAPPENED BULLET LIST */}
              <div className="mb-14 border-t border-white/10 pt-10 flex flex-col gap-4">
                <h3 className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
                  [02] Key Events & Milestones
                </h3>
                <ul className="flex flex-col gap-3">
                  {milestone.whatHappened.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-[#060810]/60">
                      <div className="w-2 h-2 rounded-full bg-[#00E5FF] mt-2 shrink-0" />
                      <span className="text-sm text-secondary/80 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CHALLENGES & ACHIEVEMENTS */}
              <div className="mb-14 border-t border-white/10 pt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Challenges */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-xs font-mono tracking-widest text-amber-400 uppercase font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    [03] Challenges Faced
                  </h3>
                  <div className="flex flex-col gap-3">
                    {milestone.challenges.map((c, i) => (
                      <div key={i} className="p-4 rounded-xl border border-amber-400/20 bg-amber-400/5 text-xs text-secondary/80 leading-relaxed">
                        {c}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-xs font-mono tracking-widest text-emerald-400 uppercase font-bold flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    [04] Key Achievements
                  </h3>
                  <div className="flex flex-col gap-3">
                    {milestone.achievements.map((a, i) => (
                      <div key={i} className="p-4 rounded-xl border border-emerald-400/20 bg-emerald-400/5 text-xs text-secondary/80 leading-relaxed flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* TECHNOLOGIES MASTERED */}
              <div className="mb-14 border-t border-white/10 pt-10 flex flex-col gap-4">
                <h3 className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
                  [05] Technologies Mastered
                </h3>
                <TechnologyTags techStack={milestone.techStack} />
              </div>

              {/* RELEVANT PROJECTS */}
              {milestone.relatedProjects && milestone.relatedProjects.length > 0 && (
                <div className="mb-14 border-t border-white/10 pt-10 flex flex-col gap-4">
                  <h3 className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
                    [06] Relevant Projects Built
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {milestone.relatedProjects.map((p) => (
                      <Link
                        key={p.id}
                        href={`/projects/${p.slug}`}
                        className="p-5 rounded-2xl border border-white/10 bg-[#060810]/80 hover:bg-white/[0.04] hover:border-[#00E5FF]/40 transition-all flex items-center justify-between group"
                      >
                        <div className="flex flex-col gap-1">
                          <span className="text-[9.5px] font-mono text-[#00E5FF] uppercase font-bold">Project File</span>
                          <span className="text-sm font-bold text-white group-hover:text-[#00E5FF] transition-colors">{p.title}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-secondary/40 group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* MISSING ASSETS PLACEHOLDER PROMPT */}
              {milestone.missingAssets && milestone.missingAssets.length > 0 && (
                <AssetUploadPlaceholder missingAssets={milestone.missingAssets} />
              )}

              {/* PREVIOUS & NEXT STORY NAVIGATION */}
              <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Previous Story */}
                <button
                  onClick={() => router.push(`/journey/${prevMilestone.slug}`)}
                  className="p-5 rounded-2xl border border-white/10 bg-[#060810]/75 hover:bg-white/[0.04] transition-all text-left flex flex-col gap-1 group focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
                >
                  <span className="text-[9.5px] font-mono tracking-widest text-secondary/40 uppercase flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    Previous Chapter ({prevMilestone.year})
                  </span>
                  <span className="text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                    {prevMilestone.title}
                  </span>
                </button>

                {/* Next Story */}
                <button
                  onClick={() => router.push(`/journey/${nextMilestone.slug}`)}
                  className="p-5 rounded-2xl border border-white/10 bg-[#060810]/75 hover:bg-white/[0.04] transition-all text-right flex flex-col gap-1 items-end group focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
                >
                  <span className="text-[9.5px] font-mono tracking-widest text-secondary/40 uppercase flex items-center gap-1">
                    Next Chapter ({nextMilestone.year})
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                    {nextMilestone.title}
                  </span>
                </button>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
