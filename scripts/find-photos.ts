/**
 * Find candidate reference images for a species on Wikimedia Commons.
 *
 *   npx tsx scripts/find-photos.ts "<Wikipedia page title>"
 *
 * Prints ranked skeleton + life-restoration candidates (with resolved 960px
 * thumbnail URL, license, and Commons source page) as JSON. The agent picks
 * the best one of each and re-confirms the license before writing files.
 *
 * All fetching happens here (deterministic, not agent tokens): one media-list
 * call + a bounded number of imageinfo lookups.
 */
const UA =
  'DinoVerse add-dino bot (https://github.com/karthick-shanmugam0689/dino-world-next)'

const SKELETON = ['skeleton', 'mount', 'holotype', 'cast', 'skelett', 'specimen', 'fossil']
const RESTORATION = [
  'reconstruction', 'restoration', '_life_', 'life_restoration', 'profile',
  'mmartyniuk', 'steveoc', 'durbed', 'knight', 'paleoart', '_bw', '_nt.', '_by_',
  'dmitry', 'bogdanov', '_td.', '_db.',
]
const EXCLUDE = [
  'scale', 'size_comparison', 'phylogeny', 'growth', 'census', 'trackway', 'tooth',
  'teeth', 'brain', 'endocast', 'lesion', '.svg', 'spinal', 'peptide', 'map',
  'distribution', 'footprint', 'track', 'integument', 'pelvis', 'diagram', '.gif',
  'location', 'stratigraph',
]

type Candidate = { file: string; thumb: string; license: string; source: string }

async function getJSON(url: string) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return res.json()
}

function classify(file: string): 'skeleton' | 'restoration' | null {
  const low = file.toLowerCase()
  if (EXCLUDE.some((k) => low.includes(k))) return null
  if (RESTORATION.some((k) => low.includes(k))) return 'restoration'
  if (SKELETON.some((k) => low.includes(k))) return 'skeleton'
  return null
}

/** Resolve a "File:Foo.jpg" title to a 960px thumb URL + license via the Commons API. */
async function resolve(fileTitle: string): Promise<Candidate | null> {
  const api =
    'https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo' +
    '&iiprop=url|extmetadata&iiurlwidth=960&format=json&titles=' +
    encodeURIComponent(fileTitle)
  try {
    const d = (await getJSON(api)) as {
      query?: { pages?: Record<string, { imageinfo?: Array<{ thumburl?: string; url?: string; extmetadata?: Record<string, { value?: string }> }> }> }
    }
    const pages = d.query?.pages ?? {}
    for (const p of Object.values(pages)) {
      const info = p.imageinfo?.[0]
      if (!info) continue
      return {
        file: fileTitle.replace(/^File:/, ''),
        thumb: info.thumburl ?? info.url ?? '',
        license: info.extmetadata?.LicenseShortName?.value ?? 'Unknown',
        source: `https://commons.wikimedia.org/wiki/${encodeURIComponent(fileTitle.replace(/ /g, '_'))}`,
      }
    }
  } catch {
    /* skip unresolvable files */
  }
  return null
}

async function main() {
  const title = process.argv[2]
  if (!title || !title.trim()) {
    process.stdout.write(
      JSON.stringify({ error: 'Usage: npx tsx scripts/find-photos.ts "<Wikipedia title>"' }) + '\n',
    )
    process.exit(3)
  }

  const media = (await getJSON(
    `https://en.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent(title)}`,
  )) as { items?: Array<{ type?: string; title?: string }> }

  const skeletonFiles: string[] = []
  const restorationFiles: string[] = []
  for (const it of media.items ?? []) {
    if (it.type !== 'image' || !it.title) continue
    const cls = classify(it.title)
    if (cls === 'skeleton') skeletonFiles.push(it.title)
    else if (cls === 'restoration') restorationFiles.push(it.title)
  }

  // resolve at most 4 of each to bound the number of API calls
  const resolveAll = async (files: string[]) =>
    (await Promise.all(files.slice(0, 4).map(resolve))).filter((c): c is Candidate => !!c)

  const [skeletonCandidates, realisticCandidates] = await Promise.all([
    resolveAll(skeletonFiles),
    resolveAll(restorationFiles),
  ])

  process.stdout.write(
    JSON.stringify(
      {
        title,
        skeletonCandidates,
        realisticCandidates,
        note: 'Pick the best ONE of each (a clear side-profile reads best). Re-verify the license before writing files; only CC0 / public domain / CC BY / CC BY-SA are allowed.',
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
