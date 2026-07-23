import type { Dino } from '../../types'
import { model } from './model'

export const dino: Dino = {
  id: "quetzalcoatlus",
  name: "Quetzalcoatlus",
  meaning: "Named for the Aztec feathered serpent god Quetzalcoatl",
  familyId: "azhdarchidae",
  silhouette: "ptero",
  periodId: "cretaceous",
  periodLabel: "Late Cretaceous · 70–66 Mya",
  diet: "Carnivore",
  lengthM: 3,
  heightM: 3,
  weightKg: 250,
  speedKmh: 60,
  location: "USA (Texas)",
  description: "Not a dinosaur — the largest flying animal ever known, a pterosaur with a wingspan longer than a city bus. Standing on all fours, it stood as tall as a giraffe at the shoulder, and current research suggests it spent much of its life stalking small prey on the ground, more giant stork than glider. It lived right up until the asteroid, alongside the very last dinosaurs.",
  facts: [
    "Its wingspan is estimated at 10–11 meters — comparable to a small airplane.",
    "Discovered in Big Bend, Texas, in 1971, and named after the Aztec feathered serpent god.",
    "Despite its size, it likely weighed only around 250 kg thanks to hollow, air-filled bones."
  ],
  color: "#8a8477",
  clade: "pterosaur",
  wingSpanM: 10.5,
  photos: {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Quetzaloatlus_lawsoni_skeletal_reconstruction.jpg/960px-Quetzaloatlus_lawsoni_skeletal_reconstruction.jpg",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Quetzaloatlus_lawsoni_skeletal_reconstruction.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Life_restoration_of_a_group_of_giant_azhdarchids%2C_Quetzalcoatlus_northropi%2C_foraging_on_a_Cretaceous_fern_prairie.png/960px-Life_restoration_of_a_group_of_giant_azhdarchids%2C_Quetzalcoatlus_northropi%2C_foraging_on_a_Cretaceous_fern_prairie.png",
    "license": "CC BY 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Life_restoration_of_a_group_of_giant_azhdarchids%2C_Quetzalcoatlus_northropi%2C_foraging_on_a_Cretaceous_fern_prairie.png"
  },
},

  model,
}
