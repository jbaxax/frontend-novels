import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchNovels,
  fetchNovel,
  createNovel,
  updateNovel,
  deleteNovel,
} from "../services/novel.service"
import type { CreateNovelDto, UpdateNovelDto } from "../types/novel.types"

export const NOVELS_KEY = ["novels"] as const
export const novelKey = (id: string) => ["novels", id] as const

export function useNovels() {
  return useQuery({
    queryKey: NOVELS_KEY,
    queryFn: fetchNovels,
  })
}

export function useNovel(id: string) {
  return useQuery({
    queryKey: novelKey(id),
    queryFn: () => fetchNovel(id),
    enabled: Boolean(id),
  })
}

export function useCreateNovel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: CreateNovelDto) => createNovel(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOVELS_KEY })
    },
  })
}

export function useUpdateNovel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateNovelDto }) =>
      updateNovel(id, dto),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: NOVELS_KEY })
      queryClient.setQueryData(novelKey(updated.id), updated)
    },
  })
}

export function useDeleteNovel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteNovel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOVELS_KEY })
    },
  })
}
