"use client";

import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { StarRating } from "./StarRating";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useCartDrawerStore } from "@/store/ui";
import type { Product } from "@/data/products";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartDrawerStore((s) => s.open);
  const toggle = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Support both DB (.variants) and mock (.sizes) data structures
    const isDbProduct = "variants" in product;
    const variants = isDbProduct ? ((product as Product & { variants: { id: string; name: string }[] }).variants) : [];
    const variantId = isDbProduct && variants.length > 0 ? variants[0].id : undefined;
    const sizeLabel = product.sizes?.[0]?.value || (isDbProduct && variants[0]?.name) || "default";

    addItem({
      id: product.id,
      variantId: variantId,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: sizeLabel,
    });
    toast.success(`${product.name} added to cart`);
    openCart();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
    toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <div className={cn("product-card group relative", className)}>
      <Link
        href={`/product/${product.slug}`}
        className="block"
        aria-label={`View ${product.name} — ${formatPrice(product.price)}`}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-cream-200 mb-4">
          {/* Primary Image */}
          <div
            className="product-card-image product-card-image-primary absolute inset-0 bg-gradient-to-br from-terracotta-100 via-cream-200 to-terracotta-50"
            role="img"
            aria-label={`${product.name} product image`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-6xl text-terracotta-200/60 select-none">
                {product.name.charAt(0)}
              </span>
            </div>
          </div>

          {/* Secondary Image (shown on hover) */}
          <div
            className="product-card-image product-card-image-secondary absolute inset-0 opacity-0 bg-gradient-to-br from-cream-300 via-terracotta-50 to-cream-200"
            role="img"
            aria-label={`${product.name} alternate view`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-5xl text-terracotta-300/50 italic select-none">
                {product.name.split(" ").map(w => w[0]).join("")}
              </span>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isNew && (
              <Badge className="bg-warm-gray-900 text-cream-50 text-[10px] tracking-widest uppercase font-sans px-2 py-0.5 rounded-full">
                New
              </Badge>
            )}
            {product.isBestseller && (
              <Badge className="bg-terracotta-400 text-white text-[10px] tracking-widest uppercase font-sans px-2 py-0.5 rounded-full">
                Bestseller
              </Badge>
            )}
            {product.compareAtPrice && (
              <Badge className="bg-white text-warm-gray-700 text-[10px] tracking-widest uppercase font-sans px-2 py-0.5 rounded-full">
                Sale
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={cn(
              "absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300",
              "bg-white/80 backdrop-blur-sm hover:bg-white",
              "opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0",
              isWishlisted && "opacity-100 translate-y-0"
            )}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-colors",
                isWishlisted
                  ? "fill-terracotta-400 text-terracotta-400"
                  : "text-warm-gray-600"
              )}
            />
          </button>

          {/* Quick Add Tray — slides up from bottom on hover */}
          <div className="quick-add-tray absolute bottom-0 left-0 right-0 z-10 p-3">
            <button
              onClick={handleQuickAdd}
              disabled={!product.inStock}
              className={cn(
                "w-full py-2.5 rounded-xl text-sm font-sans font-medium tracking-wide flex items-center justify-center gap-2 transition-colors",
                product.inStock
                  ? "bg-warm-gray-900 text-cream-50 hover:bg-terracotta-400"
                  : "bg-warm-gray-300 text-warm-gray-500 cursor-not-allowed"
              )}
            >
              <ShoppingBag className="w-4 h-4" />
              {product.inStock ? "Quick Add" : "Sold Out"}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-1.5 px-1">
          <p className="text-xs text-warm-gray-400 uppercase tracking-widest font-sans">
            {product.category}
          </p>
          <h3 className="font-serif text-lg text-warm-gray-900 leading-snug group-hover:text-terracotta-400 transition-colors duration-300">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-base font-sans font-medium text-warm-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-warm-gray-400 line-through font-sans">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          <StarRating
            rating={product.rating}
            reviewCount={product.reviewCount}
            size="sm"
          />
        </div>
      </Link>
    </div>
  );
}
