import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SEO } from "@/components/SEO";
import { Download, FileText, Sparkles, Megaphone } from "lucide-react";

type Material = {
  title: string;
  description: string;
  file: string;
  size: string;
  category: string;
  format: "PDF" | "PPTX";
};

const portfolio: Material[] = [
  {
    title: "Apresentação Institucional Tamoios 2026",
    description:
      "Quem somos, propósito, linha de tempo e visão de futuro da Tamoios Tecnologia em biomassa.",
    file: "/docs/portfolio/tamoios-apresentacao-institucional-2026.pdf",
    size: "334 KB",
    category: "Institucional",
    format: "PDF",
  },
  {
    title: "Linha de Embalagens 2026",
    description:
      "Panorama completo da nossa linha de embalagens em polpa de celulose — aplicações, formatos e diferenciais.",
    file: "/docs/portfolio/tamoios-linha-de-embalagens-2026.pdf",
    size: "1,4 MB",
    category: "Institucional",
    format: "PDF",
  },
  {
    title: "Bandejas Biodegradáveis FLV",
    description:
      "Substituição do isopor por polpa moldada para frutas, legumes e verduras no varejo.",
    file: "/docs/portfolio/tamoios-bandejas-biodegradaveis.pdf",
    size: "2,2 MB",
    category: "Bandejas FLV",
    format: "PDF",
  },
  {
    title: "Calços Técnicos & Embalagens Industriais",
    description:
      "Soluções de proteção, calços e separadores em celulose moldada para indústria e logística.",
    file: "/docs/portfolio/tamoios-calcos-tecnicos.pptx",
    size: "11 MB",
    category: "Calços Técnicos",
    format: "PPTX",
  },
  {
    title: "Tubetes & Sementeiras Agroflorestais",
    description:
      "Tubetes biodegradáveis para mudas, recuperação florestal e produção agrícola em escala.",
    file: "/docs/portfolio/tamoios-tubetes-sementeiras.pdf",
    size: "2,9 MB",
    category: "Agro & Florestal",
    format: "PDF",
  },
  {
    title: "Relatório de Sustentabilidade",
    description:
      "Indicadores ESG, ciclo da biomassa e impacto socioambiental da operação em Itariri/SP.",
    file: "/docs/portfolio/tamoios-sustentabilidade.pdf",
    size: "445 KB",
    category: "ESG",
    format: "PDF",
  },
];

const marketing: Material[] = [];

function MaterialCard({ m }: { m: Material }) {
  return (
    <a
      href={m.file}
      download
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 hover:border-forest/40 hover:shadow-deep transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase tracking-widest font-semibold text-leaf bg-leaf/10 px-2.5 py-1 rounded-full">
          {m.category}
        </span>
        <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
          {m.format} · {m.size}
        </span>
      </div>
      <FileText className="h-8 w-8 text-forest mb-3" />
      <h3 className="font-display text-lg font-semibold text-forest-deep leading-snug mb-2">
        {m.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{m.description}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-forest group-hover:text-leaf transition-colors">
        <Download className="h-4 w-4" /> Baixar material
      </span>
    </a>
  );
}

const Materiais = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Materiais Tamoios — Portfólio, produtos e conteúdo de marketing"
        description="Baixe apresentações institucionais, fichas de produtos e materiais de marketing da Tamoios Tecnologia: bandejas FLV, calços técnicos, tubetes agroflorestais e ESG."
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
            Apresentações institucionais, fichas técnicas de produto e peças de marketing — atualizadas
            continuamente pela equipe Tamoios. Use à vontade para enviar a clientes, parceiros e investidores.
          </p>
        </div>
      </section>

      <section id="portfolio" className="py-16 md:py-24">
        <div className="container">
          <div className="flex items-center gap-3 mb-10">
            <Sparkles className="h-6 w-6 text-forest" />
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-forest-deep">
              Portfólio & Produtos
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((m) => (
              <MaterialCard key={m.file} m={m} />
            ))}
          </div>
        </div>
      </section>

      <section id="marketing" className="py-16 md:py-24 bg-pulp-light/40 border-t border-border">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Megaphone className="h-6 w-6 text-leaf" />
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-forest-deep">
              Materiais de Marketing
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mb-10">
            Carrosséis para Instagram e LinkedIn, posts, vídeos, one-pagers e cases — produzidos com a
            narrativa e o design da Tamoios. Novos materiais aparecem aqui assim que saem do forno.
          </p>

          {marketing.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-background p-12 text-center max-w-2xl mx-auto">
              <Megaphone className="h-10 w-10 text-leaf mx-auto mb-4" />
              <h3 className="font-display text-xl text-forest-deep mb-2">Em produção</h3>
              <p className="text-sm text-muted-foreground">
                Os primeiros materiais de marketing — carrossel institucional, deck comercial e posts —
                serão publicados aqui em breve. Cadastre-se na newsletter no rodapé para receber os
                lançamentos.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketing.map((m) => (
                <MaterialCard key={m.file} m={m} />
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Materiais;
