import { Package, DollarSign, AlertTriangle, ShieldCheck } from "lucide-react";
import prisma from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Aggregate Stats
  const totalOrders = await prisma.order.count();

  const paidOrders = await prisma.order.findMany({
    where: {
      status: {
        in: ["PAID", "PROCESSING", "SHIPPED", "DELIVERED"],
      },
    },
    select: { total: true },
  });

  const revenue = paidOrders.reduce((sum, ord) => sum + ord.total, 0);

  // Find products with low stock
  const lowStockProducts = await prisma.product.findMany({
    where: {
      stockQuantity: { lt: 10 },
      isActive: true,
    },
    select: { name: true, stockQuantity: true, sku: true },
    take: 5,
  });

  // Find variants with low stock
  const lowStockVariants = await prisma.productVariant.findMany({
    where: {
      stockQuantity: { lt: 10 },
    },
    include: { product: { select: { name: true } } },
    take: 5,
  });

  const totalLowStock = lowStockProducts.length + lowStockVariants.length;

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="font-serif text-3xl text-warm-gray-900 mb-2">Overview</h1>
        <p className="text-sm text-warm-gray-500 font-sans">
          Store performance metrics and alerts.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-3 gap-6">
        {/* Revenue */}
        <div className="bg-white border border-cream-300 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-warm-gray-400 font-sans uppercase tracking-wider mb-1">
              Total Revenue
            </p>
            <h3 className="font-sans text-2xl font-bold text-warm-gray-900">
              {formatPrice(revenue)}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white border border-cream-300 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-warm-gray-400 font-sans uppercase tracking-wider mb-1">
              Total Orders
            </p>
            <h3 className="font-sans text-2xl font-bold text-warm-gray-900">
              {totalOrders}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-terracotta-50 text-terracotta-400 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white border border-cream-300 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-warm-gray-400 font-sans uppercase tracking-wider mb-1">
              Low Stock Items
            </p>
            <h3 className="font-sans text-2xl font-bold text-warm-gray-900">
              {totalLowStock}
            </h3>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${totalLowStock > 0 ? "bg-amber-50 text-amber-600 animate-pulse" : "bg-green-50 text-green-600"}`}>
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Low Stock Table */}
      <div className="bg-white border border-cream-300 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl text-warm-gray-900">Low Stock Alerts</h2>
          <span className="text-xs font-sans text-warm-gray-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
            Stock checked live
          </span>
        </div>

        {totalLowStock === 0 ? (
          <p className="text-sm text-warm-gray-400 font-sans py-4">
            All products and variants are well stocked!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-sans">
              <thead>
                <tr className="border-b border-cream-200 text-warm-gray-400 font-medium">
                  <th className="pb-3">Item Name</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3 text-right">Remaining Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100 text-warm-gray-700">
                {lowStockProducts.map((p) => (
                  <tr key={p.sku} className="hover:bg-cream-50/50">
                    <td className="py-3 font-medium">{p.name}</td>
                    <td className="py-3 text-warm-gray-400">Product</td>
                    <td className="py-3 text-right text-red-500 font-bold">{p.stockQuantity}</td>
                  </tr>
                ))}
                {lowStockVariants.map((v) => (
                  <tr key={v.id} className="hover:bg-cream-50/50">
                    <td className="py-3 font-medium">{v.product.name} ({v.name})</td>
                    <td className="py-3 text-warm-gray-400">Variant</td>
                    <td className="py-3 text-right text-red-500 font-bold">{v.stockQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
