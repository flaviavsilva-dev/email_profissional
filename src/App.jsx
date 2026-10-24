import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  RefreshCw, 
  Mail, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  Layers,
  HelpCircle,
  FileText,
  Cpu,
  Flame,
  Zap
} from 'lucide-react';
import Navbar from './components/Navbar';
import ToneSelector from './components/ToneSelector';
import TemplatePicker from './components/TemplatePicker';
import SenderProfile from './components/SenderProfile';
import EmailOutput from './components/EmailOutput';
import SkillInfoModal from './components/SkillInfoModal';
import ApiKeyModal from './components/ApiKeyModal';
import HistoryDrawer from './components/HistoryDrawer';
import { generateLocalEmail, generateGeminiEmail } from './services/emailEngine';

export default function App() {
  // Settings & Storage states
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('emailpro_gemini_key') || '');
  const [sender, setSender] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('emailpro_sender') || '{}');
    } catch {
      return {};
    }
  });
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('emailpro_history') || '[]');
    } catch {
      return [];
    }
  });

  // App functional states
  const [inputText, setInputText] = useState('');
  const [selectedTone, setSelectedTone] = useState('cordial');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Output states
  const [result, setResult] = useState(null);
  const [placeholderValues, setPlaceholderValues] = useState({});
  const [manualEmailText, setManualEmailText] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Modals & Drawers
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Persist Sender Profile
  const handleUpdateSender = (updated) => {
    setSender(updated);
    localStorage.setItem('emailpro_sender', JSON.stringify(updated));
  };

  // Persist API Key
  const handleSaveApiKey = (key) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem('emailpro_gemini_key', key);
    } else {
      localStorage.removeItem('emailpro_gemini_key');
    }
  };

  // Add to History
  const saveToHistory = (item) => {
    const newItem = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...item
    };
    const updated = [newItem, ...history].slice(0, 30);
    setHistory(updated);
    localStorage.setItem('emailpro_history', JSON.stringify(updated));
  };

  // Clear History
  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('emailpro_history');
  };

  // Handle Template Selection
  const handleSelectTemplate = (tpl) => {
    setInputText(tpl.input);
    setSelectedTone(tpl.tone);
    setError(null);
  };

  // Handle Placeholder Change
  const handlePlaceholderChange = (key, value) => {
    setPlaceholderValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Restore from history
  const handleRestore = (item) => {
    setInputText(item.input || '');
    setSelectedTone(item.tone || 'cordial');
    setResult(item);
    setPlaceholderValues({});
    setManualEmailText(null);
    setIsEditing(false);
  };

  // Primary Action: Transform to Professional Email
  const handleTransform = async () => {
    if (!inputText.trim()) {
      setError('Por favor, informe uma mensagem ou rascunho para transformar.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPlaceholderValues({});
    setManualEmailText(null);
    setIsEditing(false);

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
          console.warn('Fallback para motor local:', apiErr);
          outputData = generateLocalEmail({
            input: inputText,
            tone: selectedTone,
            sender
          });
          outputData.warning = outputData.warning 
            ? `${outputData.warning} (Nota: Gerado via motor local offline devido a instabilidade na chave da API).`
            : null;
        }
      } else {
        // Instant Local Engine
        outputData = generateLocalEmail({
          input: inputText,
          tone: selectedTone,
          sender
        });
      }

      setResult(outputData);
      saveToHistory({
        input: inputText,
        tone: selectedTone,
        subject: outputData.subject,
        email: outputData.email,
        warning: outputData.warning,
        fieldsToFill: outputData.fieldsToFill
      });

      // Smooth scroll to output on mobile
      setTimeout(() => {
        const outputElem = document.getElementById('email-output-container');
        if (outputElem) {
          outputElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

    } catch (err) {
      setError(err.message || 'Erro ao processar o email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f12] text-slate-100 selection:bg-[#00f0ff] selection:text-[#0a0f12] relative overflow-hidden">
      
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] ambient-glow-cyan pointer-events-none z-0 opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[500px] ambient-glow-corner pointer-events-none z-0 opacity-50"></div>

      {/* 1. Header / Navbar */}
      <Navbar
        hasApiKey={Boolean(apiKey)}
        openApiKeyModal={() => setIsApiKeyModalOpen(true)}
        openSkillModal={() => setIsSkillModalOpen(true)}
        openHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
      />

      {/* 2. Hero Section */}
      <section className="relative z-10 border-b border-[#1a2732] bg-[#0e161c]/40 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 text-center">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-bold mb-4 shadow-[0_0_12px_rgba(0,240,255,0.25)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Motor Executivo Baseado na Skill: professional-email-writer</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Transforme rascunhos em emails corporativos <span className="text-[#00f0ff] text-glow-cyan">impecáveis</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Redação corporativa one-shot com modulação de tom, preservação factual de 100%, marcadores interativos <code className="text-[#00f0ff] font-mono text-xs font-bold bg-[#00f0ff]/10 px-1.5 py-0.5 rounded border border-[#00f0ff]/20">[...]</code> e matriz de risco proativa.
          </p>

        </div>
      </section>

      {/* 3. Main Workspace Grid */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Quick Templates */}
            <TemplatePicker onSelectTemplate={handleSelectTemplate} />

            {/* Tone Selector */}
            <ToneSelector selectedTone={selectedTone} onSelectTone={setSelectedTone} />

            {/* Input Message Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#00f0ff] flex items-center space-x-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_6px_#00f0ff]"></span>
                  <span>Mensagem informal ou rascunho</span>
                </label>
                <span className="text-xs font-mono text-slate-500">
                  {inputText.length} caracteres
                </span>
              </div>

              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={e => {
                    setInputText(e.target.value);
                    if (error) setError(null);
                  }}
                  rows={6}
                  placeholder="Cole ou digite aqui qualquer rascunho, áudio transcrito ou anotação solta... Ex.: Cobrar a Alpha Comércio que tá com a fatura de 5.200 atrasada tem 20 dias e avisar que vou suspender o suporte se não quitarem até sexta."
                  className="w-full p-4 rounded-xl border border-[#1a2732] bg-[#0b1217] text-white placeholder:text-slate-600 text-sm leading-relaxed focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] focus:shadow-[0_0_18px_rgba(0,240,255,0.25)] transition shadow-inner resize-y"
                />
              </div>
            </div>

            {/* Sender Profile (Signature) */}
            <SenderProfile sender={sender} onUpdateSender={handleUpdateSender} />

            {/* Error message */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/50 text-xs text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.2)]">
                {error}
              </div>
            )}

            {/* Action Button: Transform (Cyan Gradient with Glow) */}
            <button
              type="button"
              onClick={handleTransform}
              disabled={isLoading || !inputText.trim()}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#00f0ff] via-[#00d0e6] to-[#0284c7] hover:from-[#38bdf8] hover:to-[#00f0ff] text-[#0a0f12] font-black text-sm tracking-wide shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.75)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center space-x-2 transition-all transform active:scale-[0.99] cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-[#0a0f12]" />
                  <span>Redigindo com Rigor Corporativo...</span>
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 fill-current" />
                  <span>Transformar em Email Profissional</span>
                  <ArrowRight className="h-4 w-4 stroke-[3]" />
                </>
              )}
            </button>

            {/* Guarantees Box */}
            <div className="pt-2 grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-[#0e161c] border border-[#1a2732] hover:border-[#00f0ff]/30 transition">
                <span className="block text-[11px] font-bold text-[#00f0ff]">One-Shot</span>
                <span className="text-[10px] text-slate-400">1ª Resposta Pronta</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0e161c] border border-[#1a2732] hover:border-[#00f0ff]/30 transition">
                <span className="block text-[11px] font-bold text-[#00f0ff]">Zero Alucinação</span>
                <span className="text-[10px] text-slate-400">Dados Preservados</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0e161c] border border-[#1a2732] hover:border-[#00f0ff]/30 transition">
                <span className="block text-[11px] font-bold text-[#00f0ff]">Anti-Clichê</span>
                <span className="text-[10px] text-slate-400">Tom Humano e Direto</span>
              </div>
            </div>

          </div>

          {/* Right Column: Output / Preview (7 cols) */}
          <div id="email-output-container" className="lg:col-span-7">
            {result ? (
              <EmailOutput
                data={result}
                placeholderValues={placeholderValues}
                onPlaceholderChange={handlePlaceholderChange}
                onManualTextChange={setManualEmailText}
                manualEmailText={manualEmailText}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            ) : (
              <div className="border-2 border-dashed border-[#1a2732] rounded-3xl p-8 sm:p-14 text-center bg-[#0e161c]/60 backdrop-blur-xs space-y-5">
                <div className="h-16 w-16 mx-auto rounded-2xl bg-[#16222b] text-[#00f0ff] border border-[#00f0ff]/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.25)]">
                  <Mail className="h-8 w-8 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Aguardando sua entrada
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
                    Selecione um caso de teste rápido acima ou digite qualquer ideia. O assistente entregará o email formatado no padrão canônico com modulação de tom e alerta de risco.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => handleSelectTemplate({
                      id: 'demo-cobranca',
                      category: 'Financeiro',
                      title: 'Cobrança em Atraso',
                      tone: 'firme',
                      input: 'Preciso cobrar a Alpha Comércio que tá com a fatura de 5.200 reais atrasada tem 20 dias. Fala que se não quitarem até sexta vou suspender o suporte do sistema.'
                    })}
                    className="text-xs font-bold px-3.5 py-2 rounded-xl bg-[#121c24] hover:bg-[#162530] text-[#00f0ff] border border-[#00f0ff]/30 shadow-[0_0_12px_rgba(0,240,255,0.15)] hover:shadow-[0_0_18px_rgba(0,240,255,0.3)] transition cursor-pointer"
                  >
                    ⚡ Testar Caso de Cobrança (Alto Risco)
                  </button>

                  <button
                    onClick={() => handleSelectTemplate({
                      id: 'demo-followup',
                      category: 'Vendas',
                      title: 'Follow-up Comercial',
                      tone: 'cordial',
                      input: 'Mandei a proposta do projeto pro Carlos faz 5 dias e nada. Pergunta se ele conseguiu ver e se quer marcar um call pra tirar dúvidas.'
                    })}
                    className="text-xs font-bold px-3.5 py-2 rounded-xl bg-[#121c24] hover:bg-[#162530] text-slate-200 hover:text-[#00f0ff] border border-[#1a2732] hover:border-[#00f0ff]/40 transition cursor-pointer"
                  >
                    ⚡ Testar Follow-up Comercial
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      </main>

      {/* 4. Footer */}
      <footer className="relative z-10 mt-auto border-t border-[#1a2732] bg-[#0a0f12] py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white">Email<span className="text-[#00f0ff]">Pro</span></span>
            <span>—</span>
            <span>Software Interativo de Página Única da Skill Corporativa</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSkillModalOpen(true)}
              className="text-slate-400 hover:text-[#00f0ff] transition cursor-pointer"
            >
              Arquitetura de Skills (AGENTS.md)
            </button>
            <span>•</span>
            <span className="text-[#00f0ff]">Entrega One-Shot</span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <SkillInfoModal
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
      />

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onRestore={handleRestore}
        onClearHistory={handleClearHistory}
      />

    </div>
  );
}
