import Link from 'next/link'
import type { SilhouetteKey } from '../data/types'
import { DinoIcon } from './DinoIcon'

export type DinoCardData = {
  id: string
  name: string
  color: string
  silhouette: SilhouetteKey
  lengthM: number
  diet: string
  familyName?: string
}

export function DinoCard({ dino }: { dino: DinoCardData }) {
  return (
    <Link href={`/dino/${dino.id}`} className="dino-card" style={{ ['--tint' as string]: dino.color }}>
      <span className="dino-card-icon">
        <DinoIcon kind={dino.silhouette} title={dino.name} />
      </span>
      <span className="dino-card-name">{dino.name}</span>
      {dino.familyName != null && <span className="dino-card-family">{dino.familyName}</span>}
      <span className="dino-card-meta">
        {dino.lengthM} m · {dino.diet}
      </span>
    </Link>
  )
}
