'use client'

import { useEffect, useRef, useState } from 'react'

type Status =
  | { phase: 'idle' }
  | { phase: 'searching' | 'running'; stepName: string; runUrl?: string }
  | { phase: 'done'; outcome: string; message: string; prUrl?: string | null; runUrl?: string }
  | { phase: 'error'; message: string }

const SECRET_KEY = 'dinoverse-admin-secret'

export default function AddDinoAdminPage() {
  const [secret, setSecret] = useState('')
  const [dinoName, setDinoName] = useState('')
  const [status, setStatus] = useState<Status>({ phase: 'idle' })
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const saved = sessionStorage.getItem(SECRET_KEY)
    if (saved) setSecret(saved)
    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
    }
  }, [])

  const startPolling = (requestId: string, adminSecret: string) => {
    if (pollRef.current) clearInterval(pollRef.current)
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/add-dino/status?requestId=${requestId}`, {
          headers: { 'x-admin-secret': adminSecret },
        })
        const data = await res.json()
        if (!res.ok) {
          setStatus({ phase: 'error', message: data.error ?? 'Something went wrong.' })
          if (pollRef.current) clearInterval(pollRef.current)
          return
        }
        setStatus(data)
        if (data.phase === 'done' && pollRef.current) clearInterval(pollRef.current)
      } catch {
        // transient network hiccup — keep polling, don't give up on one failed check
      }
    }, 3000)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!secret.trim() || !dinoName.trim()) return
    sessionStorage.setItem(SECRET_KEY, secret)
    setStatus({ phase: 'searching', stepName: 'Sending the request…' })

    try {
      const res = await fetch('/api/add-dino', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
        body: JSON.stringify({ dinoName: dinoName.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus({ phase: 'error', message: data.error ?? 'Failed to trigger the workflow.' })
        return
      }
      startPolling(data.requestId, secret)
    } catch (err) {
      setStatus({ phase: 'error', message: String(err) })
    }
  }

  const outcomeColor =
    status.phase === 'done'
      ? status.outcome === 'success'
        ? '#a4d09c'
        : '#e8927e'
      : 'var(--text-dim)'

  return (
    <main className="page" style={{ maxWidth: '38rem' }}>
      <h1>Add a dinosaur</h1>
      <p className="family-desc">
        Admin-only. Submits a species to the add-dino pipeline, which researches it,
        writes its data folder, verifies the build, and opens a PR — never deploys
        or merges automatically.
      </p>

      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1.5rem' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <span className="stat-label">Admin secret</span>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="admin-input"
            autoComplete="off"
          />
        </label>
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
              {status.prUrl && (
                <p style={{ marginTop: '0.6rem' }}>
                  <a href={status.prUrl} target="_blank" rel="noopener noreferrer" className="family-link">
                    View the PR →
                  </a>
                </p>
              )}
              {status.runUrl && (
                <p style={{ marginTop: '0.4rem' }}>
                  <a href={status.runUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                    View the Actions run
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
