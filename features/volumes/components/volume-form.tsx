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
import { volumeSchema, type VolumeFormValues } from "./volume-form-schema"
import type { Volume } from "../types/volume.types"

interface VolumeFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: VolumeFormValues) => void
  isPending: boolean
  defaultValues?: Volume
}

export function VolumeForm({
  open,
  onOpenChange,
  onSubmit,
  isPending,
  defaultValues,
}: VolumeFormProps) {
  const isEditing = Boolean(defaultValues)

  const form = useForm<VolumeFormValues>({
    resolver: zodResolver(volumeSchema),
    defaultValues: { number: 1, title: "", synopsis: "", focus: "" },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        number: defaultValues?.number ?? 1,
        title: defaultValues?.title ?? "",
        synopsis: defaultValues?.synopsis ?? "",
        focus: defaultValues?.focus ?? "",
      })
    }
  }, [open, defaultValues, form])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar volumen" : "Nuevo volumen"}</DialogTitle>
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
                placeholder="Título del volumen"
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
            <Label htmlFor="synopsis">Sinopsis</Label>
            <Textarea
              id="synopsis"
              placeholder="Resumen del volumen (opcional)"
              rows={3}
              {...form.register("synopsis")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="focus">Conflicto central</Label>
            <Textarea
              id="focus"
              placeholder="¿En qué conflicto se centra este volumen? (opcional)"
              rows={2}
              {...form.register("focus")}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear volumen"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
