import type { Dino, DinoPhotoSet } from '../../types'
import { model } from './model'

export const photos: DinoPhotoSet = {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Plateosaurus_Skelett_2.jpg/960px-Plateosaurus_Skelett_2.jpg",
    "license": "CC BY-SA 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Plateosaurus_Skelett_2.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Plateosaurus_TD.png/960px-Plateosaurus_TD.png",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Plateosaurus_TD.png"
  },
}

export const dino: Dino = {
  id: "plateosaurus",
  name: "Plateosaurus",
  meaning: "Broad lizard",
  familyId: "plateosauridae",
  silhouette: "sauropod",
  period: "Late Triassic · 214–204 Mya",
  diet: "Herbivore",
  lengthM: 8,
  heightM: 3.6,
  weightKg: 2600,
  speedKmh: 18,
  location: "Germany, Switzerland, France",
  description: "Europe's most common dinosaur fossil and the prototype of the long-necks: a two-legged browser with a small head, huge thumb claws and a neck reaching where no animal had reached before. Its descendants' cousins would become the largest creatures ever to walk the Earth.",
  facts: [
    "Over 100 skeletons have been dug up, mostly in Germany.",
    "Unlike the later giants, it walked on two legs.",
    "Individuals of the same age could differ wildly in size — growth depended on climate."
  ],
  color: "#96a05c",
  model,
}
