import { useEffect, useMemo, useRef, useState } from 'react'
import { categoryColor, isUpcoming, type CsiEvent } from '../data/events'

// Interactive orbit: every event is a planet. Hover (or focus) shows a preview card, click scrolls to the full event below.
// All colours come from the site theme in styles.css (--color-primary, --color-secondary, and so on).
const W = 900, H = 700, CX = 450, CY = 350
const RING_R = [95, 170, 245, 320]
const RING_CAP = [2, 4, 6, 8]            // planets per ring, newest events fill the inner rings first
const SPEED = [0.12, 0.085, 0.06, 0.045]  // radians per second

type Node = { ev: CsiEvent; ring: number; base: number }

function layout(events: CsiEvent[]): Node[] {
  const sorted = [...events].sort((a, b) => b.date.localeCompare(a.date))
  const nodes: Node[] = []
  let i = 0
  for (let ring = 0; i < sorted.length; ring++) {
    const r = Math.min(ring, RING_R.length - 1)
    const cap = ring < RING_CAP.length ? RING_CAP[ring] : RING_CAP[RING_CAP.length - 1]
    const batch = sorted.slice(i, i + cap)
    batch.forEach((ev, j) => nodes.push({ ev, ring: r, base: (j / batch.length) * Math.PI * 2 + ring * 1.1 }))
    i += cap
  }
  return nodes
}

export default function EventOrbit({ events, active, onSelect }: { events: CsiEvent[]; active: string | null; onSelect: (id: string) => void }) {
  const nodes = useMemo(() => layout(events), [events])
  const [hover, setHover] = useState<string | null>(null)
  const [, force] = useState(0)
  const phase = useRef([0, 0, 0, 0])
  const paused = useRef(false)
  paused.current = hover !== null

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0, last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05); last = now
      if (!paused.current) { phase.current = phase.current.map((p, k) => p + dt * SPEED[k]); force((n) => n + 1) }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const pos = (n: Node) => {
    const a = n.base + phase.current[n.ring]
    return { x: CX + RING_R[n.ring] * Math.cos(a), y: CY + RING_R[n.ring] * Math.sin(a) }
  }
  const touch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
  const hovered = nodes.find((n) => n.ev.id === hover)
  const hp = hovered ? pos(hovered) : null

  return (
    <div className="relative mx-auto w-full max-w-5xl lg:ml-auto lg:mr-0 lg:max-w-4xl">
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="group" aria-label="Orbit of club events. Select a planet to jump to its details.">
        <defs>
          <radialGradient id="orbit-core">
            <stop offset="0" style={{ stopColor: 'color-mix(in srgb, var(--color-primary) 35%, white)' }} />
            <stop offset=".65" style={{ stopColor: 'var(--color-primary)' }} />
            <stop offset="1" style={{ stopColor: 'var(--color-secondary)' }} />
          </radialGradient>
        </defs>
        <g fill="none" style={{ stroke: 'var(--color-primary)' }}>
          {RING_R.map((r, k) => <circle key={r} cx={CX} cy={CY} r={r} strokeOpacity={k % 2 ? 0.25 : 0.4} strokeDasharray={k % 2 ? '4 8' : undefined} />)}
        </g>
        <circle cx={CX} cy={CY} r={86} style={{ fill: 'var(--color-primary)' }} fillOpacity=".07" />
        <circle cx={CX} cy={CY} r={50} fill="url(#orbit-core)" />
        <text x={CX} y={CY + 7} textAnchor="middle" fontSize="22" fontWeight="800" fill="white">CSI</text>
        {nodes.map((n) => {
          const { x, y } = pos(n)
          const color = categoryColor[n.ev.category]
          const r = 10 + (n.ring === 0 ? 4 : 0)
          const isHot = hover === n.ev.id || active === n.ev.id
          const right = x >= CX
          const soon = isUpcoming(n.ev)
          return (
            <g key={n.ev.id} role="button" tabIndex={0} aria-label={`${n.ev.title}, ${n.ev.dateLabel}. Go to details`} className="cursor-pointer outline-none"
              onMouseEnter={() => setHover(n.ev.id)} onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(n.ev.id)} onBlur={() => setHover(null)}
              onClick={() => { if (touch && hover !== n.ev.id) setHover(n.ev.id); else onSelect(n.ev.id) }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(n.ev.id) } }}>
              <circle cx={x} cy={y} r={r + 16} fill="transparent" />
              {isHot && <circle cx={x} cy={y} r={r + 8} fill="none" strokeWidth="2" strokeDasharray="3 4" style={{ stroke: color }} />}
              <circle cx={x} cy={y} r={isHot ? r + 2 : r} strokeWidth={soon ? 4 : 2} style={{ fill: soon ? 'var(--orbit-bg, var(--color-background))' : color, stroke: soon ? color : 'var(--color-card)' }} />
              <text x={right ? x + r + 10 : x - r - 10} y={y + 5} textAnchor={right ? 'start' : 'end'} fontSize="14" fontWeight={isHot ? 700 : 500}
                style={{ fill: '#3f6b57', paintOrder: 'stroke', stroke: 'var(--orbit-bg, var(--color-background))', strokeWidth: 4 }}>{n.ev.title}</text>
            </g>
          )
        })}
      </svg>
      {hovered && hp && (
        <div aria-hidden="true" className="pointer-events-none absolute z-20 w-[260px] rounded-2xl border border-border bg-card p-3 text-left shadow-soft sm:w-[290px]"
          style={{ left: `clamp(150px, ${(hp.x / W) * 100}%, calc(100% - 150px))`, top: `${(hp.y / H) * 100}%`, transform: `translate(-50%, ${hp.y > CY ? 'calc(-100% - 26px)' : '26px'})`, boxShadow: '0 14px 40px -12px rgb(20 48 43 / 0.35)' }}>
          <div className="relative h-24 overflow-hidden rounded-xl" style={{ background: 'linear-gradient(135deg, var(--color-primary), color-mix(in srgb, var(--color-secondary) 55%, white))' }}>
            {hovered.ev.image && <img src={hovered.ev.image} alt="" className="size-full object-cover" />}
          </div>
          <div className="mt-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-secondary">{isUpcoming(hovered.ev) ? 'Upcoming · ' : ''}{hovered.ev.category} · {hovered.ev.dateLabel}</div>
          <div className="mt-0.5 text-lg font-extrabold leading-tight text-foreground">{hovered.ev.title}</div>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{hovered.ev.description}</p>
          <div className="mt-2.5 inline-block rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">{touch ? 'Tap again to open' : 'Click to read more'} ↓</div>
        </div>
      )}
    </div>
  )
}
