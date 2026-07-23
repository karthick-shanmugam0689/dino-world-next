'use client'

import { track } from '@vercel/analytics'
import { useEffect, useRef, useState } from 'react'

type Status =
  | { phase: 'idle' }
  | { phase: 'searching' | 'running'; stepName: string }
  | {
      phase: 'done'
      outcome: string
      message: string
      prUrl?: string | null
      dinoUrl?: string | null
      dinoName?: string | null
    }
  | { phase: 'error'; message: string }

export default function AddDinoPage() {
  const [dinoName, setDinoName] = useState('')
  const [status, setStatus] = useState<Status>({ phase: 'idle' })
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
    }
  }, [])

  const startPolling = (requestId: string, input: string) => {
    if (pollRef.current) clearInterval(pollRef.current)
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/add-dino/status?requestId=${requestId}`)
        const data = await res.json()
        if (!res.ok) {
          setStatus({ phase: 'error', message: data.error ?? 'Something went wrong.' })
          if (pollRef.current) clearInterval(pollRef.current)
          return
        }
        setStatus(data)
        if (data.phase === 'done' && pollRef.current) {
          clearInterval(pollRef.current)
          // Workflow terminal outcomes (instant duplicates are tracked server-side).
          track('Add Dino Outcome', {
            outcome: String(data.outcome ?? 'unknown'),
            input,
            existingId: data.dinoUrl ? String(data.dinoUrl).replace(/^\/dino\//, '') : undefined,
          })
        }
      } catch {
        // transient network hiccup — keep polling, don't give up on one failed check
      }
    }, 3000)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!dinoName.trim()) return
    setStatus({ phase: 'searching', stepName: 'Sending the request…' })

    try {
      const res = await fetch('/api/add-dino', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dinoName: dinoName.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus({ phase: 'error', message: data.error ?? 'Failed to trigger the pipeline.' })
        return
      }
      // Instant duplicate — no workflow run needed (server already tracked it).
      if (data.phase === 'done') {
        setStatus(data)
        return
      }
      startPolling(data.requestId, dinoName.trim())
    } catch (err) {
      setStatus({ phase: 'error', message: String(err) })
    }
  }

  const outcomeColor =
    status.phase === 'done'
      ? status.outcome === 'success'
        ? '#a4d09c'
        : status.outcome === 'duplicate'
          ? 'var(--text)'
          : '#e8927e'
      : 'var(--text-dim)'

  return (
    <main className="page" style={{ maxWidth: '38rem' }}>
      <h1>Add a dinosaur</h1>
      <p className="family-desc">
        Every entry in this field guide started the same way: someone typed a name into a
        box exactly like this one. Do it below, and a tireless research assistant will dig
        through the fossil record, cross-examine its own conclusions, and — only if the
        animal turns out to be genuine — quietly draft the paperwork for review. It won&apos;t
        invent a genus to please you, it won&apos;t add anything already in the collection
        twice, and nothing it writes ever goes live without a human eye on it first.
      </p>

      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1.5rem' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <span className="stat-label">Dinosaur name</span>
          <input
            type="text"
            value={dinoName}
            onChange={(e) => setDinoName(e.target.value)}
            placeholder="e.g. Compsognathus"
            className="admin-input"
          />
        </label>
        <button
          type="submit"
          disabled={status.phase === 'searching' || status.phase === 'running'}
          className="admin-submit"
        >
          {status.phase === 'searching' || status.phase === 'running' ? 'Working…' : 'Add it'}
        </button>
      </form>

      {status.phase !== 'idle' && (
        <div className="fact-box" style={{ marginTop: '1.5rem' }}>
          {(status.phase === 'searching' || status.phase === 'running') && (
            <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="hint-dot" /> {status.stepName}
            </p>
          )}
          {status.phase === 'done' && (
            <div>
              <p style={{ margin: 0, color: outcomeColor, fontWeight: 600 }}>{status.message}</p>
              {status.dinoUrl && (
                <p style={{ marginTop: '0.6rem' }}>
                  <a href={status.dinoUrl} className="family-link">
                    View {status.dinoName ?? 'this dinosaur'} →
                  </a>
                </p>
              )}
              {status.prUrl && (
                <p style={{ marginTop: '0.6rem' }}>
                  <a href={status.prUrl} target="_blank" rel="noopener noreferrer" className="family-link">
                    View the PR →
                  </a>
                </p>
              )}
            </div>
          )}
          {status.phase === 'error' && (
            <p style={{ margin: 0, color: '#e8927e' }}>{status.message}</p>
          )}
        </div>
      )}
    </main>
  )
}
