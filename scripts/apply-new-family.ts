/**
 * Deterministically append a new Family entry to data/families.ts, driven by
 * the agent's structured `newFamily` field in add-dino-result.json — instead
 * of trusting the agent to hand-edit families.ts prose correctly.
 *
 *   npx tsx scripts/apply-new-family.ts
 *
 * This exists because "agent forgets to add the family, or adds it with a
 * mismatched id" was a recurring production failure (caught safely by
 * generate-dino-index.ts's familyId check, but wasting a full run each
 * time) — a symptom that hand-editing two separate files in sync isn't a
 * job to leave to free-form agent writing when it's fully deterministic.
 *
 * No-ops (exit 0) if there's no result file, no newFamily field, or a
 * family with that id already exists.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const FAMILIES_FILE = join(dirname(fileURLToPath(import.meta.url)), '..', 'data', 'families.ts')
const RESULT_FILE = join(process.cwd(), 'add-dino-result.json')

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

if (!existsSync(RESULT_FILE)) {
  console.log('No add-dino-result.json found — nothing to do.')
  process.exit(0)
}

const result = JSON.parse(readFileSync(RESULT_FILE, 'utf8')) as { newFamily?: NewFamily }

if (!result.newFamily) {
  console.log('No newFamily in the result — reusing an existing family, nothing to do.')
  process.exit(0)
}

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
  console.log(`Family "${nf.id}" already exists in data/families.ts — nothing to do.`)
  process.exit(0)
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

const out = src.slice(0, closeMatch.index) + '\n' + entry + src.slice(closeMatch.index + 1)
writeFileSync(FAMILIES_FILE, out)
console.log(`Added family "${nf.id}" to data/families.ts.`)
