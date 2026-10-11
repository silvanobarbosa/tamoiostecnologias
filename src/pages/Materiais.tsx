import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SEO } from "@/components/SEO";
import { Download, FileText, Sparkles, Megaphone } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


type Material = {
  title: string;
  description: string;
  file: string;
  size: string;
  category: string;
  format: "PDF" | "PPTX" | "ZIP";
  thumb?: string;
};

const portfolio: Material[] = [];

const marketing: Material[] = [];


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

const Materiais = () => {
  const { t, has } = useSiteContent("materiais");

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
            {t("hero", "eyebrow", "Biblioteca Tamoios")}
          </span>
          {has("hero", "title") ? (
            <h1 className="font-display text-4xl md:text-6xl font-semibold mt-3 leading-tight text-forest-deep text-balance">
              {t("hero", "title", "")}
            </h1>
          ) : (
            <h1 className="font-display text-4xl md:text-6xl font-semibold mt-3 leading-tight text-forest-deep text-balance">
              Materiais para conhecer,<br />
              <em className="text-leaf font-normal">apresentar e compartilhar.</em>
            </h1>
          )}
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            {t("hero", "subtitle", "Apresentações institucionais, fichas técnicas de produto, cases e peças de marketing — produzidos com a narrativa e o design da Tamoios. Use à vontade para clientes, parceiros e investidores.")}
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
          <div className="rounded-2xl border border-dashed border-border bg-pulp-light/30 p-10 text-center">
            <p className="text-muted-foreground">
              Estamos atualizando o portfólio. Em breve, novos materiais por aqui.
            </p>
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
            Padrões de marca para apresentações e redes sociais.
          </p>
          <div className="border-t border-border pt-8">
            <h3 className="text-2xl font-display text-forest-deep">Guia de identidade visual</h3>
            <p className="mt-3 text-muted-foreground max-w-2xl">Fontes, cores, formas, fotografia e prompts de IA, com guia PDF e modelo comercial PowerPoint editável.</p>
            <Button asChild className="mt-6"><Link to="/identidade-visual"><FileText className="h-4 w-4" /> Abrir guia</Link></Button>
            <Button asChild variant="outline" className="mt-6 ml-3"><Link to="/modelo-slides"><Sparkles className="h-4 w-4" /> Tamoios Slides · 24 modelos</Link></Button>
          </div>

        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Materiais;
