"use client";

import React from "react";

interface TechLogoProps {
  id: string;
  className?: string;
}

export default function TechLogo({ id, className = "w-8 h-8" }: TechLogoProps) {
  switch (id) {
    case "python":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.87 2c-4.4 0-4.13 1.91-4.13 1.91l.01 1.98h4.21v.6H6.1s-2.73-.31-2.73 4.12c0 4.43 2.38 4.27 2.38 4.27h1.42v-2.02s-.08-2.38 2.38-2.38h4.09s2.26.03 2.26-2.19V4.28S16.48 2 11.87 2zm-1.18 1.25a.72.72 0 1 1 0 1.44.72.72 0 0 1 0-1.44z" fill="#3776AB"/>
          <path d="M12.13 22c4.4 0 4.13-1.91 4.13-1.91l-.01-1.98h-4.21v-.6h5.86s2.73.31 2.73-4.12c0-4.43-2.38-4.27-2.38-4.27h-1.42v2.02s.08 2.38-2.38 2.38h-4.09s-2.26-.03-2.26 2.19v4.03S7.52 22 12.13 22zm1.18-1.25a.72.72 0 1 1 0-1.44.72.72 0 0 1 0 1.44z" fill="#FFD43B"/>
        </svg>
      );
    case "java":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.3 17.5c2.3.8 5.7.9 8.2.1 2.3-.8 4.1-2 4.1-2s-1 .6-2.6 1c-2.4.6-5.8.5-7.9-.1-1.3-.4-1.8-1-1.8-1s-.1.4 0 2zM12 2C8.5 6 6 8.5 7.5 12c.5 1.2 1.8 2 1.8 2s-.6-.6-.9-1.3c-.6-1.5 0-3.3 1.6-5 1.7-1.8 2.3-3.6 2-5.7z" fill="#EA2D2E"/>
          <path d="M14.5 5.5c.8 1.4.6 3-.4 4.5-1.1 1.7-1.1 2.8-.2 4.1.6.8 1.3 1.4 1.3 1.4s-.7-.6-1.1-1.2c-.8-1.2-.7-2.6.2-4.1 1.1-1.7 1.1-3.2.2-4.7z" fill="#007396"/>
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
          <path d="M12.8 18.5c.7.4 1.6.7 2.6.7 1.3 0 2.1-.6 2.1-1.6 0-1-.7-1.4-2.1-1.9l-.7-.3c-1.9-.7-3.1-1.7-3.1-3.7 0-2.3 1.8-3.9 4.7-3.9 1.2 0 2.2.3 2.9.6l-.7 2.1c-.6-.3-1.4-.5-2.2-.5-1.3 0-2 .6-2 1.4 0 .9.7 1.3 2.1 1.8l.7.3c2.2.8 3.2 1.9 3.2 3.8 0 2.5-1.9 4.1-5.1 4.1-1.4 0-2.7-.4-3.4-.8l1-2.3zM6.5 18.7c.6.4 1.4.6 2.2.6 1.1 0 1.8-.5 1.8-1.7V8h2.8v9.7c0 2.7-1.6 3.9-4.3 3.9-1.2 0-2.2-.3-2.8-.7l.3-2.2z" fill="#000000"/>
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#3178C6"/>
          <path d="M15.4 18.5c.7.4 1.6.7 2.6.7 1.3 0 2.1-.6 2.1-1.6 0-1-.7-1.4-2.1-1.9l-.7-.3c-1.9-.7-3.1-1.7-3.1-3.7 0-2.3 1.8-3.9 4.7-3.9 1.2 0 2.2.3 2.9.6l-.7 2.1c-.6-.3-1.4-.5-2.2-.5-1.3 0-2 .6-2 1.4 0 .9.7 1.3 2.1 1.8l.7.3c2.2.8 3.2 1.9 3.2 3.8 0 2.5-1.9 4.1-5.1 4.1-1.4 0-2.7-.4-3.4-.8l1-2.3zM6 10.3h2.8v8.9h2.7v-8.9h2.8V8H6v2.3z" fill="#FFFFFF"/>
        </svg>
      );
    case "sql":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#00E5FF" strokeWidth="2"/>
          <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="#00E5FF" strokeWidth="2"/>
          <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#00E5FF" strokeWidth="2"/>
        </svg>
      );
    case "react":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        </svg>
      );
    case "nextjs":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#000000" stroke="#FFFFFF" strokeWidth="1.5"/>
          <path d="M14.8 16.5L9.2 8.5H8v7h1.5v-4.8l4.4 6.3h.9z" fill="#FFFFFF"/>
          <path d="M15 8.5h1.5v7H15z" fill="#FFFFFF"/>
        </svg>
      );
    case "tailwind":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6 1 2.4 1.8C13.9 12.1 15.6 14 19.2 14c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-1-2.4-1.8C17.3 7.9 15.6 6 12 6zm-7.2 8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6 1 2.4 1.8 1.3 1.3 3 3.2 6.6 3.2 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-1-2.4-1.8-1.3-1.3-3-3.2-6.6-3.2z" fill="#38BDF8"/>
        </svg>
      );
    case "html5":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 2l1.6 18 7.4 2 7.4-2L21 2H3zm14.4 5h-9l.2 2.5h8.6l-.6 7.2-4.6 1.3-4.6-1.3-.3-3.7h2.4l.2 1.8 2.3.6 2.3-.6.3-3.3H6.8L6 4.5h11.7l-.3 2.5z" fill="#E34F26"/>
        </svg>
      );
    case "css3":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 2l1.6 18 7.4 2 7.4-2L21 2H3zm14.4 5h-9l.2 2.5h8.6l-.6 7.2-4.6 1.3-4.6-1.3-.3-3.7h2.4l.2 1.8 2.3.6 2.3-.6.3-3.3H6.8L6 4.5h11.7l-.3 2.5z" fill="#1572B6"/>
        </svg>
      );
    case "nodejs":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3.5 7v10l8.5 5 8.5-5V7L12 2zm-1 14.5l-4-2.3v-4.6l4 2.3v4.6zm6-2.3l-4 2.3v-4.6l4-2.3v4.6z" fill="#339933"/>
        </svg>
      );
    case "express":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="2" y="16" fill="white" fontFamily="sans-serif" fontWeight="900" fontSize="15" letterSpacing="-1">ex</text>
        </svg>
      );
    case "mysql":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.8 9.5c-.4-.3-.9-.6-1.5-.7-.4.6-.9 1.3-1.4 2 1.1 0 2.1.2 3.1.6.2-.6.1-1.3-.2-1.9zm-4.7 3.5c-.8.8-1.7 1.7-2.7 2.5.5.4 1.1.7 1.8.9.7-.9 1.4-1.9 2-2.9-.4-.2-.7-.3-1.1-.5zm-4.8 3.5c-2.4 0-4.6-.7-6.3-2 1 .8 2.3 1.4 3.7 1.7.8-.8 1.7-1.6 2.6-2.4-.7.8-1.4 1.7-2 2.7zm-2.8-5.3c-.6-.7-1-1.6-1.2-2.5C4 9.4 3.1 10.6 2.6 12c.7.4 1.6.6 2.5.7.4-.7.9-1.4 1.4-2.1z" fill="#00758F"/>
        </svg>
      );
    case "supabase":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.4 2.3a1.5 1.5 0 0 0-2.4.4L3.2 14.8A1.5 1.5 0 0 0 4.5 17h6.1v4.7a1.5 1.5 0 0 0 2.4-.4l7.8-12.1a1.5 1.5 0 0 0-1.3-2.2h-6.1V2.3z" fill="#3ECF8E"/>
        </svg>
      );
    case "openai":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.2 11.2c-.3-2.1-1.6-3.8-3.5-4.6-.4-.2-.8-.3-1.2-.4V4.5c0-1.8-1.2-3.3-2.9-3.8-2-.6-4.1.2-5.2 1.9C8.7 2.2 7.7 2 6.7 2.3 4.9 2.8 3.6 4.3 3.6 6.1v1.7C2 8.7 1 10.4 1.2 12.4c.3 2.1 1.6 3.8 3.5 4.6.4.2.8.3 1.2.4v1.7c0 1.8 1.2 3.3 2.9 3.8 2 .6 4.1-.2 5.2-1.9.7.4 1.7.6 2.7.3 1.8-.5 3.1-2 3.1-3.8v-1.7c1.6-.9 2.6-2.6 2.4-4.6zm-8.8 9.3c-1 0-1.9-.5-2.3-1.3l.8-.5c.3.6.9 1 1.6 1 1 0 1.8-.8 1.8-1.8v-4.7l-1.5.9v2.5h-1v-3.1l3.5-2v.8l-2.5 1.4v.9l3.4-2v4.8c-.1 1.7-1.5 3.1-3.3 3.1z" fill="#10A37F"/>
        </svg>
      );
    case "powerbi":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="12" width="4" height="9" rx="1" fill="#F2C811"/>
          <rect x="10" y="7" width="4" height="14" rx="1" fill="#F2C811"/>
          <rect x="17" y="3" width="4" height="18" rx="1" fill="#F2C811"/>
        </svg>
      );
    case "pandas":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="3" width="4" height="18" fill="#150458"/>
          <rect x="10" y="7" width="4" height="10" fill="#E70488"/>
          <rect x="16" y="3" width="4" height="18" fill="#00C0EF"/>
        </svg>
      );
    case "numpy":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4h4v16H4V4zm12 0h4v16h-4V4zM8 4l8 16h-3L8 7v13H8V4z" fill="#013243"/>
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.7 10.7L13.3 2.3c-.4-.4-1-.4-1.4 0l-1.9 1.9 2.4 2.4c.5-.2 1.1 0 1.4.4.4.4.4 1 0 1.4l-2.4 2.4v5.3c.3.1.6.4.7.7.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4.2-.3.5-.5.8-.7V11c-.3-.2-.5-.4-.8-.7L8.4 12.6c.1.3.1.6 0 .9-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4.3-.3.8-.4 1.2-.2l2.3-2.3v-5.2c-.3-.2-.5-.4-.8-.7-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4-.2.3-.5.5-.8.7v5.2l2.3 2.3c.3-.1.7-.1 1-.1.4 0 .8.1 1.1.4l8.3 8.3c.4.4.4 1 0 1.4z" fill="#F05032"/>
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    case "vscode":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.15 2.587L18.21.79a1.494 1.494 0 0 0-1.705.516L9.67 11.233 4.89 7.6a.997.997 0 0 0-1.378.204L.278 12.04a.998.998 0 0 0 .178 1.413l4.7 3.525-4.7 3.525a.998.998 0 0 0-.178 1.413l3.234 4.236a.997.997 0 0 0 1.378.204l4.78-3.633 6.835 9.927a1.494 1.494 0 0 0 1.705.516l4.94-1.797A1.5 1.5 0 0 0 24 30.153V3.937a1.5 1.5 0 0 0-.85-1.35zM18 18.5L12 12l6-6.5v13z" fill="#007ACC"/>
        </svg>
      );
    case "figma":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" fill="#0ACF83"/>
          <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#A259FF"/>
          <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#F24E1E"/>
          <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" fill="#FF7262"/>
          <path d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" fill="#1ABCFE"/>
        </svg>
      );
    case "vercel":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 1L24 22H0L12 1z" />
        </svg>
      );
    default:
      return (
        <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-xs font-mono font-bold text-white uppercase">
          {id.substring(0, 2)}
        </div>
      );
  }
}
