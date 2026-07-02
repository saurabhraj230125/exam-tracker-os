"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Target } from 'lucide-react';

// FIX: We explicitly define the allowed types for the exam so TypeScript is happy.
type AllowedExam = 'JEE' | 'NEET' | 'UPSC' | 'SAT';

interface FormData {
  full_name: string;
  target_exam: AllowedExam;
  target_year: number;
  city: string;
  state: string;
}

export default function OnboardingModal({ userId }: { userId: string }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  
  // FIX: We apply the FormData interface to our state
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    target_exam: 'JEE',
    target_year: new Date().getFullYear() + 1,
    city: '',
    state: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.city || !formData.full_name || !formData.state) return alert('All fields required');

    setLoading(true);
    
    // Using upsert in case the auth trigger didn't create the profile row yet
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

    // Refresh the page to clear the gatekeeper modal
    router.refresh();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-[#0a0d12] border border-gray-800 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.05)] overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
              <Target className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-wider">Initialize Profile</h2>
              <p className="text-xs text-gray-500">Configure your local leaderboards.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Display Name</label>
              <input type="text" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} className="w-full bg-[#11161d] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none" placeholder="Rahul Kumar" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Target Exam</label>
                {/* FIX: We cast the event value to AllowedExam to satisfy TypeScript */}
                <select 
                  value={formData.target_exam} 
                  onChange={e => setFormData({...formData, target_exam: e.target.value as AllowedExam})} 
                  className="w-full bg-[#11161d] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none appearance-none"
                >
                  <option value="JEE">JEE Main/Adv</option>
                  <option value="NEET">NEET</option>
                  <option value="UPSC">UPSC</option>
                  <option value="SAT">SAT</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Target Year</label>
                <input type="number" value={formData.target_year} onChange={e => setFormData({...formData, target_year: parseInt(e.target.value)})} className="w-full bg-[#11161d] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">City</label>
                <input type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-[#11161d] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none" placeholder="Bokaro" required />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">State</label>
                <input type="text" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full bg-[#11161d] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none" placeholder="Jharkhand" required />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-[0.2em] text-xs py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Deploy Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}