import { Factory, Shield, Wine, Boxes, Layers, Settings2 } from "lucide-react";
import { ProductPageLayout } from "@/components/ProductPageLayout";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/calcos-garrafas.jpg";
import compressorImg from "@/assets/calcos-compressor.jpg";
import vinhoImg from "@/assets/embalagem-vinho.jpg";
import vinhoImg2 from "@/assets/embalagem-vinho-2.jpg";
import industriaImg from "@/assets/industria-calcos.jpg";
import cantoneirasImg from "@/assets/cantoneiras-protecao.png";

const CalcosTecnicos = () => {
  const { t } = useSiteContent("produto-calcos-tecnicos");
  return (
    <ProductPageLayout
      seoTitle="Calços Técnicos em polpa moldada · Tamoios"
      seoDescription="Calços, berços e cantoneiras de polpa moldada sob projeto. Substituem EVA, polipropileno e isopor (EPS). Referência ISO 14001:2026 e Decreto nº 12.688/2025."
      productName="Calços Técnicos em polpa moldada Tamoios"
      eyebrow={t("hero", "eyebrow", "Indústria & Logística")}
      title={t("hero", "title", "Calços técnicos em polpa moldada:")}
      highlight={t("hero", "highlight", "proteção sob medida, descarte 100% papel.")}
      intro={t("hero", "intro", "Engenharia de polpa de alta densidade desenvolvida com ferramentaria interna e uma das maiores mesas moldadoras do Brasil (1200 × 400 mm). Substituímos EVA, polipropileno e isopor (EPS) por calços, berços e cantoneiras moldados sob projeto — em projetos de economia circular, com a ISO 14001:2026 como referência de gestão ambiental e alinhamento ao Decreto nº 12.688/2025.")}
      heroImage={heroImg}
      heroAlt="Calços técnicos de polpa moldada Tamoios para garrafas"
      Icon={Factory}
      benefitsHeading="Performance de proteção com descarte 100% papel"
      badges={[
        "Ferramentaria interna",
        "Mesa moldadora 1200 × 400 mm",
        "Substitui EVA, PP e isopor",
        "Referência ISO 14001:2026",
        "Decreto nº 12.688/2025",
      ]}
      benefits={[
        {
          icon: Shield,
          title: "Absorção de impacto superior",
          desc: "Estrutura de polpa de alta densidade dissipa choques mecânicos e vibração no transporte. Substitui EVA, polipropileno e isopor (EPS) com performance comprovada em ensaios de queda.",
        },
        {
          icon: Settings2,
          title: "Engenharia + ferramentaria interna",
          desc: "Equipe própria de projeto, ferramentaria e prototipagem em Hot Press, operando uma das maiores mesas moldadoras do Brasil (1200 × 400 mm). Do desenho 3D ao molde produtivo, tudo internalizado.",
        },
        {
          icon: Layers,
          title: "Gestão ambiental e economia circular",
          desc: "ISO 14001:2026 — Sistemas de gestão ambiental: requisitos com orientações para uso. Referência para projetos de economia circular e descarte na coleta seletiva de papel, em alinhamento ao Decreto nº 12.688/2025. A referência à norma não constitui declaração de certificação.",
        },
      ]}
      lines={[
        {
          title: "Embalagem para vinho",
          description: "Berço moldado em polpa que substitui isopor e plástico bolha em garrafas. Alta proteção vertical, visual sofisticado e descarte 100% papel.",
          image: vinhoImg,
          imageAlt: "Berço de polpa para garrafa de vinho dentro de caixa",
          bullets: ["Garrafas 750ml padrão e magnum", "Kits 2 e 3 garrafas", "Acabamento branco ou natural"],
        },
        {
          title: "Calços para compressores e equipamentos pesados",
          description: "Calços de grande dimensão para máquinas industriais, compressores, autopeças volumosas e linha branca, produzidos em uma das maiores mesas moldadoras do Brasil (1200 × 400 mm).",
          image: compressorImg,
          imageAlt: "Calço técnico de polpa de grande dimensão sobre bancada de fábrica",
          bullets: ["Cargas industriais pesadas", "Geometrias complexas multi-cavidade", "Identificação de marca em alto-relevo"],
        },
        {
          title: "Cantoneiras de proteção multi-função",
          description: "Cantoneiras moldadas para proteção de quinas em móveis, vidros, cerâmicas e linha branca. Substituem EVA, isopor laminado e cantoneiras de papelão dobrado.",
          image: cantoneirasImg,
          imageAlt: "Cantoneiras de proteção em polpa moldada",
          bullets: ["Móveis, vidros, eletrodomésticos", "Encaixe perfeito em qualquer ângulo", "Empilhável para estoque compacto"],
        },
        {
          title: "Embalagem para autopeças e e-commerce",
          description: "Berços moldados para peças automotivas, eletrônicos e itens de e-commerce premium. Reduz embalagem secundária e melhora unboxing do consumidor.",
          image: vinhoImg2,
          imageAlt: "Embalagem fechada com berço de polpa interno",
          bullets: ["Peças metálicas e eletrônicas", "Reduz volume de transporte", "Imagem sustentável da marca"],
        },
      ]}
      specs={[
        { label: "Processo", value: "Alto vácuo + Hot Press" },
        { label: "Ferramentaria", value: "100% interna" },
        { label: "Mesa moldadora", value: "1200 × 400 mm" },
        { label: "Substitui", value: "EVA · Polipropileno · Isopor (EPS)" },
        { label: "Referência ambiental", value: "ISO 14001:2026 · Decreto 12.688/2025" },
        { label: "Aplicações", value: "Bebidas, autopeças, móveis, eletro" },
      ]}
      ctaTitle={t("cta", "title", "Tem um projeto específico de embalagem industrial?")}
      ctaDesc={t("cta", "desc", "Envie suas dimensões e nossa engenharia desenvolve o projeto de polpa moldada ideal para sua peça.")}
      downloadLabel="Catálogo de produtos (PDF)"
      downloadHref="/apresentacao-produtos"
    >
      <section className="py-12 border-t border-border">
        <div className="container max-w-4xl">
          <h2 className="font-display text-2xl text-forest-deep mb-3">Referência oficial de gestão ambiental</h2>
          <p className="text-muted-foreground leading-relaxed mb-5">
            A ISO 14000 é uma família de normas. A ISO 14001:2026, quarta edição, é a referência atual para requisitos de sistemas de gestão ambiental. O texto integral é protegido e vendido pela ISO; disponibilizamos a referência oficial, não uma cópia da norma.
          </p>
          <Button asChild variant="outline">
            <a href="https://www.iso.org/standard/14001" target="_blank" rel="noopener noreferrer">Consultar ISO 14001:2026</a>
          </Button>
        </div>
      </section>
    </ProductPageLayout>
  );
};

export default CalcosTecnicos;
