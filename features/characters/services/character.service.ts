import api from "@/services/api"
import { characterFromApi } from "../adapters/character.adapter"
import type {
  Character,
  CharacterApiResponse,
  CreateCharacterDto,
  UpdateCharacterDto,
} from "../types/character.types"

export async function fetchCharactersByNovel(novelId: string): Promise<Character[]> {
  const { data } = await api.get<CharacterApiResponse[]>(`/characters/novels/${novelId}`)
  return data.map(characterFromApi)
}

export async function fetchCharacter(id: string): Promise<Character> {
  const { data } = await api.get<CharacterApiResponse>(`/characters/${id}`)
  return characterFromApi(data)
}

export async function createCharacter(dto: CreateCharacterDto): Promise<Character> {
  const { data } = await api.post<CharacterApiResponse>("/characters", dto)
  return characterFromApi(data)
}

export async function updateCharacter(
  id: string,
  dto: UpdateCharacterDto,
): Promise<Character> {
  const { data } = await api.patch<CharacterApiResponse>(`/characters/${id}`, dto)
  return characterFromApi(data)
}

export async function deleteCharacter(id: string): Promise<void> {
  await api.delete(`/characters/${id}`)
}
