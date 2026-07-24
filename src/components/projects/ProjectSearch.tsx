"use client";

import React, { useRef, useEffect, useState } from "react";
import { Search, X } from "lucide-react";

interface ProjectSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function ProjectSearch({
  searchQuery,
  setSearchQuery
}: ProjectSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Sync localQuery if parent updates searchQuery
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  // Debounce search update by 250ms for performance
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 250);

    return () => clearTimeout(handler);
  }, [localQuery, setSearchQuery]);

  // Shortcut listener (⌘K or /) to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full xl:w-[360px] shrink-0 group">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/40 group-focus-within:text-[#00E5FF] transition-colors pointer-events-none" />

      <input
        ref={inputRef}
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Search projects, tech, or keywords (e.g., ResumeIQ, Python)..."
        aria-label="Search Project Intelligence Center"
        className="w-full bg-[#060810]/80 border border-white/10 rounded-xl pl-10 pr-14 py-3 text-[13px] text-white placeholder:text-secondary/40 outline-none focus:border-[#00E5FF]/60 focus:ring-2 focus:ring-[#00E5FF]/20 transition-all duration-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
      />

      {localQuery ? (
        <button
          onClick={() => {
            setLocalQuery("");
            setSearchQuery("");
            inputRef.current?.focus();
          }}
          aria-label="Clear search query"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-secondary/50 hover:text-white rounded-md hover:bg-white/10 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      ) : (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[9.5px] font-mono text-secondary/40 pointer-events-none">
          <span>⌘K</span>
        </div>
      )}
    </div>
  );
}
