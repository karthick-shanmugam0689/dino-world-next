import type { Dino } from '../../types'
import { model } from './model'

export const dino: Dino = {
  id: "albertosaurus",
  name: "Albertosaurus",
  meaning: "Alberta lizard",
  familyId: "tyrannosauridae",
  silhouette: "trex",
  periodId: "cretaceous",
  periodLabel: "Late Cretaceous · 71 Mya",
  diet: "Carnivore",
  lengthM: 9,
  heightM: 2.9,
  weightKg: 2500,
  speedKmh: 32,
  location: "Canada",
  description: "A lighter, faster tyrannosaur from the north. A site in Alberta preserving over 20 individuals together suggests Albertosaurus may have hunted in packs — a terrifying thought for the hadrosaurs it chased.",
  facts: [
    "Possibly hunted in family groups — 26 individuals found at one site.",
    "Could likely outrun every other tyrannosaurid."
  ],
  color: "#a8684f",
  photos: {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Albertosaurus_sarcophagus_cast.jpg/960px-Albertosaurus_sarcophagus_cast.jpg",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Albertosaurus_sarcophagus_cast.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Albertosaurus_TD.png/960px-Albertosaurus_TD.png",
    "license": "CC BY 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Albertosaurus_TD.png"
  },
},

  model,
}
