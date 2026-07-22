import { NextResponse } from 'next/server'
import { dispatchAddDinoWorkflow } from '../../../lib/github'

export async function POST(request: Request) {
  const secret = request.headers.get('x-admin-secret')
  if (!secret || secret !== process.env.ADMIN_TRIGGER_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { dinoName } = (await request.json()) as { dinoName?: string }
  if (!dinoName || !dinoName.trim()) {
    return NextResponse.json({ error: 'dinoName is required' }, { status: 400 })
  }

  const requestId = Math.random().toString(36).slice(2, 10)

  try {
    await dispatchAddDinoWorkflow(dinoName.trim(), requestId)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 502 })
  }

  return NextResponse.json({ requestId })
}
