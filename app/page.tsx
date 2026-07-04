"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2, Radio, Zap, ShieldAlert, MonitorPlay, Target, Terminal, Activity, Crosshair } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [loadingTarget, setLoadingTarget] = useState<string | null>(null);
  const [isBooted, setIsBooted] = useState(false);
  const [rotatingWord, setRotatingWord] = useState('ATTENTION');

  // Trigger the boot sequence animation on load
  useEffect(() => {
    setTimeout(() => setIsBooted(true), 100);
    
    const words = ['ATTENTION', 'RANK', 'DISCIPLINE', 'FUTURE'];
    let i = 0;
    const wordInterval = setInterval(() => {
      i = (i + 1) % words.length;
      setRotatingWord(words[i]);
    }, 2500);

    return () => clearInterval(wordInterval);
  }, []);

  // Live Pings Generation
  const [livePings, setLivePings] = useState([
    { location: "Bokaro", activity: "defended #1 Rank in JEE Physics", time: "0s ago", type: "success" },
    { location: "Kota", activity: "locked 240m deep-work session", time: "12s ago", type: "neutral" },
    { location: "Delhi", activity: "cleared Organic Chemistry backlogs", time: "45s ago", type: "warning" }
  ]);

  useEffect(() => {
    const locations = ["Kota", "Bokaro", "Delhi", "Hyderabad", "Patna", "Gorakhpur", "Kanpur"];
    const subjects = ["Rotational Dynamics", "Chemical Bonding", "Vector Calculus", "Thermodynamics", "Modern Physics"];
    const types = ["success", "neutral", "warning"];
    
    const interval = setInterval(() => {
      const randomLoc = locations[Math.floor(Math.random() * locations.length)];
      const randomSubj = subjects[Math.floor(Math.random() * subjects.length)];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      setLivePings(prev => [
        { location: randomLoc, activity: `secured ${randomSubj} milestone`, time: "Just now", type: randomType },
        ...prev.map(p => ({ ...p, time: `${parseInt(p.time) ? parseInt(p.time) + 4 : 4}s ago` })).slice(0, 2)
      ]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (target: string) => {
    setLoadingTarget(target);
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-white overflow-x-hidden selection:bg-rose-500/30 font-sans relative flex flex-col">
      
      {/* 1. ANIMATED BACKGROUND LAYER */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Deep Grid with the Infinite Pan Animation */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] animate-grid-pan" />
        {/* Pulsing Orbs */}
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-rose-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-orange-600/10 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      {/* 2. TACTICAL HEADER */}
      <nav className={`relative z-50 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between transition-all duration-1000 ${isBooted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="flex items-center gap-3">
          <div className="bg-rose-600 p-1.5 rounded relative group">
            <div className="absolute inset-0 bg-rose-500 rounded animate-ping opacity-20 group-hover:opacity-60" />
            <Terminal className="h-4 w-4 text-white relative z-10" />
          </div>
          <span className="text-[11px] font-black tracking-[0.25em] uppercase italic text-white flex items-center gap-2">
            Focus Mode Player <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
          </span>
        </div>
        <button 
          onClick={() => handleNavigation('nav')}
          className="text-[9px] font-black uppercase tracking-[0.2em] bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-lg hover:border-rose-500/50 hover:bg-rose-500/10 transition-all active:scale-95 flex items-center gap-2"
        >
          {loadingTarget === 'nav' ? <Loader2 className="h-3 w-3 animate-spin text-rose-500" /> : <Crosshair className="h-3 w-3 text-rose-500" />}
          {loadingTarget === 'nav' ? 'AUTHORIZING...' : 'ACCESS CONSOLE'}
        </button>
      </nav>

      {/* 3. MAIN HERO ARENA */}
      <main className="relative z-10 max-w-5xl mx-auto w-full px-6 pt-20 pb-24 flex flex-col items-center text-center flex-grow">
        
        {/* Status Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a0d12]/80 backdrop-blur border border-gray-800 text-rose-500 text-[9px] font-black uppercase tracking-[0.3em] mb-8 transition-all duration-1000 delay-300 shadow-[0_0_20px_rgba(225,29,72,0.1)] ${isBooted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
           <Activity className="h-3 w-3 text-rose-500" /> 
           Network: Secure | Latency: 12ms
        </div>

        {/* Dynamic Headline with Terminal Cursor */}
        <h1 className={`text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8 transition-all duration-1000 delay-500 ${isBooted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Take Back Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 inline-block text-left transition-all duration-500">
            {rotatingWord}
          </span>
          <span className="text-rose-500 animate-pulse">_</span>
        </h1>
        
        <p className={`max-w-xl text-gray-400 text-[13px] font-medium mb-12 leading-relaxed transition-all duration-1000 delay-700 ${isBooted ? 'opacity-100' : 'opacity-0'}`}>
          The algorithm is actively weaponized to destroy your focus and tank your competitive rank. Initiate the vacuum sequence, strip the distractions, and measure your exact velocity against rival sectors.
        </p>

        {/* Primary CTA */}
        <div className={`transition-all duration-1000 delay-[900ms] ${isBooted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button 
            onClick={() => handleNavigation('hero')}
            className="group relative px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-[11px] rounded-xl hover:scale-105 transition-all flex items-center gap-3 active:scale-95 overflow-hidden"
          >
            {/* Button Light Sweep Effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            
            {loadingTarget === 'hero' ? <Loader2 className="animate-spin h-4 w-4" /> : <Zap className="h-4 w-4 fill-black" />}
            {loadingTarget === 'hero' ? "BOOTING MATRIX..." : "INITIATE SECURE SESSION"}
            {!loadingTarget && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>

        {/* 4. LIVE RADAR STREAM */}
        <div className={`mt-24 w-full max-w-2xl bg-[#0a0d12]/60 border border-gray-800/50 rounded-2xl p-6 text-left backdrop-blur-xl shadow-2xl transition-all duration-1000 delay-[1100ms] ${isBooted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-between items-center mb-6 border-b border-gray-900 pb-3">
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">
              <Radio className="h-3 w-3 text-rose-500 animate-pulse" /> Live Competitor Radar
            </div>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
          
          <div className="space-y-1">
            {livePings.map((ping, i) => (
              <div key={i} className="flex justify-between items-center text-[11px] py-2.5 px-3 rounded-lg bg-white/[0.02] border border-white/[0.02] font-mono animate-in slide-in-from-top-2 fade-in duration-300">
                <div className="flex items-center gap-3">
                  {ping.type === 'success' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />}
                  {ping.type === 'neutral' && <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />}
                  {ping.type === 'warning' && <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(225,29,72,0.8)]" />}
                  <span className="text-white font-bold">[{ping.location}]</span>
                  <span className="text-gray-400 hidden sm:inline">{ping.activity}</span>
                </div>
                <span className="text-gray-600 text-[10px]">{ping.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 5. ARSENAL (FEATURE) GRID */}
      <section className={`relative z-10 max-w-7xl mx-auto w-full px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-[1300ms] ${isBooted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        {[
          { icon: MonitorPlay, color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20", title: "Lecture Vacuum", text: "Zero sidebars. Zero shorts. Total isolation. Paste your stream link and trap yourself in the work." },
          { icon: Target, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20", title: "Sector Velocity", text: "Diluted national ranks mean nothing. Measure your exact study speed against rivals in your specific city." },
          { icon: ShieldAlert, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", title: "Anti-Cheat Lock", text: "The hardware-level visibility engine drops your active execution timer the second you open a background tab." }
        ].map((f, i) => (
          <div key={i} className="group bg-[#0a0d12]/80 backdrop-blur-md border border-gray-800/60 p-8 rounded-3xl hover:border-gray-600 transition-all duration-500 shadow-xl hover:shadow-[0_0_30px_rgba(225,29,72,0.05)]">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${f.bg} ${f.border} border mb-6 group-hover:scale-110 transition-transform duration-500`}>
              <f.icon className={`h-5 w-5 ${f.color}`} />
            </div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-3 text-white">{f.title}</h3>
            <p className="text-[12px] text-gray-500 leading-relaxed">{f.text}</p>
          </div>
        ))}
      </section>

      {/* 6. FINAL TERMINAL FOOTER */}
      <footer className={`relative z-10 w-full border-t border-gray-900 bg-[#05070a]/90 backdrop-blur-xl transition-all duration-1000 delay-[1500ms] ${isBooted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col text-center sm:text-left">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-1">Status: Operational</span>
            <span className="text-xs font-mono text-gray-400">Waiting for operator input...</span>
          </div>
          <button 
            onClick={() => handleNavigation('footer')}
            className="text-[10px] font-black uppercase tracking-[0.2em] bg-rose-600 text-white px-8 py-3 rounded-lg hover:bg-rose-500 transition-all active:scale-95 shadow-[0_0_20px_rgba(225,29,72,0.3)] flex items-center gap-2"
          >
            {loadingTarget === 'footer' ? <Loader2 className="h-3 w-3 animate-spin text-white" /> : <Terminal className="h-3 w-3 text-white" />}
            {loadingTarget === 'footer' ? 'EXECUTING...' : 'ENTER THE MATRIX'}
          </button>
        </div>
      </footer>
      
    </div>
  );
}