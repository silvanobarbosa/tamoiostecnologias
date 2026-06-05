# CMS de páginas + login admin

## Decisões importantes (escopo real)

Suas páginas (Home, Quem Somos, Materiais, Produtos, etc.) são layouts ricos, com várias seções únicas. Transformar tudo em "blocos arrastáveis genéricos" exigiria reescrever o site inteiro como dados, demoraria muito e degradaria o design atual.

**Abordagem proposta — CMS de conteúdo, não de layout:**
- O layout/design das páginas continua igual.
- Para cada página, identificamos os textos, listas, imagens e CTAs que fazem sentido editar.
- Esses pedaços viram "campos" salvos no banco, agrupados por página → seção → chave.
- O painel mostra um formulário por página, com cada campo editável (texto curto, texto longo, imagem, lista de itens, link).
- As páginas leem do banco; se não houver valor salvo, usam o conteúdo atual como padrão (nada quebra durante a transição).
- Isso é prático, escalável, e mantém a estética.

Se depois quiser blocos reordenáveis de verdade (CMS visual estilo Webflow), pode ser uma evolução futura.

## Páginas cobertas no escopo

Home, Quem Somos, Materiais & Portfólio, Bandejas FLV, Calços Técnicos, Agro & Florestal, Cases, Imprensa, Políticas Nacionais. O Blog continua com o editor existente.

## Estrutura técnica

**Tabela `site_content`** (nova):
- `page` (slug da página: `home`, `quem-somos`, etc.)
- `section` (ex: `hero`, `manifesto`, `cta`)
- `key` (ex: `title`, `subtitle`, `bullets`)
- `value_text` (texto/markdown)
- `value_json` (para listas e estruturas)
- `value_image_url` (para imagens)
- `updated_at`, `updated_by`
- RLS: leitura pública; escrita só para admin.

**Hook `useSiteContent(page)`**: carrega todos os campos da página de uma vez e retorna função `t(section, key, fallback)` para os componentes usarem no lugar dos textos hardcoded.

**Painel `/admin/pages`**: lista todas as páginas; ao escolher uma, mostra formulário gerado a partir de um schema (definimos um schema por página listando os campos editáveis e seus tipos). Botões: Salvar, Restaurar padrão, Pré-visualizar.

**Upload de imagens**: reutiliza o bucket `post-images` já existente.

## Login & usuário admin

- Criar novo usuário admin com email/senha que você fornecer pelo formulário seguro (não digite aqui no chat).
- Atribuir o role `admin` (tabela `user_roles` já existe).
- Página de login já existe em `/auth` — adicionar redirect para `/admin` quando o usuário for admin.
- **Link "Entrar"** discreto no rodapé do site, apontando para `/auth`.

## Entregas desta tarefa

1. Migração: tabela `site_content` + RLS + GRANTs + trigger updated_at.
2. Hook `useSiteContent` e função utilitária `t()`.
3. Schema de campos editáveis para cada uma das 9 páginas (definido em código, fácil de expandir).
4. Refatoração das páginas para usar `t(...)` com os textos atuais como fallback (sem mudar visual).
5. Painel `/admin/pages` com lista de páginas e formulário dinâmico por página, incluindo upload de imagem.
6. Atualização do `AdminSidebar` para incluir "Páginas".
7. Link "Entrar" no rodapé.
8. Criação do usuário admin (pedirei email + senha pelo formulário seguro).
9. Redirect pós-login: admin → `/admin`, demais → home.

## O que NÃO está no escopo desta tarefa

- Reordenar seções via drag-and-drop.
- Adicionar/remover seções inteiras.
- Editor visual WYSIWYG dentro da própria página.
- Versionamento/histórico de edições (pode ser feito depois).
- Tradução multi-idioma do conteúdo CMS (i18n atual cobre só labels).

## Estimativa de complexidade

Trabalho extenso — várias páginas para mapear, refatorar e expor no admin. Vou começar pela Home como referência completa e replicar o padrão nas demais.
