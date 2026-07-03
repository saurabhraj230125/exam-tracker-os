import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
// 1. Import the Google Analytics Engine
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Focus Mode Player | Local Sector Grid",
  description: "Establish a secure connection to the local grid. Track your study sessions, defend your rank, and dominate the competitive leaderboard.",
  themeColor: "#05070a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-rose-500/30 selection:text-white">
        
        {/* The Core Application */}
        {children}
        
        {/* 🛡️ Vercel Traffic Analytics */}
        <Analytics />
        
      </body>
      
      {/* 📡 Google Analytics Real-Time Radar */}
      {/* REPLACE THE GA_MEASUREMENT_ID BELOW WITH YOUR ACTUAL 'G-' ID */}
      <GoogleAnalytics gaId="G-MB8B9DZ03B" />
      
    </html>
  );
}