import { Link, useNavigate } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Leaf, Factory, Sprout, Recycle, Award, MapPin } from "lucide-react";

const milestones = [
  { year: "2014", title: "Fundação em Itariri-SP", body: "Tamoios nasce com foco em embalagens de polpa para o varejo, em uma planta integrada à mata atlântica." },
  { year: "2017", title: "Linha de bandejas FLV", body: "Primeiras bandejas com efeito escarola — extensão de vida de prateleira validada com grandes redes." },
  { year: "2020", title: "Calços técnicos industriais", body: "Diversificação para indústria pesada: berços, calços e protetores para vinho, compressores e linha branca." },
  { year: "2023", title: "Tubetes agroflorestais", body: "Lançamento da linha biodegradável para mudas — substitui plásticos em viveiros e reflorestamento." },
  { year: "2026", title: "Tamoios Tecnologia", body: "Reposicionamento como tecnologia em biomassa de alta densidade, com selo ESG completo." },
];

const pillars = [
  { icon: Leaf, title: "Matéria-prima nobre", body: "Polpa de celulose reciclada e fibras naturais — sem isopor, sem plásticos virgens." },
  { icon: Factory, title: "Manufatura própria", body: "Planta verticalizada em Itariri, com controle total de moldagem, secagem e acabamento." },
  { icon: Sprout, title: "Compostável", body: "Produtos retornam à natureza em até 90 dias, fechando o ciclo onde começaram." },
  { icon: Recycle, title: "Baixo carbono", body: "Processo úmido com energia majoritariamente renovável e reuso de água em circuito fechado." },
];

const QuemSomos = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Quem somos · Tamoios Tecnologia"
        description="Há mais de uma década substituindo o isopor por biomassa. Conheça a história, a fábrica em Itariri-SP e os pilares ESG da Tamoios Tecnologia."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Tamoios Tecnologia",
          url: typeof window !== "undefined" ? window.location.origin : undefined,
          email: "rafael@tamoiostecnologia.com.br",
          telephone: "+55 11 98271 2685",
          address: { "@type": "PostalAddress", addressLocality: "Itariri", addressRegion: "SP", addressCountry: "BR" },
          sameAs: ["https://instagram.com/tamoios_tecnologia"],
        }}
      />
      <SiteHeader />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-pulp relative overflow-hidden">
        <div className="container relative grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Quem Somos</span>
            <h1 className="font-display text-4xl md:text-6xl font-semibold mt-3 leading-tight text-forest-deep text-balance">
              Da mata atlântica para a sua operação,
              <span className="block italic text-leaf font-normal">embalagem com propósito.</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl leading-relaxed">
              Somos uma indústria brasileira de tecnologia em biomassa. Há mais de uma década desenvolvemos
              substitutos para o isopor e plásticos virgens — do varejo de hortifruti à logística pesada — sem
              abrir mão de performance técnica.
            </p>
          </div>
          <div className="lg:col-span-4">
            <div className="rounded-3xl bg-card border border-border p-6 shadow-deep">
              <div className="flex items-center gap-3 text-leaf">
                <MapPin className="h-5 w-5" />
                <span className="text-xs uppercase tracking-widest font-semibold">Sede & fábrica</span>
              </div>
              <p className="font-display text-2xl text-forest-deep mt-2">Itariri / SP — Brasil</p>
              <p className="text-sm text-muted-foreground mt-1">Bairro Ana Dias · próximo à Serra do Mar</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl bg-card border border-border p-6">
              <div className="h-11 w-11 rounded-xl bg-forest/10 text-forest flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg text-forest-deep mt-4">{title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28 bg-pulp-light/40">
        <div className="container max-w-4xl">
          <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Linha do tempo</span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-forest-deep mt-3 mb-12">
            Uma década escrevendo o fim do isopor.
          </h2>
          <ol className="relative border-l-2 border-forest/20 pl-8 space-y-10">
            {milestones.map((m) => (
              <li key={m.year} className="relative">
                <span className="absolute -left-[42px] top-1 h-5 w-5 rounded-full bg-forest border-4 border-background" />
                <div className="text-leaf font-display text-2xl">{m.year}</div>
                <h3 className="font-display text-xl text-forest-deep mt-1">{m.title}</h3>
                <p className="text-muted-foreground mt-2 leading-relaxed">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-forest-deep text-primary-foreground">
        <div className="container grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <Award className="h-8 w-8 text-leaf mb-4" />
            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight text-balance">
              Tecnologia patenteada,<br />impacto auditável.
            </h2>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 text-primary-foreground/85">
            <div>
              <div className="text-leaf text-4xl font-display">+10</div>
              <p className="text-sm mt-1">anos desenvolvendo biomassa de alta densidade</p>
            </div>
            <div>
              <div className="text-leaf text-4xl font-display">100%</div>
              <p className="text-sm mt-1">dos produtos compostáveis e recicláveis</p>
            </div>
            <div>
              <div className="text-leaf text-4xl font-display">+2.000t</div>
              <p className="text-sm mt-1">de isopor evitadas todos os anos</p>
            </div>
            <div>
              <div className="text-leaf text-4xl font-display">3</div>
              <p className="text-sm mt-1">linhas: varejo · indústria · agroflorestal</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="py-24 md:py-32">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Trabalhe com a Tamoios</span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-forest-deep mt-3">
              Vamos transformar sua embalagem.
            </h2>
          </div>
          <ContactForm />
          <div className="mt-10 text-center">
            <Button asChild variant="ghost"><Link to="/blog">Ler conteúdos no blog →</Link></Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default QuemSomos;
