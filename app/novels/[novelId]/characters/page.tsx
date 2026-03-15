import { CharacterList } from "@/features/characters/components/character-list"

interface CharactersPageProps {
  params: Promise<{ novelId: string }>
}

export const metadata = { title: "Personajes" }

export default async function CharactersPage({ params }: CharactersPageProps) {
  const { novelId } = await params
  return <CharacterList novelId={novelId} />
}
