'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { PeriodId } from '../../data/types'
import { TimelineCard, type TimelineCardData } from '../TimelineCard'

export type HomePeriodBlock = {
  id: PeriodId
  name: string
  range: string
  color: string
  blurb: string
  highlights: TimelineCardData[]
}

export function TimelineSection({ timeline }: { timeline: HomePeriodBlock[] }) {
  return (
    <section className="timeline-section">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        A walk through time
      </motion.h2>
      <motion.p
        className="section-sub"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        Follow the path from the first dinosaurs to the last day of the Cretaceous.
      </motion.p>

      <div className="timeline">
        {timeline.map((period, pi) => (
          <div className="tl-period" key={period.id}>
            <motion.div
              className="tl-period-node"
              style={{ ['--pcolor' as string]: period.color }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <Link href={`/period/${period.id}`} className="tl-period-pill">
                <span className="tl-period-name">{period.name}</span>
                <span className="tl-period-range">{period.range}</span>
              </Link>
            </motion.div>
            <motion.p
              className="tl-period-blurb"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {period.blurb}
            </motion.p>

            {period.highlights.map((dino, i) => {
              const side = (pi * period.highlights.length + i) % 2 === 0 ? 'left' : 'right'
              return (
                <motion.div
                  className={`tl-item tl-${side}`}
                  key={dino.id}
                  initial={{ opacity: 0, x: side === 'left' ? -48 : 48 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                >
                  <TimelineCard dino={dino} />
                </motion.div>
              )
            })}
          </div>
        ))}

        <motion.div
          className="tl-extinction"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="tl-extinction-icon" aria-hidden>
            ☄️
          </span>
          <h3>66 million years ago</h3>
          <p>
            A 10-kilometer asteroid strikes the Yucatán and the age of dinosaurs ends in a single
            terrible day. Only one branch survives — look out the window, and you might see one
            at the bird feeder.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
