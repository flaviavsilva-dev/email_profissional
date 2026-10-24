import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function RiskBanner({ warning }) {
  if (!warning) return null;

  return (
    <div className="bg-[#14120a] border-l-4 border-amber-400 border-y border-r border-[#2d240d] rounded-r-xl p-4 transition-all shadow-[0_0_15px_rgba(245,158,11,0.15)]">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          <ShieldAlert className="h-5 w-5 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Atenção: Matriz de Risco Contratual & Operacional
            </h4>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
              Pilar 6
            </span>
          </div>
          <p className="text-xs text-amber-200/90 leading-relaxed font-normal">
            {warning}
          </p>
        </div>
      </div>
    </div>
  );
}
