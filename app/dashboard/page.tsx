import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { SettingsButton, StatsButton } from '@/app/dashboard/components/ActionButtons';
import { BookOpen, Users, Trophy, Coffee, Target, Sparkles, Clock } from 'lucide-react';

// Modules
import FocusTimer from '@/app/dashboard/components/FocusTimer';
import LiveFeed from '@/app/dashboard/components/LiveFeed';
import Leaderboard from '@/app/dashboard/components/Leaderboard';
import SyllabusTracker from '@/app/dashboard/components/SyllabusTracker';
import YouTubePlayer from '@/app/dashboard/components/YouTubePlayer';
import DailyDirective from '@/app/dashboard/components/DailyDirective';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, city, target_exam')
    .eq('id', user.id)
    .single();

  const firstName = profile?.full_name?.split(' ')[0] || 'Student';
  const city = profile?.city || 'your city';
  const exam = profile?.target_exam || 'your exam';

  return (
    <div className="min-h-screen bg-[#0B1121] text-slate-200 p-4 sm:p-6 lg:p-8 pt-8 relative overflow-x-hidden font-sans flex flex-col">
      
      {/* 1. COMFORTING AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] animate-grid-pan" />
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex-grow">
        
        {/* 2. WELCOMING HEADER */}
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-700 bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 p-8 rounded-[2rem] shadow-xl shadow-indigo-900/10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center h-6 w-6 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <Coffee className="h-3.5 w-3.5 text-indigo-400" />
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 tracking-wide">
                <span>Location: <span className="text-slate-200">{city}</span></span>
                <span className="text-slate-600">•</span>
                <span>Goal: <span className="text-indigo-400">{exam}</span></span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-none text-white">
              Ready to focus, <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                {firstName}?
              </span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <SettingsButton />
          </div>
        </header>

        {/* INJECT THE DAILY DIRECTIVE */}
        <DailyDirective />

        {/* 3. THE COZY STUDY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-8">
          
          {/* ==========================================
              LEFT COLUMN: SOCIAL STUDY LOUNGE
          ========================================== */}
          <aside className="lg:col-span-3 order-3 lg:order-1">
             <div className="sticky top-6 bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-[2rem] p-6 shadow-lg shadow-black/20">
                <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 pb-4 border-b border-slate-800/50">
                  <Users className="h-4 w-4 text-indigo-400" /> Live Lounge
                </h2>
                <LiveFeed />
             </div>
          </aside>

          {/* ==========================================
              CENTER COLUMN: THE FLOW STATE ZONE
          ========================================== */}
          <main className="lg:col-span-6 flex flex-col gap-6 order-1 lg:order-2">
            
            {/* The Unified Focus Console */}
            <div className="bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 rounded-[2.5rem] p-1.5 shadow-2xl shadow-indigo-900/10 relative overflow-hidden group animate-in zoom-in duration-700 delay-150">
               
               {/* Gentle Ambient Glow Line */}
               <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 opacity-50 group-hover:opacity-100 transition-opacity duration-700 bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]" />
               
               <div className="p-5 sm:p-8 space-y-8">
                 {/* Module 1: The Target Stream */}
                 <div>
                   <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">
                     <Sparkles className="h-4 w-4 text-cyan-400" /> Focus Space
                   </h2>
                   <YouTubePlayer />
                 </div>

                 {/* Module 2: The Timer */}
                 <div className="pt-8 border-t border-slate-800/60">
                   <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">
                     <Clock className="h-4 w-4 text-indigo-400" /> Study Timer
                   </h2>
                   <FocusTimer userId={user.id} /> 
                 </div>
               </div>

            </div>
          </main>

          {/* ==========================================
              RIGHT COLUMN: PROGRESS & COMMUNITY
          ========================================== */}
          <aside className="lg:col-span-3 flex flex-col gap-6 order-2 lg:order-3">
            
            {/* Syllabus Tracker */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-[2rem] p-6 shadow-lg shadow-black/20 animate-in slide-in-from-right-8 duration-700 delay-200">
               <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 pb-4 border-b border-slate-800/50">
                 <Target className="h-4 w-4 text-emerald-400" /> Your Syllabus
               </h2>
               <SyllabusTracker targetExam={exam} />
            </div>

            <div className="sticky top-6">
                <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-[2rem] p-6 shadow-lg shadow-black/20">
                  <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 pb-4 border-b border-slate-800/50">
                    <Trophy className="h-4 w-4 text-amber-400" /> Local Leaderboard
                  </h2>
                  <Leaderboard userCity={city} userExam={exam} />
                </div>
                
                {/* Positive Reinforcement CTA (Replaces "Rank at Risk") */}
                <div className="mt-6 p-6 bg-indigo-500/5 backdrop-blur-xl border border-indigo-500/20 hover:border-indigo-500/40 rounded-[2rem] transition-all duration-300 group relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-indigo-500/20 transition-colors" />
                    
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="h-5 w-5 text-indigo-400" />
                      <h3 className="text-sm font-bold text-white tracking-wide">Keep Your Momentum</h3>
                    </div>
                    
                    <p className="text-xs text-slate-400 mt-2 mb-6 leading-relaxed">
                      You are building a great habit alongside your peers in <span className="text-slate-200 font-bold">{city}</span>. Log a 60-minute session today to keep your streak growing!
                    </p>
                    
                    <StatsButton />
                </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}