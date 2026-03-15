import api from "@/services/api"
import { chapterFromApi } from "../adapters/chapter.adapter"
import type {
  Chapter,
  ChapterApiResponse,
  CreateChapterDto,
  UpdateChapterDto,
} from "../types/chapter.types"

export async function fetchChaptersByVolume(volumeId: string): Promise<Chapter[]> {
  const { data } = await api.get<ChapterApiResponse[]>(`/chapters/volumes/${volumeId}`)
  return data.map(chapterFromApi)
}

export async function fetchChapter(id: string): Promise<Chapter> {
  const { data } = await api.get<ChapterApiResponse>(`/chapters/${id}`)
  return chapterFromApi(data)
}

export async function createChapter(dto: CreateChapterDto): Promise<Chapter> {
  const { data } = await api.post<ChapterApiResponse>("/chapters", dto)
  return chapterFromApi(data)
}

export async function updateChapter(id: string, dto: UpdateChapterDto): Promise<Chapter> {
  const { data } = await api.patch<ChapterApiResponse>(`/chapters/${id}`, dto)
  return chapterFromApi(data)
}

export async function deleteChapter(id: string): Promise<void> {
  await api.delete(`/chapters/${id}`)
}

export async function assignCharacters(
  chapterId: string,
  characterIds: string[],
): Promise<void> {
  await api.put(`/chapters/${chapterId}/characters`, { characterIds })
}
