import { Helmet } from "react-helmet-async";

type SEOProps = {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown>;
};

const SITE_NAME = "Tamoios Tecnologia";
const DEFAULT_DESC =
  "Tamoios Tecnologia — Inovação em biomassa de alta densidade. Bandejas FLV, calços industriais e tubetes agroflorestais 100% recicláveis e compostáveis.";

export function SEO({ title, description, image, url, type = "website", jsonLd }: SEOProps) {
  const fullTitle = title.includes("Tamoios") ? title : `${title} · ${SITE_NAME}`;
  const desc = (description ?? DEFAULT_DESC).slice(0, 160);
  const canonical = url ?? (typeof window !== "undefined" ? window.location.href : undefined);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content={type} />
      {canonical && <meta property="og:url" content={canonical} />}
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {image && <meta name="twitter:image" content={image} />}

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)
            .replace(/</g, "\\u003c")
            .replace(/>/g, "\\u003e")
            .replace(/&/g, "\\u0026")
            .replace(/\u2028/g, "\\u2028")
            .replace(/\u2029/g, "\\u2029")}
        </script>
      )}
    </Helmet>
  );
}
