import type { Dino } from '../../types'
import { model } from './model'

export const dino: Dino = {
  id: "euoplocephalus",
  name: "Euoplocephalus",
  meaning: "Well-armored head",
  familyId: "ankylosauridae",
  silhouette: "ankylo",
  periodId: "cretaceous",
  periodLabel: "Late Cretaceous · 76–75 Mya",
  diet: "Herbivore",
  lengthM: 5.5,
  heightM: 1.4,
  weightKg: 2500,
  speedKmh: 12,
  location: "Canada",
  description: "The best-known ankylosaur scientifically — dozens of skeletons found, always alone, suggesting a solitary grump of an animal. Complex looping nasal passages hint it had an excellent sense of smell, or a resonant voice.",
  facts: [
    "Over 40 specimens have been found — nearly all of them solitary.",
    "Its convoluted nasal passages may have warmed and humidified air."
  ],
  color: "#8f7f55",
  photos: {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Euoplocephalus_TMP_1991.127.1.tif/lossy-page1-960px-Euoplocephalus_TMP_1991.127.1.tif.jpg",
    "license": "CC BY 2.5",
    "source": "https://commons.wikimedia.org/wiki/File:Euoplocephalus_TMP_1991.127.1.tif"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/0a/Euoplocephalus_BW.jpg",
    "license": "CC BY 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Euoplocephalus_BW.jpg"
  },
},

  model,
}
