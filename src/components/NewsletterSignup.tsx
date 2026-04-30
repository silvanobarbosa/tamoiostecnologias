import { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  email: z.string().trim().email().max(255),
});

export function NewsletterSignup({ source = "site" }: { source?: string }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      toast({ title: t("newsletter.error"), variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: parsed.data.email, source });
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        toast({ title: t("newsletter.already") });
      } else {
        toast({ title: t("newsletter.error"), description: error.message, variant: "destructive" });
      }
      return;
    }
    setEmail("");
    toast({ title: t("newsletter.success") });
  };

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 w-full max-w-xl">
      <div className="relative flex-1">
        <Mail className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="email"
          required
          maxLength={255}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("newsletter.placeholder")}
          className="pl-9 h-12 bg-background/90"
        />
      </div>
      <Button type="submit" variant="forest" size="lg" disabled={loading}>
        {loading ? "…" : t("newsletter.submit")}
      </Button>
    </form>
  );
}
