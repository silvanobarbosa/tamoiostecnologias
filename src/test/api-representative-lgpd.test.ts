import { describe, it, expect, beforeAll, vi } from "vitest";

// Testa o endpoint /api/db (api/db.ts): o cadastro de representante é aceito
// SOMENTE com consentimento LGPD registrado (consent_at + consent_version).
// O banco é simulado: aqui validamos a autorização e o SQL gerado.
const captured: { text: string; params: unknown[] }[] = [];
const mockRow = {
  id: "test-id",
  email: "teste-lgpd-vitest@example.com",
  name: "Teste Com Consentimento",
  consent_at: new Date().toISOString(),
  consent_version: "2026-10-09",
};

vi.mock("@neondatabase/serverless", () => ({
  neon: () => ({
    query: async (text: string, params: unknown[] = []) => {
      captured.push({ text, params });
      return [mockRow];
    },
  }),
}));

process.env.DATABASE_URL = "postgresql://mock:mock@localhost/mock";

function mockRes() {
  const res: any = { statusCode: 0, body: undefined as any };
  res.status = (n: number) => { res.statusCode = n; return res; };
  res.json = (b: unknown) => { res.body = b; };
  return res;
}

const payload = {
  person_type: "juridica",
  name: "Teste Com Consentimento",
  document: "12.345.678/0001-90",
  email: "teste-lgpd-vitest@example.com",
  phone: "11999999999",
  city: "Sao Paulo",
  state: "SP",
  message: "Envio de teste com consentimento LGPD registrado.",
  consent_at: new Date().toISOString(),
  consent_version: "2026-10-09",
};

describe("api/db: representative_applications (LGPD)", () => {
  beforeAll(() => {
    captured.length = 0;
  });

  it("recusa insert sem consentimento (consent_at/consent_version obrigatórios)", async () => {
    const { default: handler } = await import("../../api/db");
    const { consent_at: _a, consent_version: _v, ...semConsentimento } = payload;
    const res = mockRes();
    await handler(
      { method: "POST", url: "/api/db", headers: {}, body: { table: "representative_applications", action: "insert", values: semConsentimento } },
      res,
    );
    expect(res.statusCode).toBe(400);
    expect(res.body?.error?.message).toContain("consentimento");
    expect(captured.length).toBe(0); // nada chegou ao banco
  });

  it("aceita insert com consentimento e grava consent_at/consent_version", async () => {
    const { default: handler } = await import("../../api/db");
    const res = mockRes();
    await handler(
      { method: "POST", url: "/api/db", headers: {}, body: { table: "representative_applications", action: "insert", values: payload } },
      res,
    );
    expect(res.statusCode).toBe(200);
    expect(res.body?.error).toBeNull();
    expect(res.body?.data?.[0]?.consent_version).toBe("2026-10-09");
    // o INSERT precisa incluir as colunas de consentimento com os valores enviados
    const insert = captured.find((c) => c.text.startsWith('INSERT INTO "representative_applications"'));
    expect(insert).toBeTruthy();
    expect(insert!.text).toContain('"consent_at"');
    expect(insert!.text).toContain('"consent_version"');
    expect(insert!.params).toContain("2026-10-09");
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
    expect(captured.some((c) => c.text.startsWith("SELECT"))).toBe(false);
  });
});
