import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchCharactersByNovel,
  fetchCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} from "../services/character.service"
import type { CreateCharacterDto, UpdateCharacterDto } from "../types/character.types"

export const charactersByNovelKey = (novelId: string) =>
  ["characters", "novel", novelId] as const

export const characterKey = (id: string) => ["characters", id] as const

export function useCharactersByNovel(novelId: string) {
  return useQuery({
    queryKey: charactersByNovelKey(novelId),
    queryFn: () => fetchCharactersByNovel(novelId),
    enabled: Boolean(novelId),
  })
}

export function useCharacter(id: string) {
  return useQuery({
    queryKey: characterKey(id),
    queryFn: () => fetchCharacter(id),
    enabled: Boolean(id),
  })
}

export function useCreateCharacter(novelId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: CreateCharacterDto) => createCharacter(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: charactersByNovelKey(novelId) })
    },
  })
}

export function useUpdateCharacter(novelId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCharacterDto }) =>
      updateCharacter(id, dto),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: charactersByNovelKey(novelId) })
      queryClient.setQueryData(characterKey(updated.id), updated)
    },
  })
}

export function useDeleteCharacter(novelId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteCharacter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: charactersByNovelKey(novelId) })
    },
  })
}
