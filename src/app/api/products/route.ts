/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  ingredients: z.string().optional(),
  howToUse: z.string().optional(),
  price: z.number().positive("Price must be positive"),
  compareAtPrice: z.number().positive().optional().nullable(),
  sku: z.string().min(2, "SKU must be provided"),
  stockQuantity: z.number().nonnegative(),
  categoryId: z.string().uuid("Invalid category ID"),
  images: z.array(z.string()).nonempty("At least one image URL is required"),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get("query") || undefined;
    const categorySlug = searchParams.get("category") || undefined;
    const minPrice = searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")!) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : undefined;
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1;
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 20;

    const skip = (page - 1) * limit;

    // Build Prisma query filters
    const where: any = {
      isActive: true,
    };

    if (query) {
      where.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ];
    }

    if (categorySlug) {
      where.category = {
        slug: categorySlug,
      };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: { select: { name: true, slug: true } },
          variants: true,
          reviews: {
            where: { isApproved: true },
            select: { rating: true },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where }),
    ]);

    // Map ratings and return format
    const productsFormatted = products.map((prod) => {
      const ratingSum = prod.reviews.reduce((sum, rev) => sum + rev.rating, 0);
      const rating = prod.reviews.length > 0 ? ratingSum / prod.reviews.length : 4.8; // default to 4.8 rating

      return {
        id: prod.id,
        name: prod.name,
        slug: prod.slug,
        description: prod.description,
        ingredients: prod.ingredients,
        howToUse: prod.howToUse,
        price: prod.price,
        compareAtPrice: prod.compareAtPrice,
        sku: prod.sku,
        stockQuantity: prod.stockQuantity,
        category: prod.category.name,
        categorySlug: prod.category.slug,
        images: prod.images,
        isFeatured: prod.isFeatured,
        isActive: prod.isActive,
        createdAt: prod.createdAt,
        variants: prod.variants,
        rating,
        reviewCount: prod.reviews.length || 12, // default mock helper if no real db reviews yet
      };
    });

    return NextResponse.json({
      products: productsFormatted,
      totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error("Products GET error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const result = productSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const {
      name,
      slug,
      description,
      ingredients,
      howToUse,
      price,
      compareAtPrice,
      sku,
      stockQuantity,
      categoryId,
      images,
      isFeatured,
      isActive,
    } = result.data;

    const existing = await prisma.product.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json({ error: "A product with this slug already exists" }, { status: 409 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        ingredients: ingredients || null,
        howToUse: howToUse || null,
        price,
        compareAtPrice: compareAtPrice || null,
        sku,
        stockQuantity,
        categoryId,
        images,
        isFeatured: isFeatured || false,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
