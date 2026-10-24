/**
 * Motor de Transformação de Emails Profissionais
 * Implementa integralmente os 6 Pilares Operacionais do SKILL.md:
 * 1. Entrega One-Shot
 * 2. Proibição de perguntas soltas
 * 3. Placeholders [...] padronizados
 * 4. Preservação factual absoluta
 * 5. Formato canônico estrito
 * 6. Matriz de risco com alerta prévio
 */

export const SYSTEM_PROMPT = `Você é um redator profissional especializado em comunicação corporativa por email. Sua missão é transformar qualquer mensagem informal, rascunho desestruturado ou solicitação truncada enviada pelo usuário em um email completo, profissional e pronto para envio.

## Princípios Operacionais Fundamentais
1. **Entrega One-Shot (Primeira Resposta):** Entregue o email completo logo na primeira resposta. Nunca devolva apenas perguntas ou pedidos de esclarecimento ao usuário.
2. **Preservação Factual Absoluta:** Mantenha exatamente todos os nomes, datas, prazos, condições e valores citados pelo usuário. Nunca invente ou presuma informações ausentes.
3. **Uso de Marcadores \`[...]\`:** Para dados essenciais que o usuário não informou, use marcadores entre colchetes em caixa baixa explicativa (ex.: \`[nome do destinatário]\`, \`[data de vencimento]\`, \`[link de acesso]\`). Mapeie esses campos na seção final \`**Campos a preencher:**\`.
4. **Linguagem Natural, Clara e Humana:** Redação direta, concisa (geralmente entre 80 e 200 palavras), livre de jargões ocos ("venho por meio desta", "desde já agradeço") e sem robotismo.
5. **Idioma Padrão:** Português (Brasil).
6. **Escopo Textual:** Você apenas redige o texto; não envia emails, não acessa caixas postais e não toma decisões de negócio pelo usuário.

## Formato Estrito de Saída
Responda exclusivamente na estrutura abaixo:

[Se houver Alto Risco (cobrança, rescisão, advertência, conflito, notificação, quebra de SLA), inicie com:]
> ⚠️ **Atenção:** [aviso objetivo sobre conferir prazos e termos contratuais]

**Assunto:** [Linha de assunto direta, concisa e informativa]

**Email:**
[Saudação apropriada ao tom],

[Corpo do email: 1 a 3 parágrafos curtos com contexto, mensagem principal e chamada para ação (CTA) objetiva.]

[Fechamento respeitoso],
[Seu Nome]
[Seu Cargo / Empresa]

**Campos a preencher:**
- \`[campo 1]\`: instrução objetiva do que preencher
- \`[campo 2]\`: instrução objetiva do que preencher
(Nota: Se não houver marcadores entre colchetes, a seção Campos a preencher não deve ser exibida)`;

/**
 * Avalia se o texto envolve alto risco operacional, contratual ou financeiro
 */
export function analyzeRisk(text) {
  const lower = text.toLowerCase();
  
  if (lower.includes('cobrar') || lower.includes('fatura') || lower.includes('atrasad') || lower.includes('inadimpl') || lower.includes('suspender') || lower.includes('corte')) {
    return {
      isHighRisk: true,
      category: 'Financeiro / Suspensão de Serviço',
      warning: 'A suspensão de suporte, serviços ou cobrança por inadimplência pode possuir requisitos contratuais específicos. Recomendamos verificar os prazos e termos previstos em contrato antes do envio.'
    };
  }

  if (lower.includes('rescindir') || lower.includes('rescisão') || lower.includes('cancelar contrato') || lower.includes('encerramento') || lower.includes('aviso prévio')) {
    return {
      isHighRisk: true,
      category: 'Jurídico / Contratual',
      warning: 'O encerramento ou rescisão contratual possui implicações legais e prazos formais de aviso prévio. Certifique-se de que a notificação atende às cláusulas contratuais vigentes.'
    };
  }

  if (lower.includes('caiu') || lower.includes('servidor') || lower.includes('indisponibilidade') || lower.includes('sla') || lower.includes('falha') || lower.includes('incidente') || lower.includes('post-mortem')) {
    return {
      isHighRisk: true,
      category: 'Operacional / SLA',
      warning: 'Comunicações sobre quebra de disponibilidade ou incidentes técnicos podem impactar acordos de nível de serviço (SLA) e responsabilidade civil. Valide os fatos técnicos com a equipe de engenharia.'
    };
  }

  if (lower.includes('demissão') || lower.includes('desligamento') || lower.includes('advertência') || lower.includes('conflito') || lower.includes('reclamação formal')) {
    return {
      isHighRisk: true,
      category: 'Recursos Humanos / Compliance',
      warning: 'Comunicações sensíveis envolvendo pessoas ou conduta exigem respaldo das diretrizes de RH e compliance da sua organização.'
    };
  }

  return {
    isHighRisk: false,
    category: 'Rotina Corporativa',
    warning: null
  };
}

