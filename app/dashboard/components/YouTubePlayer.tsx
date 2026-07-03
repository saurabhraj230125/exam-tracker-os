"use client";

import { useState } from 'react';
import { Crosshair, Play, AlertTriangle } from 'lucide-react';

export default function YouTubePlayer() {
  const [inputUrl, setInputUrl] = useState('');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [error, setError] = useState('');

  // 🛡️ THE UNIVERSAL EXTRACTOR ENGINE 🛡️
  // This Regex intercepts watch?v=, youtu.be, /live/, /embed/, and /shorts/
  const extractYouTubeID = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|live\/|shorts\/|watch\?v=|watch\?.+&v=))([^&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const handleLockIn = (e: React.FormEvent) => {
    e.preventDefault();
    const extractedId = extractYouTubeID(inputUrl);
    
    if (extractedId) {
      setActiveVideoId(extractedId);
      setError('');
      setInputUrl(''); // Clear the input after locking in
    } else {
      setError('Signal Corrupted. Paste a valid YouTube or Live URL.');
      setActiveVideoId(null);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Target Input Console */}
      <form onSubmit={handleLockIn} className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-rose-500">
            <Crosshair className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="PASTE YOUTUBE OR LIVE LINK HERE..."
            className="w-full bg-[#0a0d12] border border-gray-800 text-white text-sm uppercase tracking-widest rounded-xl pl-10 pr-4 py-4 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all placeholder:text-gray-600 shadow-inner"
          />
        </div>
        <button
          type="submit"
          className="bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] active:scale-95 flex items-center gap-2"
        >
          <Play className="h-4 w-4" />
          Lock In
        </button>
      </form>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-widest bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg animate-in fade-in zoom-in duration-300">
          <AlertTriangle className="h-4 w-4" />
          {error}
        </div>
      )}

      {/* The Visual Grid (Video Player) */}
      {activeVideoId ? (
        <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-4 duration-700">
          <iframe
            src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
            title="Focus Target"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      ) : (
        <div className="relative w-full aspect-video bg-[#0a0d12]/50 rounded-2xl overflow-hidden border border-gray-800/50 flex flex-col items-center justify-center text-gray-700 space-y-3">
          <Crosshair className="h-12 w-12 opacity-20" />
          <p className="text-xs font-bold uppercase tracking-widest">Awaiting Video Target</p>
        </div>
      )}
    </div>
  );
}