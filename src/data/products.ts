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
    slug: "radiance-renewal-serum",
    name: "Radiance Renewal Serum",
    price: 68,
    compareAtPrice: 85,
    images: [
      "/images/products/serum-1.jpg",
      "/images/products/serum-1-alt.jpg",
    ],
    category: "Skincare",
    categorySlug: "skincare",
    shortDescription:
      "A luminous serum infused with vitamin C and hyaluronic acid that revives dull skin overnight.",
    description:
      "Our hero Radiance Renewal Serum blends stabilized vitamin C with low-molecular-weight hyaluronic acid and bakuchiol to deliver visible brightness by morning. Lightweight, fast-absorbing, and layerable under any moisturizer. Clinically shown to improve radiance scores by 42% in 4 weeks.",
    ingredients:
      "Aqua, Ascorbyl Glucoside, Sodium Hyaluronate, Bakuchiol, Squalane, Niacinamide, Tocopherol, Aloe Barbadensis Leaf Juice, Glycerin, Panthenol, Allantoin, Xanthan Gum, Citric Acid, Potassium Sorbate, Sodium Benzoate.",
    howToUse:
      "After cleansing, apply 3-4 drops to face and neck. Gently press into skin with fingertips. Follow with moisturizer. Use AM and PM for best results.",
    rating: 4.8,
    reviewCount: 234,
    sizes: [
      { label: "15 ml", value: "15ml", inStock: true },
      { label: "30 ml", value: "30ml", inStock: true },
      { label: "50 ml", value: "50ml", inStock: false },
    ],
    inStock: true,
    tags: ["vitamin-c", "brightening", "anti-aging"],
    skinType: ["All Skin Types", "Dull Skin"],
    concern: ["Dullness", "Fine Lines", "Uneven Tone"],
    isBestseller: true,
  },
  {
    id: "2",
    slug: "velvet-matte-lipstick-rosewood",
    name: "Velvet Matte Lipstick — Rosewood",
    price: 32,
    images: [
      "/images/products/lipstick-1.jpg",
      "/images/products/lipstick-1-alt.jpg",
    ],
    category: "Makeup",
    categorySlug: "makeup",
    shortDescription:
      "A weightless matte lipstick in a universally flattering rosewood shade.",
    description:
      "Rich, buildable colour in a single swipe. Our Velvet Matte formula is enriched with jojoba oil and vitamin E to keep lips comfortable for up to 8 hours without drying. The magnetic cap clicks satisfyingly shut, and the bullet is precision-cut to hug your lip line.",
    ingredients:
      "Isododecane, Dimethicone, Trimethylsiloxysilicate, Simmondsia Chinensis Seed Oil, Tocopheryl Acetate, Silica, Mica, CI 77891, CI 15850, CI 77491.",
    howToUse:
      "Apply directly from the bullet or use a lip brush for precision. Blot with a tissue and reapply for a more intense finish. Pair with our Lip Liner in Spice for a defined look.",
    rating: 4.6,
    reviewCount: 189,
    sizes: [
      { label: "3.5 g", value: "3.5g", inStock: true },
    ],
    inStock: true,
    tags: ["matte", "long-wear", "vegan"],
    isBestseller: true,
  },
  {
    id: "3",
    slug: "botanical-cleansing-oil",
    name: "Botanical Cleansing Oil",
    price: 42,
    images: [
      "/images/products/cleansing-oil-1.jpg",
      "/images/products/cleansing-oil-1-alt.jpg",
    ],
    category: "Skincare",
    categorySlug: "skincare",
    shortDescription:
      "A silky oil-to-milk cleanser that dissolves makeup, SPF, and impurities without stripping.",
    description:
      "This luxurious first-cleanse transforms from a golden oil into a feathery milk on contact with water, lifting away even waterproof mascara. A blend of camellia, jojoba, and sweet almond oils nourishes while you cleanse. Skin feels soft, never tight.",
    ingredients:
      "Caprylic/Capric Triglyceride, Camellia Japonica Seed Oil, Prunus Amygdalus Dulcis Oil, Simmondsia Chinensis Seed Oil, PEG-20 Glyceryl Triisostearate, Tocopherol, Lavandula Angustifolia Oil, Citrus Aurantium Dulcis Peel Oil.",
    howToUse:
      "Pump 2-3 times into dry hands. Massage onto dry face in circular motions for 60 seconds. Add water to emulsify into a milk, then rinse thoroughly. Follow with your water-based cleanser.",
    rating: 4.7,
    reviewCount: 156,
    sizes: [
      { label: "100 ml", value: "100ml", inStock: true },
      { label: "200 ml", value: "200ml", inStock: true },
    ],
    inStock: true,
    tags: ["double-cleanse", "gentle", "oil-cleanser"],
    skinType: ["All Skin Types"],
    concern: ["Dryness", "Sensitivity"],
  },
  {
    id: "4",
    slug: "sun-kissed-bronzer-duo",
    name: "Sun-Kissed Bronzer Duo",
    price: 38,
    images: [
      "/images/products/bronzer-1.jpg",
      "/images/products/bronzer-1-alt.jpg",
    ],
    category: "Makeup",
    categorySlug: "makeup",
    shortDescription:
      "A matte-and-shimmer bronzer duo for a natural sun-kissed warmth.",
    description:
      "Two complementary shades in one compact — a matte contour shade and a luminous highlight bronze. Ultra-finely milled for seamless blending and zero patchiness. Buildable from a subtle warmth to a sculpted holiday glow.",
    ingredients:
      "Talc, Mica, Octyldodecyl Stearoyl Stearate, Zinc Stearate, Dimethicone, Phenoxyethanol, CI 77491, CI 77492, CI 77499, CI 77891, Tin Oxide.",
    howToUse:
      "Using a fluffy bronzer brush, swirl into the matte shade and apply to hollows of cheeks, temples, and jawline. Layer the shimmer shade on high points of the face for a lit-from-within glow.",
    rating: 4.5,
    reviewCount: 98,
    sizes: [
      { label: "12 g", value: "12g", inStock: true },
    ],
    inStock: true,
    tags: ["bronzer", "contour", "glow"],
    isNew: true,
  },
  {
    id: "5",
    slug: "midnight-rose-bath-soak",
    name: "Midnight Rose Bath Soak",
    price: 28,
    images: [
      "/images/products/bath-soak-1.jpg",
      "/images/products/bath-soak-1-alt.jpg",
    ],
    category: "Bath & Body",
    categorySlug: "bath-body",
    shortDescription:
      "A fragrant mineral bath soak with Himalayan pink salt, dried rose petals, and essential oils.",
    description:
      "Transform your bath into a ritual. Himalayan pink salt rich in 84 trace minerals combines with real rose petals, lavender essential oil, and magnesium flakes to melt away tension. The deep floral scent lingers on skin long after you step out.",
    ingredients:
      "Himalayan Pink Salt, Magnesium Chloride Flakes, Rosa Damascena Petals, Lavandula Angustifolia Oil, Rosa Damascena Flower Oil, Tocopherol, Citric Acid.",
    howToUse:
      "Add 2-3 generous scoops to warm running water. Swirl to dissolve. Soak for at least 20 minutes. For an extra treat, follow with our Body Oil.",
    rating: 4.9,
    reviewCount: 312,
    sizes: [
      { label: "250 g", value: "250g", inStock: true },
      { label: "500 g", value: "500g", inStock: true },
    ],
    inStock: true,
    tags: ["bath", "relaxation", "rose"],
    isBestseller: true,
  },
  {
    id: "6",
    slug: "luminous-silk-foundation",
    name: "Luminous Silk Foundation",
    price: 54,
    images: [
      "/images/products/foundation-1.jpg",
      "/images/products/foundation-1-alt.jpg",
    ],
    category: "Makeup",
    categorySlug: "makeup",
    shortDescription:
      "A buildable, skin-like foundation with a natural luminous finish.",
    description:
      "Inspired by silk against skin, this medium-coverage foundation blurs imperfections while letting your natural complexion shine through. Micro-fine pigments and light-reflecting particles create a second-skin effect that wears beautifully for 12 hours.",
    ingredients:
      "Aqua, Cyclopentasiloxane, Glycerin, Dimethicone, PEG-10 Dimethicone, Titanium Dioxide, Iron Oxides, Niacinamide, Hyaluronic Acid, Phenoxyethanol.",
    howToUse:
      "Shake well. Apply 1-2 pumps to the back of your hand. Use a damp beauty sponge or foundation brush to blend from the centre of the face outward. Build coverage where needed.",
    rating: 4.4,
    reviewCount: 167,
    sizes: [
      { label: "30 ml", value: "30ml", inStock: true },
    ],
    inStock: true,
    tags: ["foundation", "luminous", "buildable"],
  },
  {
    id: "7",
    slug: "ceramide-barrier-cream",
    name: "Ceramide Barrier Cream",
    price: 56,
    images: [
      "/images/products/barrier-cream-1.jpg",
      "/images/products/barrier-cream-1-alt.jpg",
    ],
    category: "Skincare",
    categorySlug: "skincare",
    shortDescription:
      "A rich, repairing moisturizer that strengthens the skin barrier with ceramides and peptides.",
    description:
      "A dense yet non-greasy cream formulated with a ceramide complex (ceramide NP, AP, EOP), cholesterol, and signal peptides that mirror the skin's own lipid matrix. Clinically proven to restore barrier function in compromised, sensitized skin within 72 hours.",
    ingredients:
      "Aqua, Cetearyl Alcohol, Glycerin, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Sodium Lauroyl Lactylate, Panthenol, Allantoin, Tocopherol, Xanthan Gum, Carbomer, Phenoxyethanol.",
    howToUse:
      "After serum, scoop a pea-sized amount and warm between palms. Press gently into face and neck. Use AM under SPF and PM as the final step in your routine.",
    rating: 4.7,
    reviewCount: 203,
    sizes: [
      { label: "30 ml", value: "30ml", inStock: true },
      { label: "50 ml", value: "50ml", inStock: true },
    ],
    inStock: true,
    tags: ["moisturizer", "barrier-repair", "ceramides"],
    skinType: ["Dry Skin", "Sensitive Skin"],
    concern: ["Dryness", "Sensitivity", "Redness"],
  },
  {
    id: "8",
    slug: "shea-honey-body-butter",
    name: "Shea & Honey Body Butter",
    price: 34,
    images: [
      "/images/products/body-butter-1.jpg",
      "/images/products/body-butter-1-alt.jpg",
    ],
    category: "Bath & Body",
    categorySlug: "bath-body",
    shortDescription:
      "A deeply nourishing whipped body butter with raw shea and wildflower honey.",
    description:
      "This cloud-like body butter melts on contact and wraps skin in lasting moisture. Raw, unrefined shea butter from Ghana meets New Zealand manuka honey and marula oil. A warm, subtly sweet scent of honeycomb and vanilla rounds out the sensorial experience.",
    ingredients:
      "Butyrospermum Parkii Butter, Sclerocarya Birrea Seed Oil, Mel (Honey), Theobroma Cacao Seed Butter, Cocos Nucifera Oil, Tocopherol, Vanilla Planifolia Fruit Extract, Parfum.",
    howToUse:
      "Scoop a generous amount and massage into damp skin after bathing. Focus on dry areas: elbows, knees, heels. Allow a minute to absorb before dressing.",
    rating: 4.8,
    reviewCount: 276,
    sizes: [
      { label: "150 ml", value: "150ml", inStock: true },
      { label: "300 ml", value: "300ml", inStock: true },
    ],
    inStock: true,
    tags: ["body-care", "moisturizing", "shea"],
    isBestseller: true,
  },
  {
    id: "9",
    slug: "brow-sculpt-pencil",
    name: "Brow Sculpt Pencil",
    price: 24,
    images: [
      "/images/products/brow-pencil-1.jpg",
      "/images/products/brow-pencil-1-alt.jpg",
    ],
    category: "Makeup",
    categorySlug: "makeup",
    shortDescription:
      "An ultra-fine retractable brow pencil that mimics natural hair strokes.",
    description:
      "The micro-tip (1.5 mm) draws realistic hair-like strokes for naturally full brows. A built-in spoolie blends and grooms. Water-resistant formula stays put through workouts and humidity. Available in 6 shades from blonde to espresso.",
    ingredients:
      "Synthetic Fluorphlogopite, Hydrogenated Polyisobutene, Synthetic Wax, Trimethylsiloxysilicate, Silica, Iron Oxides, Mica, Phenoxyethanol.",
    howToUse:
      "Using light, feathery strokes, fill in sparse areas following the direction of natural hair growth. Blend with the built-in spoolie for a seamless finish.",
    rating: 4.3,
    reviewCount: 142,
    sizes: [
      { label: "0.08 g", value: "0.08g", inStock: true },
    ],
    inStock: true,
    tags: ["brows", "pencil", "natural"],
  },
  {
    id: "10",
    slug: "the-essentials-gift-set",
    name: "The Essentials Gift Set",
    price: 120,
    compareAtPrice: 152,
    images: [
      "/images/products/gift-set-1.jpg",
      "/images/products/gift-set-1-alt.jpg",
    ],
    category: "Gifts",
    categorySlug: "gifts",
    shortDescription:
      "A beautifully boxed trio of our bestsellers — the perfect introduction to Ecilak.",
    description:
      "This curated set includes our Radiance Renewal Serum (15 ml), Velvet Matte Lipstick in Rosewood (full size), and Midnight Rose Bath Soak (250 g), presented in a linen-textured gift box with a hand-tied ribbon. A thoughtful gift for someone special — or yourself.",
    ingredients: "See individual product listings for full ingredient lists.",
    howToUse: "See individual product listings for usage instructions.",
    rating: 4.9,
    reviewCount: 87,
    sizes: [
      { label: "One Size", value: "one-size", inStock: true },
    ],
    inStock: true,
    tags: ["gift", "value-set", "bestsellers"],
    isNew: true,
    isBestseller: true,
  },
  {
    id: "11",
    slug: "hyaluronic-acid-toner",
    name: "Hyaluronic Acid Hydrating Toner",
    price: 36,
    images: [
      "/images/products/toner-1.jpg",
      "/images/products/toner-1-alt.jpg",
    ],
    category: "Skincare",
    categorySlug: "skincare",
    shortDescription:
      "A hydrating, alcohol-free toner with three molecular weights of hyaluronic acid.",
    description:
      "This weightless, water-like toner delivers hydration at every level of the skin. Three molecular weights of hyaluronic acid — high, medium, and low — plump, smooth, and deeply hydrate. Beta-glucan and centella asiatica soothe and strengthen. Pat in multiple layers for a glass-skin effect.",
    ingredients:
      "Aqua, Butylene Glycol, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Sodium Hyaluronate Crosspolymer, Beta-Glucan, Centella Asiatica Extract, Panthenol, Allantoin, Glycerin, 1,2-Hexanediol, Ethylhexylglycerin.",
    howToUse:
      "After cleansing, pour a few drops into palms and press into face. Layer 2-3 times for intense hydration. Follow with serum and moisturizer.",
    rating: 4.6,
    reviewCount: 198,
    sizes: [
      { label: "150 ml", value: "150ml", inStock: true },
      { label: "300 ml", value: "300ml", inStock: false },
    ],
    inStock: true,
    tags: ["toner", "hydrating", "hyaluronic-acid"],
    skinType: ["All Skin Types", "Dehydrated Skin"],
    concern: ["Dryness", "Dehydration", "Fine Lines"],
  },
  {
    id: "12",
    slug: "jasmine-neroli-candle",
    name: "Jasmine & Neroli Candle",
    price: 44,
    images: [
      "/images/products/candle-1.jpg",
      "/images/products/candle-1-alt.jpg",
    ],
    category: "Gifts",
    categorySlug: "gifts",
    shortDescription:
      "A hand-poured soy wax candle with notes of jasmine, neroli, and warm sandalwood.",
    description:
      "Slow-burn luxury. Each candle is hand-poured in small batches using 100% natural soy wax and a cotton wick for a clean, even burn of up to 45 hours. The scent opens with bright neroli and bergamot, blooms into jasmine and ylang-ylang, and settles into a warm base of sandalwood and white musk.",
    ingredients:
      "Soy Wax, Cotton Wick, Parfum (Jasmine Grandiflorum Extract, Citrus Aurantium Amara Flower Oil, Santalum Album Oil, Cananga Odorata Flower Oil).",
    howToUse:
      "Trim wick to 5 mm before each use. Allow wax to melt to the edges on the first burn to prevent tunneling. Burn for no more than 4 hours at a time.",
    rating: 4.7,
    reviewCount: 121,
    sizes: [
      { label: "200 g", value: "200g", inStock: true },
    ],
    inStock: true,
    tags: ["candle", "home", "gift"],
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
