import type { Dino } from '../../types'
import { model } from './model'

export const dino: Dino = {
  id: "tarbosaurus",
  name: "Tarbosaurus",
  meaning: "Alarming lizard",
  familyId: "tyrannosauridae",
  silhouette: "trex",
  periodId: "cretaceous",
  periodLabel: "Late Cretaceous · 70 Mya",
  diet: "Carnivore",
  lengthM: 10,
  heightM: 3.2,
  weightKg: 5000,
  speedKmh: 25,
  location: "Mongolia",
  description: "Asia's answer to T. rex and its closest known relative. Tarbosaurus hunted the floodplains of the Gobi, preying on giant hadrosaurs and young sauropods with a skull built for slicing rather than pure crushing.",
  facts: [
    "Over 30 good specimens have been found in the Gobi Desert.",
    "Its arms were even smaller relative to its body than T. rex's."
  ],
  color: "#b05c42",
  photos: {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Tarbosaurus_bataar_mount_-_Dinosaur_Mysteries_exhibit.jpg/960px-Tarbosaurus_bataar_mount_-_Dinosaur_Mysteries_exhibit.jpg",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Tarbosaurus_bataar_mount_-_Dinosaur_Mysteries_exhibit.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Tarbosaurus_baatar_paleoart_%282024%29.png/960px-Tarbosaurus_baatar_paleoart_%282024%29.png",
    "license": "CC BY 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Tarbosaurus_baatar_paleoart_%282024%29.png"
  },
},

  model,
}
