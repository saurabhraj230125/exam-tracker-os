"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2, BookOpen, Users, Sparkles, CheckCircle2, Coffee, Clock, Compass, Activity } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [loadingTarget, setLoadingTarget] = useState<string | null>(null);
  const [isBooted, setIsBooted] = useState(false);
  const [rotatingWord, setRotatingWord] = useState('FOCUS');

  // Smooth, welcoming load sequence
  useEffect(() => {
    setTimeout(() => setIsBooted(true), 150);
    
    const words = ['FOCUS', 'CONSISTENCY', 'MOMENTUM', 'FLOW STATE'];
    let i = 0;
    const wordInterval = setInterval(() => {
      i = (i + 1) % words.length;
      setRotatingWord(words[i]);
    }, 3000);

    return () => clearInterval(wordInterval);
  }, []);

  // Friendly Social Feed (The "Facebook" effect - social accountability)
  const [livePings, setLivePings] = useState([
    { user: "Rahul", location: "Bokaro", activity: "started a 2hr Physics session", time: "Just now", icon: BookOpen, color: "text-indigo-400", bg: "bg-indigo-500/10" },
    { user: "Priya", location: "Kota", activity: "completed her daily Chemistry goals", time: "12s ago", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { user: "Amit", location: "Delhi", activity: "joined the late-night study lounge", time: "45s ago", icon: Coffee, color: "text-amber-400", bg: "bg-amber-500/10" }
  ]);

  useEffect(() => {
    const names = ["Sneha", "Karan", "Anjali", "Vikram", "Rohan", "Neha", "Aditya"];
    const locations = ["Kota", "Bokaro", "Delhi", "Hyderabad", "Patna", "Kanpur"];
    const activities = ["hit a 3-day study streak", "is deep in Calculus", "just finished a mock test", "started a Pomodoro session"];
    const styles = [
      { icon: Sparkles, color: "text-cyan-400", bg: "bg-cyan-500/10" },
      { icon: Clock, color: "text-indigo-400", bg: "bg-indigo-500/10" },
      { icon: Activity, color: "text-rose-400", bg: "bg-rose-500/10" }
    ];
    
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomLoc = locations[Math.floor(Math.random() * locations.length)];
      const randomAct = activities[Math.floor(Math.random() * activities.length)];
      const randomStyle = styles[Math.floor(Math.random() * styles.length)];
      
      setLivePings(prev => [
        { user: randomName, location: randomLoc, activity: randomAct, time: "Just now", ...randomStyle },
        ...prev.map(p => ({ ...p, time: `${parseInt(p.time) ? parseInt(p.time) + 5 : 5}s ago` })).slice(0, 2)
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (target: string) => {
    setLoadingTarget(target);
    router.push('/login');
  };

  // Premium reusable styles
  const glassCard = "bg-zinc-900/40 backdrop-blur-xl border border-white/[0.05] rounded-3xl p-6 shadow-2xl hover:border-white/[0.08] transition-colors duration-500";
  const glassPill = "bg-zinc-900/40 backdrop-blur-md border border-white/[0.05] rounded-full px-4 py-2 flex items-center gap-2 shadow-xl";

  return (
    <div className="min-h-screen bg-[#030305] text-zinc-200 overflow-x-hidden selection:bg-indigo-500/30 font-sans relative flex flex-col">
      
      {/* 1. CINEMATIC AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Universal Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        {/* Soft, clean grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        {/* Calming Deep Space Glows */}
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-cyan-600/5 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
      </div>

      {/* 2. PREMIUM NAV HEADER */}
      <nav className={`relative z-50 max-w-7xl mx-auto w-full px-6 py-8 flex items-center justify-between transition-all duration-1000 ease-out ${isBooted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => handleNavigation('logo')}>
          <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-b from-indigo-500/20 to-transparent border border-indigo-500/30 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105">
            <div className="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <BookOpen className="h-5 w-5 text-indigo-400 relative z-10" />
          </div>
          <span className="text-sm font-bold tracking-wide text-white flex items-center gap-2">
            FocusMode <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">Online</span>
          </span>
        </div>
        
        <button 
          onClick={() => handleNavigation('nav')}
          className="text-xs font-bold uppercase tracking-[0.1em] bg-zinc-100 text-zinc-900 px-6 py-3 rounded-xl hover:bg-white transition-all active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
        >
          {loadingTarget === 'nav' ? <Loader2 className="h-4 w-4 animate-spin text-indigo-600" /> : null}
          {loadingTarget === 'nav' ? 'Authenticating...' : 'Sign In'}
        </button>
      </nav>

      {/* 3. WELCOMING HERO ARENA */}
      <main className="relative z-10 max-w-5xl mx-auto w-full px-6 pt-12 pb-24 flex flex-col items-center text-center flex-grow">
        
        {/* Friendly Online Status */}
        <div className={`${glassPill} mb-8 transition-all duration-1000 delay-300 ${isBooted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
           <span className="flex h-2 w-2 relative">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
           </span>
           <span className="text-xs font-medium text-zinc-400">
             <span className="text-zinc-200 font-bold">245</span> students studying right now
           </span>
        </div>

        {/* Dynamic, Comforting Headline */}
        <h1 className={`text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 transition-all duration-1000 delay-500 ${isBooted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} text-white`}>
          Find your daily <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300 inline-block text-left transition-all duration-500 min-w-[300px]">
            {rotatingWord}
          </span>
        </h1>
        
        <p className={`max-w-xl text-zinc-400 text-sm sm:text-base mb-10 leading-relaxed transition-all duration-1000 delay-700 ${isBooted ? 'opacity-100' : 'opacity-0'}`}>
          YouTube and social media are designed to distract you. FocusMode is designed to protect your attention. Drop your lecture link, block the noise, and study alongside friends.
        </p>

        {/* Frictionless CTA */}
        <div className={`transition-all duration-1000 delay-[900ms] ${isBooted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button 
            onClick={() => handleNavigation('hero')}
            className="group relative px-8 py-4 bg-zinc-100 text-zinc-900 font-bold text-sm uppercase tracking-[0.1em] rounded-2xl hover:bg-white transition-all active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center gap-3 overflow-hidden"
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-900/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            
            <span className="relative z-10 flex items-center gap-3">
              {loadingTarget === 'hero' ? <Loader2 className="animate-spin h-5 w-5 text-indigo-600" /> : "Start Your First Session"}
              {!loadingTarget && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform text-indigo-600" />}
            </span>
          </button>
        </div>

        {/* 4. SOCIAL STUDY FEED (The Addictive Element) */}
        <div className={`mt-24 w-full max-w-lg relative group transition-all duration-1000 delay-[1100ms] ${isBooted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Ambient Glow Behind Feed */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-cyan-400/10 to-indigo-500/10 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative bg-[#0a0a0c]/90 backdrop-blur-3xl border border-white/[0.05] rounded-[2.5rem] p-7 shadow-2xl">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-6 pb-4 border-b border-white/[0.04]">
              <Users className="h-4 w-4 text-indigo-400" /> Live Study Lounge
            </div>
            
            <div className="space-y-2">
              {livePings.map((ping, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/[0.02] transition-colors duration-300 animate-in slide-in-from-top-2 fade-in group/ping">
                  <div className={`p-2.5 rounded-xl border border-white/5 ${ping.bg} shrink-0 group-hover/ping:scale-110 transition-transform duration-300`}>
                    <ping.icon className={`h-4 w-4 ${ping.color}`} />
                  </div>
                  <div className="flex-grow text-left">
                    <p className="text-sm text-zinc-400 leading-snug">
                      <span className="font-bold text-zinc-200">{ping.user}</span> from {ping.location} {ping.activity}
                    </p>
                    <span className="text-[11px] text-zinc-600 font-medium">{ping.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 5. HABIT-FORMING FEATURE GRID */}
      <section className={`relative z-10 max-w-7xl mx-auto w-full px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-[1300ms] ${isBooted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        {[
          { icon: Coffee, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "group-hover:border-indigo-500/20", title: "Zen Vacuum", text: "Zero sidebars, shorts, or comments. Just you and your lecture in a perfectly clean environment." },
          { icon: Compass, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "group-hover:border-cyan-500/20", title: "Track Progress", text: "Check off your daily syllabus goals and watch your personal completion bar fill up." },
          { icon: Users, color: "text-rose-400", bg: "bg-rose-500/10", border: "group-hover:border-rose-500/20", title: "Study Together", text: "See peers in your city logging hours. Healthy motivation without the toxic competition." }
        ].map((f, i) => (
          <div key={i} className={`group ${glassCard} ${f.border}`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-white/5 ${f.bg} mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500`}>
              <f.icon className={`h-5 w-5 ${f.color}`} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">{f.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{f.text}</p>
          </div>
        ))}
      </section>

      {/* 6. CLEAN FOOTER */}
      <footer className={`relative z-10 w-full border-t border-white/[0.05] bg-[#0a0a0c]/80 backdrop-blur-2xl transition-all duration-1000 delay-[1500ms] ${isBooted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-widest">
            <BookOpen className="h-4 w-4 text-indigo-400" />
            <span>Built for students, by students.</span>
          </div>
          <button 
            onClick={() => handleNavigation('footer')}
            className="text-xs font-bold uppercase tracking-[0.1em] bg-zinc-900 text-zinc-300 px-6 py-3 rounded-xl hover:bg-zinc-800 transition-all active:scale-95 border border-white/[0.05]"
          >
            {loadingTarget === 'footer' ? 'Setting up...' : 'Join the Workspace'}
          </button>
        </div>
      </footer>
      
    </div>
  );
}