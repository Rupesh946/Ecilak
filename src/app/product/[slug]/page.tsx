/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Heart, ShoppingBag, ChevronRight, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { StarRating } from "@/components/ui/StarRating";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { ReviewForm } from "@/components/ui/ReviewForm";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useCartDrawerStore } from "@/store/ui";
import { formatPrice, cn } from "@/lib/utils";
import { toast } from "sonner";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { getReviewsByProduct } from "@/data/reviews";

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const [product, setProduct] = useState<any | null>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      let productData: any = null;

      // Try API (database) first
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (res.ok) {
          productData = await res.json();
        }
      } catch (err) {
        console.warn("API unavailable, trying local data:", err);
      }

      // Fallback to local static data
      if (!productData) {
        const localProduct = getProductBySlug(slug);
        if (localProduct) {
          const localReviews = getReviewsByProduct(localProduct.id);
          productData = {
            ...localProduct,
            stockQuantity: 100,
            sku: `ECL-${localProduct.id}`,
            variants: localProduct.sizes.map((s, i) => ({
              id: `var-${localProduct.id}-${i}`,
              value: s.value,
              label: s.label,
              inStock: s.inStock,
              priceOverride: null,
              name: s.label,
            })),
            reviews: localReviews.map(r => ({
              id: r.id,
              rating: r.rating,
              title: r.title,
              body: r.body,
              author: r.author,
              date: r.date,
              verified: r.verified,
            })),
          };
        }
      }

      if (productData) {
        setProduct(productData);

        // Get related products
        try {
          if (productData.categorySlug) {
            const relatedRes = await fetch(`/api/products?category=${productData.categorySlug}&limit=4`);
            if (relatedRes.ok) {
              const relatedData = await relatedRes.json();
              setRelated(relatedData.products.filter((p: any) => p.slug !== slug));
            } else {
              throw new Error("API failed");
            }
          }
        } catch {
          // Fallback related products from local data
          const localProduct = getProductBySlug(slug);
          if (localProduct) {
            setRelated(getRelatedProducts(localProduct, 4));
          }
        }
      }

      setLoading(false);
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex flex-col items-center justify-center min-h-[60vh] font-sans">
        <Loader2 className="w-10 h-10 text-terracotta-400 animate-spin mb-4" />
        <p className="text-warm-gray-500">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center font-sans max-w-md mx-auto">
        <h2 className="font-serif text-2xl text-warm-gray-900 mb-4">Product Not Found</h2>
        <p className="text-warm-gray-500 mb-6">The product you are looking for does not exist or has been removed.</p>
        <Link
          href="/shop"
          className="inline-flex justify-center bg-warm-gray-900 text-cream-50 px-6 py-3 rounded-full hover:bg-terracotta-400 transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return <ProductDetail product={product} related={related} />;
}

