/**
 * Regenerate data/dinos/index.ts (the barrel that aggregates every species)
 * from the folders on disk. Also writes data/search-index.ts for client search.
 *
 *   npx tsx scripts/generate-dino-index.ts
 *
 * Existing order is preserved (so the home-page featured grid never silently
 * reshuffles); brand-new folders are appended in alphabetical order.
 */
import { readdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DATA_DIR = join(ROOT, 'data')
const DINOS_DIR = join(DATA_DIR, 'dinos')
const INDEX_FILE = join(DINOS_DIR, 'index.ts')
const SEARCH_INDEX_FILE = join(DATA_DIR, 'search-index.ts')
const FAMILIES_FILE = join(DATA_DIR, 'families.ts')
const PERIODS_FILE = join(DATA_DIR, 'periods.ts')

const folderIds = readdirSync(DINOS_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory() && existsSync(join(DINOS_DIR, e.name, 'index.ts')))
  .map((e) => e.name)

for (const id of folderIds) {
  if (!/^[a-z]+$/.test(id)) {
    console.error(`Refusing to generate: "${id}" is not a valid lowercase-letter id.`)
    process.exit(1)
  }
}

let priorOrder: string[] = []
if (existsSync(INDEX_FILE)) {
  const src = readFileSync(INDEX_FILE, 'utf8')
  priorOrder = [...src.matchAll(/from '\.\/([a-z]+)'/g)].map((m) => m[1])
}

const known = new Set(folderIds)
const ordered = [
  ...priorOrder.filter((id) => known.has(id)),
  ...folderIds.filter((id) => !priorOrder.includes(id)).sort(),
]

const imports = ordered.map((id) => `import { dino as ${id} } from './${id}'`).join('\n')
const arrayItems = ordered.map((id) => `  ${id},`).join('\n')

const out =
  `import type { Dino } from '../types'\n` +
  imports +
  '\n\n' +
  `export const dinosaurs: Dino[] = [\n${arrayItems}\n]\n`

writeFileSync(INDEX_FILE, out)
console.log(`Regenerated ${INDEX_FILE} with ${ordered.length} dinosaurs.`)

;(async () => {
  const { dinosaurs } = await import(pathToFileURL(INDEX_FILE).href)
  const { families } = await import(pathToFileURL(FAMILIES_FILE).href)
  const { periods } = await import(pathToFileURL(PERIODS_FILE).href)

  const familyIds = new Set(families.map((f: { id: string }) => f.id))
  const periodIds = new Set(periods.map((p: { id: string }) => p.id))

  let hardFail = false

  const orphanedFamily = dinosaurs.filter((d: { familyId: string }) => !familyIds.has(d.familyId))
  if (orphanedFamily.length > 0) {
    hardFail = true
    console.error('Data integrity error: familyId does not match any entry in data/families.ts:')
    for (const d of orphanedFamily as { id: string; familyId: string }[]) {
      console.error(`  - ${d.id}: familyId "${d.familyId}"`)
    }
  }

  const badPeriod = dinosaurs.filter((d: { periodId: string }) => !periodIds.has(d.periodId))
  if (badPeriod.length > 0) {
    hardFail = true
    console.error('Data integrity error: periodId is not a known PeriodId:')
    for (const d of badPeriod as { id: string; periodId: string }[]) {
      console.error(`  - ${d.id}: periodId "${d.periodId}"`)
    }
  }

  const noPhotos = dinosaurs.filter(
    (d: { photos?: { skeleton?: unknown; realistic?: unknown } }) =>
      !d.photos?.skeleton && !d.photos?.realistic,
  )
  if (noPhotos.length > 0) {
    console.warn('Warning: species with no reference photos (skeleton or realistic):')
    for (const d of noPhotos as { id: string }[]) {
      console.warn(`  - ${d.id}`)
    }
  }

  // Client-safe search index (slim fields only)
  type SearchEntry =
    | { kind: 'dino'; id: string; name: string; meaning: string; color: string; silhouette: string }
    | { kind: 'family'; id: string; name: string }
    | { kind: 'period'; id: string; name: string; color: string; range: string }

  const searchEntries: SearchEntry[] = [
    ...dinosaurs.map(
      (d: { id: string; name: string; meaning: string; color: string; silhouette: string }) => ({
        kind: 'dino' as const,
        id: d.id,
        name: d.name,
        meaning: d.meaning,
        color: d.color,
        silhouette: d.silhouette,
      }),
    ),
    ...families.map((f: { id: string; name: string }) => ({
      kind: 'family' as const,
      id: f.id,
      name: f.name,
    })),
    ...periods.map((p: { id: string; name: string; color: string; range: string }) => ({
      kind: 'period' as const,
      id: p.id,
      name: p.name,
      color: p.color,
      range: p.range,
    })),
  ]

  const searchOut =
    `import type { SilhouetteKey } from './types'\n\n` +
    `export type SearchEntry =\n` +
    `  | { kind: 'dino'; id: string; name: string; meaning: string; color: string; silhouette: SilhouetteKey }\n` +
    `  | { kind: 'family'; id: string; name: string }\n` +
    `  | { kind: 'period'; id: string; name: string; color: string; range: string }\n\n` +
    `export const searchIndex: SearchEntry[] = ${JSON.stringify(searchEntries, null, 2)} as SearchEntry[]\n\n` +
    `export function searchIndexQuery(query: string) {\n` +
    `  const q = query.trim().toLowerCase()\n` +
    `  if (!q) return { dinos: [] as Extract<SearchEntry, { kind: 'dino' }>[], families: [] as Extract<SearchEntry, { kind: 'family' }>[], periods: [] as Extract<SearchEntry, { kind: 'period' }>[] }\n` +
    `  const dinos = searchIndex.filter((e): e is Extract<SearchEntry, { kind: 'dino' }> => e.kind === 'dino' && (e.name.toLowerCase().includes(q) || e.meaning.toLowerCase().includes(q)))\n` +
    `  const families = searchIndex.filter((e): e is Extract<SearchEntry, { kind: 'family' }> => e.kind === 'family' && e.name.toLowerCase().includes(q))\n` +
    `  const periods = searchIndex.filter((e): e is Extract<SearchEntry, { kind: 'period' }> => e.kind === 'period' && e.name.toLowerCase().includes(q))\n` +
    `  return { dinos, families, periods }\n` +
    `}\n`

  writeFileSync(SEARCH_INDEX_FILE, searchOut)
  console.log(`Regenerated ${SEARCH_INDEX_FILE}`)

  if (hardFail) process.exit(1)
})()
