export const TEMPLATES = [
  {
    id: 'cobranca-risco',
    category: 'Financeiro',
    title: 'Cobrança em Atraso (com Risco de Suspensão)',
    description: 'Notificação firme de fatura vencida com prazo final e alerta prévio contratual.',
    tone: 'firme',
    input: 'Preciso cobrar a Alpha Comércio que tá com a fatura de 5.200 reais atrasada tem 20 dias. Fala que se não quitarem até sexta vou suspender o suporte do sistema.',
    tags: ['Alto Risco', 'Financeiro', 'B2B']
  },
  {
    id: 'followup-proposta',
    category: 'Vendas',
    title: 'Follow-up de Proposta Comercial',
    description: 'Contato cordial para checar análise de proposta e oferecer call de 15 minutos.',
    tone: 'cordial',
    input: 'Mandei a proposta do projeto pro Carlos faz 5 dias e nada. Pergunta se ele conseguiu ver e se quer marcar um call pra tirar dúvidas.',
    tags: ['Comercial', 'Follow-up', 'Parcerias']
  },
  {
    id: 'prorrogacao-prazo',
    category: 'Projetos',
    title: 'Alinhamento de Prazo / Entrega',
    description: 'Comunicação transparente sobre necessidade de estender a data de entrega técnica.',
    tone: 'cordial',
    input: 'Avisa a diretoria de produto que a integração da API de pagamentos deu um problema de validação no sandbox e vamos precisar de mais 3 dias úteis pra homologar antes de subir pra produção.',
    tags: ['Operações', 'Transparente']
  },
  {
    id: 'incidente-sla',
    category: 'Suporte & SLA',
    title: 'Notificação de Incidente Crítico (Queda de Serviço)',
    description: 'Aviso urgente e transparente sobre instabilidade com plano de mitigação.',
    tone: 'resolutivo',
    input: 'O servidor de banco de dados caiu às 14:15 afetando os clientes do plano Enterprise. Nossa engenharia já subiu o failover às 14:42 e agora tá tudo estabilizado. Manda email pedindo desculpas e explicando o post-mortem.',
    tags: ['Alto Risco', 'SLA', 'Técnico']
  },
  {
    id: 'reuniao-c-level',
    category: 'Executivo',
    title: 'Solicitação de Pauta Executiva / C-Level',
    description: 'Email sintético e direto ao ponto para alinhamento estratégico com diretoria.',
    tone: 'formal',
    input: 'Preciso falar com a Dra. Helena sobre o orçamento Q3 de dados. Precisa de 20 min antes do comitê de quinta-feira pra validar os números do ROI.',
    tags: ['Executivo', 'Formal', 'Diretoria']
  },
  {
    id: 'rescisao-aviso',
    category: 'Jurídico / Contratos',
    title: 'Encerramento de Prestação de Serviços',
    description: 'Notificação formal de encerramento amigável de contrato com transição.',
    tone: 'firme',
    input: 'Notificar o fornecedor Nexus Tech que vamos rescindir o contrato de consultoria a partir do final do mês que vem conforme a cláusula 8 do aviso prévio de 30 dias. Agradece o trabalho e pede o plano de transição de senhas e acessos.',
    tags: ['Alto Risco', 'Contratual', 'Jurídico']
  }
];

export const TONES = [
  {
    id: 'cordial',
    name: 'Cordial & Direto',
    subtitle: 'Para colegas de equipe, pares de trabalho diário e parceiros habituais',
    badge: 'Uso Diário',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
    icon: 'MessageSquareSmile'
  },
  {
    id: 'formal',
    name: 'Formal & Protocolar',
    subtitle: 'Para diretoria, clientes estratégicos, órgãos públicos e auditores',
    badge: 'Institucional',
    badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300',
    icon: 'Briefcase'
  },
  {
    id: 'firme',
    name: 'Firme & Respeitoso',
    subtitle: 'Para cobranças em atraso, notificações contratuais e prazos rompidos',
    badge: 'Alta Assertividade',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    icon: 'ShieldAlert'
  },
  {
    id: 'consultivo',
    name: 'Consultivo & Comercial',
    subtitle: 'Para prospecção outbound, vendas, follow-ups e negociações de valor',
    badge: 'Vendas B2B',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
    icon: 'TrendingUp'
  },
  {
    id: 'resolutivo',
    name: 'Transparente & Resolutivo',
    subtitle: 'Para resposta a incidentes críticos, quebras de SLA e desculpas formais',
    badge: 'Mitigação',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
    icon: 'Flame'
  },
  {
    id: 'executivo',
    name: 'Executivo C-Level',
    subtitle: 'Ultra-sintético, data-driven, focado em impacto, ROI e decisões rápidas',
    badge: 'Board & C-Suite',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300',
    icon: 'Crown'
  }
];