function ProductDetail({
  product,
  related,
}: {
  product: any;
  related: any[];
}) {
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.find((s: any) => s.inStock)?.value || product.sizes[0]?.value || "Standard"
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartDrawerStore((s) => s.open);
  const toggle = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));

  const matchedVariant = product.variants.find((v: any) => v.label === selectedSize);

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        variantId: matchedVariant?.id || product.variants[0]?.id,
        slug: product.slug,
        name: product.name,
        price: matchedVariant?.priceOverride || product.price,
        image: product.images[0],
        size: selectedSize,
      },
      quantity
    );
    toast.success(`${product.name} added to cart`);
    openCart();
  };

  // Build JSON-LD structured data for this product
  const jsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.images,
        sku: product.sku,
        brand: { "@type": "Brand", name: "Ecilak" },
        category: product.category,
        offers: {
          "@type": "Offer",
          url: `${typeof window !== "undefined" ? window.location.origin : ""}/product/${product.slug}`,
          priceCurrency: "INR",
          price: product.price,
          availability:
            product.stockQuantity > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
        },
        ...(product.reviews?.length > 0 && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: (
              product.reviews.reduce((s: number, r: any) => s + r.rating, 0) /
              product.reviews.length
            ).toFixed(1),
            reviewCount: product.reviews.length,
          },
        }),
      }
    : null;

  return (
    <div className="pt-24 pb-16">
      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <div className="container-wide">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-sans text-warm-gray-400 mb-8">
          <Link href="/" className="hover:text-terracotta-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-terracotta-400 transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            href={`/shop`}
            className="hover:text-terracotta-400 transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-warm-gray-700 truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Product Details Section */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Images Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-terracotta-100 via-cream-200 to-terracotta-50 overflow-hidden relative border border-cream-300">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "aspect-square rounded-xl overflow-hidden border bg-cream-50 relative",
                      selectedImage === i ? "border-terracotta-400" : "border-cream-300"
                    )}
                  >
                    <Image src={img} alt="" fill sizes="25vw" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Details */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-terracotta-400 font-sans font-medium">
                {product.category}
              </span>
              <h1 className="font-serif text-3xl lg:text-4xl text-warm-gray-900 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 pt-1">
                <StarRating rating={product.rating} />
                <span className="text-xs text-warm-gray-400 font-sans">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-sans text-2xl font-semibold text-warm-gray-900">
                {formatPrice(matchedVariant?.priceOverride || product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="font-sans text-base text-warm-gray-400 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <p className="text-sm font-sans text-warm-gray-600 leading-relaxed">
              {product.description}
            </p>

            <Separator className="bg-cream-300" />

            {/* Sizes Selection */}
            {product.sizes.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-sans text-warm-gray-600">Option / Size</Label>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((size: any) => (
                    <button
                      key={size.value}
                      disabled={!size.inStock}
                      onClick={() => setSelectedSize(size.value)}
                      className={cn(
                        "px-4 py-2 text-xs font-sans rounded-full border transition-all",
                        selectedSize === size.value
                          ? "border-warm-gray-900 bg-warm-gray-900 text-cream-50"
                          : size.inStock
                          ? "border-cream-300 bg-white text-warm-gray-700 hover:border-warm-gray-600"
                          : "border-cream-200 bg-cream-100 text-warm-gray-300 cursor-not-allowed line-through"
                      )}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Actions */}
            <div className="flex gap-4 pt-2">
              <div className="flex items-center border border-cream-300 rounded-full bg-white px-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="rounded-full hover:bg-cream-100"
                >
                  <Minus className="w-3.5 h-3.5" />
                </Button>
                <span className="w-8 text-center font-sans text-sm font-medium text-warm-gray-800">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="rounded-full hover:bg-cream-100"
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-warm-gray-900 hover:bg-terracotta-400 text-cream-50 font-sans tracking-wide py-6 rounded-full gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                {product.inStock ? "Add to Bag" : "Out of Stock"}
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => toggle(product.id)}
                className={cn(
                  "rounded-full p-6 border-cream-300 hover:bg-cream-200 hover:border-warm-gray-400 transition-colors",
                  isWishlisted && "text-terracotta-400 border-terracotta-100 bg-terracotta-50/50"
                )}
              >
                <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
              </Button>
            </div>
          </div>
        </div>

        {/* Detail Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="bg-cream-200/50 w-full justify-start p-1 border border-cream-300 rounded-xl max-w-md">
              <TabsTrigger
                value="details"
                className="flex-1 font-sans text-xs py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-warm-gray-900"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="ingredients"
                className="flex-1 font-sans text-xs py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-warm-gray-900"
              >
                Ingredients
              </TabsTrigger>
              <TabsTrigger
                value="usage"
                className="flex-1 font-sans text-xs py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-warm-gray-900"
              >
                How to Use
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6 text-sm font-sans text-warm-gray-600 leading-relaxed max-w-3xl">
              {product.description}
            </TabsContent>
            <TabsContent value="ingredients" className="mt-6 text-sm font-sans text-warm-gray-600 leading-relaxed max-w-3xl">
              {product.ingredients}
            </TabsContent>
            <TabsContent value="usage" className="mt-6 text-sm font-sans text-warm-gray-600 leading-relaxed max-w-3xl">
              {product.howToUse}
            </TabsContent>
          </Tabs>
        </div>

        {/* Reviews Section */}
        <div className="mb-16 border-t border-cream-300 pt-16">
          <h2 className="font-serif text-2xl text-warm-gray-900 mb-8">
            Customer Reviews
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Reviews Summary & Form */}
            <div className="flex flex-col gap-6 self-start">
              <div className="bg-cream-50 p-6 rounded-2xl border border-cream-300">
                <h3 className="font-serif text-3xl text-warm-gray-900 mb-1">
                  {product.rating.toFixed(1)}
                </h3>
                <StarRating rating={product.rating} />
                <p className="text-xs text-warm-gray-400 font-sans mt-2">
                  Based on {product.reviewCount} verified buyer reviews
                </p>
              </div>
              <ReviewForm productId={product.id} onSuccess={() => window.location.reload()} />
            </div>

            {/* Reviews List */}
            <div className="md:col-span-2 space-y-6">
              {product.reviews.length === 0 ? (
                <p className="text-sm font-sans text-warm-gray-400">
                  No reviews submitted yet for this product. Be the first to share your thoughts!
                </p>
              ) : (
                product.reviews.map((rev: any) => (
                  <div key={rev.id} className="border-b border-cream-200 pb-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cream-300 flex items-center justify-center">
                        <User className="w-4 h-4 text-warm-gray-600" />
                      </div>
                      <div>
                        <span className="text-sm font-sans font-medium text-warm-gray-900 block">
                          {rev.author}
                        </span>
                        <span className="text-xs text-warm-gray-400 font-sans">
                          {new Date(rev.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <StarRating rating={rev.rating} />
                    <p className="text-sm font-sans font-bold text-warm-gray-900">{rev.title}</p>
                    <p className="text-sm font-sans text-warm-gray-600 leading-relaxed">{rev.body}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Related Products Carousel */}
        {related.length > 0 && (
          <div className="border-t border-cream-300 pt-16">
            <SectionHeading
              subtitle="Recommended for You"
              title="Related Products"
              align="left"
              className="mb-8"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((item: any) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
