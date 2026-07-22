import type { Dino, DinoPhotoSet } from '../../types'
import { model } from './model'

export const photos: DinoPhotoSet = {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Compsognathus_longipes_cast_3.jpg/960px-Compsognathus_longipes_cast_3.jpg",
    "license": "CC BY 2.5",
    "source": "https://commons.wikimedia.org/wiki/File:Compsognathus_longipes_cast_3.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Compsognathus_TD.png/960px-Compsognathus_TD.png",
    "license": "CC BY 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Compsognathus_TD.png"
  },
}

export const dino: Dino = {
  id: "compsognathus",
  name: "Compsognathus",
  meaning: "Elegant jaw",
  familyId: "compsognathidae",
  silhouette: "raptor",
  period: "Late Jurassic · 150 Mya",
  diet: "Carnivore",
  lengthM: 1.25,
  heightM: 0.3,
  weightKg: 3,
  speedKmh: 40,
  location: "Germany, France",
  description:
    "One of the smallest dinosaurs known — a lightly built, chicken-sized hunter that darted through the Late Jurassic islands of Europe on two long legs. For over a century it was the textbook example of just how small a dinosaur could be, a useful counterweight to the giants it lived alongside.",
  facts: [
    "About the size of a turkey — one of the smallest non-avian dinosaurs long known from good fossils.",
    "One specimen preserves the skeleton of a small lizard in its gut — its final meal, swallowed whole.",
    "Its close similarity to the early bird Archaeopteryx helped cement the dinosaur origin of birds.",
  ],
  color: "#c2a34a",
  model,
}
