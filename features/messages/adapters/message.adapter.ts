import type { Message, MessageApiResponse } from "../types/message.types"

export function messageFromApi(data: MessageApiResponse): Message {
  return {
    id: data.id,
    sessionId: data.sessionId,
    role: data.role,
    content: data.content,
    createdAt: new Date(data.created_at),
  }
}
