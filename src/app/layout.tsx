import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { Providers } from "@/components/Providers";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ecilak — Premium Beauty & Skincare",
    template: "%s | Ecilak",
  },
  description:
    "Discover clean, luxurious beauty products crafted with intention. Skincare, makeup, bath & body, and curated gift sets from Ecilak.",
  keywords: [
    "beauty",
    "skincare",
    "makeup",
    "clean beauty",
    "luxury cosmetics",
    "Ecilak",
  ],
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://ecilak.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ecilak",
    title: "Ecilak — Premium Beauty & Skincare",
    description:
      "Discover clean, luxurious beauty products crafted with intention. Skincare, makeup, bath & body, and curated gift sets.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Ecilak — Premium Beauty & Skincare" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecilak — Premium Beauty & Skincare",
    description:
      "Discover clean, luxurious beauty products crafted with intention.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(cormorant.variable, inter.variable)}
    >
      <body className="font-sans antialiased bg-cream-100 text-warm-gray-900 min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
