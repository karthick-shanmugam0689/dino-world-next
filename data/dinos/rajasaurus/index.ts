import type { Dino } from '../../types'
import { model } from './model'

export const dino: Dino = {
  id: "rajasaurus",
  name: "Rajasaurus",
  meaning: "Regal reptile (from Sanskrit \"raja\" meaning king/prince, and Greek \"sauros\" meaning lizard); the species name narmadensis refers to the Narmada River Valley",
  familyId: "abelisauridae",
  periodId: "cretaceous",
  periodLabel: "Late Cretaceous · 70–66 Mya",
  diet: "Carnivore",
  lengthM: 7,
  heightM: 2.5,
  weightKg: 3000,
  speedKmh: 24,
  location: "Lameta Formation, Gujarat, India (Narmada River Valley)",
  description: "Rajasaurus was a carnivorous abelisaurid theropod that stalked the floodplains of what is now western India during the Late Cretaceous. Its partial skeleton, including the braincase, spine, hip, legs, and tail, was the first substantial theropod remains described from India, formally named by Jeffrey A. Wilson and colleagues in 2003. Like its Gondwanan relatives, it had a short deep skull, a distinctive low horn on its forehead, and small arms relative to its stocky body.",
  facts: [
    "Formally described in 2003 from a partial skeleton found in the Lameta Formation of Gujarat, India — the first theropod of its kind documented from the Indian subcontinent.",
    "Bore a low, rounded horn on top of its skull, likely used for display or head-to-head combat with rivals.",
    "Was a close relative of Madagascar's Majungasaurus and South America's Carnotaurus, reflecting shared ancestry across the once-connected landmasses of Gondwana.",
  ],
  color: "#b5451d",
  silhouette: "trex",
  photos: {
  skeleton:   {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Rajasaurus_skull_%E2%80%93_Predator_of_the_Ancient_Waters_%28cropped%29.jpg/960px-Rajasaurus_skull_%E2%80%93_Predator_of_the_Ancient_Waters_%28cropped%29.jpg",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File%3ARajasaurus_skull_%E2%80%93_Predator_of_the_Ancient_Waters_(cropped).jpg",
  },
  realistic:   {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Rajasaurus_restoration.jpg/960px-Rajasaurus_restoration.jpg",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File%3ARajasaurus_restoration.jpg",
  },
},
  model,
}
