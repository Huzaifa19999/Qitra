import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Admin user
  const hashedPassword = await bcrypt.hash('Admin123!', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@perfumestore.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@perfumestore.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log('Admin user ensured:', admin.email);

  // Categories
  const categoriesData = [
    { name: 'Men', slug: 'men' },
    { name: 'Women', slug: 'women' },
    { name: 'Children', slug: 'children' },
    { name: 'Unisex', slug: 'unisex' },
  ];

  const categories = await Promise.all(
    categoriesData.map((c) =>
      prisma.category.upsert({
        where: { slug: c.slug },
        update: {},
        create: c,
      })
    )
  );
  console.log('Categories created:', categories.map(c => c.name).join(', '));

  // Products
  const productsData = [
    // Men
    {
      name: 'Oud Noir Intense',
      description: 'A deep, dark woodsy fragrance with hints of leather and spice. Perfect for evening wear.',
      price: 12500,
      stock: 50,
      categoryId: categories.find((c) => c.slug === 'men')!.id,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
    },
    {
      name: 'Azure Marine',
      description: 'Fresh aquatic notes blended with cedar and bergamot. A versatile daily scent.',
      price: 6800,
      stock: 120,
      categoryId: categories.find((c) => c.slug === 'men')!.id,
      image: 'https://images.unsplash.com/photo-1523293115678-d2902f5027a0?w=400',
    },
    {
      name: 'Spiced Amber',
      description: 'Warm amber mixed with cinnamon and vanilla. Cozy and inviting.',
      price: 8500,
      stock: 75,
      categoryId: categories.find((c) => c.slug === 'men')!.id,
      image: 'https://images.unsplash.com/photo-1595425970377-c9703c48657a?w=400',
    },
    // Women
    {
      name: 'Rose De Mai',
      description: 'A luxurious bouquet of fresh roses, jasmine, and a touch of musk.',
      price: 9500,
      stock: 60,
      categoryId: categories.find((c) => c.slug === 'women')!.id,
      image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=400',
    },
    {
      name: 'Midnight Orchid',
      description: 'Mysterious and sensual with notes of black orchid, truffle, and dark chocolate.',
      price: 14000,
      stock: 30,
      categoryId: categories.find((c) => c.slug === 'women')!.id,
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400',
    },
    {
      name: 'Citrus Bloom',
      description: 'Bright and energetic. Sweet orange, grapefruit, and neroli blossoms.',
      price: 5500,
      stock: 150,
      categoryId: categories.find((c) => c.slug === 'women')!.id,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
    },
    // Children
    {
      name: 'Sweet Berry',
      description: 'A fun, light fragrance with strawberry and marshmallow notes. Alcohol-free.',
      price: 2500,
      stock: 200,
      categoryId: categories.find((c) => c.slug === 'children')!.id,
      image: 'https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?w=400',
    },
    {
      name: 'Little Prince',
      description: 'Gentle lavender and chamomile. Calming and fresh.',
      price: 2800,
      stock: 180,
      categoryId: categories.find((c) => c.slug === 'children')!.id,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    },
    {
      name: 'Cotton Candy Splash',
      description: 'Playful and sweet vanilla with spun sugar elements.',
      price: 2200,
      stock: 150,
      categoryId: categories.find((c) => c.slug === 'children')!.id,
      image: 'https://images.unsplash.com/photo-1608528577891-eb0558e80718?w=400',
    },
    // Unisex
    {
      name: 'Sandalwood Reserve',
      description: 'Creamy sandalwood, cardamom, and soft iris. Elegant and understated.',
      price: 11000,
      stock: 80,
      categoryId: categories.find((c) => c.slug === 'unisex')!.id,
      image: 'https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?w=400',
    },
    {
      name: 'Green Tea & Fig',
      description: 'Refreshing and clean. Perfect for any day, any time.',
      price: 6200,
      stock: 100,
      categoryId: categories.find((c) => c.slug === 'unisex')!.id,
      image: 'https://images.unsplash.com/photo-1615397322987-9b2f6eb85590?w=400',
    },
    {
      name: 'Desert Leather',
      description: 'Dry spice, weathered leather, and ambergris. A bold statement.',
      price: 13500,
      stock: 40,
      categoryId: categories.find((c) => c.slug === 'unisex')!.id,
      image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=400',
    },
  ];

  // We only create if they don't exist to prevent duplicating all products on every seed
  const existingProductsCount = await prisma.product.count();
  
  if (existingProductsCount === 0) {
    await prisma.product.createMany({
      data: productsData,
    });
    console.log('Created 12 sample products.');
  } else {
    console.log('Products already exist, skipping product seed.');
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
