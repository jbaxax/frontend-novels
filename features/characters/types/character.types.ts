export type CharacterRole = "protagonist" | "antagonist" | "secondary" | "background"
export type CharacterStatus = "alive" | "dead" | "missing" | "unknown"

export interface Character {
  id: string
  novelId: string
  name: string
  role: CharacterRole
  age: number | null
  physicalDescription: string | null
  personality: string | null
  strengths: string | null
  weaknesses: string | null
  fears: string | null
  goals: string | null
  motivations: string | null
  backstory: string | null
  status: CharacterStatus
  createdAt: Date
}

export interface CharacterApiResponse {
  id: string
  novelId: string
  name: string
  role: CharacterRole
  age: number | null
  physical_description: string | null
  personality: string | null
  strengths: string | null
  weaknesses: string | null
  fears: string | null
  goals: string | null
  motivations: string | null
  backstory: string | null
  status: CharacterStatus
  created_at: string
}

export interface CreateCharacterDto {
  novelId: string
  name: string
  role: CharacterRole
  age?: number
  physical_description?: string
  personality?: string
  strengths?: string
  weaknesses?: string
  fears?: string
  goals?: string
  motivations?: string
  backstory?: string
  status?: CharacterStatus
}

export interface UpdateCharacterDto extends Partial<Omit<CreateCharacterDto, "novelId">> {}
