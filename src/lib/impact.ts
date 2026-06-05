// Impact calculator factors
// Sources: LCA studies on EPS (expanded polystyrene) vs molded pulp packaging.
// EPS production: ~3.0 kg CO2e per kg of EPS (cradle-to-gate, average industry data).
// Molded pulp (recycled fiber): ~0.8 kg CO2e per kg (cradle-to-gate).
// Average unit weights are conservative estimates based on Tamoios product mix.

export type ProductKey = "bandeja" | "calco" | "tubete";

export interface ProductFactor {
  key: ProductKey;
  label: string;
  // average weight in grams of the equivalent plastic/EPS unit being replaced
  plasticUnitWeightG: number;
  // average weight in grams of the Tamoios pulp unit
  pulpUnitWeightG: number;
  // unit name in singular/plural
  unitLabel: string;
}

export const PRODUCTS: ProductFactor[] = [
  {
    key: "bandeja",
    label: "Bandejas FLV (substituem isopor)",
    plasticUnitWeightG: 8, // typical EPS tray
    pulpUnitWeightG: 14,
    unitLabel: "bandejas/mês",
  },
  {
    key: "calco",
    label: "Calços técnicos (substituem isopor industrial)",
    plasticUnitWeightG: 45,
    pulpUnitWeightG: 70,
    unitLabel: "calços/mês",
  },
  {
    key: "tubete",
    label: "Tubetes para mudas (substituem plástico rígido)",
    plasticUnitWeightG: 12,
    pulpUnitWeightG: 18,
    unitLabel: "tubetes/mês",
  },
];

// kg CO2e per kg of material (cradle-to-gate)
const CO2E_PER_KG_EPS = 3.0;
const CO2E_PER_KG_PULP = 0.8;

// Equivalences
// 1 mature tree absorbs ~21 kg CO2/year (US EPA)
const KG_CO2_PER_TREE_YEAR = 21;
// Average car emits ~120 g CO2/km
const KG_CO2_PER_KM_CAR = 0.12;
// Average Brazilian household ~150 kg CO2/month (electricity + cooking gas)
const KG_CO2_PER_HOUSE_MONTH = 150;

export interface ImpactResult {
  plasticAvoidedKgYear: number;
  co2AvoidedKgYear: number;
  treesEquivalent: number;
  kmCarEquivalent: number;
  housesMonthEquivalent: number;
}

export function calculateImpact(product: ProductFactor, unitsPerMonth: number): ImpactResult {
  const unitsPerYear = unitsPerMonth * 12;
  const plasticKgYear = (unitsPerYear * product.plasticUnitWeightG) / 1000;
  const pulpKgYear = (unitsPerYear * product.pulpUnitWeightG) / 1000;

  const co2Plastic = plasticKgYear * CO2E_PER_KG_EPS;
  const co2Pulp = pulpKgYear * CO2E_PER_KG_PULP;
  const co2Avoided = Math.max(0, co2Plastic - co2Pulp);

  return {
    plasticAvoidedKgYear: plasticKgYear,
    co2AvoidedKgYear: co2Avoided,
    treesEquivalent: co2Avoided / KG_CO2_PER_TREE_YEAR,
    kmCarEquivalent: co2Avoided / KG_CO2_PER_KM_CAR,
    housesMonthEquivalent: co2Avoided / KG_CO2_PER_HOUSE_MONTH,
  };
}

export function formatNumber(n: number, digits = 0): string {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  }).format(n);
}
