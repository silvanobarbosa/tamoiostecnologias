import { useState } from "react";
import { Link } from "react-router-dom";
import { Download, Copy, Check, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SEO } from "@/components/SEO";
import guide from "@/lib/brand-guide.json";
import logo from "@/assets/tamoios-logo-badge.png";
import product from "@/assets/bandeja-tomates.jpg";

const swatches: Record<string, string> = {
  forest: "bg-forest", "forest-deep": "bg-forest-deep", leaf: "bg-leaf", gold: "bg-accent", pulp: "bg-pulp", "pulp-light": "bg-pulp-light", earth: "bg-earth", cream: "bg-cream", background: "bg-background", foreground: "bg-foreground", "muted-foreground": "bg-muted-foreground", border: "bg-border",
};
const files = "/docs/identidade/";

export default function IdentidadeVisual() {
  const [copied, setCopied] = useState<string | null>(null);
  const [copyError, setCopyError] = useState(false);
  async function copy(title: string, text: string) {
    try { await navigator.clipboard.writeText(text); setCopied(title); setCopyError(false); }
    catch { setCopyError(true); }
  }
  return <div className="min-h-screen bg-background">
    <SEO title="Guia de identidade visual · Tamoios" description="Padrões de marca, cores, Fraunces e Inter, fotografia e prompts de IA. Baixe o guia em PDF e o modelo comercial editável em PowerPoint." />
    <SiteHeader />
    <main className="pt-20">
      <section className="container py-14 md:py-20">
        <div className="flex items-start justify-between gap-6 border-b border-border pb-8">
          <div><p className="text-sm font-semibold uppercase text-leaf">Sistema de marca · {guide.version}</p><h1 className="mt-4 text-4xl md:text-6xl font-semibold text-forest-deep">Identidade visual<br /><em className="font-normal text-leaf">Tamoios Tecnologia.</em></h1></div>
          <img src={logo} alt="Logo oficial Tamoios Tecnologia" className="hidden sm:block w-32 h-32 object-contain" />
        </div>
        <p className="max-w-2xl mt-8 text-lg leading-relaxed text-muted-foreground">{guide.principle}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild><a href={`${files}tamoios-guia-identidade.pdf`} download><Download className="h-4 w-4" /> Guia PDF</a></Button>
          <Button asChild variant="outline"><Link to="/modelo-slides"><ArrowUpRight className="h-4 w-4" /> Abrir Tamoios Slides</Link></Button>
          <Button asChild variant="outline"><a href={`${files}tamoios-template-comercial-v2.pptx`} download><Download className="h-4 w-4" /> PowerPoint · 24 modelos</a></Button>
          <Button asChild variant="ghost"><a href="#ia">Prompts de IA <ArrowUpRight className="h-4 w-4" /></a></Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Padrões extraídos do site. Medidas para redes sociais, proteção da marca e apresentações são recomendações de aplicação.</p>
      </section>
      <section className="bg-pulp-light/50 border-y border-border py-16"><div className="container">
        <h2 className="text-3xl md:text-4xl text-forest-deep">01 / Paleta</h2>
        <p className="mt-4 text-muted-foreground">Verdes estruturam a marca; creme dá respiro; dourado é acento, não fundo dominante. Valores HEX convertidos dos padrões HSL do site.</p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">{guide.colors.map(c => <div key={c.name}><div className={`h-24 border border-border rounded-lg ${swatches[c.name]}`} /><div className="mt-3 flex flex-wrap justify-between gap-2"><span className="font-semibold text-sm">{c.name}</span><code className="text-sm">{c.hex}</code></div><p className="mt-1 text-sm text-muted-foreground">{c.role}</p></div>)}</div>
        <div className="mt-10 grid md:grid-cols-3 gap-6"><div className="bg-gradient-hero p-6 text-primary-foreground rounded-lg">Floresta → profundo<br /><span className="text-sm">Capa e encerramento</span></div><div className="bg-gradient-pulp p-6 rounded-lg border border-border">Creme → polpa<br /><span className="text-sm">Transições e faixas claras</span></div><div className="bg-gradient-gold p-6 rounded-lg text-accent-foreground">Dourado pontual<br /><span className="text-sm">Pequenos destaques</span></div></div>
      </div></section>
      <section className="container py-16"><h2 className="text-3xl md:text-4xl text-forest-deep">02 / Tipografia</h2><div className="mt-8 grid md:grid-cols-2 gap-12">{guide.typography.map(f => <article key={f.name}><h3 className={`text-5xl ${f.name === "Fraunces" ? "font-display" : "font-sans"}`}>{f.name}</h3><p className="mt-4 font-medium">{f.role}</p><p className="mt-2 text-sm text-muted-foreground">Pesos: {f.weight}</p><dl className="mt-6 space-y-4">{[["Site",f.site],["Redes sociais · 1080 px",f.social],["PowerPoint · 16:9",f.ppt]].map(([name,value]) => <div key={name}><dt className="text-sm font-semibold text-leaf">{name}</dt><dd className="mt-1">{value}</dd></div>)}</dl><p className="mt-6 text-sm text-muted-foreground">{f.rule}</p><Button asChild variant="link" className="mt-2 px-0"><a href={`https://fonts.google.com/specimen/${f.name}`} target="_blank" rel="noreferrer">Obter {f.name} <ArrowUpRight className="h-4 w-4" /></a></Button></article>)}</div></section>
      <section className="bg-secondary/50 py-16"><div className="container"><h2 className="text-3xl md:text-4xl text-forest-deep">03 / Marca, formas e imagens</h2><div className="mt-8 grid md:grid-cols-2 gap-x-12 gap-y-8">{guide.rules.map(r => <article key={r.title} className="border-t border-border pt-5"><h3 className="text-xl font-semibold">{r.title}</h3><p className="mt-3 text-muted-foreground leading-relaxed">{r.body}</p></article>)}</div></div></section>
      <section className="container py-16"><h2 className="text-3xl md:text-4xl text-forest-deep">04 / Aplicações</h2><div className="mt-8 grid md:grid-cols-2 gap-10"><div><div className="grid gap-6">{guide.formats.map(f => <article key={f.name} className="border-b border-border pb-5"><h3 className="text-xl font-semibold">{f.name}</h3><p className="text-leaf font-medium mt-1">{f.size}</p><p className="mt-3 text-muted-foreground">{f.detail}</p></article>)}</div><p className="mt-6 text-sm text-muted-foreground">Carrossel sugerido: capa → contexto → produto → benefício validado → contato. LinkedIn: imagem 4:5 ou carrossel em PDF, conferindo a prévia antes da publicação.</p></div><figure className="self-start max-w-sm w-full mx-auto"><div className="aspect-[4/5] bg-forest-deep text-primary-foreground overflow-hidden flex flex-col rounded-lg"><div className="p-7"><p className="font-sans text-xs uppercase">Linha FLV</p><h3 className="text-3xl mt-3">Da fibra<br />à embalagem.</h3></div><img src={product} alt="Bandeja Tamoios com tomates, exemplo de composição" className="min-h-0 flex-1 object-contain bg-pulp-light" /><div className="p-4 bg-cream flex items-center justify-between gap-4"><img src={logo} alt="Tamoios" className="h-16 w-16 object-contain" /><span className="text-forest text-sm">Reciclado. Reciclável.</span></div></div><figcaption className="mt-3 text-sm text-muted-foreground">Referência de composição · foto fornecida, título editorial e marca separada do produto.</figcaption></figure></div></section>
      <section id="ia" className="scroll-mt-24 bg-pulp-light/50 py-16 border-y border-border"><div className="container"><h2 className="text-3xl md:text-4xl text-forest-deep">05 / Imagens por IA</h2><p className="mt-4 text-muted-foreground">Gerar a imagem primeiro; aplicar o logo oficial e a tipografia depois. Substitua os campos entre colchetes.</p><div className="mt-8 space-y-8">{guide.prompts.map(p => <article key={p.title} className="border-t border-border pt-6"><div className="flex items-center justify-between gap-4"><h3 className="text-xl font-semibold">{p.title}</h3><Button variant="outline" size="sm" onClick={() => copy(p.title,p.text)}>{copied === p.title ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied === p.title ? "Copiado" : "Copiar"}</Button></div><p className="mt-4 leading-relaxed text-muted-foreground select-text">{p.text}</p></article>)}</div>{copyError && <p role="alert" className="mt-4 text-destructive">Não foi possível copiar. Selecione o texto acima e copie manualmente.</p>}</div></section>
      <section className="container py-16"><h2 className="text-3xl md:text-4xl text-forest-deep">06 / Antes de publicar</h2><ul className="mt-8 grid md:grid-cols-2 gap-4">{guide.checklist.map(item => <li key={item} className="flex gap-3"><Check className="h-5 w-5 shrink-0 text-leaf" /><span>{item}</span></li>)}</ul><p className="mt-8 text-muted-foreground">O Tamoios Slides reúne 24 modelos: capas, seções, portfólio, fotos panorâmicas, comparativos, mosaicos, indicadores, gráficos, tabela técnica, processo, cronograma, cases, proposta e contato. Campos sem dados aparecem entre colchetes. O PowerPoint preserva textos e formas editáveis; instale Fraunces e Inter. As alterações feitas no navegador são locais e entram no PDF; o download PowerPoint contém os modelos originais.</p></section>
    </main><SiteFooter />
  </div>;
}