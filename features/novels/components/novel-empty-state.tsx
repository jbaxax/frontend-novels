import { BookPlus } from "lucide-react"

export function NovelEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-20 text-center">
      <div className="rounded-full bg-muted p-4">
        <BookPlus className="h-8 w-8 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">No tienes novelas todavía</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Crea tu primera novela para empezar a escribir
        </p>
      </div>
    </div>
  )
}
