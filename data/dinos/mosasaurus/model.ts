import type { DinoModelConfig } from '../../types'

export const model: DinoModelConfig = {
  kind: "marine",
  bodyLength: 6,
  bodyRadius: 1.1,
  neckLength: 0.4,
  neckRadius: 0.55,
  headSize: 1.8,
  tailLength: 6,
  legHeight: 1,
  legRadius: 0.22,
  neckAngle: 0,
  features: {
    "longSnout": true,
    "tailFluke": true
  },
}
