import React, { useState } from 'react';
import { X, Key, Check, Sparkles, Trash2, ExternalLink } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, apiKey, onSaveApiKey }) {
  const [inputValue, setInputValue] = useState(apiKey || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveApiKey(inputValue.trim());
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 900);
  };

  const handleClear = () => {
    setInputValue('');
    onSaveApiKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#0e161c] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-[#00f0ff]/40 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-[#16222b] text-[#00f0ff] border border-[#00f0ff]/30 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Chave Google Gemini API
              </h3>
              <p className="text-xs text-[#00f0ff]">
                Opcional • O motor local opera 100% offline
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-[#00f0ff] hover:bg-[#121c24] transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Info box */}
        <div className="p-3.5 rounded-xl bg-[#0b1217] border border-[#1a2732] text-xs text-slate-300 space-y-2 leading-relaxed">
          <div className="flex items-center space-x-1.5 font-bold text-[#00f0ff]">
            <Sparkles className="h-4 w-4" />
            <span>Duplo Modo de Operação:</span>
          </div>
          <p>
            • <strong>Sem chave:</strong> O motor local inteligente executa com zero delay de forma 100% offline, gratuita e ilimitada.
          </p>
          <p>
            • <strong>Com chave:</strong> Conecta ao modelo <code>gemini-2.5-flash</code> executando o prompt oficial da skill.
          </p>
          <p className="text-[11px] text-slate-500 pt-1">
            * A chave é salva exclusivamente no <code>localStorage</code> do seu navegador.
          </p>
        </div>

        {/* Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-200">
            Cole sua Gemini API Key:
          </label>
          <input
            type="password"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#1a2732] bg-[#0b1217] text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] focus:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition"
          />
        </div>

        {/* Links */}
        <div className="flex items-center justify-between text-xs">
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-1 text-[#00f0ff] hover:underline"
          >
            <span>Obter chave gratuita no Google AI Studio</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          {apiKey && (
            <button
              onClick={handleClear}
              className="inline-flex items-center space-x-1 text-rose-400 hover:text-rose-300 text-xs font-semibold cursor-pointer"
            >
              <Trash2 className="h-3 w-3" />
              <span>Remover chave</span>
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-400 hover:text-white hover:bg-[#121c24] transition cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className={`px-5 py-2 text-xs font-bold rounded-xl flex items-center space-x-1.5 transition cursor-pointer ${
              saveSuccess 
                ? 'bg-emerald-500 text-[#0a0f12] shadow-[0_0_15px_rgba(16,185,129,0.8)]' 
                : 'bg-gradient-to-r from-[#00f0ff] to-[#0284c7] text-[#0a0f12] glow-cyan-hover'
            }`}
          >
            {saveSuccess ? (
              <>
                <Check className="h-3.5 w-3.5 stroke-[3]" />
                <span>Salvo com Sucesso!</span>
              </>
            ) : (
              <span>Salvar Configuração</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
