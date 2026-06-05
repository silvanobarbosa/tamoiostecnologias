import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote, TrendingDown, Leaf, Package, Sprout, FlaskConical } from "lucide-react";

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
    id: "morangos-vo-lucia",
    sector: "Frutas premium",
    client: "Morangos Vó Lucia",
    title: "Morangos da Vó Lucia: ~40% a mais de prateleira na bandeja de polpa",
    cover: "/cases/cover-morangos.jpg",
    icon: Sprout,
    challenge:
      "Morango é uma das frutas mais delicadas do varejo. A Vó Lucia precisava reduzir perdas no transporte e na gôndola sem trocar a apresentação premium da marca — e queria sair do plástico.",
    solution:
      "Migramos a embalagem para bandeja de polpa moldada Tamoios com geometria desenhada para o cacho de morango, permitindo respiração e absorção de umidade. Acompanhamos a operação por safras consecutivas.",
    metrics: [
      { label: "Ganho de tempo de prateleira", value: "~40%" },
      { label: "Redução de plástico no SKU", value: "100%" },
      { label: "Apresentação premium", value: "Mantida" },
    ],
    quote: {
      text:
        "A bandeja de polpa segurou a fruta no ponto por mais tempo e ainda valorizou a marca na gôndola.",
      author: "Equipe Vó Lucia",
      role: "Produção de morangos",
    },
    related: { label: "Ver Bandejas FLV", to: "/produtos/bandejas-flv" },
  },
  {
    id: "cogumelos-hayashi",
    sector: "Hortifruti especial",
    client: "Cogumelos Hayashi",
    title: "Cogumelos Hayashi: ~50% a mais entre o produtor e o consumidor",
    cover: "/cases/cover-cogumelos.jpg",
    icon: Leaf,
    challenge:
      "Cogumelos frescos perdem qualidade rapidamente por excesso de umidade na embalagem plástica e impacto mecânico no transporte refrigerado.",
    solution:
      "A polpa moldada respira: regula a umidade dentro da embalagem e absorve micro-choques. Desenhamos uma bandeja específica para shiitake, shimeji e eryngui mantendo a pegada premium da Hayashi.",
    metrics: [
      { label: "Ganho prateleira + transporte", value: "~50%" },
      { label: "Perdas em transporte", value: "−" },
      { label: "Material 100% biomassa", value: "Sim" },
    ],
    quote: {
      text:
        "O cogumelo é frágil. A polpa lida com a umidade de um jeito que o plástico nunca conseguiu.",
      author: "Equipe Hayashi",
      role: "Produção de cogumelos",
    },
    related: { label: "Ver Bandejas FLV", to: "/produtos/bandejas-flv" },
  },
  {
    id: "carrefour-hortmix-evp",
    sector: "Validação de mercado",
    client: "Carrefour × Hortmix",
    title: "Carrefour × Hortmix: Ensaios de Vida de Prateleira na rede",
    cover: "/cases/cover-evp.jpg",
    icon: FlaskConical,
    challenge:
      "Antes de escalar para a rede inteira, era preciso comprovar — com protocolo, não com promessa — que a polpa moldada entrega prateleira equivalente ou superior ao isopor no FLV.",
    solution:
      "Conduzimos rodadas de Ensaio de Vida de Prateleira (EVP) em parceria com a rede Carrefour e a Hortmix, comparando SKUs reais em condições reais de loja. Dados, fotos e laudos compõem o dossiê técnico.",
    metrics: [
      { label: "Rodadas de EVP", value: "Múltiplas" },
      { label: "Parceiros envolvidos", value: "3" },
      { label: "Dossiê técnico", value: "Disponível" },
    ],
    quote: {
      text:
        "O EVP é o que separa marketing de embalagem real. A polpa Tamoios passou no teste — e segue passando.",
      author: "Time técnico",
      role: "Validação em rede",
    },
    related: { label: "Baixar materiais técnicos", to: "/materiais" },
  },
];

const Cases = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Cases Tamoios — morangos, cogumelos e EVP no Carrefour"
        description="Resultados reais de quem trocou o isopor pela polpa moldada Tamoios: Morangos Vó Lucia, Cogumelos Hayashi e Ensaios de Vida de Prateleira com Carrefour e Hortmix."
      />
      <SiteHeader />

      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-pulp">
        <div className="container">
          <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Cases</span>
          <h1 className="font-display text-4xl md:text-6xl font-semibold mt-3 leading-tight text-forest-deep text-balance max-w-3xl">
            Resultados reais de quem
            <br />
            <em className="text-leaf font-normal">já trocou o isopor.</em>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Morangos da Vó Lucia, Cogumelos Hayashi e Ensaios de Vida de Prateleira na rede Carrefour com a Hortmix.
            Histórias curtas, números honestos.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {CASES.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border border-border bg-background/80 text-muted-foreground hover:border-forest/40 hover:text-forest transition-colors"
              >
                {c.client}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="py-16 md:py-24">
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
