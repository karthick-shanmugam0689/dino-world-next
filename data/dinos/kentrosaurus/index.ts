import type { Dino, DinoPhotoSet } from '../../types'
import { model } from './model'

export const photos: DinoPhotoSet = {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Fossil_Kentrosaurus_aethiopicus_in_Museum_f%C3%BCr_Naturkunde_Berlin_001.JPG/960px-Fossil_Kentrosaurus_aethiopicus_in_Museum_f%C3%BCr_Naturkunde_Berlin_001.JPG",
    "license": "Public domain",
    "source": "https://commons.wikimedia.org/wiki/File:Fossil_Kentrosaurus_aethiopicus_in_Museum_f%C3%BCr_Naturkunde_Berlin_001.JPG"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a4/Kentrosaurus_digital_clay_reconstruction.png",
    "license": "CC BY-SA 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Kentrosaurus_digital_clay_reconstruction.png"
  },
}

export const dino: Dino = {
  id: "kentrosaurus",
  name: "Kentrosaurus",
  meaning: "Sharp point lizard",
  familyId: "stegosauridae",
  silhouette: "stego",
  period: "Late Jurassic · 152 Mya",
  diet: "Herbivore",
  lengthM: 4.5,
  heightM: 1.8,
  weightKg: 1100,
  speedKmh: 9,
  location: "Tanzania",
  description: "Stegosaurus's smaller African cousin traded plates for weaponry: from the hips back, its body bristled with long paired spikes, and its flexible tail could swing them through a 180-degree arc.",
  facts: [
    "Its tail could swing fast enough to shatter bone.",
    "Hundreds of bones were excavated at Tendaguru, Tanzania in the 1910s."
  ],
  color: "#4f7d6b",
  model,
}
