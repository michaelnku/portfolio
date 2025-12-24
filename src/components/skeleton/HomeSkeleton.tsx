"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function HomeSkeleton() {
  return (
    <main
      className="
        space-y-10
        min-h-[160vh]
        sm:min-h-[140vh]
        md:min-h-[120vh]
        lg:min-h-[110vh]
      "
    >
      {/* Banner */}
      <Skeleton className="h-40 sm:h-48 md:h-56 w-full rounded-lg" />

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-16 sm:h-20 rounded-lg ring-1 ring-[var(--brand-blue)]/5"
          />
        ))}
      </div>

      {/* Product Rows */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, j) => (
            <Skeleton
              key={j}
              className="
                h-52
                sm:h-56
                md:h-60
                rounded-xl
                ring-1 ring-[var(--brand-blue)]/5
              "
            />
          ))}
        </div>
      ))}
    </main>
  );
}
