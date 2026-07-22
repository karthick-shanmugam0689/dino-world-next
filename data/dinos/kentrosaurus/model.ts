import type { DinoModelConfig } from '../../types'

export const model: DinoModelConfig = {
  kind: "quadruped",
  bodyLength: 2.3,
  bodyRadius: 0.7,
  neckLength: 0.7,
  neckRadius: 0.22,
  headSize: 0.35,
  tailLength: 1.9,
  legHeight: 0.85,
  legRadius: 0.16,
  neckAngle: -0.25,
  features: {
    "spikedBack": true
  },
}
