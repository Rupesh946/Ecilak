import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const updateOrderStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "PAID",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
    "REFUNDED",
  ]),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Authorization checks
    const isAdmin = session?.user?.role === "ADMIN";
    const isOwner = session && order.userId === session.user.id;
    // For guest checkouts, we can support session matching via matching token or email query params
    const { searchParams } = new URL(req.url);
    const guestEmail = searchParams.get("email");
    const isGuestOwner = !order.userId && guestEmail && order.guestEmail === guestEmail.toLowerCase();

    if (!isAdmin && !isOwner && !isGuestOwner) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Order details GET error:", error);
    return NextResponse.json({ error: "Failed to fetch order details" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    const result = updateOrderStatusSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status: result.data.status },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Order status update PATCH error:", error);
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
  }
}
