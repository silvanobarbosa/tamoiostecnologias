import heroImg from "@/assets/hero-tamoios.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Cloud, Compass, ShieldCheck, Sparkles, Zap, Quote, Mail, MapPin, Phone } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Software Sob Medida",
    desc: "Sistemas web, aplicativos e plataformas construídos para o seu negócio — do MVP ao produto em escala.",
  },
  {
    icon: Cloud,
    title: "Cloud & Infraestrutura",
    desc: "Arquiteturas resilientes em AWS, GCP e Azure. Migração, observabilidade e otimização de custos.",
  },
  {
    icon: Compass,
    title: "Consultoria Digital",
    desc: "Diagnóstico, roadmap e modernização. Levamos a sua operação para o próximo patamar tecnológico.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança & Compliance",
    desc: "LGPD, ISO 27001 e proteção contínua. Sua operação blindada do código à infraestrutura.",
  },
  {
    icon: Sparkles,
    title: "IA & Automação",
    desc: "Agentes inteligentes, integrações e fluxos automatizados que liberam o time para o que importa.",
  },
  {
    icon: Zap,
    title: "Squads Sob Demanda",
    desc: "Times multidisciplinares plugados ao seu produto, entregando com ritmo e qualidade.",
  },
];

const cases = [
  { tag: "Fintech", title: "Plataforma de crédito digital", metric: "+312%", label: "originação em 8 meses" },
  { tag: "Logística", title: "Roteirização inteligente", metric: "−28%", label: "custo operacional" },
  { tag: "Varejo", title: "Omnichannel headless", metric: "4.9★", label: "NPS após relançamento" },
];

