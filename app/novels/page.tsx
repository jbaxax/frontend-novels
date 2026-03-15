import { NovelList } from "@/features/novels/components/novel-list"

export const metadata = {
  title: "Mis novelas",
}

export default function NovelsPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-10">
      <NovelList />
    </main>
  )
}
