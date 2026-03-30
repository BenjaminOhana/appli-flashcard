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
    <div className="flex h-screen flex-col items-center justify-center p-6 text-center max-w-[428px] mx-auto bg-slate-900 text-slate-50">
      <div className="space-y-6 w-full animate-in fade-in fill-mode-forwards duration-700">
        <div className="text-7xl mb-6">🎉</div>
        <h2 className="text-4xl font-bold tracking-tight">Well done!</h2>
        <p className="text-slate-400 text-lg">
          Your brain just got a little stronger.
        </p>
        
        <div className="bg-slate-800 rounded-[32px] p-8 shadow-2xl border border-slate-700/50 my-10 flex justify-around relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="flex flex-col items-center relative z-10">
            <span className="text-4xl font-black text-green-500">{knew}</span>
            <span className="text-xs uppercase tracking-widest text-slate-400 mt-2 font-bold">Acquis</span>
          </div>
          <div className="w-px bg-slate-700 h-16 relative z-10"></div>
          <div className="flex flex-col items-center relative z-10">
            <span className="text-4xl font-black text-slate-50">{total}</span>
            <span className="text-xs uppercase tracking-widest text-slate-400 mt-2 font-bold">Total</span>
          </div>
          <div className="w-px bg-slate-700 h-16 relative z-10"></div>
          <div className="flex flex-col items-center relative z-10">
            <span className="text-4xl font-black text-orange-400">{streak}</span>
            <span className="text-xs uppercase tracking-widest text-slate-400 mt-2 font-bold">Streak</span>
          </div>
        </div>

        <button 
          onClick={() => router.push('/')}
          className="w-full py-5 px-6 mt-8 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-lg tracking-wide rounded-[20px] transition-all shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]"
        >
          Retour au Dashboard
        </button>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400">Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}
