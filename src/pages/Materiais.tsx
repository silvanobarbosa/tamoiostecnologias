import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SEO } from "@/components/SEO";
import { Download, FileText, Sparkles, Megaphone, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

type Material = {
  title: string;
  description: string;
  file: string;
  size: string;
  category: string;
  format: "PDF" | "PPTX" | "ZIP";
  thumb?: string;
};

const portfolio: Material[] = [
  // Institucional
  { title: "Apresentação Institucional 2026", description: "Quem somos, propósito, linha do tempo e visão de futuro da Tamoios.", file: "/docs/portfolio/tamoios-apresentacao-institucional-2026.pdf", size: "334 KB", category: "Institucional", format: "PDF" },
  { title: "Linha de Embalagens 2026", description: "Panorama completo da linha de embalagens em polpa de celulose.", file: "/docs/portfolio/tamoios-linha-de-embalagens-2026.pdf", size: "1,4 MB", category: "Institucional", format: "PDF" },
  { title: "Linha de Trabalho 2026", description: "Estratégia, frentes e prioridades operacionais da Tamoios para 2026.", file: "/docs/portfolio/tamoios-linha-de-trabalho-2026.pdf", size: "2,9 MB", category: "Institucional", format: "PDF" },
  // Produto
  { title: "Bandejas Biodegradáveis FLV", description: "Substituição do isopor por polpa moldada para FLV no varejo.", file: "/docs/portfolio/tamoios-bandejas-biodegradaveis.pdf", size: "2,2 MB", category: "Bandejas FLV", format: "PDF" },
  { title: "Calços Técnicos & Embalagens Industriais", description: "Proteção, calços e separadores em celulose moldada para indústria.", file: "/docs/portfolio/tamoios-calcos-tecnicos.pptx", size: "11 MB", category: "Calços Técnicos", format: "PPTX" },
  { title: "Tubetes & Sementeiras Agroflorestais", description: "Tubetes biodegradáveis para mudas e recuperação florestal.", file: "/docs/portfolio/tamoios-tubetes-sementeiras.pdf", size: "2,9 MB", category: "Agro & Florestal", format: "PDF" },
  { title: "Agroadubo", description: "Aplicação da polpa Tamoios em substrato e adubação na cadeia agrícola.", file: "/docs/portfolio/tamoios-agroadubo.pdf", size: "1,3 MB", category: "Agro & Florestal", format: "PDF" },
  // Cases
  { title: "Case Carrefour 2025", description: "Ensaios e implantação de bandejas FLV no varejo Carrefour.", file: "/docs/portfolio/tamoios-case-carrefour-2025.pdf", size: "619 KB", category: "Cases", format: "PDF" },
  { title: "BNDES Garagem — Rodada 5M", description: "Pitch e materiais da rodada de inovação climática no BNDES.", file: "/docs/portfolio/tamoios-bndes-rodada-5m.pdf", size: "1,9 MB", category: "Cases", format: "PDF" },
  { title: "Quintessa · Deep Climate", description: "Aceleração de impacto e jornada Deep Climate com a Quintessa.", file: "/docs/portfolio/tamoios-quintessa-deep-climate.pdf", size: "2,0 MB", category: "Cases", format: "PDF" },
  { title: "Belterra — Parceria 2026", description: "Materiais técnicos da parceria com a Belterra Agroflorestas.", file: "/docs/portfolio/tamoios-belterra-2026.pdf", size: "3,4 MB", category: "Cases", format: "PDF" },
  // ESG
  { title: "Relatório de Sustentabilidade", description: "Indicadores ESG, ciclo da biomassa e impacto socioambiental.", file: "/docs/portfolio/tamoios-sustentabilidade.pdf", size: "445 KB", category: "ESG", format: "PDF" },
];

const marketing: Material[] = [
  {
    title: "Deck Comercial 2026 · PDF",
    description: "Apresentação comercial completa em 18 slides (16:9) — narrativa, diferenciais, cases (Carrefour, Belterra), impacto ESG e como começar. Pronto para enviar a cliente, investidor ou parceiro.",
    file: "/docs/marketing/tamoios-deck-comercial-2026.pdf",
    size: "152 KB",
    category: "Comercial",
    format: "PDF",
  },
  {
    title: "Deck Comercial 2026 · PPTX editável",
    description: "Mesmo deck em PowerPoint editável — adapte para cada cliente, adicione cases específicos ou troque a capa.",
    file: "/docs/marketing/tamoios-deck-comercial-2026.pptx",
    size: "337 KB",
    category: "Editáveis",
    format: "PPTX",
  },
  {
    title: "Carrossel · Do isopor à polpa",
    description: "8 cartões 1080×1080 prontos para postar no Instagram e LinkedIn — versão PDF de pré-visualização.",
    file: "/docs/marketing/carrossel-isopor-polpa.pdf",
    size: "84 KB",
    category: "LinkedIn / Instagram",
    format: "PDF",
    thumb: "/docs/marketing/carrossel-isopor-polpa/slide-1.png",
  },
  {
    title: "Carrossel · Pacote de imagens (PNG)",
    description: "ZIP com os 8 slides em PNG (1080×1080) — só arrastar para o feed do Instagram ou LinkedIn.",
    file: "/docs/marketing/carrossel-isopor-polpa-pngs.zip",
    size: "530 KB",
    category: "LinkedIn / Instagram",
    format: "ZIP",
    thumb: "/docs/marketing/carrossel-isopor-polpa/slide-3.png",
  },
  {
    title: "Carrossel · Fonte editável (.pptx)",
    description: "Arquivo PowerPoint editável do carrossel — para adaptar textos, adicionar slides ou trocar de cliente.",
    file: "/docs/marketing/carrossel-isopor-polpa.pptx",
    size: "143 KB",
    category: "Editáveis",
    format: "PPTX",
  },
  {
    title: "One-Pager Institucional",
    description: "Resumo de uma página da Tamoios — ideal para envio em email, WhatsApp ou anexo de proposta.",
    file: "/docs/marketing/tamoios-one-pager.pdf",
    size: "84 KB",
    category: "Comercial",
    format: "PDF",
  },
];

function MaterialCard({ m }: { m: Material }) {
  return (
    <a
      href={m.file}
      download
      className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-forest/40 hover:shadow-deep transition-all"
    >
      {m.thumb && (
        <div className="aspect-square overflow-hidden bg-pulp-light">
          <img
            src={m.thumb}
            alt={m.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      )}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-leaf bg-leaf/10 px-2.5 py-1 rounded-full">
            {m.category}
          </span>
          <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
            {m.format} · {m.size}
          </span>
        </div>
        {!m.thumb && <FileText className="h-8 w-8 text-forest mb-3" />}
        <h3 className="font-display text-lg font-semibold text-forest-deep leading-snug mb-2">
          {m.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{m.description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-forest group-hover:text-leaf transition-colors">
          <Download className="h-4 w-4" /> Baixar material
        </span>
      </div>
    </a>
  );
}

const PORTFOLIO_CATEGORIES = ["Todos", "Institucional", "Bandejas FLV", "Calços Técnicos", "Agro & Florestal", "Cases", "ESG"] as const;

const Materiais = () => {
  const [filter, setFilter] = useState<string>("Todos");
  const filteredPortfolio = filter === "Todos" ? portfolio : portfolio.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Materiais Tamoios — Portfólio, cases e materiais de marketing"
        description="Baixe apresentações institucionais, cases (Carrefour, BNDES, Quintessa, Belterra), fichas de produto e materiais de marketing prontos para LinkedIn e Instagram."
      />
      <SiteHeader />

      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-pulp">
        <div className="container max-w-4xl">
          <span className="text-leaf font-semibold text-sm tracking-widest uppercase">
            Biblioteca Tamoios
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-semibold mt-3 leading-tight text-forest-deep text-balance">
            Materiais para conhecer,<br />
            <em className="text-leaf font-normal">apresentar e compartilhar.</em>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Apresentações institucionais, fichas técnicas de produto, cases e peças de marketing — produzidos
            com a narrativa e o design da Tamoios. Use à vontade para clientes, parceiros e investidores.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <a href="#portfolio" className="px-4 py-2 rounded-full bg-forest text-primary-foreground font-medium hover:bg-forest-deep transition-colors">
              Portfólio & Produtos
            </a>
            <a href="#marketing" className="px-4 py-2 rounded-full bg-background border border-border text-forest font-medium hover:border-forest/40 transition-colors">
              Materiais de Marketing
            </a>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-16 md:py-24 scroll-mt-24">
        <div className="container">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="h-6 w-6 text-forest" />
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-forest-deep">
              Portfólio & Produtos
            </h2>
          </div>
          <div className="flex items-center gap-2 mb-10 flex-wrap">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border transition-colors",
                  filter === cat
                    ? "bg-forest text-primary-foreground border-forest"
                    : "bg-background text-muted-foreground border-border hover:border-forest/40 hover:text-forest",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolio.map((m) => (
              <MaterialCard key={m.file} m={m} />
            ))}
          </div>
        </div>
      </section>

      <section id="marketing" className="py-16 md:py-24 bg-pulp-light/40 border-t border-border scroll-mt-24">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Megaphone className="h-6 w-6 text-leaf" />
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-forest-deep">
              Materiais de Marketing
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mb-10">
            Carrosséis para Instagram e LinkedIn, posts, one-pagers e arquivos editáveis — produzidos
            com a narrativa Tamoios. Atualizados continuamente.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketing.map((m) => (
              <MaterialCard key={m.file} m={m} />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Materiais;
