"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg space-y-6">
        {/* Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-terracotta-100 flex items-center justify-center">
          <AlertTriangle className="h-10 w-10 text-terracotta-500" />
        </div>

        {/* Heading */}
        <h1 className="font-serif text-4xl text-warm-gray-900">
          Something went wrong
        </h1>

        {/* Description */}
        <p className="text-warm-gray-500 font-sans leading-relaxed">
          We&apos;re sorry — an unexpected error occurred. Please try again, or
          return to the homepage.
        </p>

        {/* Error digest for debugging */}
        {error.digest && (
          <p className="text-xs text-warm-gray-400 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button
            onClick={reset}
            className="bg-terracotta-400 hover:bg-terracotta-500 text-white rounded-full px-8"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full px-8 border-cream-300"
            )}
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
