import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchTimelineEventsByNovel,
  createTimelineEvent,
  updateTimelineEvent,
  deleteTimelineEvent,
} from "../services/timeline-event.service"
import type {
  CreateTimelineEventDto,
  UpdateTimelineEventDto,
} from "../types/timeline-event.types"

export const timelineEventsByNovelKey = (novelId: string) =>
  ["timeline-events", "novel", novelId] as const

export function useTimelineEventsByNovel(novelId: string) {
  return useQuery({
    queryKey: timelineEventsByNovelKey(novelId),
    queryFn: () => fetchTimelineEventsByNovel(novelId),
    enabled: Boolean(novelId),
  })
}

export function useCreateTimelineEvent(novelId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateTimelineEventDto) => createTimelineEvent(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: timelineEventsByNovelKey(novelId) })
    },
  })
}

export function useUpdateTimelineEvent(novelId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTimelineEventDto }) =>
      updateTimelineEvent(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: timelineEventsByNovelKey(novelId) })
    },
  })
}

export function useDeleteTimelineEvent(novelId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteTimelineEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: timelineEventsByNovelKey(novelId) })
    },
  })
}
