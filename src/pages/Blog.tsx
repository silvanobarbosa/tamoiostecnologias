import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ArrowRight, Plus } from "lucide-react";

type Category = "bandejas-flv" | "calcos-tecnicos" | "agro-florestal" | "sustentabilidade" | "cases" | "noticias";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  author_id: string;
  category: Category;
};

const CATEGORIES: { value: "" | Category; label: string }[] = [
  { value: "", label: "Todos" },
  { value: "bandejas-flv", label: "Bandejas FLV" },
  { value: "calcos-tecnicos", label: "Calços Técnicos" },
  { value: "agro-florestal", label: "Agro & Florestal" },
  { value: "sustentabilidade", label: "Sustentabilidade" },
  { value: "cases", label: "Cases" },
  { value: "noticias", label: "Notícias" },
];

const Blog = () => {
  const { isAdmin } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useSearchParams();
  const cat = (params.get("c") as Category | null) ?? "";

  useEffect(() => {
    setLoading(true);
    let query = supabase
      .from("posts")
      .select("id,title,slug,excerpt,cover_image_url,published_at,author_id,category")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (cat) query = query.eq("category", cat);
    query.then(({ data }) => {
      setPosts((data as Post[]) ?? []);
      setLoading(false);
    });
  }, [cat]);

  const setCat = (value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set("c", value); else next.delete("c");
    setParams(next, { replace: true });
  };

  const activeLabel = useMemo(
    () => CATEGORIES.find((c) => c.value === cat)?.label ?? "Todos",
    [cat]
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={cat ? `Blog · ${activeLabel}` : "Blog Tamoios — biomassa, embalagem e impacto"}
        description="Conteúdos sobre embalagem sustentável, casos de uso de bandejas FLV, calços industriais e tubetes agroflorestais."
      />
      <SiteHeader />

      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-pulp">
        <div className="container">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div className="max-w-2xl">
              <span className="text-leaf font-semibold text-sm tracking-widest uppercase">Blog Tamoios</span>
              <h1 className="font-display text-4xl md:text-6xl font-semibold mt-3 leading-tight text-forest-deep text-balance">
                Conhecimento em biomassa,<br />
                <em className="text-leaf font-normal">embalagem e impacto.</em>
              </h1>
            </div>
            {isAdmin && (
              <Button asChild variant="forest">
                <Link to="/admin/posts/new"><Plus /> Novo post</Link>
              </Button>
            )}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const active = c.value === cat;
              return (
                <button
                  key={c.value || "all"}
                  type="button"
                  onClick={() => setCat(c.value)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border transition-colors ${
                    active
                      ? "bg-forest text-primary-foreground border-forest"
                      : "bg-background/80 text-muted-foreground border-border hover:border-forest/40 hover:text-forest"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          {loading ? (
            <p className="text-muted-foreground">Carregando posts...</p>
          ) : posts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground mb-4">
                {cat ? `Ainda não há posts em "${activeLabel}".` : "Ainda não há posts publicados."}
              </p>
              {isAdmin && (
                <Button asChild variant="forest"><Link to="/admin/posts/new">Criar o primeiro post</Link></Button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((p) => (
                <article key={p.id} className="group rounded-2xl overflow-hidden bg-card border border-border hover:shadow-deep transition-all">
                  <Link to={`/blog/${p.slug}`} className="block">
                    <div className="aspect-[16/10] bg-pulp-light overflow-hidden relative">
                      {p.cover_image_url ? (
                        <img src={p.cover_image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-forest/10 to-leaf/10" />
                      )}
                      <span className="absolute top-3 left-3 bg-background/95 text-forest text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full">
                        {CATEGORIES.find((c) => c.value === p.category)?.label ?? "Notícias"}
                      </span>
                    </div>
                    <div className="p-6">
                      {p.published_at && (
                        <time className="text-xs uppercase tracking-widest text-leaf font-semibold">
                          {new Date(p.published_at).toLocaleDateString("pt-BR")}
                        </time>
                      )}
                      <h2 className="font-display text-xl font-semibold text-forest-deep mt-2 mb-3 leading-snug">
                        {p.title}
                      </h2>
                      {p.excerpt && (
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{p.excerpt}</p>
                      )}
                      <span className="inline-flex items-center gap-1 text-forest text-sm font-medium mt-4">
                        Ler post <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Blog;
