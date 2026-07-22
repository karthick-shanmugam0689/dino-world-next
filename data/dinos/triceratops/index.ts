import type { Dino, DinoPhotoSet } from '../../types'
import { model } from './model'

export const photos: DinoPhotoSet = {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/LA-Triceratops_mount-2.jpg/960px-LA-Triceratops_mount-2.jpg",
    "license": "CC BY-SA 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:LA-Triceratops_mount-2.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Triceratops_TD.png/960px-Triceratops_TD.png",
    "license": "CC BY 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Triceratops_TD.png"
  },
}

export const dino: Dino = {
  id: "triceratops",
  name: "Triceratops",
  meaning: "Three-horned face",
  familyId: "ceratopsidae",
  silhouette: "ceratops",
  period: "Late Cretaceous · 68–66 Mya",
  diet: "Herbivore",
  lengthM: 9,
  heightM: 3,
  weightKg: 8000,
  speedKmh: 30,
  location: "North America",
  description: "The rhinoceros of the Cretaceous, and T. rex's eternal sparring partner. Two meter-long brow horns and a solid bone frill made an adult Triceratops one of the few animals a tyrannosaur would think twice about — healed bite wounds on frills show some survived the encounter.",
  facts: [
    "Fossil frills show healed T. rex bite marks — some fights were survived.",
    "Its skull alone could be 2.5 meters long.",
    "It shed and regrew horn material throughout life."
  ],
  color: "#8a7f4e",
  featured: true,
  model,
}
