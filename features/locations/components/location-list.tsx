"use client"

import { useState } from "react"
import { PlusCircle, MapPin, ChevronRight, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { LocationForm } from "./location-form"
import {
  useLocationsByNovel,
  useCreateLocation,
  useUpdateLocation,
  useDeleteLocation,
} from "../hooks/use-locations"
import type { Location } from "../types/location.types"
import type { LocationFormValues } from "./location-form-schema"
import { toast } from "sonner"

interface LocationRowProps {
  location: Location
  novelId: string
  allLocations: Location[]
}

function LocationRow({ location, novelId, allLocations }: LocationRowProps) {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const updateLocation = useUpdateLocation(novelId)
  const deleteLocation = useDeleteLocation(novelId)

  function handleEdit(values: LocationFormValues) {
    updateLocation.mutate(
      { id: location.id, dto: values },
      {
        onSuccess: () => {
          setEditOpen(false)
          toast.success("Ubicación actualizada")
        },
        onError: () => toast.error("Error al actualizar la ubicación"),
      },
    )
  }

  function handleDelete() {
    deleteLocation.mutate(location.id, {
      onSuccess: () => {
        setDeleteOpen(false)
        toast.success("Ubicación eliminada")
      },
      onError: () => toast.error("Error al eliminar la ubicación"),
    })
  }

  return (
    <>
      <div className="group flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/40">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {location.parent && (
              <>
                <span className="text-sm text-muted-foreground">
                  {location.parent.name}
                </span>
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              </>
            )}
            <span className="font-medium">{location.name}</span>
          </div>
          {location.description && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {location.description}
            </p>
          )}
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

      <LocationForm
        open={editOpen}
        onOpenChange={setEditOpen}
        onSubmit={handleEdit}
        isPending={updateLocation.isPending}
        defaultValues={location}
        allLocations={allLocations}
      />

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar ubicación?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará{" "}
              <span className="font-medium text-foreground">{location.name}</span>.
              Las ubicaciones hijas quedarán sin padre.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteLocation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteLocation.isPending ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

interface LocationListProps {
  novelId: string
}

export function LocationList({ novelId }: LocationListProps) {
  const [createOpen, setCreateOpen] = useState(false)
  const { data: locations, isLoading, isError } = useLocationsByNovel(novelId)
  const createLocation = useCreateLocation(novelId)

  function handleCreate(values: LocationFormValues) {
    createLocation.mutate(
      { ...values, novelId },
      {
        onSuccess: () => {
          setCreateOpen(false)
          toast.success("Ubicación creada")
        },
        onError: () => toast.error("Error al crear la ubicación"),
      },
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Ubicaciones</h2>
          <p className="text-sm text-muted-foreground">
            Los lugares de tu universo
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva ubicación
        </Button>
      </div>

      {isError && (
        <p className="text-sm text-destructive">Error al cargar las ubicaciones.</p>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border p-4">
              <Skeleton className="mt-0.5 h-4 w-4" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : locations?.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-20 text-center">
          <MapPin className="h-8 w-8 text-muted-foreground" />
          <div>
            <p className="font-medium">No hay ubicaciones todavía</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Construye el mapa de tu universo
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {locations?.map((location) => (
            <LocationRow
              key={location.id}
              location={location}
              novelId={novelId}
              allLocations={locations}
            />
          ))}
        </div>
      )}

      <LocationForm
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
        isPending={createLocation.isPending}
        allLocations={locations ?? []}
      />
    </div>
  )
}
