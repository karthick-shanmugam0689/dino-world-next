import type { Dino, Family, Period, PeriodId } from './types'
import { dinosaurs } from './dinos'
import { families } from './families'
import { periods } from './periods'

export const getDino = (id: string) => dinosaurs.find((d) => d.id === id)
export const getFamily = (id: string) => families.find((f) => f.id === id)
export const getFamilyMembers = (familyId: string) =>
  dinosaurs.filter((d) => d.familyId === familyId)
export const featuredDinos = dinosaurs.filter((d) => d.featured)

export const getPeriod = (id: string) => periods.find((p) => p.id === id)
export const getPeriodId = (dino: Dino): PeriodId => dino.periodId
export const getPeriodMembers = (periodId: PeriodId) =>
  dinosaurs.filter((d) => d.periodId === periodId)

export function searchAll(query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return { dinos: [] as Dino[], families: [] as Family[], periods: [] as Period[] }
  return {
    dinos: dinosaurs.filter(
      (d) => d.name.toLowerCase().includes(q) || d.meaning.toLowerCase().includes(q),
    ),
    families: [...families].filter((f) => f.name.toLowerCase().includes(q)) as Family[],
    periods: periods.filter((p) => p.name.toLowerCase().includes(q)),
  }
}
