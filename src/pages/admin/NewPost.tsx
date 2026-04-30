import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { slugify } from "@/lib/slug";
import { z } from "zod";

const schema = z.object({
  title: z.string().trim().min(3).max(160),
  excerpt: z.string().trim().max(280).optional(),
  content: z.string().trim().min(20).max(20000),
  cover_image_url: z.string().trim().url().max(500).optional().or(z.literal("")),
});

const NewPost = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate("/blog", { replace: true });
  }, [user, isAdmin, loading, navigate]);

  const submit = async (e: React.FormEvent, status: "draft" | "published") => {
    e.preventDefault();
    if (!user) return;
    const parsed = schema.safeParse({ title, excerpt, content, cover_image_url: cover });
    if (!parsed.success) {
      toast({ title: "Dados inválidos", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSaving(true);
    const slug = `${slugify(title)}-${Date.now().toString(36)}`;
    const { error, data } = await supabase
      .from("posts")
      .insert({
        author_id: user.id,
        title,
        slug,
        excerpt: excerpt || null,
        content,
        cover_image_url: cover || null,
        status,
        published_at: status === "published" ? new Date().toISOString() : null,
      })
      .select("slug")
      .single();
    setSaving(false);
    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: status === "published" ? "Post publicado" : "Rascunho salvo" });
    navigate(status === "published" ? `/blog/${data.slug}` : "/admin");
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="pt-32 pb-20">
        <div className="container max-w-3xl">
          <Link to="/admin" className="text-xs text-muted-foreground hover:text-forest">← Painel admin</Link>
          <h1 className="font-display text-4xl font-semibold text-forest-deep mt-2 mb-8">Novo post</h1>
          <form className="space-y-6">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={160} />
            </div>
            <div>
              <Label htmlFor="excerpt">Resumo (opcional)</Label>
              <Input id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} maxLength={280} />
            </div>
            <div>
              <Label htmlFor="cover">URL da imagem de capa (opcional)</Label>
              <Input id="cover" value={cover} onChange={(e) => setCover(e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <Label htmlFor="content">Conteúdo</Label>
              <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={16} maxLength={20000} />
              <p className="text-xs text-muted-foreground mt-1">Texto simples; quebras de linha são preservadas.</p>
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" disabled={saving} onClick={(e) => submit(e, "draft")}>
                Salvar rascunho
              </Button>
              <Button type="button" variant="forest" disabled={saving} onClick={(e) => submit(e, "published")}>
                {saving ? "Salvando..." : "Publicar"}
              </Button>
            </div>
          </form>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default NewPost;
