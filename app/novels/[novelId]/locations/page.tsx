import { LocationList } from "@/features/locations/components/location-list"

interface LocationsPageProps {
  params: Promise<{ novelId: string }>
}

export const metadata = { title: "Ubicaciones" }

export default async function LocationsPage({ params }: LocationsPageProps) {
  const { novelId } = await params
  return <div className="h-full overflow-auto p-6"><LocationList novelId={novelId} /></div>
}
