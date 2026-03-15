"use client"

import { useState } from "react"
import { MoreHorizontal, Pencil, Trash2, User } from "lucide-react"
import {
  Card,
  CardContent,
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
import { CharacterRoleBadge, CharacterStatusBadge } from "./character-badges"
import { CharacterForm } from "./character-form"
import { useUpdateCharacter, useDeleteCharacter } from "../hooks/use-characters"
import type { Character } from "../types/character.types"
import type { CharacterFormValues } from "./character-form-schema"
import { toast } from "sonner"

interface CharacterCardProps {
  character: Character
  novelId: string
}

export function CharacterCard({ character, novelId }: CharacterCardProps) {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const updateCharacter = useUpdateCharacter(novelId)
  const deleteCharacter = useDeleteCharacter(novelId)

  function handleEdit(values: CharacterFormValues) {
    updateCharacter.mutate(
      { id: character.id, dto: values },
      {
        onSuccess: () => {
          setEditOpen(false)
          toast.success("Personaje actualizado")
        },
        onError: () => toast.error("Error al actualizar el personaje"),
      },
    )
  }

  function handleDelete() {
    deleteCharacter.mutate(character.id, {
      onSuccess: () => {
        setDeleteOpen(false)
        toast.success("Personaje eliminado")
      },
      onError: () => toast.error("Error al eliminar el personaje"),
    })
  }

  return (
    <>
      <Card className="group flex flex-col transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="line-clamp-1 text-base">{character.name}</CardTitle>
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

        <CardContent className="flex-1 space-y-3 pb-4">
          <div className="flex flex-wrap gap-1.5">
            <CharacterRoleBadge role={character.role} />
            <CharacterStatusBadge status={character.status} />
            {character.age !== null && (
              <span className="text-xs text-muted-foreground self-center">
                {character.age} años
              </span>
            )}
          </div>

          {character.personality && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {character.personality}
            </p>
          )}

          {character.goals && (
            <p className="line-clamp-2 text-xs text-muted-foreground/70">
              <span className="font-medium text-muted-foreground">Objetivo:</span>{" "}
              {character.goals}
            </p>
          )}

          {!character.personality && !character.goals && (
            <p className="italic text-sm text-muted-foreground/50">Sin descripción</p>
          )}
        </CardContent>
      </Card>

      <CharacterForm
        open={editOpen}
        onOpenChange={setEditOpen}
        onSubmit={handleEdit}
        isPending={updateCharacter.isPending}
        defaultValues={character}
      />

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar personaje?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará a{" "}
              <span className="font-medium text-foreground">{character.name}</span>{" "}
              permanentemente y lo quitará de todos los capítulos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteCharacter.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteCharacter.isPending ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
