import type { Dino, DinoPhotoSet } from '../../types'
import { model } from './model'

export const photos: DinoPhotoSet = {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Ankylosaurus_skull_AMNH.jpg/960px-Ankylosaurus_skull_AMNH.jpg",
    "license": "Public domain",
    "source": "https://commons.wikimedia.org/wiki/File:Ankylosaurus_skull_AMNH.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Ankylosaurus_magniventris_by_sphenaphinae.png/960px-Ankylosaurus_magniventris_by_sphenaphinae.png",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Ankylosaurus_magniventris_by_sphenaphinae.png"
  },
}

export const dino: Dino = {
  id: "ankylosaurus",
  name: "Ankylosaurus",
  meaning: "Fused lizard",
  familyId: "ankylosauridae",
  silhouette: "ankylo",
  period: "Late Cretaceous · 68–66 Mya",
  diet: "Herbivore",
  lengthM: 8,
  heightM: 1.7,
  weightKg: 6000,
  speedKmh: 10,
  location: "North America",
  description: "A living tank. Bony plates armored everything down to its eyelids, and its tail ended in a 50 kg club of solid bone that could swing hard enough to shatter a tyrannosaur's ankle. Its defense was simple: crouch and dare anything to try.",
  facts: [
    "Even its eyelids had bony armor.",
    "Its tail club could break the leg bones of a T. rex.",
    "It stood low and wide — barely taller than an adult human."
  ],
  color: "#9c8a63",
  featured: true,
  model,
}
