'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import type { Dino, Family } from '../data/dinosaurs'
import { getPeriodId } from '../data/dinosaurs'

// Code-split three.js out of the page's initial bundle: the WebGL scene only
// loads once this Client Component mounts, keeping it off the critical path.
const DinoCanvas = dynamic(() => import('./DinoCanvas').then((m) => m.DinoCanvas), {
  ssr: false,
  loading: () => (
    <div className="dino-visual">
      <div className="dino-stage dino-stage-loading" aria-hidden />
    </div>
  ),
})

type StatKey = 'lengthM' | 'heightM' | 'weightKg' | 'speedKmh' | 'wingSpanM'
const MAX: Record<StatKey, number> = { lengthM: 25, heightM: 13, weightKg: 40000, speedKmh: 60, wingSpanM: 12 }

const CLADE_LABEL: Record<NonNullable<Dino['clade']>, string> = {
  'marine-reptile': 'marine reptile',
  pterosaur: 'pterosaur',
}

export function DinoDetailView({ dino, family }: { dino: Dino; family: Family }) {
  const stats: Array<{ key: StatKey; label: string; unit: string }> = [
    { key: 'lengthM', label: 'Length', unit: 'm' },
    ...(dino.wingSpanM ? [{ key: 'wingSpanM' as const, label: 'Wingspan', unit: 'm' }] : []),
    { key: 'heightM', label: 'Height', unit: 'm' },
    { key: 'weightKg', label: 'Weight', unit: 'kg' },
    { key: 'speedKmh', label: 'Top speed', unit: 'km/h' },
  ]

  return (
    <main className="page detail-page" key={dino.id}>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="crumb-sep">›</span>
        <Link href={`/family/${family.id}`}>{family.name}</Link>
        <span className="crumb-sep">›</span>
        <span className="crumb-current">{dino.name}</span>
      </nav>

      <div className="detail-layout">
        <motion.section
          className="detail-visual"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <DinoCanvas dino={dino} />
        </motion.section>

        <section className="detail-info">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            {dino.clade && <p className="not-dino-badge">Not a dinosaur — {CLADE_LABEL[dino.clade]}</p>}
            <p className="detail-meaning">"{dino.meaning}"</p>
            <h1 style={{ color: dino.color }}>{dino.name}</h1>
            <div className="chips">
              <Link className="chip chip-link" href={`/period/${getPeriodId(dino)}`} title="See every dinosaur from this period">
                {dino.period}
              </Link>
              <span className={`chip chip-${dino.diet.toLowerCase()}`}>{dino.diet}</span>
              <span className="chip">{dino.location}</span>
            </div>
          </motion.div>

          <motion.p
            className="detail-desc"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
          >
            {dino.description}
          </motion.p>

          <div className="stat-list">
            {stats.map((s, i) => {
              const value = dino[s.key] as number
              return (
                <motion.div
                  className="stat-row"
                  key={s.key}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.1, duration: 0.5 }}
                >
                  <span className="stat-label">{s.label}</span>
                  <div className="stat-bar">
                    <motion.span
                      className="stat-fill"
                      style={{ background: dino.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(4, (value / MAX[s.key]) * 100)}%` }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="stat-value">
                    {value.toLocaleString()} {s.unit}
                  </span>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            className="fact-box"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.55 }}
          >
            <h2>Field notes</h2>
            <ul>
              {dino.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            <Link className="family-link" href={`/family/${family.id}`}>
              Meet the rest of the {family.name} family →
            </Link>
          </motion.div>
        </section>
      </div>
    </main>
  )
}
