"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle, MessageSquare, Clock, Loader2 } from "lucide-react";
import { useToast } from "@/components/ToastContext";

export default function ContactChapter() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isDownloading, setIsDownloading] = useState(false);

  const { showToast, showCopy, showDownload, showSuccess } = useToast();

  const handleCopyEmail = (e: React.MouseEvent) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText("injarprajval@gmail.com");
      showCopy("injarprajval@gmail.com");
    }
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText("+918788039282");
      showCopy("+91 8788039282");
    }
  };

  const handleResumeOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    showToast("Opening Resume...", "info", "Resume View");
    window.open("/resume", "_blank", "noopener,noreferrer");
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setFormState('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get("content-type");
      let data: any = {};
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        throw new Error(`Server response was not JSON (${res.status}). Please restart your 'npm run dev' server.`);
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setFormState('success');
      showSuccess("Your message has been sent & recorded!", "Message Sent");
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setFormState('idle');
      setErrorMessage(err.message || 'An error occurred. Please try again.');
      showToast(err.message || 'Failed to send message', 'error', 'Error');
    }
  };

  return (
    <section id="contact-chapter" className="relative w-full min-h-screen bg-transparent text-white py-16 overflow-hidden border-t border-white/5">
      
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="w-full h-full bg-grid-pattern" />
      </div>

      <div className="relative z-10 w-full flex flex-col flex-1 pb-10 min-h-full">
        
        {/* Header */}
          <div className="flex flex-col items-start gap-3 mb-10">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <span className="text-[10px] font-mono tracking-widest text-secondary/60 uppercase">CHAPTER 07</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl lg:text-4xl font-heading font-bold text-white uppercase tracking-wider"
            >
              LET'S <span className="text-accent">CONNECT</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-secondary text-base mt-1"
            >
              Interested in working together? I'd be happy to hear from you.
            </motion.p>
          </div>

          {/* 40 / 60 Split layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 w-full flex-1 items-stretch">
            
            {/* LEFT COLUMN: 5/12 (~40%) */}
            <div className="lg:col-span-5 flex flex-col gap-6 w-full">
              
              {/* Contact Information Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col p-5 lg:p-6 border border-white/10 rounded-2xl bg-[#060810]/75 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)] flex-1 justify-between hover:bg-[#090c1a]/85 hover:border-accent/40 transition-all duration-300"
              >
                <div className="flex flex-col gap-6">
                  
                  <div className="flex items-center gap-3 text-accent mb-2">
                     <div className="w-10 h-10 rounded border border-white/10 flex items-center justify-center bg-white/[0.02]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                     </div>
                     <span className="text-xs font-mono tracking-widest text-accent uppercase">Contact Information</span>
                  </div>

                  {/* Name & Role */}
                  <div className="flex flex-col gap-1 border-b border-white/5 pb-5">
                    <span className="text-2xl font-bold text-white tracking-wide">Prajval Mahadev Injar</span>
                    <span className="text-xs text-secondary/60 mt-1">Data Analyst <span className="text-accent">•</span> Full Stack Developer</span>
                  </div>

                  <div className="flex flex-col gap-5 border-b border-white/5 pb-5">
                    <a 
                      href="mailto:injarprajval@gmail.com" 
                      onClick={handleCopyEmail}
                      aria-label="Send email or copy email address to clipboard"
                      className="flex items-center gap-4 group p-1.5 rounded-lg hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
                    >
                      <Mail size={18} className="text-accent group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-secondary/80 group-hover:text-white transition-colors">injarprajval@gmail.com</span>
                    </a>
                    <a 
                      href="tel:+918788039282" 
                      onClick={handleCopyPhone}
                      aria-label="Call phone or copy phone number to clipboard"
                      className="flex items-center gap-4 group p-1.5 rounded-lg hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
                    >
                      <Phone size={18} className="text-accent group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-secondary/80 group-hover:text-white transition-colors">+91 8788039282</span>
                    </a>
                    <div className="flex items-center gap-4 p-1.5">
                      <MapPin size={18} className="text-accent" />
                      <span className="text-sm font-medium text-secondary/80">Kolhapur, Maharashtra, India</span>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded flex items-center justify-center border border-white/10 bg-white/[0.02]">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                      </div>
                      <span className="text-sm font-bold text-white">Open to Opportunities</span>
                    </div>
                    <span className="text-[11px] text-secondary/50 font-medium pl-8">
                      Internships • Full-Time • Freelance • Collaborations
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* CONNECT WITH ME Header */}
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.3 }}
              >
                <h3 className="text-xs font-mono tracking-widest text-accent uppercase mb-4 pl-1">Connect with me</h3>
                
                {/* Square Cards Row */}
                <div className="grid grid-cols-4 sm:grid-cols-4 gap-3 lg:gap-4 w-full">
                  
                  {/* LinkedIn */}
                  <a 
                    href="https://linkedin.com/in/prajval-injar-8529aa2b2" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="group flex flex-col items-center justify-center aspect-square p-2 lg:p-4 border border-white/10 rounded-xl bg-[#060810]/75 backdrop-blur-md shadow-sm hover:bg-[#0A66C2]/15 hover:border-[#0A66C2]/40 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 relative overflow-hidden focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
                  >
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0A66C2]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <svg className="absolute top-2 right-2 w-3 h-3 text-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    <svg className="w-7 h-7 lg:w-9 lg:h-9 text-[#0A66C2] group-hover:scale-105 transition-transform duration-300 mb-2 lg:mb-3 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="text-[9px] lg:text-[10px] font-medium text-white/70 relative z-10">Connect</span>
                  </a>

                  {/* GitHub */}
                  <a 
                    href="https://github.com/PrajvalInjar" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="group flex flex-col items-center justify-center aspect-square p-2 lg:p-4 border border-white/10 rounded-xl bg-[#060810]/75 backdrop-blur-md shadow-sm hover:bg-white/15 hover:border-white/30 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 relative overflow-hidden focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
                  >
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <svg className="absolute top-2 right-2 w-3 h-3 text-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    <svg className="w-7 h-7 lg:w-9 lg:h-9 text-white group-hover:scale-105 transition-transform duration-300 mb-2 lg:mb-3 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="text-[9px] lg:text-[10px] font-medium text-white/70 relative z-10">View Code</span>
                  </a>

                  {/* Resume */}
                  <a 
                    href="/resume"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleResumeOpen}
                    aria-label="View Resume PDF in Browser"
                    className="group flex flex-col items-center justify-center aspect-square p-2 lg:p-4 border border-white/10 rounded-xl bg-[#060810]/75 backdrop-blur-md shadow-sm hover:bg-[#00E5FF]/15 hover:border-[#00E5FF]/40 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 relative overflow-hidden focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
                  >
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#00E5FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <svg className="absolute top-2 right-2 w-3 h-3 text-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    <svg className="w-7 h-7 lg:w-9 lg:h-9 text-[#00E5FF] group-hover:scale-105 transition-transform duration-300 mb-2 lg:mb-3 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <line x1="10" y1="9" x2="8" y2="9" />
                    </svg>
                    <span className="text-[9px] lg:text-[10px] font-medium text-white/70 relative z-10 whitespace-nowrap">View Resume</span>
                  </a>

                  {/* Email */}
                  <a 
                    href="mailto:injarprajval@gmail.com" 
                    onClick={handleCopyEmail}
                    aria-label="Send Email or Copy Email address"
                    className="group flex flex-col items-center justify-center aspect-square p-2 lg:p-4 border border-white/10 rounded-xl bg-[#060810]/75 backdrop-blur-md shadow-sm hover:bg-[#EA4335]/15 hover:border-[#EA4335]/40 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 relative overflow-hidden focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
                  >
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#EA4335]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <svg className="absolute top-2 right-2 w-3 h-3 text-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    <svg className="w-7 h-7 lg:w-9 lg:h-9 group-hover:scale-105 transition-transform duration-300 mb-2 lg:mb-3 relative z-10" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M17 20.5v-10l4.5-3.4c.5-.4 1.5-.1 1.5 1v10.9c0 .8-.7 1.5-1.5 1.5z"/>
                      <path fill="#34A853" d="M2.5 20.5A1.5 1.5 0 011 19V8.1c0-1.1 1-1.4 1.5-1l4.5 3.4v10z"/>
                      <path fill="#EA4335" d="M17 10.5l-5 3.8-5-3.8v-7.1c0-.9 1-1.4 1.7-.8L12 5.1l3.3-2.5c.7-.5 1.7 0 1.7.8z"/>
                      <path fill="#FBBC04" d="M23 7.1L17 10.5v-7.1h6z"/>
                      <path fill="#C5221F" d="M1 7.1L7 10.5v-7.1H1z"/>
                    </svg>
                    <span className="text-[9px] lg:text-[10px] font-medium text-white/70 relative z-10">Contact</span>
                  </a>

                </div>
              </motion.div>

            </div>

            {/* RIGHT COLUMN: Contact Form (7/12 ~ 60%) */}
            <div className="lg:col-span-7 flex flex-col w-full h-full">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col flex-1 border border-white/10 rounded-2xl bg-[#060810]/75 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)] relative overflow-hidden"
              >
                
                {/* Form Header */}
                <div className="p-8 lg:px-10 lg:pt-10 lg:pb-6 border-b border-white/5 bg-white/[0.01]">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-accent shadow-sm">
                       <MessageSquare size={20} />
                     </div>
                     <div className="flex flex-col">
                       <h3 className="text-sm font-mono tracking-widest text-accent uppercase font-bold">Send a Message</h3>
                       <p className="text-sm text-secondary/70 mt-1">Fill out the form below and I'll get back to you.</p>
                     </div>
                   </div>
                </div>

                <AnimatePresence mode="wait">
                  {formState === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#080808] z-10"
                    >
                      <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 animate-pulse">
                        <CheckCircle size={32} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Message Sent</h3>
                      <p className="text-secondary/80 max-w-sm">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                      <button 
                        onClick={() => { setFormState('idle'); setFormData({name: '', email: '', message: ''}) }}
                        className="mt-8 px-6 py-2 border border-white/10 rounded text-xs font-mono tracking-widest uppercase hover:bg-white/5 transition-colors"
                      >
                        Send Another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col flex-1 p-8 lg:p-10"
                    >
                      <div className="flex flex-col gap-6 flex-1">
                        
                        <div className="relative group">
                          <input 
                            type="text" 
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="peer w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:bg-white/[0.04] transition-colors placeholder-transparent"
                            placeholder="Name"
                          />
                          <label 
                            htmlFor="name" 
                            className="absolute left-4 top-3.5 text-secondary/60 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-6 peer-focus:left-1 peer-focus:text-xs peer-focus:text-accent peer-valid:-top-6 peer-valid:left-1 peer-valid:text-xs pointer-events-none"
                          >
                            Name
                          </label>
                        </div>

                        <div className="relative group mt-3">
                          <input 
                            type="email" 
                            id="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="peer w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:bg-white/[0.04] transition-colors placeholder-transparent"
                            placeholder="Email"
                          />
                          <label 
                            htmlFor="email" 
                            className="absolute left-4 top-3.5 text-secondary/60 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-6 peer-focus:left-1 peer-focus:text-xs peer-focus:text-accent peer-valid:-top-6 peer-valid:left-1 peer-valid:text-xs pointer-events-none"
                          >
                            Email
                          </label>
                        </div>

                        <div className="relative group mt-3 flex-1 flex flex-col">
                          <textarea 
                            id="message"
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            className="peer w-full flex-1 min-h-[140px] bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:bg-white/[0.04] transition-colors placeholder-transparent resize-none"
                            placeholder="Message"
                          />
                          <label 
                            htmlFor="message" 
                            className="absolute left-4 top-3.5 text-secondary/60 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-6 peer-focus:left-1 peer-focus:text-xs peer-focus:text-accent peer-valid:-top-6 peer-valid:left-1 peer-valid:text-xs pointer-events-none"
                          >
                            Message
                          </label>
                        </div>
                      </div>

                      {errorMessage && (
                        <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                          ⚠️ {errorMessage}
                        </div>
                      )}

                      <button 
                        type="submit"
                        disabled={formState === 'submitting'}
                        className="mt-8 w-full py-4 bg-[#0070F3] text-white font-mono text-sm uppercase tracking-widest hover:bg-[#0070F3]/90 active:scale-[0.98] transition-all duration-300 rounded-lg font-bold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,112,243,0.3)] focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
                      >
                        {formState === 'submitting' ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            Send Message
                          </>
                        )}
                      </button>
                      
                      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-secondary/50">
                        <CheckCircle size={14} className="text-secondary/50" />
                        <span>Your information is safe. I respect your privacy.</span>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Form Footer */}
                <div className="px-8 py-4 bg-white/[0.02] border-t border-white/5 flex items-center gap-3">
                  <Clock size={16} className="text-secondary/50" />
                  <span className="text-xs text-secondary/60">Usually replies within 24 hours.</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

      {/* Footer */}
      <footer className="mt-auto w-full relative z-10 pt-16">
        <div className="w-full border-t border-white/5 pt-8 pb-12 flex flex-col items-center gap-8">
            
            {/* AI Assistant Hook */}
            <button 
              onClick={() => {
                const el = document.getElementById('ai-assistant') || document.getElementById('portfolio-ai-chapter');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-mono tracking-widest text-secondary/60 hover:text-white transition-colors flex items-center gap-2 group mx-auto p-2 rounded-lg focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none"
            >
              Need technical details? 
              <span className="text-accent flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Ask the AI Assistant <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </button>

            {/* Copyright */}
            <div className="w-full flex items-center justify-center text-[10px] font-mono tracking-widest uppercase text-secondary/40 px-4">
              <span>© 2026 Prajval Mahadev Injar</span>
            </div>

        </div>
      </footer>

    </section>
  );
}
