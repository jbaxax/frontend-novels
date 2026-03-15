import { VolumeList } from "@/features/volumes/components/volume-list"

interface VolumesPageProps {
  params: Promise<{ novelId: string }>
}

export const metadata = { title: "Volúmenes" }

export default async function VolumesPage({ params }: VolumesPageProps) {
  const { novelId } = await params
  return <VolumeList novelId={novelId} />
}
