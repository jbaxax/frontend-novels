import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchLocationsByNovel,
  createLocation,
  updateLocation,
  deleteLocation,
} from "../services/location.service"
import type { CreateLocationDto, UpdateLocationDto } from "../types/location.types"

export const locationsByNovelKey = (novelId: string) =>
  ["locations", "novel", novelId] as const

export function useLocationsByNovel(novelId: string) {
  return useQuery({
    queryKey: locationsByNovelKey(novelId),
    queryFn: () => fetchLocationsByNovel(novelId),
    enabled: Boolean(novelId),
  })
}

export function useCreateLocation(novelId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateLocationDto) => createLocation(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationsByNovelKey(novelId) })
    },
  })
}

export function useUpdateLocation(novelId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateLocationDto }) =>
      updateLocation(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationsByNovelKey(novelId) })
    },
  })
}

export function useDeleteLocation(novelId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteLocation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationsByNovelKey(novelId) })
    },
  })
}
