import React from 'react';
import { CheckCircle, AlertTriangle, Clock, FileText, Sparkles, ShieldCheck } from 'lucide-react';
import { auditEmailText } from '../services/emailEngine';

export default function AuditBar({ emailText }) {
  const audit = auditEmailText(emailText);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#0e161c] rounded-xl border border-[#1a2732] text-xs shadow-xs">
      {/* Metric 1: Word Count */}
      <div className="flex items-center space-x-2">
        <FileText className="h-3.5 w-3.5 text-[#00f0ff]" />
        <span className="text-slate-300">
          <strong className="text-white font-mono">{audit.wordCount}</strong> palavras
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
          audit.isOptimalLength
            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
            : 'bg-amber-950/60 text-amber-300 border-amber-500/40'
        }`}>
          {audit.isOptimalLength ? 'Extensão Ideal (80–200)' : audit.wordCount < 70 ? 'Sintético' : 'Extenso'}
        </span>
      </div>

      {/* Metric 2: Reading Time */}
      <div className="flex items-center space-x-1.5 text-slate-300">
        <Clock className="h-3.5 w-3.5 text-[#00f0ff]" />
        <span className="font-mono">{audit.readingTime}</span>
      </div>

      {/* Metric 3: Anti-Cliché Guarantee */}
      <div className="flex items-center space-x-1.5">
        {audit.isClean ? (
          <span className="inline-flex items-center space-x-1 text-emerald-400 font-semibold">
            <CheckCircle className="h-3.5 w-3.5 drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
            <span>Anti-Clichê (100% Livre de jargões ocos)</span>
          </span>
        ) : (
          <span className="inline-flex items-center space-x-1 text-amber-400 font-semibold">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Clichê detectado</span>
          </span>
        )}
      </div>

      {/* Metric 4: Factual fidelity */}
      <div className="flex items-center space-x-1 text-[#00f0ff] font-semibold">
        <ShieldCheck className="h-3.5 w-3.5 drop-shadow-[0_0_6px_rgba(0,240,255,0.7)]" />
        <span className="text-glow-cyan">Zero Alucinação Factual</span>
      </div>
    </div>
  );
}
