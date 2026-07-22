import type { Dino, DinoPhotoSet } from '../../types'
import { model } from './model'

export const photos: DinoPhotoSet = {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Spinosaurus_skeleton.jpg/960px-Spinosaurus_skeleton.jpg",
    "license": "CC BY 2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Spinosaurus_skeleton.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Spinosaurus_aegyptiacus_life_reconstruction.png/960px-Spinosaurus_aegyptiacus_life_reconstruction.png",
    "license": "CC BY 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Spinosaurus_aegyptiacus_life_reconstruction.png"
  },
}

export const dino: Dino = {
  id: "spinosaurus",
  name: "Spinosaurus",
  meaning: "Spine lizard",
  familyId: "spinosauridae",
  silhouette: "spino",
  period: "Late Cretaceous · 99–93 Mya",
  diet: "Piscivore",
  lengthM: 15,
  heightM: 4.4,
  weightKg: 7500,
  speedKmh: 20,
  location: "North Africa",
  description: "Longer than T. rex and unlike any other predator: a crocodile's snout, a two-meter sail, dense bones for buoyancy control and a paddle-like tail. Spinosaurus spent much of its life in rivers, hunting car-sized fish.",
  facts: [
    "The longest known carnivorous dinosaur — up to 15 meters.",
    "The first dinosaur known to be genuinely semi-aquatic.",
    "The original fossils were destroyed in a WWII bombing raid."
  ],
  color: "#4e7c99",
  featured: true,
  model,
}
