import type { DinoModelConfig } from '../../types'

export const model: DinoModelConfig = {
  kind: "quadruped",
  bodyLength: 3.1,
  bodyRadius: 1.05,
  neckLength: 0.6,
  neckRadius: 0.4,
  headSize: 0.65,
  tailLength: 2.2,
  legHeight: 0.75,
  legRadius: 0.22,
  neckAngle: 0,
  features: {
    "armor": true,
    "clubTail": true
  },
}
