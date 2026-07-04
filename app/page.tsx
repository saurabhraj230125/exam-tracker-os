"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2, BookOpen, Users, Sparkles, CheckCircle2, Coffee, Clock, Compass } from 'lucide-react';

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
    { user: "Rahul", location: "Bokaro", activity: "started a 2hr Physics session", time: "Just now", icon: BookOpen, color: "text-indigo-400", bg: "bg-indigo-400/10" },
    { user: "Priya", location: "Kota", activity: "completed her daily Chemistry goals", time: "12s ago", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { user: "Amit", location: "Delhi", activity: "joined the late-night study lounge", time: "45s ago", icon: Coffee, color: "text-amber-400", bg: "bg-amber-400/10" }
  ]);

  useEffect(() => {
    const names = ["Sneha", "Karan", "Anjali", "Vikram", "Rohan", "Neha", "Aditya"];
    const locations = ["Kota", "Bokaro", "Delhi", "Hyderabad", "Patna", "Kanpur"];
    const activities = ["hit a 3-day study streak", "is deep in Calculus", "just finished a mock test", "started a Pomodoro session"];
    const styles = [
      { icon: Sparkles, color: "text-purple-400", bg: "bg-purple-400/10" },
      { icon: Clock, color: "text-blue-400", bg: "bg-blue-400/10" },
      { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10" }
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

  return (
    <div className="min-h-screen bg-[#0B1121] text-slate-200 overflow-x-hidden selection:bg-indigo-500/30 font-sans relative flex flex-col">
      
      {/* 1. COMFORTABLE AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Soft, clean grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] animate-grid-pan" />
        {/* Calming Blue/Indigo Glows */}
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
      </div>

      {/* 2. FRIENDLY, CLEAN HEADER */}
      <nav className={`relative z-50 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between transition-all duration-1000 ${isBooted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-bold tracking-wide text-white flex items-center gap-2">
            FocusMode <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase">Online</span>
          </span>
        </div>
        <button 
          onClick={() => handleNavigation('nav')}
          className="text-xs font-bold bg-white text-slate-900 px-5 py-2.5 rounded-full hover:bg-slate-100 transition-all active:scale-95 flex items-center gap-2 shadow-md"
        >
          {loadingTarget === 'nav' ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {loadingTarget === 'nav' ? 'Signing in...' : 'Sign In'}
        </button>
      </nav>

      {/* 3. WELCOMING HERO ARENA */}
      <main className="relative z-10 max-w-5xl mx-auto w-full px-6 pt-16 pb-24 flex flex-col items-center text-center flex-grow">
        
        {/* Friendly Online Status */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 backdrop-blur-md border border-slate-700/50 text-slate-300 text-xs font-medium mb-8 transition-all duration-1000 delay-300 shadow-sm ${isBooted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
           <span className="flex h-2 w-2 relative">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
           </span>
           245 students studying right now
        </div>

        {/* Dynamic, Comforting Headline */}
        <h1 className={`text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 transition-all duration-1000 delay-500 ${isBooted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Find your daily <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 inline-block text-left transition-all duration-500">
            {rotatingWord}
          </span>
        </h1>
        
        <p className={`max-w-xl text-slate-400 text-sm sm:text-base mb-10 leading-relaxed transition-all duration-1000 delay-700 ${isBooted ? 'opacity-100' : 'opacity-0'}`}>
          YouTube and social media are designed to distract you. FocusMode is designed to protect your attention. Drop your lecture link, block the noise, and study alongside friends.
        </p>

        {/* Frictionless CTA */}
        <div className={`transition-all duration-1000 delay-[900ms] ${isBooted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button 
            onClick={() => handleNavigation('hero')}
            className="group relative px-8 py-4 bg-indigo-500 text-white font-bold text-sm rounded-full hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center gap-3 active:scale-95"
          >
            {loadingTarget === 'hero' ? <Loader2 className="animate-spin h-5 w-5" /> : "Start Your First Session"}
            {!loadingTarget && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>

        {/* 4. SOCIAL STUDY FEED (The Addictive Element) */}
        <div className={`mt-20 w-full max-w-lg bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 text-left backdrop-blur-xl shadow-2xl transition-all duration-1000 delay-[1100ms] ${isBooted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-5 pb-3 border-b border-slate-800/50">
            <Users className="h-4 w-4 text-indigo-400" /> Live Study Lounge
          </div>
          
          <div className="space-y-3">
            {livePings.map((ping, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-800/30 transition-colors duration-300 animate-in slide-in-from-top-2 fade-in">
                <div className={`p-2.5 rounded-xl ${ping.bg} shrink-0`}>
                  <ping.icon className={`h-4 w-4 ${ping.color}`} />
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-slate-300 leading-snug">
                    <span className="font-bold text-white">{ping.user}</span> from {ping.location} {ping.activity}
                  </p>
                  <span className="text-[11px] text-slate-500">{ping.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 5. HABIT-FORMING FEATURE GRID */}
      <section className={`relative z-10 max-w-7xl mx-auto w-full px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-[1300ms] ${isBooted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        {[
          { icon: Coffee, color: "text-indigo-400", bg: "bg-indigo-500/10", title: "Zen Vacuum", text: "Zero sidebars, shorts, or comments. Just you and your lecture in a perfectly clean environment." },
          { icon: Compass, color: "text-emerald-400", bg: "bg-emerald-500/10", title: "Track Progress", text: "Check off your daily syllabus goals and watch your personal completion bar fill up." },
          { icon: Users, color: "text-blue-400", bg: "bg-blue-500/10", title: "Study Together", text: "See peers in your city logging hours. Healthy motivation without the toxic competition." }
        ].map((f, i) => (
          <div key={i} className="group bg-slate-800/20 backdrop-blur-sm border border-slate-700/30 p-8 rounded-[2rem] hover:bg-slate-800/40 transition-all duration-300">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${f.bg} mb-6 group-hover:scale-110 transition-transform duration-500`}>
              <f.icon className={`h-6 w-6 ${f.color}`} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-slate-100">{f.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{f.text}</p>
          </div>
        ))}
      </section>

      {/* 6. CLEAN FOOTER */}
      <footer className={`relative z-10 w-full border-t border-slate-800/50 bg-slate-900/50 backdrop-blur-xl transition-all duration-1000 delay-[1500ms] ${isBooted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <BookOpen className="h-4 w-4" />
            <span>Built for students, by students.</span>
          </div>
          <button 
            onClick={() => handleNavigation('footer')}
            className="text-sm font-bold bg-slate-800 text-slate-200 px-6 py-3 rounded-full hover:bg-slate-700 transition-all active:scale-95 border border-slate-700"
          >
            {loadingTarget === 'footer' ? 'Setting up...' : 'Join the Workspace'}
          </button>
        </div>
      </footer>
      
    </div>
  );
}