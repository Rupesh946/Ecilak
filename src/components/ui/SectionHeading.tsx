import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  decorative?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
  decorative = true,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <h2 className="font-serif text-3xl md:text-4xl text-warm-gray-900 tracking-tight">
        {title}
      </h2>
      {decorative && (
        <div
          className={cn(
            "mt-3 h-[1px] w-12 bg-terracotta-400",
            align === "center" ? "mx-auto" : ""
          )}
          aria-hidden="true"
        />
      )}
      {subtitle && (
        <p className="mt-4 text-warm-gray-500 text-base md:text-lg max-w-2xl mx-auto font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
}
