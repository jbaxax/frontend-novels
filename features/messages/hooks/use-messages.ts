import { useQuery } from "@tanstack/react-query"
import { fetchMessagesBySession } from "../services/message.service"

export const messagesBySessionKey = (sessionId: string) =>
  ["messages", "session", sessionId] as const

export function useMessagesBySession(sessionId: string) {
  return useQuery({
    queryKey: messagesBySessionKey(sessionId),
    queryFn: () => fetchMessagesBySession(sessionId),
    enabled: Boolean(sessionId),
  })
}
