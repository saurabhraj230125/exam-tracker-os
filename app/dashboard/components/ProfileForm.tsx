"use client";

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { UserCircle, MapPin, Target, Loader2, Save, ArrowLeft, Settings2, CheckCircle2 } from 'lucide-react';

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
  
  // Smooth, frictionless states
  const [isSaving, setIsSaving] = useState(false);
  const [isNavigatingBack, setIsNavigatingBack] = useState(false);
  const [loadingText, setLoadingText] = useState('Save Changes');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');
    setIsSuccess(false);
    setLoadingText('Updating profile...');

    const { error } = await supabase
      .from('profiles' as any)
      .update({
        full_name: username,
        city: city,
        target_exam: exam,
      })
      .eq('id', initialData.id);

    if (error) {
      setMessage('Something went wrong. Please try again.');
      setIsSaving(false);
      setLoadingText('Save Changes');
    } else {
      // Smooth, friendly success state
      setLoadingText('Profile Updated!');
      setIsSuccess(true);
      setMessage('Your study profile has been successfully updated.');
      router.refresh();
      
      // Gentle auto-redirect back to the workspace
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    }
  };

  const handleBack = () => {
    setIsNavigatingBack(true);
    router.push('/dashboard');
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl shadow-indigo-900/10 relative overflow-hidden">
      
      {/* Soft Ambient Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Friendly Back Button */}
      <button 
        onClick={handleBack}
        disabled={isNavigatingBack || isSaving}
        className="relative z-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-indigo-400 transition-colors mb-8 disabled:opacity-50"
      >
        {isNavigatingBack ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Returning...</>
        ) : (
          <><ArrowLeft className="h-4 w-4" /> Back to Workspace</>
        )}
      </button>

      <div className="mb-10 relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Settings2 className="h-5 w-5 text-indigo-400" />
          <span className="text-[11px] font-bold text-indigo-400 tracking-widest uppercase">Profile Settings</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white mb-3">Update Identity</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Customize how you appear in the Live Study Lounge. Only your first name and city will be visible to other students.
        </p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-6 relative z-10">
        
        {/* Display Name Field */}
        <div className="group">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 group-focus-within:text-indigo-400 transition-colors">
            <UserCircle className="h-4 w-4" /> Display Name
          </label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g., Rahul Kumar"
            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl px-5 py-4 text-sm text-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-inner font-medium placeholder:text-slate-600"
            required
            maxLength={20}
            disabled={isSaving}
          />
        </div>

        {/* City Field */}
        <div className="group">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 group-focus-within:text-indigo-400 transition-colors">
            <MapPin className="h-4 w-4" /> Study Base (City)
          </label>
          <input 
            type="text" 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g., Bokaro"
            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl px-5 py-4 text-sm text-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-inner font-medium placeholder:text-slate-600"
            required
            disabled={isSaving}
          />
        </div>

        {/* Target Goal Field */}
        <div className="group">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 group-focus-within:text-indigo-400 transition-colors">
            <Target className="h-4 w-4" /> Target Goal
          </label>
          <select 
            value={exam}
            onChange={(e) => setExam(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl px-5 py-4 text-sm text-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-inner font-medium appearance-none cursor-pointer"
            disabled={isSaving}
          >
            <option value="JEE">JEE (Engineering)</option>
            <option value="NEET">NEET (Medical)</option>
            <option value="SAT">SAT (International)</option>
            <option value="UPSC">UPSC (Civil Services)</option>
          </select>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isSaving || isNavigatingBack}
          className="w-full mt-8 bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-sm py-4 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/20 active:scale-95"
        >
          {isSaving && !isSuccess ? (
            <><Loader2 className="h-5 w-5 animate-spin" /> {loadingText}</>
          ) : isSuccess ? (
            <><CheckCircle2 className="h-5 w-5 text-white" /> {loadingText}</>
          ) : (
            <><Save className="h-5 w-5" /> {loadingText}</>
          )}
        </button>

        {/* Success Message */}
        {message && (
          <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl animate-in fade-in zoom-in duration-300">
            <p className="text-center text-xs font-bold text-emerald-400">
              {message}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}