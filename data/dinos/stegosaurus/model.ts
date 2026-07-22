import type { DinoModelConfig } from '../../types'

export const model: DinoModelConfig = {
  kind: "quadruped",
  bodyLength: 4.4,
  bodyRadius: 1.4,
  neckLength: 1.1,
  neckRadius: 0.4,
  headSize: 0.6,
  tailLength: 3.2,
  legHeight: 1.6,
  legRadius: 0.32,
  neckAngle: -0.25,
  features: {
    "plates": true
  },
}
