/**
 * Regenerate data/dinos/index.ts (the barrel that aggregates every species)
 * from the folders on disk. Deterministic: run it any time a dino folder is
 * added or removed and it rewrites the imports + arrays to match.
 *
 *   npx tsx scripts/generate-dino-index.ts
 *
 * Existing order is preserved (so the home-page featured grid never silently
 * reshuffles); brand-new folders are appended in alphabetical order.
 *
 * Also maintains data/families.ts: if add-dino-result.json (in the cwd)
 * carries a `newFamily` object, it's inserted here if not already present —
 * then, either way, every dino's familyId is cross-checked against the
 * families that now exist. A dangling id compiles fine (page.tsx's
 * getFamily(...)! is a type-only assertion) but crashes the dino detail page
 * at runtime, so this is the one place that both writes and validates
 * data/families.ts, rather than trusting an agent to hand-edit it in sync
 * with a separately-written familyId.
 */
import { readdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'

const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'data')
const DINOS_DIR = join(DATA_DIR, 'dinos')
const INDEX_FILE = join(DINOS_DIR, 'index.ts')
const FAMILIES_FILE = join(DATA_DIR, 'families.ts')
const RESULT_FILE = join(process.cwd(), 'add-dino-result.json')

// every subfolder that actually contains an index.ts is a species
const folderIds = readdirSync(DINOS_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory() && existsSync(join(DINOS_DIR, e.name, 'index.ts')))
  .map((e) => e.name)

for (const id of folderIds) {
  if (!/^[a-z]+$/.test(id)) {
    console.error(`Refusing to generate: "${id}" is not a valid lowercase-letter id.`)
    process.exit(1)
  }
}

// preserve the order already declared in the current barrel, if any
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

const imports = ordered
  .map((id) => `import { dino as ${id}, photos as ${id}Photos } from './${id}'`)
  .join('\n')
const arrayItems = ordered.map((id) => `  ${id},`).join('\n')
const photoItems = ordered.map((id) => `  ${id}: ${id}Photos,`).join('\n')

const out =
  `import type { Dino, DinoPhotoSet } from '../types'\n` +
  imports +
  '\n\n' +
  `export const dinosaurs: Dino[] = [\n${arrayItems}\n]\n\n` +
  `export const dinoPhotos: Record<string, DinoPhotoSet> = {\n${photoItems}\n}\n`

writeFileSync(INDEX_FILE, out)
console.log(`Regenerated ${INDEX_FILE} with ${ordered.length} dinosaurs.`)

interface NewFamily {
  id: string
  name: string
  description: string
  period: string
  traits: string[]
}

function fail(message: string): never {
  console.error(message)
  process.exit(1)
}

function quote(s: string): string {
  return `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

/** Insert newFamily into data/families.ts, unless it's already there. No-ops on any missing/absent input. */
function applyNewFamilyIfNeeded() {
  if (!existsSync(RESULT_FILE)) return
  const result = JSON.parse(readFileSync(RESULT_FILE, 'utf8')) as { newFamily?: NewFamily }
  if (!result.newFamily) return
  const nf = result.newFamily

  if (
    typeof nf.id !== 'string' ||
    !/^[a-z]+$/.test(nf.id) ||
    typeof nf.name !== 'string' ||
    !nf.name.trim() ||
    typeof nf.description !== 'string' ||
    !nf.description.trim() ||
    typeof nf.period !== 'string' ||
    !nf.period.trim() ||
    !Array.isArray(nf.traits) ||
    nf.traits.length === 0 ||
    !nf.traits.every((t) => typeof t === 'string' && t.trim())
  ) {
    fail(`Invalid newFamily object in add-dino-result.json: ${JSON.stringify(nf)}`)
  }

  const src = readFileSync(FAMILIES_FILE, 'utf8')
  if (new RegExp(`id:\\s*'${nf.id}'`).test(src)) {
    console.log(`Family "${nf.id}" already exists in data/families.ts — nothing to add.`)
    return
  }

  const entry =
    `  {\n` +
    `    id: ${quote(nf.id)},\n` +
    `    name: ${quote(nf.name)},\n` +
    `    description:\n` +
    `      ${quote(nf.description)},\n` +
    `    period: ${quote(nf.period)},\n` +
    `    traits: [${nf.traits.map(quote).join(', ')}],\n` +
    `  },\n`

  const closeMatch = src.match(/\n\]\s*$/)
  if (!closeMatch || closeMatch.index === undefined) {
    fail('Could not find the closing "]" of the families array in data/families.ts')
  }

  writeFileSync(FAMILIES_FILE, src.slice(0, closeMatch.index) + '\n' + entry + src.slice(closeMatch.index + 1))
  console.log(`Added family "${nf.id}" to data/families.ts.`)
}

applyNewFamilyIfNeeded()

// Cross-check every dino's familyId against data/families.ts (including
// whatever applyNewFamilyIfNeeded just added).
;(async () => {
  const { dinosaurs } = await import(pathToFileURL(INDEX_FILE).href)
  const { families } = await import(pathToFileURL(FAMILIES_FILE).href)
  const familyIds = new Set(families.map((f: { id: string }) => f.id))
  const orphaned = dinosaurs.filter((d: { familyId: string }) => !familyIds.has(d.familyId))
  if (orphaned.length > 0) {
    console.error('Data integrity error: familyId does not match any entry in data/families.ts:')
    for (const d of orphaned as { id: string; familyId: string }[]) {
      console.error(`  - ${d.id}: familyId "${d.familyId}"`)
    }
    process.exit(1)
  }
})()
