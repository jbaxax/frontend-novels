"use client"

import { useState } from "react"
import { PlusCircle, Clock, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
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
import { TimelineEventForm } from "./timeline-event-form"
import {
  useTimelineEventsByNovel,
  useCreateTimelineEvent,
  useUpdateTimelineEvent,
  useDeleteTimelineEvent,
} from "../hooks/use-timeline-events"
import type { TimelineEvent, EventImportance } from "../types/timeline-event.types"
import type { TimelineEventFormValues } from "./timeline-event-form-schema"
import { toast } from "sonner"

const importanceConfig: Record<
  EventImportance,
  { label: string; className: string; barClass: string }
> = {
  low: {
    label: "Baja",
    className: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
    barClass: "bg-slate-300",
  },
  medium: {
    label: "Media",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    barClass: "bg-blue-400",
  },
  high: {
    label: "Alta",
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    barClass: "bg-amber-400",
  },
  critical: {
    label: "Crítica",
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    barClass: "bg-red-500",
  },
}

interface TimelineEventRowProps {
  event: TimelineEvent
  novelId: string
}

function TimelineEventRow({ event, novelId }: TimelineEventRowProps) {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const updateEvent = useUpdateTimelineEvent(novelId)
  const deleteEvent = useDeleteTimelineEvent(novelId)
  const { label, className, barClass } = importanceConfig[event.importance]

  function handleEdit(values: TimelineEventFormValues) {
    updateEvent.mutate(
      { id: event.id, dto: values },
      {
        onSuccess: () => {
          setEditOpen(false)
          toast.success("Evento actualizado")
        },
        onError: () => toast.error("Error al actualizar el evento"),
      },
    )
  }

  function handleDelete() {
    deleteEvent.mutate(event.id, {
      onSuccess: () => {
        setDeleteOpen(false)
        toast.success("Evento eliminado")
      },
      onError: () => toast.error("Error al eliminar el evento"),
    })
  }

  return (
    <>
      <div className="group flex gap-4">
        <div className="flex flex-col items-center">
          <div className={`h-3 w-3 rounded-full mt-1.5 shrink-0 ${barClass}`} />
          <div className="w-px flex-1 bg-border" />
        </div>

        <div className="flex-1 pb-6 min-w-0">
          <div className="flex items-start justify-between gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/40">
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{event.title}</span>
                <Badge variant="secondary" className={className}>
                  {label}
                </Badge>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {event.storyDate}
              </div>
              <p className="text-sm text-muted-foreground">{event.description}</p>
            </div>

            <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setEditOpen(true)}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => setDeleteOpen(true)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <TimelineEventForm
        open={editOpen}
        onOpenChange={setEditOpen}
        onSubmit={handleEdit}
        isPending={updateEvent.isPending}
        defaultValues={event}
      />

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar evento?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará{" "}
              <span className="font-medium text-foreground">{event.title}</span>{" "}
              permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteEvent.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteEvent.isPending ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

interface TimelineEventListProps {
  novelId: string
}

export function TimelineEventList({ novelId }: TimelineEventListProps) {
  const [createOpen, setCreateOpen] = useState(false)
  const { data: events, isLoading, isError } = useTimelineEventsByNovel(novelId)
  const createEvent = useCreateTimelineEvent(novelId)

  function handleCreate(values: TimelineEventFormValues) {
    createEvent.mutate(
      { ...values, novelId },
      {
        onSuccess: () => {
          setCreateOpen(false)
          toast.success("Evento creado")
        },
        onError: () => toast.error("Error al crear el evento"),
      },
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Timeline</h2>
          <p className="text-sm text-muted-foreground">
            La línea de tiempo de tu historia
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo evento
        </Button>
      </div>

      {isError && (
        <p className="text-sm text-destructive">Error al cargar los eventos.</p>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <Skeleton className="h-3 w-3 rounded-full mt-1.5" />
                <Skeleton className="w-px flex-1 mt-1" />
              </div>
              <div className="flex-1 space-y-2 pb-6 rounded-lg border p-4">
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-5 w-14" />
                </div>
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : events?.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-20 text-center">
          <Clock className="h-8 w-8 text-muted-foreground" />
          <div>
            <p className="font-medium">No hay eventos todavía</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Registra los eventos clave de tu historia
            </p>
          </div>
        </div>
      ) : (
        <div>
          {events?.map((event) => (
            <TimelineEventRow key={event.id} event={event} novelId={novelId} />
          ))}
        </div>
      )}

      <TimelineEventForm
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
        isPending={createEvent.isPending}
      />
    </div>
  )
}
