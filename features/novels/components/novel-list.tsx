"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NovelCard } from "./novel-card"
import { NovelCardSkeleton } from "./novel-card-skeleton"
import { NovelEmptyState } from "./novel-empty-state"
import { NovelForm } from "./novel-form"
import { useNovels, useCreateNovel } from "../hooks/use-novels"
import type { NovelFormValues } from "./novel-form-schema"
import { toast } from "sonner"

export function NovelList() {
  const [createOpen, setCreateOpen] = useState(false)

  const { data: novels, isLoading, isError } = useNovels()
  const createNovel = useCreateNovel()

  function handleCreate(values: NovelFormValues) {
    createNovel.mutate(values, {
      onSuccess: () => {
        setCreateOpen(false)
        toast.success("Novela creada")
      },
      onError: () => toast.error("Error al crear la novela"),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mis novelas</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona y escribe tus proyectos literarios
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva novela
        </Button>
      </div>

      {isError && (
        <p className="text-sm text-destructive">
          Error al cargar las novelas. Verifica que el servidor esté corriendo.
        </p>
      )}

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <NovelCardSkeleton key={i} />
          ))}
        </div>
      ) : novels?.length === 0 ? (
        <NovelEmptyState />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {novels?.map((novel) => (
            <NovelCard key={novel.id} novel={novel} />
          ))}
        </div>
      )}

      <NovelForm
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
        isPending={createNovel.isPending}
      />
    </div>
  )
}
