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
    <main className="flex flex-col min-h-[100dvh] max-w-[428px] mx-auto p-6">
      
      {/* Header */}
      <header className="flex items-center justify-between py-6">
        <div className="flex items-center space-x-2">
          <span className="text-2xl drop-shadow-sm">⚡</span>
          <h1 className="text-xl font-bold tracking-tight text-[#1C2A21]">FlashTalk</h1>
        </div>
        
        <div className="flex items-center space-x-1 bg-[#F5F2EA] px-4 py-1.5 rounded-full border border-[#E8E2D2] shadow-sm">
          <BoltIcon className="w-4 h-4 text-[#CA5D3A] fill-[#CA5D3A]" />
          <span className="font-bold text-sm tracking-wide text-[#1C2A21]">{streak}</span>
        </div>
      </header>

      {/* Hero Stats */}
      <section className="mt-8 mb-10 flex-1">
        <div className="bg-white rounded-[32px] p-8 border border-[#E8E2D2] shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden flex flex-col items-center text-center">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#CA5D3A]/5 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          
          <SparklesIcon className="w-8 h-8 text-[#CA5D3A] mb-6" />
          
          <h2 className="text-[#8A958D] text-sm tracking-widest uppercase font-bold mb-2">
            À réviser
          </h2>
          
          <div className="flex items-baseline space-x-2">
            {loading ? (
              <span className="text-6xl font-black tabular-nums text-[#A0AAB2] animate-pulse">--</span>
            ) : (
              <span className="text-7xl font-black tabular-nums tracking-tighter text-[#1C2A21]">
                {cards.length}
              </span>
            )}
            <span className="text-[#8A958D] font-medium tracking-wide">cartes</span>
          </div>

          <p className="mt-6 text-sm text-[#5D6B62] leading-relaxed max-w-[200px] font-medium">
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
          className="w-full relative group overflow-hidden bg-[#CA5D3A] hover:bg-[#B35233] active:bg-[#A1472C] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 px-6 rounded-[20px] transition-all shadow-[0_0_40px_-10px_rgba(202,93,58,0.4)] shadow-[#CA5D3A]/20"
        >
          <span className="relative z-10 flex items-center justify-center text-lg tracking-wide">
            Commencer la révision
          </span>
          {/* Shine effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </button>

        <button
          onClick={() => router.push('/add')}
          className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-[#FBF9F4] active:bg-[#F5F2EA] border border-[#E8E2D2] text-[#1C2A21] font-bold py-5 px-6 rounded-[20px] transition-all shadow-sm"
        >
          <PlusIcon className="w-5 h-5 text-[#3A5A40]" />
          <span className="tracking-wide">Ajout Rapide</span>
        </button>
      </div>
    </main>
  );
}
