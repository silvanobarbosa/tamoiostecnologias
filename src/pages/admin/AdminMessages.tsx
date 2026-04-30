import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

type Status = "novo" | "em_andamento" | "respondido" | "arquivado";
type Msg = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  segment: string | null;
  message: string;
  status: Status;
  created_at: string;
};

const STATUS_LABEL: Record<Status, string> = {
  novo: "Novo",
  em_andamento: "Em andamento",
  respondido: "Respondido",
  arquivado: "Arquivado",
};

const AdminMessages = () => {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | Status>("");

  const load = async () => {
    const { data } = await supabase
      .from("contact_messages")
      .select("id,name,email,company,phone,segment,message,status,created_at")
      .order("created_at", { ascending: false });
    setMsgs((data as Msg[]) ?? []);
  };
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: Status) => {
    const { error } = await supabase.from("contact_messages").update({ status }).eq("id", id);
    if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
    else load();
  };

  const remove = async (id: string) => {
    if (!confirm("Apagar esta mensagem?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
    else { toast({ title: "Apagada" }); load(); }
  };

  const filtered = useMemo(() => msgs.filter((m) => {
    const s = search.toLowerCase();
    const matchText = !s || m.name.toLowerCase().includes(s) || m.email.toLowerCase().includes(s) || m.message.toLowerCase().includes(s);
    const matchStatus = !statusFilter || m.status === statusFilter;
    return matchText && matchStatus;
  }), [msgs, search, statusFilter]);

  return (
    <div className="container max-w-5xl py-8 md:py-12 space-y-6">
      <header>
        <span className="text-leaf font-semibold text-xs tracking-widest uppercase">Relacionamento</span>
        <h1 className="font-display text-3xl md:text-4xl text-forest-deep mt-1">
          Mensagens de contato ({filtered.length})
        </h1>
      </header>

      <div className="flex flex-wrap gap-3">
        <Input placeholder="Buscar por nome, e-mail ou texto…" value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">Todos os status</option>
          {Object.entries(STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma mensagem.</p>
        ) : filtered.map((m) => (
          <article key={m.id} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-lg text-forest-deep">{m.name}</h2>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    m.status === "novo" ? "bg-leaf/15 text-leaf" :
                    m.status === "respondido" ? "bg-muted text-muted-foreground" :
                    m.status === "arquivado" ? "bg-muted text-muted-foreground" :
                    "bg-amber-100 text-amber-800"
                  }`}>
                    {STATUS_LABEL[m.status]}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1 break-all">
                  <a href={`mailto:${m.email}`} className="hover:text-forest">{m.email}</a>
                  {m.company && <> · {m.company}</>}
                  {m.phone && <> · {m.phone}</>}
                  {m.segment && <> · {m.segment}</>}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{new Date(m.created_at).toLocaleString("pt-BR")}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={m.status}
                  onChange={(e) => updateStatus(m.id, e.target.value as Status)}
                  className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                >
                  {Object.entries(STATUS_LABEL).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
                <Button variant="ghost" size="sm" onClick={() => remove(m.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
            <p className="mt-4 whitespace-pre-wrap text-sm text-foreground/90 leading-relaxed">{m.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AdminMessages;
