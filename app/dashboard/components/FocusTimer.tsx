"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Play, Pause, Square, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FocusTimer({ userId }: { userId: string }) {
  const router = useRouter();
  const supabase = createClient();
  
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [tabWarning, setTabWarning] = useState(false);
  
  // End of session form state
  const [subject, setSubject] = useState('Physics');
  const [mistake, setMistake] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // 1. The Core Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // 2. THE ANTI-CHEAT ENGINE (Visibility API)
  useEffect(() => {
    const handleVisibilityChange = () => {
      // If the user minimizes the window or switches tabs while studying
      if (document.hidden && isRunning) {
        setIsRunning(false); // Instantly pause the timer
        setTabWarning(true); // Flag the warning
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    if (h > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSaveSession = async () => {
    if (!mistake) return alert("You must log at least 1 mistake or concept to verify this session.");
    setIsSaving(true);
    
    // Convert seconds to minutes for the database
    const durationMinutes = Math.floor(secondsElapsed / 60);

    // FIX: Added 'as any' to bypass the build-time schema type check
    const { error } = await supabase.from('study_sessions' as any).insert({
      student_id: userId,
      duration_minutes: durationMinutes,
      subject_studied: subject,
      mistake_logged: mistake
    });

    if (error) {
      alert("Error saving session: " + error.message);
      setIsSaving(false);
      return;
    }

    // Reset everything after saving
    setSecondsElapsed(0);
    setIsFinished(false);
    setMistake('');
    setTabWarning(false);
    setIsSaving(false);
    router.refresh(); // Triggers a leaderboard update
  };

  if (isFinished) {
    return (
      <div className="w-full max-w-md mx-auto bg-[#0a0d12] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
        <h3 className="text-xl font-black uppercase tracking-wider mb-2 text-emerald-400 flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6" /> Session Complete
        </h3>
        <p className="text-sm text-gray-400 mb-6">
          You tracked <span className="font-bold text-white">{formatTime(secondsElapsed)}</span>. Verify it to hit the leaderboard.
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Subject</label>
            <select value={subject} onChange={e => setSubject(e.target.value)} className="w-full bg-[#11161d] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none">
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Mathematics</option>
              <option>Biology</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Log 1 Mistake / Concept Mastered</label>
            <textarea 
              value={mistake} 
              onChange={e => setMistake(e.target.value)} 
              placeholder="e.g., Forgot that Torque = r × F, not F × r..."
              className="w-full bg-[#11161d] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 outline-none min-h-[100px] resize-none"
            />
          </div>
          <button onClick={handleSaveSession} disabled={isSaving || secondsElapsed < 60} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-[0.2em] text-xs py-4 rounded-xl transition-all disabled:opacity-50">
            {isSaving ? 'Verifying...' : 'Verify & Post to Leaderboard'}
          </button>
          
          {secondsElapsed < 60 && <p className="text-xs text-rose-400 text-center mt-2">Session must be at least 1 minute to save.</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-[#0a0d12] border border-gray-800 rounded-3xl p-8 relative overflow-hidden transition-all">
      {/* Background glow when running */}
      {isRunning && <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full" />}
      
      {tabWarning && (
        <div className="mb-6 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-3 text-rose-400 z-10 relative">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <p className="text-xs font-semibold">Anti-Cheat Triggered: You switched tabs. Your timer was automatically paused.</p>
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-2">Deep Work Engine</h2>
        
        <div className={`text-6xl sm:text-7xl font-black tracking-tighter tabular-nums mb-8 transition-colors duration-500 ${isRunning ? 'text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'text-white'}`}>
          {formatTime(secondsElapsed)}
        </div>

        <div className="flex items-center gap-4 w-full">
          {!isRunning ? (
            <button onClick={() => { setIsRunning(true); setTabWarning(false); }} className="flex-1 bg-white hover:bg-gray-200 text-black flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all">
              <Play className="h-5 w-5 fill-black" /> {secondsElapsed > 0 ? 'Resume' : 'Start Focus'}
            </button>
          ) : (
            <button onClick={() => setIsRunning(false)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all">
              <Pause className="h-5 w-5 fill-white" /> Pause
            </button>
          )}

          {secondsElapsed > 0 && (
            <button onClick={() => { setIsRunning(false); setIsFinished(true); }} className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 flex items-center justify-center p-4 rounded-2xl transition-all">
              <Square className="h-5 w-5 fill-rose-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}