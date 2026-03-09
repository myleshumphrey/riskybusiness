import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

const signupSchema = {
  name: (v: unknown) => (typeof v === "string" ? v : ""),
  email: (v: unknown) => (typeof v === "string" && v.includes("@") ? v : null),
  password: (v: unknown) =>
    typeof v === "string" && v.length >= 8 ? v : null,
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = signupSchema.name(body.name);
    const email = signupSchema.email(body.email);
    const password = signupSchema.password(body.password);

    if (!email) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        email,
        name: name || null,
        passwordHash,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
