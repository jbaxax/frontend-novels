import type { WorldRule, WorldRuleApiResponse } from "../types/world-rule.types"

export function worldRuleFromApi(data: WorldRuleApiResponse): WorldRule {
  return {
    id: data.id,
    novelId: data.novelId,
    category: data.category,
    name: data.name,
    description: data.description,
    isBreakable: data.is_breakable,
  }
}
