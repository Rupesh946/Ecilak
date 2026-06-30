"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to register. Please try again.");
        toast.error(data.error || "Registration failed");
      } else {
        toast.success("Account created successfully! Logging you in...");

        // Auto sign in user
        const loginRes = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (loginRes?.error) {
          router.push("/account/login");
        } else {
          router.push("/account");
          router.refresh();
        }
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-[85vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-cream-50 rounded-2xl p-8 border border-cream-300 shadow-sm mx-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-warm-gray-900 mb-2">Create Account</h1>
          <p className="text-sm text-warm-gray-500 font-sans">
            Register to save items, track deliveries, and checkout faster.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 text-red-600 rounded-xl p-4 flex items-start gap-3 text-sm font-sans mb-6">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="registerName" className="text-sm font-sans text-warm-gray-600">
              Full Name
            </Label>
            <div className="relative mt-1">
              <Input
                id="registerName"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="bg-white border-cream-300 pl-10"
              />
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
            </div>
          </div>

          <div>
            <Label htmlFor="registerEmail" className="text-sm font-sans text-warm-gray-600">
              Email Address
            </Label>
            <div className="relative mt-1">
              <Input
                id="registerEmail"
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
            <Label htmlFor="registerPassword" className="text-sm font-sans text-warm-gray-600">
              Password
            </Label>
            <div className="relative mt-1">
              <Input
                id="registerPassword"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="bg-white border-cream-300 pl-10"
              />
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-warm-gray-900 hover:bg-terracotta-400 text-cream-50 font-sans tracking-wide py-6 rounded-xl gap-2 mt-4 transition-colors"
          >
            {loading ? "Creating Account..." : "Create Account"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* Link to Login */}
        <p className="text-center text-sm font-sans text-warm-gray-500 mt-8">
          Already have an account?{" "}
          <Link href="/account/login" className="text-terracotta-400 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
