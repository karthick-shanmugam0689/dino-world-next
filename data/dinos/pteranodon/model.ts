import type { DinoModelConfig } from '../../types'

export const model: DinoModelConfig = {
  kind: "pterosaur",
  bodyLength: 1,
  bodyRadius: 0.42,
  neckLength: 0.9,
  neckRadius: 0.16,
  headSize: 1.1,
  tailLength: 0.25,
  legHeight: 0.5,
  legRadius: 0.05,
  neckAngle: 0.35,
  wingSpan: 6.4,
  features: {
    "bill": true,
    "longSnout": true,
    "crestBlade": true
  },
}
