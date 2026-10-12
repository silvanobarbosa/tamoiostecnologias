import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Leaf, TreePine, Car, Home, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PRODUCTS, calculateImpact, formatNumber, type ProductFactor } from "@/lib/impact";

function AnimatedNumber({ value, digits = 0, suffix = "" }: { value: number; digits?: number; suffix?: string }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (latest) => `${formatNumber(latest, digits)}${suffix}`);
  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.9, ease: "easeOut" });
    return controls.stop;
  }, [value, mv]);
  return <motion.span>{rounded}</motion.span>;
}

interface ImpactCalculatorProps {
  variant?: "full" | "compact";
  defaultProduct?: ProductFactor["key"];
}

export function ImpactCalculator({ variant = "full", defaultProduct = "bandeja" }: ImpactCalculatorProps) {
  const initial = PRODUCTS.find((p) => p.key === defaultProduct) ?? PRODUCTS[0];
  const [product, setProduct] = useState<ProductFactor>(initial);
  const [units, setUnits] = useState<number>(initial.quickAmounts[1])
  const [period, setPeriod] = useState<"mes" | "ano">("mes")
  const k = period === "mes" ? 1 / 12 : 1;;

  const result = useMemo(() => calculateImpact(product, units), [product, units]);

  const sliderMax = product.key === "bandeja" ? 500000 : product.key === "calco" ? 100000 : 200000;
  const sliderStep = Math.max(1, Math.round(sliderMax / 500));

  const contactMessage = encodeURIComponent(
    `Olá! Simulei na calculadora de impacto da Tamoios:\n\n` +
      `• Produto: ${product.label}\n` +
      `• Volume: ${formatNumber(units)} ${product.unitLabel}\n\n` +
      `Resultado anual:\n` +
      `• ${formatNumber(result.plasticAvoidedKgYear)} kg de plástico/isopor evitado\n` +
      `• ${formatNumber(result.co2AvoidedKgYear)} kg de CO₂e economizado\n` +
      `• Equivalente a ${formatNumber(result.treesEquivalent)} árvores absorvendo CO₂ por 1 ano\n\n` +
      `Quero conversar sobre como gerar esse impacto no meu negócio.`
  );

  return (
    <div className={variant === "full" ? "rounded-3xl bg-card border border-border shadow-deep overflow-hidden" : "rounded-2xl bg-pulp-light/50 border border-border p-6"}>
      <div className={variant === "full" ? "grid lg:grid-cols-5" : "grid gap-6"}>
        {/* Controls */}
        <div className={variant === "full" ? "lg:col-span-2 p-8 md:p-10 bg-pulp-light/40 border-r border-border" : ""}>
          <div className="flex items-center gap-2 text-leaf font-semibold text-xs tracking-widest uppercase mb-3">
            <Sparkles className="h-4 w-4" /> Calculadora de Impacto
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-forest-deep leading-snug mb-6">
            Quanto a sua operação<br />pode <em className="text-leaf font-normal">deixar de poluir?</em>
          </h3>

          <div className="space-y-6">
            <div>
              <Label className="text-sm font-semibold text-forest-deep mb-3 block">Tipo de produto</Label>
              <div className="grid gap-2">
                {PRODUCTS.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => { setProduct(p); setUnits(p.quickAmounts[1]); }}
                    className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                      product.key === p.key
                        ? "border-forest bg-forest/5 text-forest-deep font-semibold shadow-soft"
                        : "border-border bg-background hover:border-forest/40"
                    }`}
                  >
                    <span className="block">{p.shortLabel}</span>
                    <span className="block text-xs font-normal text-muted-foreground">substitui {p.replacedMaterial}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-3">
                <Label className="text-sm font-semibold text-forest-deep">Quantas unidades você usa por mês?</Label>
                <span className="text-xs text-muted-foreground">{product.unitLabel}</span>
              </div>
              <Slider
                value={[units]}
                min={1000}
                max={sliderMax}
                step={sliderStep}
                onValueChange={(v) => setUnits(v[0])}
                className="mb-3"
              />
              <Input
                type="number"
                min={0}
                value={units}
                onChange={(e) => setUnits(Math.max(0, Number(e.target.value) || 0))}
                className="text-lg font-semibold text-forest-deep"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {product.quickAmounts.map((q) => (
                  <button key={q} type="button" onClick={() => setUnits(q)}
                    className={`px-3 py-1.5 rounded-full border text-xs ${units === q ? "border-forest bg-forest/5 font-semibold" : "border-border hover:border-forest/40"}`}>
                    {formatNumber(q)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className={variant === "full" ? "lg:col-span-3 p-8 md:p-10" : ""}>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Impacto estimado {period === "mes" ? "por mês" : "por ano"}</div>
          <div className="inline-flex rounded-full border border-border p-1 mb-4 text-xs">
            {(["mes", "ano"] as const).map((v) => (
              <button key={v} type="button" onClick={() => setPeriod(v)}
                className={`px-4 py-1.5 rounded-full ${period === v ? "bg-forest text-primary-foreground font-semibold" : "text-muted-foreground"}`}>
                {v === "mes" ? "Mensal" : "Anual"}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-2xl bg-forest text-primary-foreground p-5">
              <Leaf className="h-5 w-5 mb-3 opacity-80" />
              <div className="font-display text-3xl md:text-4xl font-semibold leading-none">
                <AnimatedNumber value={result.plasticAvoidedKgYear * k} /> <span className="text-base font-normal opacity-80">kg</span>
              </div>
              <div className="text-xs opacity-80 mt-2">de plástico/isopor evitado</div>
            </div>
            <div className="rounded-2xl bg-leaf text-primary-foreground p-5">
              <Sparkles className="h-5 w-5 mb-3 opacity-80" />
              <div className="font-display text-3xl md:text-4xl font-semibold leading-none">
                <AnimatedNumber value={result.co2AvoidedKgYear * k} /> <span className="text-base font-normal opacity-80">kg</span>
              </div>
              <div className="text-xs opacity-80 mt-2">de CO₂e economizado</div>
            </div>
          </div>

          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Equivalências</div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="rounded-xl border border-border p-4 bg-background">
              <TreePine className="h-4 w-4 text-forest mb-2" />
              <div className="font-display text-xl font-semibold text-forest-deep leading-none">
                <AnimatedNumber value={result.treesEquivalent * k} />
              </div>
              <div className="text-[11px] text-muted-foreground mt-1.5 leading-tight">árvores absorvendo CO₂ por 1 ano</div>
            </div>
            <div className="rounded-xl border border-border p-4 bg-background">
              <Car className="h-4 w-4 text-forest mb-2" />
              <div className="font-display text-xl font-semibold text-forest-deep leading-none">
                <AnimatedNumber value={result.kmCarEquivalent * k} />
              </div>
              <div className="text-[11px] text-muted-foreground mt-1.5 leading-tight">km de carro a menos</div>
            </div>
            <div className="rounded-xl border border-border p-4 bg-background">
              <Home className="h-4 w-4 text-forest mb-2" />
              <div className="font-display text-xl font-semibold text-forest-deep leading-none">
                <AnimatedNumber value={result.housesMonthEquivalent * k} digits={1} />
              </div>
              <div className="text-[11px] text-muted-foreground mt-1.5 leading-tight">casas brasileiras por 1 mês</div>
            </div>
          </div>

          <Button asChild variant="forest" size="lg" className="w-full">
            <a href={`/#contato`} onClick={() => {
              // pre-fill via hash, contact form will pick it up if integrated
              sessionStorage.setItem("impact-prefill", decodeURIComponent(contactMessage));
            }}>
              Conversar sobre esta simulação <ArrowRight />
            </a>
          </Button>
          <p className="text-[11px] text-muted-foreground mt-3 leading-relaxed">
            Estimativa baseada em LCA pública ({product.replacedMaterial} ~{formatNumber(product.co2PerKgReplaced,1)} kg CO₂e/kg; polpa moldada ~0,8 kg CO₂e/kg). Valores reais variam por SKU e cadeia logística.
          </p>
        </div>
      </div>
    </div>
  );
}
