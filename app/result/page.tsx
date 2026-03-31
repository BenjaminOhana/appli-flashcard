"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [streak, setStreak] = useState(0);

  const knew = Number(searchParams.get("knew")) || 0;
  const total = Number(searchParams.get("total")) || 0;

  useEffect(() => {
    const storedStreak = localStorage.getItem('flashtalk_streak');
    if (storedStreak) {
      setStreak(parseInt(storedStreak, 10));
    }
  }, []);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center p-6 text-center max-w-[428px] mx-auto">
      <div className="space-y-6 w-full animate-in fade-in fill-mode-forwards duration-700">
        <div className="text-7xl mb-6">🎉</div>
        <h2 className="text-4xl font-bold tracking-tight text-[#1C2A21]">Well done!</h2>
        <p className="text-[#8A958D] text-lg font-medium">
          Your brain just got a little stronger.
        </p>
        
        <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#E8E2D2] my-10 flex justify-around relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#3A5A40]/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="flex flex-col items-center relative z-10">
            <span className="text-4xl font-black text-[#3A5A40]">{knew}</span>
            <span className="text-xs uppercase tracking-widest text-[#8A958D] mt-2 font-bold">Acquis</span>
          </div>
          <div className="w-px bg-[#E8E2D2] h-16 relative z-10"></div>
          <div className="flex flex-col items-center relative z-10">
            <span className="text-4xl font-black text-[#1C2A21]">{total}</span>
            <span className="text-xs uppercase tracking-widest text-[#8A958D] mt-2 font-bold">Total</span>
          </div>
          <div className="w-px bg-[#E8E2D2] h-16 relative z-10"></div>
          <div className="flex flex-col items-center relative z-10">
            <span className="text-4xl font-black text-[#CA5D3A]">{streak}</span>
            <span className="text-xs uppercase tracking-widest text-[#8A958D] mt-2 font-bold">Streak</span>
          </div>
        </div>

        <button 
          onClick={() => router.push('/')}
          className="w-full py-5 px-6 mt-8 bg-[#CA5D3A] hover:bg-[#B35233] active:bg-[#A1472C] text-white font-bold text-lg tracking-wide rounded-[20px] transition-all shadow-[0_0_40px_-10px_rgba(202,93,58,0.4)]"
        >
          Retour au Dashboard
        </button>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-[#8A958D] font-medium">Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}
