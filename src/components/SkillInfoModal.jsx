import React from 'react';
import { X, ShieldCheck, Zap } from 'lucide-react';

export default function SkillInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const pillars = [
    {
      num: 1,
      title: 'Entrega One-Shot (1ª Resposta Completa)',
      desc: 'Entrega o email completo logo na primeira interação. Nunca devolve apenas perguntas ou pedidos de esclarecimento ao usuário.'
    },
    {
      num: 2,
      title: 'Proibição de Respostas Intermediárias com Dúvidas',
      desc: 'Jamais responde fazendo perguntas soltas. Lacunas de informação são preenchidas por marcadores claros entre colchetes.'
    },
    {
      num: 3,
      title: 'Mecanismo de Placeholders [...] Padronizados',
      desc: 'Usa marcadores como [data de vencimento] ou [número do pedido] e cataloga todos na seção "Campos a preencher" para substituição rápida.'
    },
    {
      num: 4,
      title: 'Fidelidade Factual Absoluta (Zero Alucinação)',
      desc: 'Mantém rigorosamente nomes, datas, prazos, condições e valores citados pelo usuário. Nunca inventa ou presume cláusulas inexistentes.'
    },
    {
      num: 5,
      title: 'Formato Estrito de Saída',
      desc: 'Estrutura canônica obrigatória: Assunto conciso, Email em 1 a 3 parágrafos diretos e fechamento com assinatura corporativa.'
    },
    {
      num: 6,
      title: 'Matriz de Risco com Alerta Prévio',
      desc: 'Sinaliza com destaque (⚠️ Atenção) antes do assunto quando o tema envolve cobrança em mora, suspensão de serviço, rescisão ou implicações jurídicas.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#0e161c] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-[#00f0ff]/40 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1a2732] flex items-center justify-between bg-[#0a0f12]">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-[#16222b] text-[#00f0ff] border border-[#00f0ff]/30 shadow-[0_0_12px_rgba(0,240,255,0.3)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Os 6 Pilares da Skill Professional Email Writer
              </h3>
              <p className="text-xs text-[#00f0ff]">
                Especificação canônica de AGENTS.md e SKILL.md
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-[#00f0ff] hover:bg-[#121c24] transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="p-3.5 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-xs text-slate-200 leading-relaxed shadow-[0_0_15px_rgba(0,240,255,0.1)]">
            Este software interativo é a materialização visual da skill <strong>professional-email-writer</strong>, projetada pelo <strong>Agente Arquiteto de Skills</strong> corporativas. Todas as regras de engenharia de prompt foram convertidas em algoritmos reativos de alta precisão.
          </div>

          <div className="grid grid-cols-1 gap-3">
            {pillars.map(p => (
              <div
                key={p.num}
                className="p-3.5 rounded-xl border border-[#1a2732] bg-[#0b1217] flex items-start space-x-3 hover:border-[#00f0ff]/40 transition"
              >
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#0284c7] text-[#0a0f12] text-xs font-black flex items-center justify-center mt-0.5 shadow-[0_0_10px_rgba(0,240,255,0.6)]">
                  {p.num}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {p.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#1a2732] flex items-center justify-between text-xs text-slate-500">
            <span>Repositório: SKILL-emails.profissionais</span>
            <span className="font-mono text-[11px] text-[#00f0ff]">skills/professional-email-writer</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#0a0f12] border-t border-[#1a2732] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#0284c7] text-[#0a0f12] glow-cyan-hover transition cursor-pointer"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
}
