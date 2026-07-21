import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { families, getFamily, getFamilyMembers } from '../../../data/dinosaurs'
import { FamilyPageView } from '../../../components/FamilyPageView'

export function generateStaticParams() {
  return families.map((f) => ({ id: f.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const family = getFamily(id)
  if (!family) return {}

  return {
    title: family.name,
    description: family.description,
    openGraph: {
      title: `${family.name} · DinoVerse`,
      description: family.description,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const family = getFamily(id)
  if (!family) redirect('/')
  const members = getFamilyMembers(family.id)

  return <FamilyPageView family={family} members={members} />
}
