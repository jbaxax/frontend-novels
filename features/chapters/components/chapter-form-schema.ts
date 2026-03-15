import { z } from "zod"

export const chapterSchema = z.object({
  number: z.number().int().min(1, "Debe ser mayor a 0"),
  title: z
    .string()
    .min(1, "El título es requerido")
    .max(255, "Máximo 255 caracteres"),
  summary: z.string().optional(),
  status: z.enum(["draft", "complete"]),
})

export type ChapterFormValues = z.infer<typeof chapterSchema>
