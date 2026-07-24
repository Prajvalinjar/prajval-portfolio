"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, RefreshCw, User, ArrowRight, Bot } from "lucide-react";
import { AIResponse } from "@/hooks/usePortfolioAi";
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  sender: "user" | "elara";
  text: string;
  isStreaming?: boolean;
  responseData?: AIResponse;
  timestamp: string;
}

const SUGGESTION_CHIPS = [
  { label: "ResumeIQ AI", query: "Tell me about ResumeIQ AI project" },
  { label: "TransitOps", query: "What is TransitOps project?" },
  { label: "Customer Sales Analysis", query: "Tell me about Customer Sales Analysis" },
  { label: "Engineering Stack", query: "What technologies do you use?" },
  { label: "Professional Growth", query: "What is your work experience?" },
  { label: "Certifications", query: "What certifications do you hold?" },
  { label: "Contact Info", query: "How can I contact Prajval?" },
];

export default function AiAssistantChapter() {
  const router = useRouter();
  const [inputQuery, setInputQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "elara",
      text: "👋 Hi! I'm ELARA — your AI portfolio guide.\n\nI can explain Prajval's projects, technologies, experience, certifications, and career journey. What would you like to explore?",
      timestamp: "JUST NOW",
    },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Isolate scroll ONLY inside the chat container (Never scroll the browser page)
  const scrollToChatBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToChatBottom();
  }, [messages, isThinking]);

  // Character-by-character typewriter streaming effect
  const streamResponseText = (fullText: string, messageId: string, responseData?: AIResponse) => {
    let index = 0;
    const speedMs = 12; // Sleek typing speed

    const timer = setInterval(() => {
      index++;
      const currentText = fullText.slice(0, index);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? { ...msg, text: currentText, isStreaming: index < fullText.length }
            : msg
        )
      );

      scrollToChatBottom();

      if (index >= fullText.length) {
        clearInterval(timer);
        setIsProcessing(false);
      }
    }, speedMs);
  };

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isProcessing) return;

    const timeString = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: timeString,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery("");
    
    // Disable inputs & show thinking indicator
    setIsProcessing(true);
    setIsThinking(true);
    scrollToChatBottom();

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: textToSend }),
      });

      const data: AIResponse = await res.json();

      // Brief thinking pause
      await new Promise((r) => setTimeout(r, 400));
      setIsThinking(false);

      const elaraMsgId = (Date.now() + 1).toString();
      const elaraMsg: Message = {
        id: elaraMsgId,
        sender: "elara",
        text: "",
        isStreaming: true,
        responseData: data,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, elaraMsg]);
      streamResponseText(data.summary, elaraMsgId, data);

    } catch (err) {
      setIsThinking(false);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "elara",
        text: "Prajval Mahadev Injar\n\n📧 Email: injarprajval@gmail.com\n📞 Phone: +91 8788039282\n📍 Location: Kolhapur, Maharashtra",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    if (isProcessing) return;
    setMessages([
      {
        id: "welcome",
        sender: "elara",
        text: "👋 Hi! I'm ELARA — your AI portfolio guide.\n\nI can explain Prajval's projects, technologies, experience, certifications, and career journey. What would you like to explore?",
        timestamp: "JUST NOW",
      },
    ]);
  };

  const handleActionClick = (targetId: string) => {
    if (targetId.startsWith("/projects/")) {
      router.push(targetId);
    } else {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="portfolio-ai-chapter" className="relative w-full py-12 bg-transparent text-white overflow-hidden flex flex-col items-center">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="w-full h-full bg-grid-pattern" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* 1. CHAPTER HEADER */}
        <div className="flex flex-col items-center text-center gap-1.5 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-[#00E5FF]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF] animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest uppercase font-bold">CHAPTER 06</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-heading font-extrabold uppercase tracking-wider text-white drop-shadow-md"
          >
            AI <span className="text-[#00E5FF]">ASSISTANT</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-secondary/80 text-xs sm:text-sm font-medium tracking-wide"
          >
            Ask anything about my engineering work.
          </motion.p>
        </div>

        {/* 2. CHAT CARD CONTAINER WITH FIXED HEIGHT & ISOLATED INTERNAL SCROLL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-3xl mx-auto rounded-2xl border border-white/10 bg-[#060810]/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(0,229,255,0.04)] overflow-hidden flex flex-col h-[500px] sm:h-[530px] relative z-20"
        >
          {/* Chat Window Top Bar */}
          <div className="px-5 py-4 bg-[#080d19]/95 border-b border-white/10 flex items-center justify-between z-10 shrink-0">
            <div className="flex items-center gap-3">
              {/* ELARA AI Avatar Circle */}
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#00E5FF]/25 to-[#00E5FF]/5 border border-[#00E5FF]/40 text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.3)]">
                <Bot className="w-5 h-5 text-[#00E5FF]" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-heading font-bold text-white tracking-wide">ELARA</span>
                  <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-md bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                    AI GUIDE
                  </span>
                </div>
                <span className="text-[10px] font-mono text-secondary/60 tracking-wider">
                  Portfolio Intelligence System • Online
                </span>
              </div>
            </div>

            {/* Reset Chat Button */}
            <button
              onClick={handleReset}
              disabled={isProcessing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/10 disabled:opacity-40 text-secondary/70 hover:text-white text-xs font-mono transition-colors cursor-pointer"
              title="Reset conversation"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Chat</span>
            </button>
          </div>

          {/* ISOLATED CHAT CONVERSATION CONTAINER (Only this scrolls) */}
          <div 
            ref={chatContainerRef} 
            className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col gap-4 min-h-0 scroll-smooth"
          >
            {messages.map((msg, index) => {
              const isElara = msg.sender === "elara";
              const isFirstWelcome = msg.id === "welcome";

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex flex-col gap-1.5 ${isElara ? "items-start" : "items-end"}`}
                >
                  <div className={`flex items-start gap-3 max-w-[92%] sm:max-w-[82%] ${isElara ? "flex-row" : "flex-row-reverse"}`}>
                    
                    {/* Avatar Icon */}
                    <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-mono ${
                      isElara 
                        ? "bg-[#00E5FF]/15 border border-[#00E5FF]/40 text-[#00E5FF]" 
                        : "bg-white/10 border border-white/20 text-white"
                    }`}>
                      {isElara ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>

                    {/* Message Bubble */}
                    <div className={`flex flex-col gap-2 p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isElara 
                        ? "bg-[#080d19]/90 border border-white/10 text-white/90 rounded-tl-xs shadow-md" 
                        : "bg-[#00E5FF]/15 border border-[#00E5FF]/35 text-white rounded-tr-xs shadow-[0_0_15px_rgba(0,229,255,0.08)]"
                    }`}>
                      <div className="whitespace-pre-line relative">
                        {msg.text}
                        {msg.isStreaming && (
                          <span className="inline-block w-1.5 h-4 ml-1 bg-[#00E5FF] animate-pulse align-middle" />
                        )}
                      </div>

                      {/* Initial Suggestion Chips inside Welcome message */}
                      {isFirstWelcome && index === 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-2">
                          <span className="text-[10px] font-mono text-[#00E5FF] tracking-wider uppercase font-semibold">
                            PROMPT SUGGESTIONS:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {SUGGESTION_CHIPS.map((chip, i) => (
                              <button
                                key={i}
                                disabled={isProcessing}
                                onClick={() => handleSend(chip.query)}
                                className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-[#00E5FF]/15 hover:border-[#00E5FF]/50 text-[#00E5FF] text-[11px] font-mono transition-all text-left flex items-center gap-1.5 group cursor-pointer disabled:opacity-50"
                              >
                                <span>{chip.label}</span>
                                <ArrowRight className="w-3 h-3 text-[#00E5FF] opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action CTA inside ELARA response once streaming finishes */}
                      {!msg.isStreaming && msg.responseData?.action && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between"
                        >
                          <button
                            onClick={() => handleActionClick(msg.responseData!.action!.targetId)}
                            className="px-4 py-2 rounded-lg bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_12px_rgba(0,229,255,0.3)] cursor-pointer"
                          >
                            <span>{msg.responseData.action.label}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Timestamp */}
                  <span className="text-[9px] font-mono text-secondary/40 px-10">
                    {msg.timestamp}
                  </span>
                </motion.div>
              );
            })}

            {/* Thinking Indicator */}
            {isThinking && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-[#00E5FF]/15 border border-[#00E5FF]/40 text-[#00E5FF] flex items-center justify-center">
                  <Bot className="w-4 h-4 animate-pulse" />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-tl-xs bg-[#080d19]/90 border border-white/10 flex items-center gap-2">
                  <span className="text-xs font-mono text-[#00E5FF] tracking-wider">ELARA is processing...</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-[pulse_1s_infinite_100ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-[pulse_1s_infinite_300ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-[pulse_1s_infinite_500ms]" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* PINNED CHAT INPUT BAR */}
          <div className="p-3 sm:p-4 bg-[#04060b]/95 border-t border-white/10 flex flex-col gap-2 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                disabled={isProcessing}
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={isProcessing ? "ELARA is typing..." : "Ask ELARA about projects, stack, experience, certifications..."}
                className="flex-1 bg-[#080d19]/90 border border-white/10 focus:border-[#00E5FF]/60 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-secondary/50 focus:outline-none focus:ring-1 focus:ring-[#00E5FF]/30 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isProcessing}
                className="px-4 py-3 rounded-xl bg-[#00E5FF] hover:bg-[#00E5FF]/90 disabled:opacity-40 disabled:hover:bg-[#00E5FF] text-black font-bold flex items-center justify-center transition-all shadow-[0_0_12px_rgba(0,229,255,0.3)] cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between px-2 text-[9px] font-mono text-secondary/40 tracking-wider">
              <span>Portfolio AI Engine v2.0</span>
              <span className="hidden sm:inline">Press Enter to Send</span>
            </div>
          </div>
        </motion.div>

        {/* 3. BOTTOM CTA BUTTON */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center text-center gap-4 w-full max-w-2xl"
        >
          <p className="text-secondary/80 text-sm sm:text-base font-medium">
            Still have questions? Let's build something together.
          </p>
          <button 
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 bg-white text-[#050505] font-mono text-xs uppercase tracking-widest hover:bg-[#00E5FF] transition-all duration-300 rounded-lg font-bold shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] cursor-pointer"
          >
            Contact Me
          </button>
        </motion.div>

      </div>
    </section>
  );
}


