export interface Novel {
  id: string
  title: string
  description: string | null
  createdAt: Date
}

export interface NovelApiResponse {
  id: string
  title: string
  description: string | null
  created_at: string
}

export interface CreateNovelDto {
  title: string
  description?: string
}

export interface UpdateNovelDto {
  title?: string
  description?: string
}
