import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";

type Post = {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  published_at: string | null;
  author_id: string;
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [authorName, setAuthorName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("posts")
      .select("id,title,excerpt,content,cover_image_url,published_at,author_id")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle()
      .then(async ({ data }) => {
        setPost(data);
        if (data?.author_id) {
          const { data: prof } = await supabase
            .from("profiles")
            .select("display_name")
            .eq("id", data.author_id)
            .maybeSingle();
          setAuthorName(prof?.display_name ?? "Equipe Tamoios");
        }
        setLoading(false);
      });
  }, [slug]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <article className="pt-32 pb-20 md:pt-40">
        <div className="container max-w-3xl">
          {loading ? (
            <p className="text-muted-foreground">Carregando...</p>
          ) : !post ? (
            <div className="text-center py-16">
              <h1 className="font-display text-3xl text-forest-deep mb-4">Post não encontrado</h1>
              <Button asChild variant="forest"><Link to="/blog">Ver todos os posts</Link></Button>
            </div>
          ) : (
            <>
              {post.published_at && (
                <time className="text-xs uppercase tracking-widest text-leaf font-semibold">
                  {new Date(post.published_at).toLocaleDateString("pt-BR")} · por {authorName}
                </time>
              )}
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-forest-deep mt-3 mb-6 leading-tight text-balance">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-xl text-muted-foreground leading-relaxed mb-10">{post.excerpt}</p>
              )}
              {post.cover_image_url && (
                <div className="rounded-2xl overflow-hidden mb-10">
                  <img src={post.cover_image_url} alt={post.title} className="w-full h-auto" />
                </div>
              )}
              <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-forest-deep prose-a:text-forest whitespace-pre-wrap">
                {post.content}
              </div>
              <div className="mt-12 pt-8 border-t border-border">
                <Button asChild variant="outline"><Link to="/blog">← Todos os posts</Link></Button>
              </div>
            </>
          )}
        </div>
      </article>
      <SiteFooter />
    </div>
  );
};

export default BlogPost;
