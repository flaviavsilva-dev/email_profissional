import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Bot, CheckCircle, Terminal } from 'lucide-react';

export default function Hero({ onOpenSkillModal }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#0a0f12] bg-grid-cyber">
      
      {/* Background Cyan Radial Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] cyan-radial-glow pointer-events-none blur-3xl opacity-70" />
      <div className="absolute top-12 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-28 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Glowing Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#0e161c] border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]"></span>
          </span>
          <span className="font-mono tracking-wide uppercase">SKILL AGÊNTICA • PROFESSIONAL-EMAIL-WRITER</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
          Transforme Rascunhos Caóticos em E-mails Executivos de{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#38bdf8] to-[#0099ff] text-glow-cyan">
            Alto Impacto
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          A skill definitiva de comunicação corporativa para humanos e assistentes de IA. 
          Entrega <strong className="text-white font-semibold">One-Shot</strong> na 1ª resposta, modulação precisa de tom, 
          preservação factual absoluta e marcadores <code className="text-[#00f0ff] bg-cyan-950/60 px-1.5 py-0.5 rounded font-mono text-sm border border-cyan-500/30">[...]</code> para dados ausentes.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#playground"
            className="w-full sm:w-auto btn-cyan-glow px-8 py-4 text-sm font-bold flex items-center justify-center space-x-2 rounded-xl group"
          >
            <Sparkles className="h-4 w-4" />
            <span>Experimentar Agora no Playground</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#pilares"
            className="w-full sm:w-auto btn-cyber-outline px-7 py-4 text-sm font-semibold flex items-center justify-center space-x-2 rounded-xl"
          >
            <Terminal className="h-4 w-4 text-[#00f0ff]" />
            <span>Conhecer os 6 Pilares</span>
          </a>
        </div>

        {/* Value Metrics / Highlights Bar */}
        <div className="mt-16 pt-10 border-t border-cyan-500/15 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <div className="p-4 rounded-xl bg-[#0e161c]/80 border border-cyan-500/15 text-left hover:border-cyan-500/40 transition">
            <div className="text-2xl font-black text-[#00f0ff] font-mono tracking-tight text-glow-cyan">
              1ª Resposta
            </div>
            <div className="text-xs font-semibold text-white mt-1">Entrega One-Shot</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Sem perguntas ou enrolação inicial.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#0e161c]/80 border border-cyan-500/15 text-left hover:border-cyan-500/40 transition">
            <div className="text-2xl font-black text-[#00f0ff] font-mono tracking-tight text-glow-cyan">
              0%
            </div>
            <div className="text-xs font-semibold text-white mt-1">Alucinação Factual</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Preserva valores, datas e condições.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#0e161c]/80 border border-cyan-500/15 text-left hover:border-cyan-500/40 transition">
            <div className="text-2xl font-black text-[#00f0ff] font-mono tracking-tight text-glow-cyan">
              100%
            </div>
            <div className="text-xs font-semibold text-white mt-1">Livre de Clichês</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Sem "venho por meio desta" ou jargões.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#0e161c]/80 border border-cyan-500/15 text-left hover:border-cyan-500/40 transition">
            <div className="text-2xl font-black text-[#00f0ff] font-mono tracking-tight text-glow-cyan">
              6 Tons
            </div>
            <div className="text-xs font-semibold text-white mt-1">Modulação Dinâmica</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Do cordial diário ao C-Level e cobrança.</p>
          </div>

        </div>

      </div>
    </section>
  );
}
