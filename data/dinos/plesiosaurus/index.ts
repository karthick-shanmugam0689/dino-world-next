import type { Dino, DinoPhotoSet } from '../../types'
import { model } from './model'

export const photos: DinoPhotoSet = {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Plesiosaurus_dolichodeirus_NHM.jpg/960px-Plesiosaurus_dolichodeirus_NHM.jpg",
    "license": "CC BY 2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Plesiosaurus_dolichodeirus_NHM.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/07/Plesiosaurus_dolichodeirus.png",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Plesiosaurus_dolichodeirus.png"
  },
}

export const dino: Dino = {
  id: "plesiosaurus",
  name: "Plesiosaurus",
  meaning: "Near to reptile",
  familyId: "plesiosauridae",
  silhouette: "plesiosaur",
  period: "Early Jurassic · 201–194 Mya",
  diet: "Piscivore",
  lengthM: 3.5,
  heightM: 1,
  weightKg: 450,
  speedKmh: 10,
  location: "England",
  description: "Not a dinosaur — a marine reptile so odd that when Mary Anning unearthed the first complete skeleton in 1823, the French anatomist Georges Cuvier suspected a fraud. A tiny head sits atop a neck longer than the rest of its body, built from roughly 40 vertebrae, propelled by four broad flippers like an underwater flight.",
  facts: [
    "Discovered by pioneering fossil hunter Mary Anning at Lyme Regis, England, in 1823.",
    "Its neck alone contains around 40 vertebrae — more than almost any other animal.",
    "It likely \"flew\" underwater, flapping its four flippers like a penguin rather than paddling."
  ],
  color: "#4f7a75",
  clade: "marine-reptile",
  model,
}