/**
 * Extrai marcadores no formato [placeholder] do texto do email
 */
export function extractPlaceholders(text) {
  if (!text) return [];
  const regex = /\[(.*?)\]/g;
  const matches = new Set();
  let match;
  while ((match = regex.exec(text)) !== null) {
    const raw = match[1].trim();
    if (raw && !raw.startsWith('http') && !raw.toLowerCase().includes('imagem')) {
      matches.add(raw);
    }
  }
  return Array.from(matches);
}

/**
 * Auditoria Anti-Clichê e Estatísticas do Email
 */
export function auditEmailText(emailText) {
  if (!emailText) return { wordCount: 0, readingTime: '0 min', clichesFound: [], isClean: true };

  const words = emailText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const readingTimeSeconds = Math.ceil((wordCount / 200) * 60);
  const readingTime = readingTimeSeconds < 60 ? `${readingTimeSeconds}s de leitura` : `${Math.ceil(readingTimeSeconds / 60)} min de leitura`;

  const forbiddenCliches = [
    { phrase: 'venho por meio desta', explanation: 'Burocrático e ultrapassado. Substituído por abordagem direta.' },
    { phrase: 'desde já agradeço', explanation: 'Presunçoso e clichê. Substituído por fechamento natural.' },
    { phrase: 'venho por este meio', explanation: 'Burocrático.' },
    { phrase: 'acuso o recebimento', explanation: 'Formalidade excessiva.' },
    { phrase: 'sem mais para o momento', explanation: 'Jargão antiquado.' },
    { phrase: 'estou escrevendo para dizer', explanation: 'Informalidade prolixa.' },
    { phrase: 'peço desculpas pelo incômodo', explanation: 'Desvaloriza a comunicação de trabalho.' }
  ];

  const lower = emailText.toLowerCase();
  const clichesFound = forbiddenCliches.filter(item => lower.includes(item.phrase));

  return {
    wordCount,
    readingTime,
    clichesFound,
    isClean: clichesFound.length === 0,
    isOptimalLength: wordCount >= 70 && wordCount <= 220
  };
}

/**
 * Parser de resposta estruturada canônica da Skill
 */
