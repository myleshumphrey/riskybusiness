import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const demoPassword = await bcrypt.hash("demo1234", 12);

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      email: "demo@example.com",
      name: "Demo User",
      passwordHash: demoPassword,
    },
  });

  let company = await prisma.company.findFirst({
    where: { userId: demoUser.id },
  });

  if (!company) {
    company = await prisma.company.create({
      data: {
        userId: demoUser.id,
        name: "Acme Small Business",
        industry: "services",
        size: "2-10",
        revenueRange: "100k-500k",
        location: "San Francisco, CA",
        businessType: "hybrid",
        employeeCount: 5,
        handlesData: true,
        acceptsPayments: true,
      },
    });
  }

  const existingAssessment = await prisma.assessment.findFirst({
    where: { companyId: company.id, status: "completed" },
    include: { riskScore: true },
  });

  if (!existingAssessment) {
    const assessment = await prisma.assessment.create({
      data: {
        companyId: company.id,
        status: "completed",
        completedAt: new Date(),
        answers: {
          businessName: "Acme Small Business",
          industry: "services",
          companySize: "2-10",
          employeeCount: 5,
          revenueRange: "100k-500k",
          location: "San Francisco, CA",
          businessType: "hybrid",
          handlesData: "yes",
          acceptsPayments: "yes",
          keyVendors: "somewhat",
          disasterRecovery: "yes_informal",
          remoteWork: "hybrid",
          physicalSecurity: "basic",
          customerConcentration: "no",
          mfa: "yes_some",
          passwordPolicy: "yes_enforced",
          backups: "weekly",
          antivirus: "yes_all",
          encryption: "yes_some",
          accessControls: "yes",
          softwareUpdates: "monthly",
          privacyPolicy: "yes",
          securityPolicy: "no",
          employeeHandbook: "yes",
          acceptableUse: "no",
          incidentResponse: "no",
          businessContinuity: "no",
          vendorReview: "yes_informal",
          priorIncidents: "no",
          dataBreaches: "no",
          downtime: "no",
          fraud: "no",
          insuranceClaims: "no",
          unresolvedRisks: "yes_few",
        },
      },
    });

    await prisma.riskScore.create({
      data: {
        assessmentId: assessment.id,
        overall: 72,
        operational: 75,
        cyber: 70,
        governance: 55,
        resilience: 65,
        claims: 90,
        level: "Good",
        strengths: [
          "Privacy policy in place",
          "Endpoint protection on all devices",
          "No prior security incidents",
          "Diversified customer base",
        ],
        weaknesses: [
          "Multi-factor authentication not fully implemented",
          "No incident response plan",
          "No disaster recovery plan",
        ],
        recommendations: [
          {
            title: "Enable multi-factor authentication (MFA)",
            description: "MFA adds an extra layer of security to business accounts. Enable it for email, cloud services, and banking.",
            priority: "high",
            category: "cyber",
          },
          {
            title: "Create an incident response plan",
            description: "Document steps to take if a breach or incident occurs: who to contact, how to contain, and how to notify affected parties.",
            priority: "high",
            category: "governance",
          },
          {
            title: "Create a disaster recovery plan",
            description: "Document how you'll recover critical operations if something goes wrong. Start with backups and key processes.",
            priority: "high",
            category: "operational",
          },
        ],
      },
    });
  }

  await prisma.adminUser.upsert({
    where: { userId: demoUser.id },
    update: {},
    create: {
      userId: demoUser.id,
      role: "analyst",
    },
  });

  console.log("Seed completed successfully!");
  console.log("Demo login: demo@example.com / demo1234");
  console.log("Admin access: same credentials — visit /admin");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
