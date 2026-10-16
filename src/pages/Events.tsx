import { useEffect, useMemo, useRef, useState } from 'react'
import usePageMeta from '../components/usePageMeta'
import Section from '../components/Section'
import EventOrbit from '../components/EventOrbit'
import EventDetail from '../components/EventDetail'
import { events, eventsPage, categoryColor, isUpcoming, type EventCategory } from '../data/events'

const LIGHT_GREEN = '#eaf8ef'   // soft mint background
const SOFT_GREEN = '#3aa979'    // heading colour: medium-light green that matches the mint
const smooth = () => (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth') as ScrollBehavior

export default function Events() {
  usePageMeta('Events | CSI', 'Explore every CSI event on an interactive orbit, then read the full story of each one.')
  const [filter, setFilter] = useState<EventCategory | 'All'>('All')
  const [flash, setFlash] = useState<string | null>(null)
  const timer = useRef<number>(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const categories = useMemo(() => Array.from(new Set(events.map((e) => e.category))), [])
  const sorted = useMemo(() => [...events].sort((a, b) => b.date.localeCompare(a.date)), [])
  const visible = filter === 'All' ? sorted : sorted.filter((e) => e.category === filter)
  const orbitEvents = visible
  const upcoming = visible.filter((e) => isUpcoming(e)).sort((a, b) => a.date.localeCompare(b.date)) // soonest first
  const past = visible.filter((e) => !isUpcoming(e))                                                  // newest first

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
      className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${on ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-foreground hover:border-primary'}`}>
      {color && <span className="mr-2 inline-block size-2 rounded-full align-middle" style={{ background: color }} aria-hidden="true" />}{label}
    </button>
  )

  return (
    <>
      <div className="relative overflow-hidden border-b border-border" style={{ background: LIGHT_GREEN, ['--orbit-bg' as string]: LIGHT_GREEN }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 60%, color-mix(in srgb, var(--color-primary) 14%, transparent) 0, transparent 62%)' }} />
        <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6">
          <div className="relative z-10 max-w-md lg:absolute lg:left-6 lg:top-10">
            <h1 className="text-6xl font-black leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl" style={{ color: SOFT_GREEN }}>
              {eventsPage.heading.split(' ')[0]}<br />{eventsPage.heading.split(' ')[1]}
            </h1>
          </div>
          <EventOrbit events={orbitEvents} active={flash} onSelect={goTo} />
          <div className="relative z-10 mt-2 flex flex-col items-center gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-sm text-center text-sm leading-relaxed text-[#4f7a66] lg:text-left">{eventsPage.subtext}</p>
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter events by category">
              {chip('All', filter === 'All')}
              {categories.map((c) => chip(c, filter === c, categoryColor[c]))}
            </div>
          </div>
        </div>
      </div>

      <Section>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-4xl font-extrabold text-primary">{eventsPage.upcomingHeading}</h2>
          <span className="rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">{upcoming.length} {upcoming.length === 1 ? 'event' : 'events'}</span>
        </div>
        {upcoming.length ? (
          <div className="space-y-8">
            {upcoming.map((ev, i) => <EventDetail key={ev.id} ev={ev} index={i} flash={flash === ev.id} />)}
          </div>
        ) : (
          <p className="rounded-3xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">No upcoming events right now. Check back soon!</p>
        )}

        <div className="mb-8 mt-16 flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-4xl font-extrabold text-primary">{eventsPage.pastHeading}</h2>
          <span className="rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">{past.length} {past.length === 1 ? 'event' : 'events'}</span>
        </div>
        {past.length ? (
          <div className="space-y-8">
            {past.map((ev, i) => <EventDetail key={ev.id} ev={ev} index={i} flash={flash === ev.id} />)}
          </div>
        ) : (
          <p className="rounded-3xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">No past events in this category.</p>
        )}
      </Section>
    </>
  )
}
