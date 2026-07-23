# Procedural dino scene

Public API: `createDinoScene(canvas, config, colorHex)` from `createDinoScene.ts`
(also re-exported by `dinoScene.ts` and `index.ts`).

## Policy

- Do **not** invent a new `model.kind`. The five kinds are fixed:
  `theropod | sauropod | quadruped | marine | pterosaur`.
- New looks = tune an existing kind + existing `features.*` flags.
- A **new** feature flag requires a new module under `features/` (or an extension
  of an existing feature module) — not an inline branch in `createDinoScene.ts`.

## Layout

- `createDinoScene.ts` — renderer, lights, animation loop, dispose
- `builders/` — limbs, neck/head, tail, wings
- `features/` — armor, plates/sail/spikes, head ornaments
- `human.ts`, `materials.ts`, `math.ts` — shared helpers
