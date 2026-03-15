import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchWorldRulesByNovel,
  createWorldRule,
  updateWorldRule,
  deleteWorldRule,
} from "../services/world-rule.service"
import type { CreateWorldRuleDto, UpdateWorldRuleDto } from "../types/world-rule.types"

export const worldRulesByNovelKey = (novelId: string) =>
  ["world-rules", "novel", novelId] as const

export function useWorldRulesByNovel(novelId: string) {
  return useQuery({
    queryKey: worldRulesByNovelKey(novelId),
    queryFn: () => fetchWorldRulesByNovel(novelId),
    enabled: Boolean(novelId),
  })
}

export function useCreateWorldRule(novelId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateWorldRuleDto) => createWorldRule(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: worldRulesByNovelKey(novelId) })
    },
  })
}

export function useUpdateWorldRule(novelId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateWorldRuleDto }) =>
      updateWorldRule(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: worldRulesByNovelKey(novelId) })
    },
  })
}

export function useDeleteWorldRule(novelId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteWorldRule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: worldRulesByNovelKey(novelId) })
    },
  })
}
