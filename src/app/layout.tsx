import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Prajval's Portfolio",
  description: "Building intelligent products through data, engineering, and thoughtful design.",
  icons: {
    icon: [
      { url: "/favicon_headshot.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon_headshot.png",
    apple: "/favicon_headshot.png",
  },
};

import CustomCursor from "@/components/CustomCursor";
import TransitionProvider from "@/components/TransitionProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${ibmPlexMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-[#FFFFFF] font-inter overflow-x-hidden cursor-none">
        <CustomCursor />
        <TransitionProvider>
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