const testimonials = [
  {
    quote: "A Tamoios entregou em 90 dias o que outras prometeram em um ano. Time sênior e parceiro de verdade.",
    name: "Camila Furtado",
    role: "CTO, Vela Capital",
  },
  {
    quote: "Reduzimos 40% do custo de cloud sem perder performance. Resultado claro, comunicação impecável.",
    name: "Rodrigo Mendes",
    role: "Head de Engenharia, Norte Logística",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
        <nav className="container flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="h-8 w-8 rounded-lg bg-gradient-ember grid place-items-center text-background">T</span>
            <span>Tamoios<span className="text-ember">.</span></span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#servicos" className="hover:text-foreground transition-colors">Serviços</a>
            <a href="#sobre" className="hover:text-foreground transition-colors">Sobre</a>
            <a href="#cases" className="hover:text-foreground transition-colors">Cases</a>
            <a href="#contato" className="hover:text-foreground transition-colors">Contato</a>
          </div>
          <Button asChild variant="ember" size="sm">
            <a href="#contato">Fale conosco</a>
          </Button>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
        <img
          src={heroImg}
          alt="Floresta brasileira com circuitos luminosos representando tecnologia"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 pattern-tupi opacity-40" />

        <div className="container relative z-10 pt-24">
          <div className="max-w-3xl animate-float-up">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ember/30 bg-ember/10 text-ember text-xs font-medium mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse-glow" />
              Tecnologia com raiz brasileira
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6">
              Construímos o <span className="text-gradient-ember">digital</span> que move o seu negócio.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Software sob medida, infraestrutura em nuvem e consultoria estratégica.
              Da floresta de código ao topo da operação — com a força e a precisão dos Tamoios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="ember" size="xl">
                <a href="#contato">Iniciar um projeto <ArrowRight className="ml-1" /></a>
              </Button>
              <Button asChild variant="outline" size="xl">
                <a href="#servicos">Conhecer serviços</a>
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl">
              {[
                { n: "120+", l: "Projetos entregues" },
                { n: "98%", l: "Retenção de clientes" },
                { n: "12anos", l: "De jornada" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl md:text-4xl font-bold text-gradient-hero">{s.n}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-24 md:py-32 relative">
        <div className="container grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-ember font-medium text-sm tracking-widest uppercase">Quem somos</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
              Uma confederação de especialistas em tecnologia.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              O nome <strong className="text-foreground">Tamoios</strong> vem do tupi <em>tamuya</em> — "os mais velhos, os ancestrais".
              Trazemos essa sabedoria para o digital: experiência sólida, decisões pensadas
              e entregas que duram.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Somos engenheiros, designers e estrategistas que acreditam que tecnologia bem-feita
              é aquela que conversa com o negócio, com as pessoas e com o tempo.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { t: "Senioridade", d: "Time com média de 8+ anos em produto digital." },
              { t: "Transparência", d: "Você acompanha cada decisão e métrica." },
              { t: "Velocidade", d: "Sprints curtos, valor entregue cedo." },
              { t: "Compromisso", d: "Parceria de longo prazo, não vendor de fôlego curto." },
            ].map((v) => (
              <div key={v.t} className="rounded-xl border border-border bg-card/50 p-6 hover:border-ember/40 transition-colors">
                <div className="text-ember font-display font-bold text-xl mb-2">{v.t}</div>
                <div className="text-sm text-muted-foreground">{v.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 pattern-tupi opacity-30" />
        <div className="container relative">
          <div className="max-w-2xl mb-16">
            <span className="text-ember font-medium text-sm tracking-widest uppercase">O que fazemos</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
              Soluções completas, do código ao crescimento.
            </h2>
            <p className="text-muted-foreground text-lg">
              Cada serviço é desenhado para se conectar com o anterior — a sua stack inteira em harmonia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl border border-border bg-card p-8 hover:border-ember/50 hover:shadow-ember transition-all duration-500"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-ember grid place-items-center text-background mb-6 group-hover:scale-110 transition-transform">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="py-24 md:py-32">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-ember font-medium text-sm tracking-widest uppercase">Resultados</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
                Histórias que se transformaram em números.
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <article
                key={c.title}
                className="relative rounded-2xl overflow-hidden border border-border bg-card p-8 min-h-[320px] flex flex-col justify-between hover:border-ember/50 transition-colors"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-ember opacity-10 blur-3xl" />
                <div className="relative">
                  <span className="text-xs font-medium uppercase tracking-widest text-jungle">{c.tag}</span>
                  <h3 className="font-display text-2xl font-bold mt-3">{c.title}</h3>
                </div>
                <div className="relative">
                  <div className="font-display text-5xl font-bold text-gradient-ember">{c.metric}</div>
                  <div className="text-sm text-muted-foreground mt-1">{c.label}</div>
                </div>
                <span className="absolute bottom-6 right-6 text-6xl font-display font-bold text-muted-foreground/10">
                  0{i + 1}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-24 md:py-32 bg-secondary/30">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <span className="text-ember font-medium text-sm tracking-widest uppercase">Confiança</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
              Quem caminha com a Tamoios fala por nós.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border bg-card p-8 md:p-10 relative">
                <Quote className="absolute top-6 right-6 h-8 w-8 text-ember/30" />
                <blockquote className="text-lg md:text-xl leading-relaxed mb-6">"{t.quote}"</blockquote>
                <figcaption>
                  <div className="font-display font-bold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-jungle opacity-10" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-ember font-medium text-sm tracking-widest uppercase">Vamos construir</span>
            <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
              Pronto para o próximo <span className="text-gradient-ember">salto</span>?
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Conte sobre o seu desafio. Em até 24h um especialista da Tamoios entra em contato.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {[
                { icon: Mail, label: "contato@tamoiostech.com.br" },
                { icon: Phone, label: "+55 (11) 4002-8922" },
                { icon: MapPin, label: "São Paulo · Brasil" },
              ].map((c) => (
                <div key={c.label} className="rounded-xl border border-border bg-card p-5 flex items-center gap-3 justify-center">
                  <c.icon className="h-5 w-5 text-ember" />
                  <span className="text-sm">{c.label}</span>
                </div>
              ))}
            </div>

            <Button asChild variant="ember" size="xl" className="glow-ember">
              <a href="mailto:contato@tamoiostech.com.br">
                Iniciar conversa <ArrowRight className="ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-display font-bold text-foreground">
            <span className="h-6 w-6 rounded-md bg-gradient-ember grid place-items-center text-background text-xs">T</span>
            Tamoios Tecnologia
          </div>
          <div>© {new Date().getFullYear()} Tamoios Tecnologia. Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
