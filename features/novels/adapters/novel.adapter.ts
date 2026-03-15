import type { Novel, NovelApiResponse } from "../types/novel.types"

export function novelFromApi(data: NovelApiResponse): Novel {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    createdAt: new Date(data.created_at),
  }
}
