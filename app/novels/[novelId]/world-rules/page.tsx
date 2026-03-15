import { WorldRuleList } from "@/features/world-rules/components/world-rule-list"

interface WorldRulesPageProps {
  params: Promise<{ novelId: string }>
}

export const metadata = { title: "Reglas del mundo" }

export default async function WorldRulesPage({ params }: WorldRulesPageProps) {
  const { novelId } = await params
  return <WorldRuleList novelId={novelId} />
}
