/**
 * Deterministic pre-flight check for the add-dino skill.
 *
 *   npx tsx scripts/check-dino.ts "<name>"
 *
 * Prints a JSON report to stdout and sets an exit code:
 *   0  status:new          — not already in the roster; safe to proceed
 *   2  status:duplicate    — already exists; the skill MUST hard-stop
 *   3  status:error        — bad usage
 *
 * This script decides ONLY the mechanical question ("is it already here?").
 * It does NOT decide whether the animal is legitimate — it just attaches a
 * Wikipedia signal for the agent to weigh with its own knowledge.
 */
import { dinosaurs } from '../data/dinos'
import { families } from '../data/families'

const UA =
  'DinoVerse add-dino bot (https://github.com/karthick-shanmugam0689/dino-world-next)'

/** Our ids are the lowercased genus (first word of the name). */
function slugify(name: string): string {
  const first = name.trim().split(/\s+/)[0] ?? ''
  return first.toLowerCase().replace(/[^a-z]/g, '')
}

function emit(obj: unknown, code: number): never {
  process.stdout.write(JSON.stringify(obj, null, 2) + '\n')
  process.exit(code)
}

async function wikipediaSignal(name: string) {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`,
      { headers: { 'User-Agent': UA } },
    )
    if (!res.ok) return { exists: false, httpStatus: res.status }
    const j = (await res.json()) as {
      type?: string
      title?: string
      description?: string
      extract?: string
    }
    const notFound = j.type?.endsWith('not_found')
    return {
      exists: !notFound && !!j.title,
      title: j.title ?? null,
      // Wikidata one-liner, e.g. "genus of dinosaurs" — a strong legitimacy hint
      description: j.description ?? null,
      extract: (j.extract ?? '').slice(0, 500),
    }
  } catch (err) {
    return { exists: false, error: String(err) }
  }
}

async function main() {
  const input = process.argv[2]
  if (!input || !input.trim()) {
    emit({ status: 'error', message: 'Usage: npx tsx scripts/check-dino.ts "<name>"' }, 3)
  }

  const candidateId = slugify(input)
  const q = input.trim().toLowerCase()

  const existing = dinosaurs.find(
    (d) =>
      d.id === candidateId ||
      d.name.toLowerCase() === q ||
      d.name.toLowerCase().split(/\s+/)[0] === q,
  )

  if (existing) {
    emit(
      {
        status: 'duplicate',
        input,
        candidateId,
        existing: { id: existing.id, name: existing.name, familyId: existing.familyId },
        message: `"${existing.name}" is already in the roster — nothing to do.`,
      },
      2,
    )
  }

  const wikipedia = await wikipediaSignal(input)
  emit(
    {
      status: 'new',
      input,
      candidateId,
      wikipedia,
      existingFamilies: families.map((f) => ({ id: f.id, name: f.name })),
      note:
        'status:new means it is NOT a duplicate. Whether the animal is real/appropriate ' +
        'is the agent\'s judgment call, using the wikipedia signal above plus its own ' +
        'knowledge. If not confident it is a genuine dinosaur/pterosaur/marine reptile, STOP.',
    },
    0,
  )
}

main().catch((err) => emit({ status: 'error', message: String(err) }, 3))
