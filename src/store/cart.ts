import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string; // product ID
  variantId?: string; // variant ID
  itemId?: string; // cart item ID
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => Promise<void>;
  removeItem: (id: string, size: string) => Promise<void>;
  updateQuantity: (id: string, size: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  syncCart: () => Promise<void>;
  itemCount: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      syncCart: async () => {
        try {
          const res = await fetch("/api/cart");
          if (res.ok) {
            const data = await res.json();
            if (data.items) {
              set({ items: data.items });
            }
          }
        } catch (err) {
          console.error("Cart sync error:", err);
        }
      },

      addItem: async (item, quantity = 1) => {
        // Optimistic local state update
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === item.id && i.size === item.size
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.size === item.size
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity }] };
        });

        // Backend sync if variantId is available
        if (item.variantId) {
          try {
            await fetch("/api/cart", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ variantId: item.variantId, quantity }),
            });
            // Fetch updated database states with IDs
            await get().syncCart();
          } catch (err) {
            console.error("Failed to sync addItem to database:", err);
          }
        }
      },

      removeItem: async (id, size) => {
        const itemToDelete = get().items.find((i) => i.id === id && i.size === size);

        // Optimistic local update
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.id === id && i.size === size)
          ),
        }));

        // Backend sync if itemId is available
        if (itemToDelete?.itemId) {
          try {
            await fetch(`/api/cart/${itemToDelete.itemId}`, {
              method: "DELETE",
            });
          } catch (err) {
            console.error("Failed to sync removeItem to database:", err);
          }
        }
      },

      updateQuantity: async (id, size, quantity) => {
        if (quantity <= 0) {
          await get().removeItem(id, size);
          return;
        }

        const itemToUpdate = get().items.find((i) => i.id === id && i.size === size);

        // Optimistic local update
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.size === size ? { ...i, quantity } : i
          ),
        }));

        // Backend sync if itemId is available
        if (itemToUpdate?.itemId) {
          try {
            await fetch(`/api/cart/${itemToUpdate.itemId}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ quantity }),
            });
          } catch (err) {
            console.error("Failed to sync updateQuantity to database:", err);
          }
        }
      },

      clearCart: () => set({ items: [] }),

      itemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      subtotal: () => {
        return get().items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "ecilak-cart",
    }
  )
);
