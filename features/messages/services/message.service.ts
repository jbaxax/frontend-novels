import api from "@/services/api"
import { messageFromApi } from "../adapters/message.adapter"
import type { Message, MessageApiResponse } from "../types/message.types"

export async function fetchMessagesBySession(sessionId: string): Promise<Message[]> {
  const { data } = await api.get<MessageApiResponse[]>(
    `/messages/sessions/${sessionId}`,
  )
  return data.map(messageFromApi)
}
