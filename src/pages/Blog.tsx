import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ArrowRight, Plus } from "lucide-react";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  author_id: string;
};

const Blog = () => {
  const { isAdmin } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("posts")
      .select("id,title,slug,excerpt,cover_image_url,published_at,author_id")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        setPosts(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
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
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          {loading ? (
            <p className="text-muted-foreground">Carregando posts...</p>
          ) : posts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground mb-4">Ainda não há posts publicados.</p>
              {isAdmin && (
                <Button asChild variant="forest"><Link to="/admin/posts/new">Criar o primeiro post</Link></Button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((p) => (
                <article key={p.id} className="group rounded-2xl overflow-hidden bg-card border border-border hover:shadow-deep transition-all">
                  <Link to={`/blog/${p.slug}`} className="block">
                    <div className="aspect-[16/10] bg-pulp-light overflow-hidden">
                      {p.cover_image_url ? (
                        <img src={p.cover_image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-forest/10 to-leaf/10" />
                      )}
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
