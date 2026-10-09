import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { neon } from "@neondatabase/serverless";

// Testa o endpoint /api/db (api/db.ts) de verdade contra o banco do site:
// o cadastro de representante é aceito SOMENTE com consentimento LGPD registrado.
const DB_URL = process.env.DB_URL || process.env.DATABASE_URL || "";
const TEST_EMAIL = "teste-lgpd-vitest@example.com";

function mockRes() {
  const res: any = { statusCode: 0, body: undefined as any };
  res.status = (n: number) => { res.statusCode = n; return res; };
  res.json = (b: unknown) => { res.body = b; };
  return res;
}

describe("api/db: representative_applications (LGPD)", () => {
  beforeAll(async () => {
    if (!DB_URL) throw new Error("DB_URL não configurada no ambiente de teste");
    process.env.DATABASE_URL = DB_URL;
  });

  it("recusa insert sem consentimento (consent_at/consent_version obrigatórios)", async () => {
    const { default: handler } = await import("../../api/db");
    const res = mockRes();
    await handler(
      { method: "POST", url: "/api/db", headers: {}, body: { table: "representative_applications", action: "insert", values: { person_type: "fisica", name: "Teste Sem Consentimento", document: "12345678901", email: TEST_EMAIL, phone: "11999999999", city: "Sao Paulo", state: "SP", message: "Tentativa sem consentimento deve ser recusada." } } },
      res,
    );
    expect(res.statusCode).toBe(400);
    expect(res.body?.error?.message).toContain("consentimento");
  });

  it("aceita insert com consentimento e grava consent_at/consent_version", async () => {
    const { default: handler } = await import("../../api/db");
    const res = mockRes();
    await handler(
      { method: "POST", url: "/api/db", headers: {}, body: { table: "representative_applications", action: "insert", values: { person_type: "juridica", name: "Teste Com Consentimento", document: "12.345.678/0001-90", email: TEST_EMAIL, phone: "11999999999", city: "Sao Paulo", state: "SP", message: "Envio de teste com consentimento LGPD registrado.", consent_at: new Date().toISOString(), consent_version: "2026-10-09" } } },
      res,
    );
    expect(res.statusCode).toBe(200);
    expect(res.body?.error).toBeNull();
    const row = Array.isArray(res.body?.data) ? res.body.data[0] : null;
    expect(row?.email).toBe(TEST_EMAIL);
    expect(row?.consent_version).toBe("2026-10-09");
    expect(row?.consent_at).toBeTruthy();
  });

  it("não expõe os cadastros em leitura pública (anon não lê)", async () => {
    const { default: handler } = await import("../../api/db");
    const res = mockRes();
    await handler(
      { method: "POST", url: "/api/db", headers: {}, body: { table: "representative_applications", action: "select", columns: ["name", "email"] } },
      res,
    );
    expect(res.statusCode).toBe(200);
    expect(res.body?.data).toEqual([]);
  });

  afterAll(async () => {
    if (!DB_URL) return;
    const sql = neon(DB_URL);
    await sql.query("DELETE FROM representative_applications WHERE email = $1", [TEST_EMAIL]);
  });
});
