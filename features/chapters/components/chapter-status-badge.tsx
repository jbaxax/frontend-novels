import { Badge } from "@/components/ui/badge"
import type { ChapterStatus } from "../types/chapter.types"

const statusConfig: Record<ChapterStatus, { label: string; className: string }> = {
  draft: {
    label: "Borrador",
    className: "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400",
  },
  complete: {
    label: "Completo",
    className: "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400",
  },
}

interface ChapterStatusBadgeProps {
  status: ChapterStatus
}

export function ChapterStatusBadge({ status }: ChapterStatusBadgeProps) {
  const { label, className } = statusConfig[status]
  return (
    <Badge variant="secondary" className={className}>
      {label}
    </Badge>
  )
}