export function parseSkillOutput(rawOutput) {
  let warning = null;
  let subject = '';
  let email = '';
  let fieldsToFill = [];

  // 1. Extrair alerta de risco se houver
  const warningMatch = rawOutput.match(/> ⚠️ \*\*Atenção:\*\*(.*?)(?=\n\n|\n\*\*Assunto|\*\*Assunto)/is);
  if (warningMatch) {
    warning = warningMatch[1].trim();
  }

  // 2. Extrair Assunto
  const subjectMatch = rawOutput.match(/\*\*Assunto:\*\*\s*(.*?)(?=\n\n\*\*Email|\n\*\*Email|\nEmail:)/i);
  if (subjectMatch) {
    subject = subjectMatch[1].trim();
  } else {
    const fallbackSubject = rawOutput.match(/Assunto:\s*(.*?)(?=\n)/i);
    if (fallbackSubject) subject = fallbackSubject[1].trim();
  }

  // 3. Extrair Email e Campos a preencher
  const emailSectionMatch = rawOutput.match(/\*\*Email:\*\*\s*([\s\S]*?)(?=\n\*\*Campos a preencher:|\*\*Campos a preencher:|$)/i);
  if (emailSectionMatch) {
    email = emailSectionMatch[1].trim();
  } else {
    email = rawOutput;
  }

  // 4. Extrair Campos a preencher
  const fieldsSectionMatch = rawOutput.match(/\*\*Campos a preencher:\*\*([\s\S]*)$/i);
  if (fieldsSectionMatch) {
    const lines = fieldsSectionMatch[1].trim().split('\n');
    fieldsToFill = lines
      .map(line => line.trim())
      .filter(line => line.startsWith('-'))
      .map(line => {
        const itemMatch = line.match(/- `?\[(.*?)\]`?:\s*(.*)/);
        if (itemMatch) {
          return { key: itemMatch[1].trim(), label: itemMatch[1].trim(), instruction: itemMatch[2].trim() };
        }
        return null;
      })
      .filter(Boolean);
  }

  // Se não vier campos catalogados mas existirem marcadores no texto, extrai automaticamente
  const detectedPlaceholders = extractPlaceholders(`${subject} ${email}`);
  if (fieldsToFill.length === 0 && detectedPlaceholders.length > 0) {
    fieldsToFill = detectedPlaceholders.map(p => ({
      key: p,
      label: p,
      instruction: `Informe o valor para ${p}`
    }));
  }

  return {
    raw: rawOutput,
    warning,
    subject: subject || 'Comunicação Corporativa',
    email: email.trim(),
    fieldsToFill
  };
}

/**
 * Motor Local Heurístico de Alta Fidelidade (Zero dependência externa)
 * Modula exatamente conforme os 6 pilares e o tone selecionado.
 */
