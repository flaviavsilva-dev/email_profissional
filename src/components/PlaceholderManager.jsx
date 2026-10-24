import React from 'react';
import { Tag, CheckCircle2, AlertCircle } from 'lucide-react';

export default function PlaceholderManager({
  fields = [],
  placeholderValues = {},
  onValueChange
}) {
  if (!fields || fields.length === 0) return null;

  const filledCount = fields.filter(f => Boolean(placeholderValues[f.key]?.trim())).length;
  const isAllFilled = filledCount === fields.length;

  return (
    <div className="bg-[#0e161c] border border-[#1a2732] rounded-2xl p-4 sm:p-5 space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-[#16222b] text-[#00f0ff] border border-[#00f0ff]/30 shadow-[0_0_10px_rgba(0,240,255,0.25)]">
            <Tag className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#00f0ff] text-glow-cyan">
              Campos a Preencher (Marcadores Interativos)
            </h4>
            <p className="text-[11px] text-slate-400">
              Substitua os marcadores [campo] do email em tempo real:
            </p>
          </div>
        </div>

        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center space-x-1.5 border ${
          isAllFilled
            ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
            : 'bg-[#16222b] text-[#00f0ff] border-[#00f0ff]/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
        }`}>
          {isAllFilled ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Todos preenchidos</span>
            </>
          ) : (
            <>
              <AlertCircle className="h-3.5 w-3.5 text-[#00f0ff]" />
              <span>{filledCount} de {fields.length} preenchidos</span>
            </>
          )}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
        {fields.map(field => {
          const val = placeholderValues[field.key] || '';
          const hasValue = Boolean(val.trim());

          return (
            <div
              key={field.key}
              className={`p-3 rounded-xl border transition-all duration-200 ${
                hasValue
                  ? 'bg-[#101b22] border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                  : 'bg-[#0b1217] border-[#1a2732] hover:border-[#00f0ff]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-xs font-bold text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-0.5 rounded border border-[#00f0ff]/30 shadow-[0_0_8px_rgba(0,240,255,0.2)]">
                  [{field.key}]
                </span>
                {field.instruction && (
                  <span className="text-[10px] text-slate-400 truncate max-w-[200px]" title={field.instruction}>
                    {field.instruction}
                  </span>
                )}
              </div>
              <input
                type="text"
                value={val}
                onChange={e => onValueChange(field.key, e.target.value)}
                placeholder={`Digitar valor para substituir no email...`}
                className="w-full text-xs px-3 py-1.5 rounded-lg border border-[#1a2732] bg-[#0a0f12] text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] focus:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
