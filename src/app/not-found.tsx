import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="pt-24 pb-16 min-h-[80vh] flex items-center justify-center">
      <div className="text-center px-6">
        {/* Decorative 404 */}
        <div className="relative inline-block mb-8">
          <span className="font-serif text-[10rem] md:text-[14rem] leading-none text-cream-200 select-none">
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center font-serif text-[10rem] md:text-[14rem] leading-none text-terracotta-100 select-none translate-x-1 translate-y-1">
            404
          </span>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl text-warm-gray-900 mb-4 -mt-10">
          Page not found
        </h1>
        <p className="text-warm-gray-500 font-sans mb-8 max-w-md mx-auto">
          The page you&apos;re looking for seems to have wandered off.
          Let&apos;s get you back somewhere beautiful.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-warm-gray-900 text-cream-50 hover:bg-terracotta-400 font-sans text-sm px-6 rounded-full gap-2 flex items-center justify-center"
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/shop"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-warm-gray-300 text-warm-gray-600 hover:border-terracotta-400 hover:text-terracotta-400 font-sans text-sm px-6 rounded-full flex items-center justify-center"
            )}
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
