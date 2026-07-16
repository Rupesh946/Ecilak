"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useCartDrawerStore } from "@/store/ui";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/shop/skincare", label: "Skincare" },
  { href: "/shop/beauty", label: "Beauty" },
  { href: "/shop/nails", label: "Nails" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.itemCount());
  const openCart = useCartDrawerStore((s) => s.open);
  
  const syncCart = useCartStore((s) => s.syncCart);
  const syncWishlist = useWishlistStore((s) => s.syncWishlist);

  useEffect(() => {
    syncCart();
    syncWishlist();
  }, [syncCart, syncWishlist]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-cream-100/95 backdrop-blur-md shadow-sm py-3"
          : isHome
          ? "bg-transparent py-5"
          : "bg-cream-100 py-4"
      )}
    >
      <div className="container-wide flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="relative z-10"
          aria-label="Ecilak Home"
        >
          <span
            className={cn(
              "font-serif text-2xl md:text-3xl tracking-[0.15em] uppercase transition-colors duration-300",
              scrolled || !isHome ? "text-warm-gray-900" : "text-white"
            )}
          >
            Ecilak
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm tracking-wide uppercase transition-colors duration-300 hover:text-terracotta-400 relative",
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "text-terracotta-400"
                  : scrolled || !isHome
                  ? "text-warm-gray-700"
                  : "text-white/90",
                "after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:bg-terracotta-400 after:transition-all after:duration-300",
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "after:w-full"
                  : "after:w-0 hover:after:w-full"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            className={cn(
              "p-2 rounded-full transition-colors duration-300 hover:bg-warm-gray-900/5",
              scrolled || !isHome ? "text-warm-gray-700" : "text-white/90"
            )}
            aria-label="Search products"
          >
            <Search className="w-5 h-5" />
          </button>

          <Link
            href="/account/wishlist"
            className={cn(
              "p-2 rounded-full transition-colors duration-300 hover:bg-warm-gray-900/5 hidden sm:flex",
              scrolled || !isHome ? "text-warm-gray-700" : "text-white/90"
            )}
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
          </Link>

          <Link
            href="/account"
            className={cn(
              "p-2 rounded-full transition-colors duration-300 hover:bg-warm-gray-900/5 hidden sm:flex",
              scrolled || !isHome ? "text-warm-gray-700" : "text-white/90"
            )}
            aria-label="My account"
          >
            <User className="w-5 h-5" />
          </Link>

          <button
            onClick={openCart}
            className={cn(
              "p-2 rounded-full transition-colors duration-300 hover:bg-warm-gray-900/5 relative",
              scrolled || !isHome ? "text-warm-gray-700" : "text-white/90"
            )}
            aria-label={`Shopping cart with ${itemCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] font-sans font-semibold bg-terracotta-400 text-white border-0 rounded-full animate-scale-in"
              >
                {itemCount > 9 ? "9+" : itemCount}
              </Badge>
            )}
          </button>

          {/* Mobile Menu Button */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className={cn(
                "p-2 rounded-full transition-colors duration-300 hover:bg-warm-gray-900/5 lg:hidden",
                scrolled || !isHome ? "text-warm-gray-700" : "text-white/90"
              )}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-[380px] bg-cream-100 border-l-cream-300 p-0"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-cream-300">
                  <span className="font-serif text-2xl tracking-[0.15em] uppercase text-warm-gray-900">
                    Ecilak
                  </span>
                </div>

                {/* Mobile Nav Links */}
                <nav className="flex-1 p-6" aria-label="Mobile navigation">
                  <ul className="space-y-1">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "block py-3 text-lg font-serif tracking-wide transition-colors duration-200",
                            pathname === link.href
                              ? "text-terracotta-400"
                              : "text-warm-gray-700 hover:text-terracotta-400"
                          )}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t border-cream-300 space-y-4">
                  <Link
                    href="/account"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 text-warm-gray-600 hover:text-terracotta-400 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="text-sm tracking-wide">My Account</span>
                  </Link>
                  <Link
                    href="/account/wishlist"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 text-warm-gray-600 hover:text-terracotta-400 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span className="text-sm tracking-wide">Wishlist</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
