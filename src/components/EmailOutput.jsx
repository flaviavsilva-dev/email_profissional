import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Send, 
  Download, 
  Edit3, 
  Eye, 
  Mail,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import RiskBanner from './RiskBanner';
import AuditBar from './AuditBar';
import PlaceholderManager from './PlaceholderManager';

export default function EmailOutput({
  data,
  placeholderValues,
  onPlaceholderChange,
  onManualTextChange,
  manualEmailText,
  isEditing,
  setIsEditing
}) {
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  if (!data || !data.email) return null;

  // Compute final subject and email body after applying placeholder replacements
  let finalSubject = data.subject || '';
  let finalEmail = isEditing && manualEmailText !== null ? manualEmailText : (data.email || '');

  // Apply placeholder replacements to subject and email if not manually editing
  if (!isEditing) {
    Object.entries(placeholderValues).forEach(([key, val]) => {
      if (val && val.trim()) {
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        finalSubject = finalSubject.replace(new RegExp(`\\[${escapedKey}\\]`, 'g'), val.trim());
        finalEmail = finalEmail.replace(new RegExp(`\\[${escapedKey}\\]`, 'g'), val.trim());
      }
    });
  }

  // Copy Subject
  const handleCopySubject = async () => {
    try {
      await navigator.clipboard.writeText(finalSubject);
      setCopiedSubject(true);
      setTimeout(() => setCopiedSubject(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // Copy Full Email (with Confetti)
  const handleCopyAll = async () => {
    try {
      const fullText = `Assunto: ${finalSubject}\n\n${finalEmail}`;
      await navigator.clipboard.writeText(fullText);
      setCopiedAll(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#00f0ff', '#38bdf8', '#0284c7', '#ffffff']
      });
      setTimeout(() => setCopiedAll(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  // Open in Mail Client (Mailto)
  const handleOpenInEmailClient = () => {
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(finalEmail)}`;
    window.open(mailtoUrl, '_blank');
  };

  // Download as .eml / .txt
  const handleDownloadFile = () => {
    const fileContent = `Subject: ${finalSubject}\nContent-Type: text/plain; charset=UTF-8\n\n${finalEmail}`;
    const blob = new Blob([fileContent], { type: 'message/rfc822;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${finalSubject.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_') || 'email_corporativo'}.eml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* 1. Risk Callout (Pilar 6) */}
      <RiskBanner warning={data.warning} />

      {/* 2. Main Email Card */}
      <div className="bg-[#0e161c] border border-[#1a2732] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300 hover:border-[#00f0ff]/40">
        
        {/* Card Header & Actions */}
        <div className="px-5 py-4 border-b border-[#1a2732] flex flex-wrap items-center justify-between gap-3 bg-[#0a0f12]/80">
          <div className="flex items-center space-x-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#00f0ff] text-glow-cyan">
              Email Corporativo Pronto (One-Shot Delivery)
            </span>
          </div>

          <div className="flex items-center space-x-2 flex-wrap">
            {/* Toggle Edit / Preview */}
            <button
              onClick={() => {
                if (!isEditing && manualEmailText === null) {
                  onManualTextChange(finalEmail);
                }
                setIsEditing(!isEditing);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-[#1a2732] bg-[#121c24] hover:border-[#00f0ff]/50 text-slate-300 hover:text-[#00f0ff] glow-cyan-hover transition cursor-pointer"
              title={isEditing ? 'Voltar para visualização formatada' : 'Editar texto livremente'}
            >
              {isEditing ? <Eye className="h-3.5 w-3.5" /> : <Edit3 className="h-3.5 w-3.5" />}
              <span>{isEditing ? 'Visualizar' : 'Editar'}</span>
            </button>

            {/* Open Mail Client with glowing cyan style */}
            <button
              onClick={handleOpenInEmailClient}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl border border-[#00f0ff]/40 bg-gradient-to-r from-[#0c222e] to-[#102d3d] text-[#00f0ff] hover:border-[#00f0ff] glow-cyan-hover transition cursor-pointer"
              title="Abrir diretamente no seu Outlook, Gmail ou cliente padrão"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Abrir no Email</span>
            </button>

            {/* Download .eml */}
            <button
              onClick={handleDownloadFile}
              className="p-1.5 rounded-xl border border-[#1a2732] bg-[#121c24] text-slate-400 hover:text-[#00f0ff] hover:border-[#00f0ff]/50 glow-cyan-hover transition cursor-pointer"
              title="Baixar arquivo .eml para Outlook / Apple Mail"
            >
              <Download className="h-3.5 w-3.5" />
            </button>

            {/* Primary Action: Copy Full Email with glowing cyan gradient */}
            <button
              onClick={handleCopyAll}
              className={`flex items-center space-x-1.5 px-4 py-1.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                copiedAll
                  ? 'bg-emerald-500 text-[#0a0f12] shadow-[0_0_20px_rgba(16,185,129,0.8)]'
                  : 'bg-gradient-to-r from-[#00f0ff] via-[#00d4ea] to-[#0284c7] text-[#0a0f12] glow-cyan-hover shadow-[0_0_18px_rgba(0,240,255,0.45)]'
              }`}
            >
              {copiedAll ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : <Copy className="h-3.5 w-3.5 stroke-[2.5]" />}
              <span>{copiedAll ? 'Copiado com Sucesso!' : 'Copiar Tudo'}</span>
            </button>
          </div>
        </div>

        {/* Subject Line */}
        <div className="px-5 py-3 border-b border-[#1a2732] flex items-center justify-between gap-3 bg-[#0b1217]">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <span className="text-xs font-extrabold text-[#00f0ff] uppercase tracking-wider flex-shrink-0">
              Assunto:
            </span>
            <span className="text-sm font-semibold text-white truncate">
              {finalSubject}
            </span>
          </div>

          <button
            onClick={handleCopySubject}
            className="flex-shrink-0 flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold text-slate-300 hover:text-[#00f0ff] bg-[#121c24] hover:border-[#00f0ff]/40 border border-[#1a2732] rounded-lg transition cursor-pointer"
            title="Copiar apenas a linha de assunto"
          >
            {copiedSubject ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            <span>{copiedSubject ? 'Copiado' : 'Copiar Assunto'}</span>
          </button>
        </div>

        {/* Email Body Content */}
        <div className="p-5 sm:p-6 text-sm text-slate-200 leading-relaxed">
          {isEditing ? (
            <textarea
              value={finalEmail}
              onChange={e => onManualTextChange(e.target.value)}
              rows={12}
              className="w-full p-4 rounded-xl border border-[#1a2732] bg-[#0b1217] text-white font-sans text-sm leading-relaxed focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] focus:shadow-[0_0_15px_rgba(0,240,255,0.3)] resize-y"
              placeholder="Edite o conteúdo do email livremente..."
            />
          ) : (
            <div className="whitespace-pre-line space-y-3 font-normal selection:bg-[#00f0ff] selection:text-[#0a0f12]">
              {finalEmail.split('\n\n').map((paragraph, idx) => {
                // Highlight remaining un-replaced [placeholders] in neon cyan badge style
                const parts = paragraph.split(/(\[.*?\])/g);
                return (
                  <p key={idx} className="leading-relaxed">
                    {parts.map((part, pIdx) => {
                      if (part.startsWith('[') && part.endsWith(']')) {
                        return (
                          <span
                            key={pIdx}
                            className="inline-block px-2 py-0.5 mx-0.5 rounded-md font-mono text-xs font-bold bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/50 shadow-[0_0_8px_rgba(0,240,255,0.3)]"
                            title="Preencha este campo no painel interativo abaixo"
                          >
                            {part}
                          </span>
                        );
                      }
                      return part;
                    })}
                  </p>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* 3. Interactive Placeholders Manager (Pilar 3) */}
      <PlaceholderManager
        fields={data.fieldsToFill}
        placeholderValues={placeholderValues}
        onValueChange={onPlaceholderChange}
      />

      {/* 4. Live Audit Bar (Pilar 4: Anti-Clichê & Tamanho Ideal) */}
      <AuditBar emailText={finalEmail} />
    </div>
  );
}
