export interface Review {
  id: string;
  productId?: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  helpful: number;
}

export const testimonials: Review[] = [
  {
    id: "t1",
    author: "Amara L.",
    rating: 5,
    date: "2026-05-12",
    title: "My skin has never looked this good",
    body: "I've tried countless serums but the Radiance Renewal Serum genuinely transformed my dull, tired skin in under three weeks. I wake up glowing. The texture is beautiful — absorbs instantly, layers perfectly under makeup. Worth every penny.",
    verified: true,
    helpful: 42,
  },
  {
    id: "t2",
    author: "Sophie R.",
    rating: 5,
    date: "2026-04-28",
    title: "Packaging is gorgeous, products even better",
    body: "Ordered the Essentials Gift Set for my sister and ended up buying one for myself. The linen box, the ribbon, the subtle fragrance when you open it — everything feels so intentional. The products inside are truly beautiful quality.",
    verified: true,
    helpful: 38,
  },
  {
    id: "t3",
    author: "Elena M.",
    rating: 5,
    date: "2026-06-01",
    title: "Finally, a clean brand that actually works",
    body: "I'm very particular about ingredients and efficacy. Ecilak manages to be genuinely clean without compromising on results. The Ceramide Barrier Cream saved my skin after a retinol purge — calmed everything down overnight.",
    verified: true,
    helpful: 31,
  },
  {
    id: "t4",
    author: "Priya K.",
    rating: 4,
    date: "2026-05-22",
    title: "Bath soak is pure luxury",
    body: "The Midnight Rose Bath Soak makes my bathroom feel like a spa. The scent is intoxicating but not overwhelming — real rose, not synthetic. I light the Jasmine & Neroli Candle alongside it. Total bliss after a long day.",
    verified: true,
    helpful: 27,
  },
];

export const productReviews: Review[] = [
  {
    id: "r1",
    productId: "1",
    author: "Jessica T.",
    rating: 5,
    date: "2026-06-15",
    title: "Holy grail serum",
    body: "I've been using this for 6 weeks and the difference is remarkable. My dark spots are fading and my skin has a natural glow I haven't seen in years. The dropper dispenses the perfect amount.",
    verified: true,
    helpful: 15,
  },
  {
    id: "r2",
    productId: "1",
    author: "Maria G.",
    rating: 5,
    date: "2026-06-02",
    title: "Lightweight and effective",
    body: "Love that this doesn't pill under makeup. It's genuinely lightweight — not sticky, not heavy. My skin drinks it up. Already on my second bottle.",
    verified: true,
    helpful: 12,
  },
  {
    id: "r3",
    productId: "1",
    author: "Danielle W.",
    rating: 4,
    date: "2026-05-18",
    title: "Great but wish the 50ml was in stock",
    body: "The serum itself is gorgeous — lovely texture, subtle scent, visible results. Only knock is the 50ml is always sold out. The 30ml doesn't last long when you use it morning and night.",
    verified: true,
    helpful: 8,
  },
  {
    id: "r4",
    productId: "2",
    author: "Aisha N.",
    rating: 5,
    date: "2026-05-30",
    title: "The perfect everyday lip",
    body: "Rosewood is the most universally flattering shade I've found. Matte but comfortable, lasts through coffee and lunch without looking patchy. The magnetic cap is a satisfying little detail.",
    verified: true,
    helpful: 19,
  },
  {
    id: "r5",
    productId: "5",
    author: "Lauren H.",
    rating: 5,
    date: "2026-06-10",
    title: "Smells divine",
    body: "The real rose petals floating in the bath — it's such a beautiful moment. And the mineral salts leave my skin feeling incredibly soft. This has become my Friday night ritual.",
    verified: true,
    helpful: 22,
  },
];

export function getReviewsByProduct(productId: string): Review[] {
  return productReviews.filter((r) => r.productId === productId);
}
