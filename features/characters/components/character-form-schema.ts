import { z } from "zod"

export const characterSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(255),
  role: z.enum(["protagonist", "antagonist", "secondary", "background"]),
  status: z.enum(["alive", "dead", "missing", "unknown"]),
  age: z.number().int().min(0).optional(),
  physical_description: z.string().optional(),
  personality: z.string().optional(),
  strengths: z.string().optional(),
  weaknesses: z.string().optional(),
  fears: z.string().optional(),
  goals: z.string().optional(),
  motivations: z.string().optional(),
  backstory: z.string().optional(),
})

export type CharacterFormValues = z.infer<typeof characterSchema>
