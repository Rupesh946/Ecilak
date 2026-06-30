"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, ClipboardList, Tag, LogOut, ArrowLeft } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: ShoppingBag },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/coupons", label: "Coupons", icon: Tag },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Admin Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-cream-50 rounded-2xl p-6 border border-cream-300">
              <div className="mb-6">
                <span className="text-xs tracking-[0.3em] uppercase text-terracotta-400 font-sans font-medium">
                  Management
                </span>
                <h2 className="font-serif text-2xl text-warm-gray-900 mt-1">
                  Admin Panel
                </h2>
              </div>

              <nav className="space-y-1 mb-6">
                {adminLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans transition-colors",
                      pathname === link.href
                        ? "bg-terracotta-50 text-terracotta-600 font-medium"
                        : "text-warm-gray-600 hover:bg-cream-200 hover:text-warm-gray-900"
                    )}
                  >
                    <link.icon className="w-4 h-4 shrink-0" />
                    {link.label}
                  </Link>
                ))}
              </nav>

              <hr className="border-cream-300 my-4" />

              <div className="space-y-1">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans text-warm-gray-500 hover:bg-cream-200 hover:text-warm-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 shrink-0" />
                  Back to Store
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  Log Out
                </button>
              </div>
            </div>
          </aside>

          {/* Admin Content Area */}
          <main className="flex-1 min-w-0 bg-cream-50 rounded-2xl p-6 md:p-8 border border-cream-300 shadow-sm">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
