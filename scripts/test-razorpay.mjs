/**
 * Razorpay Test Transaction Script
 * Run with: node scripts/test-razorpay.mjs
 */

import crypto from "crypto";

const KEY_ID = "rzp_test_T8HH85AQPinsjR";
const KEY_SECRET = "UWDtqXYFADWpg99ZSrsuoGVz";
const BASE_URL = "http://localhost:3000";

async function getFirstVariant() {
  console.log("\n📦 Fetching products from local API...");
  const res = await fetch(`${BASE_URL}/api/products?limit=1`);
  const data = await res.json();
  const product = data.products?.[0];
  if (!product) throw new Error("No products found. Make sure the DB is seeded.");
  console.log(`   ✅ Product: ${product.name} (₹${product.price})`);
  return product;
}

async function addToCart(variantId) {
  console.log("\n🛒 Adding item to cart...");
  const res = await fetch(`${BASE_URL}/api/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ variantId, quantity: 1 }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Cart add failed: ${err.error}`);
  }

  const setCookieHeader = res.headers.get("set-cookie") || "";
  const guestToken = setCookieHeader.match(/guest_cart_id=([^;]+)/)?.[1];
  const data = await res.json();
  console.log(`   ✅ Cart item created. Cart ID: ${data.cartItem?.cartId}`);
  return { cartId: data.cartItem?.cartId, guestToken };
}

async function getCart(guestToken) {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    headers: guestToken ? { Cookie: `guest_cart_id=${guestToken}` } : {},
  });
  const data = await res.json();
  return data.cartId;
}

async function createOrder(cartId, guestToken) {
  console.log("\n📝 Creating order via /api/orders...");
  const res = await fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(guestToken ? { Cookie: `guest_cart_id=${guestToken}` } : {}),
    },
    body: JSON.stringify({
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      address: "123 MG Road",
      city: "Mumbai",
      state: "Maharashtra",
      zip: "400001",
      phone: "9876543210",
      cartId,
      couponCode: null,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`Order creation failed: ${data.error}`);

  console.log(`   ✅ Order created!`);
  console.log(`      Internal Order ID : ${data.orderId}`);
  console.log(`      Razorpay Order ID  : ${data.razorpayOrderId}`);
  console.log(`      Amount             : ₹${data.total} (${data.amount} paise)`);
  return data;
}

function simulatePayment(razorpayOrderId) {
  const fakePaymentId = `pay_test_${crypto.randomBytes(8).toString("hex")}`;
  const signature = crypto
    .createHmac("sha256", KEY_SECRET)
    .update(`${razorpayOrderId}|${fakePaymentId}`)
    .digest("hex");

  console.log(`\n💳 Simulated payment:`);
  console.log(`   Payment ID : ${fakePaymentId}`);
  return { fakePaymentId, signature };
}

async function verifyPayment(razorpayOrderId, paymentId, signature, internalOrderId) {
  console.log("\n🔐 Verifying payment with /api/verify-payment...");
  const res = await fetch(`${BASE_URL}/api/verify-payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
      receipt: internalOrderId,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`Verification failed: ${data.error}`);
  console.log(`   ✅ ${data.message}`);
  return data;
}

async function main() {
  console.log("═══════════════════════════════════════════════════");
  console.log("  🛍️  Ecilak — Razorpay Test Transaction Script");
  console.log("═══════════════════════════════════════════════════");

  try {
    const product = await getFirstVariant();
    const variantId = product.variants?.[0]?.id;
    if (!variantId) throw new Error("Product has no variants. Seed the database first: npx prisma db seed");

    const { cartId: directCartId, guestToken } = await addToCart(variantId);
    const cartId = directCartId || await getCart(guestToken);
    if (!cartId) throw new Error("Could not resolve cart ID.");

    const orderData = await createOrder(cartId, guestToken);
    const { orderId, razorpayOrderId } = orderData;

    const { fakePaymentId, signature } = simulatePayment(razorpayOrderId);
    await verifyPayment(razorpayOrderId, fakePaymentId, signature, orderId);

    console.log("\n═══════════════════════════════════════════════════");
    console.log("  ✅ SUCCESS! End-to-end flow is working correctly.");
    console.log(`     Order ${orderId} → status: PAID`);
    console.log("\n  ⚠️  RAZORPAY DASHBOARD NOTE:");
    console.log("     The dashboard requires a real browser-initiated");
    console.log("     payment (not API simulation). To satisfy it:");
    console.log("     1. Go to http://localhost:3000/shop");
    console.log("     2. Add a product → Checkout → fill the form");
    console.log("     3. Use test card: 4111 1111 1111 1111 / 12/26 / 123");
    console.log("     4. Click Pay in the Razorpay modal");
    console.log("═══════════════════════════════════════════════════\n");

  } catch (err) {
    console.error("\n❌ Error:", err.message);
    process.exit(1);
  }
}

main();
