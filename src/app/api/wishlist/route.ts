import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const wishlistSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ items: [] });
    }

    const wishlist = await prisma.wishlist.findMany({
      where: { userId: session.user.id },
      select: { productId: true },
    });

    const items = wishlist.map((item) => item.productId);

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Wishlist GET error:", error);
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await req.json();
    const result = wishlistSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { productId } = result.data;

    // Check if item already wishlisted
    const existing = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ message: "Product already in wishlist" }, { status: 200 });
    }

    const item = await prisma.wishlist.create({
      data: {
        userId: session.user.id,
        productId,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Wishlist POST error:", error);
    return NextResponse.json({ error: "Failed to add item to wishlist" }, { status: 500 });
  }
}
