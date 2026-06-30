import prisma from "@/lib/prisma";
import { ProductsClient } from "./ProductsClient";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: {
        category: { select: { name: true } },
        variants: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  const productsFormatted = products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    ingredients: p.ingredients || "",
    howToUse: p.howToUse || "",
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    sku: p.sku,
    stockQuantity: p.stockQuantity,
    categoryId: p.categoryId,
    categoryName: p.category.name,
    images: p.images,
    isFeatured: p.isFeatured,
    isActive: p.isActive,
    variantsCount: p.variants.length,
  }));

  return (
    <ProductsClient
      initialProducts={productsFormatted}
      categories={categories}
    />
  );
}
