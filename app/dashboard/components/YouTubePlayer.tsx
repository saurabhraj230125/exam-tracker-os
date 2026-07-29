"use client";

import { useState, useEffect, useRef } from 'react';
import { Search, ArrowLeft, Play, MonitorPlay, Loader2, AlertCircle, Maximize2, Minimize2, BookOpen, Headphones, GraduationCap, Sparkles, Clock, Target } from 'lucide-react';

export default function YouTubePlayer() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null);
  
  const [isTheater, setIsTheater] = useState(false);
  const [theaterSeconds, setTheaterSeconds] = useState(0);
  const theaterRef = useRef<HTMLDivElement>(null);
  
  const [activeFilter, setActiveFilter] = useState<string>('');
  const [results, setResults] = useState<Array<{ id: string; title: string; channel: string; thumb: string; desc: string }>>([]);

  const filters = [
    { label: "Class 12 One Shots", value: "Class 12 one shot full chapter", icon: Sparkles },
    { label: "JEE 2027 Masterclass", value: "JEE 2027 full lecture marathon", icon: Target },
    { label: "PYQs & Solutions", value: "previous year questions solved", icon: BookOpen },
    { label: "Deep Focus Lo-Fi", value: "lofi hip hop radio beats to study to", icon: Headphones },
  ];

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

  const enterTheater = async () => {
    setIsTheater(true);
    setTimeout(async () => {
      if (theaterRef.current) {
        try {
          if (theaterRef.current.requestFullscreen) {
            await theaterRef.current.requestFullscreen();
          }
          if (window.screen?.orientation?.lock) {
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
      if (window.screen?.orientation?.unlock) {
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
        if (window.screen?.orientation?.unlock) {
          window.screen.orientation.unlock();
        }
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleSearch = async (e?: React.FormEvent, overrideFilter?: string) => {
    if (e) e.preventDefault();
    
    const currentQuery = query.trim();
    const currentFilter = overrideFilter !== undefined ? overrideFilter : activeFilter;
    if (!currentQuery && !currentFilter) return;
    
    setIsSearching(true);
    setError(null);

    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

    if (!apiKey) {
      setError("System Offline: API Key missing. Configure NEXT_PUBLIC_YOUTUBE_API_KEY.");
      setIsSearching(false);
      return;
    }

    try {
      let enhancedQuery = `${currentQuery} ${currentFilter}`;
      const isLofi = enhancedQuery.includes("lofi");
      const durationParam = isLofi ? "any" : "long";
      
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${encodeURIComponent(enhancedQuery)}&type=video&videoDuration=${durationParam}&key=${apiKey}`
      );

      if (!res.ok) throw new Error("Connection to mainframe failed. Verify network or API limits.");

      const data = await res.json();

      const formattedResults = data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#39;/g, "'"),
        channel: item.snippet.channelTitle,
        desc: item.snippet.description,
        thumb: item.snippet.thumbnails.high.url,
      }));

      setResults(formattedResults);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred in the search matrix.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleFilterClick = (filterValue: string) => {
    const newFilter = activeFilter === filterValue ? '' : filterValue;
    setActiveFilter(newFilter);
    if (query.trim() || newFilter) {
      handleSearch(undefined, newFilter);
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative bg-transparent">
      
      {/* 🎬 PRO THEATER MODE */}
      {isTheater && activeVideo && (
        <div ref={theaterRef} className="fixed inset-0 z-[99999] bg-[#020204] flex flex-col">
          <div className="flex-grow w-full relative bg-black flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-indigo-500/5 blur-[150px] rounded-full scale-150 pointer-events-none" />
            <div className="w-full h-full max-w-[1800px] mx-auto shadow-2xl shadow-black relative z-10">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&modestbranding=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="h-20 sm:h-24 bg-[#070709]/95 backdrop-blur-3xl border-t border-white/[0.02] px-6 sm:px-12 flex items-center justify-between shadow-[0_-20px_50px_rgba(0,0,0,0.8)] z-50 animate-in slide-in-from-bottom-24 duration-1000 ease-out fill-mode-both">
            <div className="flex-1 min-w-0 pr-6 hidden sm:block">
              <p className="text-sm font-bold text-zinc-300 truncate" title={activeVideo.title}>
                {activeVideo.title}
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

      {/* 🖥️ TERMINAL INTERFACE (Scrollable & Unblockable) */}
      {activeVideo ? (
        <div className="flex flex-col h-full animate-in fade-in duration-700 bg-[#040406] overflow-hidden relative">
          
          {/* 🚀 STRICT Z-INDEX CONTROL: This header stays strictly on top so you can ALWAYS go back */}
          <div className="flex items-center justify-between p-4 bg-[#070709]/95 backdrop-blur-xl border-b border-white/[0.05] relative z-50 shadow-lg shrink-0">
            <button 
              onClick={() => setActiveVideo(null)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Terminal
            </button>
            
            <button 
              onClick={enterTheater}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-300 hover:text-indigo-200 bg-indigo-500/10 hover:bg-indigo-500/20 px-5 py-2.5 rounded-xl transition-all border border-indigo-500/20 shadow-md active:scale-95"
            >
              <Maximize2 className="h-4 w-4" /> Enter Theater
            </button>
          </div>
          
          <div className="w-full flex-1 bg-black relative z-10 shadow-inner">
            {!isTheater && (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&modestbranding=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      ) : (
        
        <div className="flex flex-col h-full animate-in fade-in duration-700 min-h-0">
          
          <div className="w-full max-w-4xl mx-auto pt-6 pb-4 px-4 shrink-0">
            <form onSubmit={(e) => handleSearch(e)} className="relative group w-full mb-4">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Query: Class 12 Thermodynamics, JEE Advanced Vectors..."
                className="w-full bg-[#040406]/80 border border-white/[0.03] text-zinc-200 text-base rounded-2xl pl-14 pr-32 py-4 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all placeholder:text-zinc-600 shadow-inner"
              />
              <button 
                type="submit" 
                disabled={isSearching}
                className="absolute inset-y-2 right-2 bg-indigo-500/10 hover:bg-indigo-500/20 disabled:bg-transparent text-indigo-300 text-sm font-bold px-6 rounded-xl transition-all flex items-center border border-indigo-500/20"
              >
                {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Execute'}
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {filters.map((f) => {
                const isActive = activeFilter === f.value;
                return (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => handleFilterClick(f.value)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                      isActive 
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.15)]' 
                        : 'bg-[#040406]/50 text-zinc-500 hover:bg-white/[0.02] hover:text-zinc-300 border border-white/[0.02]'
                    }`}
                  >
                    <f.icon className={`h-3.5 w-3.5 ${isActive ? 'text-indigo-400' : 'text-zinc-600'}`} />
                    {f.label}
                  </button>
                )
              })}
            </div>
          </div>

          {error && (
            <div className="max-w-3xl mx-auto w-full mb-4 p-4 rounded-2xl bg-rose-900/10 border border-rose-900/30 flex items-start gap-3 shrink-0">
              <AlertCircle className="h-5 w-5 text-rose-500/80 shrink-0 mt-0.5" />
              <p className="text-sm text-rose-400/80 leading-relaxed">{error}</p>
            </div>
          )}

          {/* 🚀 THE SCROLL FIX: flex-1 coupled with overflow-y-auto lets this container scroll perfectly */}
          <div className="flex-1 w-full overflow-y-auto custom-scrollbar px-4 pb-12 pt-2">
            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {results.map((video) => (
                  <div 
                    key={video.id}
                    onClick={() => setActiveVideo(video)}
                    className="group flex flex-col gap-4 cursor-pointer"
                  >
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#020204] border border-white/[0.02] shadow-xl group-hover:border-indigo-500/20 transition-all duration-700">
                      <img 
                        src={video.thumb} 
                        alt={video.title} 
                        className="object-cover w-full h-full opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out mix-blend-luminosity group-hover:mix-blend-normal" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020204]/80 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-700" />
                      <div className="absolute inset-0 bg-indigo-900/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
                        <div className="h-16 w-16 bg-[#040406]/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 transform scale-75 group-hover:scale-100 transition-transform duration-700 ease-out">
                          <Play className="h-6 w-6 text-indigo-300 fill-indigo-300/50 ml-1" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col px-2">
                      <h4 className="text-base font-medium text-zinc-300 group-hover:text-indigo-300 line-clamp-2 leading-snug transition-colors duration-500" title={video.title}>
                        {video.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="h-5 w-5 rounded-full bg-white/[0.02] flex items-center justify-center text-[9px] font-bold text-zinc-600 border border-white/[0.05]">
                          {video.channel.charAt(0)}
                        </div>
                        <span className="text-[11px] font-medium tracking-wide text-zinc-500">
                          {video.channel}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              !isSearching && query === '' && (
                <div className="h-full w-full flex flex-col items-center justify-center text-center opacity-30 mt-20">
                  <MonitorPlay className="h-16 w-16 text-zinc-600 mb-6" />
                  <p className="text-zinc-500 text-sm font-medium max-w-md">
                    Initialize a query to search the global learning database.
                  </p>
                </div>
              )
            )}
          </div>

        </div>
      )}
    </div>
  );
}