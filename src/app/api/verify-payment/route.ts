import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const orderId = url.searchParams.get("id");

    if (!orderId) {
      return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
    }

    // PhonePe sends data as form-urlencoded when redirectMode is POST
    let transactionId = "";
    try {
      const formData = await req.formData();
      transactionId = formData.get("transactionId")?.toString() || "";
    } catch(e) {
      // Fallback
    }

    if (!transactionId) {
      transactionId = orderId.replace(/[^a-zA-Z0-9]/g, '').substring(0, 34);
    }

    const merchantId = process.env.PHONEPE_MERCHANT_ID || "";
    const saltKey = process.env.PHONEPE_SALT_KEY || "";
    const saltIndex = process.env.PHONEPE_SALT_INDEX || "1";
    const env = process.env.PHONEPE_ENV || "UAT"; 
    const baseUrl = env === "PROD" 
      ? "https://api.phonepe.com/apis/hermes" 
      : "https://api-preprod.phonepe.com/apis/pg-sandbox";

    // Verify with Check Status API
    const checksumString = `/pg/v1/status/${merchantId}/${transactionId}` + saltKey;
    const checksum = crypto.createHash('sha256').update(checksumString).digest('hex') + "###" + saltIndex;

    const statusResponse = await fetch(`${baseUrl}/pg/v1/status/${merchantId}/${transactionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": merchantId,
      },
    });

    const statusData = await statusResponse.json();

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { variant: { include: { product: true } } } } },
    });

    if (statusData.success && statusData.code === "PAYMENT_SUCCESS") {
      if (order && order.status !== "PAID") {
        await prisma.order.update({
          where: { id: orderId },
          data: { status: "PAID" },
        });

        // Send Email using Resend
        if (process.env.RESEND_API_KEY) {
          const resend = new Resend(process.env.RESEND_API_KEY);
          try {
            const address = order.address as any;
            const itemsHtml = order.items.map(item => `<li>${item.quantity}x ${item.variant.product.name} - ${item.variant.name}</li>`).join("");
            
            await resend.emails.send({
              from: "Ecilak Orders <orders@ecilak.shop>", // Updated to your custom domain
              to: "ecilakbusiness@gmail.com",
              subject: `New Order Received - ${orderId}`,
              html: `
                <h2>New Order Received!</h2>
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Total:</strong> ₹${order.total}</p>
                <h3>Customer Details:</h3>
                <p>
                  Name: ${address.firstName} ${address.lastName}<br/>
                  Email: ${order.guestEmail || "Registered User"}<br/>
                  Phone: ${address.phone}<br/>
                  Address: ${address.address}, ${address.city}, ${address.state} ${address.zip}
                </p>
                <h3>Items Ordered:</h3>
                <ul>${itemsHtml}</ul>
              `,
            });
          } catch(emailErr) {
            console.error("Failed to send order email:", emailErr);
          }
        }
      }

      // Redirect user to success page
      const appUrl = process.env.NEXTAUTH_URL || "https://www.ecilak.shop";
      return NextResponse.redirect(`${appUrl}/checkout/success?orderId=${orderId}`);
    } else {
      // Payment Failed
      const appUrl = process.env.NEXTAUTH_URL || "https://www.ecilak.shop";
      return NextResponse.redirect(`${appUrl}/checkout?error=PaymentFailed`);
    }
  } catch (error) {
    console.error("Verification error:", error);
    const appUrl = process.env.NEXTAUTH_URL || "https://www.ecilak.shop";
    return NextResponse.redirect(`${appUrl}/checkout?error=VerificationFailed`);
  }
}
