import type { Dino, DinoPhotoSet } from '../../types'
import { model } from './model'

export const photos: DinoPhotoSet = {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/HMNS_Stegosaurus.jpg/960px-HMNS_Stegosaurus.jpg",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:HMNS_Stegosaurus.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Stegosaurus_stenops_Life_Reconstruction.png/960px-Stegosaurus_stenops_Life_Reconstruction.png",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Stegosaurus_stenops_Life_Reconstruction.png"
  },
}

export const dino: Dino = {
  id: "stegosaurus",
  name: "Stegosaurus",
  meaning: "Roofed lizard",
  familyId: "stegosauridae",
  silhouette: "stego",
  period: "Late Jurassic · 155–150 Mya",
  diet: "Herbivore",
  lengthM: 9,
  heightM: 4,
  weightKg: 5000,
  speedKmh: 8,
  location: "North America, Portugal",
  description: "Instantly recognizable by the seventeen bony plates along its back and the four-spiked tail it swung like a medieval mace. Its brain was famously the size of a walnut — yet Stegosaurus thrived for millions of years.",
  facts: [
    "An Allosaurus vertebra was found with a Stegosaurus spike wound in it.",
    "Its back plates may have flushed with blood to change color.",
    "The spiked tail has an official name: the thagomizer, from a Far Side cartoon."
  ],
  color: "#5e8b7e",
  featured: true,
  model,
}
