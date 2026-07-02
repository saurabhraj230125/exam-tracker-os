"use client";

import { createClient } from '@/lib/supabase/client';
import { TerminalSquare } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#05070a] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(239,68,68,0.05),transparent_40%)] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md p-8 rounded-3xl border border-gray-800 bg-[#0a0d12] shadow-2xl">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <TerminalSquare className="h-8 w-8" />
          </div>
          
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white">Exam Tracker OS</h1>
            <p className="mt-2 text-sm text-gray-400">Sign in to access the multiplayer dashboard.</p>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black px-6 py-3.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
          >
            {loading ? "Connecting to server..." : (
              <>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
                Continue with Google
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}