"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlaySquare, Loader2, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [interceptText, setInterceptText] = useState('');

  const handleBypassLogin = () => {
    setLoading(true);
    setInterceptText('Initiating Focus Sequence...');
    
    setTimeout(() => {
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#030305] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-indigo-500/30">
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      
      <div className="relative z-10 w-full max-w-md p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent shadow-2xl shadow-indigo-500/5 overflow-hidden group">
        
        <div className={`absolute inset-0 bg-gradient-to-r from-indigo-500/30 via-cyan-400/30 to-indigo-500/30 transition-opacity duration-1000 bg-[length:200%_auto] animate-[shimmer_4s_linear_infinite] ${loading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

        <div className="relative bg-[#0a0a0c]/95 backdrop-blur-3xl rounded-[2.4rem] p-8 sm:p-10 flex flex-col items-center text-center">
          
          <div className="relative h-20 w-20 mb-6 flex items-center justify-center">
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500/20 to-cyan-400/20 border border-indigo-500/30 transition-transform duration-700 ${loading ? 'scale-90' : 'scale-100'}`} />
            {loading && (
              <div className="absolute inset-0 rounded-3xl border border-cyan-400/50 animate-ping opacity-20" />
            )}
            <PlaySquare className={`h-8 w-8 text-indigo-400 transition-transform duration-700 ${loading ? 'scale-110' : 'scale-100'}`} />
            {!loading && (
              <Sparkles className="absolute -top-2 -right-2 h-4 w-4 text-cyan-400 animate-pulse" />
            )}
          </div>
          
          <div className="space-y-3 mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Focus Mode <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">Player</span>
            </h1>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Establish secure connection to the local grid
            </p>
          </div>

          <button
            onClick={handleBypassLogin}
            disabled={loading}
            className="w-full relative flex items-center justify-center gap-3 bg-zinc-100 hover:bg-white text-zinc-900 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-[0.98] overflow-hidden"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                <span className="text-zinc-900">{interceptText}</span>
              </>
            ) : (
              <>
                Enter Workspace
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
              </>
            )}
          </button>
          
        </div>
      </div>
    </div>
  );
}