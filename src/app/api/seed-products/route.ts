import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log('Clearing old dummy products...');
    // Delete dependents first
    await prisma.review.deleteMany({});
    await prisma.cartItem.deleteMany({});
    await prisma.orderItem.deleteMany({});
    await prisma.productVariant.deleteMany({});
    await prisma.product.deleteMany({});
    
    // Get categories
    let skincare = await prisma.category.findFirst({ where: { name: 'Skincare' } });
    if (!skincare) skincare = await prisma.category.create({ data: { name: 'Skincare', slug: 'skincare', image: '/images/products/Product2(Nose Strips) (1).jpeg' } });
    
    let makeup = await prisma.category.findFirst({ where: { name: 'Beauty' } });
    if (!makeup) makeup = await prisma.category.create({ data: { name: 'Beauty', slug: 'beauty', image: '/images/products/Product3(Nail Extension) (1).jpeg' } });

    const realProducts = [
      { name: "Wax Strips", slug: "wax-strips", cat: makeup.id, image: "/images/products/Productt 1(Wax Strips) (1).jpeg", price: 299 },
      { name: "Nose Strips", slug: "nose-strips", cat: skincare.id, image: "/images/products/Product2(Nose Strips) (1).jpeg", price: 199 },
      { name: "Nail Extension", slug: "nail-extension", cat: makeup.id, image: "/images/products/Product3(Nail Extension) (1).jpeg", price: 499 },
      { name: "Sweat Pads", slug: "sweat-pads", cat: skincare.id, image: "/images/products/Product5(sweatPads) (1).jpeg", price: 149 },
      { name: "Face Wash", slug: "face-wash", cat: skincare.id, image: "/images/products/Product6(FaceWash) (1).jpeg", price: 249 },
      { name: "Under Eye Mask", slug: "under-eye-mask", cat: skincare.id, image: "/images/products/Product8(UnderEyeMask) (1).jpeg", price: 399 },
    ];

    console.log('Adding real products...');
    for (const item of realProducts) {
      const prod = await prisma.product.create({
        data: {
          name: item.name,
          slug: item.slug,
          description: `Premium quality ${item.name} for your daily beauty ritual. Experience the best of Ecilak with this authentic product.`,
          price: item.price,
          sku: `ECI-${item.slug.toUpperCase()}`,
          stockQuantity: 100,
          categoryId: item.cat,
          images: [item.image],
          isFeatured: true,
        }
      });
      
      await prisma.productVariant.create({
        data: {
          productId: prod.id,
          name: "Standard",
          stockQuantity: 100,
        }
      });
    }

    return NextResponse.json({ success: true, message: "Products seeded successfully" });
  } catch (error) {
    console.error("Failed to seed:", error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
