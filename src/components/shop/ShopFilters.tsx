"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Category {
  id: string;
  name: string;
  slug: string;
  productCount?: number;
}

interface ShopFiltersProps {
  categories: Category[];
}

export function ShopFilters({ categories }: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial state from URL
  const initialCategory = searchParams.get("category") || "";
  const initialMinPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : 0;
  const initialMaxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 150;
  const initialInStock = searchParams.get("inStock") === "true";

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? initialCategory.split(",") : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([initialMinPrice, initialMaxPrice]);
  const [inStockOnly, setInStockOnly] = useState(initialInStock);

  // Sync state with URL when searchParams change (e.g. hitting back button or clear filters)
  useEffect(() => {
    const cat = searchParams.get("category") || "";
    setSelectedCategories(cat ? cat.split(",") : []);
    
    setPriceRange([
      searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : 0,
      searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 150
    ]);
    
    setInStockOnly(searchParams.get("inStock") === "true");
  }, [searchParams]);

  // Update URL function
  const createQueryString = useCallback(
    (paramsToUpdate: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams.toString());
      
      Object.entries(paramsToUpdate).forEach(([key, value]) => {
        if (value === null) {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });
      
      // Reset to page 1 on filter change
      newParams.delete("page");
      
      return newParams.toString();
    },
    [searchParams]
  );

  const toggleCategory = (slug: string) => {
    const newCategories = selectedCategories.includes(slug)
      ? selectedCategories.filter((s) => s !== slug)
      : [...selectedCategories, slug];
    
    setSelectedCategories(newCategories);
    router.push(`?${createQueryString({ 
      category: newCategories.length > 0 ? newCategories.join(",") : null 
    })}`, { scroll: false });
  };

  const handlePriceChange = (val: number[]) => {
    setPriceRange(val as [number, number]);
  };
  
  const handlePriceCommit = (val: number[]) => {
    router.push(`?${createQueryString({ 
      minPrice: val[0] > 0 ? val[0].toString() : null,
      maxPrice: val[1] < 150 ? val[1].toString() : null
    })}`, { scroll: false });
  };

  const handleInStockChange = (val: boolean) => {
    setInStockOnly(val);
    router.push(`?${createQueryString({ 
      inStock: val ? "true" : null 
    })}`, { scroll: false });
  };

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h4 className="font-serif text-lg text-warm-gray-900 mb-4">Category</h4>
        <div className="space-y-3">
          {categories.map((category) => (
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
                {category.productCount !== undefined && (
                  <span className="text-xs text-warm-gray-400">({category.productCount})</span>
                )}
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
            onValueChange={handlePriceChange}
            onValueCommit={handlePriceCommit}
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
            onCheckedChange={(val) => handleInStockChange(val as boolean)}
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
}
