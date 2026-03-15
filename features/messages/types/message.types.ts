export type MessageRole = "user" | "assistant"

export interface Message {
  id: string
  sessionId: string
  role: MessageRole
  content: string
  createdAt: Date
}

export interface MessageApiResponse {
  id: string
  sessionId: string
  role: MessageRole
  content: string
  created_at: string
}
