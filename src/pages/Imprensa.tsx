import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Mail, MessageCircle, ArrowRight, FileText, Image as ImageIcon, Quote } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import logoTamoios from "@/assets/tamoios-logo.png";

const fastFacts = [
  { label: "Inauguração", value: "2014" },
  { label: "Sede", value: "Itariri-SP" },
  { label: "Equipe fábrica", value: "80% mulheres" },
  { label: "Matéria-prima", value: "100% reciclada" },
];

const bioShort = "Tamoios Tecnologia desenvolve embalagens de alta densidade em polpa de celulose biodegradável, substituindo o isopor e o plástico de uso único no varejo, indústria e agro brasileiro.";

const bioLong = [
  "A Tamoios Tecnologia é uma indústria brasileira de tecnologia em biomassa fundada para resolver um dos problemas mais persistentes do varejo e da logística nacional: a dependência do poliestireno expandido (isopor) e de plásticos virgens de uso único. A partir de papel e papelão reciclados, a empresa produz, em sua planta em Itariri-SP, bandejas para frutas, legumes e verduras (FLV), calços técnicos industriais e tubetes biodegradáveis para reflorestamento.",
  "Com processo proprietário de alto vácuo, a Tamoios entrega densidade variável em peças moldadas tridimensionalmente, com performance comparável ou superior ao EPS — incluindo o chamado \"Efeito Escarola\", que pode estender em até 50% a vida de prateleira de hortifruti. Mais de 80% da equipe de fábrica é formada por mulheres da região do Vale do Ribeira, uma das áreas de menor IDH do estado de São Paulo. Entre clientes e parceiros validadores estão Carrefour, Hortmix, Belterra, Agroadubo, Quintessa e BNDES Garagem.",
];

const photos = [
  { src: "/docs/imprensa/fotos/equipe-itariri.jpg", title: "Equipe da fábrica · Itariri-SP" },
  { src: "/docs/imprensa/fotos/bandejas-produtos.jpg", title: "Linha de bandejas FLV" },
  { src: "/docs/imprensa/fotos/calcos-tecnicos.jpg", title: "Calços técnicos para indústria" },
  { src: "/docs/imprensa/fotos/tubetes-mudas.jpg", title: "Tubetes para reflorestamento" },
];

const logos = [
  { src: "/docs/imprensa/logos/tamoios-logo-horizontal.png", title: "Logo horizontal", bg: "bg-cream" },
  { src: "/docs/imprensa/logos/tamoios-logo-badge.png", title: "Logo selo", bg: "bg-forest-deep" },
];

function copyText(text: string) {
  navigator.clipboard.writeText(text);
}

