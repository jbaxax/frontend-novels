import api from "@/services/api"
import { worldRuleFromApi } from "../adapters/world-rule.adapter"
import type {
  WorldRule,
  WorldRuleApiResponse,
  CreateWorldRuleDto,
  UpdateWorldRuleDto,
} from "../types/world-rule.types"

export async function fetchWorldRulesByNovel(novelId: string): Promise<WorldRule[]> {
  const { data } = await api.get<WorldRuleApiResponse[]>(`/world-rules/novels/${novelId}`)
  return data.map(worldRuleFromApi)
}

export async function createWorldRule(dto: CreateWorldRuleDto): Promise<WorldRule> {
  const { data } = await api.post<WorldRuleApiResponse>("/world-rules", dto)
  return worldRuleFromApi(data)
}

export async function updateWorldRule(
  id: string,
  dto: UpdateWorldRuleDto,
): Promise<WorldRule> {
  const { data } = await api.patch<WorldRuleApiResponse>(`/world-rules/${id}`, dto)
  return worldRuleFromApi(data)
}

export async function deleteWorldRule(id: string): Promise<void> {
  await api.delete(`/world-rules/${id}`)
}
