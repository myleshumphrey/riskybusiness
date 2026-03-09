import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ReportPage({
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
  if (!assessment.riskScore) notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Risk Profile Report</h1>
        <p className="mt-2 text-gray-600">
          Download a professional PDF report for {assessment.company.name}.
        </p>
      </div>

      <Card className="border-gray-200/80 shadow-sm">
        <CardHeader>
          <CardTitle>Download your report</CardTitle>
          <CardDescription>
            This report includes your risk score, category breakdown, strengths, gaps, and recommendations. Share it with partners, insurers, or internal leadership.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <a href={`/api/report/${id}/pdf`} download>
            <Button size="lg">Download PDF</Button>
          </a>
          <Link href={`/dashboard/${id}`}>
            <Button variant="outline">Back to dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
