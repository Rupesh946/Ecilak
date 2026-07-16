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
    description: "Face washes, masks, nose strips, and treatments for radiant skin.",
    image: "/images/category-skincare.png",
    productCount: 5,
  },
  {
    name: "Beauty",
    slug: "beauty",
    description: "Wax strips, sweat pads, and essentials for everyday confidence.",
    image: "/images/category-beauty.png",
    productCount: 2,
  },
  {
    name: "Nails",
    slug: "nails",
    description: "Stunning nail extensions and press-on kits for an instant glam manicure.",
    image: "/images/category-nails.png",
    productCount: 2,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
