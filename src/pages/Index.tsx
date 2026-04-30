import logoTamoios from "@/assets/tamoios-logo.png";
import heroImg from "@/assets/bandeja-tomate-cacho.jpg";
import varejoImg from "@/assets/varejo-bandejas-gondola.jpg";
import industriaImg from "@/assets/calcos-garrafas.jpg";
import socialImg from "@/assets/impacto-social.jpg";
import produtoAlfaceImg from "@/assets/bandeja-alface-iceberg.jpg";
import produtoMiniImg from "@/assets/bandeja-alface-mini.jpg";
import produtoTomatesImg from "@/assets/bandeja-tomates.jpg";
import tubetesMudasImg from "@/assets/tubetes-mudas.jpg";
import tubetesBandejaImg from "@/assets/tubetes-bandeja.jpg";
import hidroponiaMudasImg from "@/assets/hidroponia-mudas.jpg";
import hidroponiaVasoImg from "@/assets/hidroponia-vaso.jpg";
import calcosCompressorImg from "@/assets/calcos-compressor.jpg";
import embalagemVinhoImg from "@/assets/embalagem-vinho.jpg";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Leaf,
  Recycle,
  Factory,
  Sparkles,
  CheckCircle2,
  Mail,
  Phone,
  Instagram,
  MapPin,
  Quote,
  Sprout,
  TreePine,
  Wine,
  Shield,
  Download,
} from "lucide-react";

const credenciais = [
  "Reciclado pré-uso",
  "Reciclável",
  "Compostável",
  "Biodegradável",
  "Baixo carbono",
  "Operação em região vulnerável",
];

const agroLinhas = [
  {
    icon: TreePine,
    img: tubetesMudasImg,
    tag: "Reflorestamento",
    title: "Tubetes Bio para mudas",
    desc: "Substituição direta dos tubetes plásticos no transporte e plantio pós-viveiro. Mercado de bilhões de unidades/ano. Objetivo: aumento de sobrevivência da muda no campo.",
    bullets: ["Eucalipto, Pinus e regeneração florestal", "Múltiplos tamanhos sob demanda", "Decomposição direta no solo"],
  },
  {
    icon: Sprout,
    img: hidroponiaMudasImg,
    tag: "Hidroponia & Agricultura orgânica",
    title: "Mini Vasos para hidroponia",
    desc: "Substituto direto do cachepô plástico para crescimento de hortaliças. Reduz custos operacionais e elimina micro-plásticos do sistema produtivo.",
    bullets: ["Sementeiras e coroas de plantio", "Compatível com bancada NFT", "100% biodegradável após o ciclo"],
  },
];

const industriaLinhas = [
  {
    icon: Wine,
    img: embalagemVinhoImg,
    tag: "Bebidas premium",
    title: "Embalagem para vinho",
    desc: "Berço moldado em polpa que substitui isopor e plástico bolha em garrafas. Alta proteção vertical, visual sofisticado e descarte 100% papel.",
  },
  {
    icon: Shield,
    img: calcosCompressorImg,
    tag: "Equipamentos pesados",
    title: "Calços de grande dimensão",
    desc: "Calços técnicos para compressores, autopeças e equipamentos industriais. Engenharia de polpa de alta densidade para impacto e empilhamento.",
  },
];

const impacto = [
  { value: "+30Mi", label: "Bandejas de isopor já substituídas no Brasil", icon: Recycle },
  { value: "+30 a 50%", label: "Aumento médio no tempo de prateleira em relação ao isopor", icon: Leaf },
  { value: "80%", label: "Da equipe de fábrica é formada por mulheres da região de Itariri-SP", icon: Sparkles },
];

const cases = [
  {
    name: "Morangos Vó Lucia",
    metric: "~40%",
    label: "de ganho no tempo de prateleira",
    tag: "Frutas premium",
  },
  {
    name: "Cogumelos Hayashi",
    metric: "~50%",
    label: "no tempo de prateleira e transporte",
    tag: "Hortifruti especial",
  },
  {
    name: "Carrefour × Hortmix",
    metric: "EVP",
    label: "Rodadas de Ensaio de Vida de Prateleira em parceria",
    tag: "Validação de mercado",
  },
];

