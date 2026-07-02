"use client";

import { useState } from 'react';
import { Video, X, PlaySquare, ShieldAlert } from 'lucide-react';

export default function LectureEngine() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);

  // A regex function to pull the exact Video ID out of any messy YouTube link
  const extractYouTubeID = (link: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = link.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleLoadVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const id = extractYouTubeID(url);
    if (id) {
      setVideoId(id);
      setUrl(''); // Clear the input
    } else {
      alert("Invalid link. Paste a real YouTube URL.");
    }
  };

  return (
    <div className="w-full bg-[#0a0d12] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl transition-all">
      
      {!videoId ? (
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-rose-500/10 p-2 rounded-xl border border-rose-500/20">
              {/* FIXED: Using the Video icon instead of the deprecated Youtube icon */}
              <Video className="h-5 w-5 text-rose-500" />
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-white">Zen Lecture Mode</h2>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Bypass the algorithm trap</p>
            </div>
          </div>
          
          <form onSubmit={handleLoadVideo} className="flex gap-2">
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube lecture link here..." 
              className="flex-1 bg-[#11161d] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-rose-500 outline-none transition-colors"
              required
            />
            <button type="submit" className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center transition-all">
              <PlaySquare className="h-5 w-5" />
            </button>
          </form>
          <div className="mt-4 flex items-start gap-2 text-gray-500">
            <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-rose-500/50" />
            <p className="text-[10px] uppercase tracking-wider">Blocks comments, sidebar recommendations, and Shorts. Pure focus.</p>
          </div>
        </div>
      ) : (
        <div className="relative group">
          {/* Close button that appears when you hover */}
          <button 
            onClick={() => setVideoId(null)} 
            className="absolute -top-3 -right-3 z-50 bg-rose-500 hover:bg-rose-400 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 translate-x-4 group-hover:translate-x-0 m-6"
            title="Close Video"
          >
            <X className="h-4 w-4" />
          </button>
          
          {/* 16:9 Aspect Ratio Container for the YouTube Iframe */}
          <div className="relative w-full aspect-video bg-black">
            <iframe 
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`} 
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
          <div className="bg-[#11161d] border-t border-gray-800 p-3 flex justify-between items-center">
            <p className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Algorithm successfully blocked</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Start your timer below</p>
          </div>
        </div>
      )}
    </div>
  );
}