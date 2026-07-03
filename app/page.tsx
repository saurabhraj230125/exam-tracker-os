"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2, Radio, Zap, ShieldAlert, MonitorPlay, Target, Trophy } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [loadingTarget, setLoadingTarget] = useState<string | null>(null);

  // High-frequency pings for the "War Matrix" feel
  const [livePings, setLivePings] = useState([
    { location: "Bokaro", activity: "defended #1 Rank in JEE Physics", time: "Just now" },
    { location: "Kota", activity: "locked 240m deep-work session", time: "4m ago" },
    { location: "Gorakhpur", activity: "cleared Organic Chemistry backlogs", time: "9m ago" }
  ]);

  useEffect(() => {
    const locations = ["Kota", "Bokaro", "Delhi", "Hyderabad", "Patna", "Gorakhpur", "Kanpur"];
    const subjects = ["Rotational Dynamics", "Chemical Bonding", "Vector Calculus", "Thermodynamics", "Modern Physics"];
    
    const interval = setInterval(() => {
      const randomLoc = locations[Math.floor(Math.random() * locations.length)];
      const randomSubj = subjects[Math.floor(Math.random() * subjects.length)];
      
      setLivePings(prev => [
        { location: randomLoc, activity: `secured ${randomSubj} milestone`, time: "Just now" },
        ...prev.slice(0, 2)
      ]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (target: string) => {
    setLoadingTarget(target);
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-white overflow-x-hidden selection:bg-rose-500/30 font-sans">
      
      {/* Absolute Ambient Warplights */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose-600/10 blur-[150px] rounded-full" />
      </div>

      {/* Sticky Tactical Header */}
      <nav className="relative z-50 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-gray-900/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="bg-rose-600 p-1 rounded italic font-black text-[10px]">FMP</div>
          <span className="text-[11px] font-black tracking-[0.2em] uppercase italic text-white">Focus Mode Player</span>
        </div>
        <button 
          onClick={() => handleNavigation('nav')}
          className="text-[9px] font-black uppercase tracking-[0.2em] bg-[#0a0d12] border border-gray-800 px-5 py-2.5 rounded-lg hover:border-rose-500/50 transition-all active:scale-95"
        >
          {loadingTarget === 'nav' ? 'AUTHORIZING...' : 'ACCESS CONSOLE'}
        </button>
      </nav>

      {/* Main Psychological Arena */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-24 flex flex-col items-center text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0a0d12] border border-gray-800 text-rose-500 text-[9px] font-black uppercase tracking-[0.3em] mb-8">
           <Zap className="h-3 w-3 fill-rose-500" /> Rank Velocity: High-Intensity Active
        </div>

        <h1 className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-12">
          The Algorithm <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
            Is Not Your Ally.
          </span>
        </h1>
        
        <p className="max-w-xl text-gray-400 text-[13px] font-medium mb-12 leading-relaxed">
          YouTube is engineered to hijack your dopamine and tank your competitive rank. Focus Mode Player weaponizes isolation—stripping recommendations and trapping you inside a pure lecture-to-brain vacuum.
        </p>

        <button 
          onClick={() => handleNavigation('hero')}
          className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-[11px] rounded-xl hover:scale-105 transition-all flex items-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95"
        >
          {loadingTarget === 'hero' ? <Loader2 className="animate-spin h-3 w-3" /> : "Initiate Secure Session"}
          <ArrowRight className="h-3 w-3" />
        </button>

        {/* Live Intercepts */}
        <div className="mt-20 w-full max-w-lg bg-[#0a0d12]/50 border border-gray-900 rounded-xl p-6 text-left">
          <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-gray-600 mb-6 border-b border-gray-900 pb-2">
            <Radio className="h-3 w-3 text-rose-500 animate-pulse" /> Live Competitor Intercepts
          </div>
          {livePings.map((ping, i) => (
            <div key={i} className="flex justify-between text-[11px] py-2 border-b border-gray-900 last:border-0 font-mono">
              <span className="text-rose-600">[{ping.location}]</span>
              <span className="text-gray-300">{ping.activity}</span>
              <span className="text-gray-700">{ping.time}</span>
            </div>
          ))}
        </div>
      </main>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: MonitorPlay, title: "Lecture Vacuum", text: "No sidebars. No shorts. No recommendations. Just the stream." },
          { icon: Target, title: "Rank Velocity", text: "Measure your actual study speed against your sector rivals." },
          { icon: ShieldAlert, title: "Anti-Distraction", text: "Hardware-level visibility engine drops execution on tab-switching." }
        ].map((f, i) => (
          <div key={i} className="bg-[#0a0d12] border border-gray-900 p-8 rounded-2xl hover:border-rose-500/20 transition-all">
            <f.icon className="h-5 w-5 text-rose-500 mb-6" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2">{f.title}</h3>
            <p className="text-[11px] text-gray-500 leading-relaxed">{f.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}