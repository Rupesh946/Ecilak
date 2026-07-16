"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { useCartDrawerStore } from "@/store/ui";
import { formatPrice, cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } =
    useCartStore();
  const { isOpen, close } = useCartDrawerStore();
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const total = subtotal();
  const count = itemCount();

  const handleNavigate = (path: string) => {
    setIsNavigating(true);
    router.push(path);
    // Add a small delay before closing to allow page transition to start smoothly
    setTimeout(() => {
      close();
      setIsNavigating(false);
    }, 400);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && close()}>
      <SheetContent
        side="right"
        className="w-full sm:w-[420px] bg-cream-50 border-l-cream-300 p-0 flex flex-col"
      >
        <SheetHeader className="px-6 py-5 border-b border-cream-300">
          <SheetTitle className="font-serif text-xl flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-terracotta-400" />
            Your Bag
            {count > 0 && (
              <span className="text-sm font-sans text-warm-gray-400 font-normal">
                ({count} {count === 1 ? "item" : "items"})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <ShoppingBag className="w-12 h-12 text-warm-gray-300 mb-4" />
            <p className="font-serif text-xl text-warm-gray-600 mb-2">
              Your bag is empty
            </p>
            <p className="text-sm text-warm-gray-400 mb-6">
              Discover something beautiful to add.
            </p>
            <Link
              href="/shop"
              onClick={close}
              className={cn(
                buttonVariants({ variant: "default" }),
                "bg-warm-gray-900 text-cream-50 hover:bg-terracotta-400 font-sans px-8 rounded-full"
              )}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Line Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 animate-fade-in"
                >
                  {/* Product Image */}
                  <div className="w-20 h-24 rounded-xl bg-gradient-to-br from-terracotta-50 to-cream-200 shrink-0 relative overflow-hidden flex items-center justify-center">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="font-serif text-2xl text-terracotta-200">
                        {item.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={close}
                          className="font-serif text-sm text-warm-gray-900 hover:text-terracotta-400 transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-warm-gray-400 mt-0.5 font-sans">
                          Size: {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="p-1 text-warm-gray-400 hover:text-warm-gray-700 transition-colors shrink-0"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-cream-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity - 1)
                          }
                          className="p-1.5 text-warm-gray-500 hover:bg-cream-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-sm font-sans text-warm-gray-900 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity + 1)
                          }
                          className="p-1.5 text-warm-gray-500 hover:bg-cream-200 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-sans font-medium text-warm-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t border-cream-300 px-6 py-5 space-y-4 bg-cream-100">
              <div className="flex justify-between text-sm font-sans">
                <span className="text-warm-gray-500">Subtotal</span>
                <span className="font-medium text-warm-gray-900">
                  {formatPrice(total)}
                </span>
              </div>
              <p className="text-xs text-warm-gray-400 font-sans">
                Shipping and taxes calculated at checkout.
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => handleNavigate("/checkout")}
                  disabled={isNavigating}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "w-full bg-warm-gray-900 text-cream-50 hover:bg-terracotta-500 transition-colors duration-200 font-sans flex items-center justify-center gap-2",
                    isNavigating && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isNavigating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Checkout
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleNavigate("/cart")}
                  disabled={isNavigating}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full border-warm-gray-300 text-warm-gray-700 hover:bg-cream-200 font-sans flex items-center justify-center",
                    isNavigating && "opacity-70 cursor-not-allowed"
                  )}
                >
                  View Full Cart
                </button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
