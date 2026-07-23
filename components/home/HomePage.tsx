import type { DinoCardData } from '../DinoCard'
import type { HomePeriodBlock } from './TimelineSection'
import { HeroSection } from './HeroSection'
import { FeaturedGrid } from './FeaturedGrid'
import { TimelineSection } from './TimelineSection'
import { SiteFooter } from './SiteFooter'

export type { DinoCardData as HomeDinoCard }
export type { HomePeriodBlock }

/** Server-friendly home composer — client islands live in the section components. */
export function HomePage({
  featured,
  timeline,
}: {
  featured: DinoCardData[]
  timeline: HomePeriodBlock[]
}) {
  return (
    <main>
      <HeroSection />
      <FeaturedGrid featured={featured} />
      <TimelineSection timeline={timeline} />
      <SiteFooter />
    </main>
  )
}
