import type { Dino, DinoPhotoSet } from '../../types'
import { model } from './model'

export const photos: DinoPhotoSet = {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/FMNH_Parasaurolophus_fossil.jpg/960px-FMNH_Parasaurolophus_fossil.jpg",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:FMNH_Parasaurolophus_fossil.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Parasaurolophuspic_steveoc.jpg/960px-Parasaurolophuspic_steveoc.jpg",
    "license": "CC BY 2.5",
    "source": "https://commons.wikimedia.org/wiki/File:Parasaurolophuspic_steveoc.jpg"
  },
}

export const dino: Dino = {
  id: "parasaurolophus",
  name: "Parasaurolophus",
  meaning: "Near crested lizard",
  familyId: "hadrosauridae",
  silhouette: "hadro",
  period: "Late Cretaceous · 76–73 Mya",
  diet: "Herbivore",
  lengthM: 9.5,
  heightM: 3,
  weightKg: 2600,
  speedKmh: 40,
  location: "North America",
  description: "The trombone of the Cretaceous. Its 1.8-meter hollow crest was a resonating chamber — scientists have reconstructed the sound, a deep haunting foghorn that could carry for kilometers across the floodplains to the rest of the herd.",
  facts: [
    "Scientists have 3D-printed its crest and played its actual call.",
    "Each individual's crest produced a slightly different tone.",
    "It could walk on two legs or four as it pleased."
  ],
  color: "#b58a5e",
  featured: true,
  model,
}
