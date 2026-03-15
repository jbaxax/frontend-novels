import Link from "next/link"
import {
  BookOpen,
  Users,
  Globe,
  MapPin,
  Clock,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface NovelLayoutProps {
  children: React.ReactNode
  params: Promise<{ novelId: string }>
}

const navItems = [
  { label: "Volúmenes", href: "volumes", icon: BookOpen },
  { label: "Personajes", href: "characters", icon: Users },
  { label: "Reglas del mundo", href: "world-rules", icon: Globe },
  { label: "Ubicaciones", href: "locations", icon: MapPin },
  { label: "Timeline", href: "timeline", icon: Clock },
]

export default async function NovelLayout({ children, params }: NovelLayoutProps) {
  const { novelId } = await params

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="flex w-56 shrink-0 flex-col border-r bg-muted/30 px-3 py-4">
        <Button asChild variant="ghost" size="sm" className="mb-4 justify-start px-2">
          <Link href="/novels">
            <ChevronLeft className="mr-1.5 h-4 w-4" />
            Mis novelas
          </Link>
        </Button>

        <Separator className="mb-4" />

        <nav className="flex flex-col gap-1">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Button
              key={href}
              asChild
              variant="ghost"
              size="sm"
              className="justify-start px-2"
            >
              <Link href={`/novels/${novelId}/${href}`}>
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Link>
            </Button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
