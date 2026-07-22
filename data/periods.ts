import type { Period } from './types'

export const periods: Period[] = [
  {
    id: 'triassic',
    name: 'Triassic',
    range: '252–201 Mya',
    color: '#cf8a52',
    highlights: ['herrerasaurus', 'coelophysis', 'plateosaurus'],
    blurb:
      'After the greatest extinction of all time, a new kind of animal rises from the ashes — small, quick, and easy to underestimate. The age of dinosaurs begins.',
  },
  {
    id: 'jurassic',
    name: 'Jurassic',
    range: '201–145 Mya',
    color: '#5e8b7e',
    highlights: ['allosaurus', 'brachiosaurus', 'stegosaurus'],
    blurb:
      'The giants arrive. Sauropods stretch to the treetops, plated grazers patrol the fern plains, and dinosaurs rule every continent on a warm, green Earth.',
  },
  {
    id: 'cretaceous',
    name: 'Cretaceous',
    range: '145–66 Mya',
    color: '#7d94b5',
    highlights: ['spinosaurus', 'triceratops', 'tyrannosaurus'],
    blurb:
      'The spectacular finale — horns, crests, armor, packs of raptors and the tyrant kings. Dinosaurs are more diverse than ever… right up until a very bad day.',
  },
]
