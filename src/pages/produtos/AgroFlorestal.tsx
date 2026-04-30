import { Sprout, TreePine, Leaf, Recycle, FlaskConical, Trees } from "lucide-react";
import { ProductPageLayout } from "@/components/ProductPageLayout";
import heroImg from "@/assets/tubetes-mudas.jpg";
import tubetesBandejaImg from "@/assets/tubetes-bandeja.jpg";
import hidroponiaImg from "@/assets/hidroponia-mudas.jpg";
import hidroponiaVasoImg from "@/assets/hidroponia-vaso.jpg";

const AgroFlorestal = () => {
  return (
    <ProductPageLayout
      eyebrow="Agro & Florestal"
      title="Tubetes Bio e Mini Vasos:"
      highlight="polpa que vira raiz."
      intro="Substituição direta do plástico no agro: tubetes para silvicultura e reflorestamento e mini vasos para hidroponia. A muda vai para o campo dentro do próprio recipiente — que se decompõe no solo, eliminando o passo de remoção e o descarte plástico."
      heroImage={heroImg}
      heroAlt="Tubetes bio Tamoios com mudas de eucalipto"
      Icon={TreePine}
      badges={[
        "Decomposição direta no solo",
        "Eucalipto, Pinus e nativas",
        "Hidroponia NFT compatível",
        "Múltiplos tamanhos",
      ]}
      benefits={[
        {
          icon: Sprout,
          title: "+ Sobrevivência no campo",
          desc: "A raiz não é perturbada no plantio: a muda vai ao solo dentro do próprio tubete. Resultado direto em taxa de pega e produtividade florestal.",
        },
        {
          icon: Recycle,
          title: "Zero plástico, zero coleta",
          desc: "Acabou a logística reversa do tubete plástico. A polpa biodegrada no solo em poucos meses, virando matéria orgânica para a própria muda.",
        },
        {
          icon: Trees,
          title: "Mercado de bilhões/ano",
          desc: "Brasil planta mais de 2 bilhões de mudas/ano em silvicultura e recuperação florestal. A linha Tamoios é a alternativa em escala ao tubete plástico.",
        },
      ]}
      lines={[
        {
          title: "Tubetes Bio — Reflorestamento",
          description: "Tubetes em polpa de celulose para mudas de eucalipto, pinus e espécies nativas em projetos de reflorestamento e recuperação florestal.",
          image: heroImg,
          imageAlt: "Mudas em tubetes bio Tamoios",
          bullets: ["Eucalipto, Pinus, regeneração florestal", "Compatível com bandejas plásticas existentes", "Plantio direto sem desencanteiramento"],
        },
        {
          title: "Bandejas modulares em polpa",
          description: "Bandeja base em polpa que segura múltiplos tubetes — substituindo a bandeja plástica reutilizável em operações onde o reuso não é viável.",
          image: tubetesBandejaImg,
          imageAlt: "Bandeja modular em polpa para tubetes",
          bullets: ["Modular: 6, 12, 24, 48 cavidades", "Empilhável em transporte", "100% biodegradável"],
        },
        {
          title: "Mini Vasos para Hidroponia",
          description: "Substituto direto do cachepô plástico em sistemas NFT, DFT e bancadas hidropônicas. Crescimento testado com alface, rúcula, mini-folhosos.",
          image: hidroponiaImg,
          imageAlt: "Mini vasos Tamoios em sistema hidropônico",
          bullets: ["Alface, rúcula, brotos", "Compatível com bancada NFT", "Decomposição após o ciclo"],
        },
        {
          title: "Sementeiras e coroas de plantio",
          description: "Em desenvolvimento: sementeiras para agricultura orgânica e coroas de plantio para silvicultura e recuperação florestal.",
          image: hidroponiaVasoImg,
          imageAlt: "Mini vaso bio em mão",
          bullets: ["Em validação com parceiros", "Hortaliças orgânicas", "Coroa anti-mato em mudas"],
        },
      ]}
      specs={[
        { label: "Linhas Tubete", value: "Eucalipto · Pinus · Nativas" },
        { label: "Material", value: "Polpa de celulose pré-uso" },
        { label: "Compatibilidade", value: "Bandejas plásticas viveiristas" },
        { label: "Decomposição", value: "60–120 dias no solo" },
        { label: "Aplicações Hidroponia", value: "NFT · DFT · Bancada" },
        { label: "Status", value: "Linhas Tubete · Vaso em escala" },
      ]}
      ctaTitle="Viveirista, silvicultor ou produtor hidropônico?"
      ctaDesc="Receba amostras para teste de campo. Trabalhamos com lotes de validação antes de qualquer pedido em escala."
      downloadLabel="Catálogo Agro (.pptx)"
      downloadHref="/docs/Tamoios-Apresentacao-Institucional.pptx"
    >
      {/* Trust block */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="rounded-3xl bg-forest text-primary-foreground p-10 md:p-14 relative overflow-hidden">
            <div className="absolute inset-0 grain opacity-20" />
            <div className="relative grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <span className="text-leaf font-semibold text-xs tracking-widest uppercase">Pesquisa & desenvolvimento</span>
                <h3 className="font-display text-3xl md:text-4xl font-semibold mt-3 leading-tight">
                  Tecnologia validada com USP, Braskem Labs e BNDES Garagem.
                </h3>
              </div>
              <div className="flex items-center md:justify-end">
                <FlaskConical className="h-20 w-20 text-leaf opacity-90" strokeWidth={1.2} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </ProductPageLayout>
  );
};

export default AgroFlorestal;
