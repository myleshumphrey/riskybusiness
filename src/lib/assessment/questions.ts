export type QuestionType = "text" | "select" | "radio" | "number" | "checkbox";

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  label: string;
  type: QuestionType;
  options?: QuestionOption[];
  required?: boolean;
  placeholder?: string;
  helpText?: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export const SECTIONS: Section[] = [
  {
    id: "company",
    title: "Company Overview",
    description: "Tell us about your business.",
    questions: [
      {
        id: "businessName",
        label: "Business name",
        type: "text",
        required: true,
        placeholder: "e.g. Acme Inc.",
      },
      {
        id: "industry",
        label: "What industry are you in?",
        type: "select",
        required: true,
        options: [
          { value: "retail", label: "Retail" },
          { value: "services", label: "Professional services" },
          { value: "tech", label: "Technology / Software" },
          { value: "healthcare", label: "Healthcare" },
          { value: "food", label: "Food & beverage" },
          { value: "manufacturing", label: "Manufacturing" },
          { value: "construction", label: "Construction" },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "companySize",
        label: "Company size",
        type: "select",
        required: true,
        options: [
          { value: "solo", label: "Just me" },
          { value: "2-10", label: "2-10 employees" },
          { value: "11-50", label: "11-50 employees" },
          { value: "51-200", label: "51-200 employees" },
          { value: "200+", label: "200+ employees" },
        ],
      },
      {
        id: "employeeCount",
        label: "Number of employees",
        type: "number",
        required: true,
        placeholder: "e.g. 5",
      },
      {
        id: "revenueRange",
        label: "Annual revenue range",
        type: "select",
        required: true,
        options: [
          { value: "under100k", label: "Under $100K" },
          { value: "100k-500k", label: "$100K - $500K" },
          { value: "500k-1m", label: "$500K - $1M" },
          { value: "1m-5m", label: "$1M - $5M" },
          { value: "5m+", label: "Over $5M" },
        ],
      },
      {
        id: "location",
        label: "Business location (city, state/country)",
        type: "text",
        placeholder: "e.g. San Francisco, CA",
      },
      {
        id: "businessType",
        label: "How does your business operate?",
        type: "radio",
        required: true,
        options: [
          { value: "online", label: "Primarily online" },
          { value: "physical", label: "Physical location (store, office)" },
          { value: "hybrid", label: "Both online and physical" },
        ],
      },
      {
        id: "handlesData",
        label: "Do you collect or store customer data (names, emails, addresses)?",
        type: "radio",
        required: true,
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "acceptsPayments",
        label: "Do you accept online payments?",
        type: "radio",
        required: true,
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
    ],
  },
  {
    id: "operational",
    title: "Operational Risk",
    description: "How does your business handle day-to-day operations?",
    questions: [
      {
        id: "keyVendors",
        label: "Do you rely heavily on a few key vendors or suppliers?",
        type: "radio",
        options: [
          { value: "yes_heavy", label: "Yes, we depend on 1-2 key vendors" },
          { value: "somewhat", label: "Somewhat — we have a few important ones" },
          { value: "no", label: "No — we have multiple options" },
        ],
      },
      {
        id: "disasterRecovery",
        label: "Do you have a disaster recovery or backup plan for critical operations?",
        type: "radio",
        options: [
          { value: "yes_documented", label: "Yes, documented and tested" },
          { value: "yes_informal", label: "Yes, but informal" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "remoteWork",
        label: "Do employees work remotely?",
        type: "radio",
        options: [
          { value: "fully_remote", label: "Fully remote" },
          { value: "hybrid", label: "Hybrid (some remote)" },
          { value: "office_only", label: "Office/store only" },
        ],
      },
      {
        id: "physicalSecurity",
        label: "How would you describe your physical office or store security?",
        type: "radio",
        options: [
          { value: "strong", label: "Strong — locks, alarms, access controls" },
          { value: "basic", label: "Basic — standard locks" },
          { value: "minimal", label: "Minimal or none" },
        ],
      },
      {
        id: "customerConcentration",
        label: "Do you depend on a few large customers for most of your revenue?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes — 1-2 customers are most of our revenue" },
          { value: "somewhat", label: "Somewhat" },
          { value: "no", label: "No — revenue is spread across many customers" },
        ],
      },
    ],
  },
  {
    id: "cyber",
    title: "Cyber & Technology Risk",
    description: "How does your business protect its technology and data?",
    questions: [
      {
        id: "mfa",
        label: "Do you use multi-factor authentication (MFA) for business accounts?",
        type: "radio",
        options: [
          { value: "yes_all", label: "Yes, for all accounts" },
          { value: "yes_some", label: "Yes, for some accounts" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "passwordPolicy",
        label: "Do you have a password policy (e.g., minimum length, complexity)?",
        type: "radio",
        options: [
          { value: "yes_enforced", label: "Yes, and it's enforced" },
          { value: "yes_informal", label: "Yes, but informal" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "backups",
        label: "How often do you back up important data?",
        type: "radio",
        options: [
          { value: "daily", label: "Daily or more" },
          { value: "weekly", label: "Weekly" },
          { value: "monthly", label: "Monthly or less" },
          { value: "never", label: "We don't have backups" },
        ],
      },
      {
        id: "antivirus",
        label: "Do you use antivirus or endpoint protection on business devices?",
        type: "radio",
        options: [
          { value: "yes_all", label: "Yes, on all devices" },
          { value: "yes_some", label: "Yes, on some" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "cloudProviders",
        label: "Which cloud services do you use? (select all that apply)",
        type: "checkbox",
        options: [
          { value: "google", label: "Google Workspace / Gmail" },
          { value: "microsoft", label: "Microsoft 365" },
          { value: "aws", label: "AWS" },
          { value: "other", label: "Other cloud storage or apps" },
        ],
      },
      {
        id: "encryption",
        label: "Is sensitive data encrypted at rest or in transit?",
        type: "radio",
        options: [
          { value: "yes_both", label: "Yes, both" },
          { value: "yes_some", label: "Yes, some" },
          { value: "unsure", label: "Not sure" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "accessControls",
        label: "Do you limit employee access to only what they need?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes, formal access controls" },
          { value: "somewhat", label: "Somewhat" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "softwareUpdates",
        label: "How often do you update software and apply security patches?",
        type: "radio",
        options: [
          { value: "automated", label: "Automated or within days" },
          { value: "monthly", label: "Monthly" },
          { value: "rarely", label: "Rarely or never" },
        ],
      },
    ],
  },
  {
    id: "governance",
    title: "Policy & Governance",
    description: "What policies and procedures does your business have?",
    questions: [
      {
        id: "privacyPolicy",
        label: "Do you have a privacy policy?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "securityPolicy",
        label: "Do you have a written security policy?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "employeeHandbook",
        label: "Do you have an employee handbook?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "acceptableUse",
        label: "Do you have an acceptable use policy for technology?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "incidentResponse",
        label: "Do you have an incident response plan (what to do if something goes wrong)?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "businessContinuity",
        label: "Do you have a business continuity plan?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "vendorReview",
        label: "Do you review vendors before signing contracts?",
        type: "radio",
        options: [
          { value: "yes_formal", label: "Yes, formal process" },
          { value: "yes_informal", label: "Yes, informally" },
          { value: "no", label: "No" },
        ],
      },
    ],
  },
  {
    id: "claims",
    title: "Claims & Risk History",
    description: "Has your business had any prior incidents or claims?",
    questions: [
      {
        id: "priorIncidents",
        label: "Have you had security or data incidents in the past 2 years?",
        type: "radio",
        options: [
          { value: "no", label: "No" },
          { value: "yes_minor", label: "Yes, minor" },
          { value: "yes_major", label: "Yes, significant" },
        ],
      },
      {
        id: "dataBreaches",
        label: "Have you experienced a data breach?",
        type: "radio",
        options: [
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ],
      },
      {
        id: "downtime",
        label: "Have you had significant business downtime in the past year?",
        type: "radio",
        options: [
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ],
      },
      {
        id: "fraud",
        label: "Have you experienced fraud (internal or external)?",
        type: "radio",
        options: [
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ],
      },
      {
        id: "insuranceClaims",
        label: "Have you filed insurance claims in the past 3 years?",
        type: "radio",
        options: [
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ],
      },
      {
        id: "unresolvedRisks",
        label: "Are there known risks you haven't addressed yet?",
        type: "radio",
        options: [
          { value: "no", label: "No" },
          { value: "yes_few", label: "Yes, a few" },
          { value: "yes_many", label: "Yes, several" },
        ],
      },
    ],
  },
];

export type AssessmentAnswers = Record<string, string | number | string[] | undefined>;
