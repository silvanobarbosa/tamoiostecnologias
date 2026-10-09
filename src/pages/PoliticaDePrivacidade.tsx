import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SEO } from "@/components/SEO";

const sections = [
  {
    title: "1. Quem somos",
    body: [
      "Tamoios Tecnologia é uma indústria brasileira de tecnologia em biomassa, com unidade em Ana Dias, Itariri/SP, Brasil. Somos o controlador dos dados pessoais tratados por este site, nos termos da Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018).",
      "Para qualquer assunto relacionado a dados pessoais, você pode falar conosco pelo e-mail fernanda@tamoiostecnologia.com.br ou pelo telefone +55 11 94006 6986.",
    ],
  },
  {
    title: "2. Quais dados coletamos",
    body: [
      "Coletamos apenas os dados que você fornece voluntariamente pelos formulários do site:",
      "• Formulário de contato: nome, e-mail, empresa, telefone, segmento de interesse e mensagem.",
      "• Formulário “Seja um representante”: tipo de pessoa, nome, CPF ou CNPJ, razão social (quando aplicável), e-mail, telefone, endereço, cidade, estado, CEP, região de atuação, modelo de interesse e mensagem.",
      "• Newsletter: e-mail informado para recebimento de conteúdo.",
      "Não coletamos dados sensíveis e não coletamos dados de navegação para perfilamento publicitário.",
    ],
  },
  {
    title: "3. Para que usamos seus dados",
    body: [
      "Utilizamos seus dados exclusivamente para: avaliar seu cadastro e mensagem; entrar em contato comercial sobre as soluções Tamoios; gerenciar sua inscrição na newsletter; e cumprir obrigações legais.",
      "Seus dados não são vendidos, alugados ou trocados com terceiros.",
    ],
  },
  {
    title: "4. Base legal do tratamento",
    body: [
      "O tratamento dos dados dos formulários e da newsletter ocorre com base no seu consentimento (art. 7º, I, da LGPD), manifestado de forma livre, informada e inequívoca ao enviar o formulário ou se inscrever.",
      "Você pode revogar esse consentimento a qualquer momento, sem prejuízo do que já foi feito até então.",
    ],
  },
  {
    title: "5. Compartilhamento e segurança",
    body: [
      "Os dados são armazenados em infraestrutura segura, com acesso restrito à equipe autorizada da Tamoios Tecnologia. Adotamos medidas técnicas e administrativas para proteger as informações contra acesso não autorizado, perda ou alteração indevida.",
      "Só compartilhamos dados quando necessário para cumprir obrigação legal ou ordem judicial.",
    ],
  },
  {
    title: "6. Prazo de guarda",
    body: [
      "Mantemos seus dados pelo tempo necessário para os fins descritos nesta política e para atendimento a obrigações legais. Encerrado esse período, os dados são eliminados ou anonimizados.",
    ],
  },
  {
    title: "7. Seus direitos",
    body: [
      "Como titular, você pode solicitar a qualquer momento: confirmação de tratamento; acesso aos seus dados; correção de dados incompletos ou desatualizados; anonimização, bloqueio ou eliminação de dados desnecessários; portabilidade; informações sobre compartilhamentos; e revogação do consentimento.",
      "Para exercer qualquer um desses direitos, escreva para fernanda@tamoiostecnologia.com.br. Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).",
    ],
  },
  {
    title: "8. Atualizações desta política",
    body: [
      "Esta política pode ser atualizada para refletir mudanças em nossos processos ou na legislação. A versão vigente está sempre disponível nesta página, com a data de atualização indicada abaixo.",
    ],
  },
];

export default function PoliticaDePrivacidade() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Política de Privacidade"
        description="Como a Tamoios Tecnologia coleta, usa e protege seus dados pessoais, conforme a LGPD (Lei nº 13.709/2018)."
      />
      <SiteHeader />
      <main>
        <section className="pt-32 pb-10 container max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">LGPD · Lei nº 13.709/2018</p>
          <h1 className="font-display text-4xl md:text-5xl leading-tight mb-4">Política de Privacidade</h1>
          <p className="text-muted-foreground">
            Transparência sobre como tratamos os dados pessoais de quem fala com a Tamoios.
          </p>
        </section>

        <section className="container max-w-3xl pb-16 grid gap-8">
          {sections.map(({ title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="font-display text-xl md:text-2xl mb-3">{title}</h2>
              <div className="grid gap-3 text-sm leading-relaxed text-muted-foreground">
                {body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
          <p className="text-xs text-muted-foreground">Última atualização: 9 de outubro de 2026.</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
