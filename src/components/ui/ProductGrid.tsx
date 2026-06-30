"use client";

import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/data/products";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ProductGrid({
  products,
  loading = false,
  columns = 4,
  className,
}: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  if (loading) {
    return (
      <div className={cn("grid gap-6 md:gap-8", gridCols[columns], className)}>
        {Array.from({ length: columns * 2 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-serif text-xl text-warm-gray-500 mb-2">
          No products found
        </p>
        <p className="text-sm text-warm-gray-400 font-sans">
          Try adjusting your filters or check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6 md:gap-8", gridCols[columns], className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-[3/4] rounded-2xl bg-cream-200" />
      <div className="space-y-2 px-1">
        <Skeleton className="h-3 w-16 bg-cream-200 rounded" />
        <Skeleton className="h-5 w-3/4 bg-cream-200 rounded" />
        <Skeleton className="h-4 w-1/3 bg-cream-200 rounded" />
        <Skeleton className="h-3 w-24 bg-cream-200 rounded" />
      </div>
    </div>
  );
}
