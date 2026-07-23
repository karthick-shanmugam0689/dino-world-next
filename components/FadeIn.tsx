'use client'

import { motion, type MotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

/** Tiny motion island so page shells can stay Server Components. */
export function FadeIn({
  children,
  className,
  ...motionProps
}: { children: ReactNode; className?: string } & MotionProps) {
  return (
    <motion.div className={className} {...motionProps}>
      {children}
    </motion.div>
  )
}
