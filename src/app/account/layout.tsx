"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Package, MapPin, Heart, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const accountLinks = [
  { href: "/account", label: "Dashboard", icon: User },
  { href: "/account/orders", label: "Orders", icon: Package },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/profile", label: "Profile", icon: Settings },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="pt-24 pb-16">
      <div className="container-wide">
        <h1 className="font-serif text-3xl md:text-4xl text-warm-gray-900 mb-10">
          My Account
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Navigation */}
          <aside className="lg:w-56 shrink-0">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {accountLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-sans whitespace-nowrap transition-colors",
                    pathname === link.href
                      ? "bg-terracotta-50 text-terracotta-400 font-medium"
                      : "text-warm-gray-600 hover:bg-cream-200 hover:text-warm-gray-900"
                  )}
                >
                  <link.icon className="w-4 h-4 shrink-0" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
