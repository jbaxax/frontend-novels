"use client"

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

interface NovelDeleteDialogProps {
  open: boolean
  novelTitle: string
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isPending: boolean
}

export function NovelDeleteDialog({
  open,
  novelTitle,
  onOpenChange,
  onConfirm,
  isPending,
}: NovelDeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar novela?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará permanentemente{" "}
            <span className="font-medium text-foreground">{novelTitle}</span> y
            todo su contenido. No se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
