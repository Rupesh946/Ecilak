/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useEffect } from "react";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { formatPrice } from "@/lib/utils";

const PRODUCTS_PER_PAGE = 8;

type SortOption = "newest" | "price-asc" | "price-desc" | "popular";

export default function ShopPage() {
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Load products and categories on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("/api/products?limit=100"),
          fetch("/api/categories"),
        ]);

        if (prodRes.ok && catRes.ok) {
          const prodData = await prodRes.json();
          const catData = await catRes.json();
          setDbProducts(prodData.products || []);
          setDbCategories(catData || []);
        }
      } catch (err) {
        console.error("Failed to load catalog data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filtered = useMemo(() => {
    let result = [...dbProducts];

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.categorySlug));
    }
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    if (inStockOnly) {
      result = result.filter((p) => p.stockQuantity > 0);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "popular":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [dbProducts, selectedCategories, priceRange, inStockOnly, sortBy]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
    setVisibleCount(PRODUCTS_PER_PAGE);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 150]);
    setInStockOnly(false);
    setVisibleCount(PRODUCTS_PER_PAGE);
  };

  const activeFilterCount =
    selectedCategories.length +
    (priceRange[0] > 0 || priceRange[1] < 150 ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h4 className="font-serif text-lg text-warm-gray-900 mb-4">Category</h4>
        <div className="space-y-3">
          {dbCategories.map((category) => (
            <div key={category.id} className="flex items-center gap-3">
              <Checkbox
                id={`cat-${category.slug}`}
                checked={selectedCategories.includes(category.slug)}
                onCheckedChange={() => toggleCategory(category.slug)}
                className="border-warm-gray-300 data-[state=checked]:bg-terracotta-400 data-[state=checked]:border-terracotta-400"
              />
              <Label
                htmlFor={`cat-${category.slug}`}
                className="text-sm font-sans text-warm-gray-600 cursor-pointer flex items-center justify-between w-full"
              >
                <span>{category.name}</span>
                <span className="text-xs text-warm-gray-400">({category.productCount})</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-cream-300" />

      {/* Price */}
      <div>
        <h4 className="font-serif text-lg text-warm-gray-900 mb-4">Price Range</h4>
        <div className="space-y-4 px-2">
          <Slider
            min={0}
            max={150}
            step={5}
            value={priceRange}
            onValueChange={(val) => setPriceRange(val as [number, number])}
            className="text-terracotta-400"
          />
          <div className="flex items-center justify-between text-xs text-warm-gray-500 font-sans">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>

      <Separator className="bg-cream-300" />

      {/* Stock */}
      <div>
        <h4 className="font-serif text-lg text-warm-gray-900 mb-4">Availability</h4>
        <div className="flex items-center gap-3">
          <Checkbox
            id="in-stock"
            checked={inStockOnly}
            onCheckedChange={(val) => setInStockOnly(val as boolean)}
            className="border-warm-gray-300 data-[state=checked]:bg-terracotta-400 data-[state=checked]:border-terracotta-400"
          />
          <Label
            htmlFor="in-stock"
            className="text-sm font-sans text-warm-gray-600 cursor-pointer"
          >
            In Stock Only
          </Label>
        </div>
      </div>
    </div>
  );

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
              {activeFilterCount > 0 && (
                <Button
                  variant="link"
                  onClick={clearFilters}
                  className="text-xs text-terracotta-400 hover:text-terracotta-500 p-0 font-sans"
                >
                  Clear all ({activeFilterCount})
                </Button>
              )}
            </div>
            <Separator className="bg-cream-300" />
            {loading ? (
              <div className="py-10 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-terracotta-400" />
              </div>
            ) : (
              <FilterContent />
            )}
          </aside>

          {/* Catalog Listing */}
          <div className="lg:col-span-3 space-y-8">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 bg-cream-50 p-4 rounded-xl border border-cream-300">
              <span className="text-xs text-warm-gray-500 font-sans">
                {loading ? "Loading..." : `Showing ${filtered.length} products`}
              </span>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger className="lg:hidden border border-warm-gray-300 text-warm-gray-600 font-sans text-xs gap-2 rounded-xl px-4 py-2 bg-white hover:bg-cream-200 transition-colors flex items-center justify-center">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[350px] bg-cream-50 font-sans">
                    <SheetHeader className="mb-6">
                      <SheetTitle className="font-serif text-2xl text-warm-gray-900 text-left">
                        Filters
                      </SheetTitle>
                    </SheetHeader>
                    <FilterContent />
                  </SheetContent>
                </Sheet>

                {/* Sort By Select */}
                <Select
                  value={sortBy}
                  onValueChange={(val) => setSortBy(val as SortOption)}
                >
                  <SelectTrigger className="w-[140px] bg-white border-cream-300 font-sans text-xs">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-cream-50 font-sans text-xs">
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="py-20 flex justify-center items-center">
                <Loader2 className="w-10 h-10 animate-spin text-terracotta-400" />
              </div>
            ) : (
              <ProductGrid products={visible} />
            )}

            {/* Pagination / Load More */}
            {hasMore && !loading && (
              <div className="text-center pt-8">
                <Button
                  onClick={() => setVisibleCount((prev) => prev + PRODUCTS_PER_PAGE)}
                  className="bg-warm-gray-900 text-cream-50 hover:bg-terracotta-400 font-sans rounded-full px-8 py-6"
                >
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
