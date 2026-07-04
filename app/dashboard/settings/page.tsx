import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ProfileForm from '@/app/dashboard/components/ProfileForm';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch their current profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name, city, target_exam')
    .eq('id', user.id)
    .single();

  if (!profile) {
    redirect('/dashboard');
  }

  // Package the data into a clean object that perfectly matches the interface
  const cleanProfile = {
    id: profile.id,
    full_name: profile.full_name || null,
    city: profile.city || null,
    target_exam: profile.target_exam || null
  };

  return (
    <div className="min-h-screen bg-[#0B1121] text-slate-200 flex items-center justify-center relative overflow-hidden font-sans p-4 sm:p-6 lg:p-8">
      
      {/* 1. COMFORTING AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Soft, clean falling grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] animate-grid-pan" />
        
        {/* Calming Blue/Indigo Glows */}
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
      </div>

      {/* 2. FORM CONTAINER */}
      <div className="w-full relative z-10 flex items-center justify-center py-10">
        {/* The updated Cozy ProfileForm will render perfectly inside this */}
        <ProfileForm initialData={cleanProfile} />
      </div>
      
    </div>
  );
}