"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VolumeCard } from "./volume-card"
import { VolumeCardSkeleton } from "./volume-card-skeleton"
import { VolumeEmptyState } from "./volume-empty-state"
import { VolumeForm } from "./volume-form"
import { useVolumesByNovel, useCreateVolume } from "../hooks/use-volumes"
import type { VolumeFormValues } from "./volume-form-schema"
import { toast } from "sonner"

interface VolumeListProps {
  novelId: string
}

export function VolumeList({ novelId }: VolumeListProps) {
  const [createOpen, setCreateOpen] = useState(false)

  const { data: volumes, isLoading, isError } = useVolumesByNovel(novelId)
  const createVolume = useCreateVolume(novelId)

  function handleCreate(values: VolumeFormValues) {
    createVolume.mutate(
      { ...values, novelId },
      {
        onSuccess: () => {
          setCreateOpen(false)
          toast.success("Volumen creado")
        },
        onError: () => toast.error("Error al crear el volumen"),
      },
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Volúmenes</h2>
          <p className="text-sm text-muted-foreground">
            Organiza tu novela en tomos
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo volumen
        </Button>
      </div>

      {isError && (
        <p className="text-sm text-destructive">
          Error al cargar los volúmenes. Verifica que el servidor esté corriendo.
        </p>
      )}

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <VolumeCardSkeleton key={i} />
          ))}
        </div>
      ) : volumes?.length === 0 ? (
        <VolumeEmptyState />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {volumes?.map((volume) => (
            <VolumeCard key={volume.id} volume={volume} novelId={novelId} />
          ))}
        </div>
      )}

      <VolumeForm
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
        isPending={createVolume.isPending}
      />
    </div>
  )
}
