import type { Dino } from '../../types'
import { model } from './model'

export const dino: Dino = {
  id: "argentinosaurus",
  name: "Argentinosaurus",
  meaning: "Argentine lizard",
  familyId: "titanosauridae",
  periodId: "cretaceous",
  periodLabel: "Late Cretaceous · 96–92 Mya",
  diet: "Herbivore",
  lengthM: 35,
  heightM: 7,
  weightKg: 75000,
  speedKmh: 8,
  location: "Argentina, South America",
  description: "Argentinosaurus was a colossal titanosaurian sauropod that roamed what is now Argentina during the Late Cretaceous. Known only from fragmentary but enormous remains, it is considered one of the largest land animals to have ever lived, stretching 30-35 meters long and weighing 65-80 tonnes. Its massive vertebrae and limb bones hint at a body plan built to support extreme size.",
  facts: [
    "Known only from a handful of fossilized vertebrae, ribs, and a partial leg bone, yet these alone indicate a truly enormous animal.",
    "Estimated to have weighed as much as 65-80 tonnes, rivaling the largest whales.",
    "Its single dorsal vertebra measured over 1.3 meters tall, among the largest ever found for a land animal.",
  ],
  color: "#6b8e5a",
  silhouette: "sauropod",
  photos: {
  skeleton:   {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Argentinosaurus_skeleton%2C_PLoS_ONE.png/960px-Argentinosaurus_skeleton%2C_PLoS_ONE.png",
    license: "CC BY 2.5",
    source: "https://commons.wikimedia.org/wiki/File%3AArgentinosaurus_skeleton%2C_PLoS_ONE.png",
  },
  realistic:   {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Argentinosaurus_BW.jpg/960px-Argentinosaurus_BW.jpg",
    license: "CC BY 3.0",
    source: "https://commons.wikimedia.org/wiki/File%3AArgentinosaurus_BW.jpg",
  },
},
  model,
}
