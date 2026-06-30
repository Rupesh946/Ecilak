"use client";

import { useWishlistStore } from "@/store/wishlist";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { items } = useWishlistStore();
  const wishlistedProducts = products.filter((p) => items.includes(p.id));

  return (
    <div>
      <h2 className="font-serif text-2xl text-warm-gray-900 mb-6">
        Wishlist
      </h2>

      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-12 h-12 text-warm-gray-300 mx-auto mb-4" />
          <p className="font-serif text-xl text-warm-gray-500 mb-2">
            Your wishlist is empty
          </p>
          <p className="text-sm text-warm-gray-400 font-sans">
            Save items you love by clicking the heart icon on any product.
          </p>
        </div>
      ) : (
        <ProductGrid products={wishlistedProducts} columns={3} />
      )}
    </div>
  );
}
