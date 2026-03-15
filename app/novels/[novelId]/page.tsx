import { redirect } from "next/navigation"

interface NovelPageProps {
  params: Promise<{ novelId: string }>
}

export default async function NovelPage({ params }: NovelPageProps) {
  const { novelId } = await params
  redirect(`/novels/${novelId}/volumes`)
}
