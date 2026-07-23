import type { SilhouetteKey } from './types'

export type SearchEntry =
  | { kind: 'dino'; id: string; name: string; meaning: string; color: string; silhouette: SilhouetteKey }
  | { kind: 'family'; id: string; name: string }
  | { kind: 'period'; id: string; name: string; color: string; range: string }

export const searchIndex: SearchEntry[] = [
  {
    "kind": "dino",
    "id": "tyrannosaurus",
    "name": "Tyrannosaurus rex",
    "meaning": "Tyrant lizard king",
    "color": "#c96a3b",
    "silhouette": "trex"
  },
  {
    "kind": "dino",
    "id": "tarbosaurus",
    "name": "Tarbosaurus",
    "meaning": "Alarming lizard",
    "color": "#b05c42",
    "silhouette": "trex"
  },
  {
    "kind": "dino",
    "id": "albertosaurus",
    "name": "Albertosaurus",
    "meaning": "Alberta lizard",
    "color": "#a8684f",
    "silhouette": "trex"
  },
  {
    "kind": "dino",
    "id": "velociraptor",
    "name": "Velociraptor",
    "meaning": "Swift thief",
    "color": "#7fa15a",
    "silhouette": "raptor"
  },
  {
    "kind": "dino",
    "id": "deinonychus",
    "name": "Deinonychus",
    "meaning": "Terrible claw",
    "color": "#6d9161",
    "silhouette": "raptor"
  },
  {
    "kind": "dino",
    "id": "utahraptor",
    "name": "Utahraptor",
    "meaning": "Utah's predator",
    "color": "#5f8a6b",
    "silhouette": "raptor"
  },
  {
    "kind": "dino",
    "id": "triceratops",
    "name": "Triceratops",
    "meaning": "Three-horned face",
    "color": "#8a7f4e",
    "silhouette": "ceratops"
  },
  {
    "kind": "dino",
    "id": "styracosaurus",
    "name": "Styracosaurus",
    "meaning": "Spiked lizard",
    "color": "#98763f",
    "silhouette": "ceratops"
  },
  {
    "kind": "dino",
    "id": "stegosaurus",
    "name": "Stegosaurus",
    "meaning": "Roofed lizard",
    "color": "#5e8b7e",
    "silhouette": "stego"
  },
  {
    "kind": "dino",
    "id": "kentrosaurus",
    "name": "Kentrosaurus",
    "meaning": "Sharp point lizard",
    "color": "#4f7d6b",
    "silhouette": "stego"
  },
  {
    "kind": "dino",
    "id": "brachiosaurus",
    "name": "Brachiosaurus",
    "meaning": "Arm lizard",
    "color": "#7d94b5",
    "silhouette": "sauropod"
  },
  {
    "kind": "dino",
    "id": "giraffatitan",
    "name": "Giraffatitan",
    "meaning": "Titanic giraffe",
    "color": "#6f87a8",
    "silhouette": "sauropod"
  },
  {
    "kind": "dino",
    "id": "spinosaurus",
    "name": "Spinosaurus",
    "meaning": "Spine lizard",
    "color": "#4e7c99",
    "silhouette": "spino"
  },
  {
    "kind": "dino",
    "id": "baryonyx",
    "name": "Baryonyx",
    "meaning": "Heavy claw",
    "color": "#5b8a8a",
    "silhouette": "spino"
  },
  {
    "kind": "dino",
    "id": "ankylosaurus",
    "name": "Ankylosaurus",
    "meaning": "Fused lizard",
    "color": "#9c8a63",
    "silhouette": "ankylo"
  },
  {
    "kind": "dino",
    "id": "euoplocephalus",
    "name": "Euoplocephalus",
    "meaning": "Well-armored head",
    "color": "#8f7f55",
    "silhouette": "ankylo"
  },
  {
    "kind": "dino",
    "id": "parasaurolophus",
    "name": "Parasaurolophus",
    "meaning": "Near crested lizard",
    "color": "#b58a5e",
    "silhouette": "hadro"
  },
  {
    "kind": "dino",
    "id": "edmontosaurus",
    "name": "Edmontosaurus",
    "meaning": "Lizard from Edmonton",
    "color": "#a4784f",
    "silhouette": "hadro"
  },
  {
    "kind": "dino",
    "id": "coelophysis",
    "name": "Coelophysis",
    "meaning": "Hollow form",
    "color": "#cf8a52",
    "silhouette": "raptor"
  },
  {
    "kind": "dino",
    "id": "plateosaurus",
    "name": "Plateosaurus",
    "meaning": "Broad lizard",
    "color": "#96a05c",
    "silhouette": "sauropod"
  },
  {
    "kind": "dino",
    "id": "herrerasaurus",
    "name": "Herrerasaurus",
    "meaning": "Herrera's lizard",
    "color": "#b56a45",
    "silhouette": "raptor"
  },
  {
    "kind": "dino",
    "id": "allosaurus",
    "name": "Allosaurus",
    "meaning": "Different lizard",
    "color": "#a05a52",
    "silhouette": "trex"
  },
  {
    "kind": "dino",
    "id": "therizinosaurus",
    "name": "Therizinosaurus",
    "meaning": "Scythe lizard",
    "color": "#5f7a4a",
    "silhouette": "therizino"
  },
  {
    "kind": "dino",
    "id": "mosasaurus",
    "name": "Mosasaurus",
    "meaning": "Lizard of the Meuse River",
    "color": "#3f5a68",
    "silhouette": "mosasaur"
  },
  {
    "kind": "dino",
    "id": "plesiosaurus",
    "name": "Plesiosaurus",
    "meaning": "Near to reptile",
    "color": "#4f7a75",
    "silhouette": "plesiosaur"
  },
  {
    "kind": "dino",
    "id": "pteranodon",
    "name": "Pteranodon",
    "meaning": "Toothless wing",
    "color": "#8a7f6e",
    "silhouette": "ptero"
  },
  {
    "kind": "dino",
    "id": "quetzalcoatlus",
    "name": "Quetzalcoatlus",
    "meaning": "Named for the Aztec feathered serpent god Quetzalcoatl",
    "color": "#8a8477",
    "silhouette": "ptero"
  },
  {
    "kind": "dino",
    "id": "giganotosaurus",
    "name": "Giganotosaurus",
    "meaning": "Giant southern lizard",
    "color": "#7d8a5c",
    "silhouette": "trex"
  },
  {
    "kind": "dino",
    "id": "carcharodontosaurus",
    "name": "Carcharodontosaurus",
    "meaning": "Shark-toothed lizard",
    "color": "#a8632e",
    "silhouette": "trex"
  },
  {
    "kind": "dino",
    "id": "ouranosaurus",
    "name": "Ouranosaurus",
    "meaning": "\"Brave monitor lizard\", from the Tuareg/Fulani word \"ourane\" (monitor lizard) and Greek \"sauros\" (lizard)",
    "color": "#8b6f47",
    "silhouette": "hadro"
  },
  {
    "kind": "family",
    "id": "tyrannosauridae",
    "name": "Tyrannosauridae"
  },
  {
    "kind": "family",
    "id": "dromaeosauridae",
    "name": "Dromaeosauridae"
  },
  {
    "kind": "family",
    "id": "ceratopsidae",
    "name": "Ceratopsidae"
  },
  {
    "kind": "family",
    "id": "stegosauridae",
    "name": "Stegosauridae"
  },
  {
    "kind": "family",
    "id": "brachiosauridae",
    "name": "Brachiosauridae"
  },
  {
    "kind": "family",
    "id": "spinosauridae",
    "name": "Spinosauridae"
  },
  {
    "kind": "family",
    "id": "ankylosauridae",
    "name": "Ankylosauridae"
  },
  {
    "kind": "family",
    "id": "hadrosauridae",
    "name": "Hadrosauridae"
  },
  {
    "kind": "family",
    "id": "coelophysidae",
    "name": "Coelophysidae"
  },
  {
    "kind": "family",
    "id": "plateosauridae",
    "name": "Plateosauridae"
  },
  {
    "kind": "family",
    "id": "herrerasauridae",
    "name": "Herrerasauridae"
  },
  {
    "kind": "family",
    "id": "allosauridae",
    "name": "Allosauridae"
  },
  {
    "kind": "family",
    "id": "carcharodontosauridae",
    "name": "Carcharodontosauridae"
  },
  {
    "kind": "family",
    "id": "therizinosauridae",
    "name": "Therizinosauridae"
  },
  {
    "kind": "family",
    "id": "mosasauridae",
    "name": "Mosasauridae"
  },
  {
    "kind": "family",
    "id": "plesiosauridae",
    "name": "Plesiosauridae"
  },
  {
    "kind": "family",
    "id": "pteranodontidae",
    "name": "Pteranodontidae"
  },
  {
    "kind": "family",
    "id": "azhdarchidae",
    "name": "Azhdarchidae"
  },
  {
    "kind": "period",
    "id": "triassic",
    "name": "Triassic",
    "color": "#cf8a52",
    "range": "252–201 Mya"
  },
  {
    "kind": "period",
    "id": "jurassic",
    "name": "Jurassic",
    "color": "#5e8b7e",
    "range": "201–145 Mya"
  },
  {
    "kind": "period",
    "id": "cretaceous",
    "name": "Cretaceous",
    "color": "#7d94b5",
    "range": "145–66 Mya"
  }
] as SearchEntry[]

export function searchIndexQuery(query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return { dinos: [] as Extract<SearchEntry, { kind: 'dino' }>[], families: [] as Extract<SearchEntry, { kind: 'family' }>[], periods: [] as Extract<SearchEntry, { kind: 'period' }>[] }
  const dinos = searchIndex.filter((e): e is Extract<SearchEntry, { kind: 'dino' }> => e.kind === 'dino' && (e.name.toLowerCase().includes(q) || e.meaning.toLowerCase().includes(q)))
  const families = searchIndex.filter((e): e is Extract<SearchEntry, { kind: 'family' }> => e.kind === 'family' && e.name.toLowerCase().includes(q))
  const periods = searchIndex.filter((e): e is Extract<SearchEntry, { kind: 'period' }> => e.kind === 'period' && e.name.toLowerCase().includes(q))
  return { dinos, families, periods }
}
