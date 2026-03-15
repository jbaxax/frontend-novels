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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { chapterSchema, type ChapterFormValues } from "./chapter-form-schema"
import type { Chapter } from "../types/chapter.types"

interface ChapterFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: ChapterFormValues) => void
  isPending: boolean
  defaultValues?: Chapter
}

export function ChapterForm({
  open,
  onOpenChange,
  onSubmit,
  isPending,
  defaultValues,
}: ChapterFormProps) {
  const isEditing = Boolean(defaultValues)

  const form = useForm<ChapterFormValues>({
    resolver: zodResolver(chapterSchema),
    defaultValues: { number: 1, title: "", summary: "", status: "draft" },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        number: defaultValues?.number ?? 1,
        title: defaultValues?.title ?? "",
        summary: defaultValues?.summary ?? "",
        status: defaultValues?.status ?? "draft",
      })
    }
  }, [open, defaultValues, form])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar capítulo" : "Nuevo capítulo"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="number">Número</Label>
              <Input
                id="number"
                type="number"
                min={1}
                {...form.register("number", { valueAsNumber: true })}
              />
              {form.formState.errors.number && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.number.message}
                </p>
              )}
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Título del capítulo"
                {...form.register("title")}
              />
              {form.formState.errors.title && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Estado</Label>
            <Select
              value={form.watch("status")}
              onValueChange={(value) =>
                form.setValue("status", value as ChapterFormValues["status"])
              }
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Borrador</SelectItem>
                <SelectItem value="complete">Completo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Resumen</Label>
            <Textarea
              id="summary"
              placeholder="Breve resumen del capítulo (opcional)"
              rows={3}
              {...form.register("summary")}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Guardando..."
                : isEditing
                  ? "Guardar cambios"
                  : "Crear capítulo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
