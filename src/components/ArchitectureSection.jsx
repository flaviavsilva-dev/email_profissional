import React, { useState } from 'react';
import { Terminal, Copy, Check, FileCode, Layers, Cpu } from 'lucide-react';

export default function ArchitectureSection() {
  const [activeTab, setActiveTab] = useState('skill');
  const [copied, setCopied] = useState(false);

  const skillContent = `---
name: professional-email-writer
description: Transforma mensagens informais, rascunhadas ou confusas em emails profissionais completos prontos para envio, com tom ajustado, marcadores claros para dados ausentes e entrega em resposta única (one-shot).
---

# Professional Email Writer — Instruções de Execução

Você é um redator profissional especializado em comunicação corporativa por email. Sua missão é transformar qualquer mensagem informal, rascunho desestruturado ou solicitação truncada enviada pelo usuário em um email completo, profissional e pronto para envio.

## Princípios Operacionais Fundamentais
1. Entrega One-Shot (Primeira Resposta Completa)
2. Preservação Factual Absoluta (Zero Alucinação)
3. Uso de Marcadores [...] Padronizados
4. Linguagem Natural, Clara e Humana (Anti-Clichê, 80-200 palavras)
5. Idioma Padrão: Português (Brasil)
6. Escopo Textual: Redige o texto com rigor ético corporativo

## Formato Estrito de Saída
[Se Alto Risco:] > ⚠️ **Atenção:** [aviso prévio de conformidade]

**Assunto:** [Linha de assunto direta, concisa e informativa]

**Email:**
[Saudação apropriada ao tom],

[Corpo do email: 1 a 3 parágrafos curtos com contexto, mensagem e CTA.]

[Fechamento respeitoso],
[Seu Nome]
[Seu Cargo / Empresa]

**Campos a preencher:**
- \`[campo 1]\`: instrução objetiva do que preencher`;

  const agentsContent = `# AGENTS.md — Agente Arquiteto de Skills de E-mails Profissionais

Este documento define a especificação completa para o Agente Arquiteto de Skills.

## Pilares Inegociáveis das Skills Geradas
- Pilar 1: Entrega One-Shot (1ª Resposta Completa)
- Pilar 2: Proibição de Dúvidas Soltas ao Usuário
- Pilar 3: Placeholders [...] Padronizados
- Pilar 4: Fidelidade Factual e Zero Alucinação
- Pilar 5: Formato Canônico Estrito
- Pilar 6: Matriz de Risco com Alerta Prévio

## Catálogo de Nichos Derivados:
- professional-email-writer (Geral Corporativo)
- b2b-debt-recovery-email (Cobrança B2B)
- b2b-sales-outreach-email (Vendas & Outbound)
- customer-incident-email (Incidentes & SLA)
- executive-comms-email (C-Level & Board)`;

  const installContent = `# Como Usar esta Skill nos Assistentes de IA

1. Google Antigravity:
   Copie a pasta skills/professional-email-writer/ para seu diretório de skills local (.gemini/antigravity/skills ou no workspace).

2. Claude / Cursor / ChatGPT:
   Copie o texto de SKILL.md diretamente nas "Custom Instructions" ou no arquivo .cursorrules / CLAUDE.md do seu projeto.

3. Execução:
   Envie qualquer rascunho solto e a skill responderá instantaneamente no formato One-Shot canônico.`;

  const getActiveContent = () => {
    if (activeTab === 'skill') return skillContent;
    if (activeTab === 'agents') return agentsContent;
    return installContent;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getActiveContent());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section id="arquitetura" className="py-24 relative bg-[#0a0f12] border-t border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Cpu className="h-3 w-3" />
            <span>MANIFESTO TÉCNICO & CÓDIGO FONTE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Arquitetura Aberta da <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#0099ff] text-glow-cyan">Skill</span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Inspecione as regras executáveis contidas nos arquivos originais do repositório.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-[#0e161c] border border-cyan-500/30 shadow-[0_0_40px_rgba(0,240,255,0.1)] overflow-hidden">
          
          {/* Terminal Title Bar */}
          <div className="px-5 py-3 border-b border-cyan-500/20 bg-[#0a0f12] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs font-mono text-slate-400 ml-2">professional-email-writer</span>
            </div>

            {/* Tabs */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setActiveTab('skill')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeTab === 'skill'
                    ? 'bg-cyan-950/80 text-[#00f0ff] border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                SKILL.md
              </button>
              <button
                onClick={() => setActiveTab('agents')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeTab === 'agents'
                    ? 'bg-cyan-950/80 text-[#00f0ff] border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                AGENTS.md
              </button>
              <button
                onClick={() => setActiveTab('install')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  activeTab === 'install'
                    ? 'bg-cyan-950/80 text-[#00f0ff] border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Como Instalar
              </button>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-[#0e161c] border border-slate-700 hover:border-cyan-500 transition"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-[#00f0ff]" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>

          {/* Code Viewer Body */}
          <pre className="p-6 text-xs sm:text-sm font-mono text-cyan-200/90 overflow-x-auto leading-relaxed max-h-[460px] scrollbar-thin bg-[#070b0e]">
            <code>{getActiveContent()}</code>
          </pre>

        </div>

      </div>
    </section>
  );
}
