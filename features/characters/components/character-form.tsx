"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { characterSchema, type CharacterFormValues } from "./character-form-schema"
import type { Character } from "../types/character.types"

interface CharacterFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: CharacterFormValues) => void
  isPending: boolean
  defaultValues?: Character
}

export function CharacterForm({
  open,
  onOpenChange,
  onSubmit,
  isPending,
  defaultValues,
}: CharacterFormProps) {
  const isEditing = Boolean(defaultValues)

  const form = useForm<CharacterFormValues>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      name: "",
      role: "secondary",
      status: "alive",
      age: undefined,
      physical_description: "",
      personality: "",
      strengths: "",
      weaknesses: "",
      fears: "",
      goals: "",
      motivations: "",
      backstory: "",
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        name: defaultValues?.name ?? "",
        role: defaultValues?.role ?? "secondary",
        status: defaultValues?.status ?? "alive",
        age: defaultValues?.age ?? undefined,
        physical_description: defaultValues?.physicalDescription ?? "",
        personality: defaultValues?.personality ?? "",
        strengths: defaultValues?.strengths ?? "",
        weaknesses: defaultValues?.weaknesses ?? "",
        fears: defaultValues?.fears ?? "",
        goals: defaultValues?.goals ?? "",
        motivations: defaultValues?.motivations ?? "",
        backstory: defaultValues?.backstory ?? "",
      })
    }
  }, [open, defaultValues, form])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader className="mb-4">
          <SheetTitle>
            {isEditing ? `Editar — ${defaultValues?.name}` : "Nuevo personaje"}
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="basic">
            <TabsList className="w-full">
              <TabsTrigger value="basic" className="flex-1">
                Básico
              </TabsTrigger>
              <TabsTrigger value="personality" className="flex-1">
                Personalidad
              </TabsTrigger>
              <TabsTrigger value="story" className="flex-1">
                Historia
              </TabsTrigger>
            </TabsList>

            {/* ── TAB BÁSICO ── */}
            <TabsContent value="basic" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  placeholder="Nombre del personaje"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Rol *</Label>
                  <Select
                    value={form.watch("role")}
                    onValueChange={(v) =>
                      form.setValue("role", v as CharacterFormValues["role"])
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="protagonist">Protagonista</SelectItem>
                      <SelectItem value="antagonist">Antagonista</SelectItem>
                      <SelectItem value="secondary">Secundario</SelectItem>
                      <SelectItem value="background">Fondo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Estado *</Label>
                  <Select
                    value={form.watch("status")}
                    onValueChange={(v) =>
                      form.setValue("status", v as CharacterFormValues["status"])
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alive">Vivo</SelectItem>
                      <SelectItem value="dead">Muerto</SelectItem>
                      <SelectItem value="missing">Desaparecido</SelectItem>
                      <SelectItem value="unknown">Desconocido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Edad</Label>
                <Input
                  id="age"
                  type="number"
                  min={0}
                  placeholder="Opcional"
                  {...form.register("age", { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="physical_description">Descripción física</Label>
                <Textarea
                  id="physical_description"
                  placeholder="Apariencia, rasgos distintivos..."
                  rows={3}
                  {...form.register("physical_description")}
                />
              </div>
            </TabsContent>

            {/* ── TAB PERSONALIDAD ── */}
            <TabsContent value="personality" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="personality">Personalidad</Label>
                <Textarea
                  id="personality"
                  placeholder="Rasgos de personalidad..."
                  rows={3}
                  {...form.register("personality")}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="strengths">Fortalezas</Label>
                  <Textarea
                    id="strengths"
                    placeholder="Habilidades, virtudes..."
                    rows={3}
                    {...form.register("strengths")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weaknesses">Debilidades</Label>
                  <Textarea
                    id="weaknesses"
                    placeholder="Defectos, limitaciones..."
                    rows={3}
                    {...form.register("weaknesses")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fears">Miedos</Label>
                <Textarea
                  id="fears"
                  placeholder="¿Qué le aterra?"
                  rows={2}
                  {...form.register("fears")}
                />
              </div>
            </TabsContent>

            {/* ── TAB HISTORIA ── */}
            <TabsContent value="story" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goals">Objetivos</Label>
                <Textarea
                  id="goals"
                  placeholder="¿Qué quiere lograr?"
                  rows={2}
                  {...form.register("goals")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivations">Motivaciones</Label>
                <Textarea
                  id="motivations"
                  placeholder="¿Por qué persigue esos objetivos?"
                  rows={2}
                  {...form.register("motivations")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backstory">Historia de trasfondo</Label>
                <Textarea
                  id="backstory"
                  placeholder="Pasado, eventos que lo formaron..."
                  rows={5}
                  {...form.register("backstory")}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 border-t pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Guardando..."
                : isEditing
                  ? "Guardar cambios"
                  : "Crear personaje"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
