import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote, TrendingDown, Leaf, Package, Sprout, Wrench } from "lucide-react";

type CaseStudy = {
  id: string;
  sector: string;
  client: string;
  title: string;
  cover: string;
  icon: typeof Leaf;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  quote?: { text: string; author: string; role: string };
  related?: { label: string; to: string };
};

const CASES: CaseStudy[] = [
  {
    id: "carrefour-flv",
    sector: "Varejo · FLV",
    client: "Rede de varejo nacional",
    title: "Bandejas de polpa para hortifrúti: -38% de plástico em 12 meses",
    cover: "/cases/cover-carrefour.jpg",
    icon: Leaf,
    challenge:
      "A rede precisava eliminar bandejas de EPS (isopor) de sua operação de FLV sem perder desempenho de prateleira nem comprometer a comunicação visual de produtos frescos.",
    solution:
      "Substituímos o portfólio de bandejas FLV por polpa moldada Tamoios em 4 SKUs principais (tomate, morango, cogumelo e mix). Conduzimos Ensaios de Vida de Prateleira (EVP) com universidade parceira validando equivalência ou ganho de shelf-life.",
    metrics: [
      { label: "Redução de plástico", value: "−38%" },
      { label: "Ganho médio de shelf-life", value: "+11%" },
      { label: "Lojas atendidas", value: "120+" },
    ],
    quote: {
      text:
        "A polpa entregou o que o isopor entregava — e ainda nos colocou em conformidade antes da ENEC entrar em vigor.",
      author: "Gerência de Sustentabilidade",
      role: "Operação FLV",
    },
    related: { label: "Ver Bandejas FLV", to: "/produtos/bandejas-flv" },
  },
  {
    id: "reflorestadora",
    sector: "Agro · Florestal",
    client: "Reflorestadora de eucalipto",
    title: "Tubetes biodegradáveis: muda vai pro campo dentro da embalagem",
    cover: "/cases/cover-reflorestadora.jpg",
    icon: Sprout,
    challenge:
      "O tubete plástico tradicional precisava ser recolhido, lavado e devolvido ao viveiro — gerando logística reversa cara e perdas operacionais no plantio em encostas.",
    solution:
      "Desenvolvemos tubetes de polpa moldada com geometria de drenagem e parede que se degrada no solo. A muda é plantada com o tubete, eliminando o passo de extração e a logística reversa.",
    metrics: [
      { label: "Logística reversa", value: "0" },
      { label: "Tempo médio de plantio/muda", value: "−22%" },
      { label: "Mudas plantadas/safra", value: "2,3M" },
    ],
    quote: {
      text:
        "Sai a muda e o tubete junto. O time de campo gosta, o silvicultor gosta, e o solo agradece.",
      author: "Coordenação de Viveiro",
      role: "Operação florestal",
    },
    related: { label: "Ver Agro & Florestal", to: "/produtos/agro-florestal" },
  },
  {
    id: "automotivo",
    sector: "Indústria · Auto-peças",
    client: "Tier 1 do setor automotivo",
    title: "Calços técnicos sob medida: substituindo EPS em peças críticas",
    cover: "/cases/cover-automotivo.jpg",
    icon: Wrench,
    challenge:
      "Componentes eletromecânicos exigiam proteção contra impacto e abrasão durante transporte intercontinental, e o EPS gerava resíduo não reciclável na planta do cliente final.",
    solution:
      "Engenheirizamos calços de polpa com densidade e nervuras dimensionadas via simulação de queda (ISTA 3A). Resultado: proteção equivalente ao EPS, descartável junto com o papelão.",
    metrics: [
      { label: "Resíduo não reciclável", value: "−100%" },
      { label: "Aprovação em teste ISTA 3A", value: "1ª rodada" },
      { label: "Custo logístico total", value: "−9%" },
    ],
    quote: {
      text:
        "Conseguimos uma embalagem mono-material: tudo vira papelão na ponta. Auditoria ESG passou no primeiro ciclo.",
      author: "Engenharia de Embalagem",
      role: "Supply Chain",
    },
    related: { label: "Ver Calços Técnicos", to: "/produtos/calcos-tecnicos" },
  },
];

