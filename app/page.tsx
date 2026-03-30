"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FlashCard as FlashCardType } from "@/lib/notion";
import { BoltIcon, PlusIcon, SparklesIcon } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [cards, setCards] = useState<FlashCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Basic streak implementation (local)
    const storedStreak = localStorage.getItem('flashtalk_streak');
    if (storedStreak) {
      setStreak(parseInt(storedStreak, 10));
    }

    fetch('/api/cards')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCards(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const startReview = () => {
    // Also updating streak here just for demo, real logic should check daily login
    const current = parseInt(localStorage.getItem('flashtalk_streak') || "0", 10);
    localStorage.setItem('flashtalk_streak', (current + 1).toString());
    router.push('/review');
  };

  return (
    <main className="flex flex-col min-h-[100dvh] max-w-[428px] mx-auto bg-slate-900 text-slate-50 p-6">
      
      {/* Header */}
      <header className="flex items-center justify-between py-6">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">⚡</span>
          <h1 className="text-xl font-bold tracking-tight">FlashTalk</h1>
        </div>
        
        <div className="flex items-center space-x-1 bg-slate-800/80 px-4 py-1.5 rounded-full border border-slate-700/50">
          <BoltIcon className="w-4 h-4 text-orange-400 fill-orange-400" />
          <span className="font-bold text-sm tracking-wide">{streak}</span>
        </div>
      </header>

      {/* Hero Stats */}
      <section className="mt-8 mb-10 flex-1">
        <div className="bg-slate-800/80 rounded-[32px] p-8 border border-slate-700/50 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          
          <SparklesIcon className="w-8 h-8 text-blue-400 mb-6" />
          
          <h2 className="text-slate-400 text-sm tracking-widest uppercase font-bold mb-2">
            À réviser
          </h2>
          
          <div className="flex items-baseline space-x-2">
            {loading ? (
              <span className="text-6xl font-black tabular-nums text-slate-700 animate-pulse">--</span>
            ) : (
              <span className="text-7xl font-black tabular-nums tracking-tighter text-slate-50">
                {cards.length}
              </span>
            )}
            <span className="text-slate-400 font-medium tracking-wide">cartes</span>
          </div>

          <p className="mt-6 text-sm text-slate-400 leading-relaxed max-w-[200px]">
            {cards.length > 0 
              ? "Your brain is ready for a quick workout." 
              : "You're all caught up! Take a mindful break."}
          </p>
        </div>
      </section>

      {/* Actions */}
      <div className="space-y-4 pb-8">
        <button
          onClick={startReview}
          disabled={loading || cards.length === 0}
          className="w-full relative group overflow-hidden bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 px-6 rounded-[20px] transition-all shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] shadow-blue-500/20"
        >
          <span className="relative z-10 flex items-center justify-center text-lg tracking-wide">
            Commencer la révision
          </span>
          {/* Shine effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </button>

        <button
          onClick={() => router.push('/add')}
          className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-700/50 text-slate-300 font-bold py-5 px-6 rounded-[20px] transition-all"
        >
          <PlusIcon className="w-5 h-5" />
          <span className="tracking-wide">Ajout Rapide</span>
        </button>
      </div>
    </main>
  );
}
