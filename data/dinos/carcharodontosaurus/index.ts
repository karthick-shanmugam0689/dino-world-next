import type { Dino, DinoPhotoSet } from '../../types'
import { model } from './model'

export const photos: DinoPhotoSet = {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Carcharodontosaurus_saharicus_skull_reconstruction.png/960px-Carcharodontosaurus_saharicus_skull_reconstruction.png",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Carcharodontosaurus_saharicus_skull_reconstruction.png"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Carcharodontosaurus_TD.png/960px-Carcharodontosaurus_TD.png",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Carcharodontosaurus_TD.png"
  },
}

export const dino: Dino = {
  id: "carcharodontosaurus",
  name: "Carcharodontosaurus",
  meaning: "Shark-toothed lizard",
  familyId: "carcharodontosauridae",
  silhouette: "trex",
  period: "Late Cretaceous · 100–94 Mya",
  diet: "Carnivore",
  lengthM: 12.5,
  heightM: 4,
  weightKg: 6200,
  speedKmh: 32,
  location: "North Africa",
  description: "One of the largest land predators that ever lived, rivalling Tyrannosaurus in length but built more lightly, with a metre-and-a-half skull lined with long, blade-like serrated teeth. It stalked the lush river deltas of mid-Cretaceous North Africa alongside Spinosaurus, slicing flesh from giant sauropod prey rather than crushing bone.",
  facts: [
    "Its name means \"shark-toothed lizard\" — its serrated teeth resembled those of the great white shark, Carcharodon.",
    "The best original fossils were destroyed in a 1944 Allied bombing raid on Munich during World War II.",
    "Its skull was around 1.6 m long, among the largest of any known land predator."
  ],
  color: "#a8632e",
  featured: false,
  model,
}
