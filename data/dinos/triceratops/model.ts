import type { DinoModelConfig } from '../../types'

export const model: DinoModelConfig = {
  kind: "quadruped",
  bodyLength: 4.6,
  bodyRadius: 1.5,
  neckLength: 1,
  neckRadius: 0.75,
  headSize: 1.5,
  tailLength: 2.6,
  legHeight: 1.7,
  legRadius: 0.36,
  neckAngle: 0.05,
  features: {
    "horns": true,
    "frill": true
  },
}
