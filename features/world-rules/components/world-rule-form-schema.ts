import { z } from "zod"

export const worldRuleSchema = z.object({
  category: z.enum(["magic", "technology", "social", "geography", "biology", "adult"]),
  name: z.string().min(1, "El nombre es requerido").max(255),
  description: z.string().min(1, "La descripción es requerida"),
  is_breakable: z.boolean(),
})

export type WorldRuleFormValues = z.infer<typeof worldRuleSchema>
