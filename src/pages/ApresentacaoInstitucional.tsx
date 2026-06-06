import { useEffect } from "react";
import { Download, Printer, Leaf, Factory, Sprout, TreePine, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { A4Document, A4Page } from "@/components/A4Page";
import { SEO } from "@/components/SEO";
import logoTamoios from "@/assets/tamoios-logo.png";
import heroImg from "@/assets/bandejas-mosaico.jpg";
import varejoImg from "@/assets/varejo-bandejas-gondola.jpg";
import industriaImg from "@/assets/calcos-garrafas.jpg";
import socialImg from "@/assets/impacto-social.jpg";
import jornadaImg from "@/assets/jornada-maos.jpg";

const ApresentacaoInstitucional = () => {
  useEffect(() => {
    document.title = "Tamoios · Apresentação Institucional";
  }, []);

  return (
    <>
      <SEO
        title="Tamoios — Apresentação Institucional"
        description="Resumo institucional da Tamoios Tecnologia: manifesto, soluções, impacto e cases. Pronto para imprimir em PDF (A4)."
      />

      {/* Toolbar visível apenas na tela */}
      <div className="a4-no-print sticky top-0 z-50 bg-forest-deep text-primary-foreground border-b border-primary-foreground/10">
        <div className="container max-w-[210mm] flex items-center justify-between gap-3 py-3">
          <Link to="/" className="inline-flex items-center gap-2 text-sm hover:opacity-80">
            <ArrowLeft className="h-4 w-4" /> Voltar ao site
          </Link>
          <div className="flex items-center gap-2 text-xs opacity-80">
            <Printer className="h-3.5 w-3.5" /> 6 páginas A4
          </div>
          <Button variant="leaf" size="sm" onClick={() => window.print()}>
            <Download className="h-4 w-4" /> Baixar PDF
          </Button>
        </div>
      </div>

      <A4Document>
        {/* PÁGINA 1 — CAPA */}
        <A4Page bleed className="flex flex-col">
          <div className="relative h-[55%] overflow-hidden">
            <img src={heroImg} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/40 via-forest-deep/10 to-background" />
            <div className="absolute top-[14mm] left-[14mm] right-[14mm] flex items-start justify-between">
              <img src={logoTamoios} alt="Tamoios" className="h-12 w-auto" />
              <div className="text-right text-xs uppercase tracking-widest text-primary-foreground/90 font-semibold">
                Apresentação<br />Institucional
              </div>
            </div>
          </div>
          <div className="flex-1 px-[14mm] py-[10mm] flex flex-col justify-between">
            <div>
              <span className="text-leaf font-semibold text-[10pt] tracking-[0.2em] uppercase">
                Tecnologia em biomassa · Tamoios
              </span>
              <h1 className="font-display text-[42pt] leading-[1.05] font-semibold text-forest-deep mt-3">
                Embalagem com<br />
                <em className="text-leaf font-normal">propósito.</em>
              </h1>
              <p className="mt-5 text-[12pt] leading-snug text-muted-foreground max-w-[150mm]">
                Substituímos plásticos e isopor por polpa moldada de alta performance,
                produzida em Itariri (SP) com biomassa local e impacto social mensurável.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-[9pt]">
              {[
                ["Reciclado", "100% fibras certificadas"],
                ["Compostável", "180 dias industrial"],
                ["Descarbonizado", "Operação verificada"],
              ].map(([t, d]) => (
                <div key={t} className="border-l-2 border-leaf pl-3">
                  <div className="font-semibold text-forest-deep uppercase tracking-wider">{t}</div>
                  <div className="text-muted-foreground mt-1">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </A4Page>

        {/* PÁGINA 2 — MANIFESTO */}
        <A4Page className="flex flex-col">
          <PageHeader title="Manifesto" subtitle="01 · Quem somos" />
          <div className="flex-1 grid grid-cols-12 gap-6 mt-6">
            <div className="col-span-7 space-y-4 text-[11.5pt] leading-relaxed text-foreground/85">
              <p>
                A Tamoios nasceu da convicção de que <strong className="text-forest-deep">embalagem
                não precisa custar caro ao planeta</strong>. Transformamos biomassa em
                soluções funcionais para o varejo, a indústria e o agro — sem plástico, sem isopor,
                sem desculpas.
              </p>
              <p>
                Operamos em Itariri, no extremo sul do litoral paulista, gerando trabalho qualificado
                em uma região historicamente vulnerável. Cada bandeja, calço ou tubete é também um
                voto por uma cadeia mais justa.
              </p>
              <p>
                Nossa tecnologia é proprietária e flexível: do design da peça à formulação da fibra,
                tudo é pensado para entregar performance superior ao plástico em durabilidade,
                proteção e apresentação.
              </p>
            </div>
            <div className="col-span-5">
              <img src={jornadaImg} alt="" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-4 gap-4">
            {[
              ["+50%", "Vida de prateleira"],
              ["100%", "Compostável"],
              ["−85%", "Pegada de carbono"],
              ["+120", "Empregos locais"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-xl bg-pulp-light p-4">
                <div className="font-display text-[22pt] text-forest-deep leading-none">{n}</div>
                <div className="text-[9pt] text-muted-foreground mt-2 uppercase tracking-wider">{l}</div>
              </div>
            ))}
          </div>
          <PageFooter n={2} />
        </A4Page>

        {/* PÁGINA 3 — SOLUÇÕES */}
        <A4Page className="flex flex-col">
          <PageHeader title="Soluções" subtitle="02 · Linhas de produto" />
          <div className="mt-6 space-y-4 flex-1">
            {[
              {
                icon: Leaf,
                title: "Bandejas FLV",
                desc: "Bandejas técnicas para frutas, legumes e verduras. Substituem o plástico em gôndola, prolongam vida de prateleira e elevam apresentação premium.",
                img: varejoImg,
              },
              {
                icon: Factory,
                title: "Calços Técnicos",
                desc: "Berços moldados sob medida para indústria: vinho, eletrônicos, autopeças. Trocam EVA, isopor e polipropileno por polpa estruturada.",
                img: industriaImg,
              },
              {
                icon: Sprout,
                title: "Agro & Florestal",
                desc: "Tubetes biodegradáveis para mudas, bandejas de hidroponia e soluções para reflorestamento — plantadas direto no solo, sem resíduo.",
                img: socialImg,
              },
            ].map((s) => (
              <div
                key={s.title}
                className="grid grid-cols-12 gap-4 rounded-xl border border-border overflow-hidden"
              >
                <div className="col-span-4 h-[42mm]">
                  <img src={s.img} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="col-span-8 py-3 pr-4">
                  <div className="flex items-center gap-2 text-leaf">
                    <s.icon className="h-4 w-4" />
                    <span className="text-[9pt] uppercase tracking-widest font-semibold">Linha</span>
                  </div>
                  <h3 className="font-display text-[16pt] text-forest-deep mt-1">{s.title}</h3>
                  <p className="text-[10.5pt] text-muted-foreground leading-snug mt-2">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <PageFooter n={3} />
        </A4Page>

        {/* PÁGINA 4 — IMPACTO */}
        <A4Page className="flex flex-col">
          <PageHeader title="Impacto" subtitle="03 · Por que a Tamoios" />
          <div className="mt-6 grid grid-cols-2 gap-4 flex-1">
            {[
              {
                t: "Ambiental",
                items: [
                  "100% fibras recicladas e compostáveis",
                  "Biomassa local — circuito curto",
                  "Operação descarbonizada e auditada",
                  "Aderente ao Decreto 12.688/2025 (Plano Nacional de Bioeconomia)",
                ],
              },
              {
                t: "Social",
                items: [
                  "Fábrica em região vulnerável (Itariri/SP)",
                  "+120 empregos diretos e formais",
                  "Programas com cooperativas e comunidades quilombolas",
                  "Parcerias com BNDES, Quintessa, Belterra",
                ],
              },
              {
                t: "Performance",
                items: [
                  "+50% de vida de prateleira (Efeito Escarola)",
                  "Proteção vertical comprovada em logística",
                  "Apresentação premium em PDV",
                  "Customização de design e formulação",
                ],
              },
              {
                t: "Regulatório",
                items: [
                  "ISO 14000 em implementação",
                  "Aderência à PNRS e Lei 14.260/2021",
                  "Alinhamento com pactos ESG globais",
                  "Rastreabilidade total da fibra",
                ],
              },
            ].map((b) => (
              <div key={b.t} className="rounded-xl border border-border p-4">
                <div className="text-[10pt] uppercase tracking-widest text-leaf font-semibold">
                  {b.t}
                </div>
                <ul className="mt-3 space-y-1.5 text-[10pt] text-foreground/80">
                  {b.items.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-leaf mt-1">●</span>
                      <span className="leading-snug">{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <PageFooter n={4} />
        </A4Page>

        {/* PÁGINA 5 — CASES */}
        <A4Page className="flex flex-col">
          <PageHeader title="Cases" subtitle="04 · Quem confia" />
          <div className="mt-6 grid grid-cols-2 gap-4 flex-1">
            {[
              {
                cliente: "Carrefour",
                desafio: "Reduzir plástico em FLV mantendo proteção e apresentação.",
                resultado: "Bandejas Tamoios em pilotos de gôndola com ganho de vida de prateleira.",
              },
              {
                cliente: "Vó Lucia (morango premium)",
                desafio: "Perdas no transporte de morango sem trocar a apresentação premium.",
                resultado: "Bandejas customizadas, perdas menores e narrativa de marca reforçada.",
              },
              {
                cliente: "BNDES & Quintessa",
                desafio: "Acelerar negócio de impacto socioambiental na bioeconomia.",
                resultado: "Tamoios selecionada como case de bioeconomia produtiva em região vulnerável.",
              },
              {
                cliente: "Belterra Agroflorestal",
                desafio: "Embalagem para mudas em sistemas agroflorestais de larga escala.",
                resultado: "Tubetes biodegradáveis plantáveis, sem resíduo plástico no campo.",
              },
            ].map((c) => (
              <div key={c.cliente} className="rounded-xl bg-pulp-light p-5">
                <div className="font-display text-[14pt] text-forest-deep">{c.cliente}</div>
                <div className="mt-3 text-[9pt] uppercase tracking-widest text-leaf font-semibold">
                  Desafio
                </div>
                <p className="text-[10pt] text-foreground/80 leading-snug mt-1">{c.desafio}</p>
                <div className="mt-3 text-[9pt] uppercase tracking-widest text-leaf font-semibold">
                  Resultado
                </div>
                <p className="text-[10pt] text-foreground/80 leading-snug mt-1">{c.resultado}</p>
              </div>
            ))}
          </div>
          <PageFooter n={5} />
        </A4Page>

        {/* PÁGINA 6 — CONTATO */}
        <A4Page className="flex flex-col bg-forest-deep text-primary-foreground">
          <div className="flex items-start justify-between">
            <img src={logoTamoios} alt="Tamoios" className="h-12 w-auto brightness-0 invert" />
            <div className="text-right text-[9pt] uppercase tracking-widest opacity-70">
              Vamos conversar
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-leaf font-semibold text-[10pt] tracking-[0.2em] uppercase">
              05 · Contato
            </span>
            <h2 className="font-display text-[40pt] leading-[1.05] font-semibold mt-3">
              Pronto para sair<br />
              <em className="text-leaf font-normal">do plástico?</em>
            </h2>
            <p className="mt-6 text-[12pt] opacity-80 max-w-[140mm]">
              Conte seu desafio de embalagem. Nosso time desenha a solução em polpa moldada
              — do protótipo à escala industrial.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 text-[11pt]">
              <div>
                <div className="text-[9pt] uppercase tracking-widest text-leaf font-semibold mb-2">
                  Comercial
                </div>
                <div>contato@tamoiostecnologias.com.br</div>
                <div className="opacity-80 mt-1">+55 (13) 99999-0000</div>
              </div>
              <div>
                <div className="text-[9pt] uppercase tracking-widest text-leaf font-semibold mb-2">
                  Fábrica
                </div>
                <div>Ana Dias · Itariri/SP</div>
                <div className="opacity-80 mt-1">tamoiostecnologias.com.br</div>
              </div>
            </div>
          </div>
          <div className="text-[8pt] opacity-60 uppercase tracking-widest">
            © {new Date().getFullYear()} Tamoios Tecnologia · Embalagem com propósito
          </div>
        </A4Page>
      </A4Document>
    </>
  );
};

function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="flex items-center justify-between border-b border-border pb-3">
      <div>
        <div className="text-[9pt] uppercase tracking-[0.2em] text-leaf font-semibold">
          {subtitle}
        </div>
        <h2 className="font-display text-[26pt] text-forest-deep leading-tight mt-1">{title}</h2>
      </div>
      <img src={logoTamoios} alt="" className="h-8 w-auto opacity-90" />
    </header>
  );
}

function PageFooter({ n }: { n: number }) {
  return (
    <footer className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[8pt] uppercase tracking-widest text-muted-foreground">
      <span>Tamoios Tecnologia · Apresentação Institucional</span>
      <span>{String(n).padStart(2, "0")} / 06</span>
    </footer>
  );
}

export default ApresentacaoInstitucional;
