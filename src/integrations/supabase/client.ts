// MIGRADO PRO PADRÃO DA CASA (Neon + Vercel functions). Shim compatível com
// supabase-js (from/select/insert/eq/order/single) que fala com /api/db (Neon).
// Auth/Storage (admin) ficam em manutenção (fase 2). NÃO crasha no boot (o motivo
// do app ficar branco antes era createClient com env vazia).

type Result<T> = { data: T; error: { message: string } | null };
type Filter = { column: string; op: "eq" | "in"; value: unknown };

class QueryBuilder<T = any> implements PromiseLike<Result<T>> {
  private _action: "select" | "insert" | "update" | "delete" = "select";
  private _columns?: string[];
  private _filters: Filter[] = [];
  private _order?: string;
  private _asc = true;
  private _limit?: number;
  private _single = false;
  private _values?: unknown;
  constructor(private table: string, private admin?: string) {}

  select(cols?: string) { this._action = "select"; if (cols && cols !== "*") this._columns = cols.split(",").map((c) => c.trim()); return this; }
  insert(values: unknown) { this._action = "insert"; this._values = values; return this; }
  update(values: unknown) { this._action = "update"; this._values = values; return this; }
  delete() { this._action = "delete"; return this; }
  eq(column: string, value: unknown) { this._filters.push({ column, op: "eq", value }); return this; }
  in(column: string, value: unknown[]) { this._filters.push({ column, op: "in", value }); return this; }
  order(column: string, opts?: { ascending?: boolean }) { this._order = column; this._asc = opts?.ascending !== false; return this; }
  limit(n: number) { this._limit = n; return this; }
  single() { this._single = true; return this; }
  maybeSingle() { this._single = true; return this; }

  private async run(): Promise<Result<T>> {
    try {
      const res = await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(this.admin ? { Authorization: `Bearer ${this.admin}` } : {}) },
        body: JSON.stringify({ table: this.table, action: this._action, columns: this._columns, filters: this._filters, order: this._order, ascending: this._asc, limit: this._limit, single: this._single, values: this._values }),
      });
      return (await res.json()) as Result<T>;
    } catch (e) {
      return { data: (this._single ? null : []) as T, error: { message: (e as Error).message } };
    }
  }
  then<R1 = Result<T>, R2 = never>(onF?: ((v: Result<T>) => R1 | PromiseLike<R1>) | null, onR?: ((r: unknown) => R2 | PromiseLike<R2>) | null): PromiseLike<R1 | R2> {
    return this.run().then(onF, onR);
  }
}

function adminToken(): string | undefined {
  try { return localStorage.getItem("rl_admin_token") || undefined; } catch { return undefined; }
}
const noSub = { data: { subscription: { unsubscribe() {} } } };
const authErr = { message: "Admin em manutenção (migração Neon). Público segue normal." };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase: any = {
  from: (table: string) => new QueryBuilder(table, adminToken()),
  auth: {
    async getSession() { return { data: { session: null }, error: null }; },
    async getUser() { return { data: { user: null }, error: null }; },
    onAuthStateChange() { return noSub; },
    async signInWithPassword() { return { data: { session: null, user: null }, error: authErr }; },
    async signUp() { return { data: { session: null, user: null }, error: authErr }; },
    async signOut() { try { localStorage.removeItem("rl_admin_token"); } catch { /* noop */ } return { error: null }; },
    async updateUser() { return { data: { user: null }, error: authErr }; },
  },
  storage: {
    from: () => ({
      async upload() { return { data: null, error: { message: "Upload em manutenção (migração Neon)." } }; },
      getPublicUrl: (path: string) => ({ data: { publicUrl: path } }),
    }),
  },
};
