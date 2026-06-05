# Plano de execução — sequência aprovada

Vamos entregar **um item por vez**, na ordem que você definiu. A cada conclusão, eu aviso e sigo para o próximo.

---

## 1️⃣ Calculadora de Impacto (item #2)

**Onde:** componente reutilizável na home (seção nova entre "Produtos" e "Cases") + versão compacta nas páginas de produto (Bandejas FLV, Calços, Agro).

**O que faz:**
- Input: tipo de produto + volume mensal (slider + número).
- Output animado: kg de plástico/isopor evitado, CO₂e economizado, equivalência (árvores plantadas / km de carro / casas/mês).
- CTA: "Quero esse impacto no meu negócio" → abre formulário de contato pré-preenchido com o cálculo no campo mensagem.

**Técnico:** componente `<ImpactCalculator />`, fatores de conversão em `src/lib/impact.ts` (baseados em LCA pública: EPS ~3.0 kg CO₂e/kg, polpa moldada ~0.8 kg CO₂e/kg). Sem backend — puro frontend. i18n PT/EN.

---

## 2️⃣ Série de 5 posts de blog (item #4)

Crio 5 posts completos diretamente na tabela `posts` do admin, com:
1. **"A história da Dona Angela"** — origem da Tamoios.
2. **"Por que polpa moldada vence o isopor"** — comparativo técnico + ambiental.
3. **"Como o Carrefour reduziu plástico com a Tamoios"** — case longo.
4. **"ENEC explicada em 5 minutos"** — política nacional.
5. **"O ciclo da biomassa: do papelão à bandeja"** — economia circular.

Cada post: 800-1200 palavras, capa gerada por IA, slug otimizado, meta description, tags. Status `published`.

---

## 3️⃣ Press Kit `/imprensa` (item #6)

Nova página com:
- Bio curta + bio expandida (copy & paste).
- Fatos rápidos (fundação, sede, capacidade, clientes-âncora).
- Logos para download (SVG, PNG horizontal, PNG vertical, monocromático).
- Fotos hi-res (placeholders — você manda depois ou eu gero IA).
- Contato dedicado de imprensa (email + WhatsApp).
- Botão "Baixar press kit completo (.zip)".

Adiciona link no footer e no header (sob "Materiais").

---

## 4️⃣ Página de Cases `/cases` (item #7)

Página dedicada com storytelling longo:
- Hero com métricas agregadas (X clientes, Y toneladas evitadas).
- Cards de cases: Carrefour, Belterra, Agroadubo, BNDES, Quintessa.
- Cada card → página de detalhe `/cases/:slug` com: desafio, solução, resultado, depoimento, foto.
- Link "Ver case completo" nos PDFs já em `/materiais`.

Tabela `cases` no backend? **Não.** Conteúdo estático em arquivo `.ts` (mais rápido, sem CRUD necessário agora).

---

## 5️⃣ Animações framer-motion (item #12)

Polimento final em toda a UI:
- **Hero da home:** fade+rise em sequência (badge → título → subtítulo → CTAs).
- **Seções:** `whileInView` com stagger nos cards de produto, cases, números.
- **Calculadora:** números animados (count-up) ao recalcular.
- **Páginas internas:** transição suave entre rotas.
- **Botões:** hover-lift sutil nos primários.

Sem exagero — Apple-like, não circo.

---

## Como vamos rodar

Respondo cada etapa com:
- Arquivos criados/editados
- Print/preview rápido do resultado
- "Pronto para seguir para o próximo?"

Se quiser ajustar algo no meio, é só falar — não preciso terminar tudo pra iterar.

**Posso começar pelo #1 (Calculadora de Impacto)?**
