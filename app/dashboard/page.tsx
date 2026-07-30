import { Infinity, Moon, Coffee, Sparkles } from 'lucide-react';
import YouTubePlayer from '@/app/dashboard/components/YouTubePlayer';

export default function DashboardPage() {
  return (
    <div className="h-screen w-full bg-[#020204] text-zinc-300 font-sans selection:bg-indigo-500/30 flex flex-col relative overflow-hidden">
      
      {/* 1. COGNITIVE EASE BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <div className="absolute top-[-20%] left-1/4 w-[800px] h-[800px] bg-indigo-900/10 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute bottom-[-10%] right-1/4 w-[600px] h-[600px] bg-teal-900/5 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '15s', animationDelay: '2s' }} />
      </div>

      <div className="max-w-[1600px] mx-auto w-full relative z-10 flex flex-col p-4 sm:p-6 lg:p-8 h-full">
        
        {/* 2. INVISIBLE HEADER */}
        <header className="flex items-center justify-between mb-4 sm:mb-6 animate-in fade-in slide-in-from-top-6 duration-1000 ease-out shrink-0 px-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-white/[0.02] border border-white/[0.05] shadow-inner">
              <Infinity className="h-5 w-5 text-zinc-400" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-100">
                Deep Focus Terminal
              </h1>
              <p className="text-[10px] sm:text-xs font-medium text-zinc-500 tracking-widest uppercase">
                Unrestricted Learning Environment
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
              <Moon className="h-3.5 w-3.5 text-indigo-400/70" />
              <span>Zen Mode Active</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
              <Coffee className="h-3.5 w-3.5 text-amber-600/70" />
              <span>Stay Hydrated</span>
            </div>
          </div>
        </header>

        {/* 3. THE "MONITOR" (Workspace) */}
        <main className="w-full flex-1 flex flex-col min-h-0 animate-in fade-in duration-1000 delay-300 pb-2 sm:pb-4">
          
          <div className="relative group rounded-[2rem] p-[1px] h-full flex flex-col overflow-hidden shadow-2xl shadow-black/50">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-50 pointer-events-none" />
            
            <div className="relative h-full bg-[#070709]/80 backdrop-blur-3xl rounded-[2rem] p-2 sm:p-4 flex flex-col border border-black/50 shadow-inner min-h-0">
               
               <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.02] mb-2 shrink-0">
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                   <Sparkles className="h-3 w-3 text-indigo-500/50" /> Universal Search
                 </div>
                 <div className="flex gap-1.5">
                   <div className="h-2 w-2 rounded-full bg-rose-500/20" />
                   <div className="h-2 w-2 rounded-full bg-amber-500/20" />
                   <div className="h-2 w-2 rounded-full bg-emerald-500/20" />
                 </div>
               </div>
               
               {/* Player Container */}
               <div className="flex-1 w-full rounded-xl overflow-hidden bg-black/40 border border-white/[0.02] flex flex-col min-h-0 relative">
                 <YouTubePlayer />
               </div>
               
            </div>
          </div>
        </main>
        
        {/* FOOTER HAS BEEN COMPLETELY REMOVED TO PREVENT OVERLAPPING */}

      </div>
    </div>
  );
}