import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="pt-24 pb-16">
      <div className="container-wide">
        {/* Header skeleton */}
        <div className="flex flex-col items-center mb-12">
          <Skeleton className="h-10 w-64 bg-cream-200 rounded mb-3" />
          <Skeleton className="h-4 w-96 bg-cream-200 rounded" />
        </div>

        {/* Product grid skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[3/4] rounded-2xl bg-cream-200" />
              <div className="space-y-2 px-1">
                <Skeleton className="h-3 w-16 bg-cream-200 rounded" />
                <Skeleton className="h-5 w-3/4 bg-cream-200 rounded" />
                <Skeleton className="h-4 w-1/3 bg-cream-200 rounded" />
                <Skeleton className="h-3 w-24 bg-cream-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
