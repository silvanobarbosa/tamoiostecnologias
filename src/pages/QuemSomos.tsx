import { Link, useNavigate } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Leaf, Factory, Sprout, Recycle, Award, MapPin, Quote, TrendingUp } from "lucide-react";
import jornadaMorango from "@/assets/jornada-morango.jpg";
import jornadaMaos from "@/assets/jornada-maos.jpg";
import distribuicaoBrasil from "@/assets/distribuicao-brasil.jpg";
import donaAngelaAsset from "@/assets/dona-angela.jpg.asset.json";
import { useSiteContent } from "@/hooks/useSiteContent";

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
  const { t, has } = useSiteContent("quem-somos");
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
          email: "fernanda@tamoiostecnologia.com.br",
          telephone: "+55 11 94006 6986",
          address: { "@type": "PostalAddress", addressLocality: "Itariri", addressRegion: "SP", addressCountry: "BR" },
          sameAs: ["https://instagram.com/tamoios_tecnologia"],
        }}
      />
      <SiteHeader />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-pulp relative overflow-hidden">
        <div className="container relative grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">{t("hero", "eyebrow", "Quem Somos")}</span>
            {has("hero", "title") ? (
              <h1 className="font-display text-4xl md:text-6xl font-semibold mt-3 leading-tight text-forest-deep text-balance">
                {t("hero", "title", "")}
              </h1>
            ) : (
              <h1 className="font-display text-4xl md:text-6xl font-semibold mt-3 leading-tight text-forest-deep text-balance">
                Da mata atlântica para a sua operação,
                <span className="block italic text-leaf font-normal">embalagem com propósito.</span>
              </h1>
            )}
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl leading-relaxed">
              {has("hero", "subtitle") ? (
                t("hero", "subtitle", "")
              ) : (
                <>
                  Somos uma indústria brasileira de tecnologia em biomassa. Já substituímos
                  mais de <strong className="text-forest">30 milhões de peças de plástico</strong> por produtos
                  <strong className="text-forest"> Reciclados, Recicláveis, Biodegradáveis, Compostáveis e Descarbonizados</strong>.
                  Nosso processo usa energia 100% renovável e reuso de água em circuito fechado.
                </>
              )}
            </p>
            <p className="text-base text-muted-foreground mt-4 max-w-2xl leading-relaxed">
              Há mais de uma década desenvolvemos substitutos para o isopor e plásticos virgens —
              do varejo de hortifruti à logística pesada — sem abrir mão de performance técnica.
            </p>
          </div>
          <div className="lg:col-span-4">
            <div className="rounded-3xl bg-card border border-border p-6 shadow-deep">
              <div className="flex items-center gap-3 text-leaf">
                <MapPin className="h-5 w-5" />
                <span className="text-xs uppercase tracking-widest font-semibold">Sede & fábrica</span>
              </div>
              <p className="font-display text-2xl text-forest-deep mt-2">Itariri / SP — Brasil</p>
              <p className="text-sm text-muted-foreground mt-1">Bairro Ana Dias · entre a Serra do Mar e a Mata Atlântica</p>

              <div className="mt-5 grid grid-cols-2 gap-3 pt-5 border-t border-border">
                <div>
                  <div className="font-display text-2xl text-forest-deep leading-none">~17 mil</div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1 leading-tight">habitantes em Itariri-SP</p>
                </div>
                <div>
                  <div className="font-display text-2xl text-leaf leading-none">80%</div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1 leading-tight">da nossa fábrica é formada por mulheres da região</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                Somos uma das poucas indústrias gerando emprego formal no Vale do Ribeira —
                região historicamente carente de oportunidades — e a maior contratante
                de mulheres do município. Cada bandeja que sai daqui é também renda,
                autonomia e desenvolvimento local.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Nossos pilares</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3 text-forest-deep leading-tight text-balance">
              Quatro compromissos que sustentam cada produto Tamoios.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* ONDE TUDO COMEÇOU — Dona Angela */}
      <section className="py-20 md:py-28 bg-background relative overflow-hidden">
        <div className="container max-w-6xl grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-deep ring-1 ring-forest/10">
              <img
                src={donaAngelaAsset.url}
                alt="Dona Angela na cozinha secando um tomate cereja com papel absorvente — a origem da Tamoios"
                loading="lazy"
                width={1920}
                height={1080}
                className="w-full h-auto"
              />
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mt-4 text-center">
              Dona Angela · onde tudo começou
            </p>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Onde tudo começou</span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-forest-deep leading-tight text-balance">
              Antes de ser tecnologia, foi um <span className="italic text-leaf">gesto de cuidado</span> na cozinha.
            </h2>

            <div className="space-y-5 text-foreground/85 leading-relaxed text-lg">
              <p>
                Quem projetou o nosso produto, lá no início, foi a <strong>Dona Angela</strong>.
                Professora, mãe, dona de casa — vida corrida, como tantas brasileiras.
                Ela voltava da feira, lavava a verdura, deixava escorrer, deixava secar.
                E então fazia algo simples: <strong>punha duas folhas de papel
                absorvente</strong> embaixo das folhas, dentro da tigela.
              </p>
              <p>
                Não era truque de cozinha. Era engenharia intuitiva. O papel absorvia a
                <strong> umidade livre</strong> do produto — e a verdura durava mais.
                Muito mais. Foi <em>esse</em> raciocínio, observado por anos dentro de
                casa, que se tornou o coração técnico da Tamoios:
                <strong> uma embalagem que absorve umidade, estende o tempo de prateleira
                e devolve, em margem, o pequeno custo a mais em relação ao isopor.</strong>
              </p>
              <blockquote className="border-l-4 border-leaf pl-5 italic text-forest-deep text-xl font-display">
                <Quote className="h-5 w-5 text-leaf mb-2" />
                E tudo começou com a Dona Angela, lá atrás, que já entendia — e ensinava —
                o valor de cuidar e de valorizar.
              </blockquote>
              <p className="text-base text-muted-foreground">
                Hoje somos uma <strong className="text-forest-deep">startup de biomateriais</strong>.
                Nosso eixo existencial é usar biomassa — papel, resíduo agrícola, amido —
                para substituir o plástico petroquímico, ancorados na
                <strong> Política Nacional de Resíduos Sólidos</strong>, na nova
                <strong> Estratégia Nacional de Economia Circular</strong> e no
                <strong> Acordo de Paris</strong>. A missão é uma só:
                <em> buscar a fronteira do desenvolvimento sustentável</em> —
                combatendo, ao mesmo tempo, as mudanças climáticas e a geração de
                microplástico.
              </p>
              <p className="text-base text-forest font-medium">
                Tudo isso começou com duas folhas de papel absorvente, numa tigela, na
                cozinha da Dona Angela.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JORNADA — A descoberta dos 30% */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container max-w-6xl">
          <div className="max-w-3xl mb-14">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">A jornada</span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-forest-deep mt-3 leading-tight text-balance">
              Cinco anos de tentativas. Um número que mudou tudo: <span className="italic text-leaf">+30%</span> de prateleira.
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-6 text-foreground/85 leading-relaxed">
              <p>
                Em <strong>2014</strong>, a Tamoios nasceu com uma missão que parecia
                impossível: substituir o isopor — um plástico que o planeta não consegue
                reciclar — por uma espuma de celulose viva, devolvida à terra em poucos
                meses. Cinco anos seguidos a equipe punha o produto na geladeira, ele
                falhava, e voltava-se ao laboratório.
              </p>
              <p>
                Em <strong>2019</strong>, desencantou. A primeira bandeja entregou o que
                prometia — e mais: começou a chegar, repetidamente, no número mágico de
                <strong> 30% a mais de tempo de prateleira</strong>. Não num teste isolado,
                mas em cases reais. <strong>Morango e cogumelo no Rio Grande do Sul.
                Milho no Nordeste.</strong> Operações que, antes, conviviam com perdas
                rotineiras de FLV passaram a vender mais, descartar menos e repor com
                menos frequência.
              </p>
              <p>
                A conta econômica se montou sozinha. Cada unidade ganha tempo para ser
                vendida. Cada unidade que não se perde é margem preservada. Soma-se a
                isso o custo evitado de reposição, de adequação, de descarte e de
                logística reversa do produto vencido. <strong>São efeitos simultâneos —
                e eles se acumulam.</strong>
              </p>
              <p>
                Hoje, a validação técnica avança com o <strong>SENAI</strong> para
                consolidar o ganho médio observado internamente. A bandejinha — produto
                de entrada da Tamoios — é, ao mesmo tempo, três coisas:
              </p>
              <ul className="space-y-3 pl-1">
                {[
                  "Substituição de um plástico que não recicla por um biocompósito que se decompõe.",
                  "Uso de matéria-prima reciclada, renovável e produzida de forma descarbonizada.",
                  "Aumento do tempo de prateleira — menos lixo, menos aterro, mais venda.",
                ].map((t, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="font-display text-leaf text-lg shrink-0">0{i + 1}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <blockquote className="border-l-4 border-leaf pl-5 italic text-forest-deep">
                <Quote className="h-5 w-5 text-leaf mb-2" />
                Não é uma promessa de marketing — é o que clientes do Sul ao Nordeste
                relatam, semana após semana, na operação real do varejo.
              </blockquote>
            </div>

            <div className="lg:col-span-5 grid gap-5">
              <div className="rounded-3xl overflow-hidden shadow-deep">
                <img
                  src={jornadaMorango}
                  alt="Morangos em bandeja de polpa Tamoios na gôndola"
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-soft">
                <img
                  src={jornadaMaos}
                  alt="Mãos segurando bandeja de polpa recém-moldada na fábrica"
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-2xl bg-forest-deep text-primary-foreground p-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-display text-3xl text-leaf">+30%</div>
                  <p className="text-xs mt-1 text-primary-foreground/75">shelf life médio observado</p>
                </div>
                <div>
                  <div className="font-display text-3xl text-leaf">2019</div>
                  <p className="text-xs mt-1 text-primary-foreground/75">primeira entrega comercial</p>
                </div>
                <div>
                  <div className="font-display text-3xl text-leaf">3</div>
                  <p className="text-xs mt-1 text-primary-foreground/75">cases validados em campo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DISTRIBUIÇÃO NACIONAL */}
      <section className="py-20 md:py-28 bg-pulp-light/40">
        <div className="container max-w-6xl grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Distribuição nacional</span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-forest-deep mt-3 leading-tight text-balance">
              Do Rio Grande do Sul ao Ceará e Pernambuco.
            </h2>
            <p className="text-muted-foreground mt-5 leading-relaxed text-lg">
              A operação da Tamoios entrega de forma consistente em todas as regiões do
              país, com fábrica verticalizada em Itariri-SP e malha logística que cobre
              do varejo gaúcho aos centros distribuidores do Nordeste.
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { uf: "RS · SC · PR", t: "Sul" },
                { uf: "SP · MG · RJ · ES", t: "Sudeste" },
                { uf: "GO · DF · MT", t: "Centro-Oeste" },
                { uf: "BA · SE · AL", t: "Nordeste" },
                { uf: "PE · CE", t: "Nordeste" },
                { uf: "PA · MA", t: "Norte" },
              ].map((r) => (
                <div key={r.uf} className="rounded-xl border border-border bg-card p-4">
                  <TrendingUp className="h-4 w-4 text-leaf" />
                  <p className="font-display text-forest-deep mt-2">{r.uf}</p>
                  <p className="text-xs text-muted-foreground">{r.t}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <img
              src={distribuicaoBrasil}
              alt="Mapa do Brasil com rotas de distribuição da Tamoios"
              loading="lazy"
              width={1200}
              height={900}
              className="w-full h-auto rounded-3xl"
            />
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
