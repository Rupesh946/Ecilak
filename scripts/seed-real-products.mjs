import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old dummy products...');
  // Delete dependents first
  await prisma.review.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});
  
  // Get categories
  let skincare = await prisma.category.findFirst({ where: { name: 'Skincare' } });
  if (!skincare) skincare = await prisma.category.create({ data: { name: 'Skincare', slug: 'skincare', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600' } });
  
  let makeup = await prisma.category.findFirst({ where: { name: 'Makeup' } });
  if (!makeup) makeup = await prisma.category.create({ data: { name: 'Makeup', slug: 'makeup', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600' } });

  const realProducts = [
    { name: "Wax Strips", slug: "wax-strips", cat: makeup.id, image: "/images/products/Productt 1(Wax Strips) (1).jpeg", price: 299 },
    { name: "Nose Strips", slug: "nose-strips", cat: skincare.id, image: "/images/products/Product2(Nose Strips) (1).jpeg", price: 199 },
    { name: "Nail Extension", slug: "nail-extension", cat: makeup.id, image: "/images/products/Product3(Nail Extension) (1).jpeg", price: 499 },
    { name: "D-tan Pack", slug: "dtan", cat: skincare.id, image: "/images/products/Product4(Dtan) (1).jpeg", price: 349 },
    { name: "Sweat Pads", slug: "sweat-pads", cat: skincare.id, image: "/images/products/Product5(sweatPads) (1).jpeg", price: 149 },
    { name: "Face Wash", slug: "face-wash", cat: skincare.id, image: "/images/products/Product6(FaceWash) (1).jpeg", price: 249 },
    { name: "Under Eye Mask", slug: "under-eye-mask", cat: skincare.id, image: "/images/products/Product8(UnderEyeMask) (1).jpeg", price: 399 },
    { name: "Face Detox", slug: "face-detox", cat: skincare.id, image: "/images/products/Prouduct9(FaceDetox) (1).jpeg", price: 449 },
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
  
  console.log('Finished updating products!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
