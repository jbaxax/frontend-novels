import api from "@/services/api"
import { novelFromApi } from "../adapters/novel.adapter"
import type {
  Novel,
  NovelApiResponse,
  CreateNovelDto,
  UpdateNovelDto,
} from "../types/novel.types"

export async function fetchNovels(): Promise<Novel[]> {
  const { data } = await api.get<NovelApiResponse[]>("/novels")
  return data.map(novelFromApi)
}

export async function fetchNovel(id: string): Promise<Novel> {
  const { data } = await api.get<NovelApiResponse>(`/novels/${id}`)
  return novelFromApi(data)
}

export async function createNovel(dto: CreateNovelDto): Promise<Novel> {
  const { data } = await api.post<NovelApiResponse>("/novels", dto)
  return novelFromApi(data)
}

export async function updateNovel(id: string, dto: UpdateNovelDto): Promise<Novel> {
  const { data } = await api.patch<NovelApiResponse>(`/novels/${id}`, dto)
  return novelFromApi(data)
}

export async function deleteNovel(id: string): Promise<void> {
  await api.delete(`/novels/${id}`)
}
