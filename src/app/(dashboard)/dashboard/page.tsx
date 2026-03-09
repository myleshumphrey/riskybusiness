import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return null;

  const companies = await prisma.company.findMany({
    where: { userId },
    include: {
      assessments: {
        where: { status: "completed" },
        include: { riskScore: true },
        orderBy: { completedAt: "desc" },
        take: 1,
      },
    },
  });

  const latestAssessment = companies[0]?.assessments[0];
  const latestScore = latestAssessment?.riskScore;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Your business risk profile at a glance.</p>
      </div>

      {latestScore ? (
        <div className="space-y-6">
          <Card className="border-gray-200/80 shadow-sm">
            <CardHeader>
              <CardTitle>Your risk profile</CardTitle>
              <CardDescription>
                Based on your most recent assessment for {companies[0]?.name ?? "your company"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-xl text-2xl font-bold text-white ${
                    latestScore.overall >= 85
                      ? "bg-green-600"
                      : latestScore.overall >= 70
                        ? "bg-emerald-500"
                        : latestScore.overall >= 55
                          ? "bg-amber-500"
                          : latestScore.overall >= 40
                            ? "bg-orange-500"
                            : "bg-red-500"
                  }`}
                >
                  {latestScore.overall}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Overall score</p>
                  <p className="text-lg font-semibold text-gray-900">{latestScore.level}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Link href={`/dashboard/${latestAssessment?.id}`}>
                  <Button>View full dashboard</Button>
                </Link>
                <Link href={`/report/${latestAssessment?.id}`}>
                  <Button variant="outline">Download report</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border-gray-200/80 shadow-sm">
          <CardHeader>
            <CardTitle>Get started</CardTitle>
            <CardDescription>
              Complete a short assessment to see your company&apos;s risk profile, strengths, and recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/assessment">
              <Button>Start assessment</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <Card className="border-gray-200/80 shadow-sm">
        <CardHeader>
          <CardTitle>Quick actions</CardTitle>
          <CardDescription>Manage your assessments and reports</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Link href="/assessment">
            <Button variant="outline">New assessment</Button>
          </Link>
          {latestAssessment && (
            <Link href={`/report/${latestAssessment.id}`}>
              <Button variant="outline">Download report</Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
