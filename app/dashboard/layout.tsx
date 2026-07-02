import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import OnboardingModal from '@/app/dashboard/components/OnboardingModal';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch their profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('target_exam, city')
    .eq('id', user.id)
    .single();

  // The Gatekeeper Logic
  const needsOnboarding = !profile?.target_exam || !profile?.city;

  return (
    <div className="min-h-screen bg-[#05070a] text-white">
      {needsOnboarding && <OnboardingModal userId={user.id} />}
      
      {/* If onboarding is needed, we still render the background so the modal overlays it nicely, but we can hide children or blur them */}
      <div className={needsOnboarding ? 'blur-md pointer-events-none' : ''}>
        {children}
      </div>
    </div>
  );
}