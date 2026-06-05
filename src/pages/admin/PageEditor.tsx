import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { getPageSchema, Field } from "@/lib/site-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, ExternalLink, Save, RotateCcw, Upload } from "lucide-react";

type Values = Record<string, { text: string; image: string }>;

const fieldKey = (f: Field) => `${f.section}.${f.key}`;

const PageEditor = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const schema = useMemo(() => (slug ? getPageSchema(slug) : undefined), [slug]);

  const [values, setValues] = useState<Values>({});
  const [originalIds, setOriginalIds] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    if (!schema) return;
    setLoading(true);
    supabase
      .from("site_content")
      .select("id,section,key,value_text,value_image_url")
      .eq("page", schema.slug)
      .then(({ data }) => {
        const v: Values = {};
        const ids: Record<string, string> = {};
        schema.fields.forEach((f) => {
          v[fieldKey(f)] = { text: "", image: "" };
        });
        (data ?? []).forEach((r: any) => {
          const k = `${r.section}.${r.key}`;
          v[k] = { text: r.value_text ?? "", image: r.value_image_url ?? "" };
          ids[k] = r.id;
        });
        setValues(v);
        setOriginalIds(ids);
        setLoading(false);
      });
  }, [schema]);

  if (!schema) {
    return (
      <div className="container max-w-3xl py-12">
        <p className="text-sm text-muted-foreground">Página não encontrada.</p>
        <Button asChild variant="ghost" className="mt-4"><Link to="/admin/pages">← Voltar</Link></Button>
      </div>
    );
  }

  const setText = (f: Field, text: string) =>
    setValues((s) => ({ ...s, [fieldKey(f)]: { ...s[fieldKey(f)], text } }));

  const uploadImage = async (f: Field, file: File) => {
    if (!user) return;
    setUploading(fieldKey(f));
    const path = `site/${schema.slug}/${f.section}-${f.key}-${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("post-images").upload(path, file, { upsert: true });
    if (error) {
      toast({ title: "Erro no upload", description: error.message, variant: "destructive" });
      setUploading(null);
      return;
    }
    const { data } = supabase.storage.from("post-images").getPublicUrl(path);
    setValues((s) => ({ ...s, [fieldKey(f)]: { ...s[fieldKey(f)], image: data.publicUrl } }));
    setUploading(null);
  };

  const resetField = async (f: Field) => {
    const id = originalIds[fieldKey(f)];
    if (id) {
      const { error } = await supabase.from("site_content").delete().eq("id", id);
      if (error) {
        toast({ title: "Erro", description: error.message, variant: "destructive" });
        return;
      }
      setOriginalIds((s) => {
        const c = { ...s };
        delete c[fieldKey(f)];
        return c;
      });
    }
    setValues((s) => ({ ...s, [fieldKey(f)]: { text: "", image: "" } }));
    toast({ title: "Campo restaurado ao padrão" });
  };

  const save = async () => {
    if (!user) {
      toast({ title: "Faça login como admin", variant: "destructive" });
      return;
    }
    setSaving(true);
    const rows: any[] = [];
    for (const f of schema.fields) {
      const v = values[fieldKey(f)] ?? { text: "", image: "" };
      const hasValue = f.type === "image" ? Boolean(v.image) : Boolean(v.text);
      if (!hasValue) {
        // Skip empty unless previously saved — those are removed below.
        continue;
      }
      rows.push({
        page: schema.slug,
        section: f.section,
        key: f.key,
        value_text: f.type === "image" ? null : v.text,
        value_image_url: f.type === "image" ? v.image : null,
        updated_by: user.id,
      });
    }

    // Remove rows that became empty
    const toDelete = Object.entries(originalIds)
      .filter(([k]) => {
        const f = schema.fields.find((ff) => fieldKey(ff) === k);
        if (!f) return false;
        const v = values[k];
        const hasValue = f.type === "image" ? Boolean(v?.image) : Boolean(v?.text);
        return !hasValue;
      })
      .map(([, id]) => id);

    if (toDelete.length) {
      await supabase.from("site_content").delete().in("id", toDelete);
    }

    if (rows.length) {
      const { error } = await supabase
        .from("site_content")
        .upsert(rows, { onConflict: "page,section,key" });
      if (error) {
        toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
        setSaving(false);
        return;
      }
    }

    toast({ title: "Alterações salvas" });
    setSaving(false);
    // refresh ids
    const { data } = await supabase
      .from("site_content")
      .select("id,section,key")
      .eq("page", schema.slug);
    const ids: Record<string, string> = {};
    (data ?? []).forEach((r: any) => (ids[`${r.section}.${r.key}`] = r.id));
    setOriginalIds(ids);
  };

  const grouped = useMemo(() => {
    const g: Record<string, Field[]> = {};
    schema.fields.forEach((f) => {
      g[f.section] = g[f.section] ?? [];
      g[f.section].push(f);
    });
    return g;
  }, [schema]);

  return (
    <div className="container max-w-4xl py-8 md:py-12 space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/pages")}>
            <ArrowLeft className="h-4 w-4" /> Todas as páginas
          </Button>
          <h1 className="font-display text-3xl md:text-4xl text-forest-deep mt-3">{schema.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{schema.description}</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <a href={schema.route} target="_blank" rel="noopener">
              <ExternalLink className="h-4 w-4" /> Ver no site
            </a>
          </Button>
          <Button onClick={save} variant="forest" size="sm" disabled={saving || loading}>
            <Save className="h-4 w-4" /> {saving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </header>

      {loading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : (
        Object.entries(grouped).map(([section, fields]) => (
          <section key={section} className="rounded-2xl border border-border bg-card p-6 space-y-5">
            <h2 className="font-display text-lg text-forest-deep uppercase tracking-wide text-sm">
              Seção: {section}
            </h2>
            {fields.map((f) => {
              const v = values[fieldKey(f)] ?? { text: "", image: "" };
              const hasOriginal = Boolean(originalIds[fieldKey(f)]);
              return (
                <div key={fieldKey(f)} className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <Label htmlFor={fieldKey(f)} className="text-sm">{f.label}</Label>
                    {hasOriginal && (
                      <button
                        type="button"
                        onClick={() => resetField(f)}
                        className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1"
                      >
                        <RotateCcw className="h-3 w-3" /> restaurar padrão
                      </button>
                    )}
                  </div>
                  {f.type === "longtext" ? (
                    <Textarea
                      id={fieldKey(f)}
                      value={v.text}
                      placeholder={f.placeholder ?? "Deixe vazio para manter o padrão"}
                      onChange={(e) => setText(f, e.target.value)}
                      rows={3}
                      maxLength={2000}
                    />
                  ) : f.type === "image" ? (
                    <div className="space-y-2">
                      {v.image && <img src={v.image} alt="" className="h-24 rounded border border-border" />}
                      <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-input text-sm cursor-pointer hover:bg-accent">
                        <Upload className="h-4 w-4" />
                        {uploading === fieldKey(f) ? "Enviando..." : v.image ? "Trocar imagem" : "Enviar imagem"}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => e.target.files?.[0] && uploadImage(f, e.target.files[0])}
                        />
                      </label>
                    </div>
                  ) : (
                    <Input
                      id={fieldKey(f)}
                      value={v.text}
                      placeholder={f.placeholder ?? "Deixe vazio para manter o padrão"}
                      onChange={(e) => setText(f, e.target.value)}
                      maxLength={300}
                    />
                  )}
                  {f.help && <p className="text-xs text-muted-foreground">{f.help}</p>}
                </div>
              );
            })}
          </section>
        ))
      )}
    </div>
  );
};

export default PageEditor;
