export type EventImportance = "low" | "medium" | "high" | "critical"

export interface TimelineEvent {
  id: string
  novelId: string
  chapterId: string | null
  title: string
  description: string
  storyDate: string
  importance: EventImportance
}

export interface TimelineEventApiResponse {
  id: string
  novelId: string
  chapterId: string | null
  title: string
  description: string
  story_date: string
  importance: EventImportance
}

export interface CreateTimelineEventDto {
  novelId: string
  title: string
  description: string
  story_date: string
  importance?: EventImportance
  chapterId?: string
}

export interface UpdateTimelineEventDto
  extends Partial<Omit<CreateTimelineEventDto, "novelId">> {}
