import { NextResponse } from 'next/server'
import { findRunByRequestId, findPrUrlInJobLog, getRunJob } from '../../../../lib/github'

const STEP = {
  duplicate: "❌ Already in the collection",
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
    return NextResponse.json({
      phase: 'done',
      outcome: 'duplicate',
      message: 'Failed — the dino is already there.',
    })
  }

  if (stepConclusion(job, STEP.unverifiable) === 'success') {
    return NextResponse.json({
      phase: 'done',
      outcome: 'unverifiable',
      message: "Failed — this dino doesn't exist in my brain.",
    })
  }

  if (stepConclusion(job, STEP.pr) === 'success') {
    const prUrl = job ? await findPrUrlInJobLog(job.id) : null
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
