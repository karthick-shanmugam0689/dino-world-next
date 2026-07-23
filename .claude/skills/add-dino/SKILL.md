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
| Classify + fill | **You (model)** | Local: edit scaffold TS. CI: write `add-dino-fill.json` only |
| Apply fill (CI) | `scripts/apply-dino-fill.ts` | Merges JSON onto scaffold; keeps photos |
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

Scripts already ran (`check-dino` → `find-photos` → `scaffold-dino`). Your CI job
is **only** to write `add-dino-fill.json` in the repo root (one Write). A later
script applies it onto the scaffold and writes `add-dino-result.json`.

Do **not** edit TypeScript, read the skill for exploration, or run tools other
than Write. Prefer the Wikipedia extract provided in the prompt.

### `add-dino-fill.json` shapes

Reject:
```json
{"legitimate": false, "reason": "<why>"}
```

Accept: see the workflow prompt schema (`legitimate: true` + content + `model`).
Keep `photos` alone — the apply script preserves scaffold photos.

## Stop conditions

Hard-stop (no PR): duplicate, Wikipedia not found, not confident it is legitimate,
body plan needs a new kind, or build still broken after 2 local fix attempts.
