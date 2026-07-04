"use client";

import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Zap, Target, Trophy } from 'lucide-react';

export default function DailyDirective() {
  // We mock 3 daily tactical tasks. In the future, you can pull these from Supabase based on their Syllabus.
  const [tasks, setTasks] = useState([
    { id: 1, title: "Log a 90-Minute Focus Session", completed: false, xp: 50, icon: Zap },
    { id: 2, title: "Clear 1 Pending Syllabus Topic", completed: false, xp: 75, icon: Target },
    { id: 3, title: "Defend Sector Rank Position", completed: false, xp: 100, icon: Trophy },
  ]);

  const [progress, setProgress] = useState(0);

  // Calculate progress percentage dynamically
  useEffect(() => {
    const completedCount = tasks.filter(t => t.completed).length;
    setProgress((completedCount / tasks.length) * 100);
  }, [tasks]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="mb-8 bg-[#0a0d12]/80 backdrop-blur-xl border border-gray-800/60 rounded-3xl p-5 sm:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-top-4 duration-700 delay-100 relative overflow-hidden group">
      
      {/* Dynamic Background Completion Glow */}
      <div 
        className="absolute top-0 left-0 h-full bg-emerald-500/5 transition-all duration-1000 ease-out z-0"
        style={{ width: `${progress}%` }}
      />
      
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center h-6 w-6 rounded-md border transition-colors duration-500 ${progress === 100 ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-rose-500/10 border-rose-500/30'}`}>
              <Target className={`h-3.5 w-3.5 transition-colors duration-500 ${progress === 100 ? 'text-emerald-400' : 'text-rose-500'}`} />
            </div>
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">Daily Directive</h2>
              <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Complete targets to extract XP</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 w-full sm:w-48">
            <div className="flex-1 h-1.5 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
              <div 
                className={`h-full transition-all duration-1000 ease-out ${progress === 100 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-gradient-to-r from-rose-500 to-orange-500'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className={`text-[10px] font-mono font-bold w-8 text-right transition-colors duration-500 ${progress === 100 ? 'text-emerald-400' : 'text-gray-400'}`}>
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 group/task ${
                task.completed 
                  ? 'bg-emerald-500/5 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]' 
                  : 'bg-[#05070a] border-gray-800/80 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center gap-3">
                {task.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)] transition-all scale-110" />
                ) : (
                  <Circle className="h-4 w-4 text-gray-600 group-hover/task:text-gray-400 transition-colors" />
                )}
                <span className={`text-[11px] font-bold tracking-wide text-left transition-all duration-300 ${task.completed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                  {task.title}
                </span>
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded transition-colors duration-300 ${task.completed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-900 text-gray-500'}`}>
                +{task.xp} XP
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}