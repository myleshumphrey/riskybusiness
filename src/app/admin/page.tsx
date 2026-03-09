import Link from "next/link";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminPage() {
  const assessments = await prisma.assessment.findMany({
    where: { status: "completed" },
    include: {
      company: true,
      riskScore: true,
    },
    orderBy: { completedAt: "desc" },
    take: 100,
  });

  const commonGaps = await prisma.riskScore.findMany({
    where: {},
    select: { recommendations: true },
    take: 200,
  });

  const gapCounts: Record<string, number> = {};
  for (const rs of commonGaps) {
    const recs = (rs.recommendations as { title: string }[]) ?? [];
    for (const r of recs) {
      gapCounts[r.title] = (gapCounts[r.title] ?? 0) + 1;
    }
  }
  const topGaps = Object.entries(gapCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Review business assessments and common risk gaps.
        </p>
      </div>

      <Card className="border-gray-200/80 shadow-sm">
        <CardHeader>
          <CardTitle>Assessments</CardTitle>
          <CardDescription>
            Completed assessments across all businesses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 text-left font-medium text-gray-900">
                    Company
                  </th>
                  <th className="py-3 text-left font-medium text-gray-900">
                    Score
                  </th>
                  <th className="py-3 text-left font-medium text-gray-900">
                    Level
                  </th>
                  <th className="py-3 text-left font-medium text-gray-900">
                    Completed
                  </th>
                  <th className="py-3 text-left font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((a) => (
                  <tr key={a.id} className="border-b border-gray-100">
                    <td className="py-3 text-gray-700">{a.company.name}</td>
                    <td className="py-3">
                      <span className="font-medium">{a.riskScore?.overall ?? "—"}</span>
                    </td>
                    <td className="py-3">
                      <Badge variant="secondary">{a.riskScore?.level ?? "—"}</Badge>
                    </td>
                    <td className="py-3 text-gray-600">
                      {a.completedAt
                        ? new Date(a.completedAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="py-3">
                      <Link
                        href={`/api/report/${a.id}/pdf`}
                        className="text-primary hover:underline"
                      >
                        Export PDF
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {assessments.length === 0 && (
            <p className="py-8 text-center text-gray-500">No completed assessments yet.</p>
          )}
        </CardContent>
      </Card>

      <Card className="border-gray-200/80 shadow-sm">
        <CardHeader>
          <CardTitle>Common risk gaps</CardTitle>
          <CardDescription>
            Most frequently identified recommendations across businesses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {topGaps.map(([title, count]) => (
              <li key={title} className="flex justify-between gap-4">
                <span className="text-gray-700">{title}</span>
                <Badge variant="outline">{count} businesses</Badge>
              </li>
            ))}
          </ul>
          {topGaps.length === 0 && (
            <p className="py-4 text-gray-500">No data yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
