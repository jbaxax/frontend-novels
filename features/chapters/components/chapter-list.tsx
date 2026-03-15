"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChapterRow } from "./chapter-row"
import { ChapterRowSkeleton } from "./chapter-row-skeleton"
import { ChapterEmptyState } from "./chapter-empty-state"
import { ChapterForm } from "./chapter-form"
import { useChaptersByVolume, useCreateChapter } from "../hooks/use-chapters"
import type { ChapterFormValues } from "./chapter-form-schema"
import { toast } from "sonner"

interface ChapterListProps {
  volumeId: string
  novelId: string
}

export function ChapterList({ volumeId, novelId }: ChapterListProps) {
  const [createOpen, setCreateOpen] = useState(false)

  const { data: chapters, isLoading, isError } = useChaptersByVolume(volumeId)
  const createChapter = useCreateChapter(volumeId)

  function handleCreate(values: ChapterFormValues) {
    createChapter.mutate(
      { ...values, volumeId },
      {
        onSuccess: () => {
          setCreateOpen(false)
          toast.success("Capítulo creado")
        },
        onError: () => toast.error("Error al crear el capítulo"),
      },
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Capítulos</h2>
          <p className="text-sm text-muted-foreground">
            Los capítulos de este volumen
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo capítulo
        </Button>
      </div>

      {isError && (
        <p className="text-sm text-destructive">
          Error al cargar los capítulos. Verifica que el servidor esté corriendo.
        </p>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <ChapterRowSkeleton key={i} />
          ))}
        </div>
      ) : chapters?.length === 0 ? (
        <ChapterEmptyState />
      ) : (
        <div className="space-y-2">
          {chapters?.map((chapter) => (
            <ChapterRow key={chapter.id} chapter={chapter} novelId={novelId} />
          ))}
        </div>
      )}

      <ChapterForm
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
        isPending={createChapter.isPending}
      />
    </div>
  )
}
