export const CATEGORY_WEIGHTS = {
  operational: 0.25,
  cyber: 0.30,
  governance: 0.25,
  resilience: 0.15,
  claims: 0.05,
} as const;

export const TIER_THRESHOLDS = [
  { min: 85, max: 100, level: "Strong" },
  { min: 70, max: 84, level: "Good" },
  { min: 55, max: 69, level: "Moderate" },
  { min: 40, max: 54, level: "Weak" },
  { min: 0, max: 39, level: "High Risk" },
] as const;
