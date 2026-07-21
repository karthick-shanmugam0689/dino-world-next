import type { Metadata } from 'next'
import { DinoIndexView } from '../../components/DinoIndexView'

export const metadata: Metadata = {
  title: 'A–Z index',
  description: 'Every dinosaur in the guide, sorted alphabetically.',
}

export default function Page() {
  return <DinoIndexView />
}
