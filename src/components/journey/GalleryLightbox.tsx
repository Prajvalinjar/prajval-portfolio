"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GalleryImage } from "@/types/journey";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryLightboxProps {
  images: GalleryImage[];
  initialIndex?: number;
  isOpen?: boolean;
  onClose: () => void;
}

export default function GalleryLightbox({
  images,
  initialIndex = 0,
  isOpen = true,
  onClose
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Lock body scroll, listen to keyboard & navigation events
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
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
  }, [isOpen, images.length, onClose]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Image Gallery Lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl pointer-events-auto"
    >
      {/* Backdrop click to close */}
      <div
        onClick={onClose}
        className="absolute inset-0 cursor-pointer"
      />

      {/* Top Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase font-bold px-3 py-1 rounded-md bg-white/5 border border-white/10">
            GALLERY // IMAGE {currentIndex + 1} OF {images.length}
          </span>
          <span className="text-xs font-mono text-secondary/60 hidden sm:inline">
            {currentImage.category}
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          className="p-2 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
          aria-label="Previous Image"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-[#00E5FF]/20 hover:border-[#00E5FF]/40 text-[#00E5FF] transition-all focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
          aria-label="Next Image"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-[#00E5FF]/20 hover:border-[#00E5FF]/40 text-[#00E5FF] transition-all focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Center Main Image Frame */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-5xl max-h-[80vh] w-full flex flex-col items-center justify-center z-10"
      >
        <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-[#030303] shadow-2xl max-h-[70vh]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage.url}
            alt={currentImage.alt}
            className="max-h-[70vh] w-auto object-contain mx-auto"
          />
        </div>

        {/* Caption */}
        <div className="mt-4 p-4 rounded-xl border border-white/10 bg-[#060810]/80 backdrop-blur-md text-center max-w-xl">
          <p className="text-xs font-mono font-medium text-white">{currentImage.caption}</p>
          <p className="text-[10px] font-mono text-secondary/40 mt-1 uppercase">
            Use Left / Right arrow keys to navigate • ESC to exit
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
