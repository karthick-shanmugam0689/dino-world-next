'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { searchAll } from '../data/dinosaurs'
import { DinoIcon } from './DinoIcon'

export function Header() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const { dinos, families, periods } = searchAll(query)
  const hasResults = dinos.length > 0 || families.length > 0 || periods.length > 0

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const go = (path: string) => {
    router.push(path)
    setQuery('')
    setOpen(false)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (families.length > 0 && dinos.length === 0) go(`/family/${families[0].id}`)
    else if (dinos.length > 0) go(`/dino/${dinos[0].id}`)
    else if (periods.length > 0) go(`/period/${periods[0].id}`)
  }

  return (
    <header className="site-header">
      <Link href="/" className="logo">
        <span className="logo-mark">
          <DinoIcon kind="sauropod" title="DinoVerse" />
        </span>
        Dino<em>Verse</em>
      </Link>

      <Link href="/dinos" className={`nav-link${pathname === '/dinos' ? ' active' : ''}`}>
        A–Z
      </Link>

      <div className="search-box" ref={boxRef}>
        <form onSubmit={onSubmit}>
          <input
            type="search"
            placeholder="Search dinosaurs or families…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            aria-label="Search dinosaurs or families"
          />
        </form>

        {open && query.trim() && (
          <div className="search-results">
            {!hasResults && <div className="search-empty">No matches — extinct or misspelled?</div>}
            {periods.length > 0 && (
              <>
                <div className="search-group">Periods</div>
                {periods.map((p) => (
                  <button key={p.id} className="search-item" onClick={() => go(`/period/${p.id}`)}>
                    <span className="search-item-badge" style={{ color: p.color }}>
                      period
                    </span>
                    {p.name} · {p.range}
                  </button>
                ))}
              </>
            )}
            {families.length > 0 && (
              <>
                <div className="search-group">Families</div>
                {families.map((f) => (
                  <button key={f.id} className="search-item" onClick={() => go(`/family/${f.id}`)}>
                    <span className="search-item-badge">family</span>
                    {f.name}
                  </button>
                ))}
              </>
            )}
            {dinos.length > 0 && (
              <>
                <div className="search-group">Dinosaurs</div>
                {dinos.map((d) => (
                  <button key={d.id} className="search-item" onClick={() => go(`/dino/${d.id}`)}>
                    <span className="search-item-icon" style={{ color: d.color }}>
                      <DinoIcon kind={d.silhouette} />
                    </span>
                    {d.name}
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
