import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  items: string[]; // product IDs
  toggle: (productId: string) => Promise<void>;
  isWishlisted: (productId: string) => boolean;
  clear: () => void;
  syncWishlist: () => Promise<void>;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      syncWishlist: async () => {
        try {
          const res = await fetch("/api/wishlist");
          if (res.ok) {
            const data = await res.json();
            if (data.items) {
              set({ items: data.items });
            }
          }
        } catch (err) {
          console.error("Wishlist sync error:", err);
        }
      },

      toggle: async (productId) => {
        const isCurrentlyWishlisted = get().items.includes(productId);

        // Optimistic local state update
        set((state) => {
          if (isCurrentlyWishlisted) {
            return { items: state.items.filter((id) => id !== productId) };
          }
          return { items: [...state.items, productId] };
        });

        // Backend sync if authenticated (endpoints return 401 otherwise, which handles gracefully)
        try {
          if (isCurrentlyWishlisted) {
            await fetch(`/api/wishlist/${productId}`, {
              method: "DELETE",
            });
          } else {
            await fetch("/api/wishlist", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ productId }),
            });
          }
        } catch (err) {
          console.error("Wishlist backend sync error:", err);
        }
      },

      isWishlisted: (productId) => {
        return get().items.includes(productId);
      },

      clear: () => set({ items: [] }),
    }),
    {
      name: "ecilak-wishlist",
    }
  )
);
