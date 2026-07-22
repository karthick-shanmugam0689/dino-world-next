import type { Dino, DinoPhotoSet } from '../../types'
import { model } from './model'

export const photos: DinoPhotoSet = {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Coelophysis_bauri_mount.jpg/960px-Coelophysis_bauri_mount.jpg",
    "license": "CC BY 2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Coelophysis_bauri_mount.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Coelophysis_TD.png/960px-Coelophysis_TD.png",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Coelophysis_TD.png"
  },
}

export const dino: Dino = {
  id: "coelophysis",
  name: "Coelophysis",
  meaning: "Hollow form",
  familyId: "coelophysidae",
  silhouette: "raptor",
  period: "Late Triassic · 221–196 Mya",
  diet: "Carnivore",
  lengthM: 3,
  heightM: 1,
  weightKg: 25,
  speedKmh: 50,
  location: "USA (New Mexico)",
  description: "One of the very first dinosaurs we know well — a whippet-thin sprinter from the dawn of the age of dinosaurs. At Ghost Ranch, New Mexico, hundreds of skeletons were found buried together, an entire flock caught by a flash flood 210 million years ago.",
  facts: [
    "Hundreds of skeletons were found in a single quarry at Ghost Ranch.",
    "A Coelophysis skull flew to space aboard Shuttle Endeavour in 1998.",
    "Its bones were hollow like a bird's — the family name means \"hollow form\"."
  ],
  color: "#cf8a52",
  model,
}
