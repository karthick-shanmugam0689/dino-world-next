'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Dino, Family } from '../data/types'
import { DinoIcon } from './DinoIcon'

export function FamilyPageView({ family, members }: { family: Family; members: Dino[] }) {
  return (
    <main className="page family-page" key={family.id}>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="crumb-sep">›</span>
        <span className="crumb-current">{family.name}</span>
      </nav>

      <motion.header
        className="family-header"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="family-period">{family.period}</p>
        <h1>{family.name}</h1>
        <p className="family-desc">{family.description}</p>
        <div className="chips">
          {family.traits.map((t) => (
            <span className="chip" key={t}>
              {t}
            </span>
          ))}
        </div>
      </motion.header>

      <section className="tree" aria-label={`${family.name} family tree`}>
        <motion.div
          className="tree-root"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          {family.name}
        </motion.div>

        <motion.div
          className="tree-trunk"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        />
        <motion.div
          className="tree-branch"
          style={{ ['--n' as string]: members.length }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.75, duration: 0.4 }}
        />

        <div className="tree-row">
          {members.map((dino, i) => (
            <motion.div
              className="tree-leaf"
              key={dino.id}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + i * 0.14, duration: 0.5, ease: 'easeOut' }}
            >
              <span className="tree-stem" />
              <Link href={`/dino/${dino.id}`} className="tree-node" style={{ ['--tint' as string]: dino.color }}>
                <span className="tree-node-icon">
                  <DinoIcon kind={dino.silhouette} title={dino.name} />
                </span>
                <span className="tree-node-name">{dino.name}</span>
                <span className="tree-node-meta">{dino.lengthM} m</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
