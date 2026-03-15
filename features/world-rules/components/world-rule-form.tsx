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
import { worldRuleSchema, type WorldRuleFormValues } from "./world-rule-form-schema"
import type { WorldRule } from "../types/world-rule.types"

const categoryLabels: Record<string, string> = {
  magic: "Magia",
  technology: "Tecnología",
  social: "Social",
  geography: "Geografía",
  biology: "Biología",
}

interface WorldRuleFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: WorldRuleFormValues) => void
  isPending: boolean
  defaultValues?: WorldRule
}

export function WorldRuleForm({
  open,
  onOpenChange,
  onSubmit,
  isPending,
  defaultValues,
}: WorldRuleFormProps) {
  const isEditing = Boolean(defaultValues)

  const form = useForm<WorldRuleFormValues>({
    resolver: zodResolver(worldRuleSchema),
    defaultValues: {
      category: "magic",
      name: "",
      description: "",
      is_breakable: false,
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        category: defaultValues?.category ?? "magic",
        name: defaultValues?.name ?? "",
        description: defaultValues?.description ?? "",
        is_breakable: defaultValues?.isBreakable ?? false,
      })
    }
  }, [open, defaultValues, form])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar regla" : "Nueva regla del mundo"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Categoría *</Label>
            <Select
              value={form.watch("category")}
              onValueChange={(v) =>
                form.setValue("category", v as WorldRuleFormValues["category"])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nombre *</Label>
            <Input
              id="name"
              placeholder="Nombre de la regla"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              placeholder="Explica cómo funciona esta regla..."
              rows={4}
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-destructive">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border"
              {...form.register("is_breakable")}
            />
            <span className="text-sm">Esta regla puede romperse en la trama</span>
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear regla"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
