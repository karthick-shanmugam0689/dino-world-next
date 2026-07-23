'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Dino, Period } from '../data/types'
import { DinoCard } from './DinoCard'

export function PeriodPageView({
  period,
  members,
  allPeriods,
  familyNames,
}: {
  period: Period
  members: Dino[]
  allPeriods: Array<Pick<Period, 'id' | 'name' | 'color'>>
  familyNames: Record<string, string>
}) {
  return (
    <main className="page period-page" key={period.id}>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="crumb-sep">›</span>
        <span className="crumb-current">{period.name}</span>
      </nav>

      <motion.header
        className="family-header"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="family-period" style={{ color: period.color }}>
          {period.range}
        </p>
        <h1>The {period.name}</h1>
        <p className="family-desc">{period.blurb}</p>
      </motion.header>

      <div className="period-nav">
        {allPeriods.map((p) =>
          p.id === period.id ? (
            <span key={p.id} className="period-nav-item current" style={{ borderColor: p.color, color: p.color }}>
              {p.name}
            </span>
          ) : (
            <Link key={p.id} href={`/period/${p.id}`} className="period-nav-item">
              {p.name}
            </Link>
          ),
        )}
      </div>

      <p className="period-count">
        {members.length} dinosaurs from this period in our field guide, largest first:
      </p>

      <div className="dino-grid">
        {members.map((dino, i) => (
          <motion.div
            key={dino.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: (i % 4) * 0.08, duration: 0.55, ease: 'easeOut' }}
          >
            <DinoCard
              dino={{
                id: dino.id,
                name: dino.name,
                color: dino.color,
                silhouette: dino.silhouette,
                lengthM: dino.lengthM,
                diet: dino.diet,
                familyName: familyNames[dino.familyId],
              }}
            />
          </motion.div>
        ))}
      </div>
    </main>
  )
}
