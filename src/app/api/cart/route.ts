import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const addToCartSchema = z.object({
  variantId: z.string().uuid("Invalid variant ID"),
  quantity: z.number().int().positive("Quantity must be at least 1"),
});

// Helper to get or create a cart
async function getOrCreateCart(userId?: string, guestToken?: string) {
  if (userId) {
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { variant: { include: { product: true } } } } },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: { items: { include: { variant: { include: { product: true } } } } },
      });
    }
    return cart;
  } else if (guestToken) {
    let cart = await prisma.cart.findUnique({
      where: { guestToken },
      include: { items: { include: { variant: { include: { product: true } } } } },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { guestToken },
        include: { items: { include: { variant: { include: { product: true } } } } },
      });
    }
    return cart;
  }
  return null;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const cookieStore = cookies();
    const guestToken = cookieStore.get("guest_cart_id")?.value;

    if (!session && !guestToken) {
      // Empty cart state, no token yet
      return NextResponse.json({ items: [] });
    }

    const cart = await getOrCreateCart(session?.user?.id, guestToken);

    if (!cart) {
      return NextResponse.json({ items: [] });
    }

    // Map database items format to frontend structure
    const itemsFormatted = cart.items.map((item) => ({
      id: item.variant.productId,
      variantId: item.variantId,
      itemId: item.id,
      slug: item.variant.product.slug,
      name: item.variant.product.name,
      price: item.variant.priceOverride || item.variant.product.price,
      image: item.variant.product.images[0],
      size: item.variant.name,
      quantity: item.quantity,
    }));

    return NextResponse.json({ cartId: cart.id, items: itemsFormatted });
  } catch (error) {
    console.error("Cart GET error:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const cookieStore = cookies();
    let guestToken = cookieStore.get("guest_cart_id")?.value;

    // Generate guest token if no session and no guest token exists
    let responseCookie: string | null = null;
    if (!session && !guestToken) {
      guestToken = crypto.randomUUID();
      responseCookie = guestToken;
    }

    const body = await req.json();
    const result = addToCartSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { variantId, quantity } = result.data;

    // Verify stock
    const variant = await prisma.productVariant.findUnique({
      where: { id: variantId },
    });

    if (!variant) {
      return NextResponse.json({ error: "Product variant not found" }, { status: 404 });
    }

    if (variant.stockQuantity < quantity) {
      return NextResponse.json({ error: "Insufficient stock available" }, { status: 400 });
    }

    const cart = await getOrCreateCart(session?.user?.id, guestToken);

    if (!cart) {
      return NextResponse.json({ error: "Failed to allocate cart" }, { status: 500 });
    }

    // Add or update item
    const existingItem = cart.items.find((i) => i.variantId === variantId);

    let cartItem;
    if (existingItem) {
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          variantId,
          quantity,
        },
      });
    }

    const response = NextResponse.json({ message: "Item added to cart", cartItem }, { status: 200 });

    if (responseCookie) {
      response.cookies.set("guest_cart_id", responseCookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return response;
  } catch (error) {
    console.error("Cart POST error:", error);
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}
