import api from "@/services/api"
import { chatSessionFromApi } from "../adapters/chat-session.adapter"
import type { ChatSession, ChatSessionApiResponse } from "../types/chat-session.types"

export async function fetchSessionsByChapter(chapterId: string): Promise<ChatSession[]> {
  const { data } = await api.get<ChatSessionApiResponse[]>(
    `/chat-sessions/chapters/${chapterId}`,
  )
  return data.map(chatSessionFromApi)
}

export async function createSession(chapterId: string): Promise<ChatSession> {
  const { data } = await api.post<ChatSessionApiResponse>("/chat-sessions", { chapterId })
  return chatSessionFromApi(data)
}

export async function deleteSession(id: string): Promise<void> {
  await api.delete(`/chat-sessions/${id}`)
}

export async function generateText(
  sessionId: string,
  prompt: string,
): Promise<string> {
  const { data } = await api.post<string>(
    `/chat-sessions/${sessionId}/generate`,
    { prompt },
  )
  return data
}
