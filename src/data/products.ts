export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  ingredients: string;
  howToUse: string;
  rating: number;
  reviewCount: number;
  sizes: { label: string; value: string; inStock: boolean }[];
  inStock: boolean;
  tags: string[];
  skinType?: string[];
  concern?: string[];
  isNew?: boolean;
  isBestseller?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "silky-smooth-wax-strips",
    name: "Silky Smooth Wax Strips",
    price: 299,
    compareAtPrice: 399,
    images: [
      "/images/products/Productt 1(Wax Strips) (1).jpeg",
      "/images/products/Productt 1(Wax Strips) (2).jpeg",
      "/images/products/Productt 1(Wax Strips) (3).jpeg",
    ],
    category: "Beauty",
    categorySlug: "beauty",
    shortDescription:
      "Ultra-gentle wax strips infused with aloe vera for salon-smooth hair removal at home.",
    description:
      "Our Silky Smooth Wax Strips are designed for effortless, salon-quality hair removal in the comfort of your home. Pre-coated with a premium wax formula enriched with aloe vera and vitamin E, they grip even the shortest hairs (2mm+) and remove them from the root for up to 4 weeks of silky-smooth skin. The hypoallergenic formula is gentle enough for sensitive skin, leaving no sticky residue behind.",
    ingredients:
      "Glyceryl Rosinate, Paraffin, Cera Microcristallina, Aloe Barbadensis Leaf Extract, Tocopheryl Acetate, Parfum, CI 77891.",
    howToUse:
      "Warm the strip between your palms for 5 seconds. Peel apart and apply in the direction of hair growth. Press firmly and pull off quickly against the direction of growth. Use the post-wax wipe to remove any residue and soothe skin.",
    rating: 4.6,
    reviewCount: 187,
    sizes: [
      { label: "20 Strips", value: "20-strips", inStock: true },
      { label: "40 Strips", value: "40-strips", inStock: true },
    ],
    inStock: true,
    tags: ["wax", "hair-removal", "sensitive-skin"],
    skinType: ["All Skin Types", "Sensitive Skin"],
    concern: ["Hair Removal", "Smooth Skin"],
    isBestseller: true,
  },
  {
    id: "2",
    slug: "pore-perfect-nose-strips",
    name: "Pore Perfect Nose Strips",
    price: 199,
    images: [
      "/images/products/Product2(Nose Strips) (1).jpeg",
      "/images/products/Product2(Nose Strips) (2).jpeg",
      "/images/products/Product2(Nose Strips) (3).jpeg",
    ],
    category: "Skincare",
    categorySlug: "skincare",
    shortDescription:
      "Deep-cleansing charcoal nose strips that draw out blackheads and minimize pores instantly.",
    description:
      "Say goodbye to stubborn blackheads with our Pore Perfect Nose Strips. Powered by activated bamboo charcoal and witch hazel, these strips bond to and lift away dirt, oil, and blackheads in just 10-15 minutes. Tea tree extract and green tea help soothe skin post-application while tightening the appearance of pores. Dermatologist tested and suitable for all skin types.",
    ingredients:
      "Polyvinyl Alcohol, Aqua, Alcohol Denat., Charcoal Powder, Hamamelis Virginiana Water, Melaleuca Alternifolia Leaf Oil, Camellia Sinensis Leaf Extract, PVP, Glycerin.",
    howToUse:
      "Wet your nose thoroughly. Peel the strip from the plastic liner and apply, smooth side down, pressing to ensure good contact. Leave for 10-15 minutes until stiff. Peel off slowly from the edges. Use 1-2 times per week.",
    rating: 4.4,
    reviewCount: 312,
    sizes: [
      { label: "6 Strips", value: "6-strips", inStock: true },
      { label: "12 Strips", value: "12-strips", inStock: true },
    ],
    inStock: true,
    tags: ["pore-care", "blackhead", "charcoal"],
    skinType: ["Oily Skin", "Combination Skin", "All Skin Types"],
    concern: ["Blackheads", "Pores", "Oiliness"],
  },
  {
    id: "3",
    slug: "luxe-nail-extensions",
    name: "Luxe Nail Extensions",
    price: 499,
    compareAtPrice: 699,
    images: [
      "/images/products/Product3(Nail Extension) (1).jpeg",
      "/images/products/Product3(Nail Extension) (2).jpeg",
      "/images/products/Product3(Nail Extension) (3).jpeg",
    ],
    category: "Nails",
    categorySlug: "nails",
    shortDescription:
      "Professional-grade gel nail extensions with pre-designed tips for an instant salon manicure.",
    description:
      "Get a flawless salon manicure in minutes with our Luxe Nail Extensions. Each set features 24 pre-shaped, pre-designed nail tips crafted from flexible gel for a natural look and comfortable wear. The advanced adhesive tabs provide a secure hold for up to 14 days without damaging your natural nails. Available in stunning designs from classic French tips to trendy marble and ombré finishes.",
    ingredients:
      "Acrylonitrile Butadiene Styrene, Ethyl Cyanoacrylate, Polymethyl Methacrylate, Cellulose Acetate, CI 77891, CI 77491.",
    howToUse:
      "Select the right size for each nail. Clean natural nails with the included prep pad. Apply adhesive tab or glue to the natural nail. Press the extension on firmly for 10 seconds. File and shape to your desired length. To remove, soak in warm water for 10 minutes and gently peel off.",
    rating: 4.7,
    reviewCount: 256,
    sizes: [
      { label: "24 Pcs Set", value: "24pcs", inStock: true },
    ],
    inStock: true,
    tags: ["nail-art", "extensions", "salon"],
    isNew: true,
    isBestseller: true,
  },
  {
    id: "4",
    slug: "radiance-dtan-pack",
    name: "Radiance D-Tan Pack",
    price: 349,
    images: [
      "/images/products/Product4(Dtan) (1).jpeg",
      "/images/products/Product4(Dtan) (2).jpeg",
      "/images/products/Product4(Dtan) (3).jpeg",
      "/images/products/Product4(Dtan) (4).jpeg",
      "/images/products/Product4(Dtan) (5).jpeg",
    ],
    category: "Skincare",
    categorySlug: "skincare",
    shortDescription:
      "A powerful de-tanning mask with milk extracts and kojic acid for visibly brighter, even-toned skin.",
    description:
      "Our Radiance D-Tan Pack is your go-to solution for stubborn sun tan and uneven skin tone. Formulated with a potent blend of milk extracts, kojic acid, and licorice root extract, this creamy mask works to gently dissolve tan, lighten pigmentation, and restore your skin's natural radiance in just 15 minutes. Enriched with hyaluronic acid and aloe vera for deep hydration, it leaves skin feeling soft, supple, and visibly brighter after every use.",
    ingredients:
      "Aqua, Kaolin, Kojic Acid, Lactic Acid, Glycyrrhiza Glabra Root Extract, Sodium Hyaluronate, Aloe Barbadensis Leaf Juice, Niacinamide, Titanium Dioxide, Glycerin, Cetearyl Alcohol, Phenoxyethanol.",
    howToUse:
      "Apply a thick, even layer on cleansed face, neck, and arms. Avoid eye area. Leave on for 15-20 minutes. Massage gently with wet fingers in circular motions and rinse off with lukewarm water. Use 2-3 times a week for best results.",
    rating: 4.5,
    reviewCount: 198,
    sizes: [
      { label: "100 g", value: "100g", inStock: true },
      { label: "200 g", value: "200g", inStock: true },
    ],
    inStock: true,
    tags: ["dtan", "brightening", "tan-removal"],
    skinType: ["All Skin Types", "Sun-Damaged Skin"],
    concern: ["Tan Removal", "Uneven Tone", "Dullness"],
    isBestseller: true,
  },
  {
    id: "5",
    slug: "fresh-guard-sweat-pads",
    name: "Fresh Guard Sweat Pads",
    price: 249,
    images: [
      "/images/products/Product5(sweatPads) (1).jpeg",
      "/images/products/Product5(sweatPads) (2).jpeg",
      "/images/products/Product5(sweatPads) (3).jpeg",
      "/images/products/Product5(sweatPads) (4).jpeg",
      "/images/products/Product5(sweatPads) (5).jpeg",
    ],
    category: "Beauty",
    categorySlug: "beauty",
    shortDescription:
      "Ultra-thin, invisible underarm sweat pads that keep you dry and stain-free all day.",
    description:
      "Stay fresh and confident all day with our Fresh Guard Sweat Pads. These ultra-thin, disposable pads adhere discreetly to the inside of your clothing to absorb sweat and prevent embarrassing underarm stains. The breathable, hypoallergenic fabric features a super-absorbent core that locks in moisture while allowing air circulation. Perfect for work, workouts, and special occasions. Each pad provides up to 8 hours of protection.",
    ingredients:
      "Non-woven Fabric, Super Absorbent Polymer, Medical-grade Adhesive, Breathable PE Film.",
    howToUse:
      "Peel off the adhesive backing and stick the pad to the underarm area of your clothing (not directly on skin). Press firmly for a secure hold. Replace as needed throughout the day. Dispose after single use.",
    rating: 4.3,
    reviewCount: 145,
    sizes: [
      { label: "10 Pads", value: "10-pads", inStock: true },
      { label: "30 Pads", value: "30-pads", inStock: true },
    ],
    inStock: true,
    tags: ["sweat-protection", "underarm", "hygiene"],
    isNew: true,
  },
  {
    id: "6",
    slug: "glow-revival-face-wash",
    name: "Glow Revival Face Wash",
    price: 279,
    images: [
      "/images/products/Product6(FaceWash) (1).jpeg",
      "/images/products/Product6(FaceWash) (2).jpeg",
      "/images/products/Product6(FaceWash) (3).jpeg",
      "/images/products/Product6(FaceWash) (4).jpeg",
      "/images/products/Product6(FaceWash) (5).jpeg",
    ],
    category: "Skincare",
    categorySlug: "skincare",
    shortDescription:
      "A gentle, pH-balanced foaming face wash with vitamin C and niacinamide for a radiant glow.",
    description:
      "Start and end your day with a glow. Our Glow Revival Face Wash combines the brightening power of stabilized vitamin C with niacinamide and salicylic acid in a luxuriously creamy lather that deep cleanses without stripping your skin's natural moisture. Green tea extract and aloe vera calm and protect, while micro-exfoliating beads gently buff away dead skin cells. The result: clear, bright, and refreshed skin after every wash.",
    ingredients:
      "Aqua, Sodium Lauroyl Sarcosinate, Cocamidopropyl Betaine, Glycerin, Ascorbyl Glucoside, Niacinamide, Salicylic Acid, Camellia Sinensis Leaf Extract, Aloe Barbadensis Leaf Juice, Cellulose Beads, Panthenol, Citric Acid, Phenoxyethanol, Parfum.",
    howToUse:
      "Wet your face with lukewarm water. Squeeze a coin-sized amount and work into a gentle lather between your palms. Massage onto face in circular motions for 60 seconds, avoiding the eye area. Rinse thoroughly. Use morning and evening.",
    rating: 4.8,
    reviewCount: 423,
    sizes: [
      { label: "100 ml", value: "100ml", inStock: true },
      { label: "150 ml", value: "150ml", inStock: true },
    ],
    inStock: true,
    tags: ["face-wash", "brightening", "vitamin-c"],
    skinType: ["All Skin Types", "Oily Skin", "Combination Skin"],
    concern: ["Dullness", "Oiliness", "Acne"],
    isBestseller: true,
  },
  {
    id: "7",
    slug: "press-on-nail-kit",
    name: "Press-On Nail Kit",
    price: 399,
    images: [
      "/images/products/Product7(Nails) (1).jpeg",
      "/images/products/Product7(Nails) (2).jpeg",
    ],
    category: "Nails",
    categorySlug: "nails",
    shortDescription:
      "Reusable designer press-on nails with a glossy gel finish — no UV lamp needed.",
    description:
      "Salon-perfect nails without the salon price tag. Our Press-On Nail Kit features 24 hand-painted, reusable nail tips with a high-shine gel finish that looks and feels like a professional gel manicure. Each set comes with a mini nail file, cuticle pusher, and premium nail glue. The ergonomic curved design ensures a natural fit and comfortable all-day wear for up to 2 weeks.",
    ingredients:
      "ABS Plastic, Ethyl Cyanoacrylate, Polymethyl Methacrylate, UV Gel Polish, Cellulose Acetate.",
    howToUse:
      "Push back cuticles and lightly buff natural nail surface. Select the correct size for each finger. Apply a thin layer of glue to both the natural nail and press-on. Press and hold firmly for 15 seconds. File to your desired shape and length.",
    rating: 4.6,
    reviewCount: 189,
    sizes: [
      { label: "24 Pcs Set", value: "24pcs", inStock: true },
    ],
    inStock: true,
    tags: ["press-on", "nail-art", "reusable"],
  },
  {
    id: "8",
    slug: "hydra-glow-under-eye-masks",
    name: "Hydra Glow Under Eye Masks",
    price: 329,
    compareAtPrice: 449,
    images: [
      "/images/products/Product8(UnderEyeMask) (1).jpeg",
      "/images/products/Product8(UnderEyeMask) (2).jpeg",
      "/images/products/Product8(UnderEyeMask) (3).jpeg",
      "/images/products/Product8(UnderEyeMask) (4).jpeg",
    ],
    category: "Skincare",
    categorySlug: "skincare",
    shortDescription:
      "24K gold-infused hydrogel under eye masks that depuff, brighten, and hydrate tired eyes.",
    description:
      "Wake up your eyes with our luxurious Hydra Glow Under Eye Masks. Infused with 24K colloidal gold, retinol, and hyaluronic acid, these hydrogel patches deliver an intense burst of hydration and anti-aging actives directly to the delicate under-eye area. The cooling gel conforms perfectly to your skin, targeting dark circles, puffiness, and fine lines. Caffeine extract helps constrict blood vessels to reduce that tired look, while collagen peptides firm and plump.",
    ingredients:
      "Aqua, Glycerin, Chondrus Crispus Extract, Gold (Colloidal), Retinyl Palmitate, Sodium Hyaluronate, Coffea Arabica Seed Extract, Hydrolyzed Collagen, Niacinamide, Panthenol, Allantoin, Phenoxyethanol.",
    howToUse:
      "After cleansing, gently place the masks under your eyes with the wider end toward the outer corner. Leave on for 15-20 minutes. Remove and gently pat any remaining serum into the skin. Use 2-3 times per week for best results. Refrigerate for an extra cooling effect.",
    rating: 4.7,
    reviewCount: 267,
    sizes: [
      { label: "5 Pairs", value: "5-pairs", inStock: true },
      { label: "10 Pairs", value: "10-pairs", inStock: true },
    ],
    inStock: true,
    tags: ["eye-care", "hydrogel", "anti-aging"],
    skinType: ["All Skin Types"],
    concern: ["Dark Circles", "Puffiness", "Fine Lines"],
    isBestseller: true,
  },
  {
    id: "9",
    slug: "charcoal-face-detox-mask",
    name: "Charcoal Face Detox Mask",
    price: 379,
    images: [
      "/images/products/Prouduct9(FaceDetox) (1).jpeg",
      "/images/products/Prouduct9(FaceDetox) (2).jpeg",
      "/images/products/Prouduct9(FaceDetox) (3).jpeg",
    ],
    category: "Skincare",
    categorySlug: "skincare",
    shortDescription:
      "A deep-cleansing activated charcoal peel-off mask that detoxifies, tightens pores, and reveals fresh skin.",
    description:
      "Give your skin a deep detox with our Charcoal Face Detox Mask. This powerful peel-off formula combines activated bamboo charcoal with bentonite clay, tea tree oil, and witch hazel to draw out deep-seated impurities, excess sebum, and environmental pollutants. As you peel it off, it takes blackheads and dead skin with it, revealing a clearer, tighter, and more refined complexion underneath. Green tea and vitamin E provide antioxidant protection to freshly cleansed skin.",
    ingredients:
      "Aqua, Polyvinyl Alcohol, Charcoal Powder, Bentonite, Hamamelis Virginiana Water, Melaleuca Alternifolia Leaf Oil, Camellia Sinensis Leaf Extract, Tocopheryl Acetate, Glycerin, Carbomer, Phenoxyethanol.",
    howToUse:
      "Apply an even, thick layer to clean, dry face avoiding eyebrows, hairline, and eye area. Leave for 20-25 minutes until completely dry. Peel off from the bottom edge upward in a slow, steady motion. Rinse any residue with lukewarm water. Follow with toner and moisturizer. Use 1-2 times per week.",
    rating: 4.5,
    reviewCount: 178,
    sizes: [
      { label: "60 g", value: "60g", inStock: true },
      { label: "120 g", value: "120g", inStock: true },
    ],
    inStock: true,
    tags: ["detox", "charcoal", "peel-off"],
    skinType: ["Oily Skin", "Combination Skin", "Acne-Prone Skin"],
    concern: ["Blackheads", "Pores", "Oiliness", "Detox"],
    isNew: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.isBestseller);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
    .slice(0, limit);
}
