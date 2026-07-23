---
name: add-dino
description: Add a new dinosaur (or Mesozoic reptile) to the DinoVerse field guide. Use when asked to "add a dino", "add <species> to the site", or similar. Refuses duplicates and unverifiable names.
---

# Add one dinosaur to DinoVerse

Add **one** species. Prefer deterministic scripts for pre-flight; use the model
only for classification + content. Never fabricate facts, stats, dates, or
image URLs.

## Who does what

| Step | Owner | Notes |
|------|--------|--------|
| Duplicate check | `scripts/check-dino.ts` | Hard-stop if already in roster |
| Wikipedia exists? | `scripts/check-dino.ts` | Hard-stop if no page (gibberish never reaches the model) |
| Photos | `scripts/find-photos.ts` | Auto-selects licensed skeleton/realistic into `photos` |
| File scaffold | `scripts/scaffold-dino.ts` | Creates `data/dinos/<id>/` with photos + TODO placeholders |
| Classify + fill | **You (model)** | Family/clade/kind/silhouette + replace TODOs; retune `model.ts` |
| Index + build + PR | CI / you locally | `generate-dino-index.ts`, `tsc`, `build`, PR |

## Local workflow

```bash
npx tsx scripts/check-dino.ts "<name>"          # must print status:new
npx tsx scripts/find-photos.ts "<Wikipedia title from check>"
CHECK_JSON='...' PHOTOS_JSON='...' npx tsx scripts/scaffold-dino.ts
# then edit data/dinos/<id>/{index.ts,model.ts} — replace every TODO_*
npx tsx scripts/generate-dino-index.ts
npx tsc --noEmit -p tsconfig.json && npm run build
# branch + PR (never push main)
```

`check-dino` exit codes: `0` new · `2` duplicate · `4` not_found · `3` error.

## CI workflow (site “Add dino”)

Scripts already ran. Folder `data/dinos/<id>/` already exists with photos filled
and `TODO_*` placeholders. Your job:

1. Read `.claude/skills/add-dino/SKILL.md` (this file) once for conventions.
2. Read the scaffolded `data/dinos/<id>/index.ts` and `model.ts`.
3. Using the Wikipedia extract in the check JSON (and your knowledge), **edit**
   those files — do not recreate them from scratch; **keep `photos` as-is**.
4. Write `add-dino-result.json` (see below).
5. Do **not** run scripts, build, commit, or open a PR.

### Fill checklist (edit scaffold)

Replace every `TODO_*` and fix defaults that are wrong:

- `meaning`, `description` (2–3 sentences), `facts` (2–3 real facts)
- `diet`, `location`, numeric stats (`lengthM`, `heightM`, `weightKg`, `speedKmh`; `wingSpanM` if pterosaur)
- `periodId`: `triassic` | `jurassic` | `cretaceous`
- `periodLabel`: display string, e.g. `"Late Cretaceous · 99–93 Mya"`
- `familyId`: must be an id from `existingFamilies` in the check JSON, **or**
  add one new family to `data/families.ts` (`as const` array) and use that id
- `clade`: omit for true dinosaurs; `'marine-reptile'` or `'pterosaur'` otherwise
- `silhouette`: existing `SilhouetteKey` from `data/types.ts` (new SVG only if nothing fits)
- `color`: hex that fits the animal
- `model.ts`: one of five kinds only — `theropod | sauropod | quadruped | marine | pterosaur`.
  Copy numbers from the closest existing species, scaled to real size. Use existing
  `features.*` flags only. **Do not** invent a new kind or edit `three/`.

If you are not confident it is a genuine Mesozoic dinosaur / pterosaur / marine
reptile, do not leave TODOs — write only:

```json
{"legitimate": false, "reason": "<why>"}
```

### Success result file

```json
{
  "legitimate": true,
  "id": "<id>",
  "name": "<display name>",
  "newFamily": true,
  "familyId": "<id>",
  "reason": "<1-2 sentences for the human reviewer, including photo note>"
}
```

## Stop conditions

Hard-stop (no PR): duplicate, Wikipedia not found, not confident it is legitimate,
body plan needs a new kind, or build still broken after 2 local fix attempts.
