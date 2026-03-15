"use client"

import { useState, useEffect } from "react"
import { Save, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CharacterAssigner } from "./character-assigner"
import { useChapter, useUpdateChapter } from "../hooks/use-chapters"
import { ChapterStatusBadge } from "./chapter-status-badge"
import { toast } from "sonner"

interface ChapterEditorProps {
  chapterId: string
  novelId: string
  volumeId: string
}

export function ChapterEditor({ chapterId, novelId, volumeId }: ChapterEditorProps) {
  const { data: chapter, isLoading } = useChapter(chapterId)
  const updateChapter = useUpdateChapter(volumeId)

  const [content, setContent] = useState("")
  const [isDirty, setIsDirty] = useState(false)
  const [assignerOpen, setAssignerOpen] = useState(false)

  useEffect(() => {
    if (chapter) {
      setContent(chapter.content ?? "")
      setIsDirty(false)
    }
  }, [chapter])

  function handleContentChange(value: string) {
    setContent(value)
    setIsDirty(true)
  }

  function handleSave() {
    updateChapter.mutate(
      { id: chapterId, dto: { content } },
      {
        onSuccess: () => {
          setIsDirty(false)
          toast.success("Capítulo guardado")
        },
        onError: () => toast.error("Error al guardar"),
      },
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-full flex-col gap-4 p-6">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="flex-1 animate-pulse rounded bg-muted" />
      </div>
    )
  }

  if (!chapter) return null

  const assignedIds = chapter.characters?.map((c) => c.id) ?? []

  return (
    <div className="flex h-full flex-col gap-4 p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold">
            Cap. {chapter.number} — {chapter.title}
          </h1>
          {chapter.summary && (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {chapter.summary}
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ChapterStatusBadge status={chapter.status} />
        </div>
      </div>

      {/* Characters strip */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAssignerOpen(true)}
        >
          <Users className="mr-1.5 h-3.5 w-3.5" />
          Personajes
        </Button>
        {chapter.characters?.map((c) => (
          <Badge key={c.id} variant="secondary" className="text-xs">
            {c.name}
          </Badge>
        ))}
        {assignedIds.length === 0 && (
          <span className="text-xs text-muted-foreground">
            Sin personajes asignados
          </span>
        )}
      </div>

      {/* Editor */}
      <Textarea
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        placeholder="Escribe el contenido del capítulo aquí..."
        className="flex-1 resize-none font-mono text-sm leading-relaxed"
      />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {content.length.toLocaleString()} caracteres ·{" "}
          {content.trim() ? Math.ceil(content.trim().split(/\s+/).length / 200) : 0} min
          de lectura
        </span>
        <Button
          onClick={handleSave}
          disabled={!isDirty || updateChapter.isPending}
          size="sm"
        >
          {updateChapter.isPending ? (
            "Guardando..."
          ) : isDirty ? (
            <>
              <Save className="mr-1.5 h-3.5 w-3.5" />
              Guardar
            </>
          ) : (
            <>
              <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
              Guardado
            </>
          )}
        </Button>
      </div>

      <CharacterAssigner
        open={assignerOpen}
        onOpenChange={setAssignerOpen}
        chapterId={chapterId}
        novelId={novelId}
        assignedIds={assignedIds}
      />
    </div>
  )
}
