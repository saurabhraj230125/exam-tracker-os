import ProfileForm from '@/app/dashboard/components/ProfileForm';

export default async function SettingsPage() {
  // 🚧 TEMPORARY MOCK DATA FOR UI BUILDING 🚧
  // We removed the Supabase calls and redirects so you can freely view the page.
  
  const cleanProfile = {
    id: 'mock-user-123',
    full_name: 'Scholar',
    city: 'Bokaro',
    target_exam: 'UPSC'
  };

  return (
    <div className="min-h-screen bg-[#030305] text-zinc-200 flex items-center justify-center relative overflow-hidden font-sans p-4 sm:p-6 lg:p-8 selection:bg-indigo-500/30">
      
      {/* 1. UNIVERSAL NOISE TEXTURE */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 2. CINEMATIC AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Soft, clean falling grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Calming Deep Space Glows (Indigo & Cyan) */}
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
      </div>

      {/* 3. FORM CONTAINER */}
      <div className="w-full relative z-10 flex items-center justify-center py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* The ProfileForm receives the mock data and renders perfectly */}
        <ProfileForm initialData={cleanProfile} />
      </div>
      
    </div>
  );
}