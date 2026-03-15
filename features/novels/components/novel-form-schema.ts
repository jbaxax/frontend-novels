import { z } from "zod"

export const novelSchema = z.object({
  title: z
    .string()
    .min(1, "El título es requerido")
    .max(255, "Máximo 255 caracteres"),
  description: z.string().optional(),
})

export type NovelFormValues = z.infer<typeof novelSchema>
