"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { PlaySquare, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [interceptText, setInterceptText] = useState('');

  // 🛡️ THE TACTICAL INTERCEPT 🛡️
  // This listens for the exact millisecond the Google cookie drops and forces the door open.
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || session) {
        setInterceptText('Session Detected. Breaching Matrix...');
        router.push('/dashboard');
        router.refresh(); 
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router, supabase]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setInterceptText('Connecting to Auth Servers...');
    
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Appending ?next=/dashboard ensures the callback knows exactly where to route
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#05070a] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* High-Tension Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.08),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-rose-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl border border-gray-800 bg-[#0a0d12]/90 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col items-center text-center space-y-6">
          
          {/* Branded Icon */}
          <div className="h-16 w-16 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(225,29,72,0.15)] mb-2 relative">
            {loading && <div className="absolute inset-0 border border-rose-500/50 rounded-2xl animate-ping opacity-20" />}
            <PlaySquare className="h-8 w-8" />
          </div>
          
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Focus Mode Player</h1>
            <p className="mt-3 text-xs font-bold uppercase tracking-widest text-gray-500">
              Establish secure connection to the local grid.
            </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full mt-4 flex items-center justify-center gap-3 bg-white hover:bg-gray-200 text-black px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.05)] active:scale-95 group"
          >
            {loading ? (
              <><Loader2 className="h-5 w-5 animate-spin text-rose-600" /> {interceptText}</>
            ) : interceptText ? (
              <><Loader2 className="h-5 w-5 animate-spin text-rose-600" /> {interceptText}</>
            ) : (
              <>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5 group-hover:scale-110 transition-transform" />
                Authenticate Identity
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}