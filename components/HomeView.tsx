'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { featuredDinos, getDino, getFamily } from '../data/helpers'
import { periods } from '../data/periods'
import { DinoIcon } from './DinoIcon'

export function HomeView() {
  const heroRef = useRef<HTMLDivElement>(null)

  // Parallax: move each [data-speed] layer at its own rate, off the React render path.
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const layers = Array.from(hero.querySelectorAll<HTMLElement>('[data-speed]'))
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      for (const layer of layers) {
        const speed = Number(layer.dataset.speed)
        layer.style.transform = `translate3d(0, ${y * speed}px, 0)`
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <main>
      <section className="hero" ref={heroRef}>
        <div className="hero-layer hero-sky" data-speed="0.55">
          <div className="hero-sun" />
        </div>

        {/* far mountain ridge */}
        <svg
          className="hero-layer hero-svg mountains-far"
          data-speed="0.4"
          viewBox="0 0 1440 320"
          preserveAspectRatio="xMidYMax slice"
        >
          <path d="M0 320 L0 200 L140 90 L260 190 L390 60 L540 210 L660 120 L810 230 L950 80 L1100 200 L1240 110 L1360 190 L1440 150 L1440 320 Z" />
        </svg>

        {/* mid hills with a sauropod herd */}
        <svg
          className="hero-layer hero-svg hills-mid"
          data-speed="0.25"
          viewBox="0 0 1440 320"
          preserveAspectRatio="xMidYMax slice"
        >
          <path d="M0 320 L0 240 C180 170 340 220 520 200 C720 175 880 230 1060 205 C1220 185 1330 220 1440 195 L1440 320 Z" />
          <g className="herd">
            <g transform="translate(940 118) scale(1.6)">
              <path d="M2 56 L36 49 L36 62 Z M52 54 m-22 0 a22 13 0 1 0 44 0 a22 13 0 1 0 -44 0 M62 47 C71 37 77 25 79 10 L90 12 C88 28 82 41 73 52 Z M86 9 m-8 0 a8 5.5 0 1 0 16 0 a8 5.5 0 1 0 -16 0 M34 61 h9 v14 h-9 Z M55 59 h9 v16 h-9 Z" />
            </g>
            <g transform="translate(1120 160) scale(0.9) scale(-1,1) translate(-120 0)">
              <path d="M2 56 L36 49 L36 62 Z M52 54 m-22 0 a22 13 0 1 0 44 0 a22 13 0 1 0 -44 0 M62 47 C71 37 77 25 79 10 L90 12 C88 28 82 41 73 52 Z M86 9 m-8 0 a8 5.5 0 1 0 16 0 a8 5.5 0 1 0 -16 0 M34 61 h9 v14 h-9 Z M55 59 h9 v16 h-9 Z" />
            </g>
          </g>
        </svg>

        <div className="hero-title" data-speed="0.3">
          <motion.p
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            230 million years in the making
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Walk among <span>giants</span>
          </motion.h1>
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Meet the legends of the Mesozoic — scroll down to begin the expedition.
          </motion.p>
        </div>

        {/* foreground ferns */}
        <svg
          className="hero-layer hero-svg ferns"
          data-speed="0.08"
          viewBox="0 0 1440 200"
          preserveAspectRatio="xMidYMax slice"
        >
          <path d="M0 200 L0 160 C60 120 90 80 95 30 C110 85 100 130 70 165 C130 130 170 140 200 170 C160 150 130 165 110 200 Z" />
          <path d="M240 200 C230 150 250 100 300 70 C270 120 268 155 285 200 Z" />
          <path d="M1180 200 C1170 140 1200 90 1260 60 C1220 115 1215 155 1235 200 Z" />
          <path d="M1440 200 L1440 140 C1390 110 1360 70 1355 20 C1340 80 1355 130 1390 165 C1330 135 1290 150 1265 185 C1305 160 1340 170 1360 200 Z" />
          <path d="M0 200 L1440 200 L1440 185 C1100 165 400 165 0 185 Z" />
        </svg>

        <div className="scroll-cue" aria-hidden>
          <span />
        </div>
      </section>

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
          {featuredDinos.map((dino, i) => (
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
      </section>

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
          {periods.map((period, pi) => (
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

              {period.highlights.map((dinoId, i) => {
                const dino = getDino(dinoId)!
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
                    <Link
                      href={`/dino/${dino.id}`}
                      className="tl-card"
                      style={{ ['--tint' as string]: dino.color }}
                    >
                      <span className="tl-card-icon">
                        <DinoIcon kind={dino.silhouette} title={dino.name} />
                      </span>
                      <span className="tl-card-text">
                        <span className="tl-card-name">{dino.name}</span>
                        <span className="tl-card-meta">
                          {dino.lengthM} m · {dino.diet}
                        </span>
                      </span>
                    </Link>
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

      <footer className="site-footer">
        DinoVerse — a field guide to the Mesozoic. Sizes and dates are best current estimates.
      </footer>
    </main>
  )
}
