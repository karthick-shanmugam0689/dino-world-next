/**
 * Deterministic pre-flight check for the add-dino pipeline.
 *
 *   npx tsx scripts/check-dino.ts "<name>"
 *
 * Exit codes:
 *   0  status:new        — not in roster AND Wikipedia page exists → agent may run
 *   2  status:duplicate  — already in the roster → stop (no agent)
 *   4  status:not_found  — no Wikipedia page → stop (no agent)
 *   3  status:error      — bad usage
 *
 * Legitimacy gate is Wikipedia existence only (no description keyword matching).
 * Whether the page is a true Mesozoic reptile is still the agent's judgment
 * once a page exists — but gibberish names never reach the agent.
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
    if (!res.ok) return { exists: false as const, httpStatus: res.status }
    const j = (await res.json()) as {
      type?: string
      title?: string
      description?: string
      extract?: string
    }
    const notFound = j.type?.endsWith('not_found')
    if (notFound || !j.title) return { exists: false as const, httpStatus: res.status }
    return {
      exists: true as const,
      title: j.title,
      description: j.description ?? null,
      extract: (j.extract ?? '').slice(0, 500),
    }
  } catch (err) {
    return { exists: false as const, error: String(err) }
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
  if (!wikipedia.exists) {
    emit(
      {
        status: 'not_found',
        input,
        candidateId,
        wikipedia,
        message: `No Wikipedia page found for "${input}" — refusing to spend agent tokens on an unverifiable name.`,
      },
      4,
    )
  }

  emit(
    {
      status: 'new',
      input,
      candidateId,
      wikipedia,
      existingFamilies: families.map((f) => ({ id: f.id, name: f.name })),
      note: 'Wikipedia page exists and the name is not a duplicate. The agent still decides clade/family/kind and writes content.',
    },
    0,
  )
}

main().catch((err) => emit({ status: 'error', message: String(err) }, 3))
