import OnboardingModal from '@/app/dashboard/components/OnboardingModal';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // 🚧 MOCKED AUTH TO ENTER WORKSPACE FREELY 🚧
  const mockUser = { id: 'mock-user-123' };
  
  // Set target_exam to null if you want to test seeing the Onboarding Modal
  const mockProfile = { 
    target_exam: 'UPSC', 
    city: 'Bokaro' 
  };

  const needsOnboarding = !mockProfile.target_exam || !mockProfile.city;

  return (
    <div className="min-h-screen bg-[#030305] text-zinc-200 relative selection:bg-indigo-500/30">
      
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {needsOnboarding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-500">
          <OnboardingModal userId={mockUser.id} />
        </div>
      )}
      
      <div 
        className={`transition-all duration-1000 ease-out min-h-screen ${
          needsOnboarding 
            ? 'blur-xl opacity-40 scale-[0.98] pointer-events-none' 
            : 'blur-0 opacity-100 scale-100'
        }`}
      >
        {children}
      </div>
    </div>
  );
}