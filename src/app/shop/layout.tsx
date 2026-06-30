import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse our full collection of clean, luxurious beauty products. Filter by category, price, and more. Free shipping on orders over ₹999.",
  openGraph: {
    title: "Shop All Products — Ecilak",
    description:
      "Browse our full collection of clean, luxurious beauty products.",
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
