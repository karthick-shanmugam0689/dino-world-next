import type { Dino, DinoPhotoSet } from '../../types'
import { model } from './model'

export const photos: DinoPhotoSet = {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/WLA_hmns_Allosaurus_White_Background.jpg/960px-WLA_hmns_Allosaurus_White_Background.jpg",
    "license": "CC BY 2.5",
    "source": "https://commons.wikimedia.org/wiki/File:WLA_hmns_Allosaurus_White_Background.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Allosaurus_Life_Restoration.jpg/960px-Allosaurus_Life_Restoration.jpg",
    "license": "CC BY-SA 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Allosaurus_Life_Restoration.jpg"
  },
}

export const dino: Dino = {
  id: "allosaurus",
  name: "Allosaurus",
  meaning: "Different lizard",
  familyId: "allosauridae",
  silhouette: "trex",
  period: "Late Jurassic · 155–145 Mya",
  diet: "Carnivore",
  lengthM: 8.5,
  heightM: 3.1,
  weightKg: 1700,
  speedKmh: 34,
  location: "North America, Portugal",
  description: "The Jurassic's top predator — lighter and faster than the tyrannosaurs that came later, with strong three-clawed arms and a skull it may have swung like a hatchet into giant prey. Its bones are so common in the Morrison Formation that one quarry alone held 46 individuals.",
  facts: [
    "A Stegosaurus tail spike wound was found in one Allosaurus vertebra — it fought the tank and lost.",
    "\"Big Al\", a nearly complete skeleton, shows 19 injuries healed over a hard life.",
    "It is the official state fossil of Utah."
  ],
  color: "#a05a52",
  featured: false,
  model,
}