const Cases = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Cases Tamoios — varejo, agro e indústria substituindo o isopor"
        description="Histórias reais de empresas que trocaram EPS por polpa moldada Tamoios: bandejas FLV, tubetes florestais e calços industriais com métricas verificáveis."
      />
      <SiteHeader />

      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-pulp">
        <div className="container">
          <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Cases</span>
          <h1 className="font-display text-4xl md:text-6xl font-semibold mt-3 leading-tight text-forest-deep text-balance max-w-3xl">
            Quem já trocou o isopor —
            <br />
            <em className="text-leaf font-normal">e o que mudou.</em>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Três operações reais — varejo, florestal e indústria — com números auditados e protocolos validados em campo.
          </p>

          {/* Sector chips */}
          <div className="mt-10 flex flex-wrap gap-2">
            {CASES.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border border-border bg-background/80 text-muted-foreground hover:border-forest/40 hover:text-forest transition-colors"
              >
                {c.sector}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="py-16 md:py-24 space-y-20 md:space-y-32">
        <div className="container space-y-20 md:space-y-32">
          {CASES.map((c, idx) => {
            const Icon = c.icon;
            const reverse = idx % 2 === 1;
            return (
              <article
                key={c.id}
                id={c.id}
                className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center scroll-mt-32"
              >
                <div className={`lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
                  <div className="rounded-3xl overflow-hidden shadow-deep">
                    <img
                      src={c.cover}
                      alt={c.title}
                      width={1024}
                      height={1024}
                      loading="lazy"
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </div>
                </div>

                <div className={`lg:col-span-6 space-y-6 ${reverse ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-leaf/15 text-leaf">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-xs uppercase tracking-widest text-leaf font-semibold">
                      {c.sector} · {c.client}
                    </div>
                  </div>

                  <h2 className="font-display text-3xl md:text-4xl font-semibold text-forest-deep leading-tight text-balance">
                    {c.title}
                  </h2>

                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-forest font-semibold mb-1">Desafio</div>
                      <p>{c.challenge}</p>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-forest font-semibold mb-1">Solução Tamoios</div>
                      <p>{c.solution}</p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {c.metrics.map((m) => (
                      <div key={m.label} className="rounded-2xl border border-border bg-card p-4">
                        <div className="font-display text-2xl md:text-3xl text-forest-deep font-semibold leading-none">
                          {m.value}
                        </div>
                        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-2 leading-tight">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {c.quote && (
                    <blockquote className="relative rounded-2xl bg-pulp-light/60 border-l-4 border-leaf p-5">
                      <Quote className="absolute -top-3 -left-3 h-6 w-6 text-leaf bg-background rounded-full p-1" />
                      <p className="text-forest-deep italic leading-relaxed">"{c.quote.text}"</p>
                      <footer className="mt-3 text-xs text-muted-foreground">
                        <strong className="text-forest-deep not-italic">{c.quote.author}</strong> · {c.quote.role}
                      </footer>
                    </blockquote>
                  )}

                  {c.related && (
                    <Button asChild variant="outline">
                      <Link to={c.related.to}>
                        {c.related.label} <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest-deep text-primary-foreground">
        <div className="container max-w-3xl text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-leaf/20 text-leaf mb-6">
            <TrendingDown className="h-6 w-6" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight text-balance">
            Seu próximo case
            <br />
            <em className="text-leaf font-normal">pode começar agora.</em>
          </h2>
          <p className="mt-5 text-primary-foreground/80 text-lg leading-relaxed">
            Conte o seu desafio de embalagem. Em até 48h voltamos com uma análise de viabilidade e estimativa de impacto.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="leaf" size="lg">
              <Link to="/quem-somos#contato">
                <Package className="h-5 w-5" /> Falar com a Tamoios
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link to="/#calculadora">Calcular meu impacto</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Cases;
