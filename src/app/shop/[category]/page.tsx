"use client";

import { useState, useMemo } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { getProductsByCategory } from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";

const PRODUCTS_PER_PAGE = 8;
type SortOption = "newest" | "price-asc" | "price-desc" | "popular";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category: categorySlug } = params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const allProducts = getProductsByCategory(categorySlug);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

  const sorted = useMemo(() => {
    const result = [...allProducts];
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "popular":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }
    return result;
  }, [allProducts, sortBy]);

  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  return (
    <div className="pt-24 pb-16">
      <div className="container-wide">
        {/* Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-12 min-h-[300px] md:min-h-[400px] flex flex-col items-center justify-center text-center px-8 md:px-16">
          <Image
            src={category.image}
            alt={`${category.name} category - ${category.description}`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-warm-gray-900/60 via-warm-gray-900/40 to-warm-gray-900/70" />
          
          <div className="relative z-10">
            <h1 className="font-serif text-4xl md:text-5xl text-white mb-3 drop-shadow-sm">
              {category.name}
            </h1>
            <p className="text-cream-100 font-sans max-w-lg mx-auto drop-shadow-sm">
              {category.description}
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-warm-gray-400 font-sans">
            {sorted.length} {sorted.length === 1 ? "product" : "products"}
          </p>
          <Select
            value={sortBy}
            onValueChange={(v) => setSortBy(v as SortOption)}
          >
            <SelectTrigger className="w-[180px] border-warm-gray-300 text-warm-gray-600 font-sans text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-cream-50">
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-asc">Price: Low → High</SelectItem>
              <SelectItem value="price-desc">Price: High → Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Grid */}
        <ProductGrid products={visible} columns={4} />

        {hasMore && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              onClick={() => setVisibleCount((prev) => prev + PRODUCTS_PER_PAGE)}
              className="border-warm-gray-300 text-warm-gray-600 hover:border-terracotta-400 hover:text-terracotta-400 font-sans text-sm px-8 rounded-full"
            >
              Load More
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
