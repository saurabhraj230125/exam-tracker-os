import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { SettingsButton, StatsButton } from '@/app/dashboard/components/ActionButtons';
import { Flame, ShieldAlert, Crosshair, Radio } from 'lucide-react';
import FocusTimer from '@/app/dashboard/components/FocusTimer';
import LiveFeed from '@/app/dashboard/components/LiveFeed';
import Leaderboard from '@/app/dashboard/components/Leaderboard';
import SyllabusTracker from '@/app/dashboard/components/SyllabusTracker';
import YouTubePlayer from '@/app/dashboard/components/YouTubePlayer'; // 🛡️ INJECTED PLAYER

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, city, target_exam')
    .eq('id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-[#05070a] text-white p-4 sm:p-8 pt-10 sm:pt-20 relative overflow-hidden font-sans">
      
      {/* Tactical Blueprint Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-rose-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HUD Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-1000 border-b border-gray-900/80 pb-6 bg-[#05070a]/50 backdrop-blur-sm p-4 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center h-4 w-4 rounded-full bg-rose-500/20 border border-rose-500/30">
                <div className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
              </div>
              <p className="text-gray-500 font-bold tracking-[0.2em] uppercase text-[10px] font-mono">
                Sector: {profile?.city || 'UNKNOWN'} // Protocol: {profile?.target_exam || 'UNASSIGNED'}
              </p>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter">
              Welcome back, <br className="sm:hidden"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-500 drop-shadow-md">
                {profile?.full_name?.split(' ')[0] || 'Operator'}
              </span>
            </h1>
          </div>

          {/* Fully Interactive Lockdown Button */}
          <SettingsButton />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Social Feed */}
          <div className="lg:col-span-3 order-2 lg:order-1">
             <div className="sticky top-20">
                <h2 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 pb-3 border-b border-gray-800">
                  <Flame className="h-4 w-4 text-orange-500" /> Global Grind
                </h2>
                <LiveFeed />
             </div>
          </div>

          {/* Center Column: The Action Core */}
          <div className="lg:col-span-6 flex flex-col gap-6 order-1 lg:order-2 pb-20">
            <div className="space-y-6 animate-in zoom-in duration-700">
                
                {/* 🛡️ NEW: Focus Stream Target Module */}
                <div className="bg-[#0a0d12]/80 backdrop-blur-md border border-gray-800 rounded-3xl p-1 shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-orange-500 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                   <div className="p-4 sm:p-5">
                     <h2 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
                       <Radio className="h-4 w-4 text-rose-500 animate-pulse" /> Focus Stream Target
                     </h2>
                     <YouTubePlayer />
                   </div>
                </div>


                <FocusTimer userId={user.id} /> 
                <SyllabusTracker targetExam={profile?.target_exam || 'JEE'} />
            </div>
          </div>

          {/* Right Column: Status & Competition */}
          <div className="lg:col-span-3 order-3">
            <div className="sticky top-20">
                <h2 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 pb-3 border-b border-gray-800">
                  <Crosshair className="h-4 w-4 text-rose-500" /> Top Rivals ({profile?.city || 'Local'})
                </h2>
                <Leaderboard userCity={profile?.city || ''} userExam={profile?.target_exam || ''} />
                
                {/* UPGRADED: High-Tension "Rank Protection" CTA */}
                <div className="mt-8 p-6 bg-[#0a0d12] border border-gray-800 hover:border-orange-500/40 rounded-3xl transition-all group relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-orange-500/20 transition-colors" />
                    
                    <div className="flex items-center gap-2 mb-4">
                      <ShieldAlert className="h-5 w-5 text-orange-500" />
                      <h3 className="text-sm font-black uppercase text-white tracking-wide">Rank at Risk</h3>
                    </div>
                    
                    <p className="text-xs text-gray-400 mt-2 mb-6 leading-relaxed font-medium">
                      You are currently hovering in the middle tiers of <span className="text-white font-bold">{profile?.city || 'your sector'}</span>. Log a 60-minute session today to defend your position from dropping.
                    </p>
                    
                    {/* Fully Interactive Stats Button */}
                    <StatsButton />
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}