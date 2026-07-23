import type { Dino } from '../../types'
import { model } from './model'

export const dino: Dino = {
  id: "velociraptor",
  name: "Velociraptor",
  meaning: "Swift thief",
  familyId: "dromaeosauridae",
  silhouette: "raptor",
  periodId: "cretaceous",
  periodLabel: "Late Cretaceous · 75–71 Mya",
  diet: "Carnivore",
  lengthM: 2,
  heightM: 0.7,
  weightKg: 15,
  speedKmh: 60,
  location: "Mongolia",
  description: "Smaller than the movies suggest — about the size of a turkey, and fully feathered — but every bit as sharp. Velociraptor used its famous sickle claw not to slash but to pin struggling prey, eating it alive like a modern eagle.",
  facts: [
    "A fossil preserves one locked in combat with a Protoceratops.",
    "Quill knobs on its arm bones prove it had feathers.",
    "It was about the size of a large turkey."
  ],
  color: "#7fa15a",
  featured: true,
  photos: {
  skeleton: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Velociraptor_skeleton_white_background.jpg/960px-Velociraptor_skeleton_white_background.jpg",
    "license": "CC BY 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Velociraptor_skeleton_white_background.jpg"
  },
  realistic: {
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Velociraptor_Restoration.png/960px-Velociraptor_Restoration.png",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Velociraptor_Restoration.png"
  },
},

  model,
}
