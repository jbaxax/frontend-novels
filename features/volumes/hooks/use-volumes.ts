import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchVolumesByNovel,
  fetchVolume,
  createVolume,
  updateVolume,
  deleteVolume,
} from "../services/volume.service"
import type { CreateVolumeDto, UpdateVolumeDto } from "../types/volume.types"

export const volumesByNovelKey = (novelId: string) =>
  ["volumes", "novel", novelId] as const

export const volumeKey = (id: string) => ["volumes", id] as const

export function useVolumesByNovel(novelId: string) {
  return useQuery({
    queryKey: volumesByNovelKey(novelId),
    queryFn: () => fetchVolumesByNovel(novelId),
    enabled: Boolean(novelId),
  })
}

export function useVolume(id: string) {
  return useQuery({
    queryKey: volumeKey(id),
    queryFn: () => fetchVolume(id),
    enabled: Boolean(id),
  })
}

export function useCreateVolume(novelId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: CreateVolumeDto) => createVolume(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: volumesByNovelKey(novelId) })
    },
  })
}

export function useUpdateVolume(novelId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateVolumeDto }) =>
      updateVolume(id, dto),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: volumesByNovelKey(novelId) })
      queryClient.setQueryData(volumeKey(updated.id), updated)
    },
  })
}

export function useDeleteVolume(novelId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteVolume(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: volumesByNovelKey(novelId) })
    },
  })
}
