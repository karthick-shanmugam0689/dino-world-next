import type { DinoModelConfig } from '../../types'

export const model: DinoModelConfig = {
  kind: "quadruped",
  bodyLength: 2.9,
  bodyRadius: 0.95,
  neckLength: 0.7,
  neckRadius: 0.5,
  headSize: 1.05,
  tailLength: 1.7,
  legHeight: 1.05,
  legRadius: 0.24,
  neckAngle: 0.05,
  features: {
    "horns": true,
    "frill": true,
    "frillSpikes": true
  },
}
