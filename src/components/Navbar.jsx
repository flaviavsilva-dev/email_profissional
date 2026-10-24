import React from 'react';
import { Mail, Sparkles, Key, History, BookOpen, Cpu, Shield } from 'lucide-react';

export default function Navbar({
  hasApiKey,
  openApiKeyModal,
  openSkillModal,
  openHistory,
  historyCount = 0
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1a2732] bg-[#0a0f12]/90 backdrop-blur-md transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      {/* Subtle top cyan line highlight */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-80"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Brand */}
        <div className="flex items-center space-x-3 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#0e161c] to-[#16222b] border border-[#00f0ff]/40 flex items-center justify-center text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:shadow-[0_0_22px_rgba(0,240,255,0.6)] transition-all">
            <Mail className="h-5 w-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg text-white tracking-tight">
                Email<span className="text-[#00f0ff] text-glow-cyan">Pro</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 shadow-[0_0_8px_rgba(0,240,255,0.2)]">
                AI Cyber-Skill
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Redator Corporativo Executivo • One-Shot
            </p>
          </div>
        </div>

        {/* Engine Status & Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Active Engine Badge */}
          <button
            onClick={openApiKeyModal}
            className={`hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              hasApiKey
                ? 'bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/50 shadow-[0_0_12px_rgba(0,240,255,0.3)] hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]'
                : 'bg-[#121c24] text-slate-300 border-[#1c2b36] hover:border-[#00f0ff]/40 hover:text-[#00f0ff] hover:shadow-[0_0_12px_rgba(0,240,255,0.2)]'
            }`}
            title="Clique para alternar ou configurar a API Gemini"
          >
            {hasApiKey ? <Sparkles className="h-3.5 w-3.5 text-[#00f0ff]" /> : <Cpu className="h-3.5 w-3.5 text-[#00f0ff]" />}
            <span>{hasApiKey ? 'Gemini 2.5 IA Ativo' : 'Motor Local Offline'}</span>
          </button>

          {/* Skill Architecture Guide */}
          <button
            onClick={openSkillModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-[#0e161c] border border-[#1a2732] hover:border-[#00f0ff]/50 hover:text-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all"
            title="Conhecer os 6 Pilares da Skill"
          >
            <BookOpen className="h-4 w-4 text-[#00f0ff]" />
            <span className="hidden sm:inline">6 Pilares da Skill</span>
          </button>

          {/* API Key Modal Button */}
          <button
            onClick={openApiKeyModal}
            className="p-2 rounded-lg bg-[#0e161c] border border-[#1a2732] text-slate-300 hover:border-[#00f0ff]/50 hover:text-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all"
            title="Configurar Chave Google Gemini API"
          >
            <Key className="h-4 w-4" />
          </button>

          {/* History Button */}
          <button
            onClick={openHistory}
            className="relative p-2 rounded-lg bg-[#0e161c] border border-[#1a2732] text-slate-300 hover:border-[#00f0ff]/50 hover:text-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all"
            title="Histórico de emails gerados"
          >
            <History className="h-4 w-4" />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#00f0ff] text-[#0a0f12] text-[10px] font-extrabold flex items-center justify-center shadow-[0_0_8px_rgba(0,240,255,0.8)]">
                {historyCount > 9 ? '9+' : historyCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
