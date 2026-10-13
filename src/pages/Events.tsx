import { useEffect, useMemo, useRef, useState } from 'react'
import usePageMeta from '../components/usePageMeta'
import Section from '../components/Section'
import EventOrbit from '../components/EventOrbit'
import EventDetail from '../components/EventDetail'
import { events, eventsPage, categoryColor, type EventCategory } from '../data/events'

const smooth = () => (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth') as ScrollBehavior

export default function Events() {
  usePageMeta('Events | CSI', 'Explore every CSI event on an interactive orbit, then read the full story of each one.')
  const [filter, setFilter] = useState<EventCategory | 'All'>('All')
  const [flash, setFlash] = useState<string | null>(null)
  const timer = useRef<number>(0)
  const topRef = useRef<HTMLDivElement>(null)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const categories = useMemo(() => Array.from(new Set(events.map((e) => e.category))), [])
  const sorted = useMemo(() => [...events].sort((a, b) => b.date.localeCompare(a.date)), [])
  const visible = filter === 'All' ? sorted : sorted.filter((e) => e.category === filter)
  const orbitEvents = visible

  const goTo = (id: string) => {
    // make sure the target is in the list even if a filter hides it
    const show = () => {
      document.getElementById(`event-${id}`)?.scrollIntoView({ behavior: smooth(), block: 'start' })
      setFlash(id); window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setFlash(null), 2200)
    }
    if (filter !== 'All' && !visible.some((e) => e.id === id)) { setFilter('All'); window.setTimeout(show, 60) } else show()
  }

  const chip = (label: string, on: boolean, color?: string) => (
    <button key={label} onClick={() => setFilter(label as EventCategory | 'All')} aria-pressed={on}
      className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${on ? 'border-[#b8f35a] bg-[#b8f35a] text-[#03120e]' : 'border-white/30 text-[#e8fff3] hover:border-white/60'}`}>
      {color && <span className="mr-2 inline-block size-2 rounded-full align-middle" style={{ background: color }} aria-hidden="true" />}{label}
    </button>
  )

  return (
    <>
      <div ref={topRef} className="relative overflow-hidden bg-[#03120e] text-[#e8fff3]">
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 62%, #0f5a3f 0, #06261c 38%, #03120e 72%)' }} />
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'linear-gradient(#ffffff08 1px,transparent 1px),linear-gradient(90deg,#ffffff08 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6">
          <div className="relative z-10 max-w-md lg:absolute lg:left-6 lg:top-10">
            <h1 className="text-6xl font-black leading-[0.9] tracking-tight text-transparent sm:text-7xl lg:text-8xl" style={{ WebkitTextStroke: '2px #2f9c78' }}>
              {eventsPage.heading.split(' ')[0]}<br />{eventsPage.heading.split(' ')[1]}
            </h1>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#9fd9bf]">{eventsPage.subtext}</p>
          </div>
          <EventOrbit events={orbitEvents} active={flash} onSelect={goTo} />
          <div className="relative z-10 mt-2 flex flex-wrap justify-center gap-2 lg:justify-end" role="group" aria-label="Filter events by category">
            {chip('All', filter === 'All')}
            {categories.map((c) => chip(c, filter === c, categoryColor[c]))}
          </div>
        </div>
      </div>

      <Section>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-4xl font-extrabold text-primary">{eventsPage.listHeading}</h2>
          <span className="rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">Showing {visible.length} of {events.length} events</span>
        </div>
        <div className="space-y-8">
          {visible.map((ev, i) => (
            <EventDetail key={ev.id} ev={ev} index={i} flash={flash === ev.id}
              onTop={() => topRef.current?.scrollIntoView({ behavior: smooth(), block: 'start' })} />
          ))}
        </div>
      </Section>
    </>
  )
}
