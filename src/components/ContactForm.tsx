import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  segment: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(4000),
});



export function ContactForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    segment: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefill = sessionStorage.getItem("impact-prefill");
    if (prefill) {
      setForm((f) => ({ ...f, message: prefill }));
      sessionStorage.removeItem("impact-prefill");
    }
  }, []);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({ title: t("contact.error"), description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || null,
      phone: parsed.data.phone || null,
      segment: parsed.data.segment || null,
      message: parsed.data.message,
    });
    setLoading(false);
    if (error) {
      toast({ title: t("contact.error"), description: error.message, variant: "destructive" });
      return;
    }
    setDone(true);
    toast({ title: t("contact.success") });
  };

  return (
    <form onSubmit={submit} className="grid gap-5 text-left">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="c-name">{t("contact.name")}</Label>
          <Input id="c-name" required maxLength={120} value={form.name} onChange={update("name")} />
        </div>
        <div>
          <Label htmlFor="c-email">{t("contact.email")}</Label>
          <Input id="c-email" type="email" required maxLength={255} value={form.email} onChange={update("email")} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="c-company">{t("contact.company")}</Label>
          <Input id="c-company" maxLength={160} value={form.company} onChange={update("company")} />
        </div>
        <div>
          <Label htmlFor="c-phone">{t("contact.phone")}</Label>
          <Input id="c-phone" maxLength={40} value={form.phone} onChange={update("phone")} />
        </div>
      </div>
      <div>
        <Label htmlFor="c-segment">{t("contact.segment")}</Label>
        <select
          id="c-segment"
          value={form.segment}
          onChange={update("segment")}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">—</option>
          <option value="Bandejas FLV">{t("contact.segments.flv")}</option>
          <option value="Calços Técnicos">{t("contact.segments.calcos")}</option>
          <option value="Agro & Florestal">{t("contact.segments.agro")}</option>
          <option value="Outro">{t("contact.segments.other")}</option>
        </select>
      </div>
      <div>
        <Label htmlFor="c-message">{t("contact.message")}</Label>
        <Textarea id="c-message" required minLength={10} maxLength={4000} rows={5} value={form.message} onChange={update("message")} />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button type="submit" variant="forest" size="lg" disabled={loading || done}>
          {loading ? t("contact.sending") : done ? t("contact.success") : t("contact.submit")}
        </Button>
      </div>
    </form>
  );
}
