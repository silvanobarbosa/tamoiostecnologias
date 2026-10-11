# Regras técnicas do projeto

- Todo acesso a dados do site passa pela ponte `/api/db` (`api/db.ts`) no deploy Vercel; nada usa o cliente Supabase direto. O `src/integrations/supabase/client.ts` é um shim sobre `/api/db` — não restaurar o acesso direto ao banco.
- Toda tabela nova precisa entrar em `COLS` e, se aceita do público, em `INSERT_PUBLIC`/`READ_PUBLIC` em `api/db.ts`; colunas fora da whitelist são descartadas silenciosamente no insert.
- Formulários que coletam dados pessoais exigem checkbox de consentimento LGPD com link para `/politica-de-privacidade`, e o insert precisa gravar `consent_at` + `consent_version` (validado no endpoint, testado em `src/test/api-representative-lgpd.test.ts`).
- O preview local do Vite não serve `/api` (404): testes de endpoint rodam via vitest com o handler direto, não via HTTP no preview.
- Imagens do site ficam como arquivos em src/assets (importadas pelo bundler), nunca como ponteiros .asset.json/CDN /__l5e: o deploy Vercel não serve essa CDN e a imagem quebra.
- Keep identity-guide content in a shared data module consumed by the guide page and document generation; this prevents copy and specification drift between formats.
- Serve downloadable identity documents as static public files; this keeps downloads independent of the data bridge and compatible with Vercel.
- Keep presentation layouts in a single fixed-resolution element registry shared by the native slides editor and PPTX generation; this keeps editable exports aligned with the browser presentation.
