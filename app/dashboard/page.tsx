import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import FocusTimer from '@/app/dashboard/components/FocusTimer';
import LiveFeed from '@/app/dashboard/components/LiveFeed';
import Leaderboard from '@/app/dashboard/components/Leaderboard';
import LectureEngine from '@/app/dashboard/components/LectureEngine';
import SyllabusTracker from '@/app/dashboard/components/SyllabusTracker';

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
    <div className="min-h-screen bg-[#05070a] text-white p-4 sm:p-8 pt-10 sm:pt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Interactive Header: Personalized Greeting */}
        <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Welcome back, <span className="text-emerald-400">{profile?.full_name?.split(' ')[0]}</span>
          </h1>
          <p className="text-gray-500 font-medium mt-2 tracking-widest uppercase text-xs">
            {profile?.city} • {profile?.target_exam} COMMAND CENTER
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Social Feed */}
          <div className="lg:col-span-3 order-2 lg:order-1">
             <div className="sticky top-20">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-6 pb-2 border-b border-gray-800">Global Grind</h2>
                <LiveFeed />
             </div>
          </div>

          {/* Center Column: The Action Core */}
          <div className="lg:col-span-6 flex flex-col gap-6 order-1 lg:order-2">
            <div className="space-y-6 animate-in zoom-in duration-500">
                <LectureEngine />
                <FocusTimer userId={user.id} /> 
                <SyllabusTracker targetExam={profile?.target_exam || 'JEE'} />
            </div>
          </div>

          {/* Right Column: Status & Competition */}
          <div className="lg:col-span-3 order-3">
            <div className="sticky top-20">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-6 pb-2 border-b border-gray-800">
                Top Rivals ({profile?.city})
                </h2>
                <Leaderboard userCity={profile?.city || ''} userExam={profile?.target_exam || ''} />
                
                {/* Interactive Call to Action */}
                <div className="mt-8 p-6 bg-gradient-to-b from-emerald-900/20 to-transparent border border-emerald-500/10 rounded-3xl">
                    <h3 className="text-sm font-black uppercase">Level Up</h3>
                    <p className="text-xs text-gray-400 mt-2 mb-4">You are currently ranked in the top 40% of {profile?.city}. Study 60 more minutes to enter the elite tier.</p>
                    <button className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase rounded-lg transition-transform hover:scale-105">View Full Stats</button>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}