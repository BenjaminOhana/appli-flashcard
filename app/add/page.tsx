"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    expressionFR: "",
    expressionEN: "",
    rule: "",
    context: "Koh Tao — vie quotidienne"
  });

  const contexts = [
    "Koh Tao — resto", 
    "Koh Tao — vie quotidienne", 
    "Koh Tao — conversations", 
    "Koh Tao — soirée", 
    "Koh Tao — live translate"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.expressionFR || !formData.expressionEN) return;

    setLoading(true);
    try {
      const res = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        // Success
        router.push('/');
      } else {
        console.error("Failed to add card", await res.json());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] max-w-[428px] mx-auto bg-slate-900 text-slate-50 p-6">
      
      <header className="flex items-center justify-between py-6">
        <button 
          onClick={() => router.push('/')}
          className="text-slate-400 hover:text-slate-50 transition-colors tracking-widest text-sm font-bold p-2 -ml-2"
        >
          &larr; Retour
        </button>
        <h1 className="text-lg font-bold tracking-tight">Nouvelle Carte</h1>
      </header>

      <div className="flex-1 mt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-400 font-bold ml-1">
              🇫🇷 Expression FR <span className="text-red-500">*</span>
            </label>
            <input 
              type="text"
              required
              value={formData.expressionFR}
              onChange={e => setFormData({...formData, expressionFR: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700/50 rounded-2xl px-5 py-4 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-inner"
              placeholder="Ex: T'as vu ce chien ?"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-400 font-bold ml-1">
              🇬🇧 Expression EN <span className="text-red-500">*</span>
            </label>
            <input 
              type="text"
              required
              value={formData.expressionEN}
              onChange={e => setFormData({...formData, expressionEN: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700/50 rounded-2xl px-5 py-4 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-inner"
              placeholder="Ex: Did you see that dog?"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-400 font-bold ml-1">
              💡 Règle / Piège
            </label>
            <textarea 
              value={formData.rule}
              onChange={e => setFormData({...formData, rule: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700/50 rounded-2xl px-5 py-4 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-inner min-h-[100px] resize-none"
              placeholder="Ex: Simple past utilisé car action terminée."
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-400 font-bold ml-1">
              📍 Contexte
            </label>
            <select 
              value={formData.context}
              onChange={e => setFormData({...formData, context: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700/50 rounded-2xl px-5 py-4 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-inner appearance-none"
            >
              {contexts.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {/* Custom select arrow can be added with CSS or SVG here */}
          </div>

          <button
            type="submit"
            disabled={loading || !formData.expressionFR || !formData.expressionEN}
            className="w-full py-5 px-6 mt-8 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-[20px] transition-all shadow-lg"
          >
            {loading ? "Ajout..." : "Créer la carte"}
          </button>
        </form>
      </div>
    </div>
  );
}
