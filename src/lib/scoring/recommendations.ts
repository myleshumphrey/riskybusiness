export interface Recommendation {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: string;
}

export function getRecommendations(
  answers: Record<string, string | number | string[] | undefined>
): Recommendation[] {
  const recs: Recommendation[] = [];
  const add = (
    title: string,
    description: string,
    priority: "high" | "medium" | "low",
    category: string
  ) => recs.push({ title, description, priority, category });

  // Operational
  if (answers.keyVendors === "yes_heavy") {
    add(
      "Reduce vendor concentration risk",
      "Consider diversifying suppliers or having backup vendors to reduce reliance on a few key partners.",
      "high",
      "operational"
    );
  }
  if (answers.disasterRecovery === "no" || answers.disasterRecovery === "yes_informal") {
    add(
      "Create a disaster recovery plan",
      "Document how you'll recover critical operations if something goes wrong. Start with backups and key processes.",
      "high",
      "operational"
    );
  }
  if (answers.customerConcentration === "yes") {
    add(
      "Diversify your customer base",
      "Reducing dependence on a few large customers can improve business resilience.",
      "medium",
      "operational"
    );
  }

  // Cyber
  if (answers.mfa === "no" || answers.mfa === "yes_some") {
    add(
      "Enable multi-factor authentication (MFA)",
      "MFA adds an extra layer of security to business accounts. Enable it for email, cloud services, and banking.",
      "high",
      "cyber"
    );
  }
  if (answers.passwordPolicy === "no" || answers.passwordPolicy === "yes_informal") {
    add(
      "Implement a password policy",
      "Require strong passwords (at least 12 characters, mix of letters, numbers, symbols) and regular changes.",
      "medium",
      "cyber"
    );
  }
  if (answers.backups === "never" || answers.backups === "monthly") {
    add(
      "Formalize backup procedures",
      "Back up important data at least weekly. Use cloud backup services for automatic, encrypted backups.",
      "high",
      "cyber"
    );
  }
  if (answers.antivirus === "no" || answers.antivirus === "yes_some") {
    add(
      "Install endpoint protection on all devices",
      "Antivirus and endpoint protection help prevent malware on laptops and workstations.",
      "medium",
      "cyber"
    );
  }
  if (answers.encryption === "no" || answers.encryption === "unsure") {
    add(
      "Encrypt sensitive data",
      "Use encryption for data at rest and in transit. Most cloud providers offer this by default.",
      "high",
      "cyber"
    );
  }
  if (answers.accessControls === "no" || answers.accessControls === "somewhat") {
    add(
      "Implement employee access controls",
      "Limit access to systems and data based on job role. Review and remove access when employees leave.",
      "medium",
      "cyber"
    );
  }
  if (answers.softwareUpdates === "rarely") {
    add(
      "Establish software update practices",
      "Apply security patches regularly. Enable automatic updates where possible.",
      "high",
      "cyber"
    );
  }

  // Governance
  if (answers.privacyPolicy === "no") {
    add(
      "Create a privacy policy",
      "A privacy policy explains how you collect, use, and protect customer data. Required in many jurisdictions.",
      "high",
      "governance"
    );
  }
  if (answers.securityPolicy === "no") {
    add(
      "Document a security policy",
      "A written security policy sets expectations for how your business protects data and systems.",
      "medium",
      "governance"
    );
  }
  if (answers.incidentResponse === "no") {
    add(
      "Create an incident response plan",
      "Document steps to take if a breach or incident occurs: who to contact, how to contain, and how to notify affected parties.",
      "high",
      "governance"
    );
  }
  if (answers.businessContinuity === "no") {
    add(
      "Develop a business continuity plan",
      "Plan for how to keep operating during disruptions (power outage, natural disaster, etc.).",
      "medium",
      "governance"
    );
  }
  if (answers.vendorReview === "no") {
    add(
      "Implement a vendor review process",
      "Before signing with new vendors, review their security practices and data handling.",
      "medium",
      "governance"
    );
  }
  if (answers.employeeHandbook === "no") {
    add(
      "Create an employee handbook",
      "An employee handbook can include security expectations and acceptable use policies.",
      "low",
      "governance"
    );
  }

  // Claims / History
  if (answers.priorIncidents === "yes_major" || answers.dataBreaches === "yes") {
    add(
      "Address incident response gaps",
      "Given prior incidents, ensure you have a clear incident response plan and have closed any gaps.",
      "high",
      "claims"
    );
  }
  if (answers.unresolvedRisks === "yes_many" || answers.unresolvedRisks === "yes_few") {
    add(
      "Create a risk remediation plan",
      "Prioritize and address known risks. Document progress and timelines.",
      "medium",
      "claims"
    );
  }

  // Sort by priority
  const order = { high: 0, medium: 1, low: 2 };
  recs.sort((a, b) => order[a.priority] - order[b.priority]);

  return recs;
}

export function getStrengths(
  answers: Record<string, string | number | string[] | undefined>
): string[] {
  const strengths: string[] = [];

  if (answers.mfa === "yes_all") strengths.push("Multi-factor authentication enabled for all accounts");
  if (answers.backups === "daily") strengths.push("Regular daily backups in place");
  if (answers.disasterRecovery === "yes_documented") strengths.push("Documented disaster recovery plan");
  if (answers.encryption === "yes_both") strengths.push("Data encrypted at rest and in transit");
  if (answers.privacyPolicy === "yes") strengths.push("Privacy policy in place");
  if (answers.incidentResponse === "yes") strengths.push("Incident response plan documented");
  if (answers.businessContinuity === "yes") strengths.push("Business continuity plan in place");
  if (answers.antivirus === "yes_all") strengths.push("Endpoint protection on all devices");
  if (answers.softwareUpdates === "automated") strengths.push("Automated software updates");
  if (answers.priorIncidents === "no" && answers.dataBreaches === "no") strengths.push("No prior security incidents");
  if (answers.customerConcentration === "no") strengths.push("Diversified customer base");
  if (answers.keyVendors === "no") strengths.push("Multiple vendor options");
  if (answers.vendorReview === "yes_formal") strengths.push("Formal vendor review process");

  return strengths.length > 0 ? strengths : ["Assessment completed"];
}

export function getWeaknesses(
  answers: Record<string, string | number | string[] | undefined>
): string[] {
  const weaknesses: string[] = [];

  if (answers.mfa === "no") weaknesses.push("Multi-factor authentication not implemented");
  if (answers.backups === "never") weaknesses.push("No backup procedures");
  if (answers.privacyPolicy === "no") weaknesses.push("No privacy policy");
  if (answers.incidentResponse === "no") weaknesses.push("No incident response plan");
  if (answers.encryption === "no" || answers.encryption === "unsure") weaknesses.push("Encryption status unclear");
  if (answers.keyVendors === "yes_heavy") weaknesses.push("High vendor concentration");
  if (answers.disasterRecovery === "no") weaknesses.push("No disaster recovery plan");
  if (answers.dataBreaches === "yes") weaknesses.push("Prior data breach history");

  return weaknesses;
}
