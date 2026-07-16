import { Suspense } from "react";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { ShopToolbar } from "@/components/shop/ShopToolbar";
import { products as localProducts, type Product } from "@/data/products";
import { categories as localCategories } from "@/data/categories";

export const dynamic = "force-dynamic";

interface ShopPageProps {
  searchParams: {
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
    sort?: string;
    page?: string;
  };
}

// Try to load from DB; if that fails, fall back to local static data
async function getShopData(searchParams: ShopPageProps["searchParams"]) {
  try {
    // Dynamic imports to avoid crashing if Prisma can't connect
    const { getProducts } = await import("@/lib/services/products");
    const prisma = (await import("@/lib/prisma")).default;

    const queryOptions = {
      category: searchParams.category,
      minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
      maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
      inStock: searchParams.inStock === "true",
      sort: (searchParams.sort as "newest" | "price-asc" | "price-desc" | "popular") || "popular",
      page: searchParams.page ? Number(searchParams.page) : 1,
      limit: 12,
    };

    const [categories, productData] = await Promise.all([
      prisma.category.findMany({
        include: {
          _count: {
            select: { products: { where: { isActive: true } } }
          }
        }
      }),
      getProducts(queryOptions)
    ]);

    const formattedCategories = categories.map((c: { id: string; name: string; slug: string; _count: { products: number } }) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      productCount: c._count.products
    }));

    return {
      products: productData.products,
      totalCount: productData.totalCount,
      categories: formattedCategories,
      source: "db" as const,
    };
  } catch (error) {
    console.warn("DB unavailable, falling back to local data:", (error as Error).message);

    // Fallback: use local static data
    let filteredProducts = [...localProducts];

    // Apply category filter
    if (searchParams.category) {
      const slugs = searchParams.category.split(",");
      filteredProducts = filteredProducts.filter(p => slugs.includes(p.categorySlug));
    }

    // Apply price filters
    const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : undefined;
    const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined;
    if (minPrice !== undefined) filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
    if (maxPrice !== undefined) filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);

    // Apply stock filter
    if (searchParams.inStock === "true") {
      filteredProducts = filteredProducts.filter(p => p.inStock);
    }

    // Apply sorting
    const sort = searchParams.sort || "popular";
    switch (sort) {
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "popular":
        filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    // Pagination
    const page = searchParams.page ? Number(searchParams.page) : 1;
    const limit = 12;
    const start = (page - 1) * limit;
    const paginatedProducts = filteredProducts.slice(start, start + limit);

    const formattedCategories = localCategories.map(c => ({
      id: c.slug,
      name: c.name,
      slug: c.slug,
      productCount: c.productCount
    }));

    return {
      products: paginatedProducts,
      totalCount: filteredProducts.length,
      categories: formattedCategories,
      source: "local" as const,
    };
  }
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { products, totalCount, categories } = await getShopData(searchParams);

  // Calculate active filter count for the UI
  let activeFilterCount = 0;
  if (searchParams.category) activeFilterCount += searchParams.category.split(",").length;
  if (searchParams.minPrice || searchParams.maxPrice) activeFilterCount += 1;
  if (searchParams.inStock) activeFilterCount += 1;

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Header */}
      <div className="bg-cream-50 border-b border-cream-300 py-12 mb-12">
        <div className="container-wide">
          <SectionHeading
            subtitle="Clean Cosmetics"
            title="All Products"
            align="center"
          />
        </div>
      </div>

      <div className="container-wide">
        <div className="grid lg:grid-cols-4 gap-10">
          
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl text-warm-gray-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </h3>
            </div>
            <Separator className="bg-cream-300" />
            <Suspense fallback={<div>Loading filters...</div>}>
              <ShopFilters categories={categories} />
            </Suspense>
          </aside>

          {/* Catalog Listing */}
          <div className="lg:col-span-3 space-y-8">
            {/* Toolbar (Mobile Filters + Sort) */}
            <ShopToolbar 
              totalCount={totalCount} 
              activeFilterCount={activeFilterCount}
            >
              <ShopFilters categories={categories} />
            </ShopToolbar>

            {/* Products Grid */}
            <Suspense fallback={
              <div className="py-20 flex justify-center items-center">
                <Loader2 className="w-10 h-10 animate-spin text-terracotta-400" />
              </div>
            }>
              <ProductGrid products={products as unknown as Product[]} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
