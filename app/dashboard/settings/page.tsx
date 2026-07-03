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

  // FIX 3: Package the data into a clean object that perfectly matches the interface
  const cleanProfile = {
    id: profile.id,
    full_name: profile.full_name || null,
    city: profile.city || null,
    target_exam: profile.target_exam || null
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-white p-4 sm:p-8 pt-20 flex items-center justify-center">
      <div className="w-full">
        {/* Pass the deeply cleaned profile data */}
        <ProfileForm initialData={cleanProfile} />
      </div>
    </div>
  );
}