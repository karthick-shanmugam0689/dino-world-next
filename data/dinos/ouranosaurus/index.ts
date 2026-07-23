import type { Dino } from '../../types'
import { model } from './model'

export const dino: Dino = {
  id: "ouranosaurus",
  name: "Ouranosaurus",
  meaning: "\"Brave monitor lizard\", from the Tuareg/Fulani word \"ourane\" (monitor lizard) and Greek \"sauros\" (lizard)",
  familyId: "hadrosauridae",
  periodId: "cretaceous",
  periodLabel: "Early Cretaceous · 121–113 Mya",
  diet: "Herbivore",
  lengthM: 7.8,
  heightM: 2.5,
  weightKg: 2200,
  speedKmh: 20,
  location: "Elrhaz Formation, Gadoufaoua deposits, Niger; Koum Formation, Cameroon",
  description: "Ouranosaurus was a large herbivorous basal hadrosauriform that roamed the floodplains of what is now Niger and Cameroon during the Aptian stage of the Early Cretaceous. It is best known for the row of tall neural spines running along its back, which likely supported either a skin sail or a fatty hump. Two well-preserved skeletons were unearthed in the Gadoufaoua deposits in 1965 and 1970 and formally described by French paleontologist Philippe Taquet in 1976.",
  facts: [
    "Its elongated neural spines formed a sail or hump along its back and tail, a rare feature among ornithopod dinosaurs.",
    "It shared its Early Cretaceous floodplain habitat with the sail-backed theropod Spinosaurus, an example of convergent evolution.",
    "Its long, flattened snout led early researchers to speculate it may have supported an inflatable nasal sac used for display.",
  ],
  color: "#8b6f47",
  silhouette: "hadro",
  photos: {},
  model,
}
