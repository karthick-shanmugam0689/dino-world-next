'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { searchAll } from '../data/helpers'
import { DinoIcon } from './DinoIcon'

function SearchGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.2" y2="16.2" />
    </svg>
  )
}

function CloseGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  )
}

function PlusGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

export function Header() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const { dinos, families, periods } = searchAll(query)
  const hasResults = dinos.length > 0 || families.length > 0 || periods.length > 0

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false)
        setMobileSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const go = (path: string) => {
    router.push(path)
    setQuery('')
    setOpen(false)
    setMobileSearchOpen(false)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (families.length > 0 && dinos.length === 0) go(`/family/${families[0].id}`)
    else if (dinos.length > 0) go(`/dino/${dinos[0].id}`)
    else if (periods.length > 0) go(`/period/${periods[0].id}`)
  }

  const closeMobileSearch = () => {
    setMobileSearchOpen(false)
    setQuery('')
  }

  return (
    <header className={`site-header${mobileSearchOpen ? ' mobile-search-active' : ''}`}>
      <Link href="/" className="logo">
        <span className="logo-mark">
          <DinoIcon kind="sauropod" title="DinoVerse" />
        </span>
        Dino<em>Verse</em>
      </Link>

      <div className="header-nav">
        <Link href="/dinos" className={`nav-link${pathname === '/dinos' ? ' active' : ''}`}>
          A–Z
        </Link>
        <Link
          href="/add-dino"
          className={`nav-link nav-link-icon${pathname === '/add-dino' ? ' active' : ''}`}
          aria-label="Add a dinosaur"
        >
          <PlusGlyph />
          <span className="nav-label">Add dino</span>
        </Link>
      </div>

      <div className="search-box" ref={boxRef}>
        {mobileSearchOpen && (
          <button type="button" className="search-close-btn" aria-label="Close search" onClick={closeMobileSearch}>
            <CloseGlyph />
          </button>
        )}
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
            autoFocus={mobileSearchOpen}
          />
        </form>

        {(open || mobileSearchOpen) && query.trim() && (
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

      <button
        type="button"
        className="search-toggle-btn"
        aria-label="Search"
        onClick={() => setMobileSearchOpen(true)}
      >
        <SearchGlyph />
      </button>
    </header>
  )
}
