import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
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
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [msgs, setMsgs] = useState<Msg[]>([]);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate("/blog", { replace: true });
  }, [user, isAdmin, loading, navigate]);

  const load = async () => {
    const { data } = await supabase
      .from("contact_messages")
      .select("id,name,email,company,phone,segment,message,status,created_at")
      .order("created_at", { ascending: false });
    setMsgs((data as Msg[]) ?? []);
  };
  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

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

  if (loading || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="pt-32 pb-20">
        <div className="container">
          <Link to="/admin" className="text-xs text-muted-foreground hover:text-forest">← Painel admin</Link>
          <h1 className="font-display text-4xl font-semibold text-forest-deep mt-2 mb-10">
            Mensagens de contato ({msgs.length})
          </h1>
          <div className="space-y-4">
            {msgs.length === 0 ? (
              <p className="text-muted-foreground">Nenhuma mensagem ainda.</p>
            ) : msgs.map((m) => (
              <article key={m.id} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-display text-lg text-forest-deep">{m.name}</h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${m.status === "novo" ? "bg-leaf/15 text-leaf" : m.status === "respondido" ? "bg-muted text-muted-foreground" : "bg-amber-100 text-amber-800"}`}>
                        {STATUS_LABEL[m.status]}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
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
      </section>
      <SiteFooter />
    </div>
  );
};

export default AdminMessages;
