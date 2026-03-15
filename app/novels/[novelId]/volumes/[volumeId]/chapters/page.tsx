import { ChapterList } from "@/features/chapters/components/chapter-list"

interface ChaptersPageProps {
  params: Promise<{ novelId: string; volumeId: string }>
}

export const metadata = { title: "Capítulos" }

export default async function ChaptersPage({ params }: ChaptersPageProps) {
  const { novelId, volumeId } = await params
  return <div className="h-full overflow-auto p-6"><ChapterList volumeId={volumeId} novelId={novelId} /></div>
}
