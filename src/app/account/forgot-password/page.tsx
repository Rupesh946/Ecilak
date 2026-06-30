"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Recovery instructions sent to your email!");
    }, 1500);
  };

  return (
    <div className="pt-24 pb-16 min-h-[85vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-cream-50 rounded-2xl p-8 border border-cream-300 shadow-sm mx-4">
        {/* Back Link */}
        <Link
          href="/account/login"
          className="inline-flex items-center gap-2 text-xs font-sans text-warm-gray-400 hover:text-terracotta-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Login
        </Link>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-warm-gray-900 mb-2">Reset Password</h1>
          <p className="text-sm text-warm-gray-500 font-sans">
            Enter your email address and we&apos;ll send you instructions to reset your password.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-warm-gray-900 mb-2">Check Your Email</h3>
            <p className="text-sm text-warm-gray-500 font-sans leading-relaxed mb-6">
              We&apos;ve sent password reset instructions to <strong>{email}</strong>.
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              variant="outline"
              className="border-warm-gray-300 text-warm-gray-600 font-sans rounded-xl"
            >
              Resend Email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="forgotEmail" className="text-sm font-sans text-warm-gray-600">
                Email Address
              </Label>
              <div className="relative mt-1">
                <Input
                  id="forgotEmail"
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

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-warm-gray-900 hover:bg-terracotta-400 text-cream-50 font-sans tracking-wide py-6 rounded-xl gap-2 mt-4 transition-colors"
            >
              {loading ? "Sending..." : "Send Reset Link"}
              <Send className="w-4 h-4" />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
