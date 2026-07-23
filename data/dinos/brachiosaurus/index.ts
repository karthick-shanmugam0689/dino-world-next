import type { Dino } from '../../types'
import { model } from './model'

export const dino: Dino = {
  id: "brachiosaurus",
  name: "Brachiosaurus",
  meaning: "Arm lizard",
  familyId: "brachiosauridae",
  silhouette: "sauropod",
  periodId: "jurassic",
  periodLabel: "Late Jurassic · 154–150 Mya",
  diet: "Herbivore",
  lengthM: 22,
  heightM: 12,
  weightKg: 40000,
  speedKmh: 10,
  location: "North America",
  description: "A four-story building on legs. With front legs longer than its hind legs and a neck raised like a giraffe's, Brachiosaurus browsed treetops 12 meters up. An adult had essentially nothing to fear — predators simply gave up.",
  facts: [
    "It could reach vegetation four stories off the ground.",
    "It ate up to 400 kg of plants every day.",
    "Its nostrils sat on a bony arch on top of its head."
  ],
  color: "#7d94b5",
  featured: true,
  photos: {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Brachiosaurus_mount.jpg/960px-Brachiosaurus_mount.jpg",
    "license": "CC BY 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Brachiosaurus_mount.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Brachiosaurus_altithorax_side_profile.png/960px-Brachiosaurus_altithorax_side_profile.png",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Brachiosaurus_altithorax_side_profile.png"
  },
},

  model,
}
