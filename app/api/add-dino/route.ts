import { NextResponse } from 'next/server'
import { addDinoRequestSchema } from '../../../lib/add-dino-schema'
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
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const quota = await checkAddDinoQuota()
  if (!quota.ok) {
    return NextResponse.json({ error: quota.message }, { status: quota.status ?? 429 })
  }

  const requestId = Math.random().toString(36).slice(2, 10)

  try {
    await dispatchAddDinoWorkflow(parsed.data.dinoName, requestId)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 502 })
  }

  return NextResponse.json({ requestId })
}
