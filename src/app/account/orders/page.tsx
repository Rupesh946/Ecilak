import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const orders = [
  {
    id: "ECL-1042",
    date: "June 15, 2026",
    status: "Delivered",
    total: 136,
    items: ["Radiance Renewal Serum", "Velvet Matte Lipstick"],
  },
  {
    id: "ECL-0987",
    date: "May 28, 2026",
    status: "Processing",
    total: 68,
    items: ["Ceramide Barrier Cream"],
  },
  {
    id: "ECL-0923",
    date: "April 10, 2026",
    status: "Delivered",
    total: 94,
    items: ["Midnight Rose Bath Soak", "Shea & Honey Body Butter"],
  },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-green-50 text-green-700",
  Processing: "bg-amber-50 text-amber-700",
  Shipped: "bg-blue-50 text-blue-700",
  Cancelled: "bg-red-50 text-red-700",
};

export default function OrdersPage() {
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
                    {order.id}
                  </span>
                  <Badge
                    className={`${statusColors[order.status]} text-xs font-sans border-0`}
                  >
                    {order.status}
                  </Badge>
                </div>
                <span className="text-sm text-warm-gray-400 font-sans">
                  {order.date}
                </span>
              </div>

              <p className="text-sm text-warm-gray-600 font-sans mb-2">
                {order.items.join(", ")}
              </p>

              <Separator className="bg-cream-300 my-3" />

              <div className="flex justify-between text-sm font-sans">
                <span className="text-warm-gray-500">Total</span>
                <span className="font-medium text-warm-gray-900">
                  ${order.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
