import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { SettingsButton, StatsButton } from '@/app/dashboard/components/ActionButtons';
import { Flame, ShieldAlert, Crosshair, Radio, Activity, Target, Zap } from 'lucide-react';

// Modules
import FocusTimer from '@/app/dashboard/components/FocusTimer';
import LiveFeed from '@/app/dashboard/components/LiveFeed';
import Leaderboard from '@/app/dashboard/components/Leaderboard';
import SyllabusTracker from '@/app/dashboard/components/SyllabusTracker';
import YouTubePlayer from '@/app/dashboard/components/YouTubePlayer';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, city, target_exam')
    .eq('id', user.id)
    .single();

  const operatorName = profile?.full_name?.split(' ')[0] || 'Operator';
  const sector = profile?.city || 'UNKNOWN';
  const protocol = profile?.target_exam || 'UNASSIGNED';

  return (
    <div className="min-h-screen bg-[#05070a] text-white p-4 sm:p-6 lg:p-8 pt-8 relative overflow-x-hidden font-sans flex flex-col">
      
      {/* 1. TACTICAL AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] animate-grid-pan" />
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rose-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex-grow">
        
        {/* 2. OPERATOR HUD HEADER */}
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-700 bg-[#0a0d12]/80 backdrop-blur-xl border border-gray-800/60 p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center h-5 w-5 rounded-md bg-rose-500/10 border border-rose-500/30">
                <Activity className="h-3 w-3 text-rose-500 animate-pulse" />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                <span>Sector: <span className="text-white">{sector}</span></span>
                <span className="text-gray-700">|</span>
                <span>Protocol: <span className="text-rose-400">{protocol}</span></span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              Status <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-500">Active</span>, <br className="md:hidden" />
              {operatorName}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <SettingsButton />
          </div>
        </header>

        {/* 3. THE WAR MATRIX GRID */}
        {/* xl:grid-cols-12 ensures the 3 columns have plenty of breathing room on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* ==========================================
              LEFT COLUMN: GLOBAL INTEL
              Mobile: Renders LAST (order-3) 
          ========================================== */}
          <aside className="lg:col-span-3 order-3 lg:order-1">
             <div className="sticky top-6 bg-[#0a0d12]/40 backdrop-blur-md border border-gray-800/50 rounded-3xl p-5 shadow-lg">
                <h2 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5 pb-3 border-b border-gray-800/50">
                  <Flame className="h-4 w-4 text-orange-500" /> Global Grind
                </h2>
                <LiveFeed />
             </div>
          </aside>

          {/* ==========================================
              CENTER COLUMN: EXECUTION CORE
              Mobile: Renders FIRST (order-1) 
              UX Note: Absolute isolation. No syllabus here.
          ========================================== */}
          <main className="lg:col-span-6 flex flex-col gap-6 order-1 lg:order-2">
            
            {/* The Unified Focus Console */}
            <div className="bg-[#0a0d12]/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-1.5 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden group animate-in zoom-in duration-700 delay-150">
               
               {/* Ambient Glow Line */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-orange-500 to-rose-500 opacity-40 group-hover:opacity-100 transition-opacity duration-700 bg-[length:200%_auto] animate-[shimmer_2s_linear_infinite]" />
               
               <div className="p-4 sm:p-6 space-y-8">
                 {/* Module 1: The Target Stream */}
                 <div>
                   <h2 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
                     <Radio className="h-4 w-4 text-rose-500 animate-pulse" /> Stream Intercept
                   </h2>
                   <YouTubePlayer />
                 </div>

                 {/* Module 2: The Timer (Directly beneath video, no scrolling required) */}
                 <div className="pt-6 border-t border-gray-800/50">
                   <h2 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
                     <Zap className="h-4 w-4 text-orange-500" /> Active Session
                   </h2>
                   <FocusTimer userId={user.id} /> 
                 </div>
               </div>

            </div>
          </main>

          {/* ==========================================
              RIGHT COLUMN: SECTOR STATUS & INTELLIGENCE
              Mobile: Renders SECOND (order-2)
          ========================================== */}
          <aside className="lg:col-span-3 flex flex-col gap-6 order-2 lg:order-3">
            
            {/* Move Syllabus Tracker Here for better UX */}
            <div className="bg-[#0a0d12]/40 backdrop-blur-md border border-gray-800/50 rounded-3xl p-5 shadow-lg animate-in slide-in-from-right-8 duration-700 delay-200">
               <h2 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5 pb-3 border-b border-gray-800/50">
                 <Target className="h-4 w-4 text-rose-500" /> Milestone Tracking
               </h2>
               <SyllabusTracker targetExam={protocol} />
            </div>

            <div className="sticky top-6">
                <div className="bg-[#0a0d12]/40 backdrop-blur-md border border-gray-800/50 rounded-3xl p-5 shadow-lg">
                  <h2 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5 pb-3 border-b border-gray-800/50">
                    <Crosshair className="h-4 w-4 text-rose-500" /> Top Rivals ({sector})
                  </h2>
                  <Leaderboard userCity={sector} userExam={protocol} />
                </div>
                
                {/* High-Tension "Rank Protection" CTA */}
                <div className="mt-6 p-6 bg-[#0a0d12]/90 backdrop-blur-xl border border-gray-700/50 hover:border-orange-500/50 rounded-3xl transition-all duration-300 group relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-orange-500/20 transition-colors" />
                    
                    <div className="flex items-center gap-2 mb-3">
                      <ShieldAlert className="h-5 w-5 text-orange-500" />
                      <h3 className="text-xs font-black uppercase text-white tracking-widest">Rank at Risk</h3>
                    </div>
                    
                    <p className="text-[11px] text-gray-400 mt-2 mb-5 leading-relaxed font-medium">
                      You are hovering in the middle tiers of <span className="text-white font-bold">{sector}</span>. Log a 60-minute session today to defend your position.
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