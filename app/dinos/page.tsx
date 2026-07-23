import type { Metadata } from 'next'
import { dinosaurs } from '../../data/dinos'
import { families } from '../../data/families'
import { DinoIndexView } from '../../components/DinoIndexView'

export const metadata: Metadata = {
  title: 'A–Z index',
  description: 'Every dinosaur in the guide, sorted alphabetically.',
}

export default function Page() {
  const familyNames = Object.fromEntries(families.map((f) => [f.id, f.name]))
  return <DinoIndexView dinosaurs={dinosaurs} familyNames={familyNames} />
}
