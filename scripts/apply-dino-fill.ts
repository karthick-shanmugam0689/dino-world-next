/**
 * Apply add-dino-fill.json (written by the CI agent) onto a scaffolded species folder.
 *
 *   npx tsx scripts/apply-dino-fill.ts
 *
 * Expects add-dino-fill.json in the repo root. Keeps scaffolded `photos` as-is.
 * Also writes add-dino-result.json for the workflow verdict step.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const FILL_PATH = join(ROOT, 'add-dino-fill.json')
const RESULT_PATH = join(ROOT, 'add-dino-result.json')

type Photo = { image: string; license: string; source: string }
type Photos = { skeleton?: Photo; realistic?: Photo }

type Fill =
  | { legitimate: false; reason: string }
  | {
      legitimate: true
      id: string
      name: string
      meaning: string
      familyId: string
      newFamily?: {
        id: string
        name: string
        description: string
        period: string
        traits: string[]
      }
      periodId: 'triassic' | 'jurassic' | 'cretaceous'
      periodLabel: string
      diet: 'Carnivore' | 'Herbivore' | 'Piscivore'
      lengthM: number
      heightM: number
      weightKg: number
      speedKmh: number
      wingSpanM?: number
      location: string
      description: string
      facts: string[]
      silhouette: string
      color: string
      clade?: 'marine-reptile' | 'pterosaur'
      model: Record<string, unknown>
      reason: string
    }

function esc(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

function photoLiteral(p: Photo, indent: string) {
  return (
    `${indent}{\n` +
    `${indent}  image: "${esc(p.image)}",\n` +
    `${indent}  license: "${esc(p.license)}",\n` +
    `${indent}  source: "${esc(p.source)}",\n` +
    `${indent}}`
  )
}

function extractPhotos(indexSrc: string): Photos {
  const photos: Photos = {}
  const sk = indexSrc.match(/skeleton:\s*\{([\s\S]*?)\n\s*\},/)
  const re = indexSrc.match(/realistic:\s*\{([\s\S]*?)\n\s*\},/)
  const parse = (block: string): Photo | undefined => {
    const image = block.match(/image:\s*"([^"]+)"/)?.[1]
    const license = block.match(/license:\s*"([^"]+)"/)?.[1]
    const source = block.match(/source:\s*"([^"]+)"/)?.[1]
    if (!image || !license || !source) return undefined
    return { image, license, source }
  }
  if (sk) {
    const p = parse(sk[1])
    if (p) photos.skeleton = p
  }
  if (re) {
    const p = parse(re[1])
    if (p) photos.realistic = p
  }
  return photos
}

function addFamilyIfNeeded(fill: Extract<Fill, { legitimate: true }>) {
  const nf = fill.newFamily
  if (!nf || typeof nf !== 'object') return
  const famPath = join(ROOT, 'data', 'families.ts')
  let src = readFileSync(famPath, 'utf8')
  if (src.includes(`id: '${nf.id}'`) || src.includes(`id: "${nf.id}"`)) {
    return
  }
  const q = (s: string) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  const entry =
    `  {\n` +
    `    id: '${nf.id}',\n` +
    `    name: '${q(nf.name)}',\n` +
    `    description:\n` +
    `      '${q(nf.description)}',\n` +
    `    period: '${q(nf.period)}',\n` +
    `    traits: ${JSON.stringify(nf.traits)},\n` +
    `  },\n`
  if (!src.includes('] as const')) {
    throw new Error('data/families.ts missing `] as const` marker')
  }
  src = src.replace('] as const', `${entry}] as const`)
  writeFileSync(famPath, src)
}

function main() {
  if (!existsSync(FILL_PATH)) {
    writeFileSync(
      RESULT_PATH,
      JSON.stringify({
        legitimate: false,
        reason: 'Agent did not write add-dino-fill.json before the turn limit.',
      }) + '\n',
    )
    console.error('apply-dino-fill: missing add-dino-fill.json')
    process.exit(0) // let verdict step handle soft-fail
  }

  const fill = JSON.parse(readFileSync(FILL_PATH, 'utf8')) as Fill

  if (!fill.legitimate) {
    writeFileSync(
      RESULT_PATH,
      JSON.stringify({ legitimate: false, reason: fill.reason || 'Agent rejected the species.' }) + '\n',
    )
    console.log('apply-dino-fill: legitimate=false')
    return
  }

  if (!/^[a-z]+$/.test(fill.id)) {
    throw new Error(`invalid id "${fill.id}"`)
  }

  const dir = join(ROOT, 'data', 'dinos', fill.id)
  const indexPath = join(dir, 'index.ts')
  const modelPath = join(dir, 'model.ts')
  if (!existsSync(indexPath) || !existsSync(modelPath)) {
    throw new Error(`scaffold missing for data/dinos/${fill.id}`)
  }

  const existing = readFileSync(indexPath, 'utf8')
  const photos = extractPhotos(existing)
  const photoLines: string[] = []
  if (photos.skeleton) photoLines.push(`  skeleton: ${photoLiteral(photos.skeleton, '  ')},`)
  if (photos.realistic) photoLines.push(`  realistic: ${photoLiteral(photos.realistic, '  ')},`)
  const photosBlock = photoLines.length > 0 ? `{\n${photoLines.join('\n')}\n}` : '{}'

  if (fill.newFamily) addFamilyIfNeeded(fill)

  const clade = fill.clade ?? undefined
  const wingSpanM = fill.wingSpanM ?? undefined
  const cladeLine = clade ? `  clade: "${clade}",\n` : ''
  const wingLine = wingSpanM != null ? `  wingSpanM: ${wingSpanM},\n` : ''
  const facts = fill.facts.map((f) => `    "${esc(f)}",`).join('\n')

  // Drop nullish model extras the model may emit
  const model = { ...fill.model }
  for (const key of Object.keys(model)) {
    if (model[key] === null || model[key] === undefined) delete model[key]
  }
  if (model.features && typeof model.features === 'object') {
    const feats = { ...(model.features as Record<string, unknown>) }
    for (const key of Object.keys(feats)) {
      if (!feats[key]) delete feats[key]
    }
    if (Object.keys(feats).length === 0) delete model.features
    else model.features = feats
  }

  const indexTs = `import type { Dino } from '../../types'
import { model } from './model'

export const dino: Dino = {
  id: "${fill.id}",
  name: "${esc(fill.name)}",
  meaning: "${esc(fill.meaning)}",
  familyId: "${fill.familyId}",
  periodId: "${fill.periodId}",
  periodLabel: "${esc(fill.periodLabel)}",
  diet: "${fill.diet}",
  lengthM: ${fill.lengthM},
  heightM: ${fill.heightM},
  weightKg: ${fill.weightKg},
  speedKmh: ${fill.speedKmh},
${wingLine}  location: "${esc(fill.location)}",
  description: "${esc(fill.description)}",
  facts: [
${facts}
  ],
  color: "${esc(fill.color)}",
  silhouette: "${fill.silhouette}",
${cladeLine}  photos: ${photosBlock},
  model,
}
`

  const modelTs = `import type { DinoModelConfig } from '../../types'

export const model: DinoModelConfig = ${JSON.stringify(model, null, 2)}
`

  writeFileSync(indexPath, indexTs)
  writeFileSync(modelPath, modelTs)
  writeFileSync(
    RESULT_PATH,
    JSON.stringify({
      legitimate: true,
      id: fill.id,
      name: fill.name,
      newFamily: !!fill.newFamily,
      familyId: fill.familyId,
      reason: fill.reason,
    }) + '\n',
  )
  console.log(`apply-dino-fill: wrote data/dinos/${fill.id}`)
}

main()
