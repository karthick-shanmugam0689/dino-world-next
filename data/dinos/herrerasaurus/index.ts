import type { Dino } from '../../types'
import { model } from './model'

export const dino: Dino = {
  id: "herrerasaurus",
  name: "Herrerasaurus",
  meaning: "Herrera's lizard",
  familyId: "herrerasauridae",
  silhouette: "raptor",
  periodId: "triassic",
  periodLabel: "Late Triassic · 231 Mya",
  diet: "Carnivore",
  lengthM: 4.5,
  heightM: 1.1,
  weightKg: 250,
  speedKmh: 40,
  location: "Argentina",
  description: "Where it all began. Herrerasaurus stalked the Ischigualasto valley 231 million years ago, when dinosaurs were still a rare experiment making up barely one animal in twenty. Named after Victorino Herrera, the Andean goat herder who first spotted its bones in the rocks.",
  facts: [
    "One of the very first dinosaurs — 231 million years old.",
    "Discovered by a goat herder whose name it now carries.",
    "Its sliding jaw joint let it grip struggling prey like a trap."
  ],
  color: "#b56a45",
  photos: {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Herrerasaurus_skeleton.jpg/960px-Herrerasaurus_skeleton.jpg",
    "license": "CC BY-SA 2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Herrerasaurus_skeleton.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Herrerasaurus_TD.png/960px-Herrerasaurus_TD.png",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Herrerasaurus_TD.png"
  },
},

  model,
}
