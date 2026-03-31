"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Undo2 } from "lucide-react";
import { FlashCard as FlashCardType } from "@/lib/notion";
import { cn } from "@/lib/utils";

interface FlashCardProps {
  card: FlashCardType;
  onKnew: () => void;
  onForgot: () => void;
  isFlipped: boolean;
  setIsFlipped: (flipped: boolean) => void;
}

export function FlashCard({ card, onKnew, onForgot, isFlipped, setIsFlipped }: FlashCardProps) {
  const [direction, setDirection] = useState<'FR-EN' | 'EN-FR'>('FR-EN');
  const [showExample, setShowExample] = useState(false);

  useEffect(() => {
    setDirection(Math.random() > 0.5 ? 'FR-EN' : 'EN-FR');
    setShowExample(false); // reset state when card changes
  }, [card.id]);

  const frontText = direction === 'FR-EN' ? card.expressionFR : card.expressionEN;
  const backText = direction === 'FR-EN' ? card.expressionEN : card.expressionFR;
  const badgeText = direction === 'FR-EN' ? '🇫🇷 FR → EN 🇬🇧' : '🇬🇧 EN → FR 🇫🇷';

  return (
    <div className="w-full h-full max-h-[600px] min-h-[480px] perspective-1000 flex items-stretch">
      <motion.div 
        className="w-full h-full grid"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Face */}
        <div
          className={cn(
            "[grid-area:1/1] w-full h-full rounded-[24px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col bg-white border border-[#E8E2D2] overflow-y-auto mix-blend-normal",
            !isFlipped ? "cursor-pointer hover:bg-[#FDFBF7] transition-colors" : ""
          )}
          onClick={() => !isFlipped && setIsFlipped(true)}
          style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
        >
          <div className="flex flex-col items-center justify-center space-y-6 text-center h-full w-full relative">
            
            <div className="absolute top-0 flex flex-col items-center space-y-2 w-full mt-2">
              <span className="px-3 py-1 bg-[#F5F2EA] text-[#8A958D] text-xs font-bold rounded-full border border-[#E8E2D2] tracking-widest shadow-sm">
                {badgeText}
              </span>
              {card.context && (
                <span className="text-[#CA5D3A] text-[10px] font-bold tracking-[0.2em] uppercase opacity-80 mt-1">
                  {card.context}
                </span>
              )}
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C2A21] leading-tight w-full break-words mt-10" style={{ textWrap: 'balance' }}>
              {frontText}
            </h2>
          </div>
          <div className="mt-auto w-full text-center pb-2">
            <span className="text-[#8A958D] text-sm animate-pulse block font-medium">
              Tap to flip
            </span>
          </div>
        </div>

        {/* Back Face */}
        <div
          className="[grid-area:1/1] w-full h-full rounded-[24px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col bg-[#FDFBF7] border border-[#E8E2D2] overflow-y-auto relative mix-blend-normal"
          style={{ 
            WebkitBackfaceVisibility: "hidden", 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          {/* Flip Back Button */}
          <button
            onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-white hover:bg-white text-[#8A958D] hover:text-[#CA5D3A] transition-colors pointer-events-auto z-10 shadow-sm border border-[#E8E2D2]"
            title="Retourner la carte"
          >
            <Undo2 className="w-5 h-5" />
          </button>

          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 w-full pt-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C2A21] leading-tight w-full break-words" style={{ textWrap: 'balance' }}>
              {backText}
            </h2>
            
            <div className="w-full flex justify-center mt-2 pointer-events-auto">
              {card.example && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowExample(!showExample);
                  }}
                  className="bg-[#F5F2EA] hover:bg-[#E8E2D2] px-4 py-1.5 rounded-full border border-[#E8E2D2] text-[#8A958D] text-xs font-bold uppercase tracking-widest transition-colors flex items-center shadow-sm"
                >
                  💬 Exemple {showExample ? "▲" : "▼"}
                </button>
              )}
            </div>

            {card.example && showExample && (
              <motion.div
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                className="w-full overflow-hidden"
              >
                <div className="bg-[#3A5A40]/5 rounded-2xl p-4 sm:p-5 border border-[#3A5A40]/10 w-full shadow-inner mt-2">
                  <p className="text-[#3A5A40] text-sm md:text-base font-medium italic">
                    "{card.example}"
                  </p>
                </div>
              </motion.div>
            )}

            {card.rule && (
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8E2D2] w-full mt-4 shadow-sm">
                <span className="text-[#CA5D3A] text-[10px] sm:text-xs uppercase tracking-widest block mb-2 font-bold">
                  💡 Règle / Info
                </span>
                <p className="text-sm text-[#5D6B62] leading-relaxed text-left break-words font-medium">
                  {card.rule}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6 w-full shrink-0">
            <button 
              onClick={(e) => { e.stopPropagation(); onForgot(); }}
              className="flex-1 py-4 px-2 sm:px-4 rounded-[16px] bg-[#CA5D3A]/10 text-[#CA5D3A] font-bold border border-[#CA5D3A]/20 active:bg-[#CA5D3A]/20 transition-colors shadow-sm text-sm sm:text-base pointer-events-auto"
            >
              À revoir
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onKnew(); }}
              className="flex-1 py-4 px-2 sm:px-4 rounded-[16px] bg-[#3A5A40]/10 text-[#3A5A40] font-bold border border-[#3A5A40]/20 active:bg-[#3A5A40]/20 transition-colors shadow-sm text-sm sm:text-base pointer-events-auto"
            >
              Je savais
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
