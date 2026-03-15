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
import {
  timelineEventSchema,
  type TimelineEventFormValues,
} from "./timeline-event-form-schema"
import type { TimelineEvent } from "../types/timeline-event.types"

interface TimelineEventFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: TimelineEventFormValues) => void
  isPending: boolean
  defaultValues?: TimelineEvent
}

export function TimelineEventForm({
  open,
  onOpenChange,
  onSubmit,
  isPending,
  defaultValues,
}: TimelineEventFormProps) {
  const isEditing = Boolean(defaultValues)

  const form = useForm<TimelineEventFormValues>({
    resolver: zodResolver(timelineEventSchema),
    defaultValues: {
      title: "",
      description: "",
      story_date: "",
      importance: "medium",
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        title: defaultValues?.title ?? "",
        description: defaultValues?.description ?? "",
        story_date: defaultValues?.storyDate ?? "",
        importance: defaultValues?.importance ?? "medium",
      })
    }
  }, [open, defaultValues, form])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar evento" : "Nuevo evento de timeline"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              placeholder="Nombre del evento"
              {...form.register("title")}
            />
            {form.formState.errors.title && (
              <p className="text-sm text-destructive">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="story_date">Fecha narrativa *</Label>
              <Input
                id="story_date"
                placeholder="Ej: Año 3 del Imperio"
                {...form.register("story_date")}
              />
              {form.formState.errors.story_date && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.story_date.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Importancia *</Label>
              <Select
                value={form.watch("importance")}
                onValueChange={(v) =>
                  form.setValue(
                    "importance",
                    v as TimelineEventFormValues["importance"],
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baja</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="critical">Crítica</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              placeholder="¿Qué ocurrió en este evento?"
              rows={4}
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-destructive">
                {form.formState.errors.description.message}
              </p>
            )}
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
                  : "Crear evento"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