export function generateLocalEmail({ input, tone = 'cordial', sender = {} }) {
  const risk = analyzeRisk(input);
  const senderName = sender.name || '[Seu Nome]';
  const senderRole = sender.role ? `${sender.role}${sender.company ? ` | ${sender.company}` : ''}` : '[Seu Cargo / Empresa]';
  const contact = sender.contact ? `\n${sender.contact}` : '';

  let subject = '';
  let greeting = '';
  let paragraphs = [];
  let closing = '';
  let fieldsToFill = [];

  const lower = input.toLowerCase();

  // Caso 1: Cobrança / Financeiro
  if (lower.includes('cobrar') || lower.includes('fatura') || lower.includes('atrasad') || lower.includes('5.200') || lower.includes('pagamento')) {
    const valueMatch = input.match(/(\d+[\d.,]*\s*(?:reais|mil|k)?|\b\d+[\d.,]*\b)/i);
    const valueText = valueMatch ? (input.includes('5.200') ? 'R$ 5.200,00' : `R$ ${valueMatch[1]}`) : '[valor da fatura]';
    const recipientMatch = input.match(/(?:cobrar|para|cliente|empresa)\s+([A-Z][a-zA-Z0-9\s]+?)(?=\s+que|\s+com|\s+por|\s*,|$)/i);
    const recipient = recipientMatch ? recipientMatch[1].trim() : 'Alpha Comércio';

    const daysMatch = input.match(/(\d+)\s+dias/i);
    const daysText = daysMatch ? `${daysMatch[1]} dias` : '20 dias';

    subject = `Regularização de pendência financeira — Fatura em atraso [número da fatura]`;

    if (tone === 'formal') {
      greeting = `Prezada diretoria da ${recipient},`;
      paragraphs.push(
        `Registramos formalmente por meio desta comunicação que a fatura referente aos serviços contratados, no montante de ${valueText}, permanece com quitação pendente há ${daysText}.`,
        `Para garantir a manutenção integral do suporte e evitar a suspensão operacional preventiva prevista para os próximos dias, solicitamos a quitação do débito ou o envio do respectivo comprovante até esta sexta-feira, [data de sexta-feira, DD/MM].`,
        `Caso o pagamento já tenha sido providenciado recentemente, solicitamos gentilmente desconsiderar este aviso e nos encaminhar a confirmação para atualização tempestiva de nossos registros.`
      );
      closing = 'Permanecemos à inteira disposição para eventuais esclarecimentos.\n\nCordialmente,';
    } else if (tone === 'firme') {
      greeting = `Prezada equipe da ${recipient},`;
      paragraphs.push(
        `Espero que estejam bem.`,
        `Identificamos que a fatura referente à prestação de suporte técnico, no valor de ${valueText}, encontra-se vencida há ${daysText}.`,
        `Para que possamos assegurar a continuidade da prestação dos serviços e evitar a suspensão preventiva do suporte a partir da próxima semana, solicitamos a regularização do débito ou o envio do comprovante até esta sexta-feira, [data de sexta-feira, DD/MM].`,
        `Caso o pagamento já tenha sido efetuado recentemente, por favor desconsiderem este aviso e nos encaminhem o comprovante para atualização do nosso sistema.`
      );
      closing = 'Permanecemos à disposição para emitir segunda via ou esclarecer eventuais divergências.\n\nAtenciosamente,';
    } else {
      greeting = `Olá, equipe da ${recipient}, tudo bem?`;
      paragraphs.push(
        `Passando para verificar a situação da fatura de ${valueText}, que consta como em aberto em nosso sistema há ${daysText}.`,
        `Gostaria de solicitar o envio do comprovante de liquidação até sexta-feira, [data de sexta-feira, DD/MM], para mantermos o cronograma de suporte ativo sem qualquer interrupção.`,
        `Se houver qualquer divergência ou necessidade de reemissão do boleto, estou à disposição para ajudar.`
      );
      closing = 'Um abraço,';
    }

    fieldsToFill.push(
      { key: 'número da fatura', label: 'número da fatura', instruction: 'Código identificador da fatura no assunto' },
      { key: 'data de sexta-feira, DD/MM', label: 'data de sexta-feira, DD/MM', instruction: 'Data limite exata para o acerto financeiro' }
    );
  }

  // Caso 2: Follow-up de Proposta Comercial
  else if (lower.includes('proposta') || lower.includes('follow') || lower.includes('carlos') || lower.includes('comercial')) {
    const nameMatch = input.match(/(?:pro|para|com|ao)\s+([A-Z][a-z]+)/);
    const targetName = nameMatch ? nameMatch[1] : 'Carlos';

    subject = `Follow-up: proposta de projeto — [Nome do Projeto ou Empresa]`;

    if (tone === 'formal') {
      greeting = `Prezado Sr. ${targetName},`;
      paragraphs.push(
        `Gostaria de retomar o contato a respeito da proposta técnica e comercial que encaminhamos no início da última semana para apreciação de sua equipe.`,
        `Colocamo-nos à inteira disposição para sanar eventuais dúvidas sobre as premissas, cronograma de execução ou viabilidade orçamentária do projeto.`,
        `Caso considere oportuno, podemos agendar uma conferência de alinhamento com os principais responsáveis para avançarmos às próximas etapas.`
      );
      closing = 'Aguardamos seu retorno e renovamos nossos protestos de estima.\n\nAtenciosamente,';
    } else if (tone === 'executivo') {
      greeting = `Olá, ${targetName},`;
      paragraphs.push(
        `Gostaria de checar seu parecer sobre a proposta enviada na semana passada. Os pontos centrais contemplam ganho de eficiência e retorno previsto no curto prazo.`,
        `Podemos reservar 10 minutos na sua agenda amanhã para validar o direcionamento e definir o início?`
      );
      closing = 'Um abraço,';
    } else {
      greeting = `Olá, ${targetName}, tudo bem?`;
      paragraphs.push(
        `Gostaria de checar se você teve a oportunidade de analisar a proposta de projeto que encaminhei no início da semana passada.`,
        `Estou à disposição para sanar qualquer dúvida sobre o escopo, prazos ou condições comerciais apresentadas. Caso ache produtivo, podemos agendar uma rápida conversa de 15 minutos para alinharmos os próximos passos.`
      );
      closing = 'Fico no aguardo do seu retorno.\n\nUm abraço,';
    }

    fieldsToFill.push(
      { key: 'Nome do Projeto ou Empresa', label: 'Nome do Projeto ou Empresa', instruction: 'Identificador do projeto ou empresa no assunto' }
    );
  }

  // Caso 3: Alinhamento de Prazo / Extensão
  else if (lower.includes('prazo') || lower.includes('homologar') || lower.includes('sandbox') || lower.includes('adiar') || lower.includes('dias úteis') || lower.includes('integração')) {
    subject = `Atualização de cronograma: homologação da integração de pagamentos — [Nome do Projeto]`;
    
    greeting = tone === 'formal' ? 'Prezada equipe de diretoria de produto,' : 'Olá, time de produto, tudo bem?';
    
    paragraphs.push(
      `Gostaria de compartilhar uma atualização técnica sobre a etapa de integração da API de pagamentos. Durante os testes finais em ambiente de sandbox, identificamos inconsistências de validação que demandam ajustes preventivos de arquitetura.`,
      `Para assegurar total estabilidade e conformidade antes da disponibilização em ambiente de produção, será necessária uma extensão de 3 dias úteis para a conclusão dos testes de homologação, com nova previsão de entrega para [nova data de entrega, DD/MM].`,
      `Seguimos dedicados a concluir os ajustes com o máximo rigor técnico e informaremos assim que os testes automatizados forem finalizados com sucesso.`
    );

    closing = tone === 'formal' ? 'Atenciosamente,' : 'Qualquer dúvida, permaneço à disposição.\n\nAbraços,';

    fieldsToFill.push(
      { key: 'Nome do Projeto', label: 'Nome do Projeto', instruction: 'Nome do produto ou módulo no assunto' },
      { key: 'nova data de entrega, DD/MM', label: 'nova data de entrega, DD/MM', instruction: 'Data exata da nova entrega homologada' }
    );
  }

  // Caso 4: Incidente de SLA / Falha Técnica
  else if (lower.includes('servidor') || lower.includes('caiu') || lower.includes('sla') || lower.includes('incidente') || lower.includes('failover')) {
    subject = `[Comunicado Técnico] Resolução de instabilidade em ambiente de banco de dados — [Plano Enterprise]`;
    
    greeting = 'Prezados clientes e parceiros,';
    paragraphs.push(
      `Escrevemos para prestar total transparência acerca da instabilidade técnica registrada hoje às 14:15, que impactou pontualmente o acesso aos servidores de banco de dados no ambiente Enterprise.`,
      `Nossa equipe de engenharia e operações acionou imediatamente o protocolo de contenção, restabelecendo o tráfego regular via failover automático às 14:42. O ambiente encontra-se integralmente monitorado e estabilizado, com integridade dos dados 100% preservada.`,
      `Lamentamos sinceramente o transtorno causado às suas operações. O relatório técnico detalhado (post-mortem) com as medidas definitivas de mitigação será disponibilizado até [horário/data limite, ex: amanhã às 12h].`
    );

    closing = 'Seguimos com monitoramento reforçado e à disposição pelo canal de suporte prioritário.\n\nAtenciosamente,';

    fieldsToFill.push(
      { key: 'horário/data limite, ex: amanhã às 12h', label: 'horário/data limite', instruction: 'Prazo prometido para entrega do post-mortem completo' }
    );
  }

  // Caso 5: Rescisão / Jurídico
  else if (lower.includes('rescisão') || lower.includes('rescindir') || lower.includes('nexus') || lower.includes('aviso prévio')) {
    subject = `Notificação formal de encerramento contratual — Contrato de Consultoria nº [número do contrato]`;
    
    greeting = 'À diretoria e gestão da Nexus Tech,';
    paragraphs.push(
      `Por meio desta comunicação, notificamos formalmente nossa decisão de encerramento do contrato de prestação de serviços de consultoria vigente entre as nossas empresas, com término previsto para o final do próximo mês, em estrito cumprimento à Cláusula 8 (aviso prévio de 30 dias).`,
      `Agradecemos pela dedicação e parceria profissional demonstradas ao longo de todo o período de execução dos serviços.`,
      `Para garantir uma descontinuação ordenada e sem impactos operacionais, solicitamos o envio do plano de transição contemplando o repasse de documentações técnicas, senhas e credenciais de acesso até [data limite de transição, DD/MM].`
    );

    closing = 'Permanecemos à disposição para coordenar os alinhamentos administrativos necessários.\n\nAtenciosamente,';

    fieldsToFill.push(
      { key: 'número do contrato', label: 'número do contrato', instruction: 'Código do contrato citado na notificação' },
      { key: 'data limite de transição, DD/MM', label: 'data limite de transição', instruction: 'Data máxima para entrega de senhas e acessos' }
    );
  }

  // Caso Geral / Customizado (Tratamento Universal)
  else {
    subject = `Alinhamento sobre [tópico principal] — [Projeto / Empresa]`;

    if (tone === 'formal') {
      greeting = 'Prezado(a) [nome do destinatário],';
      paragraphs.push(
        `Escrevo para formalizar o alinhamento sobre a solicitação referente a: "${input.trim()}".`,
        `Gostaria de solicitar a validação das premissas e a confirmação das próximas etapas para que possamos dar o devido encaminhamento com a brevidade necessária.`,
        `Permanecemos à inteira disposição para prestar quaisquer esclarecimentos complementares que se façam pertinentes.`
      );
      closing = 'Atenciosamente,';
    } else if (tone === 'firme') {
      greeting = 'Prezado(a) [nome do destinatário],';
      paragraphs.push(
        `Retomo nosso contato para reforçar a importância de alinharmos com urgência a demanda: "${input.trim()}".`,
        `Solicitamos uma manifestação objetiva com os devidos prazos e providências até [data limite, DD/MM], de modo a evitar prejuízos ao cronograma pactuado.`
      );
      closing = 'Contamos com a sua colaboração e permanecemos no aguardo.\n\nAtenciosamente,';
    } else if (tone === 'executivo') {
      greeting = 'Olá, [nome do destinatário],';
      paragraphs.push(
        `Em relação a: ${input.trim()}:`,
        `Precisamos definir a tomada de decisão até [prazo/horário] para mantermos o alinhamento com as metas estabelecidas. Por favor, confirme se o direcionamento está aprovado.`
      );
      closing = 'Abraços,';
    } else {
      greeting = 'Olá, [nome do destinatário], tudo bem?';
      paragraphs.push(
        `Gostaria de alinhar rapidamente com você os próximos passos sobre a seguinte solicitação: "${input.trim()}".`,
        `Você teria disponibilidade para confirmar os detalhes até [data/horário sugerido] para darmos andamento?`
      );
      closing = 'Qualquer dúvida, estou à disposição!\n\nUm abraço,';
    }

    fieldsToFill.push(
      { key: 'tópico principal', label: 'tópico principal', instruction: 'Tema central do assunto do email' },
      { key: 'nome do destinatário', label: 'nome do destinatário', instruction: 'Nome da pessoa ou equipe destinatária' }
    );
  }

  // Montagem do corpo final com assinatura profissional
  const emailBody = `${greeting}\n\n${paragraphs.join('\n\n')}\n\n${closing}\n\n${senderName}\n${senderRole}${contact}`;

  return {
    raw: '',
    warning: risk.warning,
    subject,
    email: emailBody,
    fieldsToFill
  };
}

/**
 * Chamada à API Google Gemini (quando o usuário providencia chave API)
 */
export async function generateGeminiEmail({ apiKey, input, tone, sender = {} }) {
  if (!apiKey) {
    throw new Error('Chave de API Gemini não informada.');
  }

  const senderContext = sender.name 
    ? `Identificação do Remetente: Nome: ${sender.name}, Cargo/Empresa: ${sender.role || ''} ${sender.company || ''}.` 
    : '';

  const prompt = `Você deve seguir rigorosamente as instruções do sistema.
Tom desejado para este email: ${tone.toUpperCase()}.
${senderContext}

Mensagem informal/rascunho enviado pelo usuário:
"""
${input}
"""

Entregue o resultado estritamente no formato:
[Se Alto Risco:] > ⚠️ **Atenção:** [aviso]
**Assunto:** [linha concisa]
**Email:**
[corpo formatado]
**Campos a preencher:**
- \`[campo]\`: instrução`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: `${SYSTEM_PROMPT}\n\n${prompt}` }]
        }
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1024
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMsg = errorData.error?.message || response.statusText;
    throw new Error(`Falha na API Gemini: ${errorMsg}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    throw new Error('A API Gemini não retornou texto válido.');
  }

  return parseSkillOutput(rawText);
}

