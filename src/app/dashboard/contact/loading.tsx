import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="space-y-12 mx-auto max-w-xl">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>

      {/* FORM CARD */}
      <div className="space-y-8 rounded-lg border p-6">
        {/* INPUTS */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-20 w-full" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-24 w-full" />
        </div>

        {/* EXPERIENCE LIST */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-44" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>

        {/* SKILLS */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-52" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>

        {/* FILE UPLOADS */}
        <div className="space-y-6 border-t pt-6">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-9 w-40 rounded-full" />
          <Skeleton className="h-32 w-32 rounded-full" />
        </div>

        <div className="space-y-6 border-t pt-6">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-10 w-44 rounded-md" />
          <Skeleton className="h-40 w-40 rounded-lg" />
        </div>

        <div className="space-y-6 border-t pt-6">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-9 w-32 rounded-md" />
          <Skeleton className="h-4 w-40" />
        </div>

        {/* ACTION BUTTON */}
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>
    </main>
  );
}
