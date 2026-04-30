import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const profileSchema = z.object({
  display_name: z.string().trim().min(2).max(80),
  bio: z.string().trim().max(500).optional().or(z.literal("")),
  avatar_url: z.string().trim().url().max(500).optional().or(z.literal("")),
});

const Account = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [savingPwd, setSavingPwd] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("display_name,bio,avatar_url")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        setDisplayName(data?.display_name ?? "");
        setBio(data?.bio ?? "");
        setAvatar(data?.avatar_url ?? "");
      });
  }, [user]);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const parsed = profileSchema.safeParse({ display_name: displayName, bio, avatar_url: avatar });
    if (!parsed.success) {
      toast({ title: "Dados inválidos", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSavingProfile(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: parsed.data.display_name,
        bio: parsed.data.bio || null,
        avatar_url: parsed.data.avatar_url || null,
      })
      .eq("id", user.id);
    setSavingProfile(false);
    if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
    else toast({ title: "Perfil atualizado" });
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast({ title: "Senha curta", description: "Use ao menos 8 caracteres.", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPwd) {
      toast({ title: "Senhas diferentes", variant: "destructive" });
      return;
    }
    setSavingPwd(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSavingPwd(false);
    if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Senha atualizada" });
      setNewPassword("");
      setConfirmPwd("");
    }
  };

  return (
    <div className="container max-w-3xl py-8 md:py-12 space-y-10">
      <header>
        <span className="text-leaf font-semibold text-xs tracking-widest uppercase">Configurações</span>
        <h1 className="font-display text-3xl md:text-4xl text-forest-deep mt-1">Minha conta</h1>
      </header>

      <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <h2 className="font-display text-xl text-forest-deep mb-1">Perfil</h2>
        <p className="text-sm text-muted-foreground mb-6">Como você aparece como autor dos posts.</p>
        <form onSubmit={saveProfile} className="space-y-5">
          <div>
            <Label htmlFor="email">E-mail (login)</Label>
            <Input id="email" value={user?.email ?? ""} disabled />
          </div>
          <div>
            <Label htmlFor="name">Nome de exibição</Label>
            <Input id="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={80} />
          </div>
          <div>
            <Label htmlFor="avatar">URL do avatar</Label>
            <Input id="avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="https://…" maxLength={500} />
          </div>
          <div>
            <Label htmlFor="bio">Bio curta</Label>
            <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} maxLength={500} />
          </div>
          <Button type="submit" variant="forest" disabled={savingProfile}>
            {savingProfile ? "Salvando…" : "Salvar perfil"}
          </Button>
        </form>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <h2 className="font-display text-xl text-forest-deep mb-1">Senha</h2>
        <p className="text-sm text-muted-foreground mb-6">Mínimo 8 caracteres.</p>
        <form onSubmit={changePassword} className="space-y-5">
          <div>
            <Label htmlFor="np">Nova senha</Label>
            <Input id="np" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} autoComplete="new-password" />
          </div>
          <div>
            <Label htmlFor="cp">Confirmar nova senha</Label>
            <Input id="cp" type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} autoComplete="new-password" />
          </div>
          <Button type="submit" variant="forest" disabled={savingPwd}>
            {savingPwd ? "Atualizando…" : "Atualizar senha"}
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Account;
