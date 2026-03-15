import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  fetchSessionsByChapter,
  createSession,
  deleteSession,
  generateText,
} from "../services/chat-session.service"
import { messagesBySessionKey } from "@/features/messages/hooks/use-messages"

export const sessionsByChapterKey = (chapterId: string) =>
  ["chat-sessions", "chapter", chapterId] as const

export function useSessionsByChapter(chapterId: string) {
  return useQuery({
    queryKey: sessionsByChapterKey(chapterId),
    queryFn: () => fetchSessionsByChapter(chapterId),
    enabled: Boolean(chapterId),
  })
}

export function useCreateSession(chapterId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => createSession(chapterId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionsByChapterKey(chapterId) })
    },
  })
}

export function useDeleteSession(chapterId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionsByChapterKey(chapterId) })
    },
  })
}

export function useGenerate(sessionId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (prompt: string) => generateText(sessionId, prompt),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: messagesBySessionKey(sessionId) })
    },
  })
}
