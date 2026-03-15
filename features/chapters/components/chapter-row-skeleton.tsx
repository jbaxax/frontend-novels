import { Skeleton } from "@/components/ui/skeleton"

export function ChapterRowSkeleton() {
  return (
    <div className="flex items-start gap-4 rounded-lg border p-4">
      <Skeleton className="mt-0.5 h-5 w-8" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  )
}
