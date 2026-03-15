import type { Character, CharacterApiResponse } from "../types/character.types"

export function characterFromApi(data: CharacterApiResponse): Character {
  return {
    id: data.id,
    novelId: data.novelId,
    name: data.name,
    role: data.role,
    age: data.age,
    physicalDescription: data.physical_description,
    personality: data.personality,
    strengths: data.strengths,
    weaknesses: data.weaknesses,
    fears: data.fears,
    goals: data.goals,
    motivations: data.motivations,
    backstory: data.backstory,
    status: data.status,
    createdAt: new Date(data.created_at),
  }
}
