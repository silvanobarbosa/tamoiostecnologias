import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

type Sub = { id: string; email: string; name: string | null; source: string | null; created_at: string };

const AdminSubscribers = () => {
  const [subs, setSubs] = useState<Sub[]>([]);

  const load = async () => {
    const { data } = await supabase
      .from("newsletter_subscribers")
      .select("id,email,name,source,created_at")
      .order("created_at", { ascending: false });
    setSubs((data as Sub[]) ?? []);
  };
  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    if (!confirm("Remover este inscrito?")) return;
    const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id);
    if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
    else { toast({ title: "Removido" }); load(); }
  };

  const exportCsv = () => {
    const csv = ["email,name,source,created_at", ...subs.map((s) =>
      [s.email, s.name ?? "", s.source ?? "", s.created_at].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")
    )].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `tamoios-subscribers-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container max-w-5xl py-8 md:py-12 space-y-6">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <span className="text-leaf font-semibold text-xs tracking-widest uppercase">Relacionamento</span>
          <h1 className="font-display text-3xl md:text-4xl text-forest-deep mt-1">Newsletter ({subs.length})</h1>
        </div>
        <Button variant="outline" onClick={exportCsv} disabled={!subs.length}>Exportar CSV</Button>
      </header>
      <div className="rounded-2xl border border-border bg-card overflow-x-auto">
        {subs.length === 0 ? (
          <p className="p-8 text-sm text-muted-foreground">Nenhum inscrito ainda.</p>
        ) : (
          <table className="w-full text-sm min-w-[560px]">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-4">E-mail</th>
                <th className="p-4">Origem</th>
                <th className="p-4">Inscrito em</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <tr key={s.id} className="border-t border-border">
                  <td className="p-4 font-medium text-forest-deep">{s.email}</td>
                  <td className="p-4 text-muted-foreground">{s.source ?? "—"}</td>
                  <td className="p-4 text-muted-foreground">{new Date(s.created_at).toLocaleString("pt-BR")}</td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm" onClick={() => remove(s.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminSubscribers;
