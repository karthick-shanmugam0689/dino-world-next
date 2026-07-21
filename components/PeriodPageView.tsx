'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Dino, Period } from '../data/dinosaurs'
import { getFamily, periods } from '../data/dinosaurs'
import { DinoIcon } from './DinoIcon'

export function PeriodPageView({ period, members }: { period: Period; members: Dino[] }) {
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
        {periods.map((p) =>
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
            <Link href={`/dino/${dino.id}`} className="dino-card" style={{ ['--tint' as string]: dino.color }}>
              <span className="dino-card-icon">
                <DinoIcon kind={dino.silhouette} title={dino.name} />
              </span>
              <span className="dino-card-name">{dino.name}</span>
              <span className="dino-card-family">{getFamily(dino.familyId)?.name}</span>
              <span className="dino-card-meta">
                {dino.lengthM} m · {dino.diet}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  )
}
