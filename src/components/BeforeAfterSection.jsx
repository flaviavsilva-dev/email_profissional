import React, { useState } from 'react';
import { ArrowRight, Check, X, Sparkles, MessageCircle, Mail } from 'lucide-react';

export default function BeforeAfterSection() {
  const [activeTab, setActiveTab] = useState('cobranca');

  const cases = {
    cobranca: {
      title: 'Cobrança Financeira em Mora',
      before: `Preciso cobrar a Alpha Comércio que tá com a fatura de 5.200 reais atrasada tem 20 dias. Fala que se não quitarem até sexta vou suspender o suporte do sistema.`,
      warning: '⚠️ Atenção: A suspensão de suporte e serviços por inadimplência pode possuir requisitos contratuais específicos. Recomendamos verificar os prazos previstos em contrato antes do envio.',
      subject: 'Regularização de pendência financeira — Fatura em atraso [número da fatura]',
      after: `Prezada equipe da Alpha Comércio,

Espero que estejam bem.

Identificamos que a fatura referente à prestação de suporte técnico, no valor de R$ 5.200,00, encontra-se vencida há 20 dias.

Para que possamos assegurar a continuidade da prestação dos serviços e evitar a suspensão preventiva do suporte a partir da próxima semana, solicitamos a regularização do débito ou o envio do comprovante até esta sexta-feira, [data de sexta-feira, DD/MM].

Caso o pagamento já tenha sido efetuado recentemente, por favor desconsiderem este aviso e nos encaminhem o comprovante para atualização do nosso sistema.

Permanecemos à disposição para emitir segunda via ou esclarecer eventuais divergências.

Atenciosamente,

[Seu Nome]
[Seu Cargo / Empresa]`
    },
    followup: {
      title: 'Follow-up de Proposta Comercial',
      before: `Mandei a proposta do projeto pro Carlos faz 5 dias e nada. Pergunta se ele conseguiu ver e se quer marcar um call pra tirar dúvidas.`,
      warning: null,
      subject: 'Follow-up: proposta de projeto — [Nome do Projeto ou Empresa]',
      after: `Olá, Carlos, tudo bem?

Gostaria de checar se você teve a oportunidade de analisar a proposta de projeto que encaminhei no início da semana passada.

Estou à disposição para sanar qualquer dúvida sobre o escopo, prazos ou condições comerciais apresentadas. Caso ache produtivo, podemos agendar uma rápida conversa de 15 minutos para alinharmos os próximos passos.

Fico no aguardo do seu retorno.

Um abraço,

[Seu Nome]
[Seu Cargo / Empresa]
[Telefone / Contato]`
    }
  };

  const current = cases[activeTab];

  return (
    <section id="comparativo" className="py-24 relative bg-[#0a0f12] border-t border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <span>TRANSFORMAÇÃO REAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Antes vs. Depois com a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#0099ff]">Skill</span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Compare o rascunho imperfeito enviado pelo usuário e o resultado gerado na primeira resposta.
          </p>

          {/* Tab Switcher */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-[#0e161c] border border-cyan-500/20">
            <button
              onClick={() => setActiveTab('cobranca')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'cobranca'
                  ? 'btn-cyan-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Caso 1: Cobrança com Alerta de Risco
            </button>
            <button
              onClick={() => setActiveTab('followup')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'followup'
                  ? 'btn-cyan-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Caso 2: Follow-up de Proposta
            </button>
          </div>
        </div>

        {/* 2-Column Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Before Column (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0e161c]/80 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                <X className="h-4 w-4" />
                <span>O Rascunho Informal (Input)</span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Como as pessoas costumam enviar mensagens em chats rápidos:
              </p>
              <div className="p-4 rounded-xl bg-[#0a0f12] border border-slate-800 text-slate-300 font-sans text-xs sm:text-sm leading-relaxed italic">
                "{current.before}"
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/80 mt-6 space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center space-x-1.5 text-rose-400">
                <X className="h-3.5 w-3.5" />
                <span>Tom informal ou agressivo demais</span>
              </div>
              <div className="flex items-center space-x-1.5 text-rose-400">
                <X className="h-3.5 w-3.5" />
                <span>Ausência de assunto e estrutura</span>
              </div>
              <div className="flex items-center space-x-1.5 text-rose-400">
                <X className="h-3.5 w-3.5" />
                <span>Risco jurídico de rescisão desregulada</span>
              </div>
            </div>
          </div>

          {/* After Column (8 cols) */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-[#0e161c] border border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.08)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-[#00f0ff] text-xs font-mono font-bold uppercase tracking-wider">
                  <Check className="h-4 w-4" />
                  <span>Entrega da Skill (One-Shot Output)</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                  Pronto para Envio
                </span>
              </div>

              {/* Warning box if case has risk */}
              {current.warning && (
                <div className="mb-4 p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200">
                  {current.warning}
                </div>
              )}

              {/* Subject */}
              <div className="mb-4 p-3 rounded-xl bg-[#0a0f12] border border-cyan-500/20 text-xs sm:text-sm">
                <span className="text-[#00f0ff] font-mono font-bold uppercase mr-2">Assunto:</span>
                <span className="text-white font-semibold">{current.subject}</span>
              </div>

              {/* Email Body */}
              <div className="p-4 rounded-xl bg-[#0a0f12] border border-cyan-500/20 text-xs sm:text-sm text-slate-200 font-sans leading-relaxed whitespace-pre-line">
                {current.after}
              </div>
            </div>

            <div className="pt-4 border-t border-cyan-500/15 mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <span className="text-emerald-400 font-medium">✓ Tom Equilibrado</span>
              <span className="text-emerald-400 font-medium">✓ Marcadores [...] Mapeados</span>
              <span className="text-emerald-400 font-medium">✓ Zero Alucinação Factual</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
