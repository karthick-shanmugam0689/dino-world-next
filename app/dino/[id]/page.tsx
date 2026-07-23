import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { dinosaurs } from '../../../data/dinos'
import { getDino, getFamily } from '../../../data/helpers'
import { DinoDetailView } from '../../../components/DinoDetailView'

export function generateStaticParams() {
  return dinosaurs.map((d) => ({ id: d.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const dino = getDino(id)
  if (!dino) return {}

  const photo = dino.photos.realistic ?? dino.photos.skeleton
  return {
    title: dino.name,
    description: `${dino.meaning} — ${dino.description}`,
    openGraph: {
      title: `${dino.name} · DinoVerse`,
      description: dino.description,
      images: photo ? [{ url: photo.image }] : undefined,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const dino = getDino(id)
  if (!dino) redirect('/')
  const family = getFamily(dino.familyId)!

  return <DinoDetailView dino={dino} family={family} />
}
