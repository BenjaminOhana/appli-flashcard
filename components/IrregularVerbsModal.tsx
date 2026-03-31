"use client";

import { useState, useEffect } from "react";
import { BookOpen, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const VERB_GROUPS = [
  {
    icon: "🔥",
    title: "Top tier",
    subtitle: "Tu les utilises littéralement tous les jours",
    verbs: [
      { base: "go", past: "went", part: "gone", fr: "aller" },
      { base: "eat", past: "ate", part: "eaten", fr: "manger" },
      { base: "see", past: "saw", part: "seen", fr: "voir" },
      { base: "get", past: "got", part: "gotten", fr: "obtenir/recevoir" },
      { base: "have", past: "had", part: "had", fr: "avoir" },
      { base: "do", past: "did", part: "done", fr: "faire" },
      { base: "say", past: "said", part: "said", fr: "dire" },
      { base: "come", past: "came", part: "come", fr: "venir" },
      { base: "take", past: "took", part: "taken", fr: "prendre" },
      { base: "make", past: "made", part: "made", fr: "fabriquer/faire" }
    ]
  },
  {
    icon: "⚡",
    title: "Très courant",
    subtitle: "Plusieurs fois par semaine",
    verbs: [
      { base: "know", past: "knew", part: "known", fr: "savoir/connaître" },
      { base: "think", past: "thought", part: "thought", fr: "penser" },
      { base: "tell", past: "told", part: "told", fr: "dire à quelqu'un" },
      { base: "give", past: "gave", part: "given", fr: "donner" },
      { base: "find", past: "found", part: "found", fr: "trouver" },
      { base: "leave", past: "left", part: "left", fr: "partir/quitter" },
      { base: "feel", past: "felt", part: "felt", fr: "ressentir" },
      { base: "keep", past: "kept", part: "kept", fr: "garder" },
      { base: "buy", past: "bought", part: "bought", fr: "acheter" },
      { base: "lose", past: "lost", part: "lost", fr: "perdre" }
    ]
  },
  {
    icon: "👍",
    title: "Utile",
    subtitle: "Moins fréquent mais indispensable",
    verbs: [
      { base: "drink", past: "drank", part: "drunk", fr: "boire" },
      { base: "sleep", past: "slept", part: "slept", fr: "dormir" },
      { base: "spend", past: "spent", part: "spent", fr: "dépenser/passer (temps)" },
      { base: "pay", past: "paid", part: "paid", fr: "payer" },
      { base: "meet", past: "met", part: "met", fr: "rencontrer" },
      { base: "swim", past: "swam", part: "swum", fr: "nager" },
      { base: "drive", past: "drove", part: "driven", fr: "conduire" },
      { base: "write", past: "wrote", part: "written", fr: "écrire" },
      { base: "speak", past: "spoke", part: "spoken", fr: "parler" },
      { base: "run", past: "ran", part: "run", fr: "courir" },
      { base: "bring", past: "brought", part: "brought", fr: "apporter" },
      { base: "read", past: "read", part: "read", fr: "lire" },
      { base: "understand", past: "understood", part: "understood", fr: "comprendre" },
      { base: "wear", past: "wore", part: "worn", fr: "porter" },
      { base: "win", past: "won", part: "won", fr: "gagner" },
      { base: "teach", past: "taught", part: "taught", fr: "enseigner" }
    ]
  }
];

export function IrregularVerbsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showRules, setShowRules] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const filteredGroups = VERB_GROUPS.map(group => ({
    ...group,
    verbs: group.verbs.filter(v => 
      v.base.toLowerCase().includes(search.toLowerCase()) || 
      v.fr.toLowerCase().includes(search.toLowerCase()) ||
      v.past.toLowerCase().includes(search.toLowerCase()) ||
      v.part.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(group => group.verbs.length > 0);

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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#1C2A21]/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ y: "100%", opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "100%", opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-[#FDFBF7] border-t sm:border border-[#E8E2D2] rounded-t-[32px] sm:rounded-[32px] h-[85vh] sm:h-[80vh] flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="flex-none p-6 pb-4 border-b border-[#E8E2D2] bg-[#FDFBF7]/95 sticky top-0 z-10 backdrop-blur-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-[#1C2A21] mb-1">Verbes Irréguliers</h2>
                    <p className="text-sm text-[#8A958D] font-medium">Les indispensables classés par priorité</p>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 bg-[#F5F2EA] hover:bg-[#E8E2D2] rounded-full text-[#8A958D] hover:text-[#CA5D3A] transition-colors -mr-2 -mt-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Rules Explanations - Collapsible */}
                <div className="bg-white rounded-xl border border-[#E8E2D2] mb-5 shadow-sm overflow-hidden">
                  <button 
                    onClick={() => setShowRules(!showRules)}
                    className="w-full flex items-center justify-between p-3 sm:p-4 text-left font-bold text-[#1C2A21] hover:bg-[#F5F2EA] transition-colors"
                  >
                    <span className="flex items-center space-x-2">
                      <span>💡</span>
                      <span>Comment utiliser ces temps ?</span>
                    </span>
                    <span className={`text-[#8A958D] transition-transform duration-300 ${showRules ? "rotate-180" : "rotate-0"}`}>
                      ▼
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {showRules && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 sm:p-4 border-t border-[#E8E2D2] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs leading-relaxed">
                          <div>
                            <span className="font-bold text-[#CA5D3A] block mb-1 text-sm">🗓 Prétérit (Past Simple)</span>
                            <p className="text-[#5D6B62] mb-2 font-medium">L'action est <strong className="text-[#1C2A21]">totalement terminée</strong> dans le passé (la période de temps est révolue).</p>
                            <ul className="space-y-1 text-[#8A958D] list-disc pl-4">
                              <li>Yesterday, I <strong className="font-bold text-[#1C2A21] underline decoration-[#CA5D3A]/40 decoration-wavy">ate</strong> a pad thai.</li>
                              <li>He <strong className="font-bold text-[#1C2A21] underline decoration-[#CA5D3A]/40 decoration-wavy">went</strong> to Bali in 2022.</li>
                              <li>I <strong className="font-bold text-[#1C2A21] underline decoration-[#CA5D3A]/40 decoration-wavy">saw</strong> him two hours ago.</li>
                            </ul>
                          </div>
                          <div>
                            <span className="font-bold text-[#3A5A40] block mb-1 text-sm">🔗 Participe (Past Participle)</span>
                            <p className="text-[#5D6B62] mb-2 font-medium">Le temps utilisé avec <strong className="text-[#1C2A21]">HAVE</strong> pour faire un bilan au présent ("J'ai déjà...").</p>
                            <ul className="space-y-1 text-[#8A958D] list-disc pl-4">
                              <li>I have never <strong className="font-bold text-[#1C2A21] underline decoration-[#3A5A40]/40 decoration-wavy">eaten</strong> here.</li>
                              <li>Have you ever <strong className="font-bold text-[#1C2A21] underline decoration-[#3A5A40]/40 decoration-wavy">seen</strong> this movie?</li>
                              <li>It was <strong className="font-bold text-[#1C2A21] underline decoration-[#3A5A40]/40 decoration-wavy">made</strong> in Thailand. (Voix passive)</li>
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-[#A0AAB2]" />
                  </div>
                  <input
                    type="text"
                    placeholder="Chercher un verbe..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D2] text-[#1C2A21] rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[#CA5D3A]/30 focus:border-[#CA5D3A] transition-all font-medium placeholder:text-[#A0AAB2] shadow-sm"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FDFBF7] pb-[env(safe-area-inset-bottom)] scroll-smooth">
                {filteredGroups.length === 0 ? (
                  <div className="text-center py-10 text-[#8A958D] font-medium">
                    Aucun verbe trouvé pour "{search}"
                  </div>
                ) : (
                  <div className="space-y-8">
                    {filteredGroups.map((group, groupIdx) => (
                      <div key={groupIdx} className="space-y-3">
                        {/* Section Title */}
                        <div className="flex items-center space-x-2 px-1 mb-4">
                          <span className="text-xl">{group.icon}</span>
                          <div>
                            <h3 className="font-bold text-[#1C2A21] text-base">{group.title}</h3>
                            <p className="text-xs font-semibold text-[#8A958D] uppercase tracking-wider">{group.subtitle}</p>
                          </div>
                        </div>

                        {/* Headers */}
                        {groupIdx === 0 && (
                          <div className="hidden sm:grid grid-cols-4 px-4 pb-1 text-xs font-bold uppercase tracking-wider text-[#8A958D]">
                            <div>Base</div>
                            <div>Past Simple</div>
                            <div>Past Participle</div>
                            <div className="text-right">Français</div>
                          </div>
                        )}
                        
                        {group.verbs.map((v, i) => (
                          <div 
                            key={i} 
                            className="bg-white border border-[#E8E2D2] rounded-2xl p-4 sm:px-4 sm:py-3 grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 items-center hover:bg-[#F5F2EA] transition-colors shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
                          >
                            <div className="font-bold text-[#1C2A21] text-lg sm:text-base flex justify-between sm:block">
                              <span className="sm:hidden text-xs text-[#A0AAB2] uppercase tracking-wider font-semibold mr-4">Base</span>
                              {v.base}
                            </div>
                            
                            <div className="text-[#CA5D3A] font-bold text-base flex justify-between sm:block">
                              <span className="sm:hidden text-xs text-[#A0AAB2] uppercase tracking-wider font-semibold mr-4">Prétérit</span>
                              {v.past}
                            </div>
                            
                            <div className="text-[#3A5A40] font-bold text-base flex justify-between sm:block">
                              <span className="sm:hidden text-xs text-[#A0AAB2] uppercase tracking-wider font-semibold mr-4">Participe</span>
                              {v.part}
                            </div>
                            
                            <div className="text-[#5D6B62] text-sm mt-2 pt-2 border-t border-[#E8E2D2] sm:border-0 sm:mt-0 sm:pt-0 font-medium sm:text-right flex justify-between sm:block">
                              <span className="sm:hidden text-xs text-[#A0AAB2] uppercase tracking-wider font-semibold mr-4">FR</span>
                              <span>{v.fr}</span>
                            </div>
                          </div>
                        ))}
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
