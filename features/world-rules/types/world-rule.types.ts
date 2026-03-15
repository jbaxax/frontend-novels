export type RuleCategory =
  | "magic"
  | "technology"
  | "social"
  | "geography"
  | "biology"
  | "adult"

export interface WorldRule {
  id: string
  novelId: string
  category: RuleCategory
  name: string
  description: string
  isBreakable: boolean
}

export interface WorldRuleApiResponse {
  id: string
  novelId: string
  category: RuleCategory
  name: string
  description: string
  is_breakable: boolean
}

export interface CreateWorldRuleDto {
  novelId: string
  category: RuleCategory
  name: string
  description: string
  is_breakable?: boolean
}

export interface UpdateWorldRuleDto extends Partial<Omit<CreateWorldRuleDto, "novelId">> {}
