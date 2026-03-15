import type { Chapter, ChapterApiResponse } from "../types/chapter.types"

export function chapterFromApi(data: ChapterApiResponse): Chapter {
  return {
    id: data.id,
    volumeId: data.volumeId,
    number: data.number,
    title: data.title,
    summary: data.summary,
    content: data.content,
    status: data.status,
    createdAt: new Date(data.created_at),
  }
}
