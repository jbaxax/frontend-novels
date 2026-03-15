import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchChaptersByVolume,
  fetchChapter,
  createChapter,
  updateChapter,
  deleteChapter,
  assignCharacters,
} from "../services/chapter.service"
import type { CreateChapterDto, UpdateChapterDto } from "../types/chapter.types"

export const chaptersByVolumeKey = (volumeId: string) =>
  ["chapters", "volume", volumeId] as const

export const chapterKey = (id: string) => ["chapters", id] as const

export function useChaptersByVolume(volumeId: string) {
  return useQuery({
    queryKey: chaptersByVolumeKey(volumeId),
    queryFn: () => fetchChaptersByVolume(volumeId),
    enabled: Boolean(volumeId),
  })
}

export function useChapter(id: string) {
  return useQuery({
    queryKey: chapterKey(id),
    queryFn: () => fetchChapter(id),
    enabled: Boolean(id),
  })
}

export function useCreateChapter(volumeId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: CreateChapterDto) => createChapter(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chaptersByVolumeKey(volumeId) })
    },
  })
}

export function useUpdateChapter(volumeId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateChapterDto }) =>
      updateChapter(id, dto),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: chaptersByVolumeKey(volumeId) })
      queryClient.setQueryData(chapterKey(updated.id), updated)
    },
  })
}

export function useDeleteChapter(volumeId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteChapter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chaptersByVolumeKey(volumeId) })
    },
  })
}

export function useAssignCharacters(chapterId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (characterIds: string[]) => assignCharacters(chapterId, characterIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chapterKey(chapterId) })
    },
  })
}
