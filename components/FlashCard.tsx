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
    <div className="w-full max-w-[428px] mx-auto h-[480px] perspective-1000">
      <motion.div 
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Face */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden rounded-[24px] p-8 shadow-xl flex flex-col items-center justify-center bg-slate-800 border border-slate-700/50",
            !isFlipped ? "cursor-pointer hover:bg-slate-800/80 transition-colors" : ""
          )}
          onClick={() => !isFlipped && setIsFlipped(true)}
        >
          <div className="flex flex-col items-center justify-center space-y-8 text-center h-full w-full">
            {card.context && (
              <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase opacity-80 mb-2">
                {card.context}
              </span>
            )}
            
            <h2 className="text-3xl font-bold text-slate-50 leading-tight">
              {card.expressionFR}
            </h2>
            
            <div className="absolute bottom-8 left-0 w-full text-center">
              <span className="text-slate-400 text-sm animate-pulse block">
                Tap to flip
              </span>
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 backface-hidden rotate-y-180 rounded-[24px] p-8 shadow-2xl flex flex-col bg-slate-800 border border-slate-700/50"
        >
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <h2 className="text-3xl font-bold text-slate-50 leading-tight">
              {card.expressionEN}
            </h2>
            
            {card.rule && (
              <div className="bg-slate-900/40 rounded-2xl p-5 border border-slate-700/30 w-full mt-6 backdrop-blur-sm">
                <span className="text-slate-400 text-xs uppercase tracking-widest block mb-2 font-bold">
                  💡 Règle / Info
                </span>
                <p className="text-sm text-slate-300 leading-relaxed text-left">
                  {card.rule}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-8 w-full">
            <button 
              onClick={(e) => { e.stopPropagation(); onForgot(); }}
              className="flex-1 py-4 px-4 rounded-[16px] bg-red-500/10 text-red-500 font-bold border border-red-500/20 active:bg-red-500/20 transition-colors shadow-sm"
            >
              À revoir
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onKnew(); }}
              className="flex-1 py-4 px-4 rounded-[16px] bg-green-500/10 text-green-500 font-bold border border-green-500/20 active:bg-green-500/20 transition-colors shadow-sm"
            >
              Je savais
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
