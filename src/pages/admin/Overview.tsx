import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FilePen, Mail, Megaphone, ArrowRight, PlusCircle } from "lucide-react";

type Stats = {
  postsPublished: number;
  postsDrafts: number;
  newMessages: number;
  totalMessages: number;
  subscribers: number;
};

const KPI = ({ icon: Icon, label, value, hint }: { icon: any; label: string; value: number | string; hint?: string }) => (
  <Card>
    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </CardTitle>
      <Icon className="h-4 w-4 text-leaf" />
    </CardHeader>
    <CardContent>
      <div className="font-display text-3xl text-forest-deep">{value}</div>
      {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
    </CardContent>
  </Card>
);

const Overview = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentMsgs, setRecentMsgs] = useState<{ id: string; name: string; email: string; created_at: string }[]>([]);
  const [recentPosts, setRecentPosts] = useState<{ id: string; title: string; status: string; created_at: string; slug: string }[]>([]);

  useEffect(() => {
    (async () => {
      const [pubP, draftP, newM, totM, subs] = await Promise.all([
        supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "draft"),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("status", "novo"),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }),
        supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        postsPublished: pubP.count ?? 0,
        postsDrafts: draftP.count ?? 0,
        newMessages: newM.count ?? 0,
        totalMessages: totM.count ?? 0,
        subscribers: subs.count ?? 0,
      });

      const { data: msgs } = await supabase
        .from("contact_messages")
        .select("id,name,email,created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      setRecentMsgs(msgs ?? []);

      const { data: posts } = await supabase
        .from("posts")
        .select("id,title,status,created_at,slug")
        .order("created_at", { ascending: false })
        .limit(5);
      setRecentPosts((posts as any) ?? []);
    })();
  }, []);

  return (
    <div className="container max-w-6xl py-8 md:py-12 space-y-10">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="text-leaf font-semibold text-xs tracking-widest uppercase">Painel admin</span>
          <h1 className="font-display text-3xl md:text-4xl text-forest-deep mt-1">Visão geral</h1>
        </div>
        <Button asChild variant="forest"><Link to="/admin/posts/new"><PlusCircle /> Novo post</Link></Button>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI icon={FileText} label="Posts publicados" value={stats?.postsPublished ?? "—"} />
        <KPI icon={FilePen} label="Rascunhos" value={stats?.postsDrafts ?? "—"} />
        <KPI icon={Mail} label="Mensagens novas" value={stats?.newMessages ?? "—"} hint={`${stats?.totalMessages ?? 0} no total`} />
        <KPI icon={Megaphone} label="Inscritos newsletter" value={stats?.subscribers ?? "—"} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Mensagens recentes</CardTitle>
            <Button asChild size="sm" variant="ghost"><Link to="/admin/messages">Ver todas <ArrowRight className="h-4 w-4" /></Link></Button>
          </CardHeader>
          <CardContent>
            {recentMsgs.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhuma mensagem ainda.</p>
            ) : (
              <ul className="divide-y divide-border">
                {recentMsgs.map((m) => (
                  <li key={m.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-forest-deep text-sm truncate">{m.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{m.email}</p>
                    </div>
                    <time className="text-xs text-muted-foreground shrink-0">
                      {new Date(m.created_at).toLocaleDateString("pt-BR")}
                    </time>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Posts recentes</CardTitle>
            <Button asChild size="sm" variant="ghost"><Link to="/admin/posts">Gerenciar <ArrowRight className="h-4 w-4" /></Link></Button>
          </CardHeader>
          <CardContent>
            {recentPosts.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum post ainda.</p>
            ) : (
              <ul className="divide-y divide-border">
                {recentPosts.map((p) => (
                  <li key={p.id} className="py-3 flex items-center justify-between gap-3">
                    <Link to={`/admin/posts/${p.id}/edit`} className="min-w-0 hover:text-forest">
                      <p className="font-medium text-sm truncate">{p.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {p.status === "published" ? "Publicado" : "Rascunho"} ·{" "}
                        {new Date(p.created_at).toLocaleDateString("pt-BR")}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
