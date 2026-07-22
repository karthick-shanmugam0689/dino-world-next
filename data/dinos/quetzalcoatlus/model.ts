import type { DinoModelConfig } from '../../types'

export const model: DinoModelConfig = {
  kind: "pterosaur",
  bodyLength: 1.3,
  bodyRadius: 0.5,
  neckLength: 2.6,
  neckRadius: 0.22,
  headSize: 0.95,
  tailLength: 0.2,
  legHeight: 1.7,
  legRadius: 0.13,
  neckAngle: 0.25,
  wingSpan: 10.5,
  features: {
    "bill": true,
    "longSnout": true
  },
}
