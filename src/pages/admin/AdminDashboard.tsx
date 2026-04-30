import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type AdminPost = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
};

const AdminDashboard = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<AdminPost[]>([]);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate("/blog", { replace: true });
  }, [user, isAdmin, loading, navigate]);

  const load = async () => {
    const { data } = await supabase
      .from("posts")
      .select("id,title,slug,status,published_at,created_at")
      .order("created_at", { ascending: false });
    setPosts((data as AdminPost[]) ?? []);
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  const remove = async (id: string) => {
    if (!confirm("Apagar este post?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
    else { toast({ title: "Post apagado" }); load(); }
  };

  if (loading || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="pt-32 pb-20">
        <div className="container">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Painel admin</span>
              <h1 className="font-display text-4xl font-semibold text-forest-deep mt-2">Posts do blog</h1>
            </div>
            <Button asChild variant="forest"><Link to="/admin/posts/new"><Plus /> Novo post</Link></Button>
          </div>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {posts.length === 0 ? (
              <p className="p-8 text-muted-foreground">Nenhum post ainda.</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-pulp-light/40 text-left">
                  <tr>
                    <th className="p-4">Título</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Data</th>
                    <th className="p-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((p) => (
                    <tr key={p.id} className="border-t border-border">
                      <td className="p-4 font-medium text-forest-deep">{p.title}</td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${p.status === "published" ? "bg-leaf/15 text-leaf" : "bg-muted text-muted-foreground"}`}>
                          {p.status === "published" ? "Publicado" : "Rascunho"}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {new Date(p.published_at ?? p.created_at).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {p.status === "published" && (
                          <Button asChild variant="ghost" size="sm"><Link to={`/blog/${p.slug}`}>Ver</Link></Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => remove(p.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            Para conceder acesso de administrador a um novo usuário, abra o backend em Lovable Cloud e adicione uma linha em <code>user_roles</code> com <code>role = admin</code>.
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default AdminDashboard;
