import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import prisma from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY || "re_mock_key");

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("x-razorpay-signature");
    const bodyText = await req.text();

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET || "yourRazorpayWebhookSecret")
      .update(bodyText)
      .digest("hex");

    // In production, enforce signature check. In sandbox/development, allow bypass if header is missing for easier manual mock triggers
    if (process.env.NODE_ENV === "production" && signature !== expectedSignature) {
      return NextResponse.json({ error: "Invalid signature verification" }, { status: 400 });
    }

    const payload = JSON.parse(bodyText);
    const event = payload.event;

    console.log("Razorpay Webhook Event Received:", event);

    // Look for successful payment captured or order paid events
    if (event === "order.paid" || event === "payment.captured") {
      const paymentOrder = payload.payload.payment?.entity || payload.payload.order?.entity;
      const orderId = paymentOrder.receipt || paymentOrder.description; // description or receipt maps to database orderId

      if (!orderId) {
        return NextResponse.json({ message: "No database order ID found in payload" }, { status: 200 });
      }

      // Load Order from database
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: { include: { variant: true } } },
      });

      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      if (order.status !== "PENDING") {
        return NextResponse.json({ message: "Order is already processed (status not PENDING)" }, { status: 200 });
      }

      // 1. UPDATE ORDER STATUS TO PAID
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "PAID" },
      });

      // 2. REDUCE STOCK AND CLEAR CART
      for (const item of order.items) {
        if (item.variantId) {
          // Reduce variant stock
          await prisma.productVariant.update({
            where: { id: item.variantId },
            data: {
              stockQuantity: {
                decrement: item.quantity,
              },
            },
          });

          // Load variant to reduce parent product stock
          const variant = await prisma.productVariant.findUnique({
            where: { id: item.variantId },
          });

          if (variant) {
            await prisma.product.update({
              where: { id: variant.productId },
              data: {
                stockQuantity: {
                  decrement: item.quantity,
                },
              },
            });
          }
        }
      }

      // Clear User/Guest Cart
      if (order.userId) {
        await prisma.cart.update({
          where: { userId: order.userId },
          data: {
            items: {
              deleteMany: {},
            },
          },
        });
      }

      // 3. SEND CONFIRMATION EMAIL VIA RESEND
      const recipientEmail = order.userId
        ? (await prisma.user.findUnique({ where: { id: order.userId } }))?.email
        : order.guestEmail;

      if (recipientEmail) {
        try {
          await resend.emails.send({
            from: "Ecilak Orders <ecilakbusiness@gmail.com>",
            to: recipientEmail,
            bcc: "ecilakbusiness@gmail.com",
            subject: `Thank you for your order! - #${order.id.substring(0, 8).toUpperCase()}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF7F2; border-radius: 12px;">
                <h1 style="font-family: serif; color: #1A1412;">Thank you for shopping with Ecilak</h1>
                <p style="color: #6E6259;">Your order <strong>#${order.id.toUpperCase()}</strong> has been successfully placed and paid.</p>
                <hr style="border: 0; border-top: 1px solid #EBE4D8; margin: 20px 0;" />
                <h3 style="color: #1A1412;">Order Summary</h3>
                <ul style="padding: 0; list-style: none;">
                  ${order.items
                    .map(
                      (item) => `
                    <li style="padding: 10px 0; border-bottom: 1px solid #EBE4D8; display: flex; justify-content: space-between;">
                      <span style="color: #6E6259;">${item.name} &times; ${item.quantity}</span>
                      <span style="font-weight: bold; color: #1A1412;">$${item.price.toFixed(2)}</span>
                    </li>
                  `
                    )
                    .join("")}
                </ul>
                <div style="margin-top: 20px; text-align: right;">
                  <p style="margin: 5px 0; color: #6E6259;">Subtotal: $${order.subtotal.toFixed(2)}</p>
                  <p style="margin: 5px 0; color: #6E6259;">Shipping: $${order.shipping.toFixed(2)}</p>
                  <h2 style="margin: 10px 0; color: #C4705A;">Total: $${order.total.toFixed(2)}</h2>
                </div>
              </div>
            `,
          });
          console.log("Email confirmation sent successfully via Resend to", recipientEmail);
        } catch (emailErr) {
          console.error("Resend email delivery failed:", emailErr);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Razorpay webhook error:", error);
    return NextResponse.json({ error: "Webhook processing error" }, { status: 500 });
  }
}
