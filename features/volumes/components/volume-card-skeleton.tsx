import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function VolumeCardSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-5 w-2/3" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-2 pb-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </CardContent>
      <CardFooter className="pt-2">
        <Skeleton className="h-8 w-full" />
      </CardFooter>
    </Card>
  )
}
