import { useEffect, useMemo, useRef, useState } from 'react'
import { categoryColor, isUpcoming, type CsiEvent } from '../data/events'

// Interactive orbit: every event is a planet. Hover (or focus) shows a preview card, click scrolls to the full event below.
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
    <div className="relative mx-auto w-full max-w-5xl">
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="group" aria-label="Orbit of club events. Select a planet to jump to its details.">
        <defs>
          <radialGradient id="orbit-core"><stop offset="0" stopColor="#d8ff8a" /><stop offset=".6" stopColor="#4fd18b" /><stop offset="1" stopColor="#0f5a3f" /></radialGradient>
        </defs>
        <g fill="none" stroke="#2f9c78">
          {RING_R.map((r, k) => <circle key={r} cx={CX} cy={CY} r={r} strokeOpacity={k % 2 ? 0.35 : 0.55} strokeDasharray={k % 2 ? '4 8' : undefined} />)}
        </g>
        <circle cx={CX} cy={CY} r={50} fill="url(#orbit-core)" />
        <text x={CX} y={CY + 7} textAnchor="middle" fontSize="22" fontWeight="800" fill="#03120e">CSI</text>
        {nodes.map((n) => {
          const { x, y } = pos(n)
          const color = categoryColor[n.ev.category]
          const r = 10 + (n.ring === 0 ? 4 : 0)
          const isHot = hover === n.ev.id || active === n.ev.id
          const right = x >= CX
          return (
            <g key={n.ev.id} role="button" tabIndex={0} aria-label={`${n.ev.title}, ${n.ev.dateLabel}. Go to details`} className="cursor-pointer outline-none"
              onMouseEnter={() => setHover(n.ev.id)} onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(n.ev.id)} onBlur={() => setHover(null)}
              onClick={() => { if (touch && hover !== n.ev.id) setHover(n.ev.id); else onSelect(n.ev.id) }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(n.ev.id) } }}>
              <circle cx={x} cy={y} r={r + 16} fill="transparent" />
              {isHot && <circle cx={x} cy={y} r={r + 8} fill="none" stroke={color} strokeWidth="2" strokeDasharray="3 4" />}
              <circle cx={x} cy={y} r={isHot ? r + 2 : r} fill={isUpcoming(n.ev) ? '#03120e' : color} stroke={color} strokeWidth={isUpcoming(n.ev) ? 4 : 0} />
              <text x={right ? x + r + 10 : x - r - 10} y={y + 5} textAnchor={right ? 'start' : 'end'} fontSize="14" fill={isHot ? '#ffffff' : '#c8f5dc'} fontWeight={isHot ? 700 : 400} style={{ paintOrder: 'stroke', stroke: '#03120e', strokeWidth: 4 }}>{n.ev.title}</text>
            </g>
          )
        })}
      </svg>
      {hovered && hp && (
        <div aria-hidden="true" className="pointer-events-none absolute z-20 w-[260px] rounded-2xl border border-white/25 bg-[#0b2a20]/90 p-3 text-left shadow-2xl backdrop-blur-md sm:w-[290px]"
          style={{ left: `clamp(150px, ${(hp.x / W) * 100}%, calc(100% - 150px))`, top: `${(hp.y / H) * 100}%`, transform: `translate(-50%, ${hp.y > CY ? 'calc(-100% - 26px)' : '26px'})` }}>
          <div className="relative h-24 overflow-hidden rounded-xl" style={{ background: `linear-gradient(135deg,#0f5a3f,${categoryColor[hovered.ev.category]})` }}>
            {hovered.ev.image && <img src={hovered.ev.image} alt="" className="size-full object-cover" />}
          </div>
          <div className="mt-2.5 text-[11px] font-medium uppercase tracking-[0.14em]" style={{ color: categoryColor[hovered.ev.category] }}>{isUpcoming(hovered.ev) ? 'Upcoming · ' : ''}{hovered.ev.category} · {hovered.ev.dateLabel}</div>
          <div className="mt-0.5 text-lg font-extrabold leading-tight text-white">{hovered.ev.title}</div>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#9fd9bf]">{hovered.ev.description}</p>
          <div className="mt-2.5 inline-block rounded-full bg-[#b8f35a] px-3 py-1.5 text-xs font-bold text-[#03120e]">{touch ? 'Tap again to open' : 'Click to read more'} ↓</div>
        </div>
      )}
    </div>
  )
}
