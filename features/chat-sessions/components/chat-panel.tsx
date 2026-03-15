"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Plus, Trash2, Bot, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator"
import { ChatMessage } from "@/features/messages/components/chat-message"
import { useMessagesBySession } from "@/features/messages/hooks/use-messages"
import {
  useSessionsByChapter,
  useCreateSession,
  useDeleteSession,
  useGenerate,
} from "../hooks/use-chat-sessions"
import { toast } from "sonner"

interface ChatPanelProps {
  chapterId: string
}

export function ChatPanel({ chapterId }: ChatPanelProps) {
  const [selectedSessionId, setSelectedSessionId] = useState<string>("")
  const [prompt, setPrompt] = useState("")
  const [deleteOpen, setDeleteOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { data: sessions, isLoading: sessionsLoading } = useSessionsByChapter(chapterId)
  const { data: messages } = useMessagesBySession(selectedSessionId)
  const createSession = useCreateSession(chapterId)
  const deleteSession = useDeleteSession(chapterId)
  const generate = useGenerate(selectedSessionId)

  // Auto-select the most recent session when sessions load
  useEffect(() => {
    if (sessions && sessions.length > 0 && !selectedSessionId) {
      setSelectedSessionId(sessions[0].id)
    }
  }, [sessions, selectedSessionId])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function handleCreateSession() {
    createSession.mutate(undefined, {
      onSuccess: (session) => {
        setSelectedSessionId(session.id)
        toast.success("Nueva sesión creada")
      },
      onError: () => toast.error("Error al crear la sesión"),
    })
  }

  function handleDeleteSession() {
    deleteSession.mutate(selectedSessionId, {
      onSuccess: () => {
        setSelectedSessionId("")
        setDeleteOpen(false)
        toast.success("Sesión eliminada")
      },
      onError: () => toast.error("Error al eliminar la sesión"),
    })
  }

  function handleSend() {
    if (!prompt.trim() || !selectedSessionId) return

    const currentPrompt = prompt
    setPrompt("")

    generate.mutate(currentPrompt, {
      onError: () => {
        setPrompt(currentPrompt)
        toast.error("Error al generar la respuesta")
      },
    })
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const sessionLabel = (createdAt: Date) =>
    createdAt.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })

  return (
    <div className="flex h-full flex-col border-l">
      {/* Session selector */}
      <div className="flex items-center gap-2 border-b p-3">
        <Select
          value={selectedSessionId}
          onValueChange={setSelectedSessionId}
          disabled={!sessions?.length}
        >
          <SelectTrigger className="flex-1 text-xs">
            <SelectValue
              placeholder={
                sessionsLoading ? "Cargando..." : "Sin sesiones — crea una"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {sessions?.map((s) => (
              <SelectItem key={s.id} value={s.id} className="text-xs">
                Sesión — {sessionLabel(s.createdAt)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={handleCreateSession}
          disabled={createSession.isPending}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Nueva sesión</span>
        </Button>

        {selectedSessionId && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 text-destructive hover:text-destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Eliminar sesión</span>
          </Button>
        )}
      </div>

      {/* Messages area */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="flex flex-col gap-4 p-4">
          {!selectedSessionId ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <div className="rounded-full bg-muted p-4">
                <Bot className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Sin sesión activa</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Crea una sesión para empezar a escribir con IA
                </p>
              </div>
              <Button size="sm" onClick={handleCreateSession}>
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                Nueva sesión
              </Button>
            </div>
          ) : messages?.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm text-muted-foreground">
                Escribe un prompt para comenzar la conversación
              </p>
            </div>
          ) : (
            messages?.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}

          {generate.isPending && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Generando respuesta...
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <Separator />

      {/* Input area */}
      <div className="p-3">
        <div className="flex gap-2">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              selectedSessionId
                ? "Escribe tu prompt... (Enter para enviar, Shift+Enter para nueva línea)"
                : "Crea una sesión primero"
            }
            disabled={!selectedSessionId || generate.isPending}
            rows={3}
            className="resize-none text-sm"
          />
          <Button
            onClick={handleSend}
            disabled={!prompt.trim() || !selectedSessionId || generate.isPending}
            size="icon"
            className="h-auto self-end"
          >
            {generate.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="mt-1.5 text-right text-xs text-muted-foreground">
          Enter para enviar · Shift+Enter nueva línea
        </p>
      </div>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar sesión?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminarán todos los mensajes de esta sesión. No se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSession}
              disabled={deleteSession.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteSession.isPending ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
