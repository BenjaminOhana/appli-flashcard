"use client";

import { motion } from "framer-motion";
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
            "[grid-area:1/1] w-full h-full rounded-[24px] p-6 sm:p-8 shadow-xl flex flex-col bg-slate-800 border border-slate-700/50 overflow-y-auto",
            !isFlipped ? "cursor-pointer hover:bg-slate-800/80 transition-colors" : ""
          )}
          onClick={() => !isFlipped && setIsFlipped(true)}
          style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
        >
          <div className="flex flex-col items-center justify-center space-y-6 text-center h-full w-full">
            {card.context && (
              <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase opacity-80 mb-2">
                {card.context}
              </span>
            )}
            
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-50 leading-tight w-full break-words" style={{ textWrap: 'balance' }}>
              {card.expressionFR}
            </h2>
          </div>
          <div className="mt-auto w-full text-center pb-2">
            <span className="text-slate-400 text-sm animate-pulse block">
              Tap to flip
            </span>
          </div>
        </div>

        {/* Back Face */}
        <div
          className="[grid-area:1/1] w-full h-full rounded-[24px] p-6 sm:p-8 shadow-2xl flex flex-col bg-slate-800 border border-slate-700/50 overflow-y-auto"
          style={{ 
            WebkitBackfaceVisibility: "hidden", 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 w-full">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-50 leading-tight w-full break-words" style={{ textWrap: 'balance' }}>
              {card.expressionEN}
            </h2>
            
            {card.rule && (
              <div className="bg-slate-900/40 rounded-2xl p-4 sm:p-5 border border-slate-700/30 w-full mt-4 backdrop-blur-sm shadow-inner">
                <span className="text-slate-400 text-xs uppercase tracking-widest block mb-2 font-bold">
                  💡 Règle / Info
                </span>
                <p className="text-sm text-slate-300 leading-relaxed text-left break-words">
                  {card.rule}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6 w-full shrink-0">
            <button 
              onClick={(e) => { e.stopPropagation(); onForgot(); }}
              className="flex-1 py-4 px-2 sm:px-4 rounded-[16px] bg-red-500/10 text-red-500 font-bold border border-red-500/20 active:bg-red-500/30 transition-colors shadow-sm text-sm sm:text-base pointer-events-auto"
            >
              À revoir
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onKnew(); }}
              className="flex-1 py-4 px-2 sm:px-4 rounded-[16px] bg-green-500/10 text-green-500 font-bold border border-green-500/20 active:bg-green-500/30 transition-colors shadow-sm text-sm sm:text-base pointer-events-auto"
            >
              Je savais
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
