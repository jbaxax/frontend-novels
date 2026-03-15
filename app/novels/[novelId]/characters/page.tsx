import { CharacterList } from "@/features/characters/components/character-list"

interface CharactersPageProps {
  params: Promise<{ novelId: string }>
}

export const metadata = { title: "Personajes" }

export default async function CharactersPage({ params }: CharactersPageProps) {
  const { novelId } = await params
  return <div className="h-full overflow-auto p-6"><CharacterList novelId={novelId} /></div>
}
