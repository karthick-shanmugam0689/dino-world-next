/**
 * Regenerate data/dinos/index.ts (the barrel that aggregates every species)
 * from the folders on disk. Deterministic: run it any time a dino folder is
 * added or removed and it rewrites the imports + arrays to match.
 *
 *   npx tsx scripts/generate-dino-index.ts
 *
 * Existing order is preserved (so the home-page featured grid never silently
 * reshuffles); brand-new folders are appended in alphabetical order.
 */
import { readdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const DINOS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'data', 'dinos')
const INDEX_FILE = join(DINOS_DIR, 'index.ts')

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
