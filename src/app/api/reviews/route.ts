import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { sanitizeHtml } from "@/lib/sanitize";

const reviewSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
  rating: z.number().int().min(1).max(5, "Rating must be between 1 and 5"),
  comment: z.string().min(5, "Comment must be at least 5 characters"),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "You must be logged in to submit a review." }, { status: 401 });
    }

    const body = await req.json();
    const result = reviewSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { productId, rating, comment } = result.data;
    const sanitizedComment = sanitizeHtml(comment);

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check if user already reviewed
    const existing = await prisma.review.findFirst({
      where: {
        productId,
        userId: session.user.id,
      },
    });

    if (existing) {
      return NextResponse.json({ error: "You have already reviewed this product." }, { status: 409 });
    }

    const review = await prisma.review.create({
      data: {
        productId,
        userId: session.user.id,
        rating,
        comment: sanitizedComment,
        isApproved: true, // auto approved in demo, admins can delete
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Review creation error:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
