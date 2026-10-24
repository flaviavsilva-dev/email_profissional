# SKILL — E-mails Profissionais ✉️

Repositório aberto de **Arquitetura de Agentes e Skills Especializadas em Redação e Transformação de E-mails Corporativos**.

Este projeto contém a especificação mestre do **Agente Arquiteto de Skills** ([`AGENTS.md`](AGENTS.md)) e implementações de skills modulares e reutilizáveis prontas para assistentes de IA (como Antigravity, Claude, ChatGPT e Copilot).

---

## 📂 Estrutura do Repositório

```text
.
├── AGENTS.md               # Manifesto mestre do Agente Arquiteto de Skills de E-mail
├── .gitignore              # Filtros de arquivos de ambiente e temporários
├── README.md               # Documentação principal do repositório
└── skills/                 # Catálogo de skills modulares
    └── professional-email-writer/
        ├── SKILL.md        # Instrução executável com frontmatter YAML
        ├── README.md       # Documentação bilíngue da skill (PT/EN)
        └── examples/       # Exemplos de entradas informais e emails polidos
            ├── cobranca-vencida.md
            └── follow-up-proposta.md
```

---

## 🎯 Pilares Inegociáveis das Skills

Todas as skills geradas e mantidas neste repositório seguem 6 pilares de qualidade:

1. **Entrega One-Shot:** Entrega o email completo logo na primeira interação, mesmo a partir de uma frase solta.
2. **Proibição de Perguntas Soltas:** O assistente nunca devolve apenas questionamentos; lacunas são preenchidas por marcadores `[...]`.
3. **Mecanismo de Placeholders:** Informações ausentes são delimitadas em colchetes e catalogadas na seção `**Campos a preencher:**`.
4. **Fidelidade Factual (Anti-Alucinação):** Datas, valores em R$, números de contrato e nomes fornecidos são rigorosamente preservados.
5. **Formato Canônico Estrito:**
   - `**Assunto:**` [Linha direta e objetiva]
   - `**Email:**` [Saudação, corpo em 1 a 3 parágrafos e fechamento]
   - `**Campos a preencher:**` [Lista de campos pendentes]
6. **Sinalização Proativa de Riscos:** Inclusão de nota prévia (`> ⚠️ Atenção: ...`) para temas sensíveis (cobranças em mora, rescisões ou litígios).

---

## 🚀 Como Utilizar

### 1. Usando a Skill Direta (`professional-email-writer`)
Copie o conteúdo de [`skills/professional-email-writer/SKILL.md`](skills/professional-email-writer/SKILL.md) para as instruções do seu assistente de IA ou adicione à sua pasta de skills local.

### 2. Usando o Agente Arquiteto (`AGENTS.md`)
O arquivo [`AGENTS.md`](AGENTS.md) atua como as instruções de sistema para um agente de IA projetar novas skills de e-mail específicas para a sua organização (ex.: cobrança B2B, vendas outbound, comunicação executiva com C-Level).

---

## 🛠️ Convenções de Contribuição

Para propor novas skills:
- Utilize nomes em inglês no formato `kebab-case` dentro da pasta `skills/<nome-da-skill>/`.
- Forneça documentação bilíngue no `README.md` da skill.
- Adicione ao menos 2 casos de teste práticos na subpasta `examples/`.

---

## 📄 Licença
Distribuído sob a licença MIT. Consulte `LICENSE` para mais detalhes.
