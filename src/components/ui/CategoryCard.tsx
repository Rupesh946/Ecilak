import Link from "next/link";
import Image from "next/image";
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
      {/* Background image */}
      <Image
        src={category.image}
        alt={`${category.name} category`}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 image-fade-in"
      />

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-warm-gray-900/70 via-warm-gray-900/20 to-transparent transition-all duration-500 group-hover:from-warm-gray-900/80" />

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
