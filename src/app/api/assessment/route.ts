import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const company = await prisma.company.findFirst({
    where: { userId: session.user.id },
    include: {
      assessments: {
        where: { status: "draft" },
        orderBy: { startedAt: "desc" },
        take: 1,
      },
    },
  });

  if (!company) {
    return NextResponse.json({ assessment: null, company: null });
  }

  const draftAssessment = company.assessments[0];

  return NextResponse.json({
    assessment: draftAssessment,
    company,
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let company = await prisma.company.findFirst({
      where: { userId: session.user.id },
    });

    if (!company) {
      company = await prisma.company.create({
        data: {
          userId: session.user.id,
          name: "My Company",
        },
      });
    }

    const existingDraft = await prisma.assessment.findFirst({
      where: { companyId: company.id, status: "draft" },
    });

    if (existingDraft) {
      return NextResponse.json({ assessment: existingDraft });
    }

    const assessment = await prisma.assessment.create({
      data: {
        companyId: company.id,
        status: "draft",
        answers: {},
      },
    });

    return NextResponse.json({ assessment });
  } catch {
    return NextResponse.json(
      { error: "Failed to create assessment" },
      { status: 500 }
    );
  }
}
