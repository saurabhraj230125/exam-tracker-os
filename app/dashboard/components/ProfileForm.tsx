"use client";

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { UserCircle, MapPin, Target, Loader2, Save, ArrowLeft, Terminal } from 'lucide-react';

interface ProfileData {
  id: string;
  full_name: string | null;
  city: string | null;
  target_exam: any; 
}

export default function ProfileForm({ initialData }: { initialData: ProfileData }) {
  const supabase = createClient();
  const router = useRouter();
  
  const [username, setUsername] = useState(initialData.full_name || '');
  const [city, setCity] = useState(initialData.city || '');
  const [exam, setExam] = useState(initialData.target_exam || 'JEE');
  
  // Tactical Lockout States
  const [isSaving, setIsSaving] = useState(false);
  const [isNavigatingBack, setIsNavigatingBack] = useState(false);
  const [loadingText, setLoadingText] = useState('Lock In Identity');
  const [message, setMessage] = useState('');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');
    setLoadingText('Encrypting Alias...');

    const { error } = await supabase
      .from('profiles' as any)
      .update({
        full_name: username,
        city: city,
        target_exam: exam,
      })
      .eq('id', initialData.id);

    if (error) {
      setMessage('WARNING: Error updating identity matrix.');
      setIsSaving(false);
      setLoadingText('Lock In Identity');
    } else {
      // Psychological multi-stage loading effect
      setLoadingText('Committing to Grid...');
      
      setTimeout(() => {
        setLoadingText('Identity Forged.');
        setMessage('SUCCESS: New alias broadcasted to the local leaderboard.');
        router.refresh();
        
        setTimeout(() => {
          router.push('/dashboard');
        }, 1200);
      }, 1000);
    }
  };

  const handleBack = () => {
    setIsNavigatingBack(true);
    router.push('/dashboard');
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-[#0a0d12]/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
      
      {/* HUD Scanline Effect & Glow */}
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-600/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Tactile Lockout Back Button */}
      <button 
        onClick={handleBack}
        disabled={isNavigatingBack || isSaving}
        className="relative z-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-rose-400 transition-colors mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isNavigatingBack ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Rerouting...</>
        ) : (
          <><ArrowLeft className="h-4 w-4" /> Abort & Return</>
        )}
      </button>

      <div className="mb-10 relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Terminal className="h-5 w-5 text-rose-500" />
          <span className="text-[10px] font-mono text-rose-500 tracking-[0.3em] uppercase">System Override</span>
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Forge Identity</h2>
        <p className="text-xs text-gray-500 mt-3 leading-relaxed font-medium">
          Your default identity is exposed. Enter a custom alias to remain anonymous while you hunt for the #1 rank in your local sector.
        </p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-6 relative z-10">
        
        <div className="group">
          <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-rose-400 transition-colors">
            <UserCircle className="h-4 w-4" /> Phantom Alias
          </label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g., Ghost, Rank1Hunter, Void..."
            className="w-full bg-[#05070a] border border-gray-800 rounded-xl px-4 py-4 text-sm text-white focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition-all shadow-inner font-bold tracking-wide"
            required
            maxLength={20}
            disabled={isSaving}
          />
        </div>

        <div className="group">
          <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-rose-400 transition-colors">
            <MapPin className="h-4 w-4" /> War Zone (Sector)
          </label>
          <input 
            type="text" 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g., Bokaro, Kota, Delhi..."
            className="w-full bg-[#05070a] border border-gray-800 rounded-xl px-4 py-4 text-sm text-white focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition-all shadow-inner font-bold tracking-wide"
            required
            disabled={isSaving}
          />
        </div>

        <div className="group">
          <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-rose-400 transition-colors">
            <Target className="h-4 w-4" /> Target Protocol
          </label>
          <select 
            value={exam}
            onChange={(e) => setExam(e.target.value)}
            className="w-full bg-[#05070a] border border-gray-800 rounded-xl px-4 py-4 text-sm text-white focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition-all shadow-inner font-bold tracking-wide appearance-none"
            disabled={isSaving}
          >
            <option value="JEE">JEE (Engineering)</option>
            <option value="NEET">NEET (Medical)</option>
            <option value="SAT">SAT (International)</option>
            <option value="UPSC">UPSC (Civil Services)</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={isSaving || isNavigatingBack}
          className="w-full mt-6 bg-white hover:bg-gray-200 text-black font-black uppercase tracking-[0.2em] text-xs py-5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
        >
          {isSaving ? (
            <><Loader2 className="h-5 w-5 animate-spin" /> {loadingText}</>
          ) : (
            <><Save className="h-5 w-5" /> {loadingText}</>
          )}
        </button>

        {message && (
          <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/20 rounded-xl animate-in fade-in zoom-in duration-300">
            <p className="text-center text-[10px] font-mono tracking-widest uppercase text-emerald-400">
              {message}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}