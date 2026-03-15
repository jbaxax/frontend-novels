"use client"

import { useState } from "react"
import { PlusCircle, Pencil, Trash2, ShieldAlert, Shield } from "lucide-react"
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
import { WorldRuleForm } from "./world-rule-form"
import {
  useWorldRulesByNovel,
  useCreateWorldRule,
  useUpdateWorldRule,
  useDeleteWorldRule,
} from "../hooks/use-world-rules"
import type { WorldRule, RuleCategory } from "../types/world-rule.types"
import type { WorldRuleFormValues } from "./world-rule-form-schema"
import { toast } from "sonner"

const categoryConfig: Record<RuleCategory, { label: string; className: string }> = {
  magic: {
    label: "Magia",
    className: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400",
  },
  technology: {
    label: "Tecnología",
    className: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
  },
  social: {
    label: "Social",
    className: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  },
  geography: {
    label: "Geografía",
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  biology: {
    label: "Biología",
    className: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
  },
  adult: {
    label: "Adulto",
    className: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
  },
}

interface WorldRuleRowProps {
  rule: WorldRule
  novelId: string
}

function WorldRuleRow({ rule, novelId }: WorldRuleRowProps) {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const updateRule = useUpdateWorldRule(novelId)
  const deleteRule = useDeleteWorldRule(novelId)
  const { label, className } = categoryConfig[rule.category]

  function handleEdit(values: WorldRuleFormValues) {
    updateRule.mutate(
      { id: rule.id, dto: values },
      {
        onSuccess: () => {
          setEditOpen(false)
          toast.success("Regla actualizada")
        },
        onError: () => toast.error("Error al actualizar la regla"),
      },
    )
  }

  function handleDelete() {
    deleteRule.mutate(rule.id, {
      onSuccess: () => {
        setDeleteOpen(false)
        toast.success("Regla eliminada")
      },
      onError: () => toast.error("Error al eliminar la regla"),
    })
  }

  return (
    <>
      <div className="group flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/40">
        <div className="mt-0.5 shrink-0">
          {rule.isBreakable ? (
            <ShieldAlert className="h-5 w-5 text-amber-500" />
          ) : (
            <Shield className="h-5 w-5 text-muted-foreground" />
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium">{rule.name}</span>
            <Badge variant="secondary" className={className}>
              {label}
            </Badge>
            {rule.isBreakable && (
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                Rompible
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{rule.description}</p>
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

      <WorldRuleForm
        open={editOpen}
        onOpenChange={setEditOpen}
        onSubmit={handleEdit}
        isPending={updateRule.isPending}
        defaultValues={rule}
      />

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar regla?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará{" "}
              <span className="font-medium text-foreground">{rule.name}</span>{" "}
              permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteRule.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteRule.isPending ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

interface WorldRuleListProps {
  novelId: string
}

export function WorldRuleList({ novelId }: WorldRuleListProps) {
  const [createOpen, setCreateOpen] = useState(false)
  const { data: rules, isLoading, isError } = useWorldRulesByNovel(novelId)
  const createRule = useCreateWorldRule(novelId)

  function handleCreate(values: WorldRuleFormValues) {
    createRule.mutate(
      { ...values, novelId },
      {
        onSuccess: () => {
          setCreateOpen(false)
          toast.success("Regla creada")
        },
        onError: () => toast.error("Error al crear la regla"),
      },
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reglas del mundo</h2>
          <p className="text-sm text-muted-foreground">
            Las leyes que gobiernan tu universo
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva regla
        </Button>
      </div>

      {isError && (
        <p className="text-sm text-destructive">Error al cargar las reglas.</p>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-start gap-4 rounded-lg border p-4">
              <Skeleton className="mt-0.5 h-5 w-5 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : rules?.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-20 text-center">
          <Shield className="h-8 w-8 text-muted-foreground" />
          <div>
            <p className="font-medium">No hay reglas todavía</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Define las leyes de tu universo
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {rules?.map((rule) => (
            <WorldRuleRow key={rule.id} rule={rule} novelId={novelId} />
          ))}
        </div>
      )}

      <WorldRuleForm
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
        isPending={createRule.isPending}
      />
    </div>
  )
}
