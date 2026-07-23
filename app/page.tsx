import { featuredDinos, getDino, getFamily } from '../data/helpers'
import { periods } from '../data/periods'
import { HomePage, type HomeDinoCard, type HomePeriodBlock } from '../components/home/HomePage'

function toCard(dino: NonNullable<ReturnType<typeof getDino>>): HomeDinoCard {
  return {
    id: dino.id,
    name: dino.name,
    color: dino.color,
    silhouette: dino.silhouette,
    lengthM: dino.lengthM,
    diet: dino.diet,
    familyName: getFamily(dino.familyId)?.name ?? '',
  }
}

export default function Page() {
  const featured = featuredDinos.map(toCard)
  const timeline: HomePeriodBlock[] = periods.map((period) => ({
    id: period.id,
    name: period.name,
    range: period.range,
    color: period.color,
    blurb: period.blurb,
    highlights: period.highlights
      .map((id) => getDino(id))
      .filter((d): d is NonNullable<typeof d> => !!d)
      .map(toCard),
  }))

  return <HomePage featured={featured} timeline={timeline} />
}
