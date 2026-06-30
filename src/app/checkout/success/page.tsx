/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { formatPrice, cn } from "@/lib/utils";

interface OrderDetail {
  id: string;
  status: string;
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const email = searchParams.get("email");

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) {
      setError("No order ID provided.");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const url = `/api/orders/${orderId}` + (email ? `?email=${encodeURIComponent(email)}` : "");
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to load order information.");
        }
        const data = await res.json();
        setOrder(data);
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : "Something went wrong.";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, email]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex flex-col items-center justify-center min-h-[60vh] font-sans">
        <Loader2 className="w-10 h-10 text-terracotta-400 animate-spin mb-4" />
        <p className="text-warm-gray-500">Loading order confirmation...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="pt-32 pb-20 text-center font-sans max-w-md mx-auto">
        <p className="text-red-500 mb-6 font-medium">{error || "Order not found."}</p>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "default" }), "bg-warm-gray-900 text-cream-50 rounded-full")}
        >
          Back to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 min-h-[90vh]">
      <div className="container-wide max-w-2xl bg-cream-50 border border-cream-300 rounded-2xl p-8 md:p-10 shadow-sm">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-4 border border-green-100">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-warm-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-sm text-warm-gray-500 font-sans">
            Thank you for shopping with Ecilak. We have sent a confirmation email.
          </p>
        </div>

        {/* Order Details box */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between text-sm font-sans text-warm-gray-600 border-b border-cream-200 pb-4 gap-2">
            <div>
              <span className="block text-xs uppercase tracking-wider text-warm-gray-400">Order Number</span>
              <span className="font-mono font-bold text-warm-gray-900">#{order.id.toUpperCase()}</span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-warm-gray-400">Date</span>
              <span className="text-warm-gray-900">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-warm-gray-400">Status</span>
              <span className="inline-flex px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-[11px] font-medium uppercase font-bold">
                {order.status}
              </span>
            </div>
          </div>

          {/* Purchased Items List */}
          <div>
            <h3 className="font-serif text-lg text-warm-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-4 h-4 text-terracotta-400" />
              Purchased Items
            </h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm font-sans text-warm-gray-600">
                  <span>{item.name} <span className="text-xs text-warm-gray-400">&times; {item.quantity}</span></span>
                  <span className="font-medium text-warm-gray-900">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-cream-200" />

          {/* Totals Summary */}
          <div className="space-y-2 text-sm font-sans">
            <div className="flex justify-between text-warm-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-warm-gray-600">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-warm-gray-900 pt-2 border-t border-cream-200">
              <span>Total Paid</span>
              <span className="text-terracotta-400">{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-cream-200 flex flex-col sm:flex-row gap-4 justify-between">
            <Link
              href="/shop"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-warm-gray-300 text-warm-gray-600 font-sans rounded-full px-6 flex-1 text-center justify-center"
              )}
            >
              Continue Shopping
            </Link>
            <Link
              href="/account"
              className={cn(
                buttonVariants({ variant: "default" }),
                "bg-warm-gray-900 hover:bg-terracotta-400 text-cream-50 font-sans rounded-full px-6 flex-1 text-center gap-2 justify-center"
              )}
            >
              View Order History
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
