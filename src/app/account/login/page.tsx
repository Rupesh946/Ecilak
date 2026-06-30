"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
        toast.error(res.error);
      } else {
        toast.success("Welcome back!");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl });
  };

  return (
    <div className="pt-24 pb-16 min-h-[85vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-cream-50 rounded-2xl p-8 border border-cream-300 shadow-sm mx-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-warm-gray-900 mb-2">Welcome Back</h1>
          <p className="text-sm text-warm-gray-500 font-sans">
            Log in to manage your orders, wishlist, and profile.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 text-red-600 rounded-xl p-4 flex items-start gap-3 text-sm font-sans mb-6">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleCredentialsSubmit} className="space-y-5 mb-6">
          <div>
            <Label htmlFor="loginEmail" className="text-sm font-sans text-warm-gray-600">
              Email Address
            </Label>
            <div className="relative mt-1">
              <Input
                id="loginEmail"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-white border-cream-300 pl-10"
              />
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <Label htmlFor="loginPassword" className="text-sm font-sans text-warm-gray-600">
                Password
              </Label>
              <Link
                href="/account/forgot-password"
                className="text-xs font-sans text-terracotta-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative mt-1">
              <Input
                id="loginPassword"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white border-cream-300 pl-10"
              />
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-warm-gray-900 hover:bg-terracotta-400 text-cream-50 font-sans tracking-wide py-6 rounded-xl gap-2 mt-2 transition-colors"
          >
            {loading ? "Logging in..." : "Log In"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="flex items-center gap-3 mb-6">
          <span className="h-[1px] bg-cream-300 flex-1"></span>
          <span className="text-xs text-warm-gray-400 font-sans uppercase tracking-widest">or</span>
          <span className="h-[1px] bg-cream-300 flex-1"></span>
        </div>

        {/* Social Auth */}
        <Button
          onClick={handleGoogleSignIn}
          variant="outline"
          className="w-full border-warm-gray-300 text-warm-gray-700 hover:bg-cream-200 font-sans rounded-xl py-6 gap-2"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5.04c1.62 0 3.08.56 4.22 1.64l3.15-3.15C17.45 1.84 14.97 1 12 1 7.37 1 3.4 3.66 1.39 7.56l3.87 3C6.18 7.43 8.85 5.04 12 5.04z"
            />
            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.81-.07-1.59-.2-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.74 2.9c2.18-2.01 3.68-4.97 3.68-8.72z"
            />
            <path
              fill="#FBBC05"
              d="M5.26 14.12c-.24-.72-.38-1.5-.38-2.3s.14-1.58.38-2.3L1.39 6.52C.5 8.32 0 10.31 0 12.4s.5 4.08 1.39 5.88l3.87-3z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.74-2.9c-1.1.74-2.51 1.18-4.22 1.18-3.15 0-5.82-2.39-6.74-5.52L1.39 15.4C3.4 19.3 7.37 22 12 22z"
            />
          </svg>
          Continue with Google
        </Button>

        {/* Link to Register */}
        <p className="text-center text-sm font-sans text-warm-gray-500 mt-8">
          Don&apos;t have an account?{" "}
          <Link href="/account/register" className="text-terracotta-400 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
