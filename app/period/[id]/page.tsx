import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { periods } from '../../../data/periods'
import { families } from '../../../data/families'
import { getPeriod, getPeriodMembers } from '../../../data/helpers'
import { PeriodPageView } from '../../../components/PeriodPageView'

export function generateStaticParams() {
  return periods.map((p) => ({ id: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const period = getPeriod(id)
  if (!period) return {}

  return {
    title: `The ${period.name}`,
    description: period.blurb,
    openGraph: {
      title: `The ${period.name} · DinoVerse`,
      description: period.blurb,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const period = getPeriod(id)
  if (!period) redirect('/')
  const members = getPeriodMembers(period.id).sort((a, b) => b.lengthM - a.lengthM)
  const familyNames = Object.fromEntries(families.map((f) => [f.id, f.name]))
  const allPeriods = periods.map((p) => ({ id: p.id, name: p.name, color: p.color }))

  return (
    <PeriodPageView
      period={period}
      members={members}
      allPeriods={allPeriods}
      familyNames={familyNames}
    />
  )
}
