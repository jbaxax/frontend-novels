"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, BookOpen, Pencil, Trash2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NovelForm } from "./novel-form"
import { NovelDeleteDialog } from "./novel-delete-dialog"
import { useUpdateNovel, useDeleteNovel } from "../hooks/use-novels"
import type { Novel } from "../types/novel.types"
import type { NovelFormValues } from "./novel-form-schema"
import { toast } from "sonner"

interface NovelCardProps {
  novel: Novel
}

export function NovelCard({ novel }: NovelCardProps) {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const updateNovel = useUpdateNovel()
  const deleteNovel = useDeleteNovel()

  function handleEdit(values: NovelFormValues) {
    updateNovel.mutate(
      { id: novel.id, dto: values },
      {
        onSuccess: () => {
          setEditOpen(false)
          toast.success("Novela actualizada")
        },
        onError: () => toast.error("Error al actualizar la novela"),
      },
    )
  }

  function handleDelete() {
    deleteNovel.mutate(novel.id, {
      onSuccess: () => {
        setDeleteOpen(false)
        toast.success("Novela eliminada")
      },
      onError: () => toast.error("Error al eliminar la novela"),
    })
  }

  const formattedDate = novel.createdAt.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <>
      <Card className="group flex flex-col transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
          <CardTitle className="line-clamp-2 text-base leading-tight">
            {novel.title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Opciones</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditOpen(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setDeleteOpen(true)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent className="flex-1 pb-2">
          {novel.description ? (
            <CardDescription className="line-clamp-3 text-sm">
              {novel.description}
            </CardDescription>
          ) : (
            <CardDescription className="italic text-muted-foreground/50">
              Sin descripción
            </CardDescription>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
          <Button asChild size="sm" variant="secondary">
            <Link href={`/novels/${novel.id}/volumes`}>
              <BookOpen className="mr-1.5 h-3.5 w-3.5" />
              Abrir
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <NovelForm
        open={editOpen}
        onOpenChange={setEditOpen}
        onSubmit={handleEdit}
        isPending={updateNovel.isPending}
        defaultValues={novel}
      />

      <NovelDeleteDialog
        open={deleteOpen}
        novelTitle={novel.title}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        isPending={deleteNovel.isPending}
      />
    </>
  )
}
