import { z } from "zod"

export const volumeSchema = z.object({
  number: z.number().int().min(1, "Debe ser mayor a 0"),
  title: z
    .string()
    .min(1, "El título es requerido")
    .max(255, "Máximo 255 caracteres"),
  synopsis: z.string().optional(),
  focus: z.string().optional(),
})

export type VolumeFormValues = z.infer<typeof volumeSchema>
