"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FlashCard as FlashCardType } from "@/lib/notion";
import { FlashCard } from "@/components/FlashCard";
import { calculateNextReview, ReviewPerformance } from "@/lib/spaced-repetition";

export default function ReviewPage() {
  const router = useRouter();
  const [cards, setCards] = useState<FlashCardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // To track session results
  const [sessionResults, setSessionResults] = useState({ knew: 0, forgot: 0 });

  useEffect(() => {
    // Initial fetch. In a full PWA, we'd load from IndexedDB here.
    fetch('/api/cards')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCards(data);
        } else {
          console.error("Failed to load cards, received:", data);
          setCards([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching cards:", err);
        setLoading(false);
      });
  }, []);

  const handleReview = async (performance: ReviewPerformance) => {
    const currentCard = cards[currentIndex];
    const newStats = calculateNextReview(currentCard, performance);
    
    // Optimistically update the backend
    fetch(`/api/cards/${currentCard.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStats)
    }).catch(err => console.error("Failed to update card:", err));

    setSessionResults(prev => ({
      ...prev,
      [performance]: prev[performance] + 1
    }));

    // If forgotten, push back to the end of the list
    if (performance === 'forgot') {
      setCards(prev => [...prev, currentCard]);
    }
    
    // Move to next card (wait for flip to reset for smooth UX)
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 200);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-[#8A958D] font-medium tracking-wide">
          Loading your session...
        </div>
      </div>
    );
  }

  // End of session UI
  if (currentIndex >= cards.length || cards.length === 0) {
    const total = sessionResults.knew + sessionResults.forgot;
    
    // Uses useEffect to push otherwise it errors out during render sometimes in NextJS,
    // actually rendering a simple redirect component is better or doing it in the handleReview:
    // We will just do a small inline loading and push
    setTimeout(() => {
      router.push(`/result?knew=${sessionResults.knew}&total=${total}`);
    }, 0);
    
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-[#8A958D] font-medium tracking-wide">
          Computing results...
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="flex flex-col h-[100dvh] max-w-[428px] mx-auto p-6">
      <header className="flex items-center justify-between mb-8 mt-2">
        <button 
          onClick={() => router.push('/')}
          className="text-[#8A958D] hover:text-[#CA5D3A] transition-colors uppercase tracking-widest text-xs font-bold"
        >
          &larr; Quit
        </button>
        <div className="bg-white px-4 py-1.5 rounded-full border border-[#E8E2D2] shadow-sm">
          <span className="text-[#1C2A21] font-bold text-sm tracking-widest">
            {currentIndex + 1} <span className="text-[#8A958D]">/</span> {cards.length}
          </span>
        </div>
      </header>
      
      <div className="flex-1 flex flex-col justify-center pb-10">
        <FlashCard 
          card={currentCard}
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
          onKnew={() => handleReview("knew")}
          onForgot={() => handleReview("forgot")}
        />
      </div>
    </div>
  );
}
