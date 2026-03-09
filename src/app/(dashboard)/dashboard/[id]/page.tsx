import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CategoryChart } from "@/components/dashboard/CategoryChart";

const CATEGORIES = [
  { key: "operational", label: "Operational", color: "#3b82f6" },
  { key: "cyber", label: "Cyber & Tech", color: "#8b5cf6" },
  { key: "governance", label: "Governance", color: "#10b981" },
  { key: "resilience", label: "Resilience", color: "#f59e0b" },
  { key: "claims", label: "Claims History", color: "#ef4444" },
];

function getScoreColor(score: number) {
  if (score >= 85) return "bg-green-600";
  if (score >= 70) return "bg-emerald-500";
  if (score >= 55) return "bg-amber-500";
  if (score >= 40) return "bg-orange-500";
  return "bg-red-500";
}

export default async function DashboardResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (!session?.user?.id) return null;

  const assessment = await prisma.assessment.findUnique({
    where: { id },
    include: {
      company: true,
      riskScore: true,
    },
  });

  if (!assessment) notFound();
  if (assessment.company.userId !== session.user.id) notFound();
  if (assessment.status !== "completed" || !assessment.riskScore) {
    notFound();
  }

  const rs = assessment.riskScore;
  const strengths = (rs.strengths as string[]) ?? [];
  const weaknesses = (rs.weaknesses as string[]) ?? [];
  const recommendations = (rs.recommendations as { title: string; description: string; priority: string }[]) ?? [];

  const chartData = CATEGORIES.map((c) => ({
    name: c.label,
    score: rs[c.key as keyof typeof rs] as number,
    fill: c.color,
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Risk Profile</h1>
          <p className="mt-2 text-gray-600">
            {assessment.company.name} — completed{" "}
            {assessment.completedAt
              ? new Date(assessment.completedAt).toLocaleDateString()
              : ""}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href={`/report/${id}`}>
            <Button variant="outline">Download report</Button>
          </Link>
          <Link href="/assessment">
            <Button>New assessment</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1 border-gray-200/80 shadow-sm">
          <CardHeader>
            <CardTitle>Overall score</CardTitle>
            <CardDescription>Your company risk profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`flex h-24 w-24 items-center justify-center rounded-2xl text-3xl font-bold text-white ${getScoreColor(rs.overall)}`}
            >
              {rs.overall}
            </div>
            <Badge className="mt-4" variant="secondary">
              {rs.level}
            </Badge>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-gray-200/80 shadow-sm">
          <CardHeader>
            <CardTitle>Category breakdown</CardTitle>
            <CardDescription>Scores by risk area</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryChart data={chartData} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-gray-200/80 shadow-sm">
          <CardHeader>
            <CardTitle>Strengths</CardTitle>
            <CardDescription>What you&apos;re doing well</CardDescription>
          </CardHeader>
          <CardContent>
            {strengths.length > 0 ? (
              <ul className="space-y-2">
                {strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-gray-700">{s}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Complete more sections to see strengths.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-200/80 shadow-sm">
          <CardHeader>
            <CardTitle>Key gaps</CardTitle>
            <CardDescription>Areas to improve</CardDescription>
          </CardHeader>
          <CardContent>
            {weaknesses.length > 0 ? (
              <ul className="space-y-2">
                {weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500">!</span>
                    <span className="text-gray-700">{w}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No significant gaps identified.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200/80 shadow-sm">
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
          <CardDescription>Prioritized next steps to improve your risk profile</CardDescription>
        </CardHeader>
        <CardContent>
          {recommendations.length > 0 ? (
            <ul className="space-y-4">
              {recommendations.map((r, i) => (
                <li key={i} className="flex gap-4 rounded-lg border border-gray-200/80 p-4">
                  <Badge
                    variant={r.priority === "high" ? "destructive" : "secondary"}
                    className="shrink-0"
                  >
                    {r.priority}
                  </Badge>
                  <div>
                    <p className="font-medium text-gray-900">{r.title}</p>
                    <p className="mt-1 text-sm text-gray-600">{r.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recommendations at this time.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
