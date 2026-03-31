"use client";

import { useState, useEffect } from "react";
import { BookOpen, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const IRREGULAR_VERBS = [
  { base: "be", past: "was/were", part: "been", fr: "être" },
  { base: "beat", past: "beat", part: "beaten", fr: "battre" },
  { base: "become", past: "became", part: "become", fr: "devenir" },
  { base: "begin", past: "began", part: "begun", fr: "commencer" },
  { base: "bite", past: "bit", part: "bitten", fr: "mordre" },
  { base: "blow", past: "blew", part: "blown", fr: "souffler" },
  { base: "break", past: "broke", part: "broken", fr: "casser" },
  { base: "bring", past: "brought", part: "brought", fr: "apporter" },
  { base: "build", past: "built", part: "built", fr: "construire" },
  { base: "buy", past: "bought", part: "bought", fr: "acheter" },
  { base: "catch", past: "caught", part: "caught", fr: "attraper" },
  { base: "choose", past: "chose", part: "chosen", fr: "choisir" },
  { base: "come", past: "came", part: "come", fr: "venir" },
  { base: "cost", past: "cost", part: "cost", fr: "coûter" },
  { base: "cut", past: "cut", part: "cut", fr: "couper" },
  { base: "do", past: "did", part: "done", fr: "faire" },
  { base: "draw", past: "drew", part: "drawn", fr: "dessiner" },
  { base: "drink", past: "drank", part: "drunk", fr: "boire" },
  { base: "drive", past: "drove", part: "driven", fr: "conduire" },
  { base: "eat", past: "ate", part: "eaten", fr: "manger" },
  { base: "fall", past: "fell", part: "fallen", fr: "tomber" },
  { base: "feel", past: "felt", part: "felt", fr: "sentir" },
  { base: "find", past: "found", part: "found", fr: "trouver" },
  { base: "fly", past: "flew", part: "flown", fr: "voler" },
  { base: "forget", past: "forgot", part: "forgotten", fr: "oublier" },
  { base: "get", past: "got", part: "gotten", fr: "obtenir" },
  { base: "give", past: "gave", part: "given", fr: "donner" },
  { base: "go", past: "went", part: "gone", fr: "aller" },
  { base: "grow", past: "grew", part: "grown", fr: "grandir/pousser" },
  { base: "have", past: "had", part: "had", fr: "avoir" },
  { base: "hear", past: "heard", part: "heard", fr: "entendre" },
  { base: "hide", past: "hid", part: "hidden", fr: "cacher" },
  { base: "hit", past: "hit", part: "hit", fr: "frapper" },
  { base: "hold", past: "held", part: "held", fr: "tenir" },
  { base: "hurt", past: "hurt", part: "hurt", fr: "blesser" },
  { base: "keep", past: "kept", part: "kept", fr: "garder" },
  { base: "know", past: "knew", part: "known", fr: "savoir/connaître" },
  { base: "learn", past: "learnt", part: "learnt", fr: "apprendre" },
  { base: "leave", past: "left", part: "left", fr: "quitter/laisser" },
  { base: "lend", past: "lent", part: "lent", fr: "prêter" },
  { base: "let", past: "let", part: "let", fr: "laisser" },
  { base: "lose", past: "lost", part: "lost", fr: "perdre" },
  { base: "make", past: "made", part: "made", fr: "fabriquer/faire" },
  { base: "mean", past: "meant", part: "meant", fr: "signifier" },
  { base: "meet", past: "met", part: "met", fr: "rencontrer" },
  { base: "pay", past: "paid", part: "paid", fr: "payer" },
  { base: "put", past: "put", part: "put", fr: "mettre" },
  { base: "read", past: "read", part: "read", fr: "lire" },
  { base: "ride", past: "rode", part: "ridden", fr: "chevaucher" },
  { base: "ring", past: "rang", part: "rung", fr: "sonner" },
  { base: "run", past: "ran", part: "run", fr: "courir" },
  { base: "say", past: "said", part: "said", fr: "dire" },
  { base: "see", past: "saw", part: "seen", fr: "voir" },
  { base: "sell", past: "sold", part: "sold", fr: "vendre" },
  { base: "send", past: "sent", part: "sent", fr: "envoyer" },
  { base: "set", past: "set", part: "set", fr: "placer" },
  { base: "show", past: "showed", part: "shown", fr: "montrer" },
  { base: "shut", past: "shut", part: "shut", fr: "fermer" },
  { base: "sing", past: "sang", part: "sung", fr: "chanter" },
  { base: "sit", past: "sat", part: "sat", fr: "s'asseoir" },
  { base: "sleep", past: "slept", part: "slept", fr: "dormir" },
  { base: "speak", past: "spoke", part: "spoken", fr: "parler" },
  { base: "spend", past: "spent", part: "spent", fr: "dépenser" },
  { base: "stand", past: "stood", part: "stood", fr: "se tenir debout" },
  { base: "steal", past: "stole", part: "stolen", fr: "voler (dérober)" },
  { base: "swim", past: "swam", part: "swum", fr: "nager" },
  { base: "take", past: "took", part: "taken", fr: "prendre" },
  { base: "teach", past: "taught", part: "taught", fr: "enseigner" },
  { base: "tear", past: "tore", part: "torn", fr: "déchirer" },
  { base: "tell", past: "told", part: "told", fr: "dire à" },
  { base: "think", past: "thought", part: "thought", fr: "penser" },
  { base: "throw", past: "threw", part: "thrown", fr: "jeter" },
  { base: "understand", past: "understood", part: "understood", fr: "comprendre" },
  { base: "wake", past: "woke", part: "woken", fr: "réveiller" },
  { base: "wear", past: "wore", part: "worn", fr: "porter (vêtement)" },
  { base: "win", past: "won", part: "won", fr: "gagner" },
  { base: "write", past: "wrote", part: "written", fr: "écrire" }
];

export function IrregularVerbsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const filteredVerbs = IRREGULAR_VERBS.filter(v => 
    v.base.toLowerCase().includes(search.toLowerCase()) || 
    v.fr.toLowerCase().includes(search.toLowerCase()) ||
    v.past.toLowerCase().includes(search.toLowerCase()) ||
    v.part.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#CA5D3A] hover:bg-[#B35233] text-white p-4 rounded-full shadow-lg shadow-[#CA5D3A]/20 transition-all hover:scale-105 active:scale-95 group"
        aria-label="Verbes irréguliers"
      >
        <BookOpen className="w-6 h-6" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#3A5A40] text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-[#3A5A40]/80">
          Cheat Sheet 💡
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#1C2A21]/40 backdrop-blur-sm"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ y: "100%", opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "100%", opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-[#FDFBF7] border-t sm:border border-[#E8E2D2] rounded-t-[32px] sm:rounded-[32px] h-[85vh] sm:h-[80vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex-none p-6 pb-4 border-b border-[#E8E2D2] bg-[#FDFBF7]/95 sticky top-0 z-10 backdrop-blur-md">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-[#1C2A21] mb-1">Verbes Irréguliers</h2>
                    <p className="text-sm text-[#8A958D] font-medium">Les indispensables à retenir</p>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 bg-[#F5F2EA] hover:bg-[#E8E2D2] rounded-full text-[#8A958D] hover:text-[#CA5D3A] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Search box */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-[#A0AAB2]" />
                  </div>
                  <input
                    type="text"
                    placeholder="Chercher en français ou en anglais..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D2] text-[#1C2A21] rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[#CA5D3A]/30 focus:border-[#CA5D3A] transition-all font-medium placeholder:text-[#A0AAB2] shadow-sm"
                  />
                </div>
              </div>

              {/* Table Body - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FDFBF7] pb-[env(safe-area-inset-bottom)]">
                {filteredVerbs.length === 0 ? (
                  <div className="text-center py-10 text-[#8A958D] font-medium">
                    Aucun verbe trouvé pour "{search}"
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {/* Header Columns for larger screens (hidden on very small mobile) */}
                    <div className="hidden sm:grid grid-cols-4 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#8A958D] mb-2">
                      <div>Base</div>
                      <div>Past Simple</div>
                      <div>Past Participle</div>
                      <div className="text-right">Français</div>
                    </div>
                    
                    {filteredVerbs.map((v, i) => (
                      <div 
                        key={i} 
                        className="bg-white border border-[#E8E2D2] rounded-2xl p-4 sm:px-4 sm:py-3 grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 items-center hover:bg-[#F5F2EA] transition-colors shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
                      >
                        {/* Base Verb */}
                        <div className="font-bold text-[#1C2A21] text-lg sm:text-base flex justify-between sm:block">
                          <span className="sm:hidden text-xs text-[#A0AAB2] uppercase tracking-wider font-semibold mr-4">Base</span>
                          {v.base}
                        </div>
                        
                        {/* Past Simple */}
                        <div className="text-[#CA5D3A] font-bold text-base flex justify-between sm:block">
                          <span className="sm:hidden text-xs text-[#A0AAB2] uppercase tracking-wider font-semibold mr-4">Prétérit</span>
                          {v.past}
                        </div>
                        
                        {/* Past Participle */}
                        <div className="text-[#3A5A40] font-bold text-base flex justify-between sm:block">
                          <span className="sm:hidden text-xs text-[#A0AAB2] uppercase tracking-wider font-semibold mr-4">Participe</span>
                          {v.part}
                        </div>
                        
                        {/* Translation */}
                        <div className="text-[#5D6B62] text-sm mt-2 pt-2 border-t border-[#E8E2D2] sm:border-0 sm:mt-0 sm:pt-0 font-medium sm:text-right flex justify-between sm:block">
                          <span className="sm:hidden text-xs text-[#A0AAB2] uppercase tracking-wider font-semibold mr-4">FR</span>
                          <span>{v.fr}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
