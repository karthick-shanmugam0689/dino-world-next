import type { Dino } from '../../types'
import { model } from './model'

export const dino: Dino = {
  id: "mosasaurus",
  name: "Mosasaurus",
  meaning: "Lizard of the Meuse River",
  familyId: "mosasauridae",
  silhouette: "mosasaur",
  periodId: "cretaceous",
  periodLabel: "Late Cretaceous · 82–66 Mya",
  diet: "Carnivore",
  lengthM: 13,
  heightM: 2.4,
  weightKg: 15000,
  speedKmh: 12,
  location: "Netherlands, North America",
  description: "Not a dinosaur — a giant marine lizard, closer kin to monitor lizards and snakes. Mosasaurus ruled the Late Cretaceous seas as an apex predator, swallowing prey almost whole with a double-hinged jaw. Its skull was dug from a Maastricht chalk quarry in the 1770s, decades before dinosaurs were even recognized as a group.",
  facts: [
    "Named for the Meuse river near Maastricht, Netherlands, where the first skull was found.",
    "French Revolutionary forces seized the original fossil skull as war spoils in 1795.",
    "Fossilized skin impressions show it swam with a shark-like tail fin, not a simple tapering tail."
  ],
  color: "#3f5a68",
  clade: "marine-reptile",
  photos: {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Mosasaurus_hoffmannii_-_skeleton.jpg/960px-Mosasaurus_hoffmannii_-_skeleton.jpg",
    "license": "CC BY-SA 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Mosasaurus_hoffmannii_-_skeleton.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Mosasaurus_missouriensis_NT.png",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Mosasaurus_missouriensis_NT.png"
  },
},

  model,
}
