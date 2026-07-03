"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ShieldAlert, Trophy, MonitorPlay, Crosshair, Flame, PlaySquare, Loader2, Users, Radio, Compass } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [loadingTarget, setLoadingTarget] = useState<string | null>(null);

  // Simulated live tick to make the page feel intensely active before they even log in
  const [livePings, setLivePings] = useState([
    { location: "Kota", activity: "logged 120m Physics (Rotational Dynamics)", time: "Just now" },
    { location: "Bokaro", activity: "claimed #1 Spot in Mathematics", time: "2m ago" },
    { location: "Delhi", activity: "mastered Organic Chemistry GOC session", time: "5m ago" }
  ]);

  useEffect(() => {
    const locations = ["Kota", "Bokaro", "Delhi", "Hyderabad", "Patna", "Gorakhpur"];
    const subjects = ["Physics (Electrostatics)", "Chemistry (Chemical Bonding)", "Mathematics (Calculus)"];
    
    const interval = setInterval(() => {
      const randomLoc = locations[Math.floor(Math.random() * locations.length)];
      const randomSubj = subjects[Math.floor(Math.random() * subjects.length)];
      const randomMins = Math.floor(Math.random() * (150 - 45 + 1)) + 45;
      
      setLivePings(prev => [
        { location: randomLoc, activity: `logged ${randomMins}m ${randomSubj}`, time: "Just now" },
        prev[0],
        prev[1]
      ].slice(0, 3));
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (target: string) => {
    setLoadingTarget(target);
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-white overflow-hidden selection:bg-rose-500/30 font-sans">
      
      {/* Absolute Ambient Warplights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-rose-500/10 to-orange-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-rose-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Sticky Tactical Header */}
      <nav className="relative z-50 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-gray-900/50 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="bg-rose-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(225,29,72,0.4)]">
            <PlaySquare className="h-4 w-4 text-white" />
          </div>
          <span className="text-md font-black tracking-widest text-white uppercase bg-clip-text">Focus Mode Player</span>
        </div>
        <button 
          onClick={() => handleNavigation('nav')}
          disabled={loadingTarget !== null}
          className="text-xs font-black uppercase tracking-widest bg-[#0a0d12] border border-gray-800 px-5 py-2.5 rounded-xl hover:border-rose-500/50 hover:text-rose-400 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {loadingTarget === 'nav' ? (
            <><Loader2 className="h-3 w-3 animate-spin text-rose-500" /> Connecting...</>
          ) : (
            'Access Console'
          )}
        </button>
      </nav>

      {/* Main Psychological Arena */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24 flex flex-col items-center text-center">
        
        {/* Pulsing Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a0d12] border border-gray-800 text-rose-400 text-[10px] font-black uppercase tracking-[0.25em] mb-8 shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          The Local War Matrix is Live
        </div>

        {/* The Hook Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8 max-w-5xl">
          Your Rivals Are <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300 drop-shadow-sm">
            Secretly Grinding.
          </span>
        </h1>
        
        <p className="max-w-3xl text-gray-400 text-sm sm:text-base md:text-md font-medium mb-12 leading-relaxed px-4">
          YouTube's multi-billion dollar algorithm is intentionally engineered to hijack your dopamine, smash your attention span, and tank your competitive exam rank. <strong>Focus Mode Player</strong> weaponizes pure isolation. We strip out the loops, block the recommendations, and trap you inside a pure lecture vacuum while measuring your exact local rank velocity. 
        </p>

        {/* Interactive CTA Suite */}
        <div className="flex flex-col items-center gap-6 w-full max-w-md">
          <button 
            onClick={() => handleNavigation('hero')}
            disabled={loadingTarget !== null}
            className="w-full px-10 py-5 bg-gradient-to-r from-rose-600 to-orange-600 text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-3 group shadow-[0_0_50px_rgba(244,63,94,0.25)] hover:shadow-[0_0_60px_rgba(244,63,94,0.5)] active:scale-95 disabled:opacity-75"
          >
            {loadingTarget === 'hero' ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Booting Core Environment...</>
            ) : (
              <>Claim Your Station <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
          
          <div className="flex items-center gap-6 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-rose-500" /> Anti-Cheat Protocol Active</span>
            <span className="w-1 h-1 bg-gray-800 rounded-full" />
            <span className="flex items-center gap-1.5"><Flame className="h-3.5 w-3.5 text-orange-500" /> Zero Fake Hours</span>
          </div>
        </div>

        {/* Real-time Ticker Module - Triggers massive FOMO */}
        <div className="mt-16 w-full max-w-2xl bg-[#0a0d12]/60 border border-gray-900 rounded-2xl p-4 backdrop-blur-sm text-left animate-in fade-in duration-1000">
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 border-b border-gray-900 pb-2">
            <Radio className="h-3 w-3 text-rose-500 animate-pulse" /> Intercepting Live Competitor Streams...
          </div>
          <div className="space-y-2.5">
            {livePings.map((ping, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs border-l-2 border-rose-500/20 pl-3 transition-all duration-500">
                <p className="text-gray-400 font-medium">
                  Student from <span className="text-white font-bold uppercase tracking-wide text-[11px]">{ping.location}</span> {ping.activity}
                </p>
                <span className="text-[10px] text-gray-600 font-mono shrink-0">{ping.time}</span>
              </div>
            ))}
          </div>
        </div>

      </main>

      <hr className="border-gray-900/40 max-w-6xl mx-auto" />

      {/* Deep Problem-Solving Feature Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="bg-[#0a0d12] border border-gray-900 p-8 rounded-3xl hover:border-rose-500/30 transition-all duration-300 group shadow-lg">
            <div className="bg-rose-500/10 w-fit p-3 rounded-2xl border border-rose-500/20 mb-6 group-hover:bg-rose-500/20 transition-colors">
              <MonitorPlay className="h-6 w-6 text-rose-500" />
            </div>
            <h3 className="text-md font-black uppercase tracking-wider mb-3 text-white">Pure Lecture Vacuum</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Paste your online coaching batch or YouTube lecture link. Our vacuum layer completely isolates the video stream—destroying sidebar recommendations, instantly wiping the endless toxic comment scrolls, and blocking entry to addictive short-form feeds. 
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#0a0d12] border border-gray-900 p-8 rounded-3xl hover:border-rose-500/30 transition-all duration-300 group shadow-lg">
            <div className="bg-orange-500/10 w-fit p-3 rounded-2xl border border-orange-500/20 mb-6 group-hover:bg-orange-500/20 transition-colors">
              <ShieldAlert className="h-6 w-6 text-orange-500" />
            </div>
            <h3 className="text-md font-black uppercase tracking-wider mb-3 text-white">Tab-Isolation Lock</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Proving your hours requires transparency. The moment you drop focus, slip out of the workspace, or open a background tab to cheat your attention loop, our hardware-level visibility engine drops execution and halts your time. Every single second is real.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#0a0d12] border border-gray-900 p-8 rounded-3xl hover:border-rose-500/30 transition-all duration-300 group shadow-lg">
            <div className="bg-amber-500/10 w-fit p-3 rounded-2xl border border-amber-500/20 mb-6 group-hover:bg-amber-500/20 transition-colors">
              <Trophy className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="text-md font-black uppercase tracking-wider mb-3 text-white">The Localized War Matrix</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              National tracking metrics are diluted data. Focus Mode Player aggregates and targets students in your exact local sector studying for your exact target exam. See the precise names of the peers passing you by, and execute strategies to take the #1 spot.
            </p>
          </div>

        </div>
      </section>

      {/* High-Tension Conversion Terminal */}
      <section className="relative z-10 border-t border-gray-900 bg-gradient-to-b from-[#0a0d12] to-black py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <Crosshair className="h-10 w-10 text-rose-600/60 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            The Syllabus Isn't Waiting.
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
            While your landing page is idle, somewhere in a local hostel, your immediate competition just verified another deep math session and closed a crucial chapter milestone. You are either scaling the rank hierarchy, or dropping out of it.
          </p>
          
          <button 
            onClick={() => handleNavigation('footer')}
            disabled={loadingTarget !== null}
            className="inline-flex px-12 py-5 bg-white text-black hover:bg-rose-600 hover:text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_50px_rgba(225,29,72,0.4)] transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 items-center gap-3"
          >
            {loadingTarget === 'footer' ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Authorizing Profile Access...</>
            ) : (
              <>Breach The Algorithm</>
            )}
          </button>
        </div>
      </section>

    </div>
  );
}