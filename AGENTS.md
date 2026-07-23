<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Data boundaries

- Server Components / route pages own catalog data (`data/dinos`, `data/helpers`).
- `'use client'` components must not import `data/dinos` or `data/helpers`.
- Header search uses the generated slim `data/search-index.ts` only.
- After adding/removing a species folder, run `npx tsx scripts/generate-dino-index.ts`.
