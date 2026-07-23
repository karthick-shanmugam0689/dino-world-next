/**
 * Find + auto-select reference images for a species on Wikimedia Commons.
 *
 *   npx tsx scripts/find-photos.ts "<Wikipedia page title>"
 *
 * Prints JSON with:
 *   - photos: DinoPhotoSet shape ready to drop into a dino record (may be {})
 *   - skeletonCandidates / realisticCandidates: shortlists for debugging
 *
 * Selection is deterministic: first good-scoring candidate whose license is
 * CC0 / public domain / CC BY / CC BY-SA. No agent involvement.
 *
 * Classification uses filename + Commons ImageDescription (many museum mounts
 * and life restorations omit keywords like "skeleton" / "restoration" in the
 * filename — Ouranosaurus was a real miss).
 */
const UA =
  'DinoVerse add-dino bot (https://github.com/karthick-shanmugam0689/dino-world-next)'

/** Hard skip — never worth resolving. */
const EXCLUDE_FILE = [
  'scale',
  'size_comparison',
  'phylogeny',
  'growth',
  'census',
  'trackway',
  'brain',
  'endocast',
  'lesion',
  '.svg',
  'spinal',
  'peptide',
  'distribution',
  'footprint',
  'track',
  'integument',
  'diagram',
  '.gif',
  'stratigraph',
  'cladogram',
  'range_map',
  'locator',
]

const EXCLUDE_TEXT = [
  'location of',
  'outcrop',
  'geological map',
  'range map',
  'distribution map',
  'phylogen',
  'cladogram',
  'size comparison',
  'scale diagram',
]

/** Filename / description tokens → skeleton-ish (higher = better). */
const SKELETON_HINTS: Array<{ re: RegExp; score: number }> = [
  { re: /\b(skeleton|skeletal|skelett|mounted specimen|skeletal mount)\b/i, score: 100 },
  { re: /\b(mount|mounted|cast)\b/i, score: 80 },
  { re: /\b(museum|museo|museu|muséum|natural history|naturkunde)\b/i, score: 70 },
  { re: /\b(holotype|specimen|fossil)\b/i, score: 50 },
  { re: /\b(skull|cranium|vertebra|vertebrae|forelimb|hindlimb)\b/i, score: 25 },
]

/** Filename / description tokens → life restoration. */
const REALISTIC_HINTS: Array<{ re: RegExp; score: number }> = [
  { re: /\b(life[_\s-]?restoration|life[_\s-]?reconstruction|life restoration)\b/i, score: 100 },
  { re: /\b(restoration|reconstruction|paleoart|palaeoart)\b/i, score: 90 },
  { re: /\b(mmartyniuk|steveoc|durbed|knight|dmitry|bogdanov)\b/i, score: 85 },
  { re: /_(nt|td|db|bw)\./i, score: 80 },
  { re: /\b(profile|side view)\b/i, score: 40 },
]

const ALLOWED_LICENSE = /^(cc0|public domain|cc[- ]?by(?:[- ]?sa)?(?:\s+\d+(\.\d+)?)?)$/i

type Candidate = {
  file: string
  thumb: string
  license: string
  source: string
  description: string
  skeletonScore: number
  realisticScore: number
}
type DinoPhoto = { image: string; license: string; source: string }

async function getJSON(url: string) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return res.json()
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()
}

function scoreHints(text: string, hints: Array<{ re: RegExp; score: number }>) {
  let best = 0
  for (const h of hints) {
    if (h.re.test(text) && h.score > best) best = h.score
  }
  return best
}

function hardExcludedFile(file: string) {
  const low = file.toLowerCase()
  return EXCLUDE_FILE.some((k) => low.includes(k))
}

function softExcludedText(text: string) {
  const low = text.toLowerCase()
  return EXCLUDE_TEXT.some((k) => low.includes(k))
}

function licenseOk(license: string) {
  return ALLOWED_LICENSE.test(license.trim())
}

/** Require the species token in filename or caption so page-adjacent art doesn't sneak in. */
function mentionsSpecies(blob: string, speciesTitle: string) {
  const token = speciesTitle.trim().split(/\s+/)[0]?.toLowerCase()
  if (!token || token.length < 4) return true
  return blob.toLowerCase().includes(token)
}

/** Resolve a "File:Foo.jpg" title to thumb + license + description. */
async function resolve(fileTitle: string, speciesTitle: string): Promise<Candidate | null> {
  const api =
    'https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo' +
    '&iiprop=url|extmetadata&iiurlwidth=960&format=json&titles=' +
    encodeURIComponent(fileTitle)
  try {
    const d = (await getJSON(api)) as {
      query?: {
        pages?: Record<
          string,
          {
            imageinfo?: Array<{
              thumburl?: string
              url?: string
              extmetadata?: Record<string, { value?: string }>
            }>
          }
        >
      }
    }
    const pages = d.query?.pages ?? {}
    for (const p of Object.values(pages)) {
      const info = p.imageinfo?.[0]
      if (!info) continue
      const file = fileTitle.replace(/^File:/, '')
      const description = stripHtml(info.extmetadata?.ImageDescription?.value ?? '')
      const categories = info.extmetadata?.Categories?.value ?? ''
      const blob = `${file} ${description} ${categories}`
      if (softExcludedText(blob)) return null
      if (!mentionsSpecies(blob, speciesTitle)) return null
      const skeletonScore = scoreHints(blob, SKELETON_HINTS)
      const realisticScore = scoreHints(blob, REALISTIC_HINTS)
      // Unclassified noise (maps, random scenery) — drop unless we have any signal.
      if (skeletonScore === 0 && realisticScore === 0) return null
      return {
        file,
        thumb: info.thumburl ?? info.url ?? '',
        license: info.extmetadata?.LicenseShortName?.value ?? 'Unknown',
        source: `https://commons.wikimedia.org/wiki/${encodeURIComponent(fileTitle.replace(/ /g, '_'))}`,
        description,
        skeletonScore,
        realisticScore,
      }
    }
  } catch {
    /* skip unresolvable files */
  }
  return null
}

