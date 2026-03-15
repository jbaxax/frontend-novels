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
import { locationSchema, type LocationFormValues } from "./location-form-schema"
import type { Location } from "../types/location.types"

interface LocationFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: LocationFormValues) => void
  isPending: boolean
  defaultValues?: Location
  allLocations: Location[]
}

export function LocationForm({
  open,
  onOpenChange,
  onSubmit,
  isPending,
  defaultValues,
  allLocations,
}: LocationFormProps) {
  const isEditing = Boolean(defaultValues)

  const form = useForm<LocationFormValues>({
    resolver: zodResolver(locationSchema),
    defaultValues: { name: "", description: "", parentId: undefined },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        name: defaultValues?.name ?? "",
        description: defaultValues?.description ?? "",
        parentId: defaultValues?.parentId ?? undefined,
      })
    }
  }, [open, defaultValues, form])

  const availableParents = allLocations.filter((l) => l.id !== defaultValues?.id)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar ubicación" : "Nueva ubicación"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre *</Label>
            <Input
              id="name"
              placeholder="Nombre del lugar"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Ubicación padre</Label>
            <Select
              value={form.watch("parentId") ?? "none"}
              onValueChange={(v) =>
                form.setValue("parentId", v === "none" ? undefined : v)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sin padre (ubicación raíz)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Sin padre (ubicación raíz)</SelectItem>
                {availableParents.map((loc) => (
                  <SelectItem key={loc.id} value={loc.id}>
                    {loc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe este lugar..."
              rows={3}
              {...form.register("description")}
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
                  : "Crear ubicación"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
