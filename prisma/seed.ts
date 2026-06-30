import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Seeding database...");

  // 1. CLEAR EXISTING DATA
  await prisma.coupon.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.wishlist.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. SEED USERS
  const adminHash = bcrypt.hashSync("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@ecilak.com",
      passwordHash: adminHash,
      role: "ADMIN",
    },
  });

  const customerHash = bcrypt.hashSync("password123", 10);
  const customer = await prisma.user.create({
    data: {
      name: "Jane Doe",
      email: "jane@example.com",
      passwordHash: customerHash,
      role: "CUSTOMER",
    },
  });

  // Seed customer default address
  await prisma.address.create({
    data: {
      userId: customer.id,
      label: "Home",
      name: "Jane Doe",
      address: "123 Beauty Lane",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      phone: "+1 (555) 123-4567",
      isDefault: true,
    },
  });

  console.log("Users seeded successfully!");

  // 3. SEED CATEGORIES
  const skincare = await prisma.category.create({
    data: {
      name: "Skincare",
      slug: "skincare",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600",
    },
  });

  const makeup = await prisma.category.create({
    data: {
      name: "Makeup",
      slug: "makeup",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600",
    },
  });

  const bathBody = await prisma.category.create({
    data: {
      name: "Bath & Body",
      slug: "bath-body",
      image: "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600",
    },
  });

  const gifts = await prisma.category.create({
    data: {
      name: "Gifts",
      slug: "gifts",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600",
    },
  });

  console.log("Categories seeded successfully!");

  // 4. SEED PRODUCTS & VARIANTS
  // Product 1: Radiance renewal serum
  const serum = await prisma.product.create({
    data: {
      name: "Radiance Renewal Serum",
      slug: "radiance-renewal-serum",
      description: "A transformative serum formulated with 10% Vitamin C, Hyaluronic Acid, and Niacinamide to target dark spots, uneven texture, and fine lines. Delivers a lit-from-within glow while strengthening the skin barrier.",
      ingredients: "Water (Aqua), 3-O-Ethyl Ascorbic Acid (Vitamin C), Niacinamide, Glycerin, Sodium Hyaluronate, Centella Asiatica Extract, Licorice Root Extract, Tocopherol, Phenoxyethanol, Ethylhexylglycerin.",
      howToUse: "Apply 3-4 drops to clean, dry face and neck in the morning and evening. Gently press into skin until fully absorbed. Follow with moisturizer and SPF in the morning.",
      price: 48,
      compareAtPrice: 58,
      sku: "SK-RRS-01",
      stockQuantity: 150,
      categoryId: skincare.id,
      images: ["/placeholder.png"],
      isFeatured: true,
    },
  });
  await prisma.productVariant.createMany({
    data: [
      { productId: serum.id, name: "30ml", stockQuantity: 90, priceOverride: 48 },
      { productId: serum.id, name: "50ml", stockQuantity: 60, priceOverride: 68 },
    ],
  });

  // Product 2: Velvet Matte Lipstick
  const lipstick = await prisma.product.create({
    data: {
      name: "Velvet Matte Lipstick",
      slug: "velvet-matte-lipstick",
      description: "A weightless matte lipstick that delivers high-impact, pigment-rich color in a single swipe. Infused with Shea Butter and Jojoba Oil to keep lips hydrated, comfortable, and flake-free all day.",
      ingredients: "Dimethicone, Octyldodecanol, Silica, Polyethylene, Shea Butter, Jojoba Seed Oil, Tocopheryl Acetate, Iron Oxides (CI 77491, CI 77492), Red 7 Lake (CI 15850).",
      howToUse: "Apply directly to lips starting from the center and moving outwards. Line lips with a lip pencil first for a more defined, long-lasting finish.",
      price: 26,
      sku: "MK-VML-02",
      stockQuantity: 200,
      categoryId: makeup.id,
      images: ["/placeholder.png"],
      isFeatured: true,
    },
  });
  await prisma.productVariant.createMany({
    data: [
      { productId: lipstick.id, name: "Rosewood", stockQuantity: 80 },
      { productId: lipstick.id, name: "Terracotta", stockQuantity: 70 },
      { productId: lipstick.id, name: "Blush", stockQuantity: 50 },
    ],
  });

  // Product 3: Hydrating Gel Cleanser
  const cleanser = await prisma.product.create({
    data: {
      name: "Hydrating Gel Cleanser",
      slug: "hydrating-gel-cleanser",
      description: "A gentle, non-foaming gel cleanser that removes makeup, sunscreen, and daily impurities without stripping the skin of moisture. Formulated with Ceramides and Panthenol to soothe and hydrate.",
      ingredients: "Water (Aqua), Cocamidopropyl Betaine, Glycerin, Sodium Lauroyl Methyl Isethionate, Ceramide NP, Panthenol, Chamomile Extract, Citric Acid.",
      howToUse: "Massage a small amount onto damp skin. Rinse thoroughly with lukewarm water. Pat dry and follow with toner and serum.",
      price: 24,
      sku: "SK-HGC-03",
      stockQuantity: 120,
      categoryId: skincare.id,
      images: ["/placeholder.png"],
    },
  });
  await prisma.productVariant.create({
    data: { productId: cleanser.id, name: "150ml", stockQuantity: 120 },
  });

  // Product 4: Ceramide Barrier Cream
  const barrierCream = await prisma.product.create({
    data: {
      name: "Ceramide Barrier Cream",
      slug: "ceramide-barrier-cream",
      description: "A rich, nourishing moisturizer packed with five essential ceramides, squalane, and cholesterol. Restores damaged skin barriers and locks in deep, 48-hour hydration.",
      ingredients: "Water, Glycerin, Squalane, Caprylic/Capric Triglyceride, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Xanthan Gum.",
      howToUse: "Smooth a dime-sized amount over face and neck as the final step of your evening skincare routine. In the morning, follow with SPF.",
      price: 38,
      sku: "SK-CBC-04",
      stockQuantity: 85,
      categoryId: skincare.id,
      images: ["/placeholder.png"],
      isFeatured: true,
    },
  });
  await prisma.productVariant.create({
    data: { productId: barrierCream.id, name: "50ml", stockQuantity: 85 },
  });

  // Product 5: Bakuchiol Eye Cream
  const eyeCream = await prisma.product.create({
    data: {
      name: "Bakuchiol Eye Cream",
      slug: "bakuchiol-eye-cream",
      description: "A gentle retinol-alternative eye cream powered by Bakuchiol and Caffeine. Minimizes under-eye puffiness, dark circles, and fine lines without irritation.",
      ingredients: "Water, Glycerin, Bakuchiol, Caffeine, Avocado Oil, Shea Butter, Green Tea Extract, Sodium Hyaluronate.",
      howToUse: "Dab a tiny dot under and around the eye area using your ring finger. Gently pat until absorbed. Use morning and night.",
      price: 32,
      sku: "SK-BEC-05",
      stockQuantity: 95,
      categoryId: skincare.id,
      images: ["/placeholder.png"],
    },
  });
  await prisma.productVariant.create({
    data: { productId: eyeCream.id, name: "15ml", stockQuantity: 95 },
  });

  // Product 6: Illuminating Highlight Balm
  const highlight = await prisma.product.create({
    data: {
      name: "Illuminating Highlight Balm",
      slug: "illuminating-highlight-balm",
      description: "A solid, dewy balm that gives skin a glass-like glow without glitter. Glides on smoothly for a fresh, lit-from-within look.",
      ingredients: "Castor Seed Oil, Coconut Oil, Candelilla Wax, Avocado Oil, Mica, Titanium Dioxide, Vitamin E.",
      howToUse: "Tap onto cheekbones, brow bones, and the bridge of the nose using fingers or a damp sponge.",
      price: 22,
      sku: "MK-IHB-06",
      stockQuantity: 110,
      categoryId: makeup.id,
      images: ["/placeholder.png"],
    },
  });
  await prisma.productVariant.createMany({
    data: [
      { productId: highlight.id, name: "Quartz (Dewy/Clear)", stockQuantity: 60 },
      { productId: highlight.id, name: "Bronze (Warm/Sun)", stockQuantity: 50 },
    ],
  });

  // Product 7: Mineral SPF 30 Primer
  const spf = await prisma.product.create({
    data: {
      name: "Mineral SPF 30 Primer",
      slug: "mineral-spf-30-primer",
      description: "A 100% mineral sunscreen and primer in one. Blurs pores and leaves a satin, weightless finish with no white cast.",
      ingredients: "Zinc Oxide 12%, Water, Caprylic/Capric Triglyceride, Aloe Vera Juice, Green Tea Extract, Jojoba Oil.",
      howToUse: "Apply generously to face 15 minutes before sun exposure and makeup application.",
      price: 34,
      sku: "SK-MSP-07",
      stockQuantity: 140,
      categoryId: skincare.id,
      images: ["/placeholder.png"],
    },
  });
  await prisma.productVariant.create({
    data: { productId: spf.id, name: "50ml", stockQuantity: 140 },
  });

  // Product 8: Midnight Rose Bath Soak
  const bathSoak = await prisma.product.create({
    data: {
      name: "Midnight Rose Bath Soak",
      slug: "midnight-rose-bath-soak",
      description: "A luxurious blend of dead sea salts, pink himalayan salt, and organic rose petals. Relaxes muscles and hydrates skin while filling the room with a soothing rose aroma.",
      ingredients: "Sodium Chloride (Dead Sea Salt), Himalayan Pink Salt, Rose Centifolia Flower, Rose Absolute Oil, Coconut Oil.",
      howToUse: "Dissolve a handful of salt in warm running bathwater. Soak for 20 minutes to relax muscles and hydrate skin.",
      price: 28,
      sku: "BB-MRB-08",
      stockQuantity: 90,
      categoryId: bathBody.id,
      images: ["/placeholder.png"],
    },
  });
  await prisma.productVariant.create({
    data: { productId: bathSoak.id, name: "250g", stockQuantity: 90 },
  });

  // Add remaining products up to 20 for thorough dataset
  const extraProducts = [
    { name: "Squalane Facial Oil", price: 42, cat: skincare.id, sku: "SK-SFO-09" },
    { name: "Nourishing Cleansing Balm", price: 32, cat: skincare.id, sku: "SK-NCB-10" },
    { name: "Salicylic Acid Pore Exfoliator", price: 28, cat: skincare.id, sku: "SK-SAPE-11" },
    { name: "Liquid Radiant Foundation", price: 38, cat: makeup.id, sku: "MK-LRF-12" },
    { name: "Defining Length Mascara", price: 22, cat: makeup.id, sku: "MK-DLM-13" },
    { name: "Tinted Lip Oil", price: 18, cat: makeup.id, sku: "MK-TLO-14" },
    { name: "Eucalyptus Body Scrub", price: 24, cat: bathBody.id, sku: "BB-EBS-15" },
    { name: "Shea & Honey Body Butter", price: 26, cat: bathBody.id, sku: "BB-SBB-16" },
    { name: "Lavendar Sleep Mist", price: 20, cat: bathBody.id, sku: "BB-LSM-17" },
    { name: "The Radiance Ritual Set", price: 75, cat: gifts.id, sku: "GF-RRS-18" },
    { name: "The Ultimate Body Care Set", price: 60, cat: gifts.id, sku: "GF-UBC-19" },
    { name: "Mini Skincare Discovery Kit", price: 40, cat: gifts.id, sku: "GF-MSD-20" },
  ];

  for (const item of extraProducts) {
    const prod = await prisma.product.create({
      data: {
        name: item.name,
        slug: item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: `A premium product designed to elevate your daily routine. Crafted with high-quality, cruelty-free ingredients to deliver clean and effective beauty.`,
        price: item.price,
        sku: item.sku,
        stockQuantity: 100,
        categoryId: item.cat,
        images: ["/placeholder.png"],
      },
    });

    await prisma.productVariant.create({
      data: {
        productId: prod.id,
        name: "Standard",
        stockQuantity: 100,
      },
    });
  }

  // 5. SEED REVIEWS
  await prisma.review.createMany({
    data: [
      { productId: serum.id, userId: customer.id, rating: 5, comment: "Absolutely love this serum! My skin has never looked so glowing and clear. Highly recommend." },
      { productId: serum.id, userId: customer.id, rating: 4, comment: "Great hydration and texture. Takes a few weeks to see dark spots fade but it works." },
      { productId: lipstick.id, userId: customer.id, rating: 5, comment: "The Rosewood shade is perfect! It feels so comfortable on the lips, not drying at all." },
      { productId: barrierCream.id, userId: customer.id, rating: 5, comment: "A lifesaver for dry skin. Reconstructed my damaged skin barrier in days!" },
    ],
  });

  // 6. SEED COUPONS
  await prisma.coupon.createMany({
    data: [
      { code: "WELCOME10", discountType: "PERCENTAGE", discountValue: 10, usageLimit: 100 },
      { code: "ECILAK20", discountType: "FIXED", discountValue: 20, usageLimit: 50 },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
