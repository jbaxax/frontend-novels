import api from "@/services/api"
import { timelineEventFromApi } from "../adapters/timeline-event.adapter"
import type {
  TimelineEvent,
  TimelineEventApiResponse,
  CreateTimelineEventDto,
  UpdateTimelineEventDto,
} from "../types/timeline-event.types"

export async function fetchTimelineEventsByNovel(
  novelId: string,
): Promise<TimelineEvent[]> {
  const { data } = await api.get<TimelineEventApiResponse[]>(
    `/timeline-events/novels/${novelId}`,
  )
  return data.map(timelineEventFromApi)
}

export async function createTimelineEvent(
  dto: CreateTimelineEventDto,
): Promise<TimelineEvent> {
  const { data } = await api.post<TimelineEventApiResponse>("/timeline-events", dto)
  return timelineEventFromApi(data)
}

export async function updateTimelineEvent(
  id: string,
  dto: UpdateTimelineEventDto,
): Promise<TimelineEvent> {
  const { data } = await api.patch<TimelineEventApiResponse>(
    `/timeline-events/${id}`,
    dto,
  )
  return timelineEventFromApi(data)
}

export async function deleteTimelineEvent(id: string): Promise<void> {
  await api.delete(`/timeline-events/${id}`)
}
