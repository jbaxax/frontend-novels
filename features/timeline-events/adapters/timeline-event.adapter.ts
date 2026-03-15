import type { TimelineEvent, TimelineEventApiResponse } from "../types/timeline-event.types"

export function timelineEventFromApi(data: TimelineEventApiResponse): TimelineEvent {
  return {
    id: data.id,
    novelId: data.novelId,
    chapterId: data.chapterId,
    title: data.title,
    description: data.description,
    storyDate: data.story_date,
    importance: data.importance,
  }
}
