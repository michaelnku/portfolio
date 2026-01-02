import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8 max-w-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>

      {/* Text fields */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Textareas */}
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>

      {/* Experience blocks */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-40" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-10 w-52" />
        <Skeleton className="h-10 w-52" />
      </div>

      {/* Upload sections */}
      <div className="space-y-6 pt-4 border-t">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-32 w-32 rounded-full" />

        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-40 w-full rounded-lg" />

        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-48 rounded-md" />
      </div>

      {/* Submit button */}
      <Skeleton className="h-10 w-40 rounded-md" />
    </div>
  );
}
