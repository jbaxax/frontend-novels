"use client"

import { useState } from "react"
import Link from "next/link"
import { Pencil, Trash2, PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ChapterStatusBadge } from "./chapter-status-badge"
import { ChapterForm } from "./chapter-form"
import { useUpdateChapter, useDeleteChapter } from "../hooks/use-chapters"
import type { Chapter } from "../types/chapter.types"
import type { ChapterFormValues } from "./chapter-form-schema"
import { toast } from "sonner"

interface ChapterRowProps {
  chapter: Chapter
  novelId: string
}

export function ChapterRow({ chapter, novelId }: ChapterRowProps) {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const updateChapter = useUpdateChapter(chapter.volumeId)
  const deleteChapter = useDeleteChapter(chapter.volumeId)

  function handleEdit(values: ChapterFormValues) {
    updateChapter.mutate(
      { id: chapter.id, dto: values },
      {
        onSuccess: () => {
          setEditOpen(false)
          toast.success("Capítulo actualizado")
        },
        onError: () => toast.error("Error al actualizar el capítulo"),
      },
    )
  }

  function handleDelete() {
    deleteChapter.mutate(chapter.id, {
      onSuccess: () => {
        setDeleteOpen(false)
        toast.success("Capítulo eliminado")
      },
      onError: () => toast.error("Error al eliminar el capítulo"),
    })
  }

  return (
    <>
      <div className="group flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/40">
        <span className="mt-0.5 min-w-[2rem] text-center text-sm font-bold text-muted-foreground">
          #{chapter.number}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium leading-tight">{chapter.title}</span>
            <ChapterStatusBadge status={chapter.status} />
          </div>
          {chapter.summary && (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {chapter.summary}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setEditOpen(true)}
          >
            <Pencil className="h-3.5 w-3.5" />
            <span className="sr-only">Editar</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="sr-only">Eliminar</span>
          </Button>
          <Button asChild size="sm" variant="secondary" className="h-8">
            <Link
              href={`/novels/${novelId}/volumes/${chapter.volumeId}/chapters/${chapter.id}`}
            >
              <PenLine className="mr-1.5 h-3.5 w-3.5" />
              Escribir
            </Link>
          </Button>
        </div>
      </div>

      <ChapterForm
        open={editOpen}
        onOpenChange={setEditOpen}
        onSubmit={handleEdit}
        isPending={updateChapter.isPending}
        defaultValues={chapter}
      />

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar capítulo?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará{" "}
              <span className="font-medium text-foreground">{chapter.title}</span> y
              todo su contenido. No se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteChapter.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteChapter.isPending ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
