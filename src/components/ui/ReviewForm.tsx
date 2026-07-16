"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "./button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
  productId: string;
  onSuccess?: () => void;
}

export function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }
    if (comment.trim().length < 5) {
      toast.error("Please write a longer review.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, comment }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit review.");
      }

      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-cream-50 p-6 md:p-8 rounded-2xl border border-cream-200">
      <h3 className="font-serif text-2xl text-warm-gray-900 mb-2">Write a Review</h3>
      <p className="text-warm-gray-500 font-sans text-sm mb-6">
        Share your thoughts with other customers. You must have purchased this product to review it.
      </p>

      <div className="mb-6">
        <label className="block text-sm font-sans text-warm-gray-700 mb-2">Your Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="p-1 transition-colors"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            >
              <Star
                className={cn(
                  "w-8 h-8 transition-colors",
                  (hoverRating || rating) >= star
                    ? "fill-terracotta-400 text-terracotta-400"
                    : "text-cream-300"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-sans text-warm-gray-700 mb-2" htmlFor="comment">
          Your Review
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-warm-gray-900 font-sans focus:outline-none focus:ring-2 focus:ring-terracotta-400 transition-shadow resize-none"
          placeholder="What did you like or dislike? What did you use this product for?"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto bg-warm-gray-900 hover:bg-terracotta-400 text-cream-50 font-sans py-6 px-8 rounded-full transition-colors"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
