import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

// package.json é "type":"module" → as functions de /api rodam como ESM nativo na Vercel,
// que exige extensão explícita no import relativo. Sem ela: ERR_MODULE_NOT_FOUND na carga
// do módulo → FUNCTION_INVOCATION_FAILED (toda a /api fora do ar).
describe("api/: imports relativos precisam de extensão explícita (ESM)", () => {
  const apiDir = path.resolve(__dirname, "../../api");
  const files = fs.readdirSync(apiDir).filter((f) => /\.(ts|js|mjs)$/.test(f));

  it("tem arquivos em api/", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)("%s", (file) => {
    const src = fs.readFileSync(path.join(apiDir, file), "utf8");
    const specs = [...src.matchAll(/\bfrom\s+["'](\.[^"']*)["']/g)].map((m) => m[1]);
    for (const spec of specs) {
      expect(spec, `import relativo sem extensão em api/${file}: "${spec}"`).toMatch(/\.(js|mjs|json)$/);
    }
  });
});
