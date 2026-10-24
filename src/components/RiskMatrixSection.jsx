import React from 'react';
import { ShieldAlert, AlertTriangle, Scale, Lock, CheckCircle2 } from 'lucide-react';

export default function RiskMatrixSection() {
  const riskCategories = [
    {
      title: 'Cobrança & Suspensão de Serviços',
      trigger: 'Mora superior a 15 dias ou ameaça de corte de serviço/acesso',
      alert: 'A suspensão de suporte e serviços por inadimplência pode possuir requisitos contratuais específicos. Recomendamos conferir prazos antes do envio.',
      status: 'Alto Risco',
      color: 'border-amber-500/40 text-amber-400'
    },
    {
      title: 'Rescisão & Notificação Contratual',
      trigger: 'Cancelamento de serviços, aviso prévio ou encerramento unilateral',
      alert: 'O encerramento contratual possui implicações legais e prazos formais de aviso prévio. Certifique-se de que a notificação atende às cláusulas vigentes.',
      status: 'Alto Risco',
      color: 'border-rose-500/40 text-rose-400'
    },
    {
      title: 'Quebra de SLA & Incidentes Críticos',
      trigger: 'Queda de sistemas, indisponibilidade de banco de dados ou violação de SLA',
      alert: 'Comunicações sobre quebra de disponibilidade podem impactar acordos de SLA e penalidades financeiras contratuais.',
      status: 'Alto Risco',
      color: 'border-cyan-500/40 text-cyan-400'
    },
    {
      title: 'Rotina Corporativa & Alinhamentos',
      trigger: 'Follow-ups, pedidos de reunião, alinhamentos diários de equipe',
      alert: 'Comunicação executiva de baixo risco. O email é entregue diretamente no formato canônico sem notas prévias.',
      status: 'Baixo Risco',
      color: 'border-emerald-500/40 text-emerald-400'
    }
  ];

  return (
    <section id="matriz-risco" className="py-24 relative bg-[#0a0f12] border-t border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <ShieldAlert className="h-3 w-3" />
            <span>SEGURANÇA CORPORATIVA & COMPLIANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Matriz de Risco: Quando a Skill <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#0099ff] text-glow-cyan">Sinaliza</span> Antes de Agir
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            O Pilar 6 da skill proíbe o envio cego de comunicações que possam gerar litígios ou multas contratuais. O motor analisa o teor do rascunho e insere um alerta preventivo antes da linha de assunto.
          </p>
        </div>

        {/* Risk Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {riskCategories.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl bg-[#0e161c] border ${item.color} shadow-[0_4px_30px_rgba(0,0,0,0.5)] space-y-3 relative overflow-hidden`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">
                  {item.title}
                </h3>
                <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-[#0a0f12] border ${item.color}`}>
                  {item.status}
                </span>
              </div>

              <div className="text-xs text-slate-400">
                <strong className="text-slate-300">Gatilho de Ativação:</strong> {item.trigger}
              </div>

              <div className="p-3 rounded-xl bg-[#0a0f12] border border-cyan-500/10 text-xs text-slate-300 leading-relaxed font-sans">
                <span className="font-mono text-[10px] text-cyan-400 font-bold block mb-1">Nota Emitida pela Skill:</span>
                "{item.alert}"
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
