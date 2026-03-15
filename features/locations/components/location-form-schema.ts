import { z } from "zod"

export const locationSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(255),
  description: z.string().optional(),
  parentId: z.string().uuid().optional(),
})

export type LocationFormValues = z.infer<typeof locationSchema>
