---
name: add-dino
description: Add a new dinosaur (or Mesozoic reptile) to the DinoVerse field guide — research it, write its data folder, regenerate the index, verify, and open a PR. Use when asked to "add a dino", "add <species> to the site", or similar. Refuses duplicates and stops on anything uncertain.
---

# Add one dinosaur to DinoVerse

You are adding **one** species named by the user. Work in a single pass and
follow these steps in order. The whole job should stay well under ~25 tool
calls — if you find yourself exceeding that, STOP and report where you are.

Never fabricate facts, stats, dates, or image URLs. If you can't find real
information within the caps below, stop and say what's missing.

## Step 1 — Duplicate & legitimacy pre-flight (deterministic)

Run:

```bash
npx tsx scripts/check-dino.ts "<name>"
```

- `status: "duplicate"` (exit 2) → **STOP.** Report the existing entry. Do nothing else.
- `status: "new"` → read the `wikipedia` signal. Decide, using that signal **and
  your own knowledge**, whether this is a genuine dinosaur / pterosaur / marine
  reptile of the Mesozoic. If `wikipedia.exists` is false, or the description
  doesn't support a real prehistoric reptile, or you are otherwise **not
  confident it is legitimate → STOP** and say so. Do not guess.

Note the `candidateId` and the `existingFamilies` list for later steps.

## Step 2 — Research (HARD CAP: 2 web searches, 3 fetches)

Gather only what the data files need: a 2–3 sentence description, 2–3 field-note
facts, diet, period + date range, location, and approximate length / height /
weight / top speed (wingspan too, if it's a pterosaur). Prefer the Wikipedia
extract you already have. If that's enough, don't spend the searches.

If the caps run out before you have the essentials, STOP and report the gap.

## Step 3 — Classify (no tools, just decisions)

Decide, and briefly state your reasoning for each:

1. **Family** — reuse an id from `existingFamilies` if it fits; otherwise define
   a new `Family` in `data/families.ts` (id = lowercase family name, e.g.
   `compsognathidae`). Keep the description/traits style consistent with
   neighbours. **The `familyId` you write into the dino's `index.ts` must be
   the exact same string as an id already in `existingFamilies`, or the id of
   the family you just added** — a mismatch compiles fine but crashes the
   page at runtime (`generate-dino-index.ts` now checks this and will fail
   loudly if it doesn't match, so a slip won't reach a PR, but get it right
   the first time).
2. **Clade** — a true dinosaur leaves `clade` unset. A marine reptile →
   `clade: 'marine-reptile'`; a pterosaur → `clade: 'pterosaur'` (+ `wingSpanM`).
3. **Body-plan `kind`** — pick from the FIVE existing kinds only:
   `theropod | sauropod | quadruped | marine | pterosaur`. Choose the closest
   existing species and base your `model` numbers on theirs, scaled to real size.
   **If none of the five fit, STOP and ask** — do not invent a new kind or edit
   `three/dinoScene.ts`.
4. **Silhouette** — reuse the closest existing `SilhouetteKey` (see
   `data/types.ts`). Only hand-draw a new SVG in `components/DinoIcon.tsx` if
   nothing is even close; keep it in the same 120×80 right-facing viewBox style.

## Step 4 — Reference photos

```bash
npx tsx scripts/find-photos.ts "<Wikipedia title>"
```

Pick the best ONE skeleton and ONE realistic candidate (a clear side profile
reads best). Only accept CC0 / public domain / CC BY / CC BY-SA licenses. If a
category has no acceptable candidate, omit it — the UI hides missing tabs.

## Step 5 — Write the files

Create `data/dinos/<id>/model.ts` and `data/dinos/<id>/index.ts`, matching the
exact shape of an existing folder (open `data/dinos/tyrannosaurus/` as the
template). `model.ts` exports `model: DinoModelConfig`; `index.ts` exports
`photos: DinoPhotoSet` and `dino: Dino` (spreading in `model`).

If Step 3 decided a new family is needed, **don't hand-edit `data/families.ts`**
— keeping it and the dino's own `familyId` in sync by hand has been an
unreliable step in practice (a mismatch compiles fine but crashes the page at
runtime). Instead write a temporary `add-dino-result.json` with just the
`newFamily` field and run the script that applies it:

```json
{"newFamily": {"id": "<same id as familyId>", "name": "<Family name>", "description": "<1-3 sentences, matching neighbours' prose style>", "period": "<e.g. Late Cretaceous>", "traits": ["<short phrase>", "... (about 4)"]}}
```

```bash
npx tsx scripts/apply-new-family.ts
rm add-dino-result.json
```

Then regenerate the barrel — **never edit `data/dinos/index.ts` by hand**:

```bash
npx tsx scripts/generate-dino-index.ts
```

## Step 6 — Verify (CAP: 2 fix attempts)

```bash
npx tsc --noEmit -p tsconfig.json
npm run build
```

If either fails, you may fix and retry at most twice. If still failing, STOP,
leave the branch unpushed, and report the exact error — **never open a PR with
broken code.**

## Step 7 — Open a PR (never push to main, never deploy)

```bash
git checkout -b add-dino/<id>
git add -A
git commit -m "Add <Name> to the field guide"
git push -u origin add-dino/<id>
gh pr create --title "Add <Name>" --body "<what you added, sources + licenses, and any decisions/assumptions worth a human check>"
```

Report the PR URL. Do not merge it and do not run any deploy commands.

## Stop-conditions summary

Hard-stop (report, don't PR) on any of: duplicate, not-confident-legitimate,
missing essential data within caps, a body plan none of the five kinds fit, or
build still broken after 2 fix attempts.
