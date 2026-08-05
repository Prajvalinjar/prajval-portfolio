"use client";

import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { JOURNEY_MILESTONES } from "@/data/journeyData";
import TimelineMilestone from "./TimelineMilestone";
import JourneyStats from "./JourneyStats";
import GalleryLightbox from "./GalleryLightbox";
import RightSidebar from "./RightSidebar";
import { GalleryImage } from "@/types/journey";

export default function JourneyChapter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const pathname = usePathname();

  // Reset lightbox state when pathname or hash or navigation event changes
  useEffect(() => {
    setIsLightboxOpen(false);
  }, [pathname]);

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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress to central timeline line height
  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handleOpenGallery = (images: GalleryImage[], startIndex: number = 0) => {
    setLightboxImages(images);
    setLightboxIndex(startIndex);
    setIsLightboxOpen(true);
  };

  return (
    <section
      ref={containerRef}
      id="journey"
      className="relative w-full min-h-0 lg:min-h-screen bg-transparent z-30 pt-8 pb-12 lg:pt-20 lg:pb-28"
    >
      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {isLightboxOpen && lightboxImages.length > 0 && (
          <GalleryLightbox
            images={lightboxImages}
            initialIndex={lightboxIndex}
            isOpen={isLightboxOpen}
            onClose={() => setIsLightboxOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* CAD Overlay Guidelines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="w-full h-[1px] bg-white absolute top-10" />
        <div className="w-[1px] h-full bg-white absolute left-1/4" />
        <div className="w-[1px] h-full bg-white absolute right-1/4" />
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-stretch px-4 sm:px-0">
        {/* Main Timeline Column */}
        <div className="lg:col-span-8 flex flex-col relative w-full min-w-0">
          {/* Chapter Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-10 ml-0 sm:ml-28"
          >
            <div className="text-accent text-[10px] font-mono tracking-widest uppercase mb-3">
              CHAPTER 02
            </div>
            <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight mb-3 drop-shadow-lg uppercase">
              THE JOURNEY
            </h2>
            <p className="text-secondary/80 text-base sm:text-lg font-medium tracking-wide">
              An interactive documentary of technical evolution.
            </p>
            <p className="mt-4 text-xs sm:text-sm text-secondary/60 max-w-lg leading-relaxed">
              Every milestone represents key decisions, engineering challenges, and continuous growth.<br />
              Click any milestone to expand its story log, view image galleries, or open the full story chapter.
            </p>
          </motion.div>

          {/* Journey Dynamic Statistics Strip */}
          <div className="ml-0 sm:ml-28">
            <JourneyStats />
          </div>

          {/* Timeline Container */}
          <div className="relative w-full">
            {/* Animated central line (aligned at 110px on desktop clear of 100px Year text) */}
            <div className="absolute top-0 bottom-0 left-[16px] sm:left-[110px] w-[1px] bg-white/10" />
            <motion.div
              style={{ height: timelineHeight }}
              className="absolute top-0 left-[16px] sm:left-[110px] w-[1px] bg-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.8)] origin-top"
            />

            {/* Milestones Array */}
            <div className="flex flex-col gap-12 relative z-10">
              {JOURNEY_MILESTONES.map((milestone, index) => (
                <TimelineMilestone
                  key={milestone.id}
                  data={milestone}
                  index={index}
                  onOpenGallery={handleOpenGallery}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Stretches full height of section so position:sticky stays active until section ends */}
        <div className="lg:col-span-4 hidden lg:block relative h-full">
          <RightSidebar scrollProgress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}
