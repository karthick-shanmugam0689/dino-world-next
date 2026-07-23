'use client'

import { motion } from 'framer-motion'
import { DinoCard, type DinoCardData } from '../DinoCard'

export function FeaturedGrid({ featured }: { featured: DinoCardData[] }) {
  return (
    <section className="dino-grid-section">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        The famous eight
      </motion.h2>
      <motion.p
        className="section-sub"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        Pick a dinosaur to meet it up close — in 3D, next to a human for scale.
      </motion.p>

      <div className="dino-grid">
        {featured.map((dino, i) => (
          <motion.div
            key={dino.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: (i % 4) * 0.08, duration: 0.55, ease: 'easeOut' }}
          >
            <DinoCard dino={dino} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
