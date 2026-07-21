'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { Dino } from '../data/dinosaurs'
import { dinoPhotos } from '../data/dinoPhotos'
import { createDinoScene } from '../three/dinoScene'
import { DinoIcon } from './DinoIcon'

type View = '3d' | 'skeleton' | 'realistic'

const LABELS: Record<View, string> = {
  '3d': '3D model',
  skeleton: 'Skeletal',
  realistic: 'Realistic',
}

export function DinoCanvas({ dino }: { dino: Dino }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [webglFailed, setWebglFailed] = useState(false)
  const photos = dinoPhotos[dino.id]
  const [view, setView] = useState<View>('3d')
  const [failed, setFailed] = useState<Record<string, boolean>>({})
  // Tabs are mounted the first time they're visited, then stay mounted so
  // switching back is instant and the slide transition never re-fetches.
  const [visited, setVisited] = useState<Partial<Record<View, true>>>({ '3d': true })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    // Probe for WebGL first so we never invoke three.js (and its internal
    // console.error) on devices without a GL context — go straight to the 2D fallback.
    const probe = document.createElement('canvas')
    const gl = probe.getContext('webgl2') || probe.getContext('webgl')
    if (!gl) {
      setWebglFailed(true)
      return
    }
    try {
      const handle = createDinoScene(canvas, dino.model, dino.color)
      return () => handle.dispose()
    } catch (err) {
      console.warn('WebGL unavailable, using flat fallback', err)
      setWebglFailed(true)
    }
  }, [dino])

  // reset when navigating between dinos
  useEffect(() => {
    setView('3d')
    setFailed({})
    setVisited({ '3d': true })
  }, [dino.id])

  // which reference tabs are actually available (image present and not broken)
  const tabs: View[] = ['3d']
  if (photos?.skeleton && !failed.skeleton) tabs.push('skeleton')
  if (photos?.realistic && !failed.realistic) tabs.push('realistic')

  const activeView: View = tabs.includes(view) ? view : '3d'
  const activeIndex = tabs.indexOf(activeView)

  const selectView = (v: View) => {
    setVisited((prev) => (prev[v] ? prev : { ...prev, [v]: true }))
    setView(v)
  }

  // Drag-to-swipe: pointer events unify mouse/touch/pen. A press that moves
  // far enough horizontally switches views; a short tap/click still passes
  // through untouched (native <button> clicks aren't affected by this at all).
  const DRAG_THRESHOLD = 60
  const dragStateRef = useRef<{ pointerId: number; startX: number } | null>(null)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const onStagePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (tabs.length <= 1) return
    if (e.pointerType === 'mouse' && e.button !== 0) return
    dragStateRef.current = { pointerId: e.pointerId, startX: e.clientX }
    setIsDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current
    if (!drag || drag.pointerId !== e.pointerId) return
    let delta = e.clientX - drag.startX
    // rubber-band resistance past the first/last slide instead of a hard stop
    if ((activeIndex === 0 && delta > 0) || (activeIndex === tabs.length - 1 && delta < 0)) {
      delta *= 0.35
    }
    setDragOffset(delta)
  }

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current
    if (!drag || drag.pointerId !== e.pointerId) return
    const delta = e.clientX - drag.startX
    dragStateRef.current = null
    setIsDragging(false)
    setDragOffset(0)
    if (delta <= -DRAG_THRESHOLD && activeIndex < tabs.length - 1) {
      selectView(tabs[activeIndex + 1])
    } else if (delta >= DRAG_THRESHOLD && activeIndex > 0) {
      selectView(tabs[activeIndex - 1])
    }
  }

  return (
    <div className="dino-visual">
      {tabs.length > 1 && (
        <div className="stage-toggle" role="tablist" aria-label="View mode">
          {tabs.map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={activeView === v}
              className={`stage-toggle-btn${activeView === v ? ' active' : ''}`}
              onClick={() => selectView(v)}
            >
              {LABELS[v]}
            </button>
          ))}
        </div>
      )}

      <div
        className={`dino-stage${tabs.length > 1 ? ' draggable' : ''}${isDragging ? ' dragging' : ''}`}
        onPointerDown={onStagePointerDown}
        onPointerMove={onStagePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className="stage-track"
          style={{
            width: `${tabs.length * 100}%`,
            transform: `translateX(-${activeIndex * (100 / tabs.length)}%) translateX(${dragOffset}px)`,
            transition: isDragging ? 'none' : undefined,
          }}
        >
          {tabs.map((v) => (
            <div className="stage-slide" key={v} style={{ width: `${100 / tabs.length}%` }}>
              {v === '3d' ? (
                webglFailed ? (
                  <div className="dino-stage-fallback" style={{ color: dino.color }}>
                    <DinoIcon kind={dino.silhouette} title={dino.name} className="fallback-dino" />
                  </div>
                ) : (
                  <div className="stage-3d">
                    <canvas ref={canvasRef} />
                    <div className="stage-hint">
                      <span className="hint-dot" /> Move your mouse — it's watching you
                    </div>
                    <div className="stage-scale">Human shown for scale · 1.8 m</div>
                  </div>
                )
              ) : (
                visited[v] &&
                (() => {
                  const photo = v === 'skeleton' ? photos?.skeleton : photos?.realistic
                  if (!photo) return null
                  return (
                    <figure className="stage-photo">
                      <Image
                        src={photo.image}
                        alt={`${dino.name} — ${v === 'skeleton' ? 'fossil skeleton' : 'life reconstruction'}`}
                        fill
                        draggable={false}
                        sizes="(max-width: 900px) 100vw, 50vw"
                        style={{ objectFit: 'contain' }}
                        onError={() => setFailed((f) => ({ ...f, [v]: true }))}
                      />
                      <figcaption className="stage-photo-credit">
                        {v === 'skeleton' ? 'Fossil skeleton' : 'Life reconstruction'} ·{' '}
                        <a href={photo.source} target="_blank" rel="noopener noreferrer">
                          Wikimedia Commons
                        </a>{' '}
                        · {photo.license}
                      </figcaption>
                    </figure>
                  )
                })()
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
