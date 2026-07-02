import { createClient } from '@/lib/supabase/server';
import { Trophy, Medal } from 'lucide-react';

export default async function Leaderboard({ userCity, userExam }: { userCity: string, userExam: string }) {
  const supabase = await createClient();
  
  // FIX 1: We use 'as any' on userExam so TypeScript stops panicking about the exact string type.
  const { data } = await supabase
    .from('profiles')
    .select('full_name, study_sessions(duration_minutes)')
    .eq('city', userCity)
    .eq('target_exam', userExam as any);

  // FIX 2: We cast the result to 'any[]' to bypass the 'never' error on joined tables.
  const profiles = (data as any[]) || [];

  // Calculate total minutes for each student
  const rankedStudents = profiles.map(student => {
    const sessions = student.study_sessions || [];
    // Safety check in case Supabase returns a single object instead of an array
    const sessionsArray = Array.isArray(sessions) ? sessions : [sessions];
    
    const totalMinutes = sessionsArray.reduce((acc: number, curr: any) => acc + (curr.duration_minutes || 0), 0);
    return { name: student.full_name, totalMinutes };
  })
  .sort((a, b) => b.totalMinutes - a.totalMinutes) // Sort highest to lowest
  .slice(0, 5); // Take top 5

  return (
    <div className="space-y-3">
      {rankedStudents.length === 0 ? (
        <p className="text-gray-500 text-sm">No rivals found in {userCity} yet.</p>
      ) : (
        rankedStudents.map((student, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-[#11161d] border border-gray-800 rounded-xl">
            <div className="flex items-center gap-3">
              {index === 0 ? (
                <Trophy className="h-5 w-5 text-yellow-400" />
              ) : index === 1 ? (
                <Medal className="h-5 w-5 text-gray-300" />
              ) : index === 2 ? (
                <Medal className="h-5 w-5 text-amber-600" />
              ) : (
                <span className="h-5 w-5 flex items-center justify-center text-xs font-bold text-gray-500">{index + 1}</span>
              )}
              <span className="text-sm font-bold text-white">{student.name}</span>
            </div>
            <span className="text-xs font-black tracking-widest text-emerald-400">
              {student.totalMinutes} MIN
            </span>
          </div>
        ))
      )}
    </div>
  );
}