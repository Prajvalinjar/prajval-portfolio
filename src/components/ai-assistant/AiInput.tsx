"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface AiInputProps {
  onQuery: (query: string) => void;
  isTyping: boolean;
}

const SUGGESTIONS = [
  "Explain ResumeIQ",
  "Explain TransitOps",
  "Explain Customer Sales Analysis",
  "Explain E-Tongue",
  "Show Engineering Stack",
  "Show Certifications",
  "Download Resume",
  "Why should I hire you?"
];

export default function AiInput({ onQuery, isTyping }: AiInputProps) {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;
    onQuery(input.trim());
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (isTyping) return;
    setInput(suggestion);
    onQuery(suggestion);
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-3xl mx-auto">
      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`relative w-full rounded-2xl transition-all duration-500 overflow-hidden backdrop-blur-xl border ${
          isFocused ? 'bg-[#0a0818]/85 shadow-[0_0_30px_rgba(139,92,246,0.25),inset_0_1px_0_0_rgba(255,255,255,0.15)] border-violet-500/40' : 'bg-[#070612]/75 border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)]'
        }`}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
        
        {/* Glow effect when focused */}
        {isFocused && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-violet-400 to-transparent"
          />
        )}

        <div className="flex items-center px-6 py-5 relative z-10">
          <div className={`mr-4 transition-colors duration-300 ${isFocused ? 'text-violet-400' : 'text-secondary/50'}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
          </div>
          
          <input 
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask about projects, technologies, experience or certifications..."
            className="flex-1 bg-transparent border-none outline-none text-white text-base lg:text-lg placeholder:text-secondary/40 font-medium"
            disabled={isTyping}
          />

          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className={`ml-4 p-2.5 rounded-lg transition-all duration-300 ${
              input.trim() && !isTyping ? 'bg-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:scale-105' : 'bg-white/5 text-secondary/30'
            }`}
          >
            {isTyping ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            )}
          </button>
        </div>
      </motion.form>

      {/* Suggested Queries */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {SUGGESTIONS.map((suggestion, i) => (
          <button
            key={i}
            onClick={() => handleSuggestionClick(suggestion)}
            disabled={isTyping}
            className="px-4 py-2 rounded-full border border-white/10 bg-[#060810]/75 backdrop-blur-md shadow-sm hover:bg-white/10 hover:border-violet-400/40 text-xs font-mono tracking-widest text-secondary hover:text-white transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            {suggestion}
          </button>
        ))}
      </motion.div>
    </div>
  );
}
