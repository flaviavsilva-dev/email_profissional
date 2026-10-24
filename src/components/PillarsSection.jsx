import React from 'react';
import { 
  Zap, 
  MessageSquareOff, 
  Tag, 
  ShieldCheck, 
  LayoutTemplate, 
  AlertTriangle 
} from 'lucide-react';

export default function PillarsSection() {
  const pillars = [
    {
      id: 'pilar-1',
      num: '01',
      title: 'Entrega One-Shot (1ª Resposta Completa)',
      icon: Zap,
      desc: 'O assistente entrega o email completo e formatado logo na primeira interação. Nunca devolve apenas perguntas vazias ou pedidos de esclarecimento ao usuário.',
      badge: 'Agilidade Máxima'
    },
    {
      id: 'pilar-2',
      num: '02',
      title: 'Proibição de Respostas com Dúvidas Soltas',
      icon: MessageSquareOff,
      desc: 'Proíbe expressamente interações intermediárias travadas. Se faltar informação essencial, a skill redige a estrutura e delimita as lacunas.',
      badge: 'Zero Bloqueio'
    },
    {
      id: 'pilar-3',
      num: '03',
      title: 'Placeholders [...] Padronizados',
      desc: 'Qualquer dado ausente é demarcado entre colchetes em caixa baixa explicativa (ex.: [data limite de pagamento]) e catalogado na seção Campos a Preencher.',
      icon: Tag,
      badge: 'Alta Usabilidade'
    },
    {
      id: 'pilar-4',
      num: '04',
      title: 'Fidelidade Factual Absoluta',
      desc: 'Zero alucinação. Datas, valores monetários em R$, números de notas fiscais e prazos fornecidos no rascunho são preservados com 100% de exatidão.',
      icon: ShieldCheck,
      badge: 'Anti-Alucinação'
    },
    {
      id: 'pilar-5',
      num: '05',
      title: 'Formato Canônico Estrito',
      desc: 'Estrutura padronizada: Assunto objetivo, Corpo em 1 a 3 parágrafos concisos (80–200 palavras) e seção Campos a Preencher sincronizada.',
      icon: LayoutTemplate,
      badge: 'Padrão Corporativo'
    },
    {
      id: 'pilar-6',
      num: '06',
      title: 'Matriz de Risco com Alerta Prévio',
      desc: 'Emite nota de atenção em destaque (> ⚠️ Atenção) antes do assunto quando a comunicação envolve cobrança em mora, suspensão de serviço ou rescisões.',
      icon: AlertTriangle,
      badge: 'Compliance & Legal'
    }
  ];

  return (
    <section id="pilares" className="py-24 relative bg-[#0a0f12] border-t border-cyan-500/15">
      
      {/* Light glow accents */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <span>ESPECIFICAÇÃO DE ENGENHARIA DE PROMPT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Os 6 Pilares Inegociáveis da <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#0099ff] text-glow-cyan">Skill</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Diferente de prompts genéricos de IA, a arquitetura canônica definida no <code className="text-[#00f0ff] font-mono">AGENTS.md</code> impõe seis princípios operacionais inegociáveis para garantir redações executivas de alto nível.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                className="cyber-card p-6 relative group overflow-hidden bg-[#0e161c]/80 border border-cyan-500/20 hover:border-[#00f0ff] transition-all duration-300"
              >
                {/* Number Watermark */}
                <span className="absolute top-4 right-5 text-4xl font-mono font-black text-slate-800/60 group-hover:text-cyan-500/20 transition-colors pointer-events-none">
                  {p.num}
                </span>

                {/* Icon with cyan glow */}
                <div className="h-12 w-12 rounded-xl bg-[#0a0f12] border border-cyan-500/30 flex items-center justify-center text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.25)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] group-hover:border-[#00f0ff] transition-all mb-5">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Badge */}
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                  {p.badge}
                </span>

                {/* Title */}
                <h3 className="text-base font-bold text-white mt-3 mb-2 group-hover:text-[#00f0ff] transition-colors">
                  {p.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {p.desc}
                </p>

                {/* Bottom line hover effect */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
