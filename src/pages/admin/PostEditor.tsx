import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { slugify } from "@/lib/slug";
import { z } from "zod";
import { Upload, X, ArrowLeft } from "lucide-react";

const CATEGORIES = [
  { value: "noticias", label: "Notícias" },
  { value: "bandejas-flv", label: "Bandejas FLV" },
  { value: "calcos-tecnicos", label: "Calços Técnicos" },
  { value: "agro-florestal", label: "Agro & Florestal" },
  { value: "sustentabilidade", label: "Sustentabilidade" },
  { value: "cases", label: "Cases" },
] as const;

type Category = typeof CATEGORIES[number]["value"];

const schema = z.object({
  title: z.string().trim().min(3).max(160),
  excerpt: z.string().trim().max(280).optional(),
  content: z.string().trim().min(20).max(20000),
  cover_image_url: z.string().trim().url().max(500).optional().or(z.literal("")),
});

const PostEditor = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");
  const [category, setCategory] = useState<Category>("noticias");
  const [originalStatus, setOriginalStatus] = useState<"draft" | "published">("draft");
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);
  const [originalPublishedAt, setOriginalPublishedAt] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(isEdit);

  useEffect(() => {
    if (!isEdit || !id) return;
    (async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("title,excerpt,content,cover_image_url,category,status,slug,published_at")
        .eq("id", id)
        .maybeSingle();
      if (error || !data) {
        toast({ title: "Post não encontrado", variant: "destructive" });
        navigate("/admin/posts", { replace: true });
        return;
      }
      setTitle(data.title);
      setExcerpt(data.excerpt ?? "");
      setContent(data.content);
      setCover(data.cover_image_url ?? "");
      setCategory((data.category as Category) ?? "noticias");
      setOriginalStatus(data.status);
      setOriginalSlug(data.slug);
      setOriginalPublishedAt(data.published_at);
      setLoadingPost(false);
    })();
  }, [id, isEdit, navigate]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Arquivo grande", description: "Máximo de 5 MB.", variant: "destructive" });
      return;
    }
    setUploading(true);
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${user.id}/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("post-images")
      .upload(path, file, { contentType: file.type, upsert: false });
    if (upErr) {
      toast({ title: "Erro no upload", description: upErr.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("post-images").getPublicUrl(path);
    setCover(data.publicUrl);
    setUploading(false);
    toast({ title: "Imagem enviada" });
  };

  const submit = async (e: React.MouseEvent, status: "draft" | "published") => {
    e.preventDefault();
    if (!user) return;
    const parsed = schema.safeParse({ title, excerpt, content, cover_image_url: cover });
    if (!parsed.success) {
      toast({ title: "Dados inválidos", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSaving(true);

    const becomingPublished = status === "published" && originalStatus !== "published";
    const publishedAt = isEdit
      ? status === "published"
        ? (originalPublishedAt ?? (becomingPublished ? new Date().toISOString() : null))
        : null
      : status === "published"
        ? new Date().toISOString()
        : null;

    if (isEdit && id) {
      const { error } = await supabase
        .from("posts")
        .update({
          title,
          excerpt: excerpt || null,
          content,
          cover_image_url: cover || null,
          category,
          status,
          published_at: publishedAt,
        })
        .eq("id", id);
      setSaving(false);
      if (error) {
        toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: status === "published" ? "Post atualizado e publicado" : "Rascunho salvo" });
      if (status === "published" && originalSlug) navigate(`/blog/${originalSlug}`);
      else navigate("/admin/posts");
    } else {
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
          category,
          status,
          published_at: publishedAt,
        })
        .select("slug")
        .single();
      setSaving(false);
      if (error) {
        toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: status === "published" ? "Post publicado" : "Rascunho salvo" });
      navigate(status === "published" ? `/blog/${data.slug}` : "/admin/posts");
    }
  };

  if (loadingPost) {
    return <div className="container py-12 text-muted-foreground">Carregando…</div>;
  }

  return (
    <div className="container max-w-3xl py-8 md:py-12">
      <Link to="/admin/posts" className="text-xs text-muted-foreground hover:text-forest inline-flex items-center gap-1">
        <ArrowLeft className="h-3 w-3" /> Voltar para posts
      </Link>
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-forest-deep mt-2 mb-8">
        {isEdit ? "Editar post" : "Novo post"}
      </h1>
      <form className="space-y-6">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={160} />
        </div>
        <div>
          <Label htmlFor="category">Categoria</Label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <Label htmlFor="excerpt">Resumo (opcional)</Label>
          <Input id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} maxLength={280} />
        </div>

        <div>
          <Label>Imagem de capa</Label>
          <div className="mt-2 grid gap-3">
            {cover ? (
              <div className="relative rounded-xl overflow-hidden border border-border">
                <img src={cover} alt="capa" className="w-full h-48 object-cover" />
                <button type="button" onClick={() => setCover("")} className="absolute top-2 right-2 bg-background/90 rounded-full p-1.5 hover:bg-background">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="flex items-center gap-3 rounded-xl border-2 border-dashed border-border p-6 cursor-pointer hover:bg-muted/50 transition-colors">
                <Upload className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {uploading ? "Enviando…" : "Enviar imagem (até 5 MB) ou colar URL abaixo"}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
              </label>
            )}
            <Input value={cover} onChange={(e) => setCover(e.target.value)} placeholder="https://… (opcional)" maxLength={500} />
          </div>
        </div>

        <div>
          <Label htmlFor="content">Conteúdo</Label>
          <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={16} maxLength={20000} />
          <p className="text-xs text-muted-foreground mt-1">Texto simples; quebras de linha são preservadas.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="outline" disabled={saving} onClick={(e) => submit(e, "draft")}>
            Salvar rascunho
          </Button>
          <Button type="button" variant="forest" disabled={saving} onClick={(e) => submit(e, "published")}>
            {saving ? "Salvando..." : isEdit && originalStatus === "published" ? "Salvar e republicar" : "Publicar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostEditor;
