import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { calculateRiskScore } from "@/lib/scoring/engine";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const assessment = await prisma.assessment.findUnique({
    where: { id },
    include: { company: true },
  });

  if (!assessment) {
    return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
  }

  if (assessment.company.userId !== session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  if (assessment.status === "completed") {
    return NextResponse.json(
      { error: "Assessment already completed" },
      { status: 400 }
    );
  }

  const answers = (assessment.answers ?? {}) as Record<string, string | number | string[]>;

  try {
    const result = await calculateRiskScore(answers);

    await prisma.$transaction([
      prisma.assessment.update({
        where: { id },
        data: {
          status: "completed",
          completedAt: new Date(),
        },
      }),
      prisma.riskScore.create({
        data: {
          assessmentId: id,
          overall: result.overall,
          operational: result.operational,
          cyber: result.cyber,
          governance: result.governance,
          resilience: result.resilience,
          claims: result.claims,
          level: result.level,
          strengths: result.strengths,
          weaknesses: result.weaknesses,
          recommendations: result.recommendations,
        },
      }),
    ]);

    return NextResponse.json({ success: true, assessmentId: id });
  } catch (err) {
    console.error("Scoring error:", err);
    return NextResponse.json(
      { error: "Failed to calculate risk score" },
      { status: 500 }
    );
  }
}
