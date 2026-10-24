# EmailPro — Redator Corporativo Cyber-Executivo ✉️⚡

Software interativo de página única que transforma anotações, rascunhos e mensagens informais em emails corporativos de alta precisão prontos para envio.

Baseado integralmente nas especificações e pilares da **Skill Oficial `professional-email-writer`** (localizada em `skills/professional-email-writer/`).

---

## 🚀 Demonstração & Recursos

- **Entrega One-Shot (1ª Resposta Pronta):** Gera o email completo e polido de forma instantânea.
- **Fidelidade Factual Absoluta:** Preserva rigorosamente valores monetários, nomes, prazos e condições citadas.
- **Marcadores Interativos `[...]`:** Substituição de dados ausentes em tempo real através de formulário dinâmico.
- **Modulação de Tom:** 6 posturas corporativas (Cordial & Direto, Formal & Protocolar, Firme & Respeitoso, Comercial & Consultivo, Transparente & Resolutivo, Executivo C-Level).
- **Matriz de Risco Contratual (Pilar 6):** Alerta prévio automático (`⚠️ Atenção`) para temas sensíveis (cobrança, rescisão, SLA).
- **Auditoria Anti-Clichê:** Garante textos concisos (80–200 palavras) livres de jargões burocráticos (*"venho por meio desta"*).
- **Ações Rápidas:** Copiar Email, Copiar Assunto, Abrir no Cliente de Email (`mailto:`), Baixar `.eml` e Histórico local.
- **Motor Híbrido:** Funciona 100% offline nativamente no navegador, com suporte opcional a chave de API Google Gemini 2.5 Flash.

---

## 🎨 Design & Estilo Visual

- **Paleta de Cores:** Fundo escuro em tons de preto e cinza chumbo (`#0a0f12`, `#0e161c`, `#121c24`).
- **Detalhes e Luz Neon:** Azul ciano brilhante (`#00f0ff`) com iluminação ambiente e efeitos de glow.
- **Elementos Interativos:** Botões e cartões em gradiente ciano com sombra luminosa (*glow*) que se intensifica no hover.

---

## 🛠️ Tecnologias Utilizadas

- **React 19**
- **Vite**
- **Tailwind CSS v4**
- **Lucide Icons**
- **Canvas Confetti**

---

## 📦 Como Rodar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/flaviavsilva-dev/email_profissional.git
cd email_profissional
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:3000
```

---

## 🌐 Deploy no Render

Este projeto está pronto para deploy como **Static Site** no Render:

1. Acesse o [Dashboard do Render](https://dashboard.render.com/).
2. Clique em **New** > **Static Site**.
3. Conecte seu repositório: `flaviavsilva-dev/email_profissional`.
4. Configure os campos:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
5. *(Opcional)* Se usar Blueprint, o Render lerá o arquivo `render.yaml` automaticamente.

---

## 📄 Licença
Distribuído sob a licença MIT.
