"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, BookOpen, Pencil, Trash2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { VolumeForm } from "./volume-form"
import { useUpdateVolume, useDeleteVolume } from "../hooks/use-volumes"
import type { Volume } from "../types/volume.types"
import type { VolumeFormValues } from "./volume-form-schema"
import { toast } from "sonner"

interface VolumeCardProps {
  volume: Volume
  novelId: string
}

export function VolumeCard({ volume, novelId }: VolumeCardProps) {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const updateVolume = useUpdateVolume(novelId)
  const deleteVolume = useDeleteVolume(novelId)

  function handleEdit(values: VolumeFormValues) {
    updateVolume.mutate(
      { id: volume.id, dto: values },
      {
        onSuccess: () => {
          setEditOpen(false)
          toast.success("Volumen actualizado")
        },
        onError: () => toast.error("Error al actualizar el volumen"),
      },
    )
  }

  function handleDelete() {
    deleteVolume.mutate(volume.id, {
      onSuccess: () => {
        setDeleteOpen(false)
        toast.success("Volumen eliminado")
      },
      onError: () => toast.error("Error al eliminar el volumen"),
    })
  }

  return (
    <>
      <Card className="group flex flex-col transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="shrink-0">
              Vol. {volume.number}
            </Badge>
            <CardTitle className="line-clamp-1 text-base">{volume.title}</CardTitle>
          </div>
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

        <CardContent className="flex-1 space-y-2 pb-2">
          {volume.synopsis && (
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {volume.synopsis}
            </p>
          )}
          {volume.focus && (
            <p className="line-clamp-2 text-xs text-muted-foreground/70">
              <span className="font-medium text-muted-foreground">Conflicto:</span>{" "}
              {volume.focus}
            </p>
          )}
          {!volume.synopsis && !volume.focus && (
            <p className="italic text-sm text-muted-foreground/50">Sin descripción</p>
          )}
        </CardContent>

        <CardFooter className="pt-2">
          <Button asChild size="sm" variant="secondary" className="w-full">
            <Link href={`/novels/${novelId}/volumes/${volume.id}/chapters`}>
              <BookOpen className="mr-1.5 h-3.5 w-3.5" />
              Ver capítulos
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <VolumeForm
        open={editOpen}
        onOpenChange={setEditOpen}
        onSubmit={handleEdit}
        isPending={updateVolume.isPending}
        defaultValues={volume}
      />

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar volumen?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará{" "}
              <span className="font-medium text-foreground">{volume.title}</span> y
              todos sus capítulos. No se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteVolume.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteVolume.isPending ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
