import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { TEMPLATES } from '../data/templates';

export default function TemplatePicker({ onSelectTemplate }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5 text-[#00f0ff]">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Cenários Rápidos (1-Clique)
          </span>
        </div>
        <span className="text-[11px] text-slate-400">
          Casos reais da Skill
        </span>
      </div>

      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-thin">
        {TEMPLATES.map(tpl => (
          <button
            key={tpl.id}
            type="button"
            onClick={() => onSelectTemplate(tpl)}
            className="flex-shrink-0 max-w-[280px] p-2.5 rounded-xl text-left bg-[#0e161c] border border-[#1a2732] hover:border-[#00f0ff]/60 hover:bg-[#121c24] hover:shadow-[0_0_16px_rgba(0,240,255,0.25)] transition-all duration-200 group cursor-pointer"
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#16222b] text-[#00f0ff] border border-[#00f0ff]/20">
                {tpl.category}
              </span>
              <ArrowRight className="h-3 w-3 text-slate-500 group-hover:text-[#00f0ff] group-hover:translate-x-0.5 transition" />
            </div>
            <div className="font-semibold text-xs text-slate-200 group-hover:text-[#00f0ff] transition-colors truncate">
              {tpl.title}
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
              "{tpl.input}"
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
