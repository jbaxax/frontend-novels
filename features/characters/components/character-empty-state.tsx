import { Users } from "lucide-react"

export function CharacterEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-20 text-center">
      <div className="rounded-full bg-muted p-4">
        <Users className="h-8 w-8 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">No hay personajes todavía</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Crea los personajes de tu novela para luego asignarlos a capítulos
        </p>
      </div>
    </div>
  )
}
