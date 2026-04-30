import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Pencil } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

type AdminPost = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  category: string;
  published_at: string | null;
  created_at: string;
};

const CAT_LABEL: Record<string, string> = {
  "bandejas-flv": "Bandejas FLV",
  "calcos-tecnicos": "Calços Técnicos",
  "agro-florestal": "Agro & Florestal",
  sustentabilidade: "Sustentabilidade",
  cases: "Cases",
  noticias: "Notícias",
};

const PostsAdmin = () => {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | "published" | "draft">("");

  const load = async () => {
    const { data } = await supabase
      .from("posts")
      .select("id,title,slug,status,category,published_at,created_at")
      .order("created_at", { ascending: false });
    setPosts((data as AdminPost[]) ?? []);
  };
  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    if (!confirm("Apagar este post? Esta ação não pode ser desfeita.")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
    else { toast({ title: "Post apagado" }); load(); }
  };

  const togglePublish = async (p: AdminPost) => {
    const next = p.status === "published" ? "draft" : "published";
    const { error } = await supabase
      .from("posts")
      .update({
        status: next,
        published_at: next === "published" ? new Date().toISOString() : null,
      })
      .eq("id", p.id);
    if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
    else { toast({ title: next === "published" ? "Publicado" : "Despublicado" }); load(); }
  };

  const visible = posts.filter((p) => {
    const matchText = p.title.toLowerCase().includes(filter.toLowerCase());
    const matchStatus = statusFilter ? p.status === statusFilter : true;
    return matchText && matchStatus;
  });

  return (
    <div className="container max-w-6xl py-8 md:py-12 space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="text-leaf font-semibold text-xs tracking-widest uppercase">Conteúdo</span>
          <h1 className="font-display text-3xl md:text-4xl text-forest-deep mt-1">Posts do blog</h1>
        </div>
        <Button asChild variant="forest"><Link to="/admin/posts/new"><Plus /> Novo post</Link></Button>
      </header>

      <div className="flex flex-wrap gap-3">
        <Input
          placeholder="Buscar por título…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-xs"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">Todos os status</option>
          <option value="published">Publicados</option>
          <option value="draft">Rascunhos</option>
        </select>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-x-auto">
        {visible.length === 0 ? (
          <p className="p-8 text-muted-foreground text-sm">Nenhum post encontrado.</p>
        ) : (
          <table className="w-full text-sm min-w-[720px]">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-4">Título</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Status</th>
                <th className="p-4">Data</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="p-4 font-medium text-forest-deep">
                    <Link to={`/admin/posts/${p.id}/edit`} className="hover:text-forest">{p.title}</Link>
                  </td>
                  <td className="p-4 text-muted-foreground text-xs">{CAT_LABEL[p.category] ?? p.category}</td>
                  <td className="p-4">
                    <button
                      onClick={() => togglePublish(p)}
                      className={`text-xs px-2 py-1 rounded-full transition-colors hover:opacity-80 ${
                        p.status === "published" ? "bg-leaf/15 text-leaf" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {p.status === "published" ? "Publicado" : "Rascunho"}
                    </button>
                  </td>
                  <td className="p-4 text-muted-foreground text-xs">
                    {new Date(p.published_at ?? p.created_at).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="p-4 text-right space-x-1">
                    {p.status === "published" && (
                      <Button asChild variant="ghost" size="sm"><Link to={`/blog/${p.slug}`}>Ver</Link></Button>
                    )}
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/admin/posts/${p.id}/edit`}><Pencil className="h-4 w-4" /></Link>
                    </Button>
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
    </div>
  );
};

export default PostsAdmin;
