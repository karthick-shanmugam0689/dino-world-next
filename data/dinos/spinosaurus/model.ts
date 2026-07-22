import type { DinoModelConfig } from '../../types'

export const model: DinoModelConfig = {
  kind: "theropod",
  bodyLength: 6.5,
  bodyRadius: 1.4,
  neckLength: 2.2,
  neckRadius: 0.5,
  headSize: 1.6,
  tailLength: 6,
  legHeight: 2.2,
  legRadius: 0.38,
  neckAngle: 0.35,
  arms: "long",
  features: {
    "sail": true,
    "longSnout": true
  },
}
