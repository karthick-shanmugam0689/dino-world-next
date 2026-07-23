import { NextResponse } from 'next/server'
import { dinoPath, findExistingDino } from '../../../../lib/find-existing-dino'
import { findRunByRequestId, findPrByRequestId, getRunJob } from '../../../../lib/github'

/** run-name is `add-dino: <dino_name> [<request_id>]`. */
function dinoNameFromRunTitle(title: string | null | undefined): string | null {
  if (!title) return null
  const m = title.match(/^add-dino:\s*(.+)\s*\[[^\]]+\]\s*$/i)
  return m?.[1]?.trim() || null
}

const STEP = {
  duplicate: '❌ Already in the collection',
  noWiki: '❌ No Wikipedia page',
  unverifiable: "❌ Couldn't verify this one",
  build: '🔧 Running the numbers',
  pr: '📮 Filing the paperwork',
}

function stepConclusion(job: { steps: { name: string; conclusion: string | null }[] } | null, name: string) {
  return job?.steps.find((s) => s.name === name)?.conclusion ?? null
}

export async function GET(request: Request) {
  const requestId = new URL(request.url).searchParams.get('requestId')
  if (!requestId) {
    return NextResponse.json({ error: 'requestId is required' }, { status: 400 })
  }

  const run = await findRunByRequestId(requestId)
  if (!run) {
    return NextResponse.json({ phase: 'searching', stepName: 'Waking up the runner…' })
  }

  const job = await getRunJob(run.id)

  if (run.status !== 'completed') {
    const current = job?.steps.find((s) => s.status === 'in_progress')
    return NextResponse.json({
      phase: 'running',
      stepName: current?.name ?? 'Getting started…',
    })
  }

  if (stepConclusion(job, STEP.duplicate) === 'success') {
    const submitted = dinoNameFromRunTitle(run.name) ?? dinoNameFromRunTitle(run.display_title)
    const existing = submitted ? findExistingDino(submitted) : null
    return NextResponse.json({
      phase: 'done',
      outcome: 'duplicate',
      message: existing
        ? `Already in the collection — ${existing.name} is right here.`
        : 'Already in the collection.',
      dinoUrl: existing ? dinoPath(existing.id) : null,
      dinoName: existing?.name ?? null,
    })
  }

  if (
    stepConclusion(job, STEP.noWiki) === 'success' ||
    stepConclusion(job, STEP.unverifiable) === 'success'
  ) {
    return NextResponse.json({
      phase: 'done',
      outcome: 'unverifiable',
      message: "Failed — this dino doesn't exist in my brain.",
    })
  }

  if (stepConclusion(job, STEP.pr) === 'success') {
    const prUrl = await findPrByRequestId(requestId)
    return NextResponse.json({
      phase: 'done',
      outcome: 'success',
      message: 'Succeeded — Karthick is notified!',
      prUrl,
    })
  }

  return NextResponse.json({
    phase: 'done',
    outcome: 'failed',
    message: 'Failed — something broke on my end.',
  })
}
