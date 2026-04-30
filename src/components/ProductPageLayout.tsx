import { ReactNode } from "react";
import { ArrowRight, CheckCircle2, Download, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export type ProductLine = {
  title: string;
  description: string;
  bullets?: string[];
  image: string;
  imageAlt: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

type Props = {
  eyebrow: string;
  title: string;
  highlight?: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  Icon: LucideIcon;
  badges?: string[];
  lines: ProductLine[];
  specs?: ProductSpec[];
  benefits: { icon: LucideIcon; title: string; desc: string }[];
  ctaTitle?: string;
  ctaDesc?: string;
  ctaHref?: string;
  downloadLabel?: string;
  downloadHref?: string;
  children?: ReactNode;
};

export function ProductPageLayout({
  eyebrow,
  title,
  highlight,
  intro,
  heroImage,
  heroAlt,
  Icon,
  badges = [],
  lines,
  specs,
  benefits,
  ctaTitle = "Quer uma proposta sob medida?",
  ctaDesc = "Receba simulação técnica e proposta comercial em até 24 horas.",
  ctaHref = "/#contato",
  downloadLabel,
  downloadHref,
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-pulp relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-50" />
        <div className="container relative grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/10 border border-forest/20 text-forest text-xs font-semibold tracking-widest uppercase mb-6">
              <Icon className="h-3.5 w-3.5" /> {eyebrow}
            </span>
            <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.05] tracking-tight text-forest-deep text-balance mb-6">
              {title}
              {highlight && (
                <span className="block italic text-leaf font-normal mt-2">{highlight}</span>
              )}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              {intro}
            </p>
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-border text-xs font-medium text-foreground/80"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-leaf" /> {b}
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="forest" size="xl">
                <a href={ctaHref}>Solicitar proposta <ArrowRight /></a>
              </Button>
              {downloadHref && (
                <Button asChild variant="outline" size="xl">
                  <a href={downloadHref} download>
                    <Download /> {downloadLabel ?? "Baixar catálogo"}
                  </a>
                </Button>
              )}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-deep aspect-[4/5] lg:aspect-[3/4]">
              <img
                src={heroImage}
                alt={heroAlt}
                width={1200}
                height={1500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-border bg-card p-7 hover:border-forest/40 transition-colors"
              >
                <div className="h-11 w-11 rounded-xl bg-leaf/10 grid place-items-center mb-5">
                  <b.icon className="h-5 w-5 text-leaf" />
                </div>
                <h3 className="font-display text-xl font-semibold text-forest-deep mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LINES */}
      <section className="py-20 md:py-28 bg-pulp-light/40 border-y border-border">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Linha de produtos</span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold mt-3 leading-tight text-forest-deep text-balance">
              Modelos disponíveis
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {lines.map((l) => (
              <article
                key={l.title}
                className="group rounded-3xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-deep transition-all duration-500"
              >
                <div className="aspect-[16/10] overflow-hidden bg-pulp-light">
                  <img
                    src={l.image}
                    alt={l.imageAlt}
                    width={1600}
                    height={1000}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl font-semibold text-forest-deep mb-3 leading-snug">
                    {l.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-5">{l.description}</p>
                  {l.bullets && (
                    <ul className="space-y-2">
                      {l.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                          <CheckCircle2 className="h-4 w-4 text-leaf mt-0.5 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SPECS */}
      {specs && specs.length > 0 && (
        <section className="py-20 md:py-24">
          <div className="container">
            <div className="max-w-2xl mb-10">
              <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Especificações</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3 text-forest-deep">
                Ficha técnica
              </h2>
            </div>
            <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
              {specs.map((s) => (
                <div key={s.label} className="bg-background p-6">
                  <dt className="text-xs uppercase tracking-widest text-leaf font-semibold mb-2">{s.label}</dt>
                  <dd className="font-display text-xl text-forest-deep">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {children}

      {/* CTA */}
      <section className="py-20 md:py-28 bg-gradient-hero text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-20" />
        <div className="container relative max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight text-balance mb-6">
            {ctaTitle}
          </h2>
          <p className="text-lg text-primary-foreground/85 mb-10">{ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="leaf" size="xl">
              <a href="mailto:rafael@tamoiostecnologia.com.br">Solicitar proposta <ArrowRight /></a>
            </Button>
            <Button asChild variant="outline" size="xl" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <a href="https://wa.me/5511982712685" target="_blank" rel="noopener">
                Falar no WhatsApp
              </a>
            </Button>
          </div>
          <div className="mt-10">
            <Button asChild variant="ghost" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/">← Voltar para a Home</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
