"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CharacterCard } from "./character-card"
import { CharacterCardSkeleton } from "./character-card-skeleton"
import { CharacterEmptyState } from "./character-empty-state"
import { CharacterForm } from "./character-form"
import { useCharactersByNovel, useCreateCharacter } from "../hooks/use-characters"
import type { CharacterFormValues } from "./character-form-schema"
import { toast } from "sonner"

interface CharacterListProps {
  novelId: string
}

export function CharacterList({ novelId }: CharacterListProps) {
  const [createOpen, setCreateOpen] = useState(false)

  const { data: characters, isLoading, isError } = useCharactersByNovel(novelId)
  const createCharacter = useCreateCharacter(novelId)

  function handleCreate(values: CharacterFormValues) {
    createCharacter.mutate(
      { ...values, novelId },
      {
        onSuccess: () => {
          setCreateOpen(false)
          toast.success("Personaje creado")
        },
        onError: () => toast.error("Error al crear el personaje"),
      },
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Personajes</h2>
          <p className="text-sm text-muted-foreground">
            Los personajes de tu novela
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo personaje
        </Button>
      </div>

      {isError && (
        <p className="text-sm text-destructive">
          Error al cargar los personajes. Verifica que el servidor esté corriendo.
        </p>
      )}

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CharacterCardSkeleton key={i} />
          ))}
        </div>
      ) : characters?.length === 0 ? (
        <CharacterEmptyState />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {characters?.map((character) => (
            <CharacterCard key={character.id} character={character} novelId={novelId} />
          ))}
        </div>
      )}

      <CharacterForm
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
        isPending={createCharacter.isPending}
      />
    </div>
  )
}
