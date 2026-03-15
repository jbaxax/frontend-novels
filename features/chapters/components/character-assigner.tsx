"use client"

import { useState } from "react"
import { Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCharactersByNovel } from "@/features/characters/hooks/use-characters"
import { useAssignCharacters } from "../hooks/use-chapters"
import { toast } from "sonner"

interface CharacterAssignerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  chapterId: string
  novelId: string
  assignedIds: string[]
}

export function CharacterAssigner({
  open,
  onOpenChange,
  chapterId,
  novelId,
  assignedIds,
}: CharacterAssignerProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set(assignedIds))
  const { data: characters, isLoading } = useCharactersByNovel(novelId)
  const assign = useAssignCharacters(chapterId)

  function toggleCharacter(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  function handleSave() {
    assign.mutate(Array.from(selected), {
      onSuccess: () => {
        onOpenChange(false)
        toast.success("Personajes actualizados")
      },
      onError: () => toast.error("Error al asignar personajes"),
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (v) setSelected(new Set(assignedIds))
        onOpenChange(v)
      }}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Personajes en este capítulo</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <p className="py-4 text-center text-sm text-muted-foreground">
            Cargando personajes...
          </p>
        ) : characters?.length === 0 ? (
          <p className="py-4 text-center text-sm text-muted-foreground">
            No hay personajes en esta novela todavía.
          </p>
        ) : (
          <ScrollArea className="max-h-72">
            <div className="space-y-3 pr-4">
              {characters?.map((character) => (
                <div key={character.id} className="flex items-center gap-3">
                  <Checkbox
                    id={`char-${character.id}`}
                    checked={selected.has(character.id)}
                    onCheckedChange={() => toggleCharacter(character.id)}
                  />
                  <Label
                    htmlFor={`char-${character.id}`}
                    className="flex cursor-pointer items-center gap-2 font-normal"
                  >
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                    {character.name}
                    <span className="text-xs text-muted-foreground capitalize">
                      ({character.role})
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={assign.isPending}>
            {assign.isPending ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
