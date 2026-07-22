import type { Dino, DinoPhotoSet } from '../../types'
import { model } from './model'

export const photos: DinoPhotoSet = {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Mounted_Edmontosaurus.jpg/960px-Mounted_Edmontosaurus.jpg",
    "license": "Public domain",
    "source": "https://commons.wikimedia.org/wiki/File:Mounted_Edmontosaurus.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Edmontosaurus_sp._reconstruction.PNG/960px-Edmontosaurus_sp._reconstruction.PNG",
    "license": "CC BY 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Edmontosaurus_sp._reconstruction.PNG"
  },
}

export const dino: Dino = {
  id: "edmontosaurus",
  name: "Edmontosaurus",
  meaning: "Lizard from Edmonton",
  familyId: "hadrosauridae",
  silhouette: "hadro",
  period: "Late Cretaceous · 73–66 Mya",
  diet: "Herbivore",
  lengthM: 12,
  heightM: 3.4,
  weightKg: 7000,
  speedKmh: 45,
  location: "North America",
  description: "A crestless giant duck-bill that lived right up to the asteroid. Several \"dinosaur mummies\" preserve its skin, scales and even a fleshy comb on its head — we know Edmontosaurus's outside better than almost any dinosaur.",
  facts: [
    "Mummified specimens preserve skin impressions and a rooster-like comb.",
    "One fossil has a healed T. rex bite in its tail — it got away.",
    "It had up to 1,000 teeth arranged in grinding batteries."
  ],
  color: "#a4784f",
  model,
}
