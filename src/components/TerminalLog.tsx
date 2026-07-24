"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const logs = [
  { text: "Initializing Portfolio...", delay: 400 },
  { text: "Checking Local Environment...", delay: 300 },
  { text: "Loading Personal Profile...", delay: 300 },
  { text: "Scanning Featured Projects...", delay: 400 },
  { text: "Connecting GitHub...", delay: 200 },
  { text: "Loading AI Knowledge Base...", delay: 500 },
  { text: "Preparing Interactive Experience...", delay: 300 },
  { text: "Optimizing Rendering Engine...", delay: 400 },
  { text: "System Ready.", delay: 300, isFinal: true }
];

export default function TerminalLog({ onComplete, onTransitionStart }: { onComplete: () => void, onTransitionStart?: () => void }) {
  const [currentLogIndex, setCurrentLogIndex] = useState(-1);
  const [displayedText, setDisplayedText] = useState("");
  const [completedLogs, setCompletedLogs] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 0.8s silence -> 1.2s typing begins
    const initialTimer = setTimeout(() => {
      setCurrentLogIndex(0);
    }, 400); // 400 + 800 (delay in BootSequence) = 1.2s
    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (currentLogIndex === -1) return;

    if (currentLogIndex >= logs.length) {
      // Micro pause of 300ms after System Ready
      setTimeout(() => {
        // Transform to minimal dust!
        if (containerRef.current) {
          const chars = containerRef.current.querySelectorAll('.terminal-char');
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;

          // Trigger Hero Reveal smoothly after dust is mostly dissolved
          setTimeout(() => {
            if (onTransitionStart) onTransitionStart();
          }, 1800);

          gsap.to(chars, {
            duration: 2.5,
            x: (i, el) => {
              const rect = el.getBoundingClientRect();
              // Gentle drift toward center
              const dx = (centerX - rect.left) * 0.15; 
              return dx + (Math.random() * 20 - 10);
            },
            y: (i, el) => {
              const rect = el.getBoundingClientRect();
              // Gentle drift toward center and upward
              const dy = (centerY - rect.top) * 0.15;
              return dy - (Math.random() * 30 + 10);
            },
            opacity: 0,
            scale: (i) => Math.random() * 0.5 + 0.2,
            rotation: () => Math.random() * 45 - 22.5,
            filter: "blur(8px)",
            ease: "power2.inOut",
            stagger: {
              amount: 1.2,
              from: "random"
            },
            onComplete: onComplete
          });
        } else {
          onComplete();
        }
      }, 300);
      return;
    }

    const currentLog = logs[currentLogIndex];
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (charIndex < currentLog.text.length) {
        setDisplayedText(currentLog.text.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        
        setTimeout(() => {
          setCompletedLogs((prev) => [...prev, currentLogIndex]);
          setDisplayedText("");
          setCurrentLogIndex((prev) => prev + 1);
        }, currentLog.delay);
      }
    }, 15);

    return () => clearInterval(typeInterval);
  }, [currentLogIndex, onComplete, onTransitionStart]);

  // Helper to split text into spans for particle animation
  const renderTextAsSpans = (text: string, isSuccess: boolean = false) => {
    return text.split('').map((char, i) => (
      <span key={i} className={`terminal-char inline-block whitespace-pre ${isSuccess ? 'text-success' : ''}`}>
        {char}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="w-full max-w-2xl px-6 font-mono text-sm sm:text-base text-white/90">
      <div className="flex flex-col space-y-2">
        {completedLogs.map((index) => {
          const log = logs[index];
          const isTask = index !== 0 && !log.isFinal;
          
          return (
            <div key={index} className="flex items-center space-x-2">
              <div>{renderTextAsSpans(log.text, log.isFinal)}</div>
              {isTask && (
                <div className="ml-2">{renderTextAsSpans("[ OK ]", true)}</div>
              )}
            </div>
          );
        })}
        
        {currentLogIndex >= 0 && currentLogIndex < logs.length && (
          <div className="flex items-center space-x-2">
            <div>{renderTextAsSpans(displayedText, logs[currentLogIndex].isFinal)}</div>
            <span className="w-2 h-4 bg-white animate-pulse terminal-char" />
          </div>
        )}
      </div>
    </div>
  );
}
