"use client";

import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, MonitorPlay, AlertCircle, Maximize2, Minimize2, Clock, Link2, Cpu, Sparkles } from 'lucide-react';

export default function YouTubePlayer() {
  const [inputUrl, setInputUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  
  const [isTheater, setIsTheater] = useState(false);
  const [theaterSeconds, setTheaterSeconds] = useState(0);
  const theaterRef = useRef<HTMLDivElement>(null);

  // ⏱️ Theater Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTheater) {
      interval = setInterval(() => {
        setTheaterSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setTheaterSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isTheater]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    if (h > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // 🎬 NATIVE FULLSCREEN & LANDSCAPE LOGIC (Vercel TS Error Proof)
  const enterTheater = async () => {
    setIsTheater(true);
    setTimeout(async () => {
      if (theaterRef.current) {
        try {
          if (theaterRef.current.requestFullscreen) {
            await theaterRef.current.requestFullscreen();
          }
          // @ts-ignore - Bypassing Vercel TypeScript strict checks for experimental API
          if (window.screen?.orientation?.lock) {
            // @ts-ignore
            await window.screen.orientation.lock('landscape').catch(() => {});
          }
        } catch (e) {
          console.error("Fullscreen API Error:", e);
        }
      }
    }, 100);
  };

  const exitTheater = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
      // @ts-ignore
      if (window.screen?.orientation?.unlock) {
        // @ts-ignore
        window.screen.orientation.unlock();
      }
    } catch (e) {
      console.error(e);
    }
    setIsTheater(false);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsTheater(false);
        // @ts-ignore
        if (window.screen?.orientation?.unlock) {
          // @ts-ignore
          window.screen.orientation.unlock();
        }
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // 🧠 SMART YOUTUBE URL PARSER
  const extractYouTubeId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleInitialize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    setError(null);
    const videoId = extractYouTubeId(inputUrl);

    if (videoId) {
      setActiveVideoId(videoId);
      setInputUrl(''); // clear input
    } else {
      setError("Invalid link. Please paste a valid YouTube URL (e.g., https://youtu.be/...)");
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative bg-transparent">
      
      {/* 🎬 PRO THEATER MODE */}
      {isTheater && activeVideoId && (
        <div ref={theaterRef} className="fixed inset-0 z-[99999] bg-[#020204] flex flex-col">
          <div className="flex-grow w-full relative bg-black flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-indigo-500/5 blur-[150px] rounded-full scale-150 pointer-events-none" />
            <div className="w-full h-full max-w-[1800px] mx-auto shadow-2xl shadow-black relative z-10">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&modestbranding=1&rel=0`}
                title="YouTube Deep Focus Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="h-20 sm:h-24 bg-[#070709]/95 backdrop-blur-3xl border-t border-white/[0.02] px-6 sm:px-12 flex items-center justify-between shadow-[0_-20px_50px_rgba(0,0,0,0.8)] z-50 animate-in slide-in-from-bottom-24 duration-1000 ease-out fill-mode-both">
            <div className="flex-1 min-w-0 pr-6 hidden sm:block">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-indigo-400" />
                <p className="text-sm font-bold text-zinc-300 tracking-wide">
                  IMMERSIVE LECTURE MODE
                </p>
              </div>
              <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest mt-1.5 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                System Active
              </p>
            </div>

            <div className="flex-1 flex justify-center shrink-0">
              <div className="flex items-center gap-3 bg-black/50 px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl border border-white/[0.03]">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400/80" />
                <span className="text-2xl sm:text-3xl font-light tracking-[0.1em] text-zinc-100 font-mono">
                  {formatTime(theaterSeconds)}
                </span>
              </div>
            </div>

            <div className="flex-1 flex justify-end shrink-0 pl-6">
              <button 
                onClick={exitTheater}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-100 bg-white/5 hover:bg-white/10 px-5 py-3 rounded-xl transition-all border border-white/[0.02]"
              >
                <Minimize2 className="h-4 w-4" /> End Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🖥️ TERMINAL INTERFACE */}
      {activeVideoId ? (
        <div className="flex flex-col h-full animate-in fade-in duration-700 bg-[#040406] overflow-hidden relative">
          
          <div className="flex items-center justify-between p-4 bg-[#070709]/95 backdrop-blur-xl border-b border-white/[0.05] relative z-50 shadow-lg shrink-0">
            <button 
              onClick={() => setActiveVideoId(null)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" /> Terminate Session
            </button>
            
            <button 
              onClick={enterTheater}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-300 hover:text-indigo-200 bg-indigo-500/10 hover:bg-indigo-500/20 px-5 py-2.5 rounded-xl transition-all border border-indigo-500/20 shadow-md active:scale-95 group"
            >
              <Maximize2 className="h-4 w-4 group-hover:scale-110 transition-transform" /> Enter Theater
            </button>
          </div>
          
          <div className="w-full flex-1 bg-black relative z-10 shadow-inner">
            {!isTheater && (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&modestbranding=1&rel=0`}
                title="YouTube Deep Focus Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      ) : (
        
        <div className="flex flex-col h-full animate-in fade-in duration-700 items-center justify-center min-h-[400px]">
          
          <div className="w-full max-w-3xl mx-auto p-8 sm:p-12 rounded-[2.5rem] bg-[#070709]/50 border border-white/[0.03] shadow-2xl relative overflow-hidden group">
            
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-b from-indigo-500/20 to-transparent border border-indigo-500/20 flex items-center justify-center mb-8 shadow-inner">
                <MonitorPlay className="h-10 w-10 text-indigo-400" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-3 tracking-tight">
                Initialize Lecture
              </h2>
              <p className="text-sm text-zinc-500 mb-10 max-w-md mx-auto leading-relaxed">
                Paste any YouTube URL to strip away distractions, comments, and recommendations. Enter pure focus mode.
              </p>

              <form onSubmit={handleInitialize} className="relative w-full max-w-xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <Link2 className="h-5 w-5 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-[#040406]/80 border border-white/[0.05] text-zinc-200 text-base rounded-2xl pl-14 pr-36 py-5 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-700 shadow-inner"
                />
                <button 
                  type="submit" 
                  className="absolute inset-y-2.5 right-2.5 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-bold px-6 rounded-xl transition-all flex items-center shadow-[0_0_20px_rgba(99,102,241,0.2)] active:scale-95"
                >
                  <Sparkles className="h-4 w-4 mr-2 opacity-70" />
                  Load
                </button>
              </form>

              {error && (
                <div className="mt-6 p-4 rounded-xl bg-rose-900/10 border border-rose-900/30 flex items-center justify-center gap-3 w-full max-w-xl animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="h-4 w-4 text-rose-500/80 shrink-0" />
                  <p className="text-xs font-medium text-rose-400/80">{error}</p>
                </div>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}