const ecossistema = [
  "USP — Incubadora",
  "Braskem Labs",
  "BNDES Garagem",
  "Cietec",
  "Irani Labs",
  "Prêmio Grandes Cases de Embalagem",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/85 border-b border-border/60">
        <nav className="container flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <img
              src={logoTamoios}
              alt="Tamoios Tecnologia"
              width={140}
              height={48}
              className="h-10 w-auto"
            />
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#solucoes" className="hover:text-forest transition-colors">Soluções</a>
            <a href="#agro" className="hover:text-forest transition-colors">Agro & Florestal</a>
            <a href="#impacto" className="hover:text-forest transition-colors">Impacto</a>
            <a href="#cases" className="hover:text-forest transition-colors">Cases</a>
            <a href="#manifesto" className="hover:text-forest transition-colors">Manifesto</a>
            <a href="#contato" className="hover:text-forest transition-colors">Contato</a>
          </div>
          <Button asChild variant="forest" size="sm">
            <a href="#contato">Fale com a Tamoios</a>
          </Button>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-pulp">
        <div className="absolute inset-0 grain opacity-60" />
        <div className="container relative grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 animate-float-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/10 border border-forest/20 text-forest text-xs font-semibold tracking-wide uppercase mb-8">
              <Leaf className="h-3.5 w-3.5" /> Tecnologia em biomassa
            </span>
            <h1 className="font-display font-semibold text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-forest-deep text-balance mb-8">
              A Revolução sem Isopor:
              <span className="block italic text-leaf font-normal mt-2">
                Máximo Frescor no Varejo
              </span>
              <span className="block">e Proteção Absoluta na Logística.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
              Desenvolvimento tecnológico de biomassa de alta densidade. Substituímos
              polímeros petroquímicos por soluções <strong className="text-forest">100% recicláveis e compostáveis</strong>.
              Sustentabilidade de ponta a ponta, dos produtos às pessoas.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Button asChild variant="forest" size="xl">
                <a href="#solucoes">
                  Conhecer soluções <ArrowRight className="ml-1" />
                </a>
              </Button>
              <Button asChild variant="outline" size="xl">
                <a href="#manifesto">Ler o manifesto</a>
              </Button>
              <Button asChild variant="ghost" size="xl" className="text-forest hover:text-forest-deep">
                <a href="/docs/Tamoios-Apresentacao-Institucional.pptx" download>
                  <Download /> Baixar apresentação
                </a>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5 relative animate-float-up" style={{ animationDelay: "0.15s" }}>
            <div className="relative rounded-3xl overflow-hidden shadow-deep">
                <img
                  src={heroImg}
                  alt="Bandeja Tamoios de polpa de celulose com tomates frescos no cacho"
                width={1600}
                height={1200}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-forest text-primary-foreground rounded-2xl p-5 shadow-deep max-w-[230px] hidden md:block">
              <div className="text-xs uppercase tracking-widest opacity-80 mb-1">Efeito Escarola</div>
              <div className="font-display text-2xl leading-tight">
                +50% de vida<br />de prateleira
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUÇÕES — Vitrine dupla */}
      <section id="solucoes" className="py-24 md:py-32">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Soluções Tamoios</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4 leading-tight text-forest-deep text-balance">
              Duas frentes, uma mesma matéria-prima:
              <em className="text-leaf font-normal"> a polpa de celulose.</em>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Varejo */}
            <article className="group rounded-3xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-deep transition-all duration-500">
              <div className="aspect-[4/3] overflow-hidden bg-pulp-light">
                <img
                  src={varejoImg}
                  alt="Gôndola de supermercado com bandejas Tamoios de vagens, batatas e hortifruti embaladas"
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-2 text-leaf font-semibold text-xs tracking-widest uppercase mb-4">
                  <Leaf className="h-4 w-4" /> Varejo & Agro
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-forest-deep mb-4 leading-snug">
                  Bandejas para FLV: Mais Tempo de Prateleira, Menos Perdas no Seu Caixa.
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  O setor de Frutas, Legumes e Verduras lidera as perdas no varejo
                  (<strong className="text-foreground">65% das quebras</strong>). Nossas Embalagens
                  Ativas Compostáveis absorvem a umidade e geram o <em>"Efeito Escarola"</em>,
                  estendendo a vida de prateleira em <strong className="text-forest">até 50%</strong>.
                </p>
                <Button asChild variant="forest" size="lg">
                  <a href="#contato">Conhecer Linha de Bandejas <ArrowRight /></a>
                </Button>
              </div>
            </article>

            {/* Indústria */}
            <article className="group rounded-3xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-deep transition-all duration-500">
              <div className="aspect-[4/3] overflow-hidden bg-pulp-light">
                <img
                  src={industriaImg}
                  alt="Calços técnicos Tamoios em polpa moldada para proteção de garrafas no transporte"
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-2 text-leaf font-semibold text-xs tracking-widest uppercase mb-4">
                  <Factory className="h-4 w-4" /> Indústria & Logística
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-forest-deep mb-4 leading-snug">
                  Calços Técnicos: Proteção Absoluta Sob Medida.
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Graças ao nosso processo de <strong className="text-foreground">alto vácuo</strong>,
                  a polpa Tamoios entrega o maior índice de proteção contra impactos para transporte.
                  Projetos perfeitos para autopeças, móveis, bebidas e e-commerce.
                </p>
                <Button asChild variant="forest" size="lg">
                  <a href="#contato">Conhecer Soluções Industriais <ArrowRight /></a>
                </Button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* GALERIA DE PRODUTOS REAIS */}
      <section id="galeria" className="py-24 md:py-32 bg-pulp-light/40 border-y border-border">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Produtos em uso</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4 leading-tight text-forest-deep text-balance">
              Da fábrica para a gôndola.
              <em className="block text-leaf font-normal">Bandejas reais, frescor real.</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: produtoAlfaceImg, title: "Alface Americana", sub: "Bandeja funda · contém umidade da folha" },
              { img: produtoMiniImg, title: "Mini Alface / Folhosos", sub: "Bandeja alta · proteção e respiração" },
              { img: produtoTomatesImg, title: "Tomates no Cacho", sub: "Bandeja rasa · suporte e exposição premium" },
            ].map((p) => (
              <article
                key={p.title}
                className="group rounded-2xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-deep transition-all duration-500"
              >
                <div className="aspect-[4/5] overflow-hidden bg-pulp-light">
                  <img
                    src={p.img}
                    alt={`Bandeja Tamoios de polpa de celulose com ${p.title.toLowerCase()}`}
                    width={1200}
                    height={1500}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-forest-deep mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.sub}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AGRO & FLORESTAL */}
      <section id="agro" className="py-24 md:py-32 bg-background">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Agro & Florestal</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4 leading-tight text-forest-deep text-balance">
              Da floresta para a floresta:
              <em className="block text-leaf font-normal">polpa que vira raiz.</em>
            </h2>
            <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
              Novas frentes em desenvolvimento Tamoios — substituindo plástico em mudas,
              hidroponia, reflorestamento e silvicultura.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {agroLinhas.map((l) => (
              <article
                key={l.title}
                className="group rounded-3xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-deep transition-all duration-500"
              >
                <div className="aspect-[16/10] overflow-hidden bg-pulp-light">
                  <img
                    src={l.img}
                    alt={l.title}
                    width={1600}
                    height={1000}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-2 text-leaf font-semibold text-xs tracking-widest uppercase mb-4">
                    <l.icon className="h-4 w-4" /> {l.tag}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-forest-deep mb-4 leading-snug">
                    {l.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{l.desc}</p>
                  <ul className="space-y-2 mb-2">
                    {l.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-leaf mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          {/* Mini-grid Indústria expandida */}
          <div className="mt-20">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
              <div>
                <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Polpa Moldada · Indústria</span>
                <h3 className="font-display text-3xl md:text-4xl font-semibold mt-3 text-forest-deep leading-tight">
                  Outras aplicações industriais.
                </h3>
              </div>
              <Button asChild variant="outline">
                <a href="/docs/Tamoios-Apresentacao-Institucional.pptx" download>
                  <Download /> Catálogo industrial (.pptx)
                </a>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {industriaLinhas.map((l) => (
                <article
                  key={l.title}
                  className="rounded-2xl overflow-hidden bg-card border border-border flex flex-col md:flex-row hover:border-forest/40 transition-colors"
                >
                  <div className="md:w-2/5 aspect-[4/3] md:aspect-auto bg-pulp-light overflow-hidden">
                    <img
                      src={l.img}
                      alt={l.title}
                      width={800}
                      height={600}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-7 flex-1">
                    <div className="flex items-center gap-2 text-leaf font-semibold text-xs tracking-widest uppercase mb-3">
                      <l.icon className="h-4 w-4" /> {l.tag}
                    </div>
                    <h4 className="font-display text-xl font-semibold text-forest-deep mb-3 leading-snug">
                      {l.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{l.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CREDENCIAIS / SELO */}
      <section className="py-12 md:py-16 bg-forest-deep text-primary-foreground border-y border-forest">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-10">
            <div className="lg:w-1/3">
              <span className="text-leaf font-semibold text-xs tracking-widest uppercase">Selo Tamoios</span>
              <h3 className="font-display text-2xl md:text-3xl font-semibold mt-2 leading-tight">
                A embalagem mais sustentável do Brasil.
              </h3>
            </div>
            <div className="flex-1 flex flex-wrap gap-2.5">
              {credenciais.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm text-primary-foreground/95 font-medium"
                >
                  <CheckCircle2 className="h-4 w-4 text-leaf" /> {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="impacto" className="py-24 md:py-32 bg-forest text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-20" />
        <div className="container relative">
          <div className="max-w-2xl mb-16">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Impactômetro</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4 leading-tight text-balance">
              Cada bandeja é um número que muda o Brasil.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-primary-foreground/10 rounded-3xl overflow-hidden border border-primary-foreground/10">
            {impacto.map((d) => (
              <div key={d.label} className="bg-forest p-10 md:p-12 flex flex-col">
                <d.icon className="h-8 w-8 text-leaf mb-8" strokeWidth={1.6} />
                <div className="font-display text-6xl md:text-7xl font-semibold leading-none mb-4 text-cream">
                  {d.value}
                </div>
                <div className="text-primary-foreground/80 leading-relaxed text-base">
                  {d.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="py-24 md:py-32 bg-pulp-light">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Cases & Validação</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4 leading-tight text-forest-deep text-balance">
              Soluções validadas pelo mercado.
            </h2>
            <p className="text-lg text-muted-foreground mt-6">
              Resultados reais de quem escolheu eliminar o isopor e o plástico.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {cases.map((c) => (
              <article
                key={c.name}
                className="rounded-2xl bg-card border border-border p-8 flex flex-col justify-between min-h-[280px] hover:border-forest/40 transition-colors"
              >
                <div>
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-earth mb-4">
                    {c.tag}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-forest-deep leading-tight">
                    {c.name}
                  </h3>
                </div>
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="font-display text-5xl font-semibold text-leaf leading-none mb-2">
                    {c.metric}
                  </div>
                  <div className="text-sm text-muted-foreground">{c.label}</div>
                </div>
              </article>
            ))}
          </div>

          <figure className="mt-12 rounded-2xl bg-forest/5 border border-forest/15 p-8 md:p-10 flex flex-col md:flex-row items-start gap-6">
            <Quote className="h-10 w-10 text-leaf shrink-0" />
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-leaf mb-2">
                Destaque de inovação
              </div>
              <blockquote className="font-display text-xl md:text-2xl text-forest-deep leading-snug">
                Rodadas de Ensaio de Vida de Prateleira (EVP) operadas em parceria com a
                rede <strong>Carrefour</strong> e a <strong>Hortmix</strong>.
              </blockquote>
            </div>
          </figure>
        </div>
      </section>

      {/* MANIFESTO */}
      <section id="manifesto" className="py-24 md:py-32 relative overflow-hidden">
        <div className="container grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            <div className="rounded-3xl overflow-hidden shadow-deep">
              <img
                src={socialImg}
                alt="Mulheres trabalhando na linha de produção da Tamoios em Itariri-SP"
                width={1600}
                height={1100}
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-6 bg-leaf text-primary-foreground rounded-2xl p-5 shadow-leaf max-w-[220px] hidden md:block">
              <div className="font-display text-3xl leading-none mb-1">80%</div>
              <div className="text-xs leading-snug opacity-95">
                de mulheres da região na linha de produção
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Manifesto Tamoios</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4 mb-8 leading-tight text-forest-deep text-balance">
              A embalagem mais sustentável do Brasil
              <em className="block text-leaf font-normal"> começa nas pessoas.</em>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Instalada no Distrito de Ana Dias (Itariri/SP), uma região de alta vulnerabilidade,
              a Tamoios orgulha-se de ser a <strong className="text-forest">maior empregadora feminina local</strong>.
              Nossa tecnologia utiliza aparas de papelão pré-uso 100% limpas. Sem uso de "resíduo sujo".
              Produtos recicláveis, compostáveis, biodegradáveis e operando com tecnologia de
              secagem elétrica para descarbonização.
            </p>
            <ul className="space-y-3">
              {[
                "100% reciclável, compostável e biodegradável",
                "Aparas de papelão pré-uso — sem resíduo sujo",
                "Secagem elétrica para descarbonização",
                "Maior empregadora feminina de Ana Dias (Itariri/SP)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-leaf mt-0.5 shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ECOSSISTEMA */}
      <section className="py-20 md:py-24 bg-secondary border-y border-border">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Ecossistema de confiança</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-4 text-forest-deep">
              Nosso Ecossistema de Inovação.
            </h2>
          </div>
          <div className="overflow-hidden">
            <div className="flex gap-4 marquee w-max">
              {[...ecossistema, ...ecossistema].map((logo, i) => (
                <div
                  key={i}
                  className="shrink-0 px-8 py-6 rounded-xl bg-card border border-border min-w-[260px] flex items-center justify-center text-center"
                >
                  <span className="font-display text-lg text-forest-deep">{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO / CTA */}
      <section id="contato" className="py-24 md:py-32 bg-gradient-hero text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-20" />
        <div className="container relative max-w-4xl text-center">
          <span className="inline-block text-leaf font-semibold text-sm tracking-widest uppercase mb-6">
            Vamos transformar
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-semibold leading-tight text-balance mb-8">
            Pronto para eliminar o isopor da sua operação?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl mx-auto mb-12 leading-relaxed">
            Receba uma proposta sob medida com simulação de ganho em vida de prateleira ou
            performance logística. Resposta em até 24 horas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild variant="leaf" size="xl">
              <a href="mailto:rafael@tamoiostecnologia.com.br">
                Solicitar proposta <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="outline" size="xl" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <a href="https://wa.me/5511982712685" target="_blank" rel="noopener">
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-forest-deep text-primary-foreground/80 py-16">
        <div className="container grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 font-display font-bold text-lg text-primary-foreground mb-3">
              <span className="h-9 w-9 rounded-full bg-leaf grid place-items-center">
                <Leaf className="h-4.5 w-4.5" strokeWidth={2.2} />
              </span>
              Tamoios
            </div>
            <p className="text-sm leading-relaxed">
              Tamoios Tecnologia — Inovação em Biomassa.
              <br />Substituindo o isopor por polpa, do varejo à logística.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-leaf font-semibold mb-4">Contato</div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-leaf" />
                <a href="mailto:rafael@tamoiostecnologia.com.br" className="hover:text-primary-foreground transition-colors">
                  rafael@tamoiostecnologia.com.br
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-leaf" />
                <a href="tel:+5511982712685" className="hover:text-primary-foreground transition-colors">
                  +55 11 98271 2685
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="h-4 w-4 text-leaf" />
                <a href="https://instagram.com/tamoios_tecnologia" target="_blank" rel="noopener" className="hover:text-primary-foreground transition-colors">
                  @tamoios_tecnologia
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-leaf" />
                <span>Ana Dias · Itariri/SP · Brasil</span>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-leaf font-semibold mb-4">Navegação</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#solucoes" className="hover:text-primary-foreground transition-colors">Soluções</a></li>
              <li><a href="#impacto" className="hover:text-primary-foreground transition-colors">Impacto</a></li>
              <li><a href="#cases" className="hover:text-primary-foreground transition-colors">Cases</a></li>
              <li><a href="#manifesto" className="hover:text-primary-foreground transition-colors">Manifesto</a></li>
              <li><a href="#contato" className="hover:text-primary-foreground transition-colors">Contato</a></li>
            </ul>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t border-primary-foreground/10 text-xs flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Tamoios Tecnologia. Todos os direitos reservados.</span>
          <span>Embalagem com propósito · Itariri-SP</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
