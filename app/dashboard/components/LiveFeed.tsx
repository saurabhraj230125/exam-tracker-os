import { createClient } from '@/lib/supabase/server';
import { Zap, BookOpen, Clock } from 'lucide-react';

export default async function LiveFeed() {
  const supabase = await createClient();
  
  const { data } = await supabase
    .from('study_sessions')
    .select('id, duration_minutes, subject_studied, mistake_logged, created_at, profiles(full_name, target_exam, city)')
    .order('created_at', { ascending: false })
    .limit(10);

  // FIX 1: We cast to 'any[]' so TypeScript allows us to read the mistake_logged property.
  const sessions = (data as any[]) || [];

  if (sessions.length === 0) {
    return <p className="text-gray-500 text-sm">No activity yet. Be the first to log a session!</p>;
  }

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
      {sessions.map((session) => {
        // Safety check: Sometimes Supabase returns joined data as an array.
        const profile = Array.isArray(session.profiles) ? session.profiles[0] : session.profiles;

        return (
          <div key={session.id} className="bg-[#11161d] border border-gray-800 rounded-2xl p-4 transition-all hover:border-gray-700">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm font-bold text-white flex items-center gap-2">
                  <Zap className="h-4 w-4 text-emerald-400 fill-emerald-400" />
                  {profile?.full_name || 'Anonymous'}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">
                  {profile?.city} • {profile?.target_exam}
                </p>
              </div>
              <div className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                <Clock className="h-3 w-3" /> {session.duration_minutes}m
              </div>
            </div>
            
            <div className="mt-3">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded mb-2">
                <BookOpen className="h-3 w-3" /> {session.subject_studied}
              </span>
              {/* FIX 2: Fixed the 'clasasName' typo here to 'className' */}
              <p className="text-xs text-gray-400 italic border-l-2 border-gray-700 pl-3 py-1">
                "{session.mistake_logged}"
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}