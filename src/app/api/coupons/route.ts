import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const couponSchema = z.object({
  code: z.string().min(2, "Code must be at least 2 characters").toUpperCase(),
  discountType: z.enum(["PERCENTAGE", "FIXED"]),
  discountValue: z.number().positive("Value must be positive"),
  expiry: z.string().datetime().optional().nullable(),
  usageLimit: z.number().int().positive().optional().nullable(),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(coupons);
  } catch (error) {
    console.error("Coupons GET error:", error);
    return NextResponse.json({ error: "Failed to fetch coupons" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const result = couponSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { code, discountType, discountValue, expiry, usageLimit } = result.data;

    const existing = await prisma.coupon.findUnique({
      where: { code },
    });

    if (existing) {
      return NextResponse.json({ error: "A coupon with this code already exists" }, { status: 409 });
    }

    const coupon = await prisma.coupon.create({
      data: {
        code,
        discountType,
        discountValue,
        expiry: expiry ? new Date(expiry) : null,
        usageLimit: usageLimit || null,
      },
    });

    return NextResponse.json(coupon, { status: 201 });
  } catch (error) {
    console.error("Coupon creation error:", error);
    return NextResponse.json({ error: "Failed to create coupon" }, { status: 500 });
  }
}
