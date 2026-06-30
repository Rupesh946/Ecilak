import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const updateCartItemSchema = z.object({
  quantity: z.number().int().positive("Quantity must be at least 1"),
});

export async function PATCH(
  req: Request,
  { params }: { params: { itemId: string } }
) {
  try {
    const { itemId } = params;
    const body = await req.json();
    const result = updateCartItemSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { quantity } = result.data;

    // Verify item exists and check stock
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { variant: true },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
    }

    if (cartItem.variant.stockQuantity < quantity) {
      return NextResponse.json({ error: "Insufficient stock available" }, { status: 400 });
    }

    const updated = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    return NextResponse.json({ message: "Cart updated", cartItem: updated });
  } catch (error) {
    console.error("CartItem PATCH error:", error);
    return NextResponse.json({ error: "Failed to update item quantity" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { itemId: string } }
) {
  try {
    const { itemId } = params;

    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    return NextResponse.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("CartItem DELETE error:", error);
    return NextResponse.json({ error: "Failed to remove item" }, { status: 500 });
  }
}
