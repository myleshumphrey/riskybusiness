import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { renderToBuffer } from "@react-pdf/renderer";
import { RiskReportPDF } from "@/components/report/RiskReportPDF";

export async function GET(
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
    include: {
      company: true,
      riskScore: true,
    },
  });

  if (!assessment) {
    return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
  }

  if (assessment.company.userId !== session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  if (!assessment.riskScore) {
    return NextResponse.json(
      { error: "No risk score found for this assessment" },
      { status: 400 }
    );
  }

  const rs = assessment.riskScore;

  const pdfDoc = (
    <RiskReportPDF
      companyName={assessment.company.name}
      overall={rs.overall}
      level={rs.level}
      operational={rs.operational}
      cyber={rs.cyber}
      governance={rs.governance}
      resilience={rs.resilience}
      claims={rs.claims}
      strengths={(rs.strengths as string[]) ?? []}
      weaknesses={(rs.weaknesses as string[]) ?? []}
      recommendations={
        (rs.recommendations as { title: string; description: string; priority: string }[]) ?? []
      }
      generatedAt={new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    />
  );

  try {
    const buffer = await renderToBuffer(pdfDoc);

    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="risk-profile-${assessment.company.name.replace(/\s+/g, "-")}.pdf"`,
      },
    });
  } catch (err) {
    console.error("PDF generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
