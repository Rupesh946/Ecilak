import prisma from "@/lib/prisma";

export interface GetProductsOptions {
  query?: string;
  category?: string; // slugs, comma-separated optionally
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: "newest" | "price-asc" | "price-desc" | "popular";
  page?: number;
  limit?: number;
}

export async function getProducts(options: GetProductsOptions) {
  const {
    query,
    category,
    minPrice,
    maxPrice,
    inStock,
    sort = "newest",
    page = 1,
    limit = 20,
  } = options;

  const skip = (page - 1) * limit;

  // Build Prisma query filters
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    isActive: true,
    name: {
      notIn: ['Face Detox', 'D-tan Pack']
    }
  };

  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  if (category) {
    const slugs = category.split(",");
    where.category = {
      slug: { in: slugs },
    };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) where.price.gte = minPrice;
    if (maxPrice !== undefined) where.price.lte = maxPrice;
  }

  if (inStock) {
    where.stockQuantity = { gt: 0 };
  }

  // Handle sorting
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let orderBy: any = { createdAt: "desc" };
  
  if (sort === "price-asc") {
    orderBy = { price: "asc" };
  } else if (sort === "price-desc") {
    orderBy = { price: "desc" };
  } else if (sort === "newest") {
    orderBy = { createdAt: "desc" };
  } else if (sort === "popular") {
    orderBy = {
      reviews: {
        _count: "desc",
      },
    };
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
      orderBy,
    }),
    prisma.product.count({ where }),
  ]);

  // Map ratings and return format
  const productsFormatted = products.map((prod) => {
    const ratingSum = prod.reviews.reduce((sum, rev) => sum + rev.rating, 0);
    const rating = prod.reviews.length > 0 ? ratingSum / prod.reviews.length : 4.8;

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
      inStock: prod.stockQuantity > 0,
      category: prod.category.name,
      categorySlug: prod.category.slug,
      images: prod.images,
      isFeatured: prod.isFeatured,
      isBestseller: prod.isFeatured, // treat featured as bestseller
      isNew: false,
      isActive: prod.isActive,
      createdAt: prod.createdAt.toISOString(),
      shortDescription: prod.description.substring(0, 100),
      tags: [],
      variants: prod.variants.map((v) => ({
        id: v.id,
        value: v.name,
        label: v.name,
        inStock: v.stockQuantity > 0,
        priceOverride: v.priceOverride,
      })),
      sizes: prod.variants
        .filter((v) => v.name.toLowerCase().includes("ml") || v.name.toLowerCase().includes("g"))
        .map((v) => ({
          value: v.name,
          label: v.name,
          inStock: v.stockQuantity > 0,
        })),
      rating,
      reviewCount: prod.reviews.length || 12,
    };
  });

  return {
    products: productsFormatted,
    totalCount,
    page,
    limit,
    totalPages: Math.ceil(totalCount / limit),
  };
}
