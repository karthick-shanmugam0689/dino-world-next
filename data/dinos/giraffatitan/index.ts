import type { Dino, DinoPhotoSet } from '../../types'
import { model } from './model'

export const photos: DinoPhotoSet = {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Museum_f%C3%BCr_Naturkunde_%2836556352434%29.jpg/960px-Museum_f%C3%BCr_Naturkunde_%2836556352434%29.jpg",
    "license": "CC BY 2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Museum_f%C3%BCr_Naturkunde_%2836556352434%29.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Giraffatitan_DB.jpg/960px-Giraffatitan_DB.jpg",
    "license": "Public domain",
    "source": "https://commons.wikimedia.org/wiki/File:Giraffatitan_DB.jpg"
  },
}

export const dino: Dino = {
  id: "giraffatitan",
  name: "Giraffatitan",
  meaning: "Titanic giraffe",
  familyId: "brachiosauridae",
  silhouette: "sauropod",
  period: "Late Jurassic · 150–145 Mya",
  diet: "Herbivore",
  lengthM: 23,
  heightM: 13,
  weightKg: 34000,
  speedKmh: 10,
  location: "Tanzania",
  description: "For almost a century the famous mounted skeleton in Berlin was labeled Brachiosaurus — it's actually this African giant. At 13 meters tall, its mounted skeleton is still the tallest in any museum in the world.",
  facts: [
    "Its Berlin skeleton holds the Guinness record for tallest mounted dinosaur.",
    "It was considered a species of Brachiosaurus until 2009."
  ],
  color: "#6f87a8",
  model,
}
