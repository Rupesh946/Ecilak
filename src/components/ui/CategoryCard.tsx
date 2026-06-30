import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Category } from "@/data/categories";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link
      href={`/shop/${category.slug}`}
      className={cn(
        "group relative block aspect-[4/5] rounded-2xl overflow-hidden",
        className
      )}
      aria-label={`Shop ${category.name}`}
    >
      {/* Background gradient placeholder */}
      <div
        className={cn(
          "absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105",
          category.slug === "skincare" && "bg-gradient-to-br from-terracotta-50 via-cream-200 to-terracotta-100",
          category.slug === "makeup" && "bg-gradient-to-br from-terracotta-100 via-terracotta-50 to-cream-300",
          category.slug === "bath-body" && "bg-gradient-to-br from-cream-300 via-terracotta-50 to-cream-200",
          category.slug === "gifts" && "bg-gradient-to-br from-terracotta-50 via-cream-100 to-terracotta-100"
        )}
        role="img"
        aria-label={`${category.name} category`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-8xl text-white/30 select-none">
            {category.name.charAt(0)}
          </span>
        </div>
      </div>

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-warm-gray-900/60 via-transparent to-transparent" />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-serif text-2xl text-white mb-1 group-hover:translate-y-[-4px] transition-transform duration-300">
          {category.name}
        </h3>
        <p className="text-sm text-cream-200/80 font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
