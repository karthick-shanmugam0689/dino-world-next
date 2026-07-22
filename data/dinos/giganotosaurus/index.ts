import type { Dino, DinoPhotoSet } from '../../types'
import { model } from './model'

export const photos: DinoPhotoSet = {
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Giganotosaurus_BW.jpg",
    "license": "CC BY 2.5",
    "source": "https://commons.wikimedia.org/wiki/File:Giganotosaurus_BW.jpg"
  },
}

export const dino: Dino = {
  id: "giganotosaurus",
  name: "Giganotosaurus",
  meaning: "Giant southern lizard",
  familyId: "carcharodontosauridae",
  silhouette: "trex",
  period: "Late Cretaceous · 99.6–95 Mya",
  diet: "Carnivore",
  lengthM: 13,
  heightM: 3.6,
  weightKg: 8000,
  speedKmh: 40,
  location: "Argentina (Patagonia)",
  description: "One of the largest land predators ever known — a shark-toothed hunter from Patagonia that rivalled and may have slightly exceeded T. rex in length, though it was more lightly built. Its long, low skull carried blade-like serrated teeth suited to slicing rather than crushing, ideal for carving flesh from the giant sauropods that shared its floodplains.",
  facts: [
    "Its holotype skeleton, found in Patagonia in 1993, is almost 70% complete.",
    "The elongated skull is around 1.6 metres long — even longer than that of T. rex.",
    "Its brain was small and banana-shaped, a fraction of a tyrannosaur's relative size."
  ],
  color: "#7d8a5c",
  featured: false,
  model,
}
