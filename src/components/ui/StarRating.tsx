import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

export function StarRating({
  rating,
  maxStars = 5,
  size = "sm",
  showValue = false,
  reviewCount,
  className,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const roundedUp = rating % 1 >= 0.75;

  for (let i = 0; i < maxStars; i++) {
    if (i < fullStars || (roundedUp && i === fullStars)) {
      stars.push(
        <Star
          key={i}
          className={cn(sizeClasses[size], "fill-terracotta-400 text-terracotta-400")}
          aria-hidden="true"
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <StarHalf
          key={i}
          className={cn(sizeClasses[size], "fill-terracotta-400 text-terracotta-400")}
          aria-hidden="true"
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          className={cn(sizeClasses[size], "text-warm-gray-300")}
          aria-hidden="true"
        />
      );
    }
  }

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="img"
      aria-label={`${rating} out of ${maxStars} stars${reviewCount ? `, ${reviewCount} reviews` : ""}`}
    >
      <div className="flex items-center gap-0.5">{stars}</div>
      {showValue && (
        <span className="text-sm text-warm-gray-500 font-sans ml-1">{rating}</span>
      )}
      {reviewCount !== undefined && (
        <span className="text-sm text-warm-gray-400 font-sans ml-1">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
