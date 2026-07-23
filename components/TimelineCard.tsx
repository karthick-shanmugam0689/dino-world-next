import Link from 'next/link'
import type { SilhouetteKey } from '../data/types'
import { DinoIcon } from './DinoIcon'

export type TimelineCardData = {
  id: string
  name: string
  color: string
  silhouette: SilhouetteKey
  lengthM: number
  diet: string
}

export function TimelineCard({ dino }: { dino: TimelineCardData }) {
  return (
    <Link href={`/dino/${dino.id}`} className="tl-card" style={{ ['--tint' as string]: dino.color }}>
      <span className="tl-card-icon">
        <DinoIcon kind={dino.silhouette} title={dino.name} />
      </span>
      <span className="tl-card-text">
        <span className="tl-card-name">{dino.name}</span>
        <span className="tl-card-meta">
          {dino.lengthM} m · {dino.diet}
        </span>
      </span>
    </Link>
  )
}
