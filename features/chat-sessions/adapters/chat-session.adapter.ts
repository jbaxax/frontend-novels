import type { ChatSession, ChatSessionApiResponse } from "../types/chat-session.types"

export function chatSessionFromApi(data: ChatSessionApiResponse): ChatSession {
  return {
    id: data.id,
    chapterId: data.chapterId,
    createdAt: new Date(data.created_at),
  }
}
