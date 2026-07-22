import type { Dino, DinoPhotoSet } from '../../types'
import { model } from './model'

export const photos: DinoPhotoSet = {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Therizinosaurus_arms.jpg/960px-Therizinosaurus_arms.jpg",
    "license": "CC BY 2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Therizinosaurus_arms.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Therizinosaurus_Restoration.png/960px-Therizinosaurus_Restoration.png",
    "license": "CC BY 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Therizinosaurus_Restoration.png"
  },
}

export const dino: Dino = {
  id: "therizinosaurus",
  name: "Therizinosaurus",
  meaning: "Scythe lizard",
  familyId: "therizinosauridae",
  silhouette: "therizino",
  period: "Late Cretaceous · 70 Mya",
  diet: "Herbivore",
  lengthM: 9,
  heightM: 5,
  weightKg: 3000,
  speedKmh: 25,
  location: "Mongolia",
  description: "A theropod — the same group as T. rex — that gave up hunting for browsing treetops, keeping only its ancestors' claws, grown to a size no other animal has matched. Feathered, pot-bellied and slow-moving, it must have looked as strange to other dinosaurs as it does to us.",
  facts: [
    "Its hand claws reached up to 70 cm along the curve — the longest of any known animal.",
    "First described in 1954 from claws alone, initially mistaken for a giant turtle-like reptile.",
    "Likely used its claws for hooking branches to feed, not for fighting."
  ],
  color: "#5f7a4a",
  model,
}
