import React from 'react';
import { X, Clock, Trash2, ArrowUpRight } from 'lucide-react';

export default function HistoryDrawer({
  isOpen,
  onClose,
  history = [],
  onRestore,
  onClearHistory
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e161c] shadow-2xl border-l border-[#00f0ff]/30 flex flex-col">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#1a2732] flex items-center justify-between bg-[#0a0f12]">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-[#00f0ff]" />
              <h3 className="text-sm font-bold text-white">
                Histórico de Emails ({history.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-[#00f0ff] hover:bg-[#121c24] transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {history.length === 0 ? (
              <div className="text-center py-16 text-slate-500 text-xs">
                Nenhum email gerado ainda. Transforme uma mensagem para salvar no histórico.
              </div>
            ) : (
              history.map(item => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-[#1a2732] bg-[#0b1217] hover:border-[#00f0ff]/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all group"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1.5">
                    <span className="font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#16222b] text-[#00f0ff] border border-[#00f0ff]/20">
                      {item.tone}
                    </span>
                    <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  <h4 className="text-xs font-bold text-white truncate mb-1 group-hover:text-[#00f0ff] transition-colors">
                    {item.subject}
                  </h4>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {item.email}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#1a2732]">
                    <button
                      onClick={() => {
                        onRestore(item);
                        onClose();
                      }}
                      className="text-xs font-semibold text-[#00f0ff] hover:underline inline-flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Restaurar este email</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Clear All */}
          {history.length > 0 && (
            <div className="p-4 border-t border-[#1a2732] flex justify-between items-center bg-[#0a0f12]">
              <span className="text-[11px] text-slate-500">Salvo no seu navegador</span>
              <button
                onClick={onClearHistory}
                className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center space-x-1 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Limpar Histórico</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
