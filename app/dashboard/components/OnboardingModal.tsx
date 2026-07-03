"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Crosshair } from 'lucide-react';

type AllowedExam = 'JEE' | 'NEET' | 'UPSC' | 'SAT';

interface FormData {
  full_name: string;
  target_exam: AllowedExam;
  target_year: number;
  city: string;
  state: string;
}

export default function OnboardingModal({ 
  userId,
  detectedCity = '',
  detectedState = ''
}: { 
  userId: string;
  detectedCity?: string;
  detectedState?: string;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  
  // 🛡️ THE MAGIC INTERCEPT: The state initializes with the Vercel Edge data!
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    target_exam: 'JEE',
    target_year: new Date().getFullYear() + 1,
    city: detectedCity,
    state: detectedState
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.city || !formData.full_name || !formData.state) return alert('All fields required');

    setLoading(true);
    
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        full_name: formData.full_name,
        target_exam: formData.target_exam,
        target_year: formData.target_year,
        city: formData.city,
        state: formData.state,
      });

    if (error) {
      alert(`Error saving profile: ${error.message}`);
      setLoading(false);
      return;
    }

    router.refresh();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05070a]/90 backdrop-blur-md p-4">
      {/* Tactical Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-lg bg-[#0a0d12] border border-gray-800 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-rose-500/10 p-2 rounded-xl border border-rose-500/20 shadow-[0_0_20px_rgba(225,29,72,0.15)]">
              <Crosshair className="h-5 w-5 text-rose-500" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-wider">Initialize Profile</h2>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Configure your local leaderboards.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Operator Name</label>
              <input type="text" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} className="w-full bg-[#05070a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 outline-none transition-all" placeholder="Rahul Kumar" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Target Protocol</label>
                <select 
                  value={formData.target_exam} 
                  onChange={e => setFormData({...formData, target_exam: e.target.value as AllowedExam})} 
                  className="w-full bg-[#05070a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-rose-500/50 outline-none appearance-none transition-all"
                >
                  <option value="JEE">JEE Main/Adv</option>
                  <option value="NEET">NEET</option>
                  <option value="UPSC">UPSC</option>
                  <option value="SAT">SAT</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Target Year</label>
                <input type="number" value={formData.target_year} onChange={e => setFormData({...formData, target_year: parseInt(e.target.value)})} className="w-full bg-[#05070a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-rose-500/50 outline-none transition-all" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Sector (City)</label>
                <input type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-[#05070a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-rose-500/50 outline-none transition-all" placeholder="Bokaro" required />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Region (State)</label>
                <input type="text" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full bg-[#05070a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-rose-500/50 outline-none transition-all" placeholder="Jharkhand" required />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full mt-6 bg-white hover:bg-gray-200 text-black font-black uppercase tracking-[0.2em] text-xs py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Deploy Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}