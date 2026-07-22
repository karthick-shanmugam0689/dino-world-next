import type { Dino, DinoPhotoSet } from '../../types'
import { model } from './model'

export const photos: DinoPhotoSet = {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/StyracosaurCMN2.jpg/960px-StyracosaurCMN2.jpg",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:StyracosaurCMN2.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Styracosaurus_TD.png/960px-Styracosaurus_TD.png",
    "license": "CC0",
    "source": "https://commons.wikimedia.org/wiki/File:Styracosaurus_TD.png"
  },
}

export const dino: Dino = {
  id: "styracosaurus",
  name: "Styracosaurus",
  meaning: "Spiked lizard",
  familyId: "ceratopsidae",
  silhouette: "ceratops",
  period: "Late Cretaceous · 75 Mya",
  diet: "Herbivore",
  lengthM: 5.5,
  heightM: 1.8,
  weightKg: 2700,
  speedKmh: 32,
  location: "Canada",
  description: "The punk rocker of the horned dinosaurs — a crown of four to six long spikes radiating from its frill, plus a 60 cm nose horn. The display was probably more about impressing rivals and mates than fighting.",
  facts: [
    "Its frill spikes could each reach over half a meter.",
    "Bonebeds suggest it moved in large herds."
  ],
  color: "#98763f",
  model,
}
