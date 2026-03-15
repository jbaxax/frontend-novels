"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { novelSchema, type NovelFormValues } from "./novel-form-schema"
import type { Novel } from "../types/novel.types"

interface NovelFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: NovelFormValues) => void
  isPending: boolean
  defaultValues?: Novel
}

export function NovelForm({
  open,
  onOpenChange,
  onSubmit,
  isPending,
  defaultValues,
}: NovelFormProps) {
  const isEditing = Boolean(defaultValues)

  const form = useForm<NovelFormValues>({
    resolver: zodResolver(novelSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        title: defaultValues?.title ?? "",
        description: defaultValues?.description ?? "",
      })
    }
  }, [open, defaultValues, form])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar novela" : "Nueva novela"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="El nombre de tu novela"
              {...form.register("title")}
            />
            {form.formState.errors.title && (
              <p className="text-sm text-destructive">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Una breve descripción (opcional)"
              rows={3}
              {...form.register("description")}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear novela"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
