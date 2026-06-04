import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  ShieldCheck,
  Landmark,
  Scale,
  TrendingUp,
  Factory,
  Leaf,
  CheckCircle2,
  FileText,
  Building2,
  HandCoins,
  Users,
} from "lucide-react";
import heroImg from "@/assets/politicas-hero.jpg";

const politicas = [
  {
    icon: Landmark,
    sigla: "ENEC",
    titulo: "Estratégia Nacional de Economia Circular",
    orgao: "MDIC — Ministério do Desenvolvimento, Indústria, Comércio e Serviços",
    resumo:
      "Marco federal que coordena políticas públicas, incentivos e metas para reorganizar a economia brasileira em torno do uso eficiente de recursos, da circularidade de materiais e da redução de resíduos.",
    pilares: [
      "Substituição de plásticos virgens e de uso único",
      "Cadeias produtivas circulares e regenerativas",
      "Estímulo a compras públicas e privadas sustentáveis",
      "Bioeconomia e materiais de base renovável",
    ],
    como_governo_atua:
      "Coordena ministérios, agências e setores produtivos; estabelece metas, articula financiamento (BNDES, Finep) e cria gatilhos regulatórios para acelerar a adoção de soluções circulares.",
    link: "https://www.gov.br/mdic/pt-br/assuntos/enec",
    link_label: "gov.br/mdic/enec",
  },
  {
    icon: Scale,
    sigla: "Decreto 12.688/2025",
    titulo: "Regulamentação do uso de embalagens e produtos plásticos descartáveis",
    orgao: "Presidência da República",
    resumo:
      "Estabelece diretrizes nacionais para a redução, substituição e descarte adequado de plásticos de uso único em embalagens, com prazos, obrigações para fabricantes, comerciantes e responsabilidade compartilhada pelo ciclo de vida.",
    pilares: [
      "Redução progressiva do plástico virgem em embalagens",
      "Logística reversa e responsabilidade compartilhada",
      "Estímulo a materiais biodegradáveis e compostáveis",
      "Rastreabilidade e relatórios obrigatórios",
    ],
    como_governo_atua:
      "Define obrigações para fabricantes e varejistas, cria mecanismos de fiscalização, estabelece prazos de adequação e prioriza compras com critérios ambientais. Empresas não-aderentes ficam expostas a sanções, perda de contratos públicos e risco reputacional.",
    link: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12688.htm",
    link_label: "planalto.gov.br · D12688",
  },
];

const beneficiosEmpresa = [
  {
    icon: ShieldCheck,
    titulo: "Proteção regulatória",
    body: "Antecipa exigências do Decreto 12.688/2025 e da ENEC — sua empresa fica fora do radar de sanções e do risco de perder contratos com grandes redes e poder público.",
  },
  {
    icon: HandCoins,
    titulo: "Viabilidade econômica",
    body: "Bandejas Tamoios reduzem perdas de FLV (até 30% a mais de shelf life nos cases reais) e custos logísticos de descarte. O ESG aqui é lucro mensurável, não custo.",
  },
  {
    icon: Users,
    titulo: "Reputação com o consumidor",
    body: "78% dos consumidores brasileiros declaram preferir marcas com embalagens sustentáveis. Sair do isopor é hoje um sinal claro de marca contemporânea.",
  },
  {
    icon: TrendingUp,
    titulo: "Acesso a financiamento",
    body: "Operações ESG-aderentes têm preferência em linhas do BNDES, Finep e bancos privados — taxa, prazo e volume melhores para CapEx e expansão.",
  },
];

const comoAderir = [
  { n: "01", t: "Diagnóstico de aderência", d: "Mapeamos onde sua operação ainda usa isopor, plástico virgem ou materiais não-recicláveis e qual a exposição regulatória." },
  { n: "02", t: "Substituição faseada", d: "Plano de troca por bandejas, calços ou tubetes Tamoios — Reciclados, Recicláveis, Biodegradáveis, Compostáveis e Descarbonizados." },
  { n: "03", t: "Documentação ESG", d: "Você recebe laudos, certificações e narrativa pronta para relatórios de sustentabilidade, ASG e RFPs públicos." },
  { n: "04", t: "Escala nacional", d: "Distribuímos do Rio Grande do Sul ao Ceará e Pernambuco, com lead time previsível e produção verticalizada em Itariri-SP." },
];

