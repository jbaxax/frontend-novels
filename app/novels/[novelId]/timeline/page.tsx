import { TimelineEventList } from "@/features/timeline-events/components/timeline-event-list"

interface TimelinePageProps {
  params: Promise<{ novelId: string }>
}

export const metadata = { title: "Timeline" }

export default async function TimelinePage({ params }: TimelinePageProps) {
  const { novelId } = await params
  return <div className="h-full overflow-auto p-6"><TimelineEventList novelId={novelId} /></div>
}
