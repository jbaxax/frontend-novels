import { z } from "zod"

export const timelineEventSchema = z.object({
  title: z.string().min(1, "El título es requerido").max(255),
  description: z.string().min(1, "La descripción es requerida"),
  story_date: z.string().min(1, "La fecha narrativa es requerida"),
  importance: z.enum(["low", "medium", "high", "critical"]),
})

export type TimelineEventFormValues = z.infer<typeof timelineEventSchema>
