import { Factory, Shield, Wine, Boxes, Layers, Settings2 } from "lucide-react";
import { ProductPageLayout } from "@/components/ProductPageLayout";
import heroImg from "@/assets/calcos-garrafas.jpg";
import compressorImg from "@/assets/calcos-compressor.jpg";
import vinhoImg from "@/assets/embalagem-vinho.jpg";
import vinhoImg2 from "@/assets/embalagem-vinho-2.jpg";
import industriaImg from "@/assets/industria-calcos.jpg";

const CalcosTecnicos = () => {
  return (
    <ProductPageLayout
      eyebrow="Indústria & Logística"
      title="Calços técnicos em polpa moldada:"
      highlight="proteção sob medida, descarte 100% papel."
      intro="Engenharia de polpa de alta densidade com processo de alto vácuo. Substituímos isopor (EPS) e plástico bolha por calços, berços e cantoneiras moldados sob projeto — para autopeças, bebidas, móveis, eletrodomésticos e equipamentos pesados."
      heroImage={heroImg}
      heroAlt="Calços técnicos de polpa moldada Tamoios para garrafas"
      Icon={Factory}
      badges={[
        "Alto vácuo",
        "Projeto + ferramenta",
        "Hot Press",
        "Dimensões sobre demanda",
      ]}
      benefits={[
        {
          icon: Shield,
          title: "Absorção de impacto superior",
          desc: "Estrutura de polpa de alta densidade dissipa choques mecânicos e vibração no transporte. Comprovado contra EPS em ensaios de queda.",
        },
        {
          icon: Settings2,
          title: "Engenharia sob projeto",
          desc: "Equipe própria de projeto, ferramentaria e prototipagem em Hot Press. Do desenho 3D ao molde produtivo, tudo internalizado.",
        },
        {
          icon: Layers,
          title: "Logística reversa simples",
          desc: "Descarte direto na coleta seletiva de papel. Reduz contrato com gestora de resíduos e melhora score ESG da sua operação.",
        },
      ]}
      lines={[
        {
          title: "Embalagem para vinhos e bebidas premium",
          description: "Berços moldados que substituem isopor e plástico bolha para garrafas individuais ou kits. Apresentação sofisticada com proteção vertical comprovada.",
          image: vinhoImg,
          imageAlt: "Berço de polpa para garrafa de vinho dentro de caixa",
          bullets: ["Garrafas 750ml padrão e magnum", "Kits 2 e 3 garrafas", "Acabamento branco ou natural"],
        },
        {
          title: "Calços para compressores e equipamentos pesados",
          description: "Calços de grande dimensão para máquinas industriais, compressores, autopeças volumosas e linha branca. Suporta cargas elevadas com mínima deformação.",
          image: compressorImg,
          imageAlt: "Calço técnico de polpa de grande dimensão sobre bancada de fábrica",
          bullets: ["Cargas industriais pesadas", "Geometrias complexas multi-cavidade", "Identificação de marca em alto-relevo"],
        },
        {
          title: "Cantoneiras de proteção multi-função",
          description: "Cantoneiras moldadas para proteção de quinas em móveis, vidros, cerâmicas e linha branca. Substituem isopor laminado e cantoneiras de papelão dobrado.",
          image: industriaImg,
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
        { label: "Densidade", value: "Alta — para impacto" },
        { label: "Material", value: "Polpa de celulose pré-uso" },
        { label: "Personalização", value: "Logo e códigos em relevo" },
        { label: "Engenharia", value: "Projeto e ferramenta inclusos" },
        { label: "Aplicações", value: "Bebidas, autopeças, móveis, eletro" },
      ]}
      ctaTitle="Tem um projeto específico de embalagem industrial?"
      ctaDesc="Envie suas dimensões e nossa engenharia desenvolve o projeto de polpa moldada ideal para sua peça."
      downloadLabel="Catálogo industrial (.pptx)"
      downloadHref="/docs/Tamoios-Apresentacao-Institucional.pptx"
    />
  );
};

export default CalcosTecnicos;
