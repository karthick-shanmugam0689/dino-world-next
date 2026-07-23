import type { Dino } from '../../types'
import { model } from './model'

export const dino: Dino = {
  id: "baryonyx",
  name: "Baryonyx",
  meaning: "Heavy claw",
  familyId: "spinosauridae",
  silhouette: "spino",
  periodId: "cretaceous",
  periodLabel: "Early Cretaceous · 130–125 Mya",
  diet: "Piscivore",
  lengthM: 9,
  heightM: 2.7,
  weightKg: 1900,
  speedKmh: 30,
  location: "England, Spain",
  description: "Discovered by an amateur fossil hunter in a Surrey clay pit, Baryonyx was the first clear evidence of a fish-eating dinosaur — its stomach contents included half-digested fish scales and, for variety, a young Iguanodon.",
  facts: [
    "Its 31 cm hand claw gave it the name \"heavy claw\".",
    "Fossilized fish scales were found in its stomach."
  ],
  color: "#5b8a8a",
  photos: {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Baryonyx_walkeri_mount_NMNS.jpg/960px-Baryonyx_walkeri_mount_NMNS.jpg",
    "license": "CC BY-SA 2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Baryonyx_walkeri_mount_NMNS.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Baryonyx_walkeri_restoration.jpg/960px-Baryonyx_walkeri_restoration.jpg",
    "license": "CC BY-SA 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Baryonyx_walkeri_restoration.jpg"
  },
},

  model,
}
