import type { Dino } from '../../types'
import { model } from './model'

export const dino: Dino = {
  id: "pteranodon",
  name: "Pteranodon",
  meaning: "Toothless wing",
  familyId: "pteranodontidae",
  silhouette: "ptero",
  periodId: "cretaceous",
  periodLabel: "Late Cretaceous · 86–84 Mya",
  diet: "Piscivore",
  lengthM: 2.5,
  heightM: 0.8,
  weightKg: 20,
  speedKmh: 50,
  location: "North America",
  description: "Not a dinosaur — a pterosaur, a separate group of flying reptiles. Pteranodon patrolled the shores of the shallow sea that once split North America in two, snatching fish from the surface. Hollow, air-filled bones kept a six-meter wingspan light enough to fly, at the cost of almost never fossilizing intact.",
  facts: [
    "Named in 1876 by O. C. Marsh during the fiercely competitive \"Bone Wars\" of American paleontology.",
    "Unlike earlier pterosaurs, it had no teeth at all — just a sharp beak.",
    "Its backward-pointing crest may have acted as a rudder or a counterweight for its long beak."
  ],
  color: "#8a7f6e",
  clade: "pterosaur",
  wingSpanM: 6.4,
  photos: {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/13/Pteranodon_skeletal.jpg",
    "license": "CC BY 2.5",
    "source": "https://commons.wikimedia.org/wiki/File:Pteranodon_skeletal.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/1f/Pteranodon_longiceps_mmartyniuk_wiki.png",
    "license": "CC BY 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Pteranodon_longiceps_mmartyniuk_wiki.png"
  },
},

  model,
}
