import { motion } from "framer-motion";
import { AIResponse } from "@/hooks/usePortfolioAi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTransition } from "@/components/TransitionProvider";

interface AiResponseCardProps {
  response: AIResponse;
  onQuery: (query: string) => void;
}

export default function AiResponseCard({ response, onQuery }: AiResponseCardProps) {
  const [navigating, setNavigating] = useState(false);
  const router = useRouter();
  const { triggerTransition } = useTransition();

  const handleActionClick = () => {
    if (!response.action) return;
    const target = response.action.targetId;
    if (target.startsWith("/projects/")) {
      const slug = target.split("/").pop() || "";
      const title = response.data?.title || (slug === "resumeiq" ? "ResumeIQ AI" : slug === "transitops" ? "TransitOps" : slug === "customer-sales-analysis" ? "Customer Sales Analytics" : "E-Tongue");
      
      const getNumFromSlug = (s: string) => {
        if (s === "resumeiq") return "001";
        if (s === "transitops") return "002";
        if (s === "customer-sales-analysis") return "003";
        if (s === "e-tongue") return "004";
        return "000";
      };
      
      const getImageFromSlug = (s: string) => {
        if (s === "resumeiq") return "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=80";
        if (s === "transitops") return "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop&q=80";
        if (s === "customer-sales-analysis") return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80";
        if (s === "e-tongue") return "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80";
        return "";
      };
      
      triggerTransition(slug, title, getNumFromSlug(slug), getImageFromSlug(slug));
    } else {
      const targetId = target.startsWith("#") ? target.substring(1) : target;
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Auto-scroll/navigation logic after the response is rendered
  useEffect(() => {
    if (response.action?.targetId && response.type !== 'error') {
      // Small delay so user can read the response summary before we jump
      const timer = setTimeout(() => {
        setNavigating(true);
        // Wait a tiny bit longer to show the "Navigating..." state on the button
        setTimeout(() => {
          handleActionClick();
          setNavigating(false);
        }, 800);
      }, 2500); // 2.5 second delay before auto-navigation
      return () => clearTimeout(timer);
    }
  }, [response]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="w-full max-w-4xl mx-auto bg-[#080712]/75 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.1)] rounded-2xl p-8 lg:p-12 relative overflow-hidden mt-8"
    >
      {/* Decorative Blueprint Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-accent/10 border border-accent/20 text-accent">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h4 className="text-sm font-mono tracking-widest uppercase text-white/80">AI Response</h4>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-secondary/40 uppercase">System Ready</span>
          </div>
        </div>

        {/* Summary Text */}
        <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
          {response.summary}
        </p>

        {/* Dynamic Rich Data Rendering */}
        {response.data && (
          <div className="mt-4">
            {response.type === 'project' && (
              <div className="flex flex-col gap-4 p-6 border border-white/5 rounded-xl bg-white/[0.01]">
                <div className="flex items-center justify-between">
                  <h5 className="text-2xl font-heading font-bold text-white">{response.data.title}</h5>
                  <span className="text-[10px] font-mono tracking-widest text-accent uppercase">{response.data.year}</span>
                </div>
                <p className="text-sm text-secondary/80">{response.data.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {response.data.techStack.map((tech: string, i: number) => (
                    <span key={i} className="text-[10px] font-mono tracking-widest uppercase text-secondary/60 border border-white/10 px-2 py-1 rounded bg-white/[0.02]">{tech}</span>
                  ))}
                </div>
              </div>
            )}

            {response.type === 'technology' && (
              <div className="flex items-center gap-6 p-6 border border-white/5 rounded-xl bg-white/[0.01]">
                {response.data.icon ? (
                   <img src={response.data.icon} alt={response.data.name} className="w-16 h-16 object-contain" />
                ) : (
                  <div className="w-16 h-16 rounded bg-black/40 border border-white/10 flex items-center justify-center font-bold text-2xl">{response.data.name.substring(0,2).toUpperCase()}</div>
                )}
                <div className="flex flex-col">
                  <h5 className="text-2xl font-bold text-white">{response.data.name}</h5>
                  <span className="text-xs text-accent font-mono tracking-widest uppercase mt-1">{response.data.proficiency}</span>
                </div>
              </div>
            )}

            {response.type === 'certification' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {response.data.slice(0, 4).map((cert: any, i: number) => (
                  <div key={i} className="flex flex-col gap-2 p-4 border border-white/5 rounded-lg bg-white/[0.01]">
                    <span className="text-sm font-bold text-white truncate">{cert.title}</span>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-secondary/60">{cert.org}</span>
                  </div>
                ))}
              </div>
            )}
            {response.type === 'contact' && (
              <div className="flex flex-col gap-4 p-6 border border-white/5 rounded-xl bg-white/[0.01]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono tracking-widest text-secondary/60 uppercase">Email</span>
                    <span className="text-sm font-bold text-white">{response.data.email}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono tracking-widest text-secondary/60 uppercase">Phone</span>
                    <span className="text-sm font-bold text-white">{response.data.phone}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono tracking-widest text-secondary/60 uppercase">Location</span>
                    <span className="text-sm font-bold text-white">{response.data.location}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono tracking-widest text-secondary/60 uppercase">Availability</span>
                    <span className="text-sm font-bold text-accent">{response.data.availability}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Related Suggestions */}
        {response.related && response.related.length > 0 && (
          <div className="mt-4 border-t border-white/5 pt-6">
            <span className="text-[10px] font-mono tracking-widest text-secondary/60 uppercase mb-4 block">You might also like</span>
            <div className="flex flex-wrap gap-3">
              {response.related.map((suggestion: string, i: number) => (
                <button 
                  key={i}
                  onClick={() => onQuery(suggestion)}
                  className="px-4 py-2 border border-white/10 rounded bg-white/[0.02] hover:bg-white/[0.05] text-xs font-medium text-white/80 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action / Auto-scroll indicator */}
        {response.action && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-6">
            <p className="text-[11px] font-mono tracking-widest text-secondary/50 uppercase">
              {navigating ? 'Navigating to section...' : 'Auto-navigating in 2.5s...'}
            </p>
            <button
              onClick={handleActionClick}
              className="px-6 py-3 border border-white/10 hover:border-accent hover:bg-accent/5 text-white text-xs font-mono tracking-widest uppercase rounded-lg transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center cursor-pointer"
            >
              {navigating ? (
                <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              )}
              {response.action.label}
            </button>
          </div>
        )}

      </div>
    </motion.div>
  );
}
