export interface Category {
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    name: "Skincare",
    slug: "skincare",
    description: "Serums, moisturizers, cleansers, and treatments for every skin concern.",
    image: "/images/categories/skincare.jpg",
    productCount: 4,
  },
  {
    name: "Makeup",
    slug: "makeup",
    description: "Colour cosmetics crafted for effortless, everyday beauty.",
    image: "/images/categories/makeup.jpg",
    productCount: 4,
  },
  {
    name: "Bath & Body",
    slug: "bath-body",
    description: "Luxurious soaks, scrubs, and body care for your daily ritual.",
    image: "/images/categories/bath-body.jpg",
    productCount: 2,
  },
  {
    name: "Gifts",
    slug: "gifts",
    description: "Beautifully curated sets and thoughtful treats for every occasion.",
    image: "/images/categories/gifts.jpg",
    productCount: 2,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
