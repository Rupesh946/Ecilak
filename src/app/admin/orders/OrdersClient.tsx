/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

interface OrderRow {
  id: string;
  customerName: string;
  email: string;
  status: "PENDING" | "PAID" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";
  total: number;
  itemsSummary: string;
  date: string;
}

interface OrdersClientProps {
  initialOrders: OrderRow[];
}

const statusOptions = [
  { value: "PENDING", label: "Pending" },
  { value: "PAID", label: "Paid" },
  { value: "PROCESSING", label: "Processing" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "REFUNDED", label: "Refunded" },
];

const statusStyles: Record<string, string> = {
  PENDING: "bg-gray-100 text-gray-700",
  PAID: "bg-green-50 text-green-700",
  PROCESSING: "bg-amber-50 text-amber-700",
  SHIPPED: "bg-blue-50 text-blue-700",
  DELIVERED: "bg-emerald-50 text-emerald-700",
  CANCELLED: "bg-red-50 text-red-700",
  REFUNDED: "bg-purple-50 text-purple-700",
};

export function OrdersClient({ initialOrders }: OrdersClientProps) {
  const [orders, setOrders] = useState<OrderRow[]>(initialOrders);
  const [search, setSearch] = useState("");

  const filtered = orders.filter((o) =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.email.toLowerCase().includes(search.toLowerCase()) ||
    o.itemsSummary.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to update order status");
      } else {
        toast.success(`Order status updated to ${newStatus}`);
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus as OrderRow["status"] } : o))
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error updating status");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl text-warm-gray-900 mb-1">Orders</h1>
        <p className="text-sm text-warm-gray-500 font-sans">
          Manage customer purchases, shipment tracking, and payment refunds.
        </p>
      </div>

      {/* Search toolbar */}
      <div className="relative max-w-md">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by order ID, email, or items..."
          className="pl-10 bg-white border-cream-300 font-sans"
        />
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
      </div>

      {/* Grid / Table list */}
      <div className="overflow-x-auto bg-white rounded-2xl border border-cream-300">
        <table className="w-full text-left text-sm font-sans">
          <thead>
            <tr className="border-b border-cream-200 text-warm-gray-400 font-medium">
              <th className="p-4">Order ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Customer Info</th>
              <th className="p-4">Items Summary</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-100 text-warm-gray-700">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-warm-gray-400">
                  No orders found.
                </td>
              </tr>
            ) : (
              filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-cream-50/50">
                  <td className="p-4 font-mono text-xs font-bold text-warm-gray-900">
                    #{ord.id.substring(0, 8).toUpperCase()}
                  </td>
                  <td className="p-4 text-warm-gray-400 text-xs">
                    {new Date(ord.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-4">
                    <span className="block font-medium text-warm-gray-900">
                      {ord.customerName}
                    </span>
                    <span className="block text-xs text-warm-gray-400 font-mono">
                      {ord.email}
                    </span>
                  </td>
                  <td className="p-4 text-warm-gray-500 max-w-xs truncate">
                    {ord.itemsSummary}
                  </td>
                  <td className="p-4 font-medium text-warm-gray-900">
                    {formatPrice(ord.total)}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[ord.status]}`}>
                      {ord.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Select
                      value={ord.status}
                      onValueChange={(val) => handleStatusChange(ord.id, val || "")}
                    >
                      <SelectTrigger className="w-[130px] bg-cream-50 border-cream-300 font-sans text-xs h-8">
                        <SelectValue placeholder="Update Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-cream-50 font-sans text-xs">
                        {statusOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
