import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Handshake, Truck, MapPin, TrendingUp } from "lucide-react";

const schema = z.object({
  person_type: z.enum(["fisica", "juridica"]),
  name: z.string().trim().min(2, "Informe o nome").max(160),
  document: z.string().trim().min(5, "Informe CPF/CNPJ").max(30),
  company_name: z.string().trim().max(200).optional(),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().min(6, "Informe o telefone").max(40),
  address: z.string().trim().max(300).optional(),
  city: z.string().trim().min(2, "Informe a cidade").max(120),
  state: z.string().trim().min(2, "Informe o estado").max(40),
  cep: z.string().trim().max(15).optional(),
  region: z.string().trim().max(300).optional(),
  model: z.string().trim().max(60).optional(),
  message: z.string().trim().min(10, "Conte um pouco mais (mín. 10 caracteres)").max(4000),
});

const empty = { person_type: "juridica", name: "", document: "", company_name: "", email: "", phone: "", address: "", city: "", state: "", cep: "", region: "", model: "", message: "" };

const CONSENT_VERSION = "2026-10-09";

const models = [
  { icon: Handshake, t: "Representação comercial", d: "Atue como representante autônomo ou empresa, com comissão sobre vendas na sua região." },
  { icon: Truck, t: "Distribuição", d: "Compre, estoque e revenda nossas soluções com condições especiais para distribuidores." },
  { icon: MapPin, t: "Atuação regional", d: "Modelos adaptados ao seu território, carteira de clientes e segmento de atuação." },
  { icon: TrendingUp, t: "Crescimento conjunto", d: "Suporte comercial, materiais técnicos e treinamento sobre as linhas Tamoios." },
];

export default function SejaRepresentante() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [consent, setConsent] = useState(false);
  const up = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const pj = form.person_type === "juridica";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const p = schema.safeParse(form);
    if (!p.success) {
      toast({ title: "Verifique os campos", description: p.error.issues[0].message, variant: "destructive" });
      return;
    }
    if (!consent) {
      toast({ title: "Consentimento necessário", description: "Autorize o tratamento dos seus dados para enviar o cadastro.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const d = p.data;
    const n = (v?: string) => (v ? v : null);
    const { error } = await supabase.from("representative_applications").insert({
      person_type: d.person_type, name: d.name, document: d.document, company_name: pj ? n(d.company_name) : null,
      email: d.email, phone: d.phone, address: n(d.address), city: d.city, state: d.state, cep: n(d.cep),
      region: n(d.region), model: n(d.model), message: d.message,
      consent_at: new Date().toISOString(), consent_version: CONSENT_VERSION,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Não foi possível enviar", description: "Tente novamente em instantes.", variant: "destructive" });
      return;
    }
    setDone(true);
    setForm(empty);
    setConsent(false);
    toast({ title: "Recebemos seu cadastro!", description: "Nossa equipe comercial entrará em contato." });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Seja um representante" description="Modelos flexíveis de representação e distribuição das soluções Tamoios Tecnologia em biomassa." />
      <SiteHeader />
      <main>
        <section className="pt-32 pb-16 container max-w-5xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Parcerias comerciais</p>
          <h1 className="font-display text-4xl md:text-6xl leading-tight mb-6">Seja um representante das nossas soluções!</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Temos modelos flexíveis de representação e distribuição para levar embalagens e soluções em biomassa a novos mercados. Seja pessoa física ou jurídica, queremos construir parcerias que façam sentido para o seu negócio.
          </p>
        </section>

        <section className="container max-w-5xl pb-16 grid sm:grid-cols-2 gap-5">
          {models.map(({ icon: I, t, d }) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-6">
              <I className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-display text-xl mb-2">{t}</h3>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </section>

        <section id="formulario" className="container max-w-3xl pb-24">
          <h2 className="font-display text-3xl md:text-4xl mb-8">Nos conte um pouco de você e como podemos nos ajudar nos negócios!</h2>
          <form onSubmit={submit} className="grid gap-5 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div>
              <Label>Tipo de pessoa</Label>
              <div className="flex gap-6 mt-2 text-sm">
                {[["juridica", "Pessoa jurídica"], ["fisica", "Pessoa física"]].map(([v, l]) => (
                  <label key={v} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="pt" value={v} checked={form.person_type === v} onChange={up("person_type")} /> {l}
                  </label>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div><Label htmlFor="r-name">{pj ? "Nome do responsável" : "Nome completo"} *</Label><Input id="r-name" maxLength={160} value={form.name} onChange={up("name")} /></div>
              <div><Label htmlFor="r-doc">{pj ? "CNPJ" : "CPF"} *</Label><Input id="r-doc" maxLength={30} value={form.document} onChange={up("document")} /></div>
            </div>
            {pj && <div><Label htmlFor="r-co">Razão social / Nome fantasia</Label><Input id="r-co" maxLength={200} value={form.company_name} onChange={up("company_name")} /></div>}
            <div className="grid md:grid-cols-2 gap-5">
              <div><Label htmlFor="r-email">E-mail *</Label><Input id="r-email" type="email" maxLength={255} value={form.email} onChange={up("email")} /></div>
              <div><Label htmlFor="r-phone">Telefone / WhatsApp *</Label><Input id="r-phone" maxLength={40} value={form.phone} onChange={up("phone")} /></div>
            </div>
            <div><Label htmlFor="r-addr">Endereço</Label><Input id="r-addr" maxLength={300} value={form.address} onChange={up("address")} /></div>
            <div className="grid md:grid-cols-3 gap-5">
              <div><Label htmlFor="r-city">Cidade *</Label><Input id="r-city" maxLength={120} value={form.city} onChange={up("city")} /></div>
              <div><Label htmlFor="r-state">Estado *</Label><Input id="r-state" maxLength={40} value={form.state} onChange={up("state")} /></div>
              <div><Label htmlFor="r-cep">CEP</Label><Input id="r-cep" maxLength={15} value={form.cep} onChange={up("cep")} /></div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div><Label htmlFor="r-region">Região de atuação</Label><Input id="r-region" maxLength={300} value={form.region} onChange={up("region")} /></div>
              <div>
                <Label htmlFor="r-model">Modelo de interesse</Label>
                <select id="r-model" value={form.model} onChange={up("model")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="">—</option>
                  <option>Representação comercial</option>
                  <option>Distribuição</option>
                  <option>Ainda não sei</option>
                </select>
              </div>
            </div>
            <div><Label htmlFor="r-msg">Conte sobre você, sua experiência e como podemos ajudar *</Label><Textarea id="r-msg" rows={6} maxLength={4000} value={form.message} onChange={up("message")} /></div>
            <label className="flex items-start gap-3 text-sm leading-relaxed cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0"
                aria-required="true"
              />
              <span>
                Declaro que li e concordo com a{" "}
                <Link to="/politica-de-privacidade" target="_blank" className="underline underline-offset-2 font-medium">
                  Política de Privacidade
                </Link>{" "}
                e autorizo a Tamoios Tecnologia a tratar meus dados pessoais para avaliar este cadastro e entrar em contato comercial, nos termos da LGPD (Lei nº 13.709/2018). Posso revogar esse consentimento a qualquer momento. *
              </span>
            </label>
            <Button type="submit" variant="forest" size="lg" disabled={loading}>{loading ? "Enviando..." : done ? "Enviado! Enviar outro" : "Enviar cadastro"}</Button>
          </form>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
