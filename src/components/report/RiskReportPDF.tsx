import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  header: {
    marginBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: "#1f2937",
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.5,
    marginBottom: 4,
  },
  scoreBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  scoreNumber: {
    width: 48,
    height: 48,
    backgroundColor: "#3b82f6",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 12,
    borderRadius: 4,
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    alignItems: "center",
  },
  categoryName: {
    fontSize: 10,
    color: "#374151",
  },
  categoryScore: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#111827",
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 4,
    gap: 6,
  },
  bullet: {
    fontSize: 10,
    color: "#059669",
  },
  listText: {
    fontSize: 10,
    color: "#374151",
    flex: 1,
  },
  recItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  recTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  recDesc: {
    fontSize: 10,
    color: "#6b7280",
    lineHeight: 1.4,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#9ca3af",
  },
});

interface RiskReportPDFProps {
  companyName: string;
  overall: number;
  level: string;
  operational: number;
  cyber: number;
  governance: number;
  resilience: number;
  claims: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: { title: string; description: string; priority: string }[];
  generatedAt: string;
}

export function RiskReportPDF({
  companyName,
  overall,
  level,
  operational,
  cyber,
  governance,
  resilience,
  claims,
  strengths,
  weaknesses,
  recommendations,
  generatedAt,
}: RiskReportPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Risk Profile Report</Text>
          <Text style={styles.subtitle}>
            {companyName} — Generated {generatedAt}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive Summary</Text>
          <Text style={styles.bodyText}>
            This risk profile assessment evaluates {companyName}&apos;s overall risk posture across operational, cyber, governance, resilience, and claims history categories. The assessment is based on self-reported information and provides a high-level view of risk factors and improvement opportunities.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall Risk Score</Text>
          <View style={styles.scoreBox}>
            <View style={[styles.scoreNumber, { backgroundColor: overall >= 85 ? "#059669" : overall >= 70 ? "#10b981" : overall >= 55 ? "#f59e0b" : overall >= 40 ? "#f97316" : "#ef4444" }]}>
              <Text>{overall}</Text>
            </View>
            <View>
              <Text style={styles.scoreLabel}>Score: {overall}/100</Text>
              <Text style={styles.bodyText}>Risk Level: {level}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category Scores</Text>
          <View style={styles.categoryRow}>
            <Text style={styles.categoryName}>Operational</Text>
            <Text style={styles.categoryScore}>{operational}/100</Text>
          </View>
          <View style={styles.categoryRow}>
            <Text style={styles.categoryName}>Cyber & Technology</Text>
            <Text style={styles.categoryScore}>{cyber}/100</Text>
          </View>
          <View style={styles.categoryRow}>
            <Text style={styles.categoryName}>Governance & Policy</Text>
            <Text style={styles.categoryScore}>{governance}/100</Text>
          </View>
          <View style={styles.categoryRow}>
            <Text style={styles.categoryName}>Resilience & Continuity</Text>
            <Text style={styles.categoryScore}>{resilience}/100</Text>
          </View>
          <View style={styles.categoryRow}>
            <Text style={styles.categoryName}>Claims & Incident History</Text>
            <Text style={styles.categoryScore}>{claims}/100</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Strengths</Text>
          {strengths.map((s, i) => (
            <View key={i} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>{s}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Gaps</Text>
          {weaknesses.map((w, i) => (
            <View key={i} style={styles.listItem}>
              <Text style={[styles.bullet, { color: "#d97706" }]}>•</Text>
              <Text style={styles.listText}>{w}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {recommendations.map((r, i) => (
            <View key={i} style={styles.recItem}>
              <Text style={styles.recTitle}>
                [{r.priority.toUpperCase()}] {r.title}
              </Text>
              <Text style={styles.recDesc}>{r.description}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>
          Risk Profile Report — {companyName} — {generatedAt} — Confidential
        </Text>
      </Page>
    </Document>
  );
}
