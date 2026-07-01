import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import Razorpay from "razorpay";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(5, "Address must be detailed"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "ZIP code is required"),
  phone: z.string().min(10, "Phone number is required"),
  cartId: z.string().uuid("Invalid cart ID"),
  couponCode: z.string().optional().nullable(),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Orders GET error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "",
    });
    
    const session = await getServerSession(authOptions);
    const jsonBody = await req.json();
    const result = checkoutSchema.safeParse(jsonBody);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const {
      email,
      firstName,
      lastName,
      address,
      city,
      state,
      zip,
      phone,
      cartId,
      couponCode,
    } = result.data;

    // Load Cart
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { variant: { include: { product: true } } } } },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "Shopping cart is empty" }, { status: 400 });
    }

    // SERVER-SIDE TOTALS RECALCULATION & STOCK CHECKS
    let subtotal = 0;
    const orderItemsData = [];

    for (const item of cart.items) {
      const dbVariant = await prisma.productVariant.findUnique({
        where: { id: item.variantId },
        include: { product: true },
      });

      if (!dbVariant) {
        return NextResponse.json({ error: `Product variant not found: ${item.variantId}` }, { status: 404 });
      }

      if (dbVariant.stockQuantity < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${dbVariant.product.name} (${dbVariant.name})` },
          { status: 400 }
        );
      }

      const itemPrice = dbVariant.priceOverride || dbVariant.product.price;
      subtotal += itemPrice * item.quantity;

      orderItemsData.push({
        variantId: dbVariant.id,
        name: `${dbVariant.product.name} - ${dbVariant.name}`,
        price: itemPrice,
        quantity: item.quantity,
      });
    }

    // Calculate coupon discount
    let discount = 0;
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.toUpperCase() },
      });

      if (coupon) {
        const now = new Date();
        const isValidExpiry = !coupon.expiry || coupon.expiry > now;
        const isValidLimit = !coupon.usageLimit || coupon.usageCount < coupon.usageLimit;

        if (isValidExpiry && isValidLimit) {
          if (coupon.discountType === "PERCENTAGE") {
            discount = subtotal * (coupon.discountValue / 100);
          } else {
            discount = coupon.discountValue;
          }
        }
      }
    }

    const shipping = subtotal >= 50 ? 0 : 5.99;
    const total = Math.max(0, subtotal - discount + shipping);
    const amountInPaise = Math.round(total * 100);

    if (amountInPaise < 100) {
      return NextResponse.json({ error: "Minimum order amount is 100 paise" }, { status: 400 });
    }

    const shippingAddressSnapshot = {
      firstName,
      lastName,
      address,
      city,
      state,
      zip,
      phone,
    };

    // Save Order as PENDING in Database
    const order = await prisma.order.create({
      data: {
        userId: session?.user?.id || null,
        guestEmail: session ? null : email.toLowerCase(),
        status: "PENDING",
        subtotal,
        shipping,
        total,
        couponCode: couponCode || null,
        address: shippingAddressSnapshot,
        items: {
          create: orderItemsData,
        },
      },
    });

    // Create Razorpay Order
    let razorpayOrder;
    try {
      razorpayOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: order.id,
      });
    } catch (rzpErr) {
      console.error("Razorpay Order creation failed:", rzpErr);
      return NextResponse.json({ error: "Razorpay order creation failed" }, { status: 500 });
    }

    return NextResponse.json({
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      orderId: order.id,
      total,
      razorpayOrderId: razorpayOrder.id,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Checkout / Order creation error:", error);
    return NextResponse.json({ error: "Failed to process checkout" }, { status: 500 });
  }
}
