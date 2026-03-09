import { CATEGORY_WEIGHTS, TIER_THRESHOLDS } from "./config";
import {
  getRecommendations,
  getStrengths,
  getWeaknesses,
} from "./recommendations";

type Answers = Record<string, string | number | string[] | undefined>;

function scoreOperational(answers: Answers): number {
  let score = 70; // base
  if (answers.keyVendors === "no") score += 15;
  else if (answers.keyVendors === "somewhat") score += 5;
  if (answers.disasterRecovery === "yes_documented") score += 15;
  else if (answers.disasterRecovery === "yes_informal") score += 5;
  if (answers.remoteWork === "office_only") score += 5;
  if (answers.physicalSecurity === "strong") score += 5;
  if (answers.customerConcentration === "no") score += 10;
  else if (answers.customerConcentration === "somewhat") score += 5;
  return Math.min(100, score);
}

function scoreCyber(answers: Answers): number {
  let score = 50; // base
  if (answers.mfa === "yes_all") score += 20;
  else if (answers.mfa === "yes_some") score += 10;
  if (answers.passwordPolicy === "yes_enforced") score += 10;
  else if (answers.passwordPolicy === "yes_informal") score += 5;
  if (answers.backups === "daily") score += 15;
  else if (answers.backups === "weekly") score += 10;
  else if (answers.backups === "monthly") score += 5;
  if (answers.antivirus === "yes_all") score += 5;
  if (answers.encryption === "yes_both") score += 10;
  else if (answers.encryption === "yes_some") score += 5;
  if (answers.accessControls === "yes") score += 5;
  if (answers.softwareUpdates === "automated") score += 10;
  else if (answers.softwareUpdates === "monthly") score += 5;
  return Math.min(100, score);
}

function scoreGovernance(answers: Answers): number {
  let score = 40; // base
  if (answers.privacyPolicy === "yes") score += 15;
  if (answers.securityPolicy === "yes") score += 10;
  if (answers.employeeHandbook === "yes") score += 5;
  if (answers.acceptableUse === "yes") score += 5;
  if (answers.incidentResponse === "yes") score += 15;
  if (answers.businessContinuity === "yes") score += 5;
  if (answers.vendorReview === "yes_formal") score += 15;
  else if (answers.vendorReview === "yes_informal") score += 5;
  return Math.min(100, score);
}

function scoreResilience(answers: Answers): number {
  let score = 60; // base - combines operational resilience + cyber
  if (answers.disasterRecovery === "yes_documented") score += 20;
  else if (answers.disasterRecovery === "yes_informal") score += 10;
  if (answers.businessContinuity === "yes") score += 15;
  if (answers.backups === "daily") score += 5;
  return Math.min(100, score);
}

function scoreClaims(answers: Answers): number {
  let score = 80; // base - no incidents = good
  if (answers.priorIncidents === "yes_major") score -= 40;
  else if (answers.priorIncidents === "yes_minor") score -= 15;
  if (answers.dataBreaches === "yes") score -= 30;
  if (answers.downtime === "yes") score -= 15;
  if (answers.fraud === "yes") score -= 20;
  if (answers.insuranceClaims === "yes") score -= 10;
  if (answers.unresolvedRisks === "yes_many") score -= 25;
  else if (answers.unresolvedRisks === "yes_few") score -= 10;
  return Math.max(0, Math.min(100, score));
}

export interface RiskScoreResult {
  overall: number;
  operational: number;
  cyber: number;
  governance: number;
  resilience: number;
  claims: number;
  level: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: { title: string; description: string; priority: string; category: string }[];
}

export function calculateRiskScore(answers: Answers): RiskScoreResult {
  const operational = scoreOperational(answers);
  const cyber = scoreCyber(answers);
  const governance = scoreGovernance(answers);
  const resilience = scoreResilience(answers);
  const claims = scoreClaims(answers);

  const overall = Math.round(
    operational * CATEGORY_WEIGHTS.operational +
      cyber * CATEGORY_WEIGHTS.cyber +
      governance * CATEGORY_WEIGHTS.governance +
      resilience * CATEGORY_WEIGHTS.resilience +
      claims * CATEGORY_WEIGHTS.claims
  );

  const level =
    TIER_THRESHOLDS.find((t) => overall >= t.min && overall <= t.max)?.level ??
    "High Risk";

  const strengths = getStrengths(answers);
  const weaknesses = getWeaknesses(answers);
  const recommendations = getRecommendations(answers);

  return {
    overall: Math.min(100, Math.max(0, overall)),
    operational,
    cyber,
    governance,
    resilience,
    claims,
    level,
    strengths,
    weaknesses,
    recommendations: recommendations.map((r) => ({
      title: r.title,
      description: r.description,
      priority: r.priority,
      category: r.category,
    })),
  };
}
