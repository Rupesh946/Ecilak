import prisma from "@/lib/prisma";
import { OrdersClient } from "./OrdersClient";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  const ordersFormatted = orders.map((o) => ({
    id: o.id,
    customerName: o.userId ? "Registered Member" : "Guest Checkout",
    email: o.guestEmail || "Member Account",
    status: o.status,
    total: o.total,
    itemsSummary: o.items.map((i) => `${i.name} x${i.quantity}`).join(", "),
    date: o.createdAt.toISOString(),
  }));

  return <OrdersClient initialOrders={ordersFormatted} />;
}