const Imprensa = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Imprensa — Tamoios Tecnologia · Press Kit, Logos e Contato"
        description="Press kit completo da Tamoios Tecnologia: bio oficial, fatos rápidos, logomarca em alta resolução, fotos para imprensa e contato direto."
      />
      <SiteHeader />

      {/* HERO */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-pulp relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-50" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/10 border border-forest/20 text-forest text-xs font-semibold tracking-wide uppercase mb-6">
              <FileText className="h-3.5 w-3.5" /> Press Kit
            </span>
            <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.05] text-forest-deep text-balance mb-6">
              Sala de imprensa<br />
              <em className="text-leaf font-normal">da Tamoios Tecnologia.</em>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8">
              Tudo o que jornalistas, criadores de conteúdo e parceiros precisam para falar sobre a Tamoios — bio oficial, fatos rápidos, logomarca, fotos hi-res e contato direto.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="forest" size="xl">
                <a href="/#contato">
                  <Mail /> Falar com a assessoria
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAST FACTS */}
      <section className="py-16 md:py-20 bg-background border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {fastFacts.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{f.label}</div>
                <div className="font-display text-2xl md:text-3xl font-semibold text-forest-deep leading-tight">{f.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BIO */}
      <section className="py-20 md:py-28">
        <div className="container grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Bio oficial</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3 leading-tight text-forest-deep">
              Texto pronto para publicação.
            </h2>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Use as versões abaixo livremente em matérias, releases e perfis. Clique em "Copiar" para levar o texto direto para o seu CMS.
            </p>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <article className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs uppercase tracking-widest text-leaf font-semibold">Bio curta · 1 frase</div>
                <Button size="sm" variant="ghost" onClick={() => copyText(bioShort)}>Copiar</Button>
              </div>
              <p className="text-foreground leading-relaxed">{bioShort}</p>
            </article>
            <article className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs uppercase tracking-widest text-leaf font-semibold">Bio média · 2 parágrafos</div>
                <Button size="sm" variant="ghost" onClick={() => copyText(bioLong.join("\n\n"))}>Copiar</Button>
              </div>
              <div className="space-y-4 text-foreground leading-relaxed">
                {bioLong.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="py-20 md:py-28 bg-pulp-light/40 border-y border-border">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Logomarca</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3 leading-tight text-forest-deep">
              Use com crédito.<br />
              <em className="text-leaf font-normal">Não distorça, não recolore.</em>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {logos.map((logo) => (
              <article key={logo.title} className="rounded-2xl bg-card border border-border overflow-hidden shadow-soft">
                <div className={`${logo.bg} aspect-[16/9] flex items-center justify-center p-12`}>
                  <img src={logo.src} alt={logo.title} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <div className="font-display text-lg font-semibold text-forest-deep">{logo.title}</div>
                    <div className="text-xs text-muted-foreground">PNG · alta resolução</div>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <a href={logo.src} download>
                      <Download className="h-4 w-4" /> Baixar
                    </a>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTOS */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Fotos para imprensa</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3 leading-tight text-forest-deep">
              Fábrica, produtos e equipe<br />
              <em className="text-leaf font-normal">em alta resolução.</em>
            </h2>
            <p className="text-muted-foreground mt-4">
              Crédito obrigatório: <strong className="text-foreground">Divulgação / Tamoios Tecnologia</strong>.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {photos.map((p, i) => (
              <motion.article
                key={p.src}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group rounded-2xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-deep transition-all"
              >
                <div className="aspect-[4/5] overflow-hidden bg-pulp-light">
                  <img src={p.src} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-4 flex items-center justify-between gap-2">
                  <span className="text-sm text-foreground line-clamp-1">{p.title}</span>
                  <Button asChild size="sm" variant="ghost">
                    <a href={p.src} download>
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* PORTA-VOZES */}
      <section className="py-20 md:py-28 bg-forest text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Porta-vozes</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3 leading-tight text-balance">
              Disponíveis para entrevistas, painéis e podcasts.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Rafael Falci", role: "Co-fundador e CEO", topics: "Tecnologia de biomassa, regulação ENEC, escala industrial" },
              { name: "Fernanda Cano", role: "Co-fundadora e CCO", topics: "ESG, impacto social, parcerias com varejo" },
            ].map((p) => (
              <article key={p.name} className="rounded-2xl bg-forest-deep/40 border border-primary-foreground/10 p-8">
                <Quote className="h-6 w-6 text-leaf mb-4" />
                <div className="font-display text-2xl font-semibold mb-1">{p.name}</div>
                <div className="text-leaf text-sm font-semibold mb-4">{p.role}</div>
                <div className="text-primary-foreground/80 text-sm leading-relaxed">
                  <strong className="text-primary-foreground">Pode falar sobre:</strong> {p.topics}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="py-20 md:py-28">
        <div className="container">
          <div className="rounded-3xl bg-gradient-pulp border border-border p-10 md:p-16 text-center max-w-3xl mx-auto">
            <ImageIcon className="h-10 w-10 text-forest mx-auto mb-6" strokeWidth={1.4} />
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-forest-deep mb-4 leading-tight">
              Está cobrindo uma pauta?<br />
              <em className="text-leaf font-normal">Falamos com você no mesmo dia.</em>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Para entrevistas, dados exclusivos, visitas à fábrica em Itariri ou imagens sob demanda, fale com a nossa assessoria.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="forest" size="lg">
                <a href="mailto:imprensa@tamoiostecnologia.com.br">
                  <Mail /> imprensa@tamoiostecnologia.com.br
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://wa.me/5511940066986?text=Ol%C3%A1%2C+sou+jornalista+e+gostaria+de+falar+com+a+Tamoios." target="_blank" rel="noopener">
                  <MessageCircle /> WhatsApp da assessoria
                </a>
              </Button>
            </div>
            <div className="mt-8 pt-8 border-t border-border/60">
              <Button asChild variant="ghost">
                <Link to="/materiais">
                  Ver também portfólio e materiais comerciais <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Imprensa;
