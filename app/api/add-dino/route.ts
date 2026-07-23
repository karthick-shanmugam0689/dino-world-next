import { NextResponse } from 'next/server'
import { track } from '@vercel/analytics/server'
import { addDinoRequestSchema } from '../../../lib/add-dino-schema'
import { dinoPath, findExistingDino } from '../../../lib/find-existing-dino'
import { checkAddDinoQuota, dispatchAddDinoWorkflow } from '../../../lib/github'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsed = addDinoRequestSchema.safeParse(body)
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? 'Invalid request'
    await track('Add Dino Rejected', { reason: 'invalid_input', message }, { request })
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const input = parsed.data.dinoName
  const existing = findExistingDino(input)
  if (existing) {
    await track(
      'Add Dino Duplicate',
      { input, existingId: existing.id, existingName: existing.name },
      { request },
    )
    return NextResponse.json({
      phase: 'done',
      outcome: 'duplicate',
      message: `Already in the collection — ${existing.name} is right here.`,
      dinoUrl: dinoPath(existing.id),
      dinoName: existing.name,
    })
  }

  const quota = await checkAddDinoQuota()
  if (!quota.ok) {
    await track(
      'Add Dino Rejected',
      { reason: 'quota', input, message: quota.message },
      { request },
    )
    return NextResponse.json({ error: quota.message }, { status: quota.status ?? 429 })
  }

  const requestId = Math.random().toString(36).slice(2, 10)

  try {
    await dispatchAddDinoWorkflow(input, requestId)
  } catch (err) {
    await track('Add Dino Rejected', { reason: 'dispatch_failed', input }, { request })
    return NextResponse.json({ error: String(err) }, { status: 502 })
  }

  await track('Add Dino Submitted', { input, requestId }, { request })
  return NextResponse.json({ requestId })
}
