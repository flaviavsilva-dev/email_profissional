# Professional Email Writer Skill

[Português](#versão-em-português) | [English](#english-version)

---

## Versão em Português

### 1. Visão Geral
A skill `professional-email-writer` é um componente reutilizável para assistentes de IA projetado para transformar mensagens informais, rascunhos rápidos ou anotações truncadas em emails corporativos completos, humanos e prontos para envio.

### 2. Entradas Aceitas
- Frases soltas ou comandos diretos (ex.: *"avisa o cliente que o boleto vence amanhã"*).
- Rascunhos informais ou com pontuação desestruturada.
- Textos longos de briefing ou relatos de reunião com pedidos de alinhamento.

### 3. Estrutura de Saída Estrita
Toda resposta segue o formato canônico:
- `**Assunto:**` linha de assunto concisa e objetiva.
- `**Email:**` saudação adequada ao tom, corpo em 1 a 3 parágrafos e fechamento com assinatura.
- `**Campos a preencher:**` lista curta dos marcadores `[...]` identificados (omitida se não houver marcadores).

### 4. Matriz de Casos de Uso
| Situação | Nível de Risco | Ação |
| :--- | :--- | :--- |
| Pedidos simples, follow-up, agradecimentos | Baixo / Rotina | Entrega direta do email |
| Cobranças vencidas, rescisões, notificações | Alto / Crítico | Alerta prévio (`⚠️ Atenção: ...`) antes do assunto |

### 5. Limitações e Escopo
- Não envia emails nem interage diretamente com caixas postais.
- Não oferece assessoria jurídica ou contratual.
- Não inventa dados, valores ou prazos inexistentes.

---

## English Version

### 1. Overview
The `professional-email-writer` skill is a reusable AI assistant component designed to transform informal messages, quick drafts, or unstructured notes into complete, human, and send-ready corporate emails.

### 2. Accepted Inputs
- Single phrases or direct instructions (e.g., *"remind the client invoice is due tomorrow"*).
- Raw or conversational bullet points.
- Detailed meeting notes or briefing contexts requiring follow-up.

### 3. Strict Output Structure
Every generated email follows the canonical format:
- `**Assunto:**` clear, concise subject line.
- `**Email:**` appropriate greeting, 1 to 3 paragraph body, professional closing and signature.
- `**Campos a preencher:**` list of missing fields enclosed in `[...]` (omitted if none).

### 4. Use Case Matrix
| Scenario | Risk Level | Action |
| :--- | :--- | :--- |
| Simple requests, routine follow-ups, thank-yous | Low / Routine | Direct email delivery |
| Overdue collections, terminations, formal disputes | High / Critical | Safety disclaimer (`⚠️ Atenção: ...`) before the subject |

### 5. Scope & Limitations
- Does not send emails or access inboxes.
- Does not provide legal or financial counsel.
- Never hallucinates dates, amounts, or terms.
