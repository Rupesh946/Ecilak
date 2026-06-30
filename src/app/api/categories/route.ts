import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  image: z.string().optional(),
  parentCategoryId: z.string().optional().nullable(),
});

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: {
          select: { id: true },
        },
      },
      orderBy: { name: "asc" },
    });

    // Map productCount helper dynamically
    const categoriesWithCount = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      image: cat.image,
      parentCategoryId: cat.parentCategoryId,
      productCount: cat.products.length,
    }));

    return NextResponse.json(categoriesWithCount);
  } catch (error) {
    console.error("Categories fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const result = categorySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { name, slug, image, parentCategoryId } = result.data;

    const existing = await prisma.category.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json({ error: "A category with this slug already exists" }, { status: 409 });
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        image,
        parentCategoryId: parentCategoryId || null,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Category creation error:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
