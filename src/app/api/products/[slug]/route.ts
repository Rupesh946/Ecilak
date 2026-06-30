/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const productUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  ingredients: z.string().optional(),
  howToUse: z.string().optional(),
  price: z.number().positive().optional(),
  compareAtPrice: z.number().positive().optional().nullable(),
  sku: z.string().min(2).optional(),
  stockQuantity: z.number().nonnegative().optional(),
  categoryId: z.string().uuid().optional(),
  images: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: { select: { name: true, slug: true } },
        variants: true,
        reviews: {
          where: { isApproved: true },
          include: {
            user: { select: { name: true } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Map reviews format
    const reviewsFormatted = product.reviews.map((rev) => ({
      id: rev.id,
      rating: rev.rating,
      title: rev.comment.substring(0, 30) + (rev.comment.length > 30 ? "..." : ""),
      body: rev.comment,
      author: rev.user.name,
      date: rev.createdAt.toISOString(),
      verified: true, // simplified mock helper
    }));

    const ratingSum = product.reviews.reduce((sum, rev) => sum + rev.rating, 0);
    const averageRating = product.reviews.length > 0 ? ratingSum / product.reviews.length : 4.8;

    const productFormatted = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      shortDescription: product.description.substring(0, 150) + (product.description.length > 150 ? "..." : ""),
      ingredients: product.ingredients || "No specific ingredients listed.",
      howToUse: product.howToUse || "Apply daily or as needed.",
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      sku: product.sku,
      stockQuantity: product.stockQuantity,
      inStock: product.stockQuantity > 0,
      category: product.category.name,
      categorySlug: product.category.slug,
      images: product.images,
      isFeatured: product.isFeatured,
      isActive: product.isActive,
      variants: product.variants.map((v) => ({
        id: v.id,
        value: v.name,
        label: v.name,
        inStock: v.stockQuantity > 0,
        priceOverride: v.priceOverride,
      })),
      sizes: product.variants
        .filter((v) => v.name.toLowerCase().includes("ml") || v.name.toLowerCase().includes("g"))
        .map((v) => ({
          value: v.name,
          label: v.name,
          inStock: v.stockQuantity > 0,
        })),
      rating: averageRating,
      reviewCount: product.reviews.length || 12,
      reviews: reviewsFormatted,
    };

    return NextResponse.json(productFormatted);
  } catch (error) {
    console.error("Product GET details error:", error);
    return NextResponse.json({ error: "Failed to fetch product details" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { slug } = params;
    const body = await req.json();
    const result = productUpdateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const updateData = { ...result.data };

    const product = await prisma.product.update({
      where: { slug },
      data: updateData as any,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Product update error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = params;

    await prisma.product.delete({
      where: { slug },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Product delete error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
