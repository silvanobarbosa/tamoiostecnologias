import { Link } from "react-router-dom";
import { PAGES } from "@/lib/site-content";
import { ExternalLink, Pencil } from "lucide-react";

const PagesAdmin = () => {
  return (
    <div className="container max-w-6xl py-8 md:py-12 space-y-6">
      <header>
        <span className="text-leaf font-semibold text-xs tracking-widest uppercase">Conteúdo do site</span>
        <h1 className="font-display text-3xl md:text-4xl text-forest-deep mt-1">Páginas</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
          Edite os principais textos e chamadas de cada página. Campos não preenchidos mantêm o conteúdo padrão do site.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        {PAGES.map((p) => (
          <div key={p.slug} className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-lg text-forest-deep">{p.title}</h2>
                <p className="text-xs text-muted-foreground mt-1">{p.description}</p>
              </div>
              <a
                href={p.route}
                target="_blank"
                rel="noopener"
                className="text-muted-foreground hover:text-forest"
                aria-label={`Abrir ${p.title} em nova aba`}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{p.fields.length} campo(s) editável(eis)</span>
              <Link
                to={`/admin/pages/${p.slug}`}
                className="inline-flex items-center gap-1.5 text-forest font-medium hover:text-forest-deep"
              >
                <Pencil className="h-3.5 w-3.5" /> Editar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PagesAdmin;
