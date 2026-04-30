import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { ShieldCheck, ShieldOff, UserPlus } from "lucide-react";

type Profile = { id: string; display_name: string | null };
type Row = Profile & { isAdmin: boolean };

const TeamAdmin = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [granting, setGranting] = useState("");

  const load = async () => {
    setLoading(true);
    const [{ data: profiles }, { data: roles }] = await Promise.all([
      supabase.from("profiles").select("id,display_name"),
      supabase.from("user_roles").select("user_id,role"),
    ]);
    const adminSet = new Set(
      (roles ?? []).filter((r: any) => r.role === "admin").map((r: any) => r.user_id)
    );
    const list = (profiles ?? []).map((p: any) => ({
      id: p.id,
      display_name: p.display_name,
      isAdmin: adminSet.has(p.id),
    }));
    list.sort((a, b) => Number(b.isAdmin) - Number(a.isAdmin) || (a.display_name ?? "").localeCompare(b.display_name ?? ""));
    setRows(list);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const grant = async (userId: string) => {
    const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: "admin" });
    if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
    else { toast({ title: "Admin concedido" }); load(); }
  };

  const revoke = async (userId: string) => {
    if (userId === user?.id) {
      toast({ title: "Você não pode revogar seu próprio acesso", variant: "destructive" });
      return;
    }
    if (!confirm("Remover acesso de administrador deste usuário?")) return;
    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("user_id", userId)
      .eq("role", "admin");
    if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
    else { toast({ title: "Admin revogado" }); load(); }
  };

  const grantById = async () => {
    const trimmed = granting.trim();
    if (!trimmed) return;
    const { error } = await supabase.from("user_roles").insert({ user_id: trimmed, role: "admin" });
    if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
    else { setGranting(""); toast({ title: "Admin concedido" }); load(); }
  };

  const filtered = rows.filter((r) =>
    (r.display_name ?? "").toLowerCase().includes(search.toLowerCase()) || r.id.includes(search)
  );

  return (
    <div className="container max-w-5xl py-8 md:py-12 space-y-8">
      <header>
        <span className="text-leaf font-semibold text-xs tracking-widest uppercase">Equipe</span>
        <h1 className="font-display text-3xl md:text-4xl text-forest-deep mt-1">Administradores</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
          Conceda ou revogue acesso ao painel admin. O usuário precisa ter criado uma conta no site
          (página /auth) antes de receber permissão.
        </p>
      </header>

      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="text-xs uppercase tracking-widest text-leaf font-semibold mb-3">
          Conceder por User ID
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="UUID do usuário (encontre na lista abaixo após o cadastro)"
            value={granting}
            onChange={(e) => setGranting(e.target.value)}
          />
          <Button variant="forest" onClick={grantById} disabled={!granting.trim()}>
            <UserPlus className="h-4 w-4" /> Conceder
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <Input
            placeholder="Buscar por nome ou ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <span className="text-xs text-muted-foreground">{filtered.length} usuário(s)</span>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-x-auto">
          {loading ? (
            <p className="p-8 text-sm text-muted-foreground">Carregando…</p>
          ) : filtered.length === 0 ? (
            <p className="p-8 text-sm text-muted-foreground">Nenhum usuário encontrado.</p>
          ) : (
            <table className="w-full text-sm min-w-[640px]">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-4">Usuário</th>
                  <th className="p-4">ID</th>
                  <th className="p-4">Permissão</th>
                  <th className="p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t border-border">
                    <td className="p-4 font-medium text-forest-deep">
                      {r.display_name ?? "—"}
                      {r.id === user?.id && <span className="text-xs text-muted-foreground ml-2">(você)</span>}
                    </td>
                    <td className="p-4 text-xs text-muted-foreground font-mono">{r.id.slice(0, 8)}…</td>
                    <td className="p-4">
                      {r.isAdmin ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-leaf/15 text-leaf inline-flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3" /> Admin
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Usuário</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {r.isAdmin ? (
                        <Button variant="ghost" size="sm" onClick={() => revoke(r.id)} disabled={r.id === user?.id}>
                          <ShieldOff className="h-4 w-4 text-destructive" /> Revogar
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" onClick={() => grant(r.id)}>
                          <ShieldCheck className="h-4 w-4" /> Tornar admin
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamAdmin;
