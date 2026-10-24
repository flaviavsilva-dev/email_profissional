import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'O site funciona sem precisar cadastrar chave de API?',
      a: 'Sim, 100%! O site possui um motor local heurístico corporativo embutido que processa e modula seus textos instantaneamente no navegador, com latência zero e sem depender de nenhuma chave de API ou backend. Caso queira conexão direta com IA profunda, você pode opcionalmente conectar sua Gemini API Key gratuita.'
    },
    {
      q: 'O que é o conceito de "Entrega One-Shot" da Skill?',
      a: 'A maioria dos chatbots comuns responde fazendo perguntas ("Para quem é o email?", "Qual é o valor?"), gerando atrito e perda de tempo. O Pilar 1 da Skill obriga a entrega do email completo já na primeira resposta. Quaisquer dados essenciais ausentes são assinalados com marcadores entre colchetes [...] prontos para preenchimento.'
    },
    {
      q: 'Como a Skill garante fidelidade factual e zero alucinação?',
      a: 'O Pilar 4 estabelece como regra inegociável a preservação estrita de números de notas fiscais, datas, prazos e valores monetários informados pelo usuário. Se um dado essencial não foi citado, a skill jamais inventa — ela insere um marcador padronizado como [data de vencimento].'
    },
    {
      q: 'Como funciona a Matriz de Risco do Pilar 6?',
      a: 'Comunicações sobre dívidas com ameaça de suspensão de serviços, cancelamento de contratos e violações de SLA possuem repercussões jurídicas sérias. A Skill detecta esses tópicos e adiciona uma nota de atenção no topo do email, alertando para conferência de prazos contratuais antes do envio.'
    },
    {
      q: 'Posso usar esta skill no meu dia a dia em outros assistentes?',
      a: 'Com certeza! Os arquivos SKILL.md e AGENTS.md foram criados em formato Markdown e YAML agnósticos, compatíveis diretamente com o Google Antigravity, Claude (Projects / Custom Instructions), ChatGPT (Custom GPTs) e Cursor (.cursorrules).'
    }
  ];

  return (
    <section id="faq" className="py-24 relative bg-[#0a0f12] border-t border-cyan-500/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="h-3 w-3" />
            <span>PERGUNTAS FREQUENTES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Dúvidas sobre a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#0099ff]">Skill</span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm">
            Entenda o funcionamento técnico e prático da ferramenta.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className="rounded-xl bg-[#0e161c] border border-cyan-500/15 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left text-sm sm:text-base font-bold text-white hover:text-[#00f0ff] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-[#00f0ff] flex-shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0 ml-2" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-cyan-500/10 bg-[#0a0f12]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
