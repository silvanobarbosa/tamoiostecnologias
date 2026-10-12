import { useEffect } from "react";
import { Download, Printer, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { A4Document, A4Page } from "@/components/A4Page";
import { SEO } from "@/components/SEO";
import logoTamoios from "@/assets/tamoios-logo.png";
import bandejasHero from "@/assets/hero-bandejas.jpg";
import bandejaTomatesAsset from "@/assets/bandeja-tomates.jpg";
import bandejaAlfaceImg from "@/assets/bandeja-alface-iceberg.jpg";
import bandejaMiniImg from "@/assets/bandeja-alface-mini.jpg";
import calcosGarrafasImg from "@/assets/calcos-garrafas.jpg";
import calcosCompressorImg from "@/assets/calcos-compressor.jpg";
import embalagemVinhoImg from "@/assets/embalagem-vinho.jpg";
import tubetesMudasImg from "@/assets/tubetes-mudas.jpg";
import tubetesBandejaImg from "@/assets/tubetes-bandeja.jpg";
import hidroponiaImg from "@/assets/hidroponia-mudas.jpg";

const linhas = [
  {
    nome: "Bandejas FLV",
    chamada: "Substituem plástico em frutas, legumes e verduras",
    descricao:
      "Bandejas técnicas de polpa moldada para varejo e atacado. Mantêm a fruta firme, prolongam a vida de prateleira e elevam a apresentação no PDV.",
    hero: bandejasHero,
    aplicacoes: [
      { nome: "Bandeja tomate cacho", img: bandejaTomatesAsset, info: "Berço protetor, ventilação otimizada" },
      { nome: "Alface Americana", img: bandejaAlfaceImg, info: "Bandeja funda · contém umidade da folha" },
      { nome: "Alface mini / hortaliças", img: bandejaMiniImg, info: "Tamanhos modulares por SKU" },
    ],
    diferenciais: [
      "+50% de vida de prateleira (Efeito Escarola)",
      "100% compostável (180 dias industrial)",
      "Customização de formato e branding",
      "Substitui PET, PS e EPS sem perda de proteção",
    ],
  },
  {
    nome: "Calços Técnicos",
    chamada: "Berços moldados para indústria, vinho e eletrônicos",
    descricao:
      "Embalagens estruturais sob medida para substituir EVA, isopor e polipropileno expandido. Proteção vertical comprovada, apresentação premium e zero resíduo plástico.",
    hero: embalagemVinhoImg,
    aplicacoes: [
      { nome: "Calço para garrafas", img: calcosGarrafasImg, info: "Vinho, azeite, destilados premium" },
      { nome: "Calço industrial", img: calcosCompressorImg, info: "Eletrônicos, autopeças, brancos" },
      { nome: "Embalagem para vinho", img: embalagemVinhoImg, info: "Berço moldado em polpa que substitui isopor e plástico bolha em garrafas. Alta proteção vertical, visual sofisticado e descarte 100% papel." },
    ],
    diferenciais: [
      "Proteção vertical equivalente ou superior ao EVA",
      "Design colaborativo com engenharia do cliente",
      "Resistência mecânica em logística pesada",
      "Reciclável no fluxo de papel/papelão",
    ],
  },
  {
    nome: "Agro & Florestal",
    chamada: "Tubetes e bandejas plantáveis para mudas",
    descricao:
      "Soluções biodegradáveis para hidroponia, viveiros e reflorestamento. O tubete vai junto com a muda para o solo, eliminando o resíduo plástico no campo.",
    hero: tubetesMudasImg,
    aplicacoes: [
      { nome: "Tubetes para mudas", img: tubetesBandejaImg, info: "Florestal, café, cacau, agroflorestas" },
      { nome: "Bandejas hidroponia", img: hidroponiaImg, info: "Drenagem técnica, raiz saudável" },
      { nome: "Vasos compostáveis", img: tubetesMudasImg, info: "Planta direto, sem retirar a embalagem" },
    ],
    diferenciais: [
      "Plantável direto no solo, sem resíduo",
      "Compatível com mecanização e plantio manual",
      "Parcerias com Belterra e operadores agroflorestais",
      "Custo total competitivo vs. plástico convencional",
    ],
  },
];

const ApresentacaoProdutos = () => {
  useEffect(() => {
    document.title = "Tamoios · Catálogo de Produtos";
  }, []);

  return (
    <>
      <SEO
        title="Tamoios — Catálogo de Produtos"
        description="Catálogo das linhas Tamoios: Bandejas FLV, Calços Técnicos e Agro & Florestal. Pronto para imprimir em PDF (A4)."
      />

      <div className="a4-no-print sticky top-0 z-50 bg-forest-deep text-primary-foreground border-b border-primary-foreground/10">
        <div className="container max-w-[210mm] flex items-center justify-between gap-3 py-3">
          <Link to="/" className="inline-flex items-center gap-2 text-sm hover:opacity-80">
            <ArrowLeft className="h-4 w-4" /> Voltar ao site
          </Link>
          <div className="flex items-center gap-2 text-xs opacity-80">
            <Printer className="h-3.5 w-3.5" /> {linhas.length + 2} páginas A4
          </div>
          <Button variant="leaf" size="sm" onClick={() => window.print()}>
            <Download className="h-4 w-4" /> Baixar PDF
          </Button>
        </div>
      </div>

      <A4Document>
        {/* CAPA */}
        <A4Page bleed className="flex flex-col">
          <div className="relative h-[60%] overflow-hidden">
            <img src={bandejasHero} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/30 to-background" />
            <div className="absolute top-[14mm] left-[14mm] right-[14mm] flex items-start justify-between">
              <img src={logoTamoios} alt="Tamoios" className="h-12 w-auto" />
              <div className="text-right text-xs uppercase tracking-widest text-primary-foreground/90 font-semibold">
                Catálogo<br />de Produtos
              </div>
            </div>
          </div>
          <div className="flex-1 px-[14mm] py-[10mm] flex flex-col justify-between">
            <div>
              <span className="text-leaf font-semibold text-[10pt] tracking-[0.2em] uppercase">
                Polpa Moldada · 3 linhas
              </span>
              <h1 className="font-display text-[42pt] leading-[1.05] font-semibold text-forest-deep mt-3">
                Três linhas,<br />
                <em className="text-leaf font-normal">infinitas aplicações.</em>
              </h1>
              <p className="mt-5 text-[12pt] leading-snug text-muted-foreground max-w-[150mm]">
                Bandejas FLV para o varejo, Calços Técnicos para a indústria e soluções
                Agro & Florestal para o campo. Tudo em polpa moldada — sem plástico.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {linhas.map((l, i) => (
                <div key={l.nome} className="border-l-2 border-leaf pl-3">
                  <div className="text-[9pt] text-leaf font-mono">{String(i + 1).padStart(2, "0")}</div>
                  <div className="font-display text-[13pt] text-forest-deep leading-tight mt-1">
                    {l.nome}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </A4Page>

        {/* UMA PÁGINA POR LINHA */}
        {linhas.map((linha, idx) => (
          <A4Page key={linha.nome} className="flex flex-col">
            <header className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <div className="text-[9pt] uppercase tracking-[0.2em] text-leaf font-semibold font-mono">
                  Linha {String(idx + 1).padStart(2, "0")}
                </div>
                <h2 className="font-display text-[26pt] text-forest-deep leading-tight mt-1">
                  {linha.nome}
                </h2>
              </div>
              <img src={logoTamoios} alt="" className="h-8 w-auto opacity-90" />
            </header>

            <div className="mt-5 grid grid-cols-12 gap-5">
              <div className="col-span-7">
                <p className="text-[12pt] text-forest-deep font-medium leading-snug">
                  {linha.chamada}.
                </p>
                <p className="mt-3 text-[10.5pt] text-muted-foreground leading-relaxed">
                  {linha.descricao}
                </p>

                <div className="mt-5">
                  <div className="text-[9pt] uppercase tracking-widest text-leaf font-semibold mb-2">
                    Diferenciais
                  </div>
                  <ul className="space-y-2">
                    {linha.diferenciais.map((d) => (
                      <li key={d} className="flex gap-2 text-[10.5pt] text-foreground/85">
                        <CheckCircle2 className="h-4 w-4 text-leaf shrink-0 mt-0.5" />
                        <span className="leading-snug">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-span-5">
                <div className="rounded-xl overflow-hidden h-[80mm]">
                  <img src={linha.hero} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex-1">
              <div className="text-[9pt] uppercase tracking-widest text-leaf font-semibold mb-3">
                Aplicações
              </div>
              <div className="grid grid-cols-3 gap-3">
                {linha.aplicacoes.map((a) => (
                  <div key={a.nome} className="rounded-xl border border-border overflow-hidden">
                    <div className="h-[45mm] bg-pulp-light">
                      <img src={a.img} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <div className="font-display text-[11pt] text-forest-deep leading-tight">
                        {a.nome}
                      </div>
                      <div className="text-[9pt] text-muted-foreground mt-1 leading-snug">
                        {a.info}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <footer className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[8pt] uppercase tracking-widest text-muted-foreground">
              <span>Tamoios · Catálogo de Produtos</span>
              <span>{String(idx + 2).padStart(2, "0")} / {String(linhas.length + 2).padStart(2, "0")}</span>
            </footer>
          </A4Page>
        ))}

        {/* CONTATO */}
        <A4Page className="flex flex-col bg-forest-deep text-primary-foreground">
          <div className="flex items-start justify-between">
            <img src={logoTamoios} alt="Tamoios" className="h-12 w-auto brightness-0 invert" />
            <div className="text-right text-[9pt] uppercase tracking-widest opacity-70">
              Solicite uma proposta
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-leaf font-semibold text-[10pt] tracking-[0.2em] uppercase">
              Próximo passo
            </span>
            <h2 className="font-display text-[40pt] leading-[1.05] font-semibold mt-3">
              Vamos desenhar<br />
              <em className="text-leaf font-normal">a sua embalagem.</em>
            </h2>
            <p className="mt-6 text-[12pt] opacity-80 max-w-[140mm]">
              Do briefing ao protótipo em poucas semanas. Trabalhamos com escala industrial
              e desenvolvimento sob medida.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 text-[11pt]">
              <div>
                <div className="text-[9pt] uppercase tracking-widest text-leaf font-semibold mb-2">
                  Comercial
                </div>
                <div>comercial@tamoiostecnologia.com.br</div>
                <div className="opacity-80 mt-1">011 0 94006 – 6986</div>
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
            © {new Date().getFullYear()} Tamoios Tecnologia · Catálogo de Produtos
          </div>
        </A4Page>
      </A4Document>
    </>
  );
};

export default ApresentacaoProdutos;
