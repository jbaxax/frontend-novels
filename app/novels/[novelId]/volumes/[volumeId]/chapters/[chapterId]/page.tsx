import { ChapterEditor } from "@/features/chapters/components/chapter-editor"
import { ChatPanel } from "@/features/chat-sessions/components/chat-panel"

interface ChapterPageProps {
  params: Promise<{ novelId: string; volumeId: string; chapterId: string }>
}

export const metadata = { title: "Editor de capítulo" }

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { novelId, volumeId, chapterId } = await params

  return (
    <div className="grid h-full grid-cols-2 overflow-hidden">
      <ChapterEditor
        chapterId={chapterId}
        novelId={novelId}
        volumeId={volumeId}
      />
      <ChatPanel chapterId={chapterId} />
    </div>
  )
}
