export type FieldType = "text" | "longtext" | "image" | "url";

export type Field = {
  section: string;
  key: string;
  label: string;
  type: FieldType;
  help?: string;
  placeholder?: string;
};

export type PageSchema = {
  slug: string;
  title: string;
  route: string;
  description: string;
  fields: Field[];
};

// Common editable fields per page. The site renders the original (rich)
// content by default; admin-saved values override only specific texts/CTAs.
export const PAGES: PageSchema[] = [
  {
    slug: "home",
    title: "Home",
    route: "/",
    description: "Página inicial do site.",
    fields: [
      { section: "hero", key: "eyebrow", label: "Etiqueta superior (hero)", type: "text", placeholder: "Tecnologia em biomassa · Tamoios" },
      { section: "hero", key: "title", label: "Título principal (hero)", type: "longtext", help: "Se vazio, mantém o título original com tipografia em camadas." },
      { section: "hero", key: "subtitle", label: "Parágrafo do hero", type: "longtext" },
      { section: "hero", key: "cta_primary", label: "Botão principal — texto", type: "text", placeholder: "Conhecer soluções" },
      { section: "hero", key: "cta_secondary", label: "Botão secundário — texto", type: "text", placeholder: "Ler o manifesto" },
      { section: "contato", key: "eyebrow", label: "Etiqueta da seção de contato", type: "text" },
      { section: "contato", key: "title", label: "Título da seção de contato", type: "longtext" },
      { section: "contato", key: "subtitle", label: "Descrição da seção de contato", type: "longtext" },
    ],
  },
  {
    slug: "quem-somos",
    title: "Quem Somos",
    route: "/quem-somos",
    description: "Página institucional sobre a empresa.",
    fields: [
      { section: "hero", key: "eyebrow", label: "Etiqueta superior", type: "text" },
      { section: "hero", key: "title", label: "Título principal", type: "longtext" },
      { section: "hero", key: "subtitle", label: "Parágrafo de abertura", type: "longtext" },
    ],
  },
  {
    slug: "materiais",
    title: "Materiais & Portfólio",
    route: "/materiais",
    description: "Biblioteca de materiais para download.",
    fields: [
      { section: "hero", key: "eyebrow", label: "Etiqueta superior", type: "text" },
      { section: "hero", key: "title", label: "Título principal", type: "longtext" },
      { section: "hero", key: "subtitle", label: "Parágrafo de abertura", type: "longtext" },
    ],
  },
  {
    slug: "cases",
    title: "Cases",
    route: "/cases",
    description: "Histórias de clientes e parceiros.",
    fields: [
      { section: "hero", key: "eyebrow", label: "Etiqueta superior", type: "text" },
      { section: "hero", key: "title", label: "Título principal", type: "longtext" },
      { section: "hero", key: "subtitle", label: "Parágrafo de abertura", type: "longtext" },
    ],
  },
  {
    slug: "imprensa",
    title: "Imprensa & Press Kit",
    route: "/imprensa",
    description: "Material para jornalistas e parceiros.",
    fields: [
      { section: "hero", key: "eyebrow", label: "Etiqueta superior", type: "text" },
      { section: "hero", key: "title", label: "Título principal", type: "longtext" },
      { section: "hero", key: "subtitle", label: "Parágrafo de abertura", type: "longtext" },
    ],
  },
  {
    slug: "politicas-nacionais",
    title: "Políticas Nacionais",
    route: "/politicas-nacionais",
    description: "Contexto regulatório e ESG.",
    fields: [
      { section: "hero", key: "eyebrow", label: "Etiqueta superior", type: "text" },
      { section: "hero", key: "title", label: "Título principal", type: "longtext" },
      { section: "hero", key: "subtitle", label: "Parágrafo de abertura", type: "longtext" },
    ],
  },
  {
    slug: "produto-bandejas-flv",
    title: "Produto · Bandejas FLV",
    route: "/produtos/bandejas-flv",
    description: "Página de produto Bandejas FLV.",
    fields: [
      { section: "hero", key: "eyebrow", label: "Etiqueta superior", type: "text" },
      { section: "hero", key: "title", label: "Título principal", type: "longtext" },
      { section: "hero", key: "highlight", label: "Destaque do título (itálico verde)", type: "longtext" },
      { section: "hero", key: "intro", label: "Parágrafo de abertura", type: "longtext" },
      { section: "cta", key: "title", label: "Título do CTA final", type: "longtext" },
      { section: "cta", key: "desc", label: "Descrição do CTA final", type: "longtext" },
    ],
  },
  {
    slug: "produto-calcos-tecnicos",
    title: "Produto · Calços Técnicos",
    route: "/produtos/calcos-tecnicos",
    description: "Página de produto Calços Técnicos.",
    fields: [
      { section: "hero", key: "eyebrow", label: "Etiqueta superior", type: "text" },
      { section: "hero", key: "title", label: "Título principal", type: "longtext" },
      { section: "hero", key: "highlight", label: "Destaque do título (itálico verde)", type: "longtext" },
      { section: "hero", key: "intro", label: "Parágrafo de abertura", type: "longtext" },
      { section: "cta", key: "title", label: "Título do CTA final", type: "longtext" },
      { section: "cta", key: "desc", label: "Descrição do CTA final", type: "longtext" },
    ],
  },
  {
    slug: "produto-agro-florestal",
    title: "Produto · Agro & Florestal",
    route: "/produtos/agro-florestal",
    description: "Página de produto Agro & Florestal.",
    fields: [
      { section: "hero", key: "eyebrow", label: "Etiqueta superior", type: "text" },
      { section: "hero", key: "title", label: "Título principal", type: "longtext" },
      { section: "hero", key: "highlight", label: "Destaque do título (itálico verde)", type: "longtext" },
      { section: "hero", key: "intro", label: "Parágrafo de abertura", type: "longtext" },
      { section: "cta", key: "title", label: "Título do CTA final", type: "longtext" },
      { section: "cta", key: "desc", label: "Descrição do CTA final", type: "longtext" },
    ],
  },
];

export const getPageSchema = (slug: string) => PAGES.find((p) => p.slug === slug);
