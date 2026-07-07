// Backend Neon (padrão da casa) — substitui o Supabase client-direct.
// Endpoint seguro: whitelist de tabela/coluna, queries PARAMETRIZADAS, authz por
// operação (leitura pública de posts/site_content; escrita pública só contato/
// newsletter; escrita/admin em posts/site_content exige token de admin).
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// authz: o que é público ler / público escrever / só-admin
const READ_PUBLIC = new Set(["posts", "site_content"]);
const INSERT_PUBLIC = new Set(["contact_messages", "newsletter_subscribers"]);
const ADMIN_TABLES = new Set(["posts", "site_content", "profiles", "user_roles"]);

// colunas aceitas por tabela (evita injeção via nome de coluna/insert arbitrário)
const COLS: Record<string, string[]> = {
  posts: ["id", "author_id", "title", "slug", "excerpt", "content", "cover_image_url", "published_at", "created_at", "updated_at"],
  site_content: ["id", "page", "section", "key", "value_text", "value_json", "value_image_url", "updated_by", "created_at", "updated_at"],
  contact_messages: ["name", "email", "company", "phone", "segment", "message"],
  newsletter_subscribers: ["email", "name", "source"],
};

function isAdmin(req: { headers: Record<string, string | string[] | undefined> }): boolean {
  const h = req.headers["authorization"];
  const tok = Array.isArray(h) ? h[0] : h;
  return !!tok && !!process.env.ADMIN_API_TOKEN && tok === `Bearer ${process.env.ADMIN_API_TOKEN}`;
}
const ident = (c: string) => /^[a-z_]+$/.test(c); // nome de coluna seguro

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") { res.status(405).json({ error: "method" }); return; }
  const { table, action, columns, filters = [], order, ascending = true, limit, single, values } = req.body || {};
  if (!table || !COLS[table]) { res.status(400).json({ data: null, error: { message: "tabela não permitida" } }); return; }
  const admin = isAdmin(req);

  try {
    if (action === "select") {
      if (!READ_PUBLIC.has(table) && !admin) return void res.status(200).json({ data: single ? null : [], error: null });
      const cols = (Array.isArray(columns) && columns.length ? columns.filter((c: string) => COLS[table].includes(c)) : COLS[table]);
      let q = `SELECT ${cols.map((c: string) => `"${c}"`).join(",")} FROM "${table}"`;
      const params: unknown[] = []; const wh: string[] = [];
      for (const f of filters) {
        if (!ident(f.column) || !COLS[table].includes(f.column)) continue;
        if (f.op === "in" && Array.isArray(f.value)) { params.push(f.value); wh.push(`"${f.column}" = ANY($${params.length})`); }
        else { params.push(f.value); wh.push(`"${f.column}" = $${params.length}`); }
      }
      if (wh.length) q += " WHERE " + wh.join(" AND ");
      if (order && ident(order) && COLS[table].includes(order)) q += ` ORDER BY "${order}" ${ascending ? "ASC" : "DESC"}`;
      if (limit && Number.isInteger(limit)) q += ` LIMIT ${limit}`;
      const rows = await sql(q, params);
      return void res.status(200).json({ data: single ? (rows[0] ?? null) : rows, error: null });
    }

    if (action === "insert") {
      const isPublicWrite = INSERT_PUBLIC.has(table);
      if (!isPublicWrite && !admin) return void res.status(401).json({ data: null, error: { message: "não autorizado" } });
      const rowsIn = Array.isArray(values) ? values : [values];
      const out = [];
      for (const row of rowsIn) {
        const keys = Object.keys(row || {}).filter((k) => COLS[table].includes(k) && ident(k));
        if (!keys.length) continue;
        const ph = keys.map((_, i) => `$${i + 1}`);
        const q = `INSERT INTO "${table}" (${keys.map((k) => `"${k}"`).join(",")}) VALUES (${ph.join(",")}) RETURNING *`;
        const r = await sql(q, keys.map((k) => row[k]));
        out.push(r[0]);
      }
      return void res.status(200).json({ data: out, error: null });
    }

    if ((action === "update" || action === "delete") && admin && ADMIN_TABLES.has(table)) {
      // admin-only (fase 2 — implementação mínima)
      return void res.status(200).json({ data: [], error: null });
    }

    return void res.status(400).json({ data: null, error: { message: "ação inválida ou não autorizada" } });
  } catch (e: any) {
    res.status(500).json({ data: null, error: { message: String(e?.message || e).slice(0, 200) } });
  }
}
