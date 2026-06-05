import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type ContentMap = Record<string, string>;

export function useSiteContent(page: string) {
  const [map, setMap] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    supabase
      .from("site_content")
      .select("section,key,value_text,value_image_url")
      .eq("page", page)
      .then(({ data }) => {
        if (!active) return;
        const m: ContentMap = {};
        (data ?? []).forEach((r: any) => {
          const v = r.value_text ?? r.value_image_url ?? "";
          if (v) m[`${r.section}.${r.key}`] = v;
        });
        setMap(m);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [page]);

  return {
    loading,
    /** Returns the saved value for `section.key` or the provided fallback. */
    t: (section: string, key: string, fallback: string = "") =>
      map[`${section}.${key}`] || fallback,
    /** Returns true if the admin saved a value for this field (allows JSX swap). */
    has: (section: string, key: string) => Boolean(map[`${section}.${key}`]),
  };
}
