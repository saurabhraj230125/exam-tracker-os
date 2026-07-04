import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { SettingsButton, StatsButton } from '@/app/dashboard/components/ActionButtons';
import { BookOpen, Users, Trophy, Coffee, Target, Sparkles, Clock, MapPin } from 'lucide-react';

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
  const city = profile?.city || 'City';
  const exam = profile?.target_exam || 'Exam';

  return (
    <div className="min-h-screen bg-[#0B1121] text-slate-200 p-3 sm:p-6 lg:p-8 pt-6 sm:pt-8 relative overflow-x-hidden font-sans flex flex-col pb-24 sm:pb-8">
      
      {/* 1. COZY AMBIENT BACKGROUND (Performance optimized for mobile) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] hidden sm:block animate-grid-pan" />
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[100vw] sm:w-[800px] h-[300px] sm:h-[500px] bg-indigo-600/15 sm:bg-indigo-600/10 blur-[100px] sm:blur-[150px] rounded-full" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex-grow flex flex-col gap-4 sm:gap-8">
        
        {/* 2. ADAPTIVE APP HEADER */}
        {/* Mobile: Compact top-bar. PC: Full welcoming dashboard header */}
        <header className="flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-700 bg-slate-900/60 backdrop-blur-xl border border-slate-800/60 p-4 sm:p-8 rounded-2xl sm:rounded-[2rem] shadow-lg shadow-indigo-900/10">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center justify-center h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
              <Coffee className="h-6 w-6 text-indigo-400" />
            </div>
            
            {/* Mobile-only avatar circle */}
            <div className="sm:hidden flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 text-white font-bold shadow-md">
              {firstName.charAt(0)}
            </div>

            <div>
              <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-400 tracking-wide mb-1">
                <MapPin className="h-3 w-3 text-slate-500" />
                <span>{city}</span>
                <span className="text-slate-600">•</span>
                <span>{exam} Focus</span>
              </div>
              <h1 className="text-xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Hey, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">{firstName}</span>
              </h1>
            </div>
          </div>
          
          <div>
            <SettingsButton />
          </div>
        </header>

        {/* 3. DAILY DIRECTIVE (Spans full width, acts like "Stories" on mobile) */}
        <div className="w-full">
          <DailyDirective />
        </div>

        {/* 4. THE SOCIAL STUDY GRID */}
        {/* Mobile: Single column. PC: 3 columns (3-6-3 layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          
          {/* ==========================================
              CENTER: THE FLOW STATE ZONE (Core Utility)
              Mobile: Order 1 (Top). PC: Order 2 (Middle).
          ========================================== */}
          <main className="lg:col-span-6 flex flex-col gap-4 sm:gap-6 order-1 lg:order-2">
            
            {/* The Unified Focus Console */}
            <div className="bg-slate-900/70 backdrop-blur-2xl border border-slate-700/50 rounded-2xl sm:rounded-[2.5rem] p-1 sm:p-1.5 shadow-xl shadow-indigo-900/10 relative overflow-hidden group">
               
               {/* Gentle Ambient Glow Line */}
               <div className="absolute top-0 left-0 w-full h-1 sm:h-1.5 bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 opacity-60 sm:opacity-50 group-hover:opacity-100 transition-opacity duration-700 bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]" />
               
               <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 bg-slate-900/40 rounded-[14px] sm:rounded-[2.2rem]">
                 {/* Module 1: The Target Stream */}
                 <div>
                   <h2 className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 sm:mb-5">
                     <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-400" /> Focus Space
                   </h2>
                   <YouTubePlayer />
                 </div>

                 {/* Module 2: The Timer */}
                 <div className="pt-6 sm:pt-8 border-t border-slate-800/60">
                   <h2 className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 sm:mb-5">
                     <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-400" /> Study Timer
                   </h2>
                   <FocusTimer userId={user.id} /> 
                 </div>
               </div>

            </div>
          </main>

          {/* ==========================================
              LEFT: SOCIAL STUDY LOUNGE (The "Feed")
              Mobile: Order 2. PC: Order 1.
          ========================================== */}
          <aside className="lg:col-span-3 order-2 lg:order-1">
             <div className="lg:sticky lg:top-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800/60 rounded-2xl sm:rounded-[2rem] p-5 sm:p-6 shadow-lg shadow-black/20">
                <h2 className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-800/50">
                  <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-400" /> Live Lounge
                </h2>
                {/* Wrap LiveFeed in a max-height container on mobile to prevent infinite scrolling */}
                <div className="max-h-[400px] lg:max-h-none overflow-y-auto pr-2 custom-scrollbar">
                  <LiveFeed />
                </div>
             </div>
          </aside>

          {/* ==========================================
              RIGHT: PROGRESS & GAMIFICATION
              Mobile: Order 3. PC: Order 3.
          ========================================== */}
          <aside className="lg:col-span-3 flex flex-col gap-4 sm:gap-6 order-3">
            
            {/* Syllabus Tracker */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/60 rounded-2xl sm:rounded-[2rem] p-5 sm:p-6 shadow-lg shadow-black/20">
               <h2 className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-800/50">
                 <Target className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400" /> Your Syllabus
               </h2>
               <SyllabusTracker targetExam={exam} />
            </div>

            <div className="lg:sticky lg:top-6 flex flex-col gap-4 sm:gap-6">
                {/* Local Leaderboard */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/60 rounded-2xl sm:rounded-[2rem] p-5 sm:p-6 shadow-lg shadow-black/20">
                  <h2 className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-800/50">
                    <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400" /> Local Leaderboard
                  </h2>
                  <div className="max-h-[300px] lg:max-h-none overflow-y-auto pr-2 custom-scrollbar">
                    <Leaderboard userCity={city} userExam={exam} />
                  </div>
                </div>
                
                {/* Habit Reinforcement CTA */}
                <div className="p-5 sm:p-6 bg-indigo-500/10 backdrop-blur-xl border border-indigo-500/20 hover:border-indigo-500/40 rounded-2xl sm:rounded-[2rem] transition-all duration-300 group relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-indigo-500/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-indigo-500/20 transition-colors" />
                    
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-400" />
                      <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">Keep Your Momentum</h3>
                    </div>
                    
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-1 sm:mt-2 mb-4 sm:mb-6 leading-relaxed">
                      You are building a great habit alongside your peers in <span className="text-slate-200 font-bold">{city}</span>. Log a session today to keep your streak!
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