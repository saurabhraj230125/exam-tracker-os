"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Settings, Loader2, Lock, BarChart2 } from 'lucide-react';

export function SettingsButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button 
      onClick={() => { 
        setIsLoading(true); 
        router.push('/dashboard/settings'); 
      }}
      disabled={isLoading}
      className="flex items-center gap-3 px-5 py-3 bg-[#0a0d12] border border-gray-800 rounded-xl hover:border-rose-500/50 hover:bg-rose-500/5 text-gray-400 hover:text-rose-400 transition-all group shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="text-left">
        <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-rose-500/70 transition-colors">Setup Alias</p>
        <p className="text-xs font-black uppercase tracking-wider">{isLoading ? 'Connecting...' : 'Forge Identity'}</p>
      </div>
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin text-rose-500" />
      ) : (
        <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform duration-500" />
      )}
    </button>
  );
}

export function StatsButton() {
  // A 3-phase state machine: idle -> loading -> locked
  const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'locked'>('idle');

  const handleClick = () => {
    // Phase 1: Lockout and Spin
    setButtonState('loading');

    // Phase 2: Show the V2.0 Lock message after 1.5s
    setTimeout(() => {
      setButtonState('locked');
      
      // Phase 3: Smoothly reset back to idle after 3s so the button isn't permanently broken
      setTimeout(() => {
        setButtonState('idle');
      }, 3000);
      
    }, 1500);
  };

  return (
    <button 
      onClick={handleClick}
      disabled={buttonState !== 'idle'}
      className={`w-full py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 duration-300 ${
        buttonState === 'idle' 
          ? 'bg-white hover:bg-orange-500 text-black hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]' 
          : buttonState === 'loading'
          ? 'bg-gray-900 border border-gray-800 text-gray-500 cursor-not-allowed opacity-80'
          : 'bg-rose-500/10 border border-rose-500/50 text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.2)]'
      }`}
    >
      {buttonState === 'idle' && (
        <><BarChart2 className="h-4 w-4" /> View Advanced Stats</>
      )}
      
      {buttonState === 'loading' && (
        <><Loader2 className="h-4 w-4 animate-spin text-orange-500" /> Calculating Matrix...</>
      )}
      
      {buttonState === 'locked' && (
        <><Lock className="h-4 w-4" /> Grid Unlocks in V2.0</>
      )}
    </button>
  );
}