const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('Connected to database!');
    const users = await prisma.user.count();
    console.log('Users count:', users);
    const products = await prisma.product.count();
    console.log('Products count:', products);
  } catch (e) {
    console.error('Failed to connect:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
