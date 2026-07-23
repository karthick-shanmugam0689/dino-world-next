import { dinosaurs } from '../data/dinos'

/** Our ids are the lowercased genus (first word of the name). */
export function slugifyDinoName(name: string): string {
  const first = name.trim().split(/\s+/)[0] ?? ''
  return first.toLowerCase().replace(/[^a-z]/g, '')
}

export function findExistingDino(input: string) {
  const candidateId = slugifyDinoName(input)
  const q = input.trim().toLowerCase()
  return (
    dinosaurs.find(
      (d) =>
        d.id === candidateId ||
        d.name.toLowerCase() === q ||
        d.name.toLowerCase().split(/\s+/)[0] === q,
    ) ?? null
  )
}

export function dinoPath(id: string) {
  return `/dino/${id}`
}
