export interface ChatSession {
  id: string
  chapterId: string
  createdAt: Date
}

export interface ChatSessionApiResponse {
  id: string
  chapterId: string
  created_at: string
}
