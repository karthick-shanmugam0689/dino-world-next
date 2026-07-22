import type { DinoModelConfig } from '../../types'

export const model: DinoModelConfig = {
  kind: "sauropod",
  bodyLength: 8,
  bodyRadius: 2.4,
  neckLength: 8.5,
  neckRadius: 0.8,
  headSize: 1.1,
  tailLength: 6,
  legHeight: 3.6,
  legRadius: 0.6,
  neckAngle: 1.15,
  frontLegScale: 1.5,
  features: {
    "steepNeck": true
  },
}
