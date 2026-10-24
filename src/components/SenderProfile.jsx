import React, { useState } from 'react';
import { User, ChevronDown, ChevronUp, Check, Sparkles } from 'lucide-react';

export default function SenderProfile({ sender, onUpdateSender }) {
  const [isOpen, setIsOpen] = useState(false);
  const [savedBadge, setSavedBadge] = useState(false);

  const handleChange = (key, val) => {
    onUpdateSender({
      ...sender,
      [key]: val
    });
    setSavedBadge(true);
    setTimeout(() => setSavedBadge(false), 1500);
  };

  return (
    <div className="bg-[#0e161c] border border-[#1a2732] rounded-xl overflow-hidden transition-all duration-200 hover:border-[#00f0ff]/30">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#121c24] transition cursor-pointer"
      >
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-[#16222b] text-[#00f0ff] border border-[#00f0ff]/20">
            <User className="h-4 w-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-200">
              Assinatura Corporativa Automática
            </span>
            <span className="text-[11px] text-slate-400 block">
              {sender.name ? `${sender.name} — ${sender.role || sender.company || 'Ativo'}` : 'Configure seu nome, cargo e empresa para a assinatura'}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {savedBadge && (
            <span className="text-[10px] text-[#00f0ff] font-semibold flex items-center space-x-1 text-glow-cyan">
              <Check className="h-3 w-3" />
              <span>Salvo</span>
            </span>
          )}
          {isOpen ? <ChevronUp className="h-4 w-4 text-[#00f0ff]" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 border-t border-[#1a2732] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#0a0f12]/60">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Seu Nome Completo
            </label>
            <input
              type="text"
              value={sender.name || ''}
              onChange={e => handleChange('name', e.target.value)}
              placeholder="Ex.: Lucas Silveira"
              className="w-full text-xs px-3 py-2 rounded-lg border border-[#1a2732] bg-[#0b1217] text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] focus:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Seu Cargo
            </label>
            <input
              type="text"
              value={sender.role || ''}
              onChange={e => handleChange('role', e.target.value)}
              placeholder="Ex.: Gerente de Contas"
              className="w-full text-xs px-3 py-2 rounded-lg border border-[#1a2732] bg-[#0b1217] text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] focus:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Empresa
            </label>
            <input
              type="text"
              value={sender.company || ''}
              onChange={e => handleChange('company', e.target.value)}
              placeholder="Ex.: Alpha Soluções"
              className="w-full text-xs px-3 py-2 rounded-lg border border-[#1a2732] bg-[#0b1217] text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] focus:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Contato ou Link de Agenda
            </label>
            <input
              type="text"
              value={sender.contact || ''}
              onChange={e => handleChange('contact', e.target.value)}
              placeholder="Ex.: (11) 98765-4321"
              className="w-full text-xs px-3 py-2 rounded-lg border border-[#1a2732] bg-[#0b1217] text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] focus:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition"
            />
          </div>
        </div>
      )}
    </div>
  );
}
