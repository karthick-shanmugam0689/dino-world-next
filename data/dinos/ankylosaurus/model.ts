import type { DinoModelConfig } from '../../types'

export const model: DinoModelConfig = {
  kind: "quadruped",
  bodyLength: 4.6,
  bodyRadius: 1.5,
  neckLength: 0.8,
  neckRadius: 0.55,
  headSize: 0.9,
  tailLength: 3.2,
  legHeight: 0.95,
  legRadius: 0.3,
  neckAngle: 0,
  features: {
    "armor": true,
    "clubTail": true
  },
}
