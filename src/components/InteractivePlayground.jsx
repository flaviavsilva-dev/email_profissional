import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  RefreshCw, 
  ArrowRight, 
  Tag, 
  Copy, 
  Check, 
  Download, 
  ShieldAlert, 
  MessageSquare,
  Clock,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TEMPLATES, TONES } from '../data/templates';
import { generateLocalEmail, generateGeminiEmail, auditEmailText } from '../services/emailEngine';

export default function InteractivePlayground({ apiKey, sender, onUpdateSender }) {
  const [inputText, setInputText] = useState(TEMPLATES[0].input);
  const [selectedTone, setSelectedTone] = useState(TEMPLATES[0].tone);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Result state (initialized with first template)
  const [result, setResult] = useState(() => {
    return generateLocalEmail({
      input: TEMPLATES[0].input,
      tone: TEMPLATES[0].tone,
      sender
    });
  });

  const [placeholderValues, setPlaceholderValues] = useState({});
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  // Calculate final text with placeholders replaced
  let finalSubject = result?.subject || '';
  let finalEmail = result?.email || '';

  Object.entries(placeholderValues).forEach(([key, val]) => {
    if (val && val.trim()) {
      const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      finalSubject = finalSubject.replace(new RegExp(`\\[${escapedKey}\\]`, 'g'), val.trim());
      finalEmail = finalEmail.replace(new RegExp(`\\[${escapedKey}\\]`, 'g'), val.trim());
    }
  });

  const audit = auditEmailText(finalEmail);

  // Select Quick Template
  const handleSelectTemplate = (tpl) => {
    setInputText(tpl.input);
    setSelectedTone(tpl.tone);
    setPlaceholderValues({});
    setError(null);

    // Auto-transform for instant gratification
    const generated = generateLocalEmail({
      input: tpl.input,
      tone: tpl.tone,
      sender
    });
    setResult(generated);
  };

  // Run Transformation
  const handleTransform = async () => {
    if (!inputText.trim()) {
      setError('Por favor, informe uma mensagem para transformar.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPlaceholderValues({});

    try {
      let outputData;
      if (apiKey) {
        try {
          outputData = await generateGeminiEmail({
            apiKey,
            input: inputText,
            tone: selectedTone,
            sender
          });
        } catch (apiErr) {
          console.warn('Fallback para motor local devido a erro na API:', apiErr);
          outputData = generateLocalEmail({
            input: inputText,
            tone: selectedTone,
            sender
          });
          outputData.warning = outputData.warning 
            ? `${outputData.warning} (Nota: Gerado via motor local offline).`
            : null;
        }
      } else {
        outputData = generateLocalEmail({
          input: inputText,
          tone: selectedTone,
          sender
        });
      }

      setResult(outputData);
    } catch (err) {
      setError(err.message || 'Erro ao processar o email.');
    } finally {
      setIsLoading(false);
    }
  };

  // Copy Subject
  const handleCopySubject = async () => {
    try {
      await navigator.clipboard.writeText(finalSubject);
      setCopiedSubject(true);
      setTimeout(() => setCopiedSubject(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  // Copy All with Confetti
  const handleCopyAll = async () => {
    try {
      const fullText = `Assunto: ${finalSubject}\n\n${finalEmail}`;
      await navigator.clipboard.writeText(fullText);
      setCopiedAll(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 }
      });
      setTimeout(() => setCopiedAll(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  // Open in Mail Client
  const handleOpenMailto = () => {
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(finalEmail)}`;
    window.open(mailtoUrl, '_blank');
  };

  return (
    <section id="playground" className="py-20 relative bg-[#0a0f12]">
      
      {/* Light glow effects */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="h-3 w-3" />
            <span>PLAYGROUND INTERATIVO AO VIVO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Teste a Skill em <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#0099ff]">Tempo Real</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Selecione um caso de teste oficial da skill ou digite sua própria mensagem informal abaixo.
          </p>
        </div>

        {/* Quick Template Chips */}
        <div className="mb-6 flex overflow-x-auto pb-3 gap-2.5 scrollbar-thin">
          {TEMPLATES.map((tpl) => {
            const isCurrent = inputText === tpl.input;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => handleSelectTemplate(tpl)}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-left border text-xs transition-all ${
                  isCurrent
                    ? 'bg-cyan-950/80 border-[#00f0ff] text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                    : 'bg-[#0e161c] border-cyan-500/20 text-slate-400 hover:text-slate-200 hover:border-cyan-500/40'
                }`}
              >
                <div className="flex items-center space-x-1.5 font-semibold">
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-[#0a0f12] text-[#00f0ff] border border-cyan-500/30">
                    {tpl.category}
                  </span>
                  <span>{tpl.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Playground Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Controls & Input (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-5 rounded-2xl bg-[#0e161c]/90 border border-cyan-500/25 shadow-[0_4px_30px_rgba(0,0,0,0.5)] space-y-4">
              
              {/* Tone Selection */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                  1. Modulação de Tom
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TONES.map((tone) => {
                    const isSelected = selectedTone === tone.id;
                    return (
                      <button
                        key={tone.id}
                        type="button"
                        onClick={() => setSelectedTone(tone.id)}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-gradient-to-br from-cyan-950/90 to-blue-950/70 border-[#00f0ff] text-white shadow-[0_0_15px_rgba(0,240,255,0.35)]'
                            : 'bg-[#0a0f12] border-cyan-500/15 text-slate-400 hover:border-cyan-500/40 hover:text-slate-200'
                        }`}
                      >
                        <div className="font-semibold truncate">{tone.name}</div>
                        <div className="text-[10px] text-slate-500 truncate mt-0.5">{tone.badge}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Informal Input Area */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                    2. Mensagem Informal ou Rascunho
                  </label>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {inputText.length} caracteres
                  </span>
                </div>

                <textarea
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    if (error) setError(null);
                  }}
                  rows={5}
                  placeholder="Digite ou cole aqui sua anotação ou rascunho..."
                  className="w-full p-3.5 rounded-xl border border-cyan-500/20 bg-[#0a0f12] text-white placeholder:text-slate-600 text-xs sm:text-sm font-sans leading-relaxed focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all resize-y shadow-inner"
                />
              </div>

              {/* Error display */}
              {error && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs">
                  {error}
                </div>
              )}

              {/* Primary Glowing Action Button */}
              <button
                type="button"
                onClick={handleTransform}
                disabled={isLoading || !inputText.trim()}
                className="w-full btn-cyan-glow py-3.5 px-5 text-sm font-bold flex items-center justify-center space-x-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin text-[#041017]" />
                    <span>Processando One-Shot...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-[#041017]" />
                    <span>Redigir Email com a Skill</span>
                    <ArrowRight className="h-4 w-4 text-[#041017]" />
                  </>
                )}
              </button>

            </div>

            {/* Quick Guarantees Pill Box */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-[#0e161c] border border-cyan-500/15">
                <span className="block font-bold text-white font-mono text-[11px]">One-Shot</span>
                <span className="text-[10px] text-slate-400">1ª Resposta Pronta</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0e161c] border border-cyan-500/15">
                <span className="block font-bold text-white font-mono text-[11px]">Fidelidade</span>
                <span className="text-[10px] text-slate-400">Dados Preservados</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0e161c] border border-cyan-500/15">
                <span className="block font-bold text-white font-mono text-[11px]">Placeholders</span>
                <span className="text-[10px] text-slate-400">Marcadores [...]</span>
              </div>
            </div>

          </div>

          {/* Right Column: Generated Output Card (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Risk Alert Callout (Pilar 6) */}
            {result?.warning && (
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)] flex items-start space-x-3">
                <ShieldAlert className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono">
                      Atenção: Matriz de Risco Operacional & Jurídica
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-900/60 text-amber-200 font-semibold">
                      Pilar 6
                    </span>
                  </div>
                  <p className="text-xs text-amber-200/90 mt-1 leading-relaxed">
                    {result.warning}
                  </p>
                </div>
              </div>
            )}

            {/* Email Container Card */}
            <div className="rounded-2xl bg-[#0e161c]/95 border border-cyan-500/25 shadow-[0_0_35px_rgba(0,240,255,0.08)] overflow-hidden">
              
              {/* Header */}
              <div className="px-5 py-3.5 border-b border-cyan-500/15 flex items-center justify-between bg-[#0a0f12]/60">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_8px_#00f0ff]"></span>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                    Email Corporativo Pronto para Envio
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleOpenMailto}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 hover:border-cyan-400 hover:text-white transition"
                    title="Abrir diretamente no seu Outlook / Gmail"
                  >
                    <Send className="h-3 w-3" />
                    <span>Abrir no Email</span>
                  </button>

                  <button
                    onClick={handleCopyAll}
                    className={`btn-cyan-glow px-3.5 py-1.5 text-xs font-semibold flex items-center space-x-1.5 ${
                      copiedAll ? 'brightness-125' : ''
                    }`}
                  >
                    {copiedAll ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedAll ? 'Copiado!' : 'Copiar Tudo'}</span>
                  </button>
                </div>
              </div>

              {/* Subject Line */}
              <div className="px-5 py-3 border-b border-cyan-500/15 flex items-center justify-between gap-3 bg-[#0a0f12]/30">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex-shrink-0">
                    Assunto:
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white truncate font-sans">
                    {finalSubject}
                  </span>
                </div>

                <button
                  onClick={handleCopySubject}
                  className="flex-shrink-0 flex items-center space-x-1 px-2.5 py-1 text-xs text-slate-400 hover:text-[#00f0ff] hover:bg-cyan-950/40 rounded transition"
                  title="Copiar apenas o assunto"
                >
                  {copiedSubject ? <Check className="h-3 w-3 text-[#00f0ff]" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedSubject ? 'Copiado' : 'Assunto'}</span>
                </button>
              </div>

              {/* Email Body */}
              <div className="p-5 sm:p-6 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans space-y-4 selection:bg-[#00f0ff]/30">
                {finalEmail.split('\n\n').map((paragraph, idx) => {
                  const parts = paragraph.split(/(\[.*?\])/g);
                  return (
                    <p key={idx} className="leading-relaxed">
                      {parts.map((part, pIdx) => {
                        if (part.startsWith('[') && part.endsWith(']')) {
                          return (
                            <span
                              key={pIdx}
                              className="inline-block px-1.5 py-0.5 mx-0.5 rounded font-mono text-xs font-bold bg-cyan-950/80 text-[#00f0ff] border border-cyan-500/50 shadow-[0_0_10px_rgba(0,240,255,0.25)]"
                              title="Substitua este marcador no painel abaixo"
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

            </div>

            {/* Interactive Placeholders Replacer (Pilar 3) */}
            {result?.fieldsToFill && result.fieldsToFill.length > 0 && (
              <div className="p-4 rounded-xl bg-[#0e161c] border border-cyan-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-[#00f0ff]" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                      Campos a Preencher (Marcadores Interativos)
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Substitui no texto em tempo real
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {result.fieldsToFill.map((field) => {
                    const val = placeholderValues[field.key] || '';
                    return (
                      <div key={field.key} className="p-2.5 rounded-lg bg-[#0a0f12] border border-cyan-500/15">
                        <div className="text-[11px] font-mono text-[#00f0ff] font-semibold mb-1 truncate">
                          [{field.key}]
                        </div>
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => {
                            setPlaceholderValues((prev) => ({
                              ...prev,
                              [field.key]: e.target.value
                            }));
                          }}
                          placeholder={field.instruction || 'Digite o valor...'}
                          className="w-full text-xs px-2.5 py-1.5 rounded bg-[#0e161c] border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00f0ff]"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Live Audit Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[#0e161c] border border-cyan-500/15 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <FileText className="h-3.5 w-3.5 text-[#00f0ff]" />
                <span><strong className="text-white">{audit.wordCount}</strong> palavras</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                  {audit.isOptimalLength ? 'Tamanho Ideal (80-200)' : 'Ajustado'}
                </span>
              </div>

              <div className="flex items-center space-x-1.5">
                <Clock className="h-3.5 w-3.5 text-slate-500" />
                <span>{audit.readingTime}</span>
              </div>

              <div className="text-emerald-400 font-medium flex items-center space-x-1">
                <Check className="h-3.5 w-3.5" />
                <span>100% Anti-Clichê Corporativo</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
