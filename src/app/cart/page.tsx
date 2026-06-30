"use client";

import Link from "next/link";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount, clearCart } =
    useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const total = subtotal();
  const count = itemCount();
  const shippingEstimate = total >= 50 ? 0 : 5.99;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim()) {
      toast.error("Invalid promo code. Please try again.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-wide max-w-2xl text-center py-20">
          <ShoppingBag className="w-16 h-16 text-warm-gray-300 mx-auto mb-6" />
          <h1 className="font-serif text-3xl text-warm-gray-900 mb-3">
            Your bag is empty
          </h1>
          <p className="text-warm-gray-500 font-sans mb-8 max-w-sm mx-auto">
            Looks like you haven&apos;t added anything yet. Explore our collection to find something you&apos;ll love.
          </p>
          <Link
            href="/shop"
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-warm-gray-900 text-cream-50 hover:bg-terracotta-400 font-sans px-8 rounded-full inline-flex items-center justify-center"
            )}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-wide">
        <h1 className="font-serif text-3xl md:text-4xl text-warm-gray-900 mb-2">
          Shopping Bag
        </h1>
        <p className="text-warm-gray-400 font-sans text-sm mb-10">
          {count} {count === 1 ? "item" : "items"} in your bag
        </p>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Line Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-5 bg-cream-50 rounded-2xl p-5"
              >
                {/* Image Placeholder */}
                <div className="w-24 h-28 md:w-32 md:h-36 rounded-xl bg-gradient-to-br from-terracotta-50 to-cream-200 shrink-0 flex items-center justify-center">
                  <span className="font-serif text-3xl text-terracotta-200">
                    {item.name.charAt(0)}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        className="font-serif text-lg text-warm-gray-900 hover:text-terracotta-400 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-warm-gray-400 font-sans mt-1">
                        Size: {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="p-1.5 text-warm-gray-400 hover:text-warm-gray-700 transition-colors rounded-lg hover:bg-cream-200"
                      aria-label={`Remove ${item.name}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-cream-300 rounded-xl overflow-hidden bg-white">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity - 1)
                        }
                        className="p-2 text-warm-gray-500 hover:bg-cream-200 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 text-sm font-sans text-warm-gray-900 min-w-[2.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity + 1)
                        }
                        className="p-2 text-warm-gray-500 hover:bg-cream-200 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-lg font-sans font-medium text-warm-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4">
              <Link
                href="/shop"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "border-warm-gray-300 text-warm-gray-600 font-sans text-sm rounded-full inline-flex items-center justify-center"
                )}
              >
                Continue Shopping
              </Link>
              <Button
                variant="ghost"
                onClick={() => {
                  clearCart();
                  toast("Cart cleared");
                }}
                className="text-warm-gray-400 hover:text-warm-gray-700 font-sans text-sm"
              >
                Clear Bag
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-cream-50 rounded-2xl p-6 md:p-8 sticky top-28">
              <h2 className="font-serif text-xl text-warm-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm font-sans">
                <div className="flex justify-between text-warm-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-warm-gray-600">
                  <span>Shipping</span>
                  <span>
                    {shippingEstimate === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(shippingEstimate)
                    )}
                  </span>
                </div>
                {shippingEstimate > 0 && (
                  <p className="text-xs text-warm-gray-400">
                    Free shipping on orders over $50
                  </p>
                )}
              </div>

              <Separator className="bg-cream-300 my-5" />

              {/* Promo Code */}
              <form onSubmit={handleApplyPromo} className="mb-5">
                <label className="text-sm font-sans text-warm-gray-600 mb-2 block">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="bg-white border-cream-300 text-sm font-sans"
                    aria-label="Promo code"
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    className="border-warm-gray-300 text-warm-gray-600 shrink-0"
                  >
                    <Tag className="w-4 h-4" />
                  </Button>
                </div>
              </form>

              <Separator className="bg-cream-300 my-5" />

              <div className="flex justify-between text-lg font-sans font-medium text-warm-gray-900 mb-6">
                <span>Total</span>
                <span>{formatPrice(total + shippingEstimate)}</span>
              </div>

              <Link
                href="/checkout"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full bg-warm-gray-900 text-cream-50 hover:bg-terracotta-400 font-sans text-sm tracking-wide py-6 rounded-xl gap-2 flex items-center justify-center"
                )}
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
