import type { Dino, DinoPhotoSet } from '../../types'
import { model } from './model'

export const photos: DinoPhotoSet = {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Tyrannosaurus_skeleton.jpg/960px-Tyrannosaurus_skeleton.jpg",
    "license": "Public domain",
    "source": "https://commons.wikimedia.org/wiki/File:Tyrannosaurus_skeleton.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Tyrannosaurus-rex-Profile-steveoc86_%28coloured%29%28mirror%29.png/960px-Tyrannosaurus-rex-Profile-steveoc86_%28coloured%29%28mirror%29.png",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Tyrannosaurus-rex-Profile-steveoc86_%28coloured%29%28mirror%29.png"
  },
}

export const dino: Dino = {
  id: "tyrannosaurus",
  name: "Tyrannosaurus rex",
  meaning: "Tyrant lizard king",
  familyId: "tyrannosauridae",
  silhouette: "trex",
  period: "Late Cretaceous · 68–66 Mya",
  diet: "Carnivore",
  lengthM: 12.3,
  heightM: 3.9,
  weightKg: 8800,
  speedKmh: 27,
  location: "North America",
  description: "The most famous dinosaur of all. T. rex combined a five-foot skull, banana-sized serrated teeth and the strongest bite of any land animal ever — around 6 tons of force — with keen eyesight and a surprisingly large brain. Apex predator and, when convenient, an unapologetic scavenger.",
  facts: [
    "Its bite force of ~60,000 N is the strongest known of any land animal.",
    "Despite the memes, its arms could curl around 200 kg each.",
    "A T. rex reached full size in about 20 years."
  ],
  color: "#c96a3b",
  featured: true,
  model,
}
