import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700",
  PAID: "bg-green-50 text-green-700",
  PROCESSING: "bg-amber-50 text-amber-700",
  SHIPPED: "bg-blue-50 text-blue-700",
  DELIVERED: "bg-green-50 text-green-700",
  CANCELLED: "bg-red-50 text-red-700",
  REFUNDED: "bg-red-50 text-red-700",
};

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  
  const orders = session?.user?.email ? await prisma.order.findMany({
    where: { 
      OR: [
        { userId: session.user.id },
        { guestEmail: session.user.email }
      ]
    },
    include: { items: true },
    orderBy: { createdAt: 'desc' }
  }) : [];

  return (
    <div>
      <h2 className="font-serif text-2xl text-warm-gray-900 mb-6">
        Order History
      </h2>

      {orders.length === 0 ? (
        <p className="text-warm-gray-500 font-sans text-center py-12">
          You haven&apos;t placed any orders yet.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-cream-50 rounded-2xl p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-sans font-medium text-warm-gray-900 text-sm">
                    {order.id.slice(0, 8).toUpperCase()}
                  </span>
                  <Badge
                    className={`${statusColors[order.status] || "bg-gray-50 text-gray-700"} text-xs font-sans border-0`}
                  >
                    {order.status}
                  </Badge>
                </div>
                <span className="text-sm text-warm-gray-400 font-sans">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-sm text-warm-gray-600 font-sans mb-2">
                {order.items.map(i => `${i.name} (x${i.quantity})`).join(", ")}
              </p>

              <Separator className="bg-cream-300 my-3" />

              <div className="flex justify-between text-sm font-sans">
                <span className="text-warm-gray-500">Total</span>
                <span className="font-medium text-warm-gray-900">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
