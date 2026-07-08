// Sistema imunológico da FROTA — variante serverless (Vite/SPA sem middleware).
// Este app é Vite+React (SPA), então não tem middleware de servidor. A defesa
// imune roda na única camada de servidor que existe: as funções serverless /api.
// withImmune() embrulha um handler: (1) puxa a blocklist compartilhada do hub
// (cache 60s) e barra IP fichado por QUALQUER app da frota; (2) detecta ataque na
// request e reporta ao hub (fire-and-forget). Assim um ataque a este app imuniza a
// frota e vice-versa. Config por env: IMMUNE_HUB_URL, IMMUNE_TOKEN, IMMUNE_APP.
// Sem env → no-op gracioso. Best-effort: nunca quebra a request.
//
// OBS: arquivo com prefixo "_" não vira rota no Vercel (é helper privado).

type Severity = "low" | "medium" | "high" | "critical";
type Signal = { kind: string; severity: Severity; evidence: string };
type ReqLike = { path: string; method?: string; ua?: string; body?: string };

// ---- detecção (núcleo puro, espelha src/lib/immune/detect da frota) ----
const INJECTION = [
  /\bunion\b[\s\S]{0,20}\bselect\b/i,
  /\bor\b\s+1\s*=\s*1/i,
  /'\s*(or|and)\s+'?\d/i,
  /;\s*(drop|delete|update|insert)\b/i,
  /\$where\b|\$ne\b|\$gt\b|\$regex\b/i,
  /\$\{[\s\S]*\}/,
  /\b(exec|system|passthru|popen)\s*\(/i,
  /\bsleep\s*\(\s*\d/i,
];
const XSS = [/<script\b/i, /javascript:/i, /onerror\s*=/i, /onload\s*=/i, /<img[^>]+src\s*=\s*["']?\s*x/i];
const TRAVERSAL = [/\.\.[\/\\]/, /%2e%2e[\/\\%]/i, /\/etc\/passwd\b/i, /\bboot\.ini\b/i];
const SENSITIVE = [/\/\.env\b/i, /\/\.git\b/i, /\/\.aws\b/i, /\/wp-(admin|login|content)\b/i, /\/phpmyadmin\b/i, /\/\.ssh\b/i, /\/config\.(php|json|yml)\b/i, /\/actuator\b/i, /\/\.vscode\b/i, /\bxmlrpc\.php\b/i];
const BAD_UA = /(sqlmap|nikto|nmap|masscan|acunetix|nessus|dirbuster|gobuster|wpscan|hydra|zgrab|python-requests\/|go-http-client|semrushbot)/i;

function anyMatch(hay: string, pats: RegExp[]): string | null {
  for (const p of pats) { const m = hay.match(p); if (m) return m[0].slice(0, 60); }
  return null;
}
function decodeSafe(s: string): string {
  try { return decodeURIComponent(s); } catch { return s; }
}
function detect(req: ReqLike): Signal[] {
  const out: Signal[] = [];
  const hay = decodeSafe(`${req.path} ${req.body || ""}`);
  const ua = req.ua || "";
  let ev: string | null;
  if ((ev = anyMatch(hay, INJECTION))) out.push({ kind: "injection", severity: "critical", evidence: ev });
  if ((ev = anyMatch(hay, TRAVERSAL))) out.push({ kind: "traversal", severity: "high", evidence: ev });
  if ((ev = anyMatch(hay, XSS))) out.push({ kind: "xss", severity: "high", evidence: ev });
  if ((ev = anyMatch(req.path, SENSITIVE))) out.push({ kind: "sensitive-path", severity: "high", evidence: ev });
  if (BAD_UA.test(ua)) out.push({ kind: "scanner", severity: "medium", evidence: ua.slice(0, 60) });
  return out;
}
function shouldBlockNow(signals: Signal[]): boolean {
  return signals.some((s) => s.severity === "critical" || s.severity === "high");
}
function topSeverity(signals: Signal[]): Severity {
  const rank: Severity[] = ["low", "medium", "high", "critical"];
  return signals.reduce<Severity>((acc, s) => (rank.indexOf(s.severity) > rank.indexOf(acc) ? s.severity : acc), "low");
}

// ---- client HTTP pro hub (espelha src/lib/immune/client da frota) ----
const HUB = () => process.env.IMMUNE_HUB_URL;
const TOKEN = () => process.env.IMMUNE_TOKEN || "";
const APP = () => process.env.IMMUNE_APP || "tamoiostecnologias";

let blocked = new Set<string>();
let lastPull = 0;
const PULL_MS = 60_000;

async function pullBlocklist(now: number) {
  const hub = HUB();
  if (!hub || now - lastPull < PULL_MS) return;
  lastPull = now;
  try {
    const r = await fetch(`${hub}/api/immune/blocklist?app=${encodeURIComponent(APP())}`, { headers: { "x-immune-token": TOKEN() }, cache: "no-store" });
    if (r.ok) { const j = await r.json(); if (Array.isArray(j.ips)) blocked = new Set(j.ips); }
  } catch { /* mantém cache */ }
}
function report(ip: string, path: string, ua: string, kind: string, severity: string) {
  const hub = HUB(); if (!hub) return;
  fetch(`${hub}/api/immune/report`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-immune-token": TOKEN() },
    body: JSON.stringify({ app: APP(), ip, path: path.slice(0, 300), ua: ua.slice(0, 200), kind, severity }),
  }).catch(() => {});
}

type ImmuneDecision = { block: boolean; reason?: string };

async function immuneCheck(req: ReqLike & { ip: string }, nowMs: number): Promise<ImmuneDecision> {
  try {
    await pullBlocklist(nowMs);
    if (blocked.has(req.ip)) return { block: true, reason: "blocklist" };
    const signals = detect(req);
    if (!signals.length) return { block: false };
    const kind = signals.map((s) => s.kind).join(",");
    report(req.ip, req.path, req.ua || "", kind, topSeverity(signals));
    if (shouldBlockNow(signals)) { blocked.add(req.ip); return { block: true, reason: kind }; }
    return { block: false };
  } catch {
    return { block: false };
  }
}

// ---- adapter serverless (req/res estilo Node/Vercel) ----
type AnyReq = { headers: Record<string, string | string[] | undefined>; method?: string; url?: string; body?: unknown };
type AnyRes = { status: (n: number) => AnyRes; json: (b: unknown) => void; setHeader?: (k: string, v: string) => void };

function header(req: AnyReq, name: string): string {
  const v = req.headers[name];
  return (Array.isArray(v) ? v[0] : v) || "";
}
function clientIp(req: AnyReq): string {
  // x-real-ip é setado pela edge do Vercel (não spoofável pelo cliente).
  // XFF leftmost é só fallback.
  return header(req, "x-real-ip").trim()
    || header(req, "x-forwarded-for").split(",")[0].trim()
    || "127.0.0.1";
}
function rawBody(req: AnyReq): string {
  try {
    if (req.body == null) return "";
    return (typeof req.body === "string" ? req.body : JSON.stringify(req.body)).slice(0, 2000);
  } catch { return ""; }
}

export type Handler = (req: AnyReq, res: AnyRes) => unknown | Promise<unknown>;

/** Embrulha um handler serverless com a defesa imune da frota. */
export function withImmune(handler: Handler): Handler {
  return async (req, res) => {
    const decision = await immuneCheck(
      {
        ip: clientIp(req),
        path: req.url || "",   // no Vercel serverless já vem pathname + query
        method: req.method,
        ua: header(req, "user-agent"),
        body: rawBody(req),
      },
      Date.now(),
    );
    if (decision.block) {
      res.status(403).json({
        type: "https://httpstatuses.com/403",
        title: "Forbidden",
        status: 403,
        detail: "Requisição bloqueada pelo sistema imunológico.",
      });
      return;
    }
    return handler(req, res);
  };
}