function toPhoto(c: Candidate): DinoPhoto {
  return { image: c.thumb, license: c.license, source: c.source }
}

function pickBest(
  candidates: Candidate[],
  scoreOf: (c: Candidate) => number,
): DinoPhoto | undefined {
  const ranked = candidates
    .filter((c) => c.thumb && licenseOk(c.license) && scoreOf(c) > 0)
    .sort((a, b) => scoreOf(b) - scoreOf(a))
  return ranked[0] ? toPhoto(ranked[0]) : undefined
}

async function wikiMediaTitles(title: string): Promise<string[]> {
  const media = (await getJSON(
    `https://en.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent(title)}`,
  )) as { items?: Array<{ type?: string; title?: string }> }
  const out: string[] = []
  for (const it of media.items ?? []) {
    if (it.type !== 'image' || !it.title) continue
    if (hardExcludedFile(it.title)) continue
    out.push(it.title)
  }
  return out
}

/** Fallback when the article media list has no classifiable images. */
async function commonsSearchTitles(title: string, queryExtra: string): Promise<string[]> {
  const q = `${title} ${queryExtra}`
  const api =
    'https://commons.wikimedia.org/w/api.php?action=query&list=search' +
    '&srnamespace=6&srlimit=10&format=json&srsearch=' +
    encodeURIComponent(q)
  try {
    const d = (await getJSON(api)) as {
      query?: { search?: Array<{ title?: string }> }
    }
    return (d.query?.search ?? [])
      .map((h) => h.title)
      .filter((t): t is string => !!t && !hardExcludedFile(t))
  } catch {
    return []
  }
}

async function resolveAll(
  files: string[],
  speciesTitle: string,
  limit = 12,
): Promise<Candidate[]> {
  const unique = [...new Set(files)].slice(0, limit)
  return (await Promise.all(unique.map((f) => resolve(f, speciesTitle)))).filter(
    (c): c is Candidate => !!c,
  )
}

async function main() {
  const title = process.argv[2]
  if (!title || !title.trim()) {
    process.stdout.write(
      JSON.stringify({ error: 'Usage: npx tsx scripts/find-photos.ts "<Wikipedia title>"' }) + '\n',
    )
    process.exit(3)
  }

  let files = await wikiMediaTitles(title)
  let candidates = await resolveAll(files, title)

  const hasSkeleton = candidates.some((c) => c.skeletonScore > 0)
  const hasRealistic = candidates.some((c) => c.realisticScore > 0)

  if (!hasSkeleton || !hasRealistic) {
    const extraQueries: string[] = []
    if (!hasSkeleton) extraQueries.push('skeleton OR mount OR museum OR fossil')
    if (!hasRealistic) extraQueries.push('restoration OR reconstruction OR life')
    const extras = (
      await Promise.all(extraQueries.map((q) => commonsSearchTitles(title, q)))
    ).flat()
    const known = new Set(files.map((f) => f.toLowerCase()))
    const fresh = extras.filter((f) => !known.has(f.toLowerCase()))
    if (fresh.length) {
      const more = await resolveAll(fresh, title, 10)
      candidates = [...candidates, ...more]
      files = [...files, ...fresh]
    }
  }

  const skeletonCandidates = [...candidates]
    .filter((c) => c.skeletonScore > 0)
    .sort((a, b) => b.skeletonScore - a.skeletonScore)
  const realisticCandidates = [...candidates]
    .filter((c) => c.realisticScore > 0)
    .sort((a, b) => b.realisticScore - a.realisticScore)

  const photos: { skeleton?: DinoPhoto; realistic?: DinoPhoto } = {}
  const skeleton = pickBest(candidates, (c) => c.skeletonScore)
  const realistic = pickBest(candidates, (c) => c.realisticScore)
  // Avoid using the same file for both slots when possible.
  if (skeleton) photos.skeleton = skeleton
  if (realistic) {
    if (!skeleton || realistic.image !== skeleton.image) photos.realistic = realistic
    else {
      const alt = pickBest(
        candidates.filter((c) => c.thumb !== skeleton.image),
        (c) => c.realisticScore,
      )
      if (alt) photos.realistic = alt
    }
  }

  process.stdout.write(
    JSON.stringify(
      {
        title,
        photos,
        skeletonCandidates: skeletonCandidates.slice(0, 4),
        realisticCandidates: realisticCandidates.slice(0, 4),
        note:
          Object.keys(photos).length === 0
            ? 'No acceptable licensed photos found — scaffold will use photos: {}.'
            : 'photos was auto-selected (best CC0/PD/CC BY/CC BY-SA candidate per category).',
      },
      null,
      2,
    ) + '\n',
  )
}

main().catch((err) => {
  process.stdout.write(JSON.stringify({ error: String(err) }) + '\n')
  process.exit(1)
})
