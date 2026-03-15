import { Badge } from "@/components/ui/badge"
import type { CharacterRole, CharacterStatus } from "../types/character.types"

const roleConfig: Record<CharacterRole, { label: string; className: string }> = {
  protagonist: {
    label: "Protagonista",
    className:
      "bg-violet-100 text-violet-800 hover:bg-violet-100 dark:bg-violet-900/30 dark:text-violet-400",
  },
  antagonist: {
    label: "Antagonista",
    className:
      "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400",
  },
  secondary: {
    label: "Secundario",
    className:
      "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400",
  },
  background: {
    label: "Fondo",
    className:
      "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400",
  },
}

const statusConfig: Record<CharacterStatus, { label: string; className: string }> = {
  alive: {
    label: "Vivo",
    className:
      "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400",
  },
  dead: {
    label: "Muerto",
    className:
      "bg-zinc-200 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400",
  },
  missing: {
    label: "Desaparecido",
    className:
      "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400",
  },
  unknown: {
    label: "Desconocido",
    className:
      "bg-slate-100 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400",
  },
}

export function CharacterRoleBadge({ role }: { role: CharacterRole }) {
  const { label, className } = roleConfig[role]
  return (
    <Badge variant="secondary" className={className}>
      {label}
    </Badge>
  )
}

export function CharacterStatusBadge({ status }: { status: CharacterStatus }) {
  const { label, className } = statusConfig[status]
  return (
    <Badge variant="secondary" className={className}>
      {label}
    </Badge>
  )
}
