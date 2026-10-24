import React from 'react';
import { 
  MessageSquare, 
  Briefcase, 
  ShieldAlert, 
  TrendingUp, 
  Flame, 
  Crown,
  Check
} from 'lucide-react';
import { TONES } from '../data/templates';

const ICONS_MAP = {
  MessageSquareSmile: MessageSquare,
  Briefcase: Briefcase,
  ShieldAlert: ShieldAlert,
  TrendingUp: TrendingUp,
  Flame: Flame,
  Crown: Crown
};

export default function ToneSelector({ selectedTone, onSelectTone }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-[#00f0ff] flex items-center space-x-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_6px_#00f0ff]"></span>
          <span>Modulação de Tom & Assertividade</span>
        </label>
        <span className="text-[11px] text-slate-400">
          Calibrado para o nicho de comunicação
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {TONES.map(tone => {
          const Icon = ICONS_MAP[tone.icon] || MessageSquare;
          const isSelected = selectedTone === tone.id;

          return (
            <button
              key={tone.id}
              type="button"
              onClick={() => onSelectTone(tone.id)}
              className={`relative flex flex-col p-3 rounded-xl text-left border transition-all duration-200 text-xs group cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-b from-[#12222d] to-[#0d161d] border-[#00f0ff] shadow-[0_0_18px_rgba(0,240,255,0.35)] ring-1 ring-[#00f0ff]/50'
                  : 'bg-[#0e161c] border-[#1a2732] hover:border-[#00f0ff]/40 hover:bg-[#121c24] hover:shadow-[0_0_12px_rgba(0,240,255,0.2)]'
              }`}
            >
              {/* Header with Icon and selection check */}
              <div className="flex items-center justify-between w-full mb-2">
                <div className={`p-1.5 rounded-lg transition-all ${
                  isSelected 
                    ? 'bg-[#00f0ff] text-[#0a0f12] shadow-[0_0_10px_#00f0ff]' 
                    : 'bg-[#16222b] text-[#00f0ff] group-hover:bg-[#1c2e3b]'
                }`}>
                  <Icon className="h-4 w-4 stroke-[2.2]" />
                </div>
                {isSelected && (
                  <span className="h-4 w-4 rounded-full bg-[#00f0ff] text-[#0a0f12] flex items-center justify-center shadow-[0_0_8px_#00f0ff]">
                    <Check className="h-2.5 w-2.5 stroke-[3.5]" />
                  </span>
                )}
              </div>

              {/* Title */}
              <span className={`font-bold tracking-tight text-xs mb-1 transition-colors ${
                isSelected ? 'text-[#00f0ff] text-glow-cyan' : 'text-slate-200 group-hover:text-white'
              }`}>
                {tone.name}
              </span>

              {/* Short description */}
              <p className="text-[11px] leading-tight text-slate-400 line-clamp-2">
                {tone.subtitle}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
