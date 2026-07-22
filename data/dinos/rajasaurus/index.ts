import type { Dino, DinoPhotoSet } from '../../types'
import { model } from './model'

export const photos: DinoPhotoSet = {
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Rajasaurus_restoration.jpg/960px-Rajasaurus_restoration.jpg",
    "license": "CC BY-SA 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Rajasaurus_restoration.jpg"
  },
}

export const dino: Dino = {
  id: "rajasaurus",
  name: "Rajasaurus",
  meaning: "Princely lizard from the Narmada",
  familyId: "abelisauridae",
  silhouette: "trex",
  period: "Late Cretaceous · 70–66 Mya",
  diet: "Carnivore",
  lengthM: 6.6,
  heightM: 2.4,
  weightKg: 1100,
  speedKmh: 30,
  location: "India",
  description: "India's best-known predatory dinosaur — a stocky abelisaurid with a short, deep skull crowned by a distinctive low, rounded horn. It stalked the floodplains of the Narmada Valley in the final chapter of the Cretaceous, likely preying on the titanosaur sauropods that nested nearby.",
  facts: [
    "Its partial skeleton, described in 2003, was the first Indian theropod complete enough to reconstruct.",
    "A single low horn formed from the nasal and frontal bones sat atop its skull.",
    "It belonged to the abelisaurids, the Gondwanan cousins of Carnotaurus and Majungasaurus."
  ],
  color: "#8f4b39",
  featured: false,
  model,
}
