"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
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

interface ShopToolbarProps {
  totalCount: number;
  activeFilterCount: number;
  children: React.ReactNode; // For mobile filters
}

export function ShopToolbar({ totalCount, activeFilterCount, children }: ShopToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const currentSort = searchParams.get("sort") || "popular";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      // Reset page to 1 when sorting changes
      params.delete("page");
      return params.toString();
    },
    [searchParams]
  );

  const handleSortChange = (value: string | null) => {
    if (!value) return;
    router.push(`?${createQueryString("sort", value)}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-between gap-4 bg-cream-50 p-4 rounded-xl border border-cream-300">
      <span className="text-xs text-warm-gray-500 font-sans">
        Showing {totalCount} products
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
            {children}
          </SheetContent>
        </Sheet>

        {/* Sort By Select */}
        <Select
          value={currentSort}
          onValueChange={handleSortChange}
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
  );
}