const PoliticasNacionais = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Políticas Nacionais ESG · Tamoios Tecnologia"
        description="ENEC, Decreto 12.688/2025 e o futuro das embalagens no Brasil. Como a Tamoios ajuda empresas a serem aderentes, lucrativas e bem vistas pelo consumidor."
      />
      <SiteHeader />

      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-forest-deep">
        <img
          src={heroImg}
          alt="Indústria sustentável brasileira integrada à mata atlântica"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/70 via-forest-deep/60 to-forest-deep" />
        <div className="container relative text-primary-foreground max-w-4xl">
          <span className="inline-flex items-center gap-2 text-leaf font-semibold text-sm tracking-widest uppercase">
            <Landmark className="h-4 w-4" /> Marco regulatório brasileiro
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-semibold mt-4 leading-tight text-balance">
            O Brasil está virando a página do plástico.
            <span className="block italic text-leaf font-normal mt-2">
              Sua empresa está preparada?
            </span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/85 mt-6 max-w-3xl leading-relaxed">
            A <strong>Estratégia Nacional de Economia Circular (ENEC)</strong> e o
            <strong> Decreto 12.688/2025</strong> reorganizam, juntos, as regras do jogo
            para embalagens, varejo e indústria no país. Aderir cedo deixou de ser
            diferencial — virou condição de competir.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button asChild variant="leaf" size="lg">
              <a href="#aderencia">Como a Tamoios ajuda <CheckCircle2 className="h-4 w-4" /></a>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/quem-somos#contato">Falar com especialista</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* AS POLÍTICAS */}
      <section className="py-20 md:py-28">
        <div className="container max-w-6xl">
          <div className="max-w-3xl mb-14">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">As políticas</span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-forest-deep mt-3 leading-tight text-balance">
              Duas peças centrais do novo arcabouço ESG brasileiro.
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {politicas.map(({ icon: Icon, sigla, titulo, orgao, resumo, pilares, como_governo_atua, link, link_label }) => (
              <article key={sigla} className="rounded-3xl bg-card border border-border shadow-soft overflow-hidden flex flex-col">
                <div className="bg-gradient-pulp p-8 border-b border-border">
                  <div className="flex items-center gap-3 text-leaf">
                    <Icon className="h-6 w-6" />
                    <span className="text-xs uppercase tracking-widest font-semibold">{orgao}</span>
                  </div>
                  <div className="mt-4 text-leaf font-display text-2xl">{sigla}</div>
                  <h3 className="font-display text-2xl md:text-3xl text-forest-deep mt-1 leading-tight">{titulo}</h3>
                </div>
                <div className="p-8 flex-1 flex flex-col gap-6">
                  <p className="text-muted-foreground leading-relaxed">{resumo}</p>

                  <div>
                    <h4 className="font-semibold text-forest-deep text-sm uppercase tracking-wider mb-3">Pilares</h4>
                    <ul className="space-y-2">
                      {pilares.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-foreground/80">
                          <Leaf className="h-4 w-4 text-leaf mt-0.5 shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-pulp-light/50 p-5 border border-border/60">
                    <h4 className="font-semibold text-forest-deep text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Building2 className="h-4 w-4" /> Como o governo atua
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{como_governo_atua}</p>
                  </div>

                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-forest font-semibold hover:text-leaf transition-colors mt-auto group"
                  >
                    <FileText className="h-4 w-4" />
                    Consultar texto oficial · {link_label}
                    <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUE ADERIR */}
      <section id="aderencia" className="py-20 md:py-28 bg-pulp-light/40">
        <div className="container max-w-6xl">
          <div className="max-w-3xl mb-14">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Aderência com lucro</span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-forest-deep mt-3 leading-tight text-balance">
              ESG aqui não é custo. É proteção, reputação e margem.
            </h2>
            <p className="text-lg text-muted-foreground mt-5 leading-relaxed">
              A Tamoios já é fortemente aderente a essas políticas — e leva a sua empresa
              junto. Cada bandeja, calço ou tubete trocado é, ao mesmo tempo, um passo
              regulatório, uma economia operacional e um ponto a mais na percepção do
              consumidor final.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {beneficiosEmpresa.map(({ icon: Icon, titulo, body }) => (
              <div key={titulo} className="rounded-2xl bg-card border border-border p-6 hover:shadow-soft transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-leaf/10 text-leaf flex items-center justify-center">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg text-forest-deep mt-4">{titulo}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO A TAMOIOS ADERE */}
      <section className="py-20 md:py-28">
        <div className="container max-w-6xl grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">A Tamoios já está aderente</span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-forest-deep mt-3 leading-tight text-balance">
              Tecnologia patenteada,<br />conformidade documentada.
            </h2>
            <p className="text-muted-foreground mt-5 leading-relaxed">
              Operamos com energia 100% renovável, água em circuito fechado e biocompósito
              de polpa <strong>Reciclado, Reciclável, Biodegradável, Compostável e
              Descarbonizado</strong>. Cada item da ENEC e do Decreto 12.688/2025 já está
              endereçado no nosso processo.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {["ENEC · MDIC", "Decreto 12.688/2025", "ISO 14000", "Logística reversa"].map((c) => (
                <div key={c} className="rounded-xl border border-leaf/30 bg-leaf/5 p-4 text-center">
                  <ShieldCheck className="h-5 w-5 text-leaf mx-auto" />
                  <p className="text-xs font-semibold text-forest-deep mt-2">{c}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="space-y-5">
              {comoAderir.map((s) => (
                <li key={s.n} className="flex gap-5 rounded-2xl bg-card border border-border p-6">
                  <div className="font-display text-3xl text-leaf shrink-0 w-14">{s.n}</div>
                  <div>
                    <h3 className="font-display text-xl text-forest-deep">{s.t}</h3>
                    <p className="text-muted-foreground mt-1 leading-relaxed">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-forest-deep text-primary-foreground">
        <div className="container max-w-4xl text-center">
          <Factory className="h-10 w-10 text-leaf mx-auto" />
          <h2 className="font-display text-3xl md:text-5xl font-semibold mt-4 leading-tight text-balance">
            Antecipe-se ao prazo. Lucre com a transição.
          </h2>
          <p className="text-lg text-primary-foreground/80 mt-5 max-w-2xl mx-auto">
            Receba um diagnóstico gratuito de aderência ENEC + Decreto 12.688/2025 aplicado
            ao seu negócio, com plano de substituição e estimativa de ganho.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Button asChild variant="leaf" size="lg">
              <Link to="/quem-somos#contato">Solicitar diagnóstico</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/quem-somos">Conhecer a Tamoios</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default PoliticasNacionais;
