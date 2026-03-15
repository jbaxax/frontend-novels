export type ChapterStatus = "draft" | "complete"

export interface Chapter {
  id: string
  volumeId: string
  number: number
  title: string
  summary: string | null
  content: string | null
  status: ChapterStatus
  createdAt: Date
}

export interface ChapterApiResponse {
  id: string
  volumeId: string
  number: number
  title: string
  summary: string | null
  content: string | null
  status: ChapterStatus
  created_at: string
}

export interface CreateChapterDto {
  volumeId: string
  number: number
  title: string
  summary?: string
  status?: ChapterStatus
}

export interface UpdateChapterDto {
  number?: number
  title?: string
  summary?: string
  content?: string
  status?: ChapterStatus
}
