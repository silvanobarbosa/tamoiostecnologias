import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email("E-mail inválido").max(255),
  password: z.string().min(8, "Mínimo 8 caracteres").max(72),
});

const Auth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/blog", { replace: true });
  }, [user, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast({ title: "Dados inválidos", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/blog`,
          data: { display_name: displayName || email.split("@")[0] },
        },
      });
      if (error) toast({ title: "Erro no cadastro", description: error.message, variant: "destructive" });
      else toast({ title: "Cadastro criado", description: "Verifique seu e-mail para confirmar a conta." });
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast({ title: "Erro ao entrar", description: error.message, variant: "destructive" });
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="pt-32 pb-20 min-h-[80vh] flex items-center bg-gradient-pulp">
        <div className="container max-w-md">
          <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-deep">
            <h1 className="font-display text-3xl font-semibold text-forest-deep mb-2">
              {mode === "signin" ? "Entrar" : "Criar conta"}
            </h1>
            <p className="text-sm text-muted-foreground mb-8">
              Acesso à área de blog da Tamoios. Apenas administradores podem publicar.
            </p>
            <form onSubmit={submit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={80} />
                </div>
              )}
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" variant="forest" size="lg" className="w-full" disabled={submitting}>
                {submitting ? "Aguarde..." : mode === "signin" ? "Entrar" : "Criar conta"}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "signin" ? (
                <>Não tem conta? <button className="text-forest font-medium hover:underline" onClick={() => setMode("signup")}>Cadastre-se</button></>
              ) : (
                <>Já tem conta? <button className="text-forest font-medium hover:underline" onClick={() => setMode("signin")}>Entrar</button></>
              )}
            </div>
            <div className="mt-4 text-center">
              <Link to="/" className="text-xs text-muted-foreground hover:text-forest">← Voltar para a Home</Link>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default Auth;
