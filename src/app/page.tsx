/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { ArrowRight, Leaf, Sparkles, Recycle, ShieldCheck, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { StarRating } from "@/components/ui/StarRating";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { testimonials } from "@/data/reviews";
import { toast } from "sonner";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>(products.slice(0, 8));

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("/api/products?limit=50");
        if (res.ok) {
          const data = await res.json();
          // Filter products marked as featured, or fallback to first 8 products
          const items = data.products || [];
          const featured = items.filter((p: any) => p.isFeatured);
          if (featured.length > 0) {
            setFeaturedProducts(featured.slice(0, 8));
          } else if (items.length > 0) {
            setFeaturedProducts(items.slice(0, 8));
          }
        }
      } catch (err) {
        console.error("Failed to load featured products:", err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedSection featuredProducts={featuredProducts} />
      <BrandStorySection />
      <TestimonialsSection />
      <InstagramSection />
      <NewsletterSection />
    </>
  );
}

/* ─── HERO ──────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex" aria-label="Hero">
      {/* Left — Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 animate-ken-burns bg-gradient-to-br from-terracotta-200 via-terracotta-100 to-cream-300">
          {/* Decorative shapes */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-terracotta-300/20 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-cream-100/30 blur-2xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-[16rem] text-white/20 select-none leading-none">
              E
            </span>
          </div>
        </div>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cream-100/20" />
      </div>

      {/* Right — Content */}
      <div className="w-full lg:w-1/2 relative flex items-center">
        {/* Mobile background */}
        <div className="absolute inset-0 lg:hidden bg-gradient-to-br from-terracotta-100 via-cream-100 to-cream-200" />

        {/* Decorative watermark letter */}
        <div className="watermark-letter hidden lg:block" aria-hidden="true">
          É
        </div>

        <div className="relative z-10 px-8 md:px-16 lg:px-20 py-32 lg:py-0 max-w-xl">
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-terracotta-400 font-sans font-medium mb-6 animate-fade-in">
            New Collection 2026
          </span>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-warm-gray-900 leading-[1.05] mb-6 animate-fade-in-up">
            Beauty,{" "}
            <span className="italic text-terracotta-400">
              redefined.
            </span>
          </h1>

          <p className="text-warm-gray-600 text-lg md:text-xl font-sans leading-relaxed mb-10 max-w-md animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Clean formulas, luxurious textures, and considered design. 
            Discover skincare and colour that feels as beautiful as it looks.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Link
              href="/shop"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "bg-warm-gray-900 text-cream-50 hover:bg-terracotta-400 transition-colors font-sans text-sm tracking-wide px-8 py-6 rounded-full flex items-center justify-center"
              )}
            >
              Shop Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-warm-gray-300 text-warm-gray-700 hover:border-terracotta-400 hover:text-terracotta-400 font-sans text-sm tracking-wide px-8 py-6 rounded-full flex items-center justify-center"
              )}
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CATEGORIES ────────────────────────────────────────────────────── */
function CategorySection() {
  return (
    <section className="section-padding bg-cream-100" aria-label="Shop by category">
      <div className="container-wide">
        <SectionHeading
          title="Shop by Category"
          subtitle="Explore our curated collections, each crafted with the same commitment to clean beauty and luxurious experience."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURED / BESTSELLERS ────────────────────────────────────────── */
function FeaturedSection({ featuredProducts }: { featuredProducts: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild
      ? (scrollRef.current.firstElementChild as HTMLElement).offsetWidth + 24
      : 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth * 2 : cardWidth * 2,
      behavior: "smooth",
    });
  };

  return (
    <section className="section-padding bg-cream-50" aria-label="Featured products">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <SectionHeading
            title="Bestsellers"
            subtitle="Our most-loved formulas — tried, tested, and treasured."
            align="left"
            className="mb-0"
          />
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="p-2 rounded-full border border-warm-gray-300 text-warm-gray-500 hover:border-terracotta-400 hover:text-terracotta-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="p-2 rounded-full border border-warm-gray-300 text-warm-gray-500 hover:border-terracotta-400 hover:text-terracotta-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: "none" }}
        >
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="snap-start shrink-0 w-[260px] sm:w-[280px] md:w-[300px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/shop"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-warm-gray-300 text-warm-gray-700 hover:border-terracotta-400 hover:text-terracotta-400 font-sans text-sm tracking-wide px-8 rounded-full inline-flex items-center justify-center"
            )}
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── BRAND STORY / VALUE PROPS ─────────────────────────────────────── */
function BrandStorySection() {
  const values = [
    {
      icon: Leaf,
      title: "Clean Beauty",
      description:
        "Every formula is free from parabens, sulfates, and synthetic fragrances. We believe beauty should never compromise your health.",
    },
    {
      icon: Sparkles,
      title: "Cruelty-Free",
      description:
        "We never test on animals — period. Certified by Leaping Bunny. Every product is vegan or clearly labelled.",
    },
    {
      icon: Recycle,
      title: "Sustainable",
      description:
        "Refillable packaging, carbon-neutral shipping, and partnerships with reforestation projects. Beauty that gives back.",
    },
    {
      icon: ShieldCheck,
      title: "7-Day Returns",
      description:
        "Not satisfied? Return any unopened product within 7 days for a full refund — no questions asked. Your satisfaction is our promise.",
    },
  ];

  return (
    <section className="section-padding bg-cream-100" aria-label="Our values">
      <div className="container-wide">
        <SectionHeading
          title="Why Ecilak"
          subtitle="Beauty with purpose. Every choice we make is intentional — from the ingredients we source to the packaging we use."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {values.map((value) => (
            <div key={value.title} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-terracotta-50 text-terracotta-400 mb-6 group-hover:bg-terracotta-100 transition-colors duration-300">
                <value.icon className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl text-warm-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-warm-gray-500 text-sm leading-relaxed font-sans max-w-xs mx-auto">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ──────────────────────────────────────────────────── */
function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="section-padding bg-warm-gray-900 text-cream-100" aria-label="Customer testimonials">
      <div className="container-wide max-w-4xl">
        <SectionHeading
          title="What Our Customers Say"
          className="[&_h2]:text-cream-50 [&_p]:text-warm-gray-400"
        />

        <div className="relative">
          <Quote className="w-10 h-10 text-terracotta-400/30 mb-6 mx-auto" />

          <blockquote className="text-center">
            <p className="font-serif text-xl md:text-2xl text-cream-100 leading-relaxed mb-6 italic">
              &ldquo;{testimonials[current].body}&rdquo;
            </p>
            <footer className="flex flex-col items-center gap-2">
              <StarRating rating={testimonials[current].rating} size="md" />
              <cite className="not-italic">
                <span className="text-sm font-sans font-medium text-cream-200">
                  {testimonials[current].author}
                </span>
                {testimonials[current].verified && (
                  <span className="text-xs text-terracotta-400 font-sans ml-2">
                    Verified Buyer
                  </span>
                )}
              </cite>
            </footer>
          </blockquote>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-terracotta-400 w-6"
                    : "bg-warm-gray-600 hover:bg-warm-gray-500"
                }`}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── INSTAGRAM GALLERY ─────────────────────────────────────────────── */
function InstagramSection() {
  const placeholders = [
    "from-terracotta-100 to-cream-200",
    "from-cream-300 to-terracotta-50",
    "from-terracotta-50 to-cream-300",
    "from-cream-200 to-terracotta-100",
    "from-terracotta-200 to-cream-100",
    "from-cream-100 to-terracotta-200",
  ];

  return (
    <section className="py-16" aria-label="Instagram gallery">
      <div className="container-wide mb-8 text-center">
        <p className="text-sm tracking-[0.2em] uppercase text-warm-gray-400 font-sans">
          @ecilak
        </p>
        <h2 className="font-serif text-3xl text-warm-gray-900 mt-2">
          Follow the Ritual
        </h2>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
        {placeholders.map((gradient, i) => (
          <a
            key={i}
            href="#"
            className="group relative aspect-square overflow-hidden"
            aria-label={`Instagram post ${i + 1}`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-transform duration-500 group-hover:scale-110`}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-warm-gray-900/20">
                <Instagram className="w-6 h-6 text-white" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Instagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/* ─── NEWSLETTER ────────────────────────────────────────────────────── */
function NewsletterSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for subscribing! Check your inbox for a welcome treat.");
  };

  return (
    <section className="section-padding bg-terracotta-50" aria-label="Newsletter signup">
      <div className="container-wide max-w-2xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-warm-gray-900 mb-4">
          A little beauty in your inbox
        </h2>
        <p className="text-warm-gray-500 font-sans mb-8 max-w-md mx-auto">
          New launches, beauty tips, and exclusive offers — delivered with care, never spam.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            required
            className="bg-white border-cream-300 placeholder:text-warm-gray-400 focus-visible:ring-terracotta-400 rounded-full px-5"
            aria-label="Email address"
          />
          <Button
            type="submit"
            className="bg-warm-gray-900 text-cream-50 hover:bg-terracotta-400 font-sans text-sm tracking-wide rounded-full px-8 shrink-0"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
