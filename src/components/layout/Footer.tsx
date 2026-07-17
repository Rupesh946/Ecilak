"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {
  Mail,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="9.7 15 15.2 12 9.7 9 9.7 15" fill="currentColor" />
  </svg>
);

const shopLinks = [
  { href: "/shop", label: "All Products" },
  { href: "/shop/skincare", label: "Skincare" },
  { href: "/shop/beauty", label: "Beauty" },
  { href: "/shop/nails", label: "Nails" },
];

const helpLinks = [
  { href: "/contact", label: "Contact Us" },
  { href: "/refund", label: "Refund Policy" },
  { href: "/returns", label: "Return Policy" },
  { href: "/shipping", label: "Shipping Policy" },
  { href: "/terms", label: "Terms and Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
];

const aboutLinks = [
  { href: "/about", label: "Our Story" },
  { href: "/about#sustainability", label: "Sustainability" },
  { href: "/about#ingredients", label: "Ingredients" },
];

const socialLinks = [
  { href: "#", label: "Instagram", icon: InstagramIcon },
  { href: "#", label: "Twitter", icon: TwitterIcon },
  { href: "#", label: "Facebook", icon: FacebookIcon },
  { href: "#", label: "YouTube", icon: YoutubeIcon },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Subscription failed");

      toast.success("Welcome to the Ecilak world!");
      setEmail("");
    } catch {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-warm-gray-900 text-cream-200">
      {/* Newsletter Band */}
      <div className="border-b border-warm-gray-800">
        <div className="container-wide py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-2xl md:text-3xl text-cream-50 mb-2">
              Join the Ecilak world
            </h3>
            <p className="text-warm-gray-400 text-sm max-w-md">
              Be the first to know about new launches, exclusive offers, and beauty rituals.
            </p>
          </div>
          <form
            className="flex w-full max-w-md gap-2"
            onSubmit={handleSubscribe}
            aria-label="Newsletter signup"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="bg-warm-gray-800 border-warm-gray-700 text-cream-100 placeholder:text-warm-gray-500 focus-visible:ring-terracotta-400"
              required
              disabled={isLoading}
              aria-label="Email address for newsletter"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-terracotta-400 hover:bg-terracotta-500 text-white px-6 shrink-0"
            >
              <ArrowRight className="w-4 h-4" />
              <span className="sr-only">Subscribe</span>
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Shop */}
          <div>
            <h4 className="font-serif text-lg text-cream-50 mb-4 tracking-wide">
              Shop
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-gray-400 hover:text-terracotta-300 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-serif text-lg text-cream-50 mb-4 tracking-wide">
              Help
            </h4>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-gray-400 hover:text-terracotta-300 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-serif text-lg text-cream-50 mb-4 tracking-wide">
              About
            </h4>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-gray-400 hover:text-terracotta-300 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-serif text-lg text-cream-50 mb-4 tracking-wide">
              Connect
            </h4>
            <div className="flex items-center gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-full bg-warm-gray-800 text-warm-gray-400 hover:bg-terracotta-400 hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <a
              href="mailto:ecilakbusiness@gmail.com"
              className="flex items-center gap-2 text-sm text-warm-gray-400 hover:text-terracotta-300 transition-colors"
            >
              <Mail className="w-4 h-4" />
              ecilakbusiness@gmail.com
            </a>
          </div>
        </div>
      </div>

      <Separator className="bg-warm-gray-800" />

      {/* Bottom Bar */}
      <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-warm-gray-500">
          © {new Date().getFullYear()} Ecilak. All rights reserved.
        </p>

        {/* Payment Methods */}
        <div className="flex items-center gap-3">
          {["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"].map(
            (method) => (
              <span
                key={method}
                className="text-[10px] tracking-wider uppercase text-warm-gray-500 bg-warm-gray-800 px-2 py-1 rounded"
              >
                {method}
              </span>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
