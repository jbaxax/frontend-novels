import { ScrollText } from "lucide-react"

export function ChapterEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-20 text-center">
      <div className="rounded-full bg-muted p-4">
        <ScrollText className="h-8 w-8 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">No hay capítulos en este volumen</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Crea el primer capítulo para empezar a escribir
        </p>
      </div>
    </div>
  )
}
