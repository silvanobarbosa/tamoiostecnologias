import { Leaf, Droplets, Recycle, Snowflake, ShoppingBasket, Apple } from "lucide-react";
import { ProductPageLayout } from "@/components/ProductPageLayout";
import { useSiteContent } from "@/hooks/useSiteContent";
import heroImg from "@/assets/bandejas-mosaico.jpg";
import alfaceImg from "@/assets/bandeja-alface-iceberg.jpg";
import miniImg from "@/assets/bandeja-alface-mini.jpg";
import tomatesImg from "@/assets/bandeja-tomates.jpg";
import gondolaImg from "@/assets/varejo-bandejas-gondola.jpg";

const BandejasFLV = () => {
  const { t } = useSiteContent("produto-bandejas-flv");
  return (
    <ProductPageLayout
      seoTitle="Bandejas FLV de polpa · Tamoios Tecnologia"
      seoDescription="Bandejas compostáveis para Frutas, Legumes e Verduras: Efeito Escarola, até 50% a mais de prateleira e descarte 100% papel. O maior catálogo bio do Brasil."
      productName="Bandejas FLV em polpa de celulose Tamoios"
      eyebrow={t("hero", "eyebrow", "Varejo & Agro")}
      title={t("hero", "title", "Bandejas FLV em polpa de celulose:")}
      highlight={t("hero", "highlight", "o fim da era do isopor.")}
      intro={t("hero", "intro", "A linha Tamoios para Frutas, Legumes e Verduras combina absorção ativa de umidade, respiração natural e descarte 100% papel — estendendo a vida de prateleira em até 50% e reduzindo o setor que mais perde no varejo brasileiro. Já substituímos mais de 30 milhões de bandejas de isopor no Brasil — temos o maior catálogo de bandejas bio do mercado brasileiro.")}
      heroImage={heroImg}
      heroAlt="Mosaico de bandejas Tamoios em polpa de celulose com hortifruti, frutas e folhosos no varejo"
      Icon={Leaf}
      benefitsHeading="Por que a bandeja Tamoios rende mais no varejo"
      badges={[
        "Reciclado",
        "Reciclável",
        "Biodegradável",
        "Compostável",
        "Descarbonizado",
      ]}
      benefits={[
        {
          icon: Droplets,
          title: "Efeito Escarola",
          desc: "A polpa absorve excesso de umidade do produto, evitando proliferação de fungos e perda de turgor — folhas e frutos chegam mais firmes ao consumidor.",
        },
        {
          icon: Snowflake,
          title: "Até 50% a mais de tempo de prateleira",
          desc: "Ganho médio comprovado em rodadas de Ensaio de Vida de Prateleira (EVP) com Carrefour e Hortmix em comparação com isopor convencional.",
        },
        {
          icon: Recycle,
          title: "Descarte 100% papel",
          desc: "Aceito em coleta seletiva tradicional ou compostagem doméstica. Sem separação, sem microplástico, sem resíduo ao consumidor final.",
        },
      ]}
      lines={[
        {
          title: "Bandeja Funda — Folhosos",
          description: "Modelo alto, ideal para alface americana, alface crespa e folhosos em geral. Contém respingos e umidade da folha sem amassar o produto.",
          image: alfaceImg,
          imageAlt: "Bandeja funda de polpa com alface americana",
          bullets: ["Aplicação: alface, escarola, rúcula, almeirão", "Volume útil interno generoso", "Empilhável em gôndola refrigerada"],
        },
        {
          title: "Bandeja Alta — Mini Folhosos",
          description: "Geometria reforçada para mini alfaces, microverdes e brotos. Boa respiração interna e ótima visualização do produto.",
          image: miniImg,
          imageAlt: "Bandeja alta de polpa com mini alface",
          bullets: ["Mini alface, brotos, microverdes", "Paredes reforçadas para empilhamento", "Compatível com filme respirável"],
        },
        {
          title: "Bandeja Rasa — Tomates e Frutas",
          description: "Formato baixo, ótimo para tomates no cacho, morangos premium e cogumelos. Suporte mecânico sem comprimir.",
          image: tomatesImg,
          imageAlt: "Bandeja rasa de polpa com tomates",
          bullets: ["Tomates, morangos, cogumelos", "Validada com Vó Lucia (~40%) e Hayashi (~50%)", "Visual sofisticado, premium"],
        },
        {
          title: "Linha de Gôndola — FLV completo",
          description: "Bandejas de transporte e exposição já em uso em redes parceiras. Substituição direta do isopor sem alteração de equipamento.",
          image: gondolaImg,
          imageAlt: "Gôndola de supermercado com bandejas Tamoios",
          bullets: ["Vagens, batatas, abobrinhas", "Empilhável e estável", "Pronto para etiqueta e código de barras"],
        },
      ]}
      specs={[
        { label: "Material", value: "100% polpa de celulose" },
        { label: "Origem da fibra", value: "Aparas pré-uso (limpas)" },
        { label: "Decomposição", value: "60–90 dias em compostagem" },
        { label: "Reciclagem", value: "Com papel/papelão comum" },
        { label: "Personalização", value: "Logo em alto-relevo" },
        { label: "Pedido mínimo", value: "Sob consulta" },
      ]}
      ctaTitle={t("cta", "title", "Quer testar a bandeja Tamoios na sua operação?")}
      ctaDesc={t("cta", "desc", "Enviamos amostras para EVP (Ensaio de Vida de Prateleira) na sua categoria. Resposta em 24h.")}
      downloadLabel="Catálogo FLV (.pptx)"
      downloadHref="/apresentacao-produtos"
    />
  );
};

export default BandejasFLV;
