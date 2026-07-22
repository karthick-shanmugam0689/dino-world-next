import type { Dino, DinoPhotoSet } from '../../types'
import { model } from './model'

export const photos: DinoPhotoSet = {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Titanosaurus_Thigh_Fossil_%40VNGeol.Museum.jpg/960px-Titanosaurus_Thigh_Fossil_%40VNGeol.Museum.jpg",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Titanosaurus_Thigh_Fossil_%40VNGeol.Museum.jpg"
  },
}

export const dino: Dino = {
  id: "titanosaurus",
  name: "Titanosaurus",
  meaning: "Titanic lizard",
  familyId: "titanosauridae",
  silhouette: "sauropod",
  period: "Late Cretaceous · 72–66 Mya",
  diet: "Herbivore",
  lengthM: 12,
  heightM: 4.5,
  weightKg: 13000,
  speedKmh: 15,
  location: "India",
  description: "One of the last of the great long-necked sauropods, Titanosaurus browsed the floodplains of India right up to the end of the age of dinosaurs. Though known only from fragmentary bones, it lent its name to the titanosaurs — a sprawling group of wide-bodied giants, many sheathed in bony armor, that became the dominant plant-eaters of the southern continents.",
  facts: [
    "It was the first dinosaur genus ever named from India, described by Richard Lydekker in 1877.",
    "It gave its name to Titanosauria, the vast group of sauropods that includes the largest land animals ever.",
    "Most of its named species are now considered dubious, based on scraps such as tail vertebrae and a thigh bone."
  ],
  color: "#7fa06a",
  model,
}
