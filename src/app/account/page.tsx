import Link from "next/link";
import { Package, MapPin, Heart, Settings, ArrowRight } from "lucide-react";

const quickLinks = [
  {
    href: "/account/orders",
    label: "Orders",
    description: "Track your orders and view history",
    icon: Package,
  },
  {
    href: "/account/addresses",
    label: "Addresses",
    description: "Manage your saved addresses",
    icon: MapPin,
  },
  {
    href: "/account/wishlist",
    label: "Wishlist",
    description: "View your saved items",
    icon: Heart,
  },
  {
    href: "/account/profile",
    label: "Profile",
    description: "Update your personal information",
    icon: Settings,
  },
];

export default function AccountDashboard() {
  return (
    <div>
      <div className="bg-cream-50 rounded-2xl p-8 mb-8">
        <h2 className="font-serif text-2xl text-warm-gray-900 mb-2">
          Welcome back
        </h2>
        <p className="text-warm-gray-500 font-sans">
          Manage your account, track orders, and update your preferences.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center gap-4 bg-cream-50 rounded-2xl p-6 hover:bg-terracotta-50/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-cream-200 flex items-center justify-center text-warm-gray-500 group-hover:bg-terracotta-100 group-hover:text-terracotta-400 transition-colors">
              <link.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-serif text-lg text-warm-gray-900">
                {link.label}
              </p>
              <p className="text-sm text-warm-gray-400 font-sans">
                {link.description}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-warm-gray-400 group-hover:text-terracotta-400 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
