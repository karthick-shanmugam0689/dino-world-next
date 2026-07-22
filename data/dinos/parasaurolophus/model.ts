import type { DinoModelConfig } from '../../types'

export const model: DinoModelConfig = {
  kind: "theropod",
  bodyLength: 4.4,
  bodyRadius: 1.2,
  neckLength: 1.6,
  neckRadius: 0.42,
  headSize: 1,
  tailLength: 4.4,
  legHeight: 1.9,
  legRadius: 0.3,
  neckAngle: 0.55,
  arms: "normal",
  features: {
    "crest": true,
    "bill": true
  },
}
