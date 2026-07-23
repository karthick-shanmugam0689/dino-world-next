/**
 * Deterministic species scaffold for the add-dino pipeline.
 *
 * Reads CHECK_JSON + PHOTOS_JSON from the environment (set by the workflow)
 * and writes data/dinos/<id>/{model.ts,index.ts} with:
 *   - auto-selected photos already filled in
 *   - a theropod template model (agent retunes kind/numbers)
 *   - placeholder prose/stats the agent must replace
 *
 *   CHECK_JSON='...' PHOTOS_JSON='...' npx tsx scripts/scaffold-dino.ts
 *
 * Never invents facts — placeholders are obviously fake so a missed agent edit fails review.
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

type Photo = { image: string; license: string; source: string }
type PhotosJson = {
  photos?: { skeleton?: Photo; realistic?: Photo }
}
type CheckJson = {
  status?: string
  input?: string
  candidateId?: string
  wikipedia?: { title?: string; description?: string | null; extract?: string }
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

function main() {
  const check = JSON.parse(process.env.CHECK_JSON || '{}') as CheckJson
  const photosPayload = JSON.parse(process.env.PHOTOS_JSON || '{}') as PhotosJson

  const id = check.candidateId
  const inputName = check.input?.trim()
  if (!id || !inputName) {
    console.error('scaffold-dino: CHECK_JSON must include candidateId and input')
    process.exit(1)
  }
  if (!/^[a-z]+$/.test(id)) {
    console.error(`scaffold-dino: invalid id "${id}"`)
    process.exit(1)
  }

  const dir = join(ROOT, 'data', 'dinos', id)
  if (existsSync(join(dir, 'index.ts'))) {
    console.error(`scaffold-dino: data/dinos/${id}/ already exists — refusing to overwrite`)
    process.exit(1)
  }
  mkdirSync(dir, { recursive: true })

  const photos = photosPayload.photos ?? {}
  const wikiTitle = check.wikipedia?.title ?? inputName
  const wikiDesc = check.wikipedia?.description ?? ''
  const wikiExtract = check.wikipedia?.extract ?? ''

  // Neutral theropod starter — agent must retune kind/features/numbers to the species.
  const modelTs = `import type { DinoModelConfig } from '../../types'

/** Scaffold default (theropod). Retune kind + dimensions to the real animal. */
export const model: DinoModelConfig = {
  kind: 'theropod',
  bodyLength: 4,
  bodyRadius: 0.9,
  neckLength: 1.2,
  neckRadius: 0.35,
  headSize: 0.9,
  tailLength: 3.5,
  legHeight: 1.8,
  legRadius: 0.28,
  neckAngle: 0.4,
  arms: 'normal',
}
`

  const photoLines: string[] = []
  if (photos.skeleton) photoLines.push(`  skeleton: ${photoLiteral(photos.skeleton, '  ')},`)
  if (photos.realistic) photoLines.push(`  realistic: ${photoLiteral(photos.realistic, '  ')},`)
  const photosBlock = photoLines.length > 0 ? `{\n${photoLines.join('\n')}\n}` : '{}'

  const indexTs = `import type { Dino } from '../../types'
import { model } from './model'

/**
 * Scaffolded by scripts/scaffold-dino.ts.
 * Wikipedia: ${esc(wikiTitle)}${wikiDesc ? ` — ${esc(wikiDesc)}` : ''}
 * Extract hint: ${esc(wikiExtract.slice(0, 240))}
 *
 * Agent: replace EVERY placeholder below (TODO_*) and retune model.ts.
 * Keep photos as-is unless a URL is broken. Do not invent image URLs.
 */
export const dino: Dino = {
  id: "${id}",
  name: "${esc(inputName)}",
  meaning: "TODO_MEANING",
  familyId: "tyrannosauridae",
  periodId: "cretaceous",
  periodLabel: "TODO_PERIOD_LABEL",
  diet: "Carnivore",
  lengthM: 1,
  heightM: 1,
  weightKg: 1,
  speedKmh: 1,
  location: "TODO_LOCATION",
  description: "TODO_DESCRIPTION",
  facts: [
    "TODO_FACT_1",
    "TODO_FACT_2",
  ],
  color: "#7a8f7a",
  photos: ${photosBlock},
  model,
}
`

  writeFileSync(join(dir, 'model.ts'), modelTs)
  writeFileSync(join(dir, 'index.ts'), indexTs)
  console.log(
    JSON.stringify({
      ok: true,
      id,
      dir: `data/dinos/${id}`,
      photos: Object.keys(photos),
    }),
  )
}

main()
