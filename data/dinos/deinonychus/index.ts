import type { Dino } from '../../types'
import { model } from './model'

export const dino: Dino = {
  id: "deinonychus",
  name: "Deinonychus",
  meaning: "Terrible claw",
  familyId: "dromaeosauridae",
  silhouette: "raptor",
  periodId: "cretaceous",
  periodLabel: "Early Cretaceous · 115–108 Mya",
  diet: "Carnivore",
  lengthM: 3.4,
  heightM: 1.2,
  weightKg: 85,
  speedKmh: 50,
  location: "North America",
  description: "The dinosaur that changed everything. Deinonychus was so obviously fast, agile and bird-like that it launched the \"Dinosaur Renaissance\" — the realization that dinosaurs were active, warm-blooded animals, not sluggish lizards.",
  facts: [
    "The raptors in Jurassic Park were actually modeled on Deinonychus.",
    "Its discovery in 1964 sparked the modern view of dinosaurs."
  ],
  color: "#6d9161",
  photos: {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Deinonychus_FMNH.jpg/960px-Deinonychus_FMNH.jpg",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Deinonychus_FMNH.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Deinonychus_Restoration.png/960px-Deinonychus_Restoration.png",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Deinonychus_Restoration.png"
  },
},

  model,
}
