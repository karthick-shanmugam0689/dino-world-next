import type { Dino } from '../../types'
import { model } from './model'

export const dino: Dino = {
  id: "utahraptor",
  name: "Utahraptor",
  meaning: "Utah's predator",
  familyId: "dromaeosauridae",
  silhouette: "raptor",
  periodId: "cretaceous",
  periodLabel: "Early Cretaceous · 135–130 Mya",
  diet: "Carnivore",
  lengthM: 5.5,
  heightM: 1.8,
  weightKg: 300,
  speedKmh: 40,
  location: "USA (Utah)",
  description: "The raptor scaled up to nightmare size — as heavy as a polar bear, with 22 cm sickle claws. A single sandstone block from Utah contains a whole pack that apparently died together in quicksand while hunting.",
  facts: [
    "Its sickle claws reached 22 cm — the largest of any raptor.",
    "Described in 1993, the same year Jurassic Park premiered."
  ],
  color: "#5f8a6b",
  photos: {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/BYU_Utahraptor_skeletal_mount.jpg/960px-BYU_Utahraptor_skeletal_mount.jpg",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:BYU_Utahraptor_skeletal_mount.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Utahraptor_Restoration.png/960px-Utahraptor_Restoration.png",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Utahraptor_Restoration.png"
  },
},

  model,
}